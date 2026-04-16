import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

/**
 * Parse a full address string into street + city/state/zip parts.
 * Input:  "804 N Kenmore St, Arlington, VA 22201, USA"
 * Output: { street: "804 N Kenmore St", cityStateZip: "Arlington, VA 22201" }
 */
function parseAddress(address: string): { street: string; cityStateZip: string } {
  // Strip trailing ", USA" or ", United States"
  const cleaned = address.replace(/,?\s*(USA|United States)\s*$/i, '').trim()
  const commaIdx = cleaned.indexOf(',')
  if (commaIdx === -1) return { street: cleaned, cityStateZip: '' }
  return {
    street: cleaned.slice(0, commaIdx).trim(),
    cityStateZip: cleaned.slice(commaIdx + 1).trim(),
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address } = await req.json()

    if (!address) {
      return new Response(
        JSON.stringify({ error: 'Address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { street, cityStateZip } = parseAddress(address)
    console.log('property-lookup: address=', address, '| street=', street, '| cityStateZip=', cityStateZip)

    // ── Try Rentcast first ──────────────────────────────────────────────
    const rentcastKey = Deno.env.get('RENTCAST_API_KEY')
    if (rentcastKey) {
      try {
        const rentcastUrl = `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}&limit=1`
        console.log('Rentcast URL:', rentcastUrl)
        const rentcastRes = await fetch(rentcastUrl, {
          headers: { 'X-Api-Key': rentcastKey, 'Content-Type': 'application/json' },
        })

        console.log('Rentcast status:', rentcastRes.status)
        const rentcastText = await rentcastRes.text()
        console.log('Rentcast body:', rentcastText.slice(0, 500))

        if (rentcastRes.ok) {
          const data = JSON.parse(rentcastText)
          const property = Array.isArray(data) ? data[0] : data

          if (property?.squareFootage) {
            console.log('Rentcast success, sqft=', property.squareFootage)
            return new Response(
              JSON.stringify({
                source: 'rentcast',
                squareFootage: property.squareFootage || null,
                propertyType: property.propertyType || null,
                yearBuilt: property.yearBuilt || null,
                lotSize: property.lotSize || null,
                bedrooms: property.bedrooms || null,
                bathrooms: property.bathrooms || null,
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
        }
      } catch (e) {
        console.error('Rentcast error:', e)
      }
    } else {
      console.warn('RENTCAST_API_KEY not set')
    }

    // ── Fallback to ATTOM ───────────────────────────────────────────────
    const attomKey = Deno.env.get('ATTOM_API_KEY')
    if (attomKey) {
      try {
        // ATTOM needs address1 (street) and address2 (city/state/zip) separately
        const attomUrl = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address1=${encodeURIComponent(street)}&address2=${encodeURIComponent(cityStateZip)}`
        console.log('ATTOM URL:', attomUrl)
        const attomRes = await fetch(attomUrl, {
          headers: { apikey: attomKey, accept: 'application/json' },
        })

        console.log('ATTOM status:', attomRes.status)
        const attomText = await attomRes.text()
        console.log('ATTOM body:', attomText.slice(0, 500))

        if (attomRes.ok) {
          const data = JSON.parse(attomText)
          const size = data?.property?.[0]?.building?.size
          const summary = data?.property?.[0]?.summary

          if (size?.universalsize) {
            console.log('ATTOM success, sqft=', size.universalsize)
            return new Response(
              JSON.stringify({
                source: 'attom',
                squareFootage: size.universalsize || null,
                propertyType: summary?.proptype || null,
                yearBuilt: summary?.yearbuilt || null,
                lotSize: null,
                bedrooms: null,
                bathrooms: null,
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
        }
      } catch (e) {
        console.error('ATTOM error:', e)
      }
    } else {
      console.warn('ATTOM_API_KEY not set')
    }

    // Both APIs returned no usable data
    console.log('property-lookup: no data found from either API')
    return new Response(
      JSON.stringify({
        source: 'none',
        squareFootage: null,
        propertyType: null,
        yearBuilt: null,
        lotSize: null,
        bedrooms: null,
        bathrooms: null,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
