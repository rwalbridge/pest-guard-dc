import { Shield, Star, Clock, RefreshCw, ChevronDown, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroProps {
  onGetQuote?: () => void;
}

const Hero = ({ onGetQuote }: HeroProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trustItems = [
    { icon: Shield, label: "Licensed in DC, MD & VA" },
    { icon: Star, label: "4.9 Stars · 800+ Families" },
    { icon: Clock, label: "Same-Week Service" },
    { icon: RefreshCw, label: "If They're Back, So Are We" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: "#0A1628" }}>
      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pt-28 sm:pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left column — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full mb-6"
              style={{
                background: "rgba(61,184,122,0.15)",
                border: "1px solid rgba(61,184,122,0.4)",
                padding: "6px 16px",
              }}
            >
              <span style={{ color: "#3DB87A", fontSize: "13px", letterSpacing: "0.05em", fontWeight: 500 }}>
                Eco-friendly · Kid-safe · Licensed in DC, MD &amp; VA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="block text-[42px] lg:text-[64px] font-extrabold leading-[1.1] text-white">
                Your Home Should Feel Like{" "}
              </span>
              <span className="block text-[42px] lg:text-[64px] leading-[1.1] font-semibold italic" style={{ color: "#3DB87A" }}>
                a Sanctuary.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[22px] lg:text-[28px] italic font-normal mt-4 mb-8"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              We make sure it does.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[17px] leading-[1.7] max-w-[480px] mb-10"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Most DC homeowners don't think about pest control until something shows up uninvited. GreenShield runs quietly in the background — eco-friendly, kid-safe treatments on a schedule that keeps your home protected before problems start. No contracts, no surprises, just peace of mind.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
                className="h-[52px] px-8 rounded-full text-base font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 sm:w-auto w-full"
                style={{ background: "#3DB87A" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2ea86a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#3DB87A")}
              >
                See Our Plans
              </button>
              <button
                onClick={onGetQuote}
                className="h-[52px] px-8 rounded-full text-base font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 sm:w-auto w-full"
                style={{
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "white";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Get a Quote
              </button>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="hidden lg:flex items-center"
            >
              {trustItems.map((item, i) => (
                <div key={item.label} className="flex items-center">
                  {i > 0 && (
                    <div className="mx-0" style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)" }} />
                  )}
                  <div className="flex items-center gap-2 px-6">
                    <item.icon size={16} style={{ color: "#3DB87A" }} aria-label={item.label} />
                    <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Trust Bar — Mobile 2x2 grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 lg:hidden"
            >
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 justify-center">
                  <item.icon size={16} style={{ color: "#3DB87A" }} aria-label={item.label} />
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — SVG Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center max-h-[280px] lg:max-h-none"
          >
            {/* PHOTO_SWAP: To replace illustration with a real photo later:
                1. Add <img> with object-fit: cover
                2. Height: 100% of hero section
                3. border-radius: 16px 0 0 16px
                4. Remove the SVG illustration
                5. Reposition floating stat cards to avoid the photo focal point */}

            <div className="relative w-[320px] h-[320px] lg:w-[480px] lg:h-[480px]">
              {/* Layer 1 — Background circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
                <circle cx="240" cy="240" r="240" fill="rgba(61,184,122,0.08)" />
              </svg>

              {/* Layer 2 — House silhouette */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
                {/* Roof */}
                <polygon points="240,140 140,210 340,210" fill="rgba(255,255,255,0.12)" />
                {/* Body */}
                <rect x="155" y="210" width="170" height="130" fill="rgba(255,255,255,0.12)" />
                {/* Door */}
                <rect x="222" y="280" width="36" height="60" rx="4" fill="rgba(255,255,255,0.08)" />
                {/* Windows */}
                <rect x="172" y="230" width="32" height="28" rx="3" fill="rgba(255,255,255,0.08)" />
                <rect x="276" y="230" width="32" height="28" rx="3" fill="rgba(255,255,255,0.08)" />
              </svg>

              {/* Layer 3 — Shield */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480" style={{ filter: "drop-shadow(0 8px 32px rgba(61,184,122,0.4))" }}>
                <g transform="translate(240,190)" opacity="0.9">
                  <path
                    d="M0,-60 C25,-60 50,-50 60,-35 L60,10 C60,40 35,55 0,70 C-35,55 -60,40 -60,10 L-60,-35 C-50,-50 -25,-60 0,-60Z"
                    fill="#3DB87A"
                  />
                  {/* Checkmark inside shield */}
                  <polyline
                    points="-18,5 -6,18 22,-10"
                    fill="none"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>

              {/* Layer 4 — Orbiting dots */}
              <svg className="absolute inset-0 w-full h-full hero-orbit" viewBox="0 0 480 480">
                <g style={{ transformOrigin: "240px 190px" }}>
                  <circle cx="310" cy="130" r="4" fill="#3DB87A" opacity="0.7" />
                  <circle cx="170" cy="250" r="3" fill="#3DB87A" opacity="0.5" />
                  <circle cx="300" cy="260" r="2.5" fill="#3DB87A" opacity="0.6" />
                </g>
              </svg>

              {/* Layer 5 — Floating stat cards */}
              {/* Card 1 — upper right */}
              <div className="absolute top-4 right-0 lg:top-2 lg:-right-4 hero-float-1">
                <div className="bg-white rounded-xl px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-1">
                    <span className="text-[20px] font-bold" style={{ color: "#3DB87A" }}>⭐ 4.9</span>
                  </div>
                  <p className="text-[12px] text-gray-500">800+ DC families</p>
                </div>
              </div>

              {/* Card 2 — lower left */}
              <div className="absolute bottom-8 left-0 lg:bottom-6 lg:-left-4 hero-float-2">
                <div className="bg-white rounded-xl px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2">
                    <Home size={20} style={{ color: "#3DB87A" }} aria-label="Home icon" />
                    <span className="text-[16px] font-bold" style={{ color: "#0A1628" }}>2,400+</span>
                  </div>
                  <p className="text-[11px] text-gray-500">protected in DC metro</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hero-bounce transition-opacity duration-300"
        style={{ opacity: scrolled ? 0 : 0.4 }}
      >
        <ChevronDown size={28} color="white" aria-label="Scroll down" />
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 w-full z-10 leading-[0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0,40 C360,0 720,60 1440,20 L1440,60 L0,60Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
