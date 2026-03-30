import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const areas = [
  { name: "Washington DC", slug: "pest-control-washington-dc" },
  { name: "Arlington", slug: "pest-control-arlington-va" },
  { name: "Alexandria", slug: "pest-control-alexandria-va" },
  { name: "Bethesda", slug: "pest-control-bethesda-md" },
  { name: "Rockville", slug: "pest-control-rockville-md" },
  { name: "Silver Spring", slug: "pest-control-silver-spring-md" },
  { name: "McLean", slug: "pest-control-mclean-va" },
  { name: "Fairfax", slug: "pest-control-fairfax-va" },
  { name: "Reston", slug: "pest-control-reston-va" },
  { name: "Tysons", slug: "pest-control-tysons-va" },
  { name: "College Park", slug: "pest-control-college-park-md" },
  { name: "Annapolis", slug: "pest-control-annapolis-md" },
];

const ServiceArea = () => (
  <section id="service-area" className="section-padding">
    <div className="container-max text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        Proudly Serving the Greater DC Metro Area
      </h2>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        Fast, reliable pest control across DC, Maryland, and Virginia.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {areas.map((area, i) => (
          <motion.div
            key={area.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link
              to={`/${area.slug}`}
              className="flex items-center gap-2 bg-muted border border-border rounded-full px-5 py-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{area.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceArea;
