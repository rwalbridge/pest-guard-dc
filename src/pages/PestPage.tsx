import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { pests } from "@/data/pests";
import { locations } from "@/data/locations";
import { getArticleBySlug } from "@/data/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield, AlertTriangle, ArrowLeft, ArrowRight, MapPin, Bug, Rat, Zap, Leaf,
  Bird, Snail, Search, SprayCan, ShieldCheck, MessageCircle,
  CheckCircle, X as XIcon, Lightbulb,
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
  ants: "🐜", cockroaches: "🪳", "mice-rats": "🐭", mosquitoes: "🦟",
  termites: "🪲", "bed-bugs": "🛏️", "wasps-hornets": "🐝",
  spiders: "🕷️", "stink-bugs": "🐛", silverfish: "🐟",
};

/* Stat callouts per pest */
const pestStats: Record<string, { stat: string; context: string }> = {
  ants: { stat: "#1", context: "Most common nuisance pest in America" },
  cockroaches: { stat: "300M", context: "Years cockroaches have survived on Earth" },
  "mice-rats": { stat: "50–60", context: "Offspring from a single pair of mice per year" },
  mosquitoes: { stat: "#1", context: "Deadliest animal on Earth by human fatalities" },
  termites: { stat: "$5B", context: "Annual US property damage caused by termites" },
  "bed-bugs": { stat: "Top 5", context: "DC ranks among the most infested US cities" },
  "wasps-hornets": { stat: "62", context: "Average annual US deaths from insect stings" },
  spiders: { stat: "3,000+", context: "Spider species found in North America" },
  "stink-bugs": { stat: "1998", context: "Year this invasive species was first found in the US" },
  silverfish: { stat: "3–6 yrs", context: "Average lifespan of a single silverfish" },
};

/* Related pests */
const relatedPestMap: Record<string, string[]> = {
  ants: ["termites", "cockroaches", "spiders"],
  cockroaches: ["ants", "mice-rats", "silverfish"],
  "mice-rats": ["cockroaches", "spiders", "silverfish"],
  mosquitoes: ["wasps-hornets", "stink-bugs", "ants"],
  termites: ["ants", "silverfish", "cockroaches"],
  "bed-bugs": ["cockroaches", "spiders", "silverfish"],
  "wasps-hornets": ["mosquitoes", "spiders", "ants"],
  spiders: ["ants", "silverfish", "stink-bugs"],
  "stink-bugs": ["spiders", "ants", "silverfish"],
  silverfish: ["cockroaches", "spiders", "stink-bugs"],
};

/* ============ Component ============ */
const PestPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const pest = pests.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pest) {
      document.title = pest.titleTag;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", pest.metaDescription);
    }
  }, [pest]);

  if (!pest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Pest page not found</h1>
          <Link to="/" className="text-primary underline mt-4 block">Go home</Link>
        </div>
      </div>
    );
  }

  const PestIcon = pestIconMap[slug || ""] || Bug;
  const stat = pestStats[slug || ""];
  const relatedSlugs = relatedPestMap[slug || ""] || [];
  const relatedPests = pests.filter((p) => relatedSlugs.includes(p.slug));

  const DOMAIN = "https://pest-guard-dc.lovable.app";
  const ogTitle = `${pest.name} Control in Washington DC | PestGuard`;
  const ogDesc = pest.quickAnswer.length > 155 ? pest.quickAnswer.slice(0, 152) + '...' : pest.quickAnswer;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{pest.titleTag}</title>
        <meta name="description" content={pest.metaDescription} />
        <meta property="og:site_name" content="PestGuard" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={`${DOMAIN}/pests/${pest.slug}`} />
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
                  {pest.h1}
                </h1>
                {/* Quick Answer pill */}
                <div className="mt-6 bg-primary/15 border border-primary/30 rounded-xl p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Quick Answer</p>
                  <p className="text-secondary-foreground/90 leading-relaxed">{pest.quickAnswer}</p>
                </div>
                <Link to="/#plans">
                  <Button size="lg" className="mt-8">
                    Get a Quote
                  </Button>
                </Link>
              </motion.div>
              {/* Pest Illustration */}
              <motion.div {...fadeIn(0.2)} className="flex justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-secondary-foreground/5 border border-secondary-foreground/10 flex items-center justify-center">
                  <PestIcon className="h-24 w-24 sm:h-32 sm:w-32 text-primary/40" strokeWidth={1} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT ARE [PEST]? — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max max-w-3xl">
            <motion.div {...fadeIn()}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Are {pest.name}?</h2>
              <div className="mt-6 space-y-4">
                {pest.definition.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-lg">{p}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 3. SIGNS — Warning/Amber ─── */}
        <section className="bg-warning px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max max-w-4xl">
            <motion.div {...fadeIn()} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-warning-foreground">
                How to Know If {pest.name} Are in Your Home
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pest.signs.map((sign, i) => (
                <motion.div
                  key={sign.title}
                  {...fadeIn(i * 0.08)}
                  className="flex gap-4 items-start bg-background/80 rounded-xl p-5 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground">{sign.title}</span>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{sign.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. WHY A PROBLEM — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div {...fadeIn()}>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Why {pest.name} Are a Problem in DC, MD & VA
                </h2>
                <div className="mt-6 space-y-4">
                  {pest.regionalProblem.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </motion.div>
              {/* Stat Callout */}
              {stat && (
                <motion.div {...fadeIn(0.2)} className="flex justify-center lg:justify-end">
                  <div className="bg-muted rounded-2xl p-10 text-center max-w-xs border border-border">
                    <p className="text-5xl sm:text-6xl font-bold text-primary">{stat.stat}</p>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{stat.context}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ─── 5. TREATMENT PROCESS — Navy ─── */}
        <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max">
            <motion.div {...fadeIn()} className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold">
                How PestGuard Treats {pest.name}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Timeline connector */}
              <div className="hidden md:block absolute top-[2.5rem] left-[16.6%] right-[16.6%] h-0.5 bg-secondary-foreground/20" />
              {[
                { icon: Search, ...pest.treatment[0] },
                { icon: SprayCan, ...pest.treatment[1] },
                { icon: ShieldCheck, ...pest.treatment[2] },
              ].map((step, i) => (
                <motion.div key={step.stage} {...fadeIn(i * 0.15)} className="flex flex-col items-center text-center relative">
                  <div className="w-20 h-20 rounded-full bg-secondary-foreground/10 flex items-center justify-center mb-6 border-4 border-secondary relative z-10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-2">Stage {i + 1}</span>
                  <h3 className="font-bold text-xl mb-2">{step.stage}</h3>
                  <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. DIY vs PRO — Light gray ─── */}
        <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max max-w-4xl">
            <motion.div {...fadeIn()} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                DIY vs Professional {pest.name} Control
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DIY Card */}
              <motion.div {...fadeIn(0.1)} className="bg-card rounded-xl border border-border p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">DIY Approach</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{pest.diyVsPro[0]}</p>
                {pest.diyVsPro[1] && (
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{pest.diyVsPro[1]}</p>
                )}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Best for</p>
                  <p className="text-sm text-muted-foreground">Minor sightings, prevention, early-stage issues</p>
                </div>
              </motion.div>

              {/* Professional Card */}
              <motion.div {...fadeIn(0.2)} className="bg-accent rounded-xl border-2 border-primary/20 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Professional Treatment</h3>
                </div>
                <p className="text-accent-foreground text-sm leading-relaxed mb-4">{pest.diyVsPro[2] || pest.diyVsPro[1]}</p>
                <div className="pt-4 border-t border-primary/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">When to call us</p>
                  <ul className="space-y-2 text-sm text-accent-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      Persistent or recurring infestations
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      Signs of structural damage
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      DIY methods haven't worked
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 7. FAQ — White ─── */}
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max max-w-3xl mx-auto">
            <motion.div {...fadeIn()} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Questions — {pest.name}
              </h2>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {pest.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-card">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 gap-3">
                    <span className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-8">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── 8. CTA — Green ─── */}
        <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="container-max text-center">
            <motion.div {...fadeIn()}>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Done dealing with {pest.name.toLowerCase()}? So are we.
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-lg max-w-lg mx-auto">
                Our Plus and Premium plans cover {pest.name.toLowerCase()} with guaranteed results. No contracts.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#plans">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none font-semibold text-base px-8"
                  >
                    Start Your Plan
                  </Button>
                </Link>
                <Link to="/#plans">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 9. RELATED PESTS — Light gray ─── */}
        {relatedPests.length > 0 && (
          <section className="bg-muted px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="container-max max-w-3xl mx-auto">
              <motion.div {...fadeIn()} className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground">You Might Also Be Dealing With</h3>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPests.map((rp, i) => {
                  const RpIcon = pestIconMap[rp.slug] || Bug;
                  return (
                    <motion.div key={rp.slug} {...fadeIn(i * 0.1)}>
                      <Link
                        to={`/pests/${rp.slug}`}
                        className="block bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all text-center group"
                      >
                        <RpIcon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{rp.name}</span>
                        <p className="text-xs text-muted-foreground mt-1">Learn more →</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── 10. LOCATION LINKS — Accent ─── */}
        <section className="bg-accent px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="container-max">
            <motion.div {...fadeIn()} className="text-center mb-8">
              <h3 className="text-xl font-bold text-accent-foreground">
                Serving DC Metro Homeowners Across the Region
              </h3>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {loc.city}, {loc.state}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RELATED BLOG ARTICLES ─── */}
        {(() => {
          const pestBlogMap: Record<string, string[]> = {
            'termites': ['do-i-have-termites-dc', 'pest-season-washington-dc', 'pest-control-cost-dc-md-va'],
            'mice-rats': ['mice-control-washington-dc', 'winterize-home-pest-control-dc', 'pest-season-washington-dc'],
            'mosquitoes': ['mosquito-control-washington-dc', 'pest-season-washington-dc', 'pest-control-subscription-vs-one-time-dc'],
            'cockroaches': ['cockroach-control-washington-dc', 'pest-control-cost-dc-md-va', 'pest-control-subscription-vs-one-time-dc'],
            'bed-bugs': ['bed-bug-treatment-washington-dc', 'pest-control-cost-dc-md-va', 'pest-season-washington-dc'],
            'stink-bugs': ['stink-bug-control-washington-dc', 'winterize-home-pest-control-dc', 'pest-season-washington-dc'],
            'ants': ['pest-season-washington-dc', 'pest-control-subscription-vs-one-time-dc', 'winterize-home-pest-control-dc'],
            'wasps-hornets': ['pest-season-washington-dc', 'pest-control-cost-dc-md-va', 'pest-control-subscription-vs-one-time-dc'],
            'spiders': ['winterize-home-pest-control-dc', 'pest-season-washington-dc', 'pest-control-subscription-vs-one-time-dc'],
            'silverfish': ['winterize-home-pest-control-dc', 'pest-control-cost-dc-md-va', 'pest-control-subscription-vs-one-time-dc'],
          };
          const slugs = pestBlogMap[slug || ''] || [];
          const articles = slugs.map(s => getArticleBySlug(s)).filter(Boolean);
          if (articles.length === 0) return null;
          return (
            <section className="bg-[hsl(210,20%,98%)] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="container-max">
                <motion.div {...fadeIn()} className="text-center mb-12">
                  <h2 className="text-[26px] font-bold text-secondary mb-2">
                    From The Nest — Our Home Protection Blog
                  </h2>
                  <p className="text-base text-muted-foreground">
                    Practical advice from the PestGuard field team
                  </p>
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((a, i) => (
                    <motion.div key={a!.slug} {...fadeIn(i * 0.1)}>
                      <Link
                        to={`/blog/${a!.slug}`}
                        className="flex flex-col bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full group"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={a!.heroImage}
                            alt={a!.heroAlt}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a!.categoryColor}`}>
                              {a!.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{a!.readTime} min read</span>
                          </div>
                          <h3 className="text-lg font-bold text-secondary leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {a!.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {a!.excerpt}
                          </p>
                          <span className="mt-auto text-sm font-medium text-primary flex items-center gap-1">
                            Read Article <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <Link
                    to="/blog"
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    View all articles in The Nest <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}
      </main>
      <Footer />
    </div>
  );
};

export default PestPage;
