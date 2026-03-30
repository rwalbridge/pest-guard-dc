import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { locations } from "@/data/locations";
import { pests as allPests } from "@/data/pests";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* Map pest display names to pest page slugs */
const pestNameToSlug: Record<string, string> = {
  "Ants": "ants",
  "Cockroaches": "cockroaches",
  "Mice & Rats": "mice-rats",
  "Mice": "mice-rats",
  "Rodents": "mice-rats",
  "Mosquitoes": "mosquitoes",
  "Termites": "termites",
  "Bed Bugs": "bed-bugs",
  "Wasps & Hornets": "wasps-hornets",
  "Spiders": "spiders",
  "Stink Bugs": "stink-bugs",
  "Silverfish": "silverfish",
  "Carpenter Ants": "ants",
};

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

  /* Related locations: same state first, then others, exclude current */
  const relatedLocations = locations
    .filter((l) => l.slug !== slug)
    .sort((a, b) => {
      if (a.state === location.state && b.state !== location.state) return -1;
      if (a.state !== location.state && b.state === location.state) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 sm:pt-28">
        {/* Hero */}
        <section className="section-padding bg-accent">
          <div className="container-max">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {location.h1} — <span className="text-primary">{location.subtitle}</span>
            </motion.h1>
            <div className="mt-6 max-w-3xl space-y-4">
              {location.introParagraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-lg">{p}</p>
              ))}
            </div>
            <Link to="/#plans">
              <Button className="mt-8" size="lg">
                Get Protected in {location.city}
              </Button>
            </Link>
          </div>
        </section>

        {/* Common Pests — each pest name links to its page */}
        <section className="section-padding">
          <div className="container-max">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Common Pests in {location.city}</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {location.pests.map((pest) => {
                const pestSlug = pestNameToSlug[pest.name];
                return (
                  <div key={pest.name} className="p-5 rounded-xl bg-muted border border-border">
                    <h3 className="font-bold text-foreground text-lg">
                      {pestSlug ? (
                        <Link to={`/pests/${pestSlug}`} className="hover:text-primary transition-colors underline decoration-primary/30">
                          {pest.name}
                        </Link>
                      ) : pest.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pest.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-muted">
          <div className="container-max">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our {location.city} Pest Control Process</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {location.process.map((step, i) => (
                <div key={step.title} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="section-padding">
          <div className="container-max">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Neighborhoods We Serve in {location.city}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {location.neighborhoods.map((n) => (
                <div key={n} className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="section-padding bg-muted">
          <div className="container-max">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why {location.city} Homeowners Choose GreenShield</h2>
            <div className="mt-8 space-y-4 max-w-2xl">
              {location.whyChoose.map((item) => (
                <div key={item.title} className="flex gap-3 items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">{item.title}</span>
                    <span className="text-muted-foreground"> — {item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container-max max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
              Frequently Asked Questions — Pest Control in {location.city}
            </h2>
            <Accordion type="single" collapsible className="mt-8">
              {location.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
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

        {/* Related Locations */}
        <section className="section-padding bg-muted">
          <div className="container-max">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">We Also Serve Nearby Areas</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{loc.city}, {loc.state}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="location-cta" className="section-padding bg-primary text-primary-foreground">
          <div className="container-max text-center">
            <Shield className="h-10 w-10 mx-auto mb-4 opacity-80" />
            <p className="text-lg max-w-xl mx-auto leading-relaxed">{location.ctaText}</p>
            <Link to="/#plans">
              <Button variant="outline" size="lg" className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none font-semibold">
                See Our Plans
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
