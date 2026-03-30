import { Bug, Rat, Zap, Leaf, Bird, Snail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pests = [
  { name: "Ants", icon: Bug, slug: "ants" },
  { name: "Cockroaches", icon: Bug, slug: "cockroaches" },
  { name: "Mice & Rats", icon: Rat, slug: "mice-rats" },
  { name: "Mosquitoes", icon: Zap, slug: "mosquitoes" },
  { name: "Termites", icon: Bug, slug: "termites" },
  { name: "Bed Bugs", icon: Bug, slug: "bed-bugs" },
  { name: "Wasps & Hornets", icon: Bird, slug: "wasps-hornets" },
  { name: "Spiders", icon: Bug, slug: "spiders" },
  { name: "Stink Bugs", icon: Leaf, slug: "stink-bugs" },
  { name: "Silverfish", icon: Snail, slug: "silverfish" },
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
          >
            <Link
              to={`/pests/${p.slug}`}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <p.icon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PestsWeCover;
