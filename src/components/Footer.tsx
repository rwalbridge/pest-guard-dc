import { Link } from "react-router-dom";
import { Shield, Instagram, Facebook, Home } from "lucide-react";

const locationLinks = [
  { label: "Washington DC", slug: "washington-dc" },
  { label: "Arlington, VA", slug: "arlington-va" },
  { label: "Alexandria, VA", slug: "alexandria-va" },
  { label: "Bethesda, MD", slug: "bethesda-md" },
  { label: "Rockville, MD", slug: "rockville-md" },
  { label: "Silver Spring, MD", slug: "silver-spring-md" },
  { label: "McLean, VA", slug: "mclean-va" },
  { label: "Fairfax, VA", slug: "fairfax-va" },
  { label: "Reston, VA", slug: "reston-va" },
  { label: "Tysons, VA", slug: "tysons-va" },
  { label: "College Park, MD", slug: "college-park-md" },
  { label: "Annapolis, MD", slug: "annapolis-md" },
];

const pestLinks = [
  { label: "Ants", slug: "ants" },
  { label: "Cockroaches", slug: "cockroaches" },
  { label: "Mice & Rats", slug: "mice-rats" },
  { label: "Mosquitoes", slug: "mosquitoes" },
  { label: "Termites", slug: "termites" },
  { label: "Bed Bugs", slug: "bed-bugs" },
  { label: "Wasps & Hornets", slug: "wasps-hornets" },
  { label: "Spiders", slug: "spiders" },
  { label: "Stink Bugs", slug: "stink-bugs" },
  { label: "Silverfish", slug: "silverfish" },
];

const companyLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Our Plans", href: "/plans" },
  { label: "Why PestGuard", href: "/#why-us" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#plans" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container-max section-padding pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Green<span className="text-primary">Shield</span>
            </span>
          </Link>
          <p className="text-sm text-secondary-foreground/60 leading-relaxed">
            DC's premier pest control subscription. Eco-friendly, licensed in DC, MD & VA.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Instagram" className="text-secondary-foreground/40 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-secondary-foreground/40 hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Nextdoor" className="text-secondary-foreground/40 hover:text-primary transition-colors">
              <Home className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/50">
            Service Areas
          </h4>
          <ul className="space-y-2 text-sm">
            {locationLinks.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/locations/${l.slug}`}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pest Types */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/50">
            Pest Types
          </h4>
          <ul className="space-y-2 text-sm">
            {pestLinks.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/pests/${p.slug}`}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/50">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} PestGuard. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-secondary-foreground/40">
          <span>Licensed & Insured</span>
          <span>BBB Accredited</span>
          <span>NPMA Member</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
