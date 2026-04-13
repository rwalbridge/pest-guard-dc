import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
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

    // Try Rentcast first
    const rentcastKey = Deno.env.get('RENTCAST_API_KEY')
    if (rentcastKey) {
      try {
        const rentcastRes = await fetch(
          `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}&limit=1`,
          {
            headers: {
              'X-Api-Key': rentcastKey,
              'Content-Type': 'application/json',
            },
          }
        )

        if (rentcastRes.ok) {
          const data = await rentcastRes.json()
          const property = data[0]

          if (property?.squareFootage) {
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
    }

    // Fallback to ATTOM
    const attomKey = Deno.env.get('ATTOM_API_KEY')
    if (attomKey) {
      try {
        const attomRes = await fetch(
          `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address1=${encodeURIComponent(address)}`,
          {
            headers: {
              apikey: attomKey,
              accept: 'application/json',
            },
          }
        )

        if (attomRes.ok) {
          const data = await attomRes.json()
          const size = data?.property?.[0]?.building?.size
          const summary = data?.property?.[0]?.summary

          if (size?.universalsize) {
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
    }

    // Both APIs failed or returned no data
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
