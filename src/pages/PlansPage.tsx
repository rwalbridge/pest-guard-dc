import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check, Minus, Star, Shield, ShieldCheck, Clock, RefreshCw,
  Calendar, ClipboardList, ChevronDown, Building, Home, Castle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteFlow from "@/components/quote-flow/QuoteFlow";

const DOMAIN = "https://pest-guard-dc.lovable.app";

/* ─── PLAN DATA ─── */
const plans = [
  {
    name: "Basic",
    monthly: 49,
    idealFor: "Ideal for apartments & small homes",
    visits: "4 visits per year",
    features: [
      "Quarterly visits (4x per year)",
      "Interior & exterior treatment",
      "Ants, cockroaches, spiders, silverfish, stink bugs",
      "Mice & rat prevention",
      "Free re-treatment guarantee",
      "Online account & scheduling",
      "Licensed technician every visit",
    ],
    excluded: [
      "Mosquito treatment",
      "Wasp & hornet removal",
      "Termite coverage",
      "Bed bug treatment",
    ],
    ctaLabel: "Start Basic Plan",
    ctaVariant: "outline" as const,
  },
  {
    name: "Plus",
    monthly: 79,
    idealFor: "Ideal for single family homes",
    visits: "6 visits per year",
    features: [
      "Bi-monthly visits (6x per year)",
      "Everything in Basic",
      "Mosquito barrier treatment",
      "Wasp & hornet nest removal",
      "Stink bug perimeter treatment",
      "Priority scheduling",
      "Free re-treatment guarantee",
      "Dedicated service area technician",
    ],
    excluded: [
      "Termite coverage",
      "Bed bug treatment",
    ],
    ctaLabel: "Start Plus Plan",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Premium",
    monthly: 119,
    idealFor: "Ideal for large homes & complete coverage",
    visits: "12 visits per year",
    features: [
      "Monthly visits (12x per year)",
      "Everything in Plus",
      "Termite monitoring & treatment",
      "Bed bug inspection & treatment",
      "Annual whole-home inspection",
      "Dedicated named technician",
      "Same-day emergency service",
      "Crawlspace & attic treatment",
      "Commercial property eligible",
    ],
    excluded: [],
    ctaLabel: "Start Premium Plan",
    ctaVariant: "secondary" as const,
  },
];

/* ─── COMPARISON TABLE DATA ─── */
const comparisonGroups = [
  {
    label: "VISIT SCHEDULE",
    rows: [
      { feature: "Number of visits per year", basic: "4", plus: "6", premium: "12" },
      { feature: "Visit frequency", basic: "Quarterly", plus: "Every 6 weeks", premium: "Monthly" },
      { feature: "First visit timing", basic: "Within 1 week", plus: "Within 1 week", premium: "Same week guaranteed" },
    ],
  },
  {
    label: "PEST COVERAGE",
    rows: [
      { feature: "Ants", basic: true, plus: true, premium: true },
      { feature: "Cockroaches", basic: true, plus: true, premium: true },
      { feature: "Spiders", basic: true, plus: true, premium: true },
      { feature: "Silverfish", basic: true, plus: true, premium: true },
      { feature: "Stink bugs", basic: true, plus: true, premium: true },
      { feature: "Mice & rats", basic: true, plus: true, premium: true },
      { feature: "Mosquitoes", basic: false, plus: true, premium: true },
      { feature: "Wasps & hornets", basic: false, plus: true, premium: true },
      { feature: "Termites", basic: false, plus: false, premium: true },
      { feature: "Bed bugs", basic: false, plus: false, premium: true },
    ],
  },
  {
    label: "GUARANTEE & SERVICE",
    rows: [
      { feature: "Free re-treatment if pests return", basic: true, plus: true, premium: true },
      { feature: "Re-treatment response time", basic: "Within 5 days", plus: "Within 48 hours", premium: "Within 24 hours" },
      { feature: "Satisfaction guarantee", basic: true, plus: true, premium: true },
      { feature: "No contracts", basic: true, plus: true, premium: true },
      { feature: "Cancel anytime", basic: true, plus: true, premium: true },
    ],
  },
  {
    label: "TECHNICIAN & SCHEDULING",
    rows: [
      { feature: "Licensed technician", basic: true, plus: true, premium: true },
      { feature: "Priority scheduling", basic: false, plus: true, premium: true },
      { feature: "Dedicated technician", basic: false, plus: false, premium: "Named technician" },
      { feature: "Same-day emergency service", basic: false, plus: false, premium: true },
      { feature: "Online scheduling", basic: true, plus: true, premium: true },
      { feature: "Text & email notifications", basic: true, plus: true, premium: true },
    ],
  },
  {
    label: "EXTRAS",
    rows: [
      { feature: "Annual whole-home inspection", basic: false, plus: false, premium: true },
      { feature: "Crawlspace treatment", basic: false, plus: false, premium: true },
      { feature: "Attic treatment", basic: false, plus: false, premium: true },
      { feature: "Commercial property eligible", basic: false, plus: false, premium: true },
      { feature: "First treatment free", basic: true, plus: true, premium: true },
    ],
  },
];

/* ─── FAQ DATA ─── */
const planFaqs = [
  { q: "How does the subscription work?", a: "You choose a plan and we schedule your first visit — usually within the same week. Your technician treats your home on the schedule your plan includes (quarterly, bi-monthly, or monthly). We remind you before each visit by text and email. Your card is charged monthly or annually, depending on what you choose. No surprises." },
  { q: "Is there a contract I have to sign?", a: "No. PestGuard has no contracts, no minimum commitment, and no cancellation fees. You can pause or cancel your plan anytime by logging into your account or sending us a text. We keep customers because of our service, not because we locked them in." },
  { q: "What if I see pests between visits?", a: "Call or text us. We'll schedule a free re-treatment within 48 hours on Basic and Plus plans, and within 24 hours on Premium. This is included in your plan — there's no extra charge, ever." },
  { q: "When is my first payment taken?", a: "Your first treatment is free — we don't charge anything until after your first visit is complete and you're happy with the service. After that, billing starts on a monthly or annual cycle depending on what you chose." },
  { q: "Can I upgrade or downgrade my plan later?", a: "Yes, anytime. If you start on Basic and want to add mosquito coverage for summer, upgrade to Plus in minutes from your account. Downgrade just as easily. Changes take effect at your next billing cycle." },
  { q: "Do I need to be home during treatment?", a: "No. Most customers aren't home. As long as we have access to the exterior, we can complete the treatment. For interior treatment we do ask that someone is home — we'll confirm this when scheduling." },
  { q: "Are your products safe for kids and pets?", a: "Yes. Every product PestGuard uses is selected specifically for safety around children and pets. We use EPA-registered, eco-friendly formulations that are effective against pests and gentle on everything else. We'll let you know if any specific precautions apply after your treatment." },
  { q: "What's the difference between Plus and Premium besides termite and bed bug coverage?", a: "Plus gives you 6 visits per year and re-treatment within 48 hours. Premium gives you 12 visits per year (monthly), a dedicated named technician who knows your home, same-day emergency service, crawlspace and attic treatment, and re-treatment within 24 hours. It's built for larger homes and homeowners who want maximum coverage." },
  { q: "Do you offer a discount for annual billing?", a: "Yes — paying annually saves you the equivalent of 2 months, which works out to about 20% off. You can switch between monthly and annual billing anytime from your account." },
  { q: "What areas do you service?", a: "PestGuard serves the greater Washington DC metro area including DC, Northern Virginia (Arlington, Alexandria, McLean, Fairfax, Reston, Tysons), and Maryland suburbs (Bethesda, Rockville, Silver Spring, College Park, Annapolis). Not sure if we cover your area? Enter your address in our quote tool and we'll confirm instantly." },
  { q: "Can I use PestGuard for a commercial property?", a: "Yes — our Premium plan covers commercial properties. We work with property managers, small offices, and retail spaces across the DC metro area. For larger commercial accounts contact us for a custom quote." },
  { q: "What happens if I want to cancel?", a: "Text or call us and we'll cancel your plan same day — no forms, no hold times, no cancellation fees. If you've paid annually and cancel mid-year, we'll prorate a refund for unused months." },
];

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: "Rachel K.", location: "Bethesda, MD", stars: 5, quote: "I was skeptical about a monthly subscription for pest control but Plus has paid for itself twice over. Haven't seen a single mosquito in my backyard all summer." },
  { name: "Marcus T.", location: "Capitol Hill, DC", stars: 5, quote: "Basic is perfect for my row house. Quarterly visits keep everything under control and the re-treatment guarantee actually got used once — they showed up next day, no fuss." },
  { name: "Linda & James W.", location: "McLean, VA", stars: 5, quote: "We have a large home with a crawlspace and termite history. Premium was worth every penny. Same technician every month, he knows our house better than we do at this point." },
];

/* ─── HOW IT WORKS STEPS ─── */
const howSteps = [
  { icon: ClipboardList, title: "Choose Your Plan", body: "Pick Basic, Plus, or Premium. Takes 2 minutes online. No payment until your first visit is complete." },
  { icon: Calendar, title: "We Schedule Your First Visit", body: "A licensed PestGuard technician reaches out within 2 hours to confirm your first appointment — usually available within the same week." },
  { icon: ShieldCheck, title: "Your Home Gets Treated", body: "Interior and exterior treatment with eco-friendly, kid-safe products. Takes 45–90 minutes. You don't even need to be home." },
  { icon: RefreshCw, title: "Stay Protected Automatically", body: "We return on your plan schedule before pests have a chance to come back. Pests return between visits? We come back within 48 hours, free." },
];

/* ─── SCENARIO CARDS ─── */
const scenarios = [
  {
    icon: Building,
    plan: "Basic",
    headline: "Choose Basic if...",
    items: [
      "You rent or own an apartment or condo",
      "Your home is under 1,500 sq ft",
      "You've had minimal pest issues in the past",
      "You want foundational protection at the lowest price",
      "You don't have a yard or outdoor space",
    ],
    ctaLabel: "Start with Basic →",
    highlighted: false,
  },
  {
    icon: Home,
    plan: "Plus",
    headline: "Choose Plus if...",
    items: [
      "You own a single family home or townhouse",
      "You have a yard or outdoor space",
      "Mosquitoes are a concern in summer",
      "You've had recurring pest issues",
      "You want peace of mind without premium pricing",
    ],
    ctaLabel: "Start with Plus →",
    highlighted: true,
  },
  {
    icon: Castle,
    plan: "Premium",
    headline: "Choose Premium if...",
    items: [
      "Your home is over 2,500 sq ft",
      "You have a crawlspace, attic, or basement",
      "You want termite or bed bug coverage included",
      "You want the same technician every visit",
      "You need same-day emergency service",
      "You're managing a commercial property",
    ],
    ctaLabel: "Start with Premium →",
    highlighted: false,
  },
];

/* ─── CELL RENDERER ─── */
const CellValue = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="h-5 w-5 text-primary mx-auto" />;
  if (value === false) return <Minus className="h-5 w-5 mx-auto" style={{ color: "#D1D5DB" }} />;
  return <span className="text-sm text-foreground">{value}</span>;
};

/* ─── JSON-LD ─── */
const productSchema = plans.map((p) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `PestGuard ${p.name}`,
  description: p.idealFor,
  offers: {
    "@type": "Offer",
    price: String(p.monthly),
    priceCurrency: "USD",
    priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" },
  },
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: planFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ═══════════════════════ COMPONENT ═══════════════════════ */
const PlansPage = () => {
  const [annual, setAnnual] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [preSelectedPlan, setPreSelectedPlan] = useState<string | null>(null);

  const openQuote = (plan?: string) => {
    setPreSelectedPlan(plan ?? null);
    setQuoteOpen(true);
  };

  const annualPrice = (monthly: number) => monthly * 10;
  const displayPrice = (monthly: number) =>
    annual ? Math.round(annualPrice(monthly) / 12) : monthly;
  const savingsPerYear = (monthly: number) => monthly * 12 - annualPrice(monthly);

  // Scroll to how-it-works section
  const howItWorksRef = useRef<HTMLElement>(null);
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Pest Control Plans & Pricing — PestGuard DC Metro</title>
        <meta name="description" content="Compare PestGuard's Basic, Plus, and Premium pest control plans for DC metro homes. Transparent pricing, no contracts, first treatment free. Plans from $49/month." />
        <link rel="canonical" href={`${DOMAIN}/plans`} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onGetQuote={() => openQuote()} />

      {/* ─── SECTION 1: PAGE HERO ─── */}
      <section style={{ background: "#0A1628", paddingTop: 80, paddingBottom: 60 }} className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] mx-auto text-center">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(61,184,122,0.15)", border: "1px solid rgba(61,184,122,0.4)" }}>
            <span className="text-[13px] tracking-wide" style={{ color: "#3DB87A", letterSpacing: "0.05em" }}>
              Transparent pricing · No contracts · Cancel anytime
            </span>
          </div>

          <h1 className="text-[36px] lg:text-[52px] font-extrabold text-white leading-[1.1]">
            Protection Plans Built for DC Metro Homes
          </h1>

          <p className="mt-5 text-lg max-w-[580px] mx-auto mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
            One clear plan. One monthly price. Zero surprises. PestGuard covers your home year-round so you never have to think about pests again.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            {["No contracts", "First treatment free", "Cancel anytime", "Satisfaction guaranteed"].map((t) => (
              <span key={t} className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px]" style={{ background: "rgba(61,184,122,0.15)", border: "1px solid rgba(61,184,122,0.3)", color: "#3DB87A" }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full block" preserveAspectRatio="none" style={{ height: 50 }}>
            <path d="M0,24 C360,50 1080,0 1440,24 L1440,50 L0,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── SECTION 2: BILLING TOGGLE + PLAN CARDS ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Toggle */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex items-center bg-muted rounded-full p-1">
              <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}>
                Monthly
              </button>
              <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}>
                Annual {annual && <span className="ml-1 text-xs opacity-80">Save 20%</span>}
              </button>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => {
              const price = displayPrice(plan.monthly);
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-2xl p-9 text-left transition-all duration-200 ${
                    plan.popular
                      ? "border-2 border-primary shadow-lg md:scale-[1.03]"
                      : "border-2 border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                  }`}
                  style={{
                    background: plan.popular ? "#F0FDF4" : "white",
                    boxShadow: plan.popular ? "0 8px 32px rgba(61,184,122,0.2)" : undefined,
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-[52px] font-extrabold text-foreground leading-none">${price}</span>
                    <span className="text-lg text-muted-foreground">/mo</span>
                  </div>

                  {annual ? (
                    <p className="text-sm text-muted-foreground mt-1">Billed annually</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      or ${annualPrice(plan.monthly)}/year — 2 months free
                    </p>
                  )}

                  <div className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {plan.idealFor}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" aria-label="Calendar" />
                    {plan.visits}
                  </div>

                  <div className="my-5 h-px bg-border" />

                  <p className="text-xs uppercase text-muted-foreground tracking-widest mb-3">What's included:</p>

                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[15px] text-foreground leading-relaxed">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {plan.excluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[15px] text-muted-foreground/50 leading-relaxed">
                        <Minus className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#D1D5DB" }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full mt-8"
                    variant={plan.ctaVariant}
                    onClick={() => openQuote(plan.name)}
                    style={plan.name === "Premium" ? { background: "#0A1628", color: "white" } : undefined}
                  >
                    {plan.ctaLabel}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground mt-3">
                    No payment today — first visit is free
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: COMPARISON TABLE ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">See Everything Side by Side</h2>
          <p className="mt-3 text-lg text-muted-foreground text-center mb-12">Every feature, every plan — no fine print.</p>

          <p className="text-center text-xs text-muted-foreground mb-3 md:hidden">← Scroll to compare →</p>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-background border-b-2 border-border">
                  <th className="text-left py-4 px-4 text-xs uppercase text-muted-foreground tracking-widest w-[40%]">What's Included</th>
                  <th className="text-center py-4 px-3 w-[20%]">
                    <span className="font-bold text-foreground">Basic</span>
                    <span className="block text-primary text-sm">${annual ? Math.round(annualPrice(49) / 12) : 49}/mo</span>
                  </th>
                  <th className="text-center py-4 px-3 w-[20%] relative" style={{ background: "rgba(61,184,122,0.06)" }}>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">Most Popular</span>
                    <span className="font-bold text-foreground">Plus</span>
                    <span className="block text-primary text-sm">${annual ? Math.round(annualPrice(79) / 12) : 79}/mo</span>
                  </th>
                  <th className="text-center py-4 px-3 w-[20%]">
                    <span className="font-bold text-foreground">Premium</span>
                    <span className="block text-primary text-sm">${annual ? Math.round(annualPrice(119) / 12) : 119}/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => (
                  <>
                    <tr key={group.label}>
                      <td colSpan={4} className="py-3 px-4 text-xs uppercase tracking-widest text-white font-bold" style={{ background: "#0A1628", letterSpacing: "0.1em" }}>
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row, ri) => (
                      <tr key={row.feature} className={ri % 2 === 0 ? "bg-white" : ""} style={ri % 2 !== 0 ? { background: "#F8F9FA" } : undefined}>
                        <td className="py-3 px-4 text-[15px] text-foreground">{row.feature}</td>
                        <td className="py-3 px-3 text-center"><CellValue value={row.basic} /></td>
                        <td className="py-3 px-3 text-center" style={{ background: "rgba(61,184,122,0.04)" }}><CellValue value={row.plus} /></td>
                        <td className="py-3 px-3 text-center"><CellValue value={row.premium} /></td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button variant="outline" onClick={() => openQuote("Basic")}>Start Basic</Button>
            <Button onClick={() => openQuote("Plus")}>Start Plus</Button>
            <Button onClick={() => openQuote("Premium")} style={{ background: "#0A1628", color: "white" }}>Start Premium</Button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHICH PLAN IS RIGHT FOR ME? ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">Not Sure Which Plan to Choose?</h2>
          <p className="mt-3 text-lg text-muted-foreground text-center mb-12">Here's how DC metro homeowners typically decide.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((s, i) => (
              <motion.div
                key={s.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 transition-all duration-200 hover:shadow-lg hover:border-primary ${
                  s.highlighted
                    ? "border-2 border-primary"
                    : "border-2 border-border"
                }`}
                style={{ background: s.highlighted ? "#F0FDF4" : "white" }}
              >
                {s.highlighted && (
                  <div className="inline-flex bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">{s.headline}</h3>
                <ul className="space-y-2.5 mb-6">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {s.highlighted ? (
                  <Button className="w-full" onClick={() => openQuote(s.plan)}>{s.ctaLabel}</Button>
                ) : s.plan === "Premium" ? (
                  <Button className="w-full" onClick={() => openQuote(s.plan)} style={{ background: "#0A1628", color: "white" }}>{s.ctaLabel}</Button>
                ) : (
                  <button onClick={() => openQuote(s.plan)} className="text-primary font-semibold text-sm hover:underline">{s.ctaLabel}</button>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10">
            Still not sure? Most DC single-family homeowners start with Plus — you can always upgrade or downgrade anytime.
          </p>
        </div>
      </section>

      {/* ─── SECTION 5: HOW IT WORKS ─── */}
      <section ref={howItWorksRef} id="plans-how-it-works" className="px-4 sm:px-6 lg:px-8 py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-16">
            From Signup to Protected — Here's Exactly What Happens
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {/* Dashed connector */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-primary/30" />

            {howSteps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg mb-3 relative z-10">
                  {i + 1}
                </div>
                <s.icon className="h-7 w-7 text-foreground mb-2" />
                <h3 className="text-lg font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[220px]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: GUARANTEE ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ background: "#0A1628" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full px-3.5 py-1 mb-6" style={{ background: "rgba(61,184,122,0.15)", border: "1px solid rgba(61,184,122,0.4)" }}>
              <span className="text-[13px] font-medium" style={{ color: "#3DB87A" }}>The PestGuard Guarantee</span>
            </div>
            <h2 className="text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.1] mb-6">
              If Pests Come Back, So Do We.
            </h2>
            <p className="text-[17px] leading-[1.7] mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              Every plan includes our no-questions-asked re-treatment guarantee. If you see pest activity between your scheduled visits, call or text us. We'll be back within 48 hours — at no extra charge, on any plan, every time.
            </p>
            <p className="text-[17px] leading-[1.7] mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              We don't hide this in the fine print. It's the foundation of how PestGuard works. We keep customers because of our service — not because of contracts.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Response within 48 hours on Basic and Plus",
                "Response within 24 hours on Premium",
                "Unlimited re-treatments included in your plan price",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button onClick={() => openQuote()} className="rounded-full px-8 h-12">Get Protected Today</Button>
            <p className="mt-3 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>No payment until your first visit is complete.</p>
          </div>

          {/* Shield Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full" style={{ width: 340, height: 340, background: "radial-gradient(circle, rgba(61,184,122,0.2) 0%, transparent 70%)" }} />
              <svg width="340" height="340" viewBox="0 0 340 340" fill="none" className="relative z-10" role="img" aria-label="PestGuard guarantee badge">
                {/* Outer ring */}
                <circle cx="170" cy="170" r="165" fill="rgba(61,184,122,0.15)" />
                {/* Dashed rotating ring */}
                <circle cx="170" cy="170" r="150" fill="none" stroke="rgba(61,184,122,0.3)" strokeWidth="2" strokeDasharray="10 8" className="hero-orbit" style={{ transformOrigin: "170px 170px" }} />
                {/* Shield */}
                <path d="M170 70 L240 110 L240 190 C240 240 170 280 170 280 C170 280 100 240 100 190 L100 110 Z" fill="#3DB87A" />
                {/* Checkmark */}
                <polyline points="138,175 160,197 202,148" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FAQ ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">Questions About Our Plans</h2>
          <p className="mt-3 text-lg text-muted-foreground text-center mb-12">Straight answers — no runaround.</p>

          <Accordion type="single" collapsible>
            {planFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`pf-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── SECTION 8: SOCIAL PROOF ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "#F8F9FA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-sm font-bold text-foreground">{t.name} <span className="font-normal text-muted-foreground">— {t.location}</span></p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">⭐ 4.9 out of 5 from 800+ DC metro homeowners</p>
        </div>
      </section>

      {/* ─── SECTION 9: FINAL CTA ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 text-center" style={{ background: "#3DB87A" }}>
        <h2 className="text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.1] mb-4">
          Your Home Deserves Year-Round Protection.
        </h2>
        <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
          Join 2,400+ DC metro homeowners who never think about pests anymore.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button onClick={() => openQuote()} className="rounded-full px-8 h-12 text-base font-semibold" style={{ background: "white", color: "#3DB87A" }}>
            Get My Free Quote
          </Button>
          <button onClick={scrollToHowItWorks} className="inline-flex items-center justify-center rounded-full px-8 h-12 text-base font-semibold text-white transition-all" style={{ border: "2px solid rgba(255,255,255,0.5)", background: "transparent" }}>
            See How It Works
          </button>
        </div>
        <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>
          No contracts · First treatment free · Cancel anytime
        </p>
      </section>

      <Footer />

      <QuoteFlow isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} preSelectedPlan={preSelectedPlan} />
    </div>
  );
};

export default PlansPage;
