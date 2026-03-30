import { Bug, Rat, Zap, Leaf, Bird, Snail } from "lucide-react";
import { motion } from "framer-motion";

const pests = [
  { name: "Ants", icon: Bug },
  { name: "Cockroaches", icon: Bug },
  { name: "Mice & Rats", icon: Rat },
  { name: "Mosquitoes", icon: Zap },
  { name: "Termites", icon: Bug },
  { name: "Bed Bugs", icon: Bug },
  { name: "Wasps & Hornets", icon: Bird },
  { name: "Spiders", icon: Bug },
  { name: "Stink Bugs", icon: Leaf },
  { name: "Silverfish", icon: Snail },
];

const PestsWeCover = () => (
  <section className="section-padding bg-muted">
    <div className="container-max text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        Pests We Cover
      </h2>
      <p className="mt-3 text-muted-foreground">
        Comprehensive protection against the most common DC-area pests.
      </p>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
        {pests.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
          >
            <p.icon className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-foreground">{p.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PestsWeCover;
