import { Shield, Star, Clock, RefreshCw, ChevronDown } from "lucide-react";
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
    { icon: Star, label: "4.9 Stars · 800+ DC Families" },
    { icon: Clock, label: "Same-Week Service Available" },
    { icon: RefreshCw, label: "Pests Return? We Come Back Free" },
  ];

  return (
    <section
      role="banner"
      className="relative min-h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background photo */}
      <img
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&q=85&fit=crop"
        alt="Beautiful suburban home protected by PestGuard pest control"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: "center 60%" }}
      />

      {/* Overlay 1 — dark gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.45) 0%, rgba(10,22,40,0.55) 40%, rgba(10,22,40,0.75) 75%, rgba(10,22,40,0.92) 100%)",
        }}
      />

      {/* Overlay 2 — green tint */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: "rgba(10,40,20,0.12)", mixBlendMode: "multiply" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[860px] mx-auto text-center flex flex-col items-center px-6 sm:px-6 pt-[120px] pb-[100px] max-sm:px-5 max-sm:pt-[100px] max-sm:pb-[80px]">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full mb-7"
          style={{
            background: "rgba(61,184,122,0.18)",
            border: "1px solid rgba(61,184,122,0.45)",
            padding: "7px 20px",
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
            DC Metro's Trusted Pest Control — Eco-Friendly &amp; Kid-Safe
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 max-w-[780px]"
        >
          <span
            className="block font-extrabold leading-[1.08] text-white"
            style={{ fontSize: "clamp(38px, 5.5vw, 68px)" }}
          >
            Your Home Should Feel Like
          </span>
          <span
            className="block font-semibold italic leading-[1.08]"
            style={{ fontSize: "clamp(38px, 5.5vw, 68px)", color: "#3DB87A" }}
          >
            a Sanctuary.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="italic font-normal mt-1 mb-7"
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(18px, 2.2vw, 24px)",
          }}
        >
          PestGuard keeps pests out so you never have to think about them.
        </motion.p>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="leading-[1.75] mb-10 max-w-[560px] text-center max-sm:text-[15px]"
          style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px" }}
        >
          Most DC homeowners don't think about pest control until something
          shows up uninvited — a mouse in the kitchen, ants on the counter,
          termites in the walls. PestGuard handles it before it starts.
          Eco-friendly treatments, kid-safe products, year-round protection on
          autopilot. No contracts, no surprises.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-[52px] w-full sm:w-auto"
        >
          <button
            onClick={() =>
              document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })
            }
            className="h-[54px] px-9 rounded-full text-[16px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg sm:w-auto w-full"
            style={{ background: "#3DB87A" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2ea86a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#3DB87A")}
          >
            See Pest Control Plans
          </button>
          <button
            onClick={onGetQuote}
            className="h-[54px] px-9 rounded-full text-[16px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 sm:w-auto w-full"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            Get a Free Quote
          </button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full"
        >
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-center">
            {trustItems.map((item, i) => (
              <div key={item.label} className="flex items-center">
                {i > 0 && (
                  <div
                    className="mx-0"
                    style={{
                      width: "1px",
                      height: "20px",
                      background: "rgba(255,255,255,0.2)",
                    }}
                  />
                )}
                <div className="flex items-center gap-2 px-5">
                  <item.icon
                    size={15}
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
          <div className="grid grid-cols-2 gap-4 lg:hidden justify-items-center">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon
                  size={15}
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

      {/* Scroll indicator */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 0.35 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={26} color="white" aria-label="Scroll down" />
        </motion.div>
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 w-full z-20 leading-[0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[60px]">
          <path d="M0,40 C360,0 720,60 1440,20 L1440,60 L0,60Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
