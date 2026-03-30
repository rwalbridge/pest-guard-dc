import { MapPin, RefreshCw, Leaf, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: MapPin,
    title: "Local DC Experts",
    desc: "Serving Northern Virginia, Maryland & DC since 2018.",
  },
  {
    icon: RefreshCw,
    title: "Guaranteed Results",
    desc: "If pests return between visits, so do we. Free.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    desc: "Safe for kids, pets, and the environment.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Scheduling",
    desc: "Book online in under 2 minutes.",
  },
];

const WhyChooseUs = () => (
  <section id="why-us" className="section-padding">
    <div className="container-max text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        Why Choose GreenShield
      </h2>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        We handle it so you don't have to.
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4 text-left p-6 rounded-2xl bg-muted"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <v.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
