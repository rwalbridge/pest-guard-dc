import { Button } from "@/components/ui/button";
import { Shield, Star, Clock, CheckCircle, Leaf, Home, Heart } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-technician.jpg";

const badges = [
  { icon: Shield, label: "Licensed in DC, MD & VA" },
  { icon: Star, label: "4.9 Stars · 800+ DC Families" },
  { icon: Clock, label: "Same-Week Service Available" },
  { icon: CheckCircle, label: "If They're Back, So Are We — Free" },
];

interface HeroProps {
  onGetQuote?: () => void;
}

const Hero = ({ onGetQuote }: HeroProps) => {
  return (
    <section className="relative bg-background min-h-screen flex items-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large soft circle top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent/60" />
        {/* Small accent circle bottom-left */}
        <div className="absolute bottom-20 -left-16 w-64 h-64 rounded-full bg-primary/5" />
        {/* Dotted pattern */}
        <svg className="absolute top-40 left-8 opacity-20" width="120" height="120" viewBox="0 0 120 120">
          {Array.from({ length: 36 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 6) * 22 + 11}
              cy={Math.floor(i / 6) * 22 + 11}
              r="2.5"
              className="fill-primary"
            />
          ))}
        </svg>
        {/* Leaf motif near photo */}
        <svg className="absolute bottom-32 right-[45%] opacity-10 hidden lg:block" width="80" height="80" viewBox="0 0 80 80">
          <path d="M40 10 C60 20 70 50 40 70 C10 50 20 20 40 10Z" className="fill-primary" />
          <line x1="40" y1="10" x2="40" y2="70" className="stroke-primary" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="relative container-max section-padding pt-28 sm:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 mb-6"
            >
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Year-round pest protection for DC metro homes</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] text-balance"
            >
              Your Home Should Feel Like{" "}
              <span className="text-primary relative">
                a Sanctuary.
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 6 Q50 0 100 4 Q150 8 200 2" className="stroke-primary" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <br />
              <span className="text-muted-foreground font-medium text-3xl sm:text-4xl lg:text-[2.5rem]">
                We make sure it does.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              Most DC homeowners don't think about pest control until something shows up uninvited. GreenShield runs quietly in the background — eco-friendly, kid-safe treatments on a schedule that keeps your home protected before problems start. No contracts, no surprises, just peace of mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="text-base font-semibold px-8 h-12 shadow-lg shadow-primary/20"
                onClick={() =>
                  document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See Our Plans
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base font-semibold px-8 h-12 quote-trigger"
                onClick={onGetQuote}
              >
                Get a Quote
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              {badges.map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <b.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {b.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo + floating elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-secondary/10 border border-border">
              <img
                src={heroImg}
                alt="Friendly pest control technician treating the exterior of a home"
                className="w-full h-auto object-cover aspect-[4/5] sm:aspect-[3/4]"
                width={960}
                height={1152}
              />
              {/* Gradient overlay at bottom for floating card */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/40 to-transparent" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -left-4 sm:-left-8 bottom-12 bg-background rounded-2xl shadow-xl border border-border p-4 flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">2,400+ homes</p>
                <p className="text-xs text-muted-foreground">protected in DC metro</p>
              </div>
            </motion.div>

            {/* Floating rating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -right-2 sm:-right-6 top-8 bg-background rounded-2xl shadow-xl border border-border p-3 flex items-center gap-2"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">4.9</span>
            </motion.div>

            {/* Floating heart badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute right-6 bottom-28 bg-primary rounded-full h-12 w-12 flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <Heart className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
            </motion.div>

            {/* Decorative ring behind image */}
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-3xl border-2 border-primary/15" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
