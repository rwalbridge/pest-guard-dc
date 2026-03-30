import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { pests } from "@/data/pests";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
              {pest.h1}
            </motion.h1>

            {/* Quick Answer */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-5 max-w-3xl">
              <p className="text-sm font-semibold text-primary mb-1">Quick Answer</p>
              <p className="text-foreground leading-relaxed">{pest.quickAnswer}</p>
            </div>
          </div>
        </section>

        {/* Definition */}
        <section className="section-padding">
          <div className="container-max max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Are {pest.name}?</h2>
            <div className="mt-4 space-y-4">
              {pest.definition.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-lg">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Signs */}
        <section className="section-padding bg-muted">
          <div className="container-max max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Signs You Have {pest.name}</h2>
            <div className="mt-6 space-y-4">
              {pest.signs.map((sign) => (
                <div key={sign.title} className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">{sign.title}</span>
                    <span className="text-muted-foreground"> — {sign.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Problem */}
        <section className="section-padding">
          <div className="container-max max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why {pest.name} Are a Problem in DC, MD & VA</h2>
            <div className="mt-4 space-y-4">
              {pest.regionalProblem.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment */}
        <section className="section-padding bg-muted">
          <div className="container-max max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How We Treat {pest.name}</h2>
            <div className="mt-6 space-y-6">
              {pest.treatment.map((step, i) => (
                <div key={step.stage} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{step.stage}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIY vs Pro */}
        <section className="section-padding">
          <div className="container-max max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">DIY vs Professional {pest.name} Control</h2>
            <div className="mt-4 space-y-4">
              {pest.diyVsPro.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-muted">
          <div className="container-max max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
              Frequently Asked Questions — {pest.name} Control
            </h2>
            <Accordion type="single" collapsible className="mt-8">
              {pest.faqs.map((faq, i) => (
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

        {/* CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-max text-center">
            <Shield className="h-10 w-10 mx-auto mb-4 opacity-80" />
            <p className="text-xl font-bold">{pest.ctaText}</p>
            <Link to="/#plans">
              <Button variant="outline" size="lg" className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none font-semibold">
                See Our Protection Plans →
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PestPage;
