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
                {/* Background circle */}
                <circle cx="260" cy="240" r="200" fill="rgba(61,184,122,0.06)" />

                {/* Small floating background shapes */}
                <circle cx="120" cy="100" r="18" fill="rgba(61,184,122,0.12)" />
                <rect x="400" y="130" width="24" height="24" rx="6" fill="rgba(61,184,122,0.12)" />
                <circle cx="430" cy="340" r="12" fill="rgba(61,184,122,0.10)" />

                {/* Ground line */}
                <rect x="60" y="400" width="400" height="2" rx="1" fill="rgba(255,255,255,0.1)" />

                {/* Ground plants */}
                <ellipse cx="110" cy="398" rx="8" ry="14" fill="rgba(61,184,122,0.3)" />
                <ellipse cx="140" cy="396" rx="6" ry="10" fill="rgba(61,184,122,0.2)" />
                <ellipse cx="380" cy="397" rx="7" ry="12" fill="rgba(61,184,122,0.25)" />

                {/* === Door & Doorframe (right side) === */}
                {/* Doorframe */}
                <rect x="310" y="200" width="120" height="200" rx="4" fill="rgba(255,255,255,0.08)" />
                {/* Door */}
                <rect x="320" y="210" width="100" height="190" rx="3" fill="#0A1628" />
                <rect x="320" y="210" width="100" height="190" rx="3" fill="rgba(255,255,255,0.12)" />
                {/* Door handle */}
                <circle cx="400" cy="310" r="4" fill="rgba(255,255,255,0.25)" />

                {/* Potted plant beside door */}
                <rect x="290" y="380" width="16" height="20" rx="3" fill="rgba(255,255,255,0.15)" />
                <circle cx="298" cy="374" r="12" fill="#3DB87A" opacity="0.6" />
                <circle cx="292" cy="370" r="8" fill="#3DB87A" opacity="0.4" />

                {/* === Character 2 — Homeowner (at door) === */}
                {/* Body */}
                <rect x="340" y="290" width="55" height="110" rx="16" fill="rgba(255,255,255,0.85)" />
                {/* Head */}
                <circle cx="367" cy="268" r="26" fill="#E8B99A" />
                {/* Hair */}
                <ellipse cx="367" cy="252" rx="22" ry="14" fill="#1A1A2E" />
                {/* Eyes */}
                <circle cx="358" cy="270" r="2.5" fill="#1A1A2E" />
                <circle cx="376" cy="270" r="2.5" fill="#1A1A2E" />
                {/* Greeting arm (raised) */}
                <rect x="390" y="295" width="40" height="14" rx="7" fill="#E8B99A" transform="rotate(-30 390 302)" />
                {/* Hand */}
                <circle cx="424" cy="280" r="8" fill="#E8B99A" />

                {/* === Character 1 — Technician (left) === */}
                {/* Body (green uniform) */}
                <rect x="140" y="290" width="60" height="110" rx="16" fill="#3DB87A" />
                {/* Head */}
                <circle cx="170" cy="268" r="28" fill="#F5C5A3" />
                {/* Hair */}
                <ellipse cx="170" cy="250" rx="24" ry="14" fill="#1A1A2E" />
                {/* Eyes */}
                <circle cx="161" cy="270" r="2.5" fill="#1A1A2E" />
                <circle cx="179" cy="270" r="2.5" fill="#1A1A2E" />
                {/* Smile (subtle arc) */}
                <path d="M163,280 Q170,286 177,280" stroke="#1A1A2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Badge on chest */}
                <path d="M165,300 L170,296 L175,300 L175,306 C175,308 170,310 170,310 C170,310 165,308 165,306Z" fill="white" opacity="0.9" />
                <path d="M168,302 L170,304 L173,301" stroke="#3DB87A" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Left arm holding clipboard */}
                <rect x="105" y="300" width="42" height="14" rx="7" fill="#F5C5A3" />
                {/* Clipboard */}
                <rect x="95" y="295" width="22" height="30" rx="3" fill="#E8F8F0" />
                <rect x="100" y="302" width="12" height="2" rx="1" fill="#3DB87A" opacity="0.5" />
                <rect x="100" y="307" width="10" height="2" rx="1" fill="#3DB87A" opacity="0.4" />
                <rect x="100" y="312" width="8" height="2" rx="1" fill="#3DB87A" opacity="0.3" />

                {/* === Speech bubble above homeowner === */}
                <rect x="400" y="225" width="42" height="28" rx="10" fill="white" />
                {/* Bubble tail */}
                <polygon points="412,253 418,253 408,262" fill="white" />
                {/* Mini shield + check inside bubble */}
                <path d="M416,233 L421,230 L426,233 L426,238 C426,240 421,242 421,242 C421,242 416,240 416,238Z" fill="#3DB87A" />
                <path d="M419,236 L421,238 L424,234" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
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
