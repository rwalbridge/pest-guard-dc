import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Star, Clock, RefreshCw, CheckCircle2,
  UtensilsCrossed, Building2, ShoppingBag, Warehouse, Home,
  HeartPulse, GraduationCap, Hotel, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DOMAIN = "https://pest-guard-dc.lovable.app";

const trustItems = [
  { icon: Shield, label: "Licensed in DC, MD & VA" },
  { icon: Star, label: "4.9 Stars · 800+ DC Families" },
  { icon: Clock, label: "Same-Week Service Available" },
  { icon: RefreshCw, label: "Pests Return? We Come Back Free" },
];

const industries = [
  { icon: UtensilsCrossed, name: "Restaurants & Food Service", desc: "Health code compliant programs with zero-disruption service windows" },
  { icon: Building2, name: "Office Buildings", desc: "Discreet treatments scheduled around your team's hours" },
  { icon: ShoppingBag, name: "Retail & Shopping", desc: "Protect merchandise and reputation with invisible pest barriers" },
  { icon: Warehouse, name: "Warehouses & Industrial", desc: "Rodent exclusion, stored product pest control, and perimeter defense" },
  { icon: Home, name: "Multi-Family & HOAs", desc: "Common area, exterior, and unit-level treatment programs" },
  { icon: HeartPulse, name: "Healthcare & Medical", desc: "Low-impact treatments for sensitive environments" },
  { icon: GraduationCap, name: "Schools & Daycares", desc: "Child-safe protocols, evenings and weekend scheduling available" },
  { icon: Hotel, name: "Hotels & Hospitality", desc: "Bed bug prevention, guest room discretion, reputation protection" },
];

const benefits = [
  { title: "Health Code & Inspection Ready", desc: "Documentation and service reports formatted for DC DCRA and Maryland MDA inspections" },
  { title: "Flexible Scheduling", desc: "Pre-open, post-close, or weekend visits built around your operations" },
  { title: "Discreet Service", desc: "Unmarked vehicles and plainclothes-optional technicians available on request" },
  { title: "Dedicated Account Manager", desc: "One point of contact who knows your property inside and out" },
  { title: "Re-Treatment Guarantee", desc: "If pests return between visits, so do we. Free of charge." },
];

const stats = [
  { value: "500+", label: "Commercial properties served" },
  { value: "100%", label: "Re-treatment guarantee" },
  { value: "24hr", label: "Emergency response available" },
];

const steps = [
  { n: 1, title: "Free Site Assessment", desc: "We visit your property, identify entry points and risk areas, and design a custom program." },
  { n: 2, title: "Custom Treatment Plan", desc: "You receive a written plan with service frequency, products used, and documentation protocol." },
  { n: 3, title: "Ongoing Partnership", desc: "Regular visits, detailed service reports, and a direct line to your account manager." },
];

const testimonials = [
  { quote: "PestGuard took over our restaurant account after a failed health inspection. We've been clear for 14 months.", name: "Maria T.", role: "Restaurant Owner, Capitol Hill" },
  { quote: "They work around our office hours and I've never had to explain a pest sighting to an employee.", name: "James R.", role: "Office Manager, Rosslyn" },
  { quote: "Responsive, professional, and the documentation is perfect for our board reports.", name: "Linda K.", role: "HOA Property Manager, Bethesda" },
];

const faqs = [
  { q: "Do you offer contracts or month-to-month?", a: "Both. We offer month-to-month, 6-month, and annual agreements. Annual contracts include priority scheduling and our best rates." },
  { q: "What types of businesses do you work with?", a: "Restaurants, offices, retail, warehouses, healthcare facilities, schools, daycares, hotels, and multi-family properties across DC, MD, and Northern Virginia." },
  { q: "Will treatments disrupt our operations?", a: "No. We schedule around your hours — pre-open, post-close, or weekends — and offer unmarked vehicles on request." },
  { q: "Do you provide documentation for health inspections?", a: "Yes. Every visit includes a detailed digital service report documenting what was treated and any recommendations, formatted for DC DCRA and Maryland MDA requirements." },
  { q: "How quickly can you start?", a: "We typically complete a site walk within 48 hours and can begin service within the same week." },
  { q: "Do you treat for bed bugs in commercial properties?", a: "Yes. We offer discreet bed bug inspections and treatments for hotels, multi-family properties, and offices." },
];

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CommercialPage = () => {
  return (
    <>
      <Helmet>
        <title>Commercial Pest Control DC | PestGuard</title>
        <meta
          name="description"
          content="PestGuard provides licensed commercial pest control for restaurants, offices, retail, warehouses, and multi-family properties across DC, MD, and Northern Virginia. Custom programs, health-code compliant, discreet service."
        />
        <link rel="canonical" href={`${DOMAIN}/commercial`} />
      </Helmet>

      <Header />

      {/* HERO */}
      <section className="relative min-h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85&fit=crop"
          alt="Modern commercial office building protected by PestGuard"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.65) 40%, rgba(10,22,40,0.8) 75%, rgba(10,22,40,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: "rgba(10,40,20,0.12)", mixBlendMode: "multiply" }}
        />

        <div className="relative z-10 w-full max-w-[900px] mx-auto text-center flex flex-col items-center px-6 pt-[140px] pb-[100px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          >
            Commercial Pest Control Built for DC Businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/85 text-lg sm:text-xl mt-6 max-w-[720px]"
          >
            Custom pest control programs for restaurants, offices, retail, and multi-family
            properties — discreet, compliant, and built around your schedule.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <Link to="/commercial/quote">
              <Button
                size="lg"
                className="rounded-full bg-[#3DB87A] hover:bg-[#2ea86a] text-white font-semibold px-7 py-6 text-base"
              >
                Get a Commercial Quote →
              </Button>
            </Link>
            <a href="tel:+12025550100">
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full text-white border border-white/30 hover:bg-white/10 hover:text-white px-7 py-6 text-base"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call (202) 555-0100
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2.5 mt-10"
          >
            {trustItems.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15"
              >
                <t.icon className="h-3.5 w-3.5 text-[#3DB87A]" />
                <span className="text-white/90 text-xs sm:text-sm font-medium">{t.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeIn}
            className="text-3xl sm:text-4xl font-bold text-center text-foreground tracking-tight"
          >
            We Protect Every Type of Commercial Property
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                {...fadeIn}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[#3DB87A]/10 flex items-center justify-center mb-4">
                  <ind.icon className="h-5 w-5 text-[#3DB87A]" />
                </div>
                <h3 className="font-semibold text-foreground text-base">{ind.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PESTGUARD */}
      <section className="py-20 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A Different Standard for Commercial Clients.
            </h2>
            <div className="mt-8 space-y-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#3DB87A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">{b.title}</h3>
                    <p className="text-white/70 text-sm mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }} className="grid gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
              >
                <div className="text-5xl sm:text-6xl font-bold text-[#3DB87A]">{s.value}</div>
                <div className="text-white/75 text-sm mt-2">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeIn}
            className="text-3xl sm:text-4xl font-bold text-center text-foreground tracking-tight"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                {...fadeIn}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-[#3DB87A] text-white font-bold flex items-center justify-center text-lg">
                  {s.n}
                </div>
                <h3 className="font-semibold text-foreground text-lg mt-5">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeIn}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7 rounded-2xl border border-border bg-white"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#3DB87A] text-[#3DB87A]" />
                ))}
              </div>
              <p className="text-foreground italic leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            {...fadeIn}
            className="text-3xl sm:text-4xl font-bold text-center text-foreground tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.1 }} className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-border rounded-xl px-5"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6" style={{ background: "#0A1628" }}>
        <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Protect Your Business?
          </h2>
          <p className="text-white/75 text-lg mt-4">
            Get a custom quote — no obligation, no pressure.
          </p>
          <Link to="/commercial/quote" className="inline-block mt-8">
            <Button
              size="lg"
              className="rounded-full bg-[#3DB87A] hover:bg-[#2ea86a] text-white font-semibold px-8 py-6 text-base"
            >
              Request a Commercial Quote →
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default CommercialPage;
