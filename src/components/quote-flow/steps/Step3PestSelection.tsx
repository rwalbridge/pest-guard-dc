import { useState, useEffect } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteFlow } from "../QuoteFlowContext";

const pests = [
  { key: "ants", emoji: "🐜", name: "Ants", sub: "Most common in DC spring & summer" },
  { key: "cockroaches", emoji: "🪳", name: "Cockroaches", sub: "More common in older homes & apartments" },
  { key: "mice-rats", emoji: "🐭", name: "Mice & Rats", sub: "Peak season October through February" },
  { key: "mosquitoes", emoji: "🦟", name: "Mosquitoes", sub: "Backyard season May through October" },
  { key: "termites", emoji: "🪲", name: "Termites", sub: "Silent damage — early detection is key" },
  { key: "bed-bugs", emoji: "🛏️", name: "Bed Bugs", sub: "Not a cleanliness issue — anyone can get them" },
  { key: "wasps-hornets", emoji: "🐝", name: "Wasps & Hornets", sub: "Nest under eaves and in attic spaces" },
  { key: "spiders", emoji: "🕷️", name: "Spiders", sub: "Mostly harmless but a sign of other pests" },
  { key: "stink-bugs", emoji: "🐛", name: "Stink Bugs", sub: "Invade DC homes every fall in large numbers" },
  { key: "silverfish", emoji: "🐟", name: "Silverfish", sub: "Found in humid basements and bathrooms" },
  { key: "general_protection", emoji: "❓", name: "Not sure / General protection", sub: "Cover all the bases — recommended for new homeowners" },
];

const planTiers = ["Basic", "Plus", "Premium"] as const;

function calcRecommendedPlan(
  selected: string[],
  yardSize: string | null,
  riskFlags: string[],
  preSelectedPlan: string | null
): string {
  let rec: string;

  if (selected.includes("termites") || selected.includes("bed-bugs")) {
    rec = "Premium";
  } else if (
    selected.length >= 4 ||
    selected.includes("mosquitoes") ||
    yardSize === "medium" ||
    yardSize === "large" ||
    riskFlags.includes("crawlspace") ||
    riskFlags.includes("standing-water")
  ) {
    rec = "Plus";
  } else if (selected.length === 0 || selected.includes("general_protection")) {
    rec = "Plus";
  } else {
    rec = "Basic";
  }

  // Never downgrade from preSelectedPlan
  if (preSelectedPlan) {
    const recIdx = planTiers.indexOf(rec as any);
    const preIdx = planTiers.indexOf(preSelectedPlan as any);
    if (preIdx > recIdx) rec = preSelectedPlan;
  }

  return rec;
}

const Step3PestSelection = () => {
  const { quoteState, updateQuoteState, goToNextStep } = useQuoteFlow();

  const [selected, setSelected] = useState<string[]>(quoteState.pestsSelected || []);
  const [notes, setNotes] = useState(quoteState.pestNotes || "");

  const toggle = (key: string) => {
    let next: string[];
    if (key === "general_protection") {
      next = selected.includes(key) ? [] : [key];
    } else {
      next = selected.filter((k) => k !== "general_protection");
      next = next.includes(key) ? next.filter((k) => k !== key) : [...next, key];
    }
    setSelected(next);
    updateQuoteState({ pestsSelected: next });
  };

  // Recalculate recommendation whenever selection changes
  useEffect(() => {
    const rec = calcRecommendedPlan(
      selected,
      quoteState.yardSize,
      quoteState.riskFlags || [],
      quoteState.preSelectedPlan
    );
    updateQuoteState({ recommendedPlan: rec });
  }, [selected, quoteState.yardSize, quoteState.riskFlags, quoteState.preSelectedPlan]);

  const showWarning =
    selected.includes("termites") || selected.includes("bed-bugs");

  const canProceed = selected.length > 0;

  const handleCTA = () => {
    console.log("Quote Event:", "pests_selected", {
      pests: selected,
      recommendedPlan: quoteState.recommendedPlan,
      timestamp: new Date().toISOString(),
    });
    goToNextStep();
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-[28px] font-bold text-secondary leading-tight">
        What's been bothering you?
      </h2>
      <p className="mt-2 text-base text-muted-foreground mb-8">
        Select everything that applies — even if you're not sure.
      </p>

      {/* Pest grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {pests.map((pest) => {
          const isSelected = selected.includes(pest.key);
          return (
            <button
              key={pest.key}
              onClick={() => toggle(pest.key)}
              className={`relative flex flex-col items-center text-center p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected
                  ? "bg-primary/5 border-primary shadow-[0_0_0_3px_rgba(61,184,122,0.15)]"
                  : "bg-card border-border hover:border-muted-foreground hover:shadow-sm"
                }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </span>
              )}
              <span className="text-[32px] leading-none">{pest.emoji}</span>
              <span className="mt-2 text-sm font-semibold text-foreground leading-tight">
                {pest.name}
              </span>
              <span className="mt-1 text-[12px] text-muted-foreground leading-snug">
                {pest.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Termites / Bed bugs warning */}
      {showWarning && (
        <div className="mt-4 flex gap-3 p-4 rounded-lg bg-warning border border-yellow-400 animate-fade-in">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-sm text-warning-foreground">
            Termites and bed bugs require a specialist inspection before treatment. Your quote will include a free inspection — we'll confirm exact pricing after we see your home.
          </p>
        </div>
      )}

      {/* Notes */}
      <div className="mt-8">
        <label className="text-sm text-muted-foreground italic block mb-2">
          Anything specific we should know?
        </label>
        <textarea
          value={notes}
          onChange={(e) => {
            const val = e.target.value.slice(0, 500);
            setNotes(val);
            updateQuoteState({ pestNotes: val });
          }}
          placeholder="e.g. I saw something in my basement last week, or I just moved in and want a clean start..."
          maxLength={500}
          className="w-full h-20 px-4 py-3 text-sm rounded-[10px] border-[1.5px] border-border bg-background text-foreground outline-none resize-y focus:border-primary transition-all"
        />
      </div>

      {/* Selection counter */}
      <p className={`mt-6 text-sm ${canProceed ? "text-primary font-medium" : "text-muted-foreground italic"}`}>
        {selected.length === 0
          ? "Select at least one pest or choose 'Not sure' to continue"
          : selected.length === 1
            ? "1 pest selected"
            : `${selected.length} pests selected`}
      </p>

      {/* Desktop CTA */}
      <Button
        className="hidden md:flex w-full mt-4 h-[52px] text-[17px] font-bold rounded-full"
        disabled={!canProceed}
        onClick={handleCTA}
      >
        Build My Quote →
      </Button>
    </div>
  );
};

export default Step3PestSelection;
