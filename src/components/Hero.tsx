import { Button } from "@/components/ui/button";
import { Shield, Star, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-home.jpg";

const badges = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Clock, label: "Same-Week Service" },
  { icon: CheckCircle, label: "Satisfaction Guaranteed" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Happy family in front of their protected home"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-secondary/80" />
      </div>

      <div className="relative container-max section-padding pt-32 sm:pt-36">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight text-balance"
          >
            DC's Most Trusted Pest Protection —{" "}
            <span className="text-primary">On Autopilot</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-secondary-foreground/80 max-w-xl"
          >
            One plan. Zero pests. Total peace of mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() =>
                document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See Our Plans
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              onClick={() =>
                document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get a Free Quote
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <b.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground/70">
                  {b.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
