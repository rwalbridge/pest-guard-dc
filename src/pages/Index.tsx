import { useState } from "react";
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

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Plus");

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen">
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
