import { useState } from "react";
import {
  Home,
  Check,
  Building2,
  TreePine,
  Trees,
  Fence,
  Lightbulb,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteFlow } from "../QuoteFlowContext";

const propertyTypeOptions = [
  "Single Family Home",
  "Townhouse",
  "Row House",
  "Condo/Apartment",
  "Duplex",
  "Other",
];

const yardOptions = [
  { key: "none", icon: Building2, label: "No outdoor space" },
  { key: "small", icon: "🌱", label: "Small yard", sub: "under 1,500 sq ft" },
  { key: "medium", icon: Trees, label: "Medium yard", sub: "1,500–5,000 sq ft" },
  { key: "large", icon: TreePine, label: "Large yard", sub: "5,000+ sq ft" },
];

const riskFlags = [
  { key: "wood-deck", emoji: "🪵", label: "Wood deck or fence" },
  { key: "crawlspace", emoji: "🕳️", label: "Crawlspace or basement" },
  { key: "attic", emoji: "🏠", label: "Attic access" },
  { key: "standing-water", emoji: "💧", label: "Standing water nearby" },
  { key: "wooded", emoji: "🌲", label: "Heavily wooded lot" },
  { key: "shared-walls", emoji: "🏘️", label: "Shared walls with neighbors" },
];

const smartResponses: Record<string, string> = {
  crawlspace:
    "Crawlspaces are one of the top entry points for rodents and a key termite risk area. Our Plus and Premium plans include crawlspace treatment.",
  "standing-water":
    "Standing water within 100 feet significantly increases mosquito activity. Our Plus plan includes mosquito treatment.",
  "shared-walls":
    "Row houses and townhouses share pest pressure with neighboring units — a recurring plan is more effective than one-time treatments in this case.",
};

const homeSizeOptions = [
  { label: "Studio / Apartment — under 700 sq ft", value: 500 },
  { label: "Small Home — 700 to 1,200 sq ft", value: 950 },
  { label: "Medium Home — 1,200 to 2,000 sq ft", value: 1600 },
  { label: "Large Home — 2,000 to 3,500 sq ft", value: 2750 },
  { label: "Very Large Home — 3,500 sq ft and above", value: 4000 },
];

const Step2HomeDetails = () => {
  const { quoteState, updateQuoteState, goToNextStep } = useQuoteFlow();

  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);
  const [editSqft, setEditSqft] = useState(quoteState.squareFootage?.toString() || "");
  const [editPropType, setEditPropType] = useState(quoteState.propertyType || "");
  const [manualDropdown, setManualDropdown] = useState("");
  const [manualSqft, setManualSqft] = useState("");

  const hasSqft = quoteState.squareFootage !== null;

  const handleConfirm = () => {
    setAddressConfirmed(true);
    setShowCorrections(false);
  };

  const handleCorrect = () => {
    setShowCorrections(true);
    setAddressConfirmed(false);
  };

  const saveCorrections = () => {
    const sqft = parseInt(editSqft, 10);
    updateQuoteState({
      squareFootage: !isNaN(sqft) && sqft >= 200 ? sqft : quoteState.squareFootage,
      propertyType: editPropType || quoteState.propertyType,
    });
    setShowCorrections(false);
    setAddressConfirmed(true);
  };

  const handleManualDropdownChange = (val: string) => {
    setManualDropdown(val);
    const opt = homeSizeOptions.find((o) => o.label === val);
    if (opt && !manualSqft) {
      updateQuoteState({ squareFootage: opt.value, propertyType: "Unknown" });
    }
  };

  const handleManualSqftChange = (val: string) => {
    setManualSqft(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 200 && num <= 20000) {
      updateQuoteState({ squareFootage: num, propertyType: "Unknown" });
    }
  };

  const toggleYard = (key: string) => {
    updateQuoteState({ yardSize: key });
  };

  const toggleRiskFlag = (key: string) => {
    const current = quoteState.riskFlags || [];
    const next = current.includes(key)
      ? current.filter((f) => f !== key)
      : [...current, key];
    updateQuoteState({ riskFlags: next });
  };

  const activeSmartResponses = (quoteState.riskFlags || []).filter(
    (f) => smartResponses[f]
  );

  const canProceed = addressConfirmed && !!quoteState.yardSize;

  const fmt = (n: number | null) =>
    n != null ? n.toLocaleString() : null;

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-[28px] font-bold text-secondary leading-tight">
        Is this your home?
      </h2>

      {/* Property confirmation card */}
      <div className="mt-6 border-2 border-border rounded-2xl p-6 bg-card shadow-sm">
        <div className="flex items-start gap-3">
          <Home className="h-5 w-5 text-primary mt-1 shrink-0" />
          <div>
            <p className="font-bold text-foreground text-lg leading-snug">
              {quoteState.address || "Address not provided"}
            </p>
            {(quoteState.city || quoteState.state || quoteState.zipCode) && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {[quoteState.city, quoteState.state].filter(Boolean).join(", ")}
                {quoteState.zipCode ? ` ${quoteState.zipCode}` : ""}
              </p>
            )}
          </div>
        </div>

        <div className="my-4 border-t border-border" />

        {hasSqft ? (
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              {[
                quoteState.propertyType && quoteState.propertyType !== "Unknown"
                  ? quoteState.propertyType
                  : null,
                quoteState.squareFootage
                  ? `${fmt(quoteState.squareFootage)} sq ft`
                  : null,
              ]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
            <p>
              {[
                quoteState.yearBuilt ? `Built ${quoteState.yearBuilt}` : null,
              ]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Square footage not found — we'll estimate from your home type
          </p>
        )}
      </div>

      {/* Manual sq ft fallback when API didn't return it */}
      {!hasSqft && !showCorrections && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              What best describes your home?
            </label>
            <select
              value={manualDropdown}
              onChange={(e) => handleManualDropdownChange(e.target.value)}
              className="w-full h-14 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(61,184,122,0.15)] transition-all appearance-none"
            >
              <option value="" disabled>Select your home type...</option>
              {homeSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.label}>{opt.label}</option>
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

      {/* Confirm / Correct buttons */}
      {!addressConfirmed && !showCorrections && (
        <div className="mt-4 flex gap-3">
          <Button
            className="flex-1 rounded-full h-11"
            onClick={handleConfirm}
          >
            <Check className="h-4 w-4 mr-1" /> Yes, that's my home
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-full h-11"
            onClick={handleCorrect}
          >
            <X className="h-4 w-4 mr-1" /> Let me correct this
          </Button>
        </div>
      )}

      {/* Confirmed state */}
      {addressConfirmed && (
        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Check className="h-4 w-4" /> Address confirmed
          </span>
        </div>
      )}

      {/* Inline corrections */}
      {showCorrections && (
        <div className="mt-4 p-4 border-2 border-border rounded-xl space-y-4 animate-fade-in">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Square footage
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={editSqft}
              onChange={(e) => setEditSqft(e.target.value)}
              placeholder="e.g. 1,847"
              className="w-full h-12 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Property type
            </label>
            <select
              value={editPropType}
              onChange={(e) => setEditPropType(e.target.value)}
              className="w-full h-12 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary transition-all appearance-none"
            >
              <option value="" disabled>Select property type...</option>
              {propertyTypeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-muted-foreground">
            Only correct what's wrong — everything else stays as found
          </p>
          <Button className="w-full rounded-full" onClick={saveCorrections}>
            Save corrections
          </Button>
        </div>
      )}

      {/* Yard / Outdoor space */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-secondary">
          Do you have outdoor space?
        </h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {yardOptions.map((opt) => {
            const selected = quoteState.yardSize === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => toggleYard(opt.key)}
                className={`relative flex flex-col items-center justify-center text-center h-[72px] md:h-20 rounded-xl border-2 transition-all text-sm font-medium
                  ${selected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                  }`}
              >
                {selected && (
                  <Check className="absolute top-2 right-2 h-3.5 w-3.5 text-primary" />
                )}
                <span className="text-lg mb-0.5">
                  {typeof opt.icon === "string" ? opt.icon : <opt.icon className="h-5 w-5 text-primary inline" />}
                </span>
                <span className="text-foreground text-xs leading-tight">{opt.label}</span>
                {"sub" in opt && opt.sub && (
                  <span className="text-[11px] text-muted-foreground">{opt.sub}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Risk flags */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-secondary">
          Any of these apply to your property?
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          This helps us give you a more accurate estimate.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {riskFlags.map((flag) => {
            const selected = (quoteState.riskFlags || []).includes(flag.key);
            return (
              <button
                key={flag.key}
                onClick={() => toggleRiskFlag(flag.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-full border-2 text-sm font-medium transition-all
                  ${selected
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
              >
                {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                <span>{flag.emoji}</span>
                {flag.label}
              </button>
            );
          })}
        </div>

        {/* Smart responses */}
        {activeSmartResponses.length > 0 && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {activeSmartResponses.map((key) => (
              <div
                key={key}
                className="flex gap-3 p-3 rounded-lg bg-primary/5 border-l-4 border-primary"
              >
                <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground italic">
                  {smartResponses[key]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop CTA */}
      <Button
        className="hidden md:flex w-full mt-10 h-[52px] text-[17px] font-bold rounded-full"
        disabled={!canProceed}
        onClick={goToNextStep}
      >
        Confirm Details →
      </Button>
    </div>
  );
};

export default Step2HomeDetails;
