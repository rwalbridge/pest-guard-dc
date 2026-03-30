import { ClipboardList, Home, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: ClipboardList,
    title: "Choose Your Plan",
    desc: "Pick the coverage that fits your home and budget.",
  },
  {
    icon: Home,
    title: "We Treat Your Home",
    desc: "Our certified technicians handle everything — inside and out.",
  },
  {
    icon: ShieldCheck,
    title: "Stay Covered Year-Round",
    desc: "Ongoing protection with scheduled visits. Pests come back? So do we.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding bg-muted">
    <div className="container-max text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        How It Works
      </h2>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Three simple steps to a pest-free home.
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
              <s.icon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm font-semibold text-primary mb-2">
              Step {i + 1}
            </div>
            <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-muted-foreground text-sm max-w-xs">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
