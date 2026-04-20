import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    monthly: 49,
    annual: 39,
    features: [
      "Quarterly visits (4x/year)",
      "Covers: Ants, spiders, cockroaches, mice",
      "Free re-treatment if pests return",
    ],
    cta: "Start Basic",
    popular: false,
  },
  {
    name: "Plus",
    monthly: 79,
    annual: 63,
    features: [
      "Bi-monthly visits (6x/year)",
      "Covers all Basic pests + mosquitoes, stink bugs, wasps",
      "Priority scheduling",
    ],
    cta: "Start Plus",
    popular: true,
  },
  {
    name: "Premium",
    monthly: 119,
    annual: 95,
    features: [
      "Monthly visits (12x/year)",
      "Full coverage: all pests including termites & bed bugs",
      "Dedicated technician",
      "Annual home inspection included",
    ],
    cta: "Start Premium",
    popular: false,
  },
];

interface PricingPlansProps {
  onSelectPlan: (plan: string) => void;
}

const PricingPlans = ({ onSelectPlan }: PricingPlansProps) => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="plans" className="section-padding">
      <div className="container-max text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          One straightforward plan. No hidden fees. No pest-control degree required to understand what you're getting.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center bg-muted rounded-full p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              !annual
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              annual
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Annual <span className="text-xs opacity-80">Save 20%</span>
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border-2 p-8 text-left transition-all hover:shadow-xl ${
                plan.popular
                  ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  ${annual ? plan.annual : plan.monthly}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              {annual && (
                <p className="text-xs text-primary font-medium mt-1">
                  Billed annually · Save ${(plan.monthly - plan.annual) * 12}/yr
                </p>
              )}
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-8"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => onSelectPlan(plan.name)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-sm text-muted-foreground max-w-lg mx-auto space-y-2">
          <p>No contracts. Cancel anytime. Your first treatment is free.</p>
          <p>
            Not sure which plan is right? Most DC homeowners with a single-family home start with Plus.{" "}
            <a href="/#plans" className="text-primary font-medium hover:underline">Talk to us</a> and we'll figure it out together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
