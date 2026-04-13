import { useState, useEffect, useMemo } from "react";
import { Check, X, Lock, Star, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteFlow } from "../QuoteFlowContext";

const basePrices: Record<string, number> = { Basic: 49, Plus: 79, Premium: 119 };
const visitFreq: Record<string, string> = { Basic: "4 visits per year", Plus: "6 visits per year", Premium: "12 visits per year" };

const planCoverage: Record<string, string[]> = {
  Basic: ["ants", "cockroaches", "spiders", "silverfish", "stink-bugs", "mice-rats"],
  Plus: ["ants", "cockroaches", "spiders", "silverfish", "stink-bugs", "mice-rats", "mosquitoes", "wasps-hornets"],
  Premium: ["ants", "cockroaches", "spiders", "silverfish", "stink-bugs", "mice-rats", "mosquitoes", "wasps-hornets", "termites", "bed-bugs"],
};

const pestLabels: Record<string, string> = {
  ants: "Ants", cockroaches: "Cockroaches", spiders: "Spiders", silverfish: "Silverfish",
  "stink-bugs": "Stink Bugs", "mice-rats": "Mice & Rats", mosquitoes: "Mosquitoes",
  "wasps-hornets": "Wasps & Hornets", termites: "Termites", "bed-bugs": "Bed Bugs",
  general_protection: "General Protection",
};

const upgradeTarget: Record<string, string> = { Basic: "Plus", Plus: "Premium" };

function getMultiplier(sqFt: number): number | null {
  if (sqFt < 1000) return 0.85;
  if (sqFt <= 2000) return 1.0;
  if (sqFt <= 3500) return 1.15;
  if (sqFt <= 5000) return 1.30;
  return null;
}

function calcPrice(plan: string, sqFt: number, yardSize: string | null) {
  const mult = getMultiplier(sqFt);
  if (mult === null) return null;
  const yardAdd = plan === "Basic" ? 0 : yardSize === "small" ? 10 : yardSize === "medium" ? 15 : yardSize === "large" ? 25 : 0;
  const monthly = Math.round(basePrices[plan] * mult) + yardAdd;
  const annual = monthly * 10;
  return { monthly, annual };
}

const Step4Quote = () => {
  const { quoteState, updateQuoteState, goToNextStep, goToStep } = useQuoteFlow();
  const [billing, setBilling] = useState<"monthly" | "annual">(quoteState.billingCycle || "monthly");

  const sqFt = quoteState.squareFootage ?? 1600;
  const sqFtAssumed = quoteState.squareFootage === null;
  const isCustom = getMultiplier(sqFt) === null;

  const prices = useMemo(() => ({
    Basic: calcPrice("Basic", sqFt, quoteState.yardSize),
    Plus: calcPrice("Plus", sqFt, quoteState.yardSize),
    Premium: calcPrice("Premium", sqFt, quoteState.yardSize),
  }), [sqFt, quoteState.yardSize]);

  const recommended = quoteState.recommendedPlan || "Plus";
  const userPests = (quoteState.pestsSelected || []).filter((p) => p !== "general_protection");

  useEffect(() => {
    updateQuoteState({ billingCycle: billing });
  }, [billing]);

  useEffect(() => {
    const recPrice = prices[recommended as keyof typeof prices];
    console.log("Quote Event:", "quote_viewed", {
      recommendedPlan: recommended,
      calculatedPrice: recPrice?.monthly ?? null,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const maxSavings = Math.max(
    ...(["Basic", "Plus", "Premium"] as const).map((p) => {
      const pr = prices[p];
      return pr ? pr.monthly * 12 - pr.annual : 0;
    })
  );

  const subParts = [
    quoteState.propertyType && quoteState.propertyType !== "Unknown" ? quoteState.propertyType : null,
    quoteState.squareFootage ? `${quoteState.squareFootage.toLocaleString()} sq ft` : null,
    quoteState.city ? `home in ${quoteState.city}` : null,
  ].filter(Boolean);

  const choosePlan = (plan: string) => {
    const pr = prices[plan as keyof typeof prices];
    updateQuoteState({
      selectedPlan: plan,
      calculatedPrice: pr ? (billing === "monthly" ? pr.monthly : pr.annual) : null,
      annualPrice: pr?.annual ?? null,
    });
    console.log("Quote Event:", "plan_selected", { plan, monthlyPrice: pr?.monthly, timestamp: new Date().toISOString() });
    goToNextStep();
  };

  const handleCustom = () => {
    updateQuoteState({ selectedPlan: "Custom", calculatedPrice: null });
    goToStep(5);
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-[28px] font-bold text-secondary leading-tight">
        Here's your PestGuard estimate.
      </h2>
      {subParts.length > 0 && (
        <p className="mt-2 text-base text-muted-foreground">
          Based on your {subParts.join(", ")}.
        </p>
      )}
      {sqFtAssumed && (
        <p className="mt-1 text-xs text-muted-foreground italic">
          Square footage estimated at 1,600 sq ft (medium home default).
        </p>
      )}

      {/* Billing toggle */}
      {!isCustom && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="inline-flex bg-muted rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billing === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billing === "annual" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Annual
            </button>
          </div>
          {billing === "annual" && (
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              Save up to ${maxSavings}/yr
            </span>
          )}
        </div>
      )}

      {/* Custom quote flow */}
      {isCustom ? (
        <div className="mt-8 rounded-2xl bg-secondary text-secondary-foreground p-8 text-center">
          <h3 className="text-2xl font-bold">Your home qualifies for a custom quote.</h3>
          <p className="mt-3 text-secondary-foreground/70 max-w-md mx-auto">
            Homes over 5,000 sq ft get personalized pricing based on a quick walkthrough. We'll review your details and send a custom estimate within 2 hours.
          </p>
          <Button className="mt-6 h-12 px-8 text-base font-bold rounded-full" onClick={handleCustom}>
            Request My Custom Quote
          </Button>
        </div>
      ) : (
        <>
          {/* Plan cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {(["Basic", "Plus", "Premium"] as const).map((plan) => {
              const pr = prices[plan]!;
              const isRec = plan === recommended;
              const covered = planCoverage[plan];
              const allPests = planCoverage.Premium;
              const savings = pr.monthly * 12 - pr.annual;

              return (
                <div key={plan} className={`relative rounded-2xl border-2 p-6 transition-all ${isRec ? "border-primary shadow-lg md:scale-[1.04] md:z-10" : "border-border"}`}>
                  {isRec && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      Recommended for Your Home
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-foreground">{plan}</h3>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">
                      ${billing === "monthly" ? pr.monthly : Math.round(pr.annual / 12)}
                    </span>
                    <span className="text-base text-muted-foreground">/month</span>
                  </div>
                  {billing === "monthly" ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      or ${pr.annual}/year — save ${savings}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      ${pr.annual} billed annually
                    </p>
                  )}

                  <p className="text-sm text-primary font-medium mt-2">{visitFreq[plan]}</p>

                  <div className="my-4 border-t border-border" />

                  {/* Coverage */}
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Covers:</p>
                  <ul className="space-y-1.5">
                    {allPests.map((pest) => {
                      const isCovered = covered.includes(pest);
                      const isUserPest = userPests.includes(pest);
                      const label = pestLabels[pest] || pest;

                      if (!isCovered) {
                        return (
                          <li key={pest} className="flex items-center gap-2 text-sm">
                            <X className="h-3.5 w-3.5 text-border shrink-0" />
                            <span className="text-border">{label}</span>
                            {upgradeTarget[plan] && (
                              <span className="text-xs text-primary ml-auto whitespace-nowrap">
                                Upgrade to {upgradeTarget[plan]} →
                              </span>
                            )}
                          </li>
                        );
                      }
                      return (
                        <li key={pest} className="flex items-center gap-2 text-sm">
                          <Check className={`h-3.5 w-3.5 shrink-0 ${isUserPest ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={isUserPest ? "text-foreground font-semibold" : "text-muted-foreground"}>
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="text-[13px] text-muted-foreground italic mt-4">
                    Pests return? So do we — free.
                  </p>

                  <Button
                    className="w-full mt-4 h-12 rounded-[10px] text-base font-semibold"
                    variant={isRec ? "default" : "outline"}
                    onClick={() => choosePlan(plan)}
                  >
                    Choose This Plan
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-muted-foreground text-center">
            Most {quoteState.propertyType && quoteState.propertyType !== "Unknown" ? quoteState.propertyType.toLowerCase() : "home"} owners
            {quoteState.city ? ` in ${quoteState.city}` : ""} choose the {recommended} plan.
          </p>

          {/* Annual savings callout */}
          <p className="mt-3 text-sm text-primary text-center">
            💡 Pay annually and save up to ${maxSavings} per year. Switch billing anytime.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> No contracts</span>
            <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Cancel anytime</span>
            <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" /> If pests return, so do we — free</span>
            <span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Licensed in DC, MD & VA</span>
          </div>

          {/* Advisor note */}
          <p className="mt-6 text-sm text-muted-foreground text-center">
            Not sure which plan is right? Most {quoteState.city || "DC"} homeowners with a {quoteState.propertyType && quoteState.propertyType !== "Unknown" ? quoteState.propertyType.toLowerCase() : "home"} start with {recommended}.{" "}
            <a href="/contact" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              Talk to us and we'll figure it out.
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default Step4Quote;
