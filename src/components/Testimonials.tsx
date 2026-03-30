import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah M.",
    location: "Capitol Hill",
    stars: 5,
    quote:
      "We had ants every spring. GreenShield came out, treated everything, and they haven't been back in over a year. Best money we've spent on our home.",
  },
  {
    name: "James T.",
    location: "Arlington, VA",
    stars: 5,
    quote:
      "Love the subscription model. No thinking, no scheduling headaches — they just show up and handle it. Our house has never been cleaner.",
  },
  {
    name: "Maria L.",
    location: "Bethesda, MD",
    stars: 5,
    quote:
      "I was worried about chemicals around my kids and dogs. Their eco-friendly approach put my mind at ease. Highly recommend!",
  },
];

const Testimonials = () => (
  <section id="reviews" className="section-padding bg-secondary text-secondary-foreground">
    <div className="container-max text-center">
      <div className="flex items-center justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
        ))}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold">
        4.9 Stars from 800+ DC Families
      </h2>
      <p className="mt-4 text-secondary-foreground/70 max-w-lg mx-auto">
        Don't take our word for it — here's what DC metro homeowners are saying:
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 text-left border border-secondary-foreground/10"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(r.stars)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-secondary-foreground/90 text-sm leading-relaxed">
              "{r.quote}"
            </p>
            <div className="mt-4 text-sm">
              <span className="font-bold text-secondary-foreground">{r.name}</span>
              <span className="text-secondary-foreground/60"> — {r.location}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-50">
        {["BBB Accredited", "NPMA Member", "EPA SaferChoice"].map((badge) => (
          <span
            key={badge}
            className="text-sm font-semibold tracking-wide text-secondary-foreground/70 uppercase"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
