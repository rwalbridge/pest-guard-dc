import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { locations } from "@/data/locations";
import { locationImages } from "@/data/locationImages";
import { pests as allPests } from "@/data/pests";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  MapPin, Shield, CheckCircle, ArrowLeft, BadgeCheck, Clock,
  Search, SprayCan, ShieldCheck,
  X, Star, Flower2, Sun, CloudRain, Snowflake,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* --- Helpers --- */
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, delay },
});

/* Pest emoji mapping */
const pestEmojiMap: Record<string, string> = {
  Ants: "🐜", Cockroaches: "🪳", "Mice & Rats": "🐭", Mice: "🐭", Rodents: "🐭",
  Mosquitoes: "🦟", Termites: "🪲", "Bed Bugs": "🛏️",
  "Wasps & Hornets": "🐝", Spiders: "🕷️", "Stink Bugs": "🐛",
  Silverfish: "🐟", "Carpenter Ants": "🐜",
};

const pestNameToSlug: Record<string, string> = {
  Ants: "ants", Cockroaches: "cockroaches", "Mice & Rats": "mice-rats",
  Mice: "mice-rats", Rodents: "mice-rats", Mosquitoes: "mosquitoes",
  Termites: "termites", "Bed Bugs": "bed-bugs",
  "Wasps & Hornets": "wasps-hornets", Spiders: "spiders",
  "Stink Bugs": "stink-bugs", Silverfish: "silverfish", "Carpenter Ants": "ants",
};

/* Seasonal pest data */
const seasonalPests = [
  { season: "Spring", icon: Flower2, pests: ["Ants", "Termites", "Spiders"], color: "text-primary" },
  { season: "Summer", icon: Sun, pests: ["Mosquitoes", "Wasps", "Cockroaches"], color: "text-primary" },
  { season: "Fall", icon: CloudRain, pests: ["Stink Bugs", "Mice", "Spiders"], color: "text-primary" },
  { season: "Winter", icon: Snowflake, pests: ["Rodents", "Cockroaches", "Silverfish"], color: "text-primary" },
];

/* Comparison table */
const comparisonRows = [
  "Local knowledge of DC/MD/VA pests",
  "Eco-friendly products",
  "Satisfaction guarantee",
  "No contracts — cancel anytime",
  "Same-week service available",
  "Licensed in DC, MD & VA",
];

/* Testimonials */
const genericTestimonials = [
  { name: "Sarah M.", text: "PestGuard has been fantastic. After one treatment the ant problem we'd been fighting for months was completely gone.", rating: 5 },
  { name: "James R.", text: "Professional, on time, and they actually explain what they're doing. The best pest control company I've ever used.", rating: 5 },
  { name: "Priya K.", text: "We switched from a national chain and the difference is night and day. They know the local pest issues inside and out.", rating: 5 },
];

/* ============ Component ============ */
const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location) {
      document.title = location.titleTag;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", location.metaDescription);
    }
  }, [location]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Location not found</h1>
          <Link to="/" className="text-primary underline mt-4 block">Go home</Link>
        </div>
      </div>
    );
  }

  const relatedLocations = locations
    .filter((l) => l.slug !== slug)
    .sort((a, b) => {
      if (a.state === location.state && b.state !== location.state) return -1;
      if (a.state !== location.state && b.state === location.state) return 1;
      return 0;
    })
    .slice(0, 4);

  const DOMAIN = "https://pest-guard-dc.lovable.app";
  const ogTitle = `Pest Control in ${location.city}, ${location.state} | PestGuard`;
  const ogDesc = `PestGuard provides eco-friendly pest control in ${location.city}. Licensed in DC, MD & VA. No contracts. Same-week service.`;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{location.titleTag}</title>
        <meta name="description" content={location.metaDescription} />
        <meta property="og:site_name" content="PestGuard" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={`${DOMAIN}/locations/${location.slug}`} />
        <meta property="og:image" content={`${DOMAIN}/og-images/homepage.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PestGuardDC" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content={`${DOMAIN}/og-images/homepage.jpg`} />
      </Helmet>
      <Header />
      <main>
        {/* ─── 1. HERO — Navy ─── */}
        <section className="bg-secondary text-secondary-foreground pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container-max">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-secondary-foreground/60 hover:text-primary mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeIn()}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Pest Control in {location.city}, {location.state}
                </h1>
                <p className="mt-4 text-xl text-primary font-semibold">
                  {location.subtitle}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 bg-secondary-foreground/10 rounded-full px-4 py-2 text-sm font-medium">
                    <BadgeCheck className="h-4 w-4 text-primary" /> Licensed in {location.state}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-secondary-foreground/10 rounded-full px-4 py-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-primary" /> Same-Week Service
                  </span>
                </div>
                <Link to="/#plans">
                  <Button size="lg" className="mt-8">
                    Get a Quote
                  </Button>
                </Link>
              </motion.div>
              <motion.div {...fadeIn(0.2)} className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-secondary-foreground/5 border border-secondary-foreground/10 overflow-hidden flex items-center justify-center">
                  {locationImages[location.slug] ? (
                    <img
                      src={locationImages[location.slug].src}
                      alt={locationImages[location.slug].alt}
                      width={1024}
                      height={768}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <Shield className="h-16 w-16 text-primary mx-auto mb-4 opacity-60" />
                      <p className="text-secondary-foreground/40 text-sm">Protecting {location.city} homes</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHY YEAR-ROUND — Light gray ─── */}
        <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <motion.div {...fadeIn()}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Why {location.city} Needs Year-Round Pest Control
              </h2>
            </motion.div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div {...fadeIn(0.1)} className="space-y-5">
                {location.introParagraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-lg">{p}</p>
                ))}
              </motion.div>
              {/* Seasonal Pest Calendar */}
              <motion.div {...fadeIn(0.2)} className="grid grid-cols-2 gap-4">
                {seasonalPests.map((s) => (
                  <div key={s.season} className="bg-card rounded-xl border border-border p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <s.icon className="h-5 w-5 text-primary" />
                      <span className="font-bold text-foreground text-sm">{s.season}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {s.pests.map((p) => (
                        <li key={p} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="text-sm" role="img" aria-label={p}>{pestEmojiMap[p] || "🐛"}</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 3. COMMON PESTS — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <motion.div {...fadeIn()} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                What's Bugging {location.city} Homeowners?
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {location.pests.map((pest, i) => {
                const emoji = pestEmojiMap[pest.name] || "🐛";
                const pestSlug = pestNameToSlug[pest.name];
                return (
                  <motion.div key={pest.name} {...fadeIn(i * 0.08)}>
                    <Link
                      to={pestSlug ? `/pests/${pestSlug}` : "#"}
                      className="block h-full bg-card rounded-xl border-2 border-border hover:border-primary/40 hover:shadow-lg transition-all p-6 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <span className="text-2xl" role="img" aria-label={pest.name}>{emoji}</span>
                      </div>
                      <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                        {pest.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {pest.description}
                      </p>
                      <span className="mt-3 inline-block text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 4. PROCESS — Green ─── */}
        <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <motion.div {...fadeIn()} className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Our {location.city} Pest Control Process
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Timeline connector (desktop) */}
              <div className="hidden md:block absolute top-[2.5rem] left-[16.6%] right-[16.6%] h-0.5 bg-primary-foreground/20" />
              {[
                { icon: Search, ...location.process[0] },
                { icon: SprayCan, ...location.process[1] },
                { icon: ShieldCheck, ...location.process[2] },
              ].map((step, i) => (
                <motion.div key={step.title} {...fadeIn(i * 0.15)} className="flex flex-col items-center text-center relative">
                  <div className="w-20 h-20 rounded-full bg-primary-foreground/15 flex items-center justify-center mb-6 border-4 border-primary relative z-10">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/60 mb-2">Step {i + 1}</span>
                  <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. NEIGHBORHOODS — Light gray ─── */}
        <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <motion.div {...fadeIn()}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
                PestGuard Serves All of {location.city}
              </h2>
            </motion.div>
            <motion.div {...fadeIn(0.1)} className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {location.neighborhoods.map((n, i) => (
                <span
                  key={n}
                  className="flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-5 py-2.5 text-sm font-medium"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {n}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── 6. SOCIAL PROOF — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <motion.div {...fadeIn()} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                What {location.city} Homeowners Say
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {genericTestimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  {...fadeIn(i * 0.1)}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
                  <p className="mt-4 font-bold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{location.city} homeowner</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. COMPARISON TABLE — Light gray ─── */}
        <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max max-w-3xl mx-auto">
            <motion.div {...fadeIn()} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Local Service. Better Results.
              </h2>
              <p className="mt-3 text-muted-foreground">See how PestGuard compares to the big national chains.</p>
            </motion.div>
            <motion.div {...fadeIn(0.1)} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-center font-bold text-sm border-b border-border">
                <div className="p-4 text-muted-foreground text-left">Feature</div>
                <div className="p-4 text-primary bg-primary/5">PestGuard</div>
                <div className="p-4 text-muted-foreground">National Chains</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div key={row} className={`grid grid-cols-3 text-sm ${i < comparisonRows.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="p-4 text-foreground font-medium">{row}</div>
                  <div className="p-4 flex justify-center bg-primary/5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="p-4 flex justify-center">
                    <X className="h-5 w-5 text-muted-foreground/30" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── 8. FAQ — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max max-w-3xl mx-auto">
            <motion.div {...fadeIn()} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Questions — {location.city}
              </h2>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {location.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── 9. PLANS CTA — Navy ─── */}
        <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max text-center">
            <motion.div {...fadeIn()}>
              <Shield className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Ready to protect your {location.city} home?
              </h2>
              <p className="mt-4 text-secondary-foreground/70 text-lg max-w-lg mx-auto">
                Plans start at $49/mo. No contracts. Cancel anytime. Your first treatment is free.
              </p>
              <Link to="/#plans">
                <Button size="lg" className="mt-8 text-base px-8">
                  See Plans & Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── 10. RELATED LOCATIONS — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="container-max">
            <motion.div {...fadeIn()}>
              <h3 className="text-xl font-bold text-foreground text-center mb-8">Also Serving Nearby Areas</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/locations/${loc.slug}`}
                    className="flex items-center gap-2 bg-muted border border-border rounded-full px-5 py-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    {loc.city}, {loc.state}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
