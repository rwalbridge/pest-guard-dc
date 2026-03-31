import { Shield, Star, Clock, RefreshCw, ChevronDown, Check } from "lucide-react";
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
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pt-[100px] pb-[80px]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left column */}
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
              <span className="block text-[42px] lg:text-[58px] font-extrabold leading-[1.1] text-white">
                Your Home Should{" "}
                <span className="whitespace-nowrap">Feel Like</span>
              </span>
              <span className="block text-[42px] lg:text-[58px] leading-[1.1] font-semibold italic" style={{ color: "#3DB87A" }}>
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
                  background: "rgba(255,255,255,0.08)",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
              >
                Get a Quote
              </button>
            </motion.div>

            {/* Trust Bar — Desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="hidden xl:flex items-center flex-wrap"
            >
              {trustItems.map((item, i) => (
                <div key={item.label} className="flex items-center">
                  {i > 0 && (
                    <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)" }} />
                  )}
                  <div className="flex items-center gap-2 px-4">
                    <item.icon size={16} style={{ color: "#3DB87A", flexShrink: 0 }} aria-label={item.label} />
                    <span className="text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Trust Bar — 2x2 grid (below 1280px) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-2 gap-4 xl:hidden"
            >
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 justify-center">
                  <item.icon size={16} style={{ color: "#3DB87A", flexShrink: 0 }} aria-label={item.label} />
                  <span className="text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Illustration */}
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
            <svg
                className="w-full h-full"
                viewBox="0 0 520 480"
                fill="none"
                role="img"
                aria-label="GreenShield technician greeting a homeowner at their front door"
              >
                {/* Subtle radial glow behind entire scene */}
                <defs>
                  <radialGradient id="sceneBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(61,184,122,0.05)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="porchLight" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(245,197,163,0.3)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A3A2A" />
                    <stop offset="100%" stopColor="#0F2A1A" />
                  </linearGradient>
                </defs>

                {/* Scene background glow */}
                <rect x="0" y="0" width="520" height="480" fill="url(#sceneBg)" />

                {/* Background circle — visible edge */}
                <circle cx="260" cy="230" r="200" fill="rgba(61,184,122,0.10)" stroke="rgba(61,184,122,0.2)" strokeWidth="1" />

                {/* Small floating background shapes */}
                <circle cx="120" cy="100" r="18" fill="rgba(61,184,122,0.12)" />
                <rect x="410" y="110" width="24" height="24" rx="6" fill="rgba(61,184,122,0.12)" />
                <circle cx="440" cy="320" r="12" fill="rgba(61,184,122,0.10)" />

                {/* === GROUND / GRASS === */}
                <rect x="40" y="400" width="440" height="40" rx="0" fill="url(#groundGrad)" />
                {/* Grass tufts — foreground */}
                <ellipse cx="100" cy="400" rx="5" ry="12" fill="rgba(61,184,122,0.6)" />
                <ellipse cx="115" cy="400" rx="4" ry="9" fill="rgba(61,184,122,0.4)" />
                <ellipse cx="125" cy="400" rx="3" ry="7" fill="rgba(61,184,122,0.5)" />
                <ellipse cx="400" cy="400" rx="4" ry="10" fill="rgba(61,184,122,0.5)" />
                <ellipse cx="415" cy="400" rx="3" ry="8" fill="rgba(61,184,122,0.35)" />
                <ellipse cx="220" cy="400" rx="4" ry="9" fill="rgba(61,184,122,0.4)" />

                {/* === PATHWAY === */}
                <rect x="320" y="400" width="50" height="40" fill="#2A3A4A" />

                {/* === HOUSE EXTERIOR === */}
                {/* Walls */}
                <rect x="260" y="230" width="200" height="170" fill="#1E3A5F" />
                {/* Roofline */}
                <polygon points="250,230 360,170 470,230" fill="#2D4A6B" />

                {/* Door frame — green accent */}
                <rect x="318" y="278" width="86" height="122" rx="0" fill="#3DB87A" />
                {/* Door */}
                <rect x="322" y="282" width="78" height="118" rx="4" fill="#2D4A6B" />
                {/* Door knob */}
                <circle cx="385" cy="345" r="5" fill="#F5C5A3" />

                {/* Step / Porch */}
                <rect x="295" y="400" width="100" height="16" rx="2" fill="#3A5A7A" />

                {/* Porch light */}
                <circle cx="361" cy="268" r="20" fill="url(#porchLight)" />
                <circle cx="361" cy="268" r="5" fill="#F5C5A3" />

                {/* === PLANTS === */}
                {/* Bush left of door */}
                <circle cx="270" cy="388" r="14" fill="#2EA86A" />
                <circle cx="282" cy="384" r="11" fill="#3DB87A" opacity="0.8" />
                <circle cx="260" cy="384" r="10" fill="#2EA86A" opacity="0.7" />

                {/* Tall plant right of doorframe */}
                <line x1="420" y1="400" x2="420" y2="365" stroke="#2EA86A" strokeWidth="2" />
                <ellipse cx="420" cy="358" rx="12" ry="16" fill="#3DB87A" />

                {/* === CHARACTER 2 — HOMEOWNER (at door) === */}
                {/* Body */}
                <rect x="340" y="310" width="50" height="90" rx="14" fill="rgba(255,255,255,0.85)" />
                {/* Left arm — raised waving */}
                <rect x="330" y="290" width="12" height="45" rx="6" fill="#D4A67A" transform="rotate(-30 336 312)" />
                {/* Hand */}
                <circle cx="318" cy="278" r="7" fill="#D4A67A" />
                {/* Right arm — relaxed at side */}
                <rect x="387" y="320" width="12" height="40" rx="6" fill="#D4A67A" />
                {/* Head */}
                <circle cx="365" cy="288" r="24" fill="#C68642" />
                {/* Hair */}
                <ellipse cx="365" cy="274" rx="20" ry="12" fill="#1A1A2E" />
                {/* Eyes */}
                <circle cx="357" cy="290" r="2" fill="#1A1A2E" />
                <circle cx="373" cy="290" r="2" fill="#1A1A2E" />
                {/* Nose */}
                <circle cx="365" cy="295" r="1.2" fill="rgba(26,26,46,0.4)" />
                {/* Cheeks */}
                <circle cx="354" cy="296" r="4" fill="rgba(240,150,120,0.3)" />
                <circle cx="376" cy="296" r="4" fill="rgba(240,150,120,0.3)" />
                {/* Smile */}
                <path d="M358,300 Q365,306 372,300" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* === CHARACTER 1 — TECHNICIAN (left) === */}
                {/* Body (green uniform) */}
                <rect x="140" y="310" width="60" height="90" rx="16" fill="#3DB87A" />
                {/* Left arm — holding clipboard */}
                <rect x="112" y="318" width="14" height="50" rx="7" fill="#2EA86A" transform="rotate(8 119 343)" />
                {/* Clipboard */}
                <rect x="98" y="350" width="20" height="26" rx="3" fill="white" />
                <rect x="102" y="357" width="12" height="2" rx="1" fill="#3DB87A" opacity="0.6" />
                <rect x="102" y="362" width="10" height="2" rx="1" fill="#3DB87A" opacity="0.5" />
                <rect x="102" y="367" width="8" height="2" rx="1" fill="#3DB87A" opacity="0.4" />
                {/* Right arm — greeting gesture */}
                <rect x="196" y="305" width="14" height="48" rx="7" fill="#2EA86A" transform="rotate(-35 203 329)" />
                {/* Hand */}
                <circle cx="224" cy="295" r="8" fill="#F5C5A3" />
                {/* Head */}
                <circle cx="170" cy="288" r="28" fill="#F5C5A3" />
                {/* Hair */}
                <ellipse cx="170" cy="270" rx="24" ry="14" fill="#1A1A2E" />
                {/* Eyes */}
                <circle cx="161" cy="290" r="2" fill="#1A1A2E" />
                <circle cx="179" cy="290" r="2" fill="#1A1A2E" />
                {/* Nose */}
                <circle cx="170" cy="296" r="1.2" fill="rgba(26,26,46,0.4)" />
                {/* Cheeks */}
                <circle cx="158" cy="297" r="4" fill="rgba(240,150,120,0.3)" />
                <circle cx="182" cy="297" r="4" fill="rgba(240,150,120,0.3)" />
                {/* Smile */}
                <path d="M163,302 Q170,308 177,302" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Badge on chest */}
                <path d="M165,320 L170,316 L175,320 L175,326 C175,328 170,330 170,330 C170,330 165,328 165,326Z" fill="white" opacity="0.9" />
                <path d="M168,322 L170,324 L173,321" stroke="#3DB87A" strokeWidth="1" fill="none" strokeLinecap="round" />

                {/* === SPEECH BUBBLE above homeowner === */}
                <g filter="url(#bubbleShadow)">
                  <rect x="395" y="240" width="46" height="30" rx="10" fill="white" />
                  <polygon points="410,270 418,270 406,280" fill="white" />
                </g>
                {/* Shield + check inside bubble */}
                <path d="M413,248 L418,245 L423,248 L423,254 C423,256 418,258 418,258 C418,258 413,256 413,254Z" fill="#3DB87A" />
                <path d="M415,252 L418,255 L422,250" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* Shadow filter for speech bubble */}
                <defs>
                  <filter id="bubbleShadow" x="-10%" y="-10%" width="130%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
                  </filter>
                </defs>
              </svg>

              {/* Floating stat card 1 — upper right */}
              <div className="absolute top-2 right-0 lg:top-0 lg:-right-2 hero-float-1">
                <div className="bg-white rounded-xl px-3.5 py-2.5" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                  <div className="flex items-center gap-1">
                    <span className="text-[18px] font-bold" style={{ color: "#3DB87A" }}>⭐ 4.9</span>
                  </div>
                  <p className="text-[11px]" style={{ color: "#6B7280" }}>800+ DC families</p>
                </div>
              </div>

              {/* Floating stat card 2 — lower left */}
              <div className="absolute bottom-8 left-0 lg:bottom-6 lg:-left-2 hero-float-2">
                <div className="bg-white rounded-xl px-3.5 py-2.5" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                  <div className="flex items-center gap-2">
                    <Check size={16} style={{ color: "#3DB87A" }} aria-label="Checkmark" />
                    <span className="text-[13px] font-semibold" style={{ color: "#0A1628" }}>Same-week service</span>
                  </div>
                  <p className="text-[11px]" style={{ color: "#6B7280" }}>available in your area</p>
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
