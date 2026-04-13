import { Shield, Star, Clock, RefreshCw, ChevronDown, Users, CheckCircle } from "lucide-react";
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
    { icon: Shield,    label: "Licensed in DC, MD & VA" },
    { icon: Star,      label: "4.9 Stars · 800+ Families" },
    { icon: Clock,     label: "Same-Week Service" },
    { icon: RefreshCw, label: "If They're Back, So Are We" },
  ];

  return (
    <section
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      {/* ── PHOTO PANEL (right half, full bleed) ── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] z-0">
        {/* 
          PHOTO_SWAP: Replace this src with your real photo.
          Best sources:
          - Unsplash: search "suburban home exterior professional"
          - Pexels: search "pest control technician home"
          - Your own branded photography
          Ideal dimensions: 1200×900px, warm natural light
        */}
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=85&fit=crop"
          alt="Beautiful suburban home protected by PestGuard"
          className="w-full h-full object-cover object-center"
        />

        {/* Gradient mask — left edge blends into navy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0A1628 0%, #0A1628 8%, rgba(10,22,40,0.85) 25%, rgba(10,22,40,0.3) 55%, rgba(10,22,40,0.0) 100%)",
          }}
        />

        {/* Gradient mask — bottom edge for wave transition */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0A1628 0%, rgba(10,22,40,0.4) 15%, transparent 35%)",
          }}
        />

        {/* Subtle green brand tint overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,22,40,0.15)", mixBlendMode: "multiply" }}
        />

        {/* Mobile: stronger overlay so text stays readable */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "rgba(10,22,40,0.7)" }}
        />
      </div>

      {/* ── FLOATING STAT CARDS (on photo, desktop only) ── */}

      {/* Card 1 — Rating, upper right */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="absolute top-32 right-6 xl:right-16 z-20 hidden lg:block"
        style={{ animation: "floatA 4s ease-in-out infinite alternate" }}
      >
        <div
          className="bg-white rounded-2xl px-5 py-4"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">⭐</span>
            <span
              className="text-[22px] font-extrabold"
              style={{ color: "#0A1628" }}
            >
              4.9
            </span>
          </div>
          <p className="text-[12px] font-medium" style={{ color: "#6B7280" }}>
            800+ DC families
          </p>
        </div>
      </motion.div>

      {/* Card 2 — Homes protected, mid right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="absolute bottom-48 right-6 xl:right-20 z-20 hidden lg:block"
        style={{ animation: "floatB 4s ease-in-out infinite alternate" }}
      >
        <div
          className="bg-white rounded-2xl px-5 py-4"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(61,184,122,0.12)" }}
            >
              <Users size={16} style={{ color: "#3DB87A" }} />
            </div>
            <span
              className="text-[18px] font-extrabold"
              style={{ color: "#0A1628" }}
            >
              2,400+
            </span>
          </div>
          <p className="text-[12px] font-medium" style={{ color: "#6B7280" }}>
            homes protected in DC metro
          </p>
        </div>
      </motion.div>

      {/* Card 3 — Same week service, lower right */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="absolute bottom-24 right-48 xl:right-72 z-20 hidden lg:block"
        style={{ animation: "floatA 5s ease-in-out infinite alternate" }}
      >
        <div
          className="bg-white rounded-2xl px-5 py-3.5"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={18} style={{ color: "#3DB87A" }} />
            <div>
              <p
                className="text-[13px] font-semibold leading-tight"
                style={{ color: "#0A1628" }}
              >
                Same-week service
              </p>
              <p className="text-[11px]" style={{ color: "#6B7280" }}>
                available in your area
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[580px]">

            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full mb-7"
              style={{
                background: "rgba(61,184,122,0.15)",
                border: "1px solid rgba(61,184,122,0.4)",
                padding: "7px 18px",
              }}
            >
              <span
                style={{
                  color: "#3DB87A",
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  fontWeight: 500,
                }}
              >
                Eco-friendly · Kid-safe · Licensed in DC, MD &amp; VA
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-5"
            >
              <span className="block font-extrabold leading-[1.08] text-white"
                style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
                Your Home Should
              </span>
              <span className="block font-extrabold leading-[1.08] text-white"
                style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
                Feel Like
              </span>
              <span
                className="block font-semibold italic leading-[1.08]"
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  color: "#3DB87A",
                }}
              >
                a Sanctuary.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="italic font-normal mb-7"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(20px, 2.5vw, 26px)",
              }}
            >
              We make sure it does.
            </motion.p>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="leading-[1.75] mb-10 max-w-[500px]"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "17px",
              }}
            >
              Most DC homeowners don't think about pest control until something
              shows up uninvited. PestGuard runs quietly in the background —
              eco-friendly, kid-safe treatments on a schedule that keeps your
              home protected before problems start. No contracts, no surprises,
              just peace of mind.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("plans")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-[54px] px-9 rounded-full text-[16px] font-semibold
                           text-white transition-all duration-200 ease-out
                           hover:-translate-y-0.5 hover:shadow-lg
                           sm:w-auto w-full"
                style={{ background: "#3DB87A" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#2ea86a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#3DB87A")
                }
              >
                See Our Plans
              </button>

              <button
                onClick={onGetQuote}
                className="h-[54px] px-9 rounded-full text-[16px] font-semibold
                           text-white transition-all duration-200 ease-out
                           hover:-translate-y-0.5 sm:w-auto w-full"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "2px solid rgba(255,255,255,0.45)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.85)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.45)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.08)";
                }}
              >
                Get a Free Quote
              </button>
            </motion.div>

            {/* ── TRUST BAR ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              {/* Divider above trust bar */}
              <div
                className="mb-5 w-16 h-[1px]"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />

              {/* Desktop — single row with dividers */}
              <div className="hidden lg:flex items-center flex-wrap gap-y-3">
                {trustItems.map((item, i) => (
                  <div key={item.label} className="flex items-center">
                    {i > 0 && (
                      <div
                        className="mx-4"
                        style={{
                          width: "1px",
                          height: "20px",
                          background: "rgba(255,255,255,0.18)",
                        }}
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <item.icon
                        size={14}
                        style={{ color: "#3DB87A", flexShrink: 0 }}
                        aria-label={item.label}
                      />
                      <span
                        className="text-[13px] font-medium whitespace-nowrap"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile — 2×2 grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 lg:hidden">
                {trustItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2"
                  >
                    <item.icon
                      size={14}
                      style={{ color: "#3DB87A", flexShrink: 0 }}
                      aria-label={item.label}
                    />
                    <span
                      className="text-[12px] font-medium leading-snug"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30
                   transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 0.35 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={26} color="white" aria-label="Scroll down" />
        </motion.div>
      </div>

      {/* ── BOTTOM WAVE TRANSITION ── */}
      <div className="absolute bottom-0 left-0 w-full z-20 leading-[0]">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <path
            d="M0,40 C360,0 720,60 1440,20 L1440,60 L0,60Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>

      {/* ── KEYFRAME ANIMATIONS ── */}
      <style>{`
        @keyframes floatA {
          from { transform: translateY(0px);  }
          to   { transform: translateY(-10px); }
        }
        @keyframes floatB {
          from { transform: translateY(-6px); }
          to   { transform: translateY(6px);  }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
