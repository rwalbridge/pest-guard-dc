import { useState, useEffect, useRef, useCallback } from "react";
import { Lock, Check, Loader2, MapPin } from "lucide-react";
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

const fetchPropertyData = async (address: string) => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl) {
      console.error("Supabase URL not configured");
      return null;
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/property-lookup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey || "",
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      console.error("Property lookup failed:", response.status);
      return null;
    }

    const data = await response.json();

    console.log("Quote Event: property_data_source", {
      source: data.source,
      hasSquareFootage: !!data.squareFootage,
    });

    if (!data.squareFootage) return null;

    return {
      squareFootage: data.squareFootage,
      propertyType: data.propertyType,
      yearBuilt: data.yearBuilt,
      lotSize: data.lotSize,
    };
  } catch (error) {
    console.error("Property lookup error:", error);
    return null;
  }
};

interface Suggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

const Step1Address = () => {
  const { quoteState, updateQuoteState, goToNextStep } = useQuoteFlow();

  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [showManual, setShowManual] = useState(false);
  const [manualDropdown, setManualDropdown] = useState("");
  const [manualSqft, setManualSqft] = useState("");
  const [addressValue, setAddressValue] = useState(quoteState.address || "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const placesLibRef = useRef<any>(null); // holds { AutocompleteSuggestion } from importLibrary
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // If the user types before the Places library is ready, queue it here.
  const pendingFetchRef = useRef<string | null>(null);

  // Load Google Maps bootstrap and init AutocompleteSuggestion (new Places API)
  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

    if (!key) {
      console.warn("VITE_GOOGLE_PLACES_API_KEY not set — falling back to manual entry");
      setShowManual(true);
      return;
    }

    const initPlaces = async () => {
      try {
        const lib = await (window as any).google.maps.importLibrary("places");
        placesLibRef.current = lib;
        // Retry any input that arrived while the library was loading
        const pending = pendingFetchRef.current;
        if (pending && pending.length >= 3) {
          pendingFetchRef.current = null;
          fetchSuggestions(pending);
        }
      } catch (e) {
        console.error("Places library init failed:", e);
        setShowManual(true);
      }
    };

    // If Maps is already on the page, init immediately
    if ((window as any).google?.maps?.importLibrary) {
      initPlaces();
      return;
    }

    // Poll until the bootstrap script exposes importLibrary
    const pollTimer = setInterval(() => {
      if ((window as any).google?.maps?.importLibrary) {
        clearInterval(pollTimer);
        initPlaces();
      }
    }, 100);

    if (!document.getElementById("google-places-script")) {
      const script = document.createElement("script");
      script.id = "google-places-script";
      // loading=async is required for the new Places API bootstrap
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error("Google Places script failed to load");
        setShowManual(true);
      };
      document.head.appendChild(script);
    }

    return () => clearInterval(pollTimer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSuggestions = async (val: string) => {
    if (val.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Library not ready yet — queue value so initPlaces() can retry
    if (!placesLibRef.current) {
      pendingFetchRef.current = val;
      return;
    }

    try {
      const { AutocompleteSuggestion } = placesLibRef.current;
      const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: val,
        includedRegionCodes: ["us"],
        locationBias: { lat: 38.9072, lng: -77.0369 },
      });

      if (results && results.length > 0) {
        setSuggestions(
          results.map((s: any) => ({
            placeId: s.placePrediction.placeId,
            description: s.placePrediction.text.text,
            mainText: s.placePrediction.mainText.text,
            secondaryText: s.placePrediction.secondaryText?.text || "",
          }))
        );
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (e) {
      console.error("Autocomplete fetch error:", e);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddressValue(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 220);
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setShowSuggestions(false);
    setSuggestions([]);

    const formatted = suggestion.description;
    setAddressValue(formatted);

    // Try to parse city/state/zip from the description terms
    // Description format: "123 Main St, Washington, DC 20001, USA"
    const parts = formatted.split(",").map((s) => s.trim());
    const city = parts[1] || null;
    const stateZip = parts[2] || "";
    const stateMatch = stateZip.match(/^([A-Z]{2})\s*(\d{5})?/);
    const state = stateMatch?.[1] || null;
    const zip = stateMatch?.[2] || null;

    updateQuoteState({
      address: formatted,
      addressFormatted: formatted,
      city,
      state,
      zipCode: zip,
    });

    handlePropertyLookup(formatted);
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

        console.log("Quote Event:", "address_auto_detected", {
          squareFootage: result.squareFootage,
          propertyType: result.propertyType,
          timestamp: new Date().toISOString(),
        });

        setLookupStatus("success");
        setTimeout(() => goToNextStep(), 600);
      } else {
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
    console.log("Quote Event:", "address_manual_entry", {
      timestamp: new Date().toISOString(),
    });
  };

  const handleManualDropdownChange = (val: string) => {
    setManualDropdown(val);
    const opt = homeSizeOptions.find((o) => o.label === val);
    if (opt && !manualSqft) {
      updateQuoteState({ squareFootage: opt.value, propertyType: "Unknown", yearBuilt: null });
    }
  };

  const handleManualSqftChange = (val: string) => {
    setManualSqft(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 200 && num <= 20000) {
      updateQuoteState({ squareFootage: num, propertyType: "Unknown", yearBuilt: null });
    }
  };

  const canProceed =
    addressValue.length > 0 || manualDropdown || (manualSqft && parseInt(manualSqft, 10) >= 200);

  const handleCTA = () => {
    const currentAddress = addressValue.trim();
    if (lookupStatus === "success") {
      goToNextStep();
    } else if (showManual && (manualDropdown || manualSqft)) {
      if (currentAddress) {
        updateQuoteState({ address: currentAddress, addressFormatted: currentAddress });
      }
      goToNextStep();
    } else if (currentAddress) {
      updateQuoteState({ address: currentAddress, addressFormatted: currentAddress });
      handlePropertyLookup(currentAddress);
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

      {/* Address input + custom dropdown */}
      <div className="relative mt-10">
        <input
          ref={inputRef}
          type="text"
          value={addressValue}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Start typing your address..."
          disabled={lookupStatus === "loading"}
          autoComplete="off"
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

        {/* Custom suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-[10000] w-full mt-1 bg-background border border-border rounded-xl shadow-lg overflow-hidden"
          >
            {suggestions.map((s) => (
              <button
                key={s.placeId}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // Keep input focused
                  handleSelectSuggestion(s);
                }}
                className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-0 flex items-start gap-3"
              >
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground truncate">
                    {s.mainText}
                  </span>
                  {s.secondaryText && (
                    <span className="block text-xs text-muted-foreground truncate">
                      {s.secondaryText}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
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

      {/* CTA — shown on all screen sizes; QuoteFlow mobile bar is excluded for step 1 */}
      <Button
        className="w-full mt-8 mb-4 h-[52px] text-[17px] font-bold rounded-full"
        disabled={!canProceed || lookupStatus === "loading"}
        onClick={handleCTA}
      >
        Find My Home →
      </Button>
    </div>
  );
};

export default Step1Address;
