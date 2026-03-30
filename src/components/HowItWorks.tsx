import { ClipboardList, Home, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: ClipboardList,
    title: "Pick the plan that fits your home",
    desc: "Answer a few quick questions. We'll match you with the right level of protection — no upselling, no confusion.",
  },
  {
    icon: Home,
    title: "We come to you. You do nothing.",
    desc: "A licensed GreenShield technician treats your home inside and out. Kid-safe, pet-safe products. You don't even need to be there.",
  },
  {
    icon: ShieldCheck,
    title: "Stay protected, season after season.",
    desc: "We return on schedule before pests have a chance to come back. And if they do? We're back within 48 hours, at no charge.",
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
