import { MapPin, RefreshCw, Leaf, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: MapPin,
    title: "We live here too.",
    desc: "PestGuard is a local DC metro company. We know the row houses in Capitol Hill, the wooded lots in McLean, and exactly which pests show up when in this region.",
  },
  {
    icon: RefreshCw,
    title: "Our guarantee isn't fine print.",
    desc: "If pests return between your scheduled visits, we come back within 48 hours. No questions, no charges, no runaround.",
  },
  {
    icon: Leaf,
    title: "Safe enough for your most important critics.",
    desc: "Every product we use is chosen with kids and pets in mind first. Effective on pests. Gentle on everything else.",
  },
  {
    icon: CalendarCheck,
    title: "No contracts. No gotchas.",
    desc: "Start, pause, or cancel your plan anytime. We keep customers because of our service — not because we trapped them.",
  },
];

const WhyChooseUs = () => (
  <section id="why-us" className="section-padding">
    <div className="container-max text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        Why DC Homeowners Choose PestGuard
      </h2>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        It's not just pest control. It's peace of mind that actually shows up.
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
