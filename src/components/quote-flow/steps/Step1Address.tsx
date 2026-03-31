import { useState, useEffect, useRef, useCallback } from "react";
import { Lock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteFlow } from "../QuoteFlowContext";

const homeSizeOptions = [
  { label: "Studio / Apartment — under 700 sq ft", value: 500 },
  { label: "Small Home — 700 to 1,200 sq ft", value: 950 },
  { label: "Medium Home — 1,200 to 2,000 sq ft", value: 1600 },
  { label: "Large Home — 2,000 to 3,500 sq ft", value: 2750 },
  { label: "Very Large Home — 3,500 sq ft and above", value: 4000 },
];

type LookupStatus = "idle" | "loading" | "success" | "failed";

const fetchAttomFallback = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address1=${encodeURIComponent(address)}`,
      {
        headers: {
          apikey: import.meta.env.VITE_ATTOM_API_KEY || "",
          accept: "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("ATTOM failed");
    const data = await response.json();
    const property = data?.property?.[0]?.building?.size;
    return {
      squareFootage: property?.universalsize || null,
      propertyType: data?.property?.[0]?.summary?.proptype || null,
      yearBuilt: data?.property?.[0]?.summary?.yearbuilt || null,
      lotSize: null,
    };
  } catch {
    return null;
  }
};

const fetchPropertyData = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          "X-Api-Key": import.meta.env.VITE_RENTCAST_API_KEY || "",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Rentcast failed");
    const data = await response.json();
    const property = data[0];
    if (!property) throw new Error("No property found");
    return {
      squareFootage: property.squareFootage || null,
      propertyType: property.propertyType || null,
      yearBuilt: property.yearBuilt || null,
      lotSize: property.lotSize || null,
    };
  } catch {
    return await fetchAttomFallback(address);
  }
};

const Step1Address = () => {
  const { quoteState, updateQuoteState, goToNextStep } = useQuoteFlow();

  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [showManual, setShowManual] = useState(false);
  const [manualDropdown, setManualDropdown] = useState("");
  const [manualSqft, setManualSqft] = useState("");
  const [addressValue, setAddressValue] = useState(quoteState.address || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  // Load Google Places script dynamically
  useEffect(() => {
    const g = (window as any).google;
    if (g?.maps?.places) return; // already loaded
    if (document.getElementById("google-places-script")) return;
    const key = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!key) return;
    const script = document.createElement("script");
    script.id = "google-places-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => initAutocomplete();
    document.head.appendChild(script);
  }, []);

  const initAutocomplete = () => {
    const g = (window as any).google;
    if (!g?.maps?.places || !inputRef.current || autocompleteRef.current) return;

    const dcBounds = new g.maps.LatLngBounds(
      new g.maps.LatLng(38.7916, -77.5194),
      new g.maps.LatLng(39.158, -76.9093)
    );

    autocompleteRef.current = new g.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      bounds: dcBounds,
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      const get = (type: string) =>
        place.address_components?.find((c: any) => c.types.includes(type))?.long_name || null;

      const formatted = place.formatted_address || "";
      const city = get("locality") || get("sublocality");
      const state = get("administrative_area_level_1");
      const zip = get("postal_code");

      setAddressValue(formatted);
      updateQuoteState({
        address: formatted,
        addressFormatted: formatted,
        city,
        state,
        zipCode: zip,
      });

      handlePropertyLookup(formatted);
    });
  };

  const handlePropertyLookup = useCallback(
    async (address: string) => {
      setLookupStatus("loading");
      const result = await fetchPropertyData(address);

      if (result && result.squareFootage) {
        updateQuoteState({
          squareFootage: result.squareFootage,
          propertyType: result.propertyType,
          yearBuilt: result.yearBuilt,
          lotSize: result.lotSize,
        });

        // ANALYTICS — connect to GA4, Segment, or any platform in Prompt 10
        console.log("Quote Event:", "address_auto_detected", {
          squareFootage: result.squareFootage,
          propertyType: result.propertyType,
          timestamp: new Date().toISOString(),
        });

        setLookupStatus("success");
        setTimeout(() => goToNextStep(), 600);
      } else {
        // ANALYTICS
        console.log("Quote Event:", "address_api_failed", {
          timestamp: new Date().toISOString(),
        });
        setLookupStatus("failed");
        setShowManual(true);
      }
    },
    [updateQuoteState, goToNextStep]
  );

  const handleManualLink = () => {
    setShowManual(true);
    // ANALYTICS
    console.log("Quote Event:", "address_manual_entry", {
      timestamp: new Date().toISOString(),
    });
  };

  const handleManualDropdownChange = (val: string) => {
    setManualDropdown(val);
    const opt = homeSizeOptions.find((o) => o.label === val);
    if (opt && !manualSqft) {
      updateQuoteState({
        squareFootage: opt.value,
        propertyType: "Unknown",
        yearBuilt: null,
      });
    }
  };

  const handleManualSqftChange = (val: string) => {
    setManualSqft(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 200 && num <= 20000) {
      updateQuoteState({
        squareFootage: num,
        propertyType: "Unknown",
        yearBuilt: null,
      });
    }
  };

  const canProceed =
    addressValue.length > 0 || manualDropdown || (manualSqft && parseInt(manualSqft, 10) >= 200);

  const handleCTA = () => {
    if (lookupStatus === "success" || showManual) {
      goToNextStep();
    } else if (addressValue) {
      handlePropertyLookup(addressValue);
    }
  };

  return (
    <div className="p-6 md:p-10">
      {/* Headline */}
      <h2 className="text-[28px] font-bold text-secondary leading-tight">
        Let's start with your home.
      </h2>

      {/* Subline */}
      {lookupStatus === "loading" ? (
        <p className="mt-2 text-base text-muted-foreground italic animate-pulse">
          Looking up your home details...
        </p>
      ) : (
        <p className="mt-2 text-base text-muted-foreground mb-10">
          We'll use your address to look up your home's size and build your estimate automatically.
        </p>
      )}

      {/* Address input */}
      <div className="relative mt-10">
        <input
          ref={inputRef}
          type="text"
          value={addressValue}
          onChange={(e) => setAddressValue(e.target.value)}
          placeholder="Start typing your address..."
          disabled={lookupStatus === "loading"}
          className={`w-full h-14 px-4 pr-12 text-lg rounded-xl border-2 transition-all duration-200 outline-none bg-background text-foreground
            ${lookupStatus === "loading" ? "bg-muted border-border cursor-not-allowed" : ""}
            ${lookupStatus === "success" ? "border-primary" : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(61,184,122,0.15)]"}
          `}
        />

        {/* Right icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {lookupStatus === "loading" && (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          )}
          {lookupStatus === "success" && (
            <Check className="h-5 w-5 text-primary" />
          )}
        </div>
      </div>

      {/* API failure message */}
      {lookupStatus === "failed" && (
        <p className="mt-3 text-sm text-primary">
          We'll set up your estimate manually — takes just a second.
        </p>
      )}

      {/* Manual link */}
      {!showManual && lookupStatus !== "loading" && (
        <button
          onClick={handleManualLink}
          className="mt-3 text-sm text-muted-foreground underline-offset-2 hover:underline transition-colors"
        >
          I'd rather enter my square footage manually →
        </button>
      )}

      {/* Manual inputs */}
      {showManual && (
        <div className="mt-6 space-y-4 animate-fade-in">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              What best describes your home?
            </label>
            <select
              value={manualDropdown}
              onChange={(e) => handleManualDropdownChange(e.target.value)}
              className="w-full h-14 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(61,184,122,0.15)] transition-all appearance-none"
            >
              <option value="" disabled>
                Select your home type...
              </option>
              {homeSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Or enter your exact square footage:
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={manualSqft}
              onChange={(e) => handleManualSqftChange(e.target.value)}
              placeholder="e.g. 1,847"
              min={200}
              max={20000}
              className="w-full h-14 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(61,184,122,0.15)] transition-all"
            />
          </div>
        </div>
      )}

      {/* Trust line */}
      <div className="mt-8 flex items-start gap-2">
        <Lock className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-[13px] text-muted-foreground leading-snug">
          Your address is only used to estimate your quote — we never share or sell your information.
        </p>
      </div>

      {/* Desktop CTA */}
      <Button
        className="hidden md:flex w-full mt-8 h-[52px] text-[17px] font-bold rounded-full"
        disabled={!canProceed || lookupStatus === "loading"}
        onClick={handleCTA}
      >
        Find My Home →
      </Button>
    </div>
  );
};

export default Step1Address;
