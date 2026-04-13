import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pests = [
  { name: "Ants", emoji: "🐜", slug: "ants" },
  { name: "Cockroaches", emoji: "🪳", slug: "cockroaches" },
  { name: "Mice & Rats", emoji: "🐭", slug: "mice-rats" },
  { name: "Mosquitoes", emoji: "🦟", slug: "mosquitoes" },
  { name: "Termites", emoji: "🪲", slug: "termites" },
  { name: "Bed Bugs", emoji: "🛏️", slug: "bed-bugs" },
  { name: "Wasps & Hornets", emoji: "🐝", slug: "wasps-hornets" },
  { name: "Spiders", emoji: "🕷️", slug: "spiders" },
  { name: "Stink Bugs", emoji: "🐛", slug: "stink-bugs" },
  { name: "Silverfish", emoji: "🐟", slug: "silverfish" },
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
              <span className="text-4xl" role="img" aria-label={p.name}>{p.emoji}</span>
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PestsWeCover;
