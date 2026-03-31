import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PricingPlans from "@/components/PricingPlans";
import PestsWeCover from "@/components/PestsWeCover";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ServiceArea from "@/components/ServiceArea";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import QuoteFlow from "@/components/quote-flow/QuoteFlow";

const DOMAIN = "https://pest-guard-dc.lovable.app";

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [preSelectedPlan, setPreSelectedPlan] = useState<string | null>(null);

  const openQuote = (plan?: string) => {
    setPreSelectedPlan(plan ?? null);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>GreenShield — Trusted Pest Control in Washington DC</title>
        <meta name="description" content="Eco-friendly, kid-safe pest protection for DC metro homes. No contracts. Satisfaction guaranteed. Plans from $49/mo." />
        <meta property="og:site_name" content="GreenShield" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="GreenShield — Trusted Pest Control in Washington DC" />
        <meta property="og:description" content="Eco-friendly, kid-safe pest protection for DC metro homes. No contracts. Satisfaction guaranteed. Plans from $49/mo." />
        <meta property="og:url" content={`${DOMAIN}/`} />
        <meta property="og:image" content={`${DOMAIN}/og-images/homepage.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@GreenShieldDC" />
        <meta name="twitter:title" content="GreenShield — Trusted Pest Control in Washington DC" />
        <meta name="twitter:description" content="Eco-friendly, kid-safe pest protection for DC metro homes. No contracts. Satisfaction guaranteed. Plans from $49/mo." />
        <meta name="twitter:image" content={`${DOMAIN}/og-images/homepage.jpg`} />
      </Helmet>
      <Header onGetQuote={() => openQuote()} />
      <Hero onGetQuote={() => openQuote()} />
      <HowItWorks />
      <PricingPlans onSelectPlan={(plan) => openQuote(plan)} />
      <PestsWeCover />
      <WhyChooseUs />
      <Testimonials />
      <ServiceArea />
      <FAQ />
      <Footer />
      <QuoteFlow
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        preSelectedPlan={preSelectedPlan}
      />
    </div>
  );
};

export default Index;
