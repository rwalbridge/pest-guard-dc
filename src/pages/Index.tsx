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
import SignupModal from "@/components/SignupModal";

const DOMAIN = "https://pest-guard-dc.lovable.app";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Plus");

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
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
      <Header />
      <Hero />
      <HowItWorks />
      <PricingPlans onSelectPlan={handleSelectPlan} />
      <PestsWeCover />
      <WhyChooseUs />
      <Testimonials />
      <ServiceArea />
      <FAQ />
      <Footer />
      <SignupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Index;
