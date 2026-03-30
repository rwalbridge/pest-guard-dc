import { Shield, Instagram, Facebook, Home } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container-max section-padding pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Green<span className="text-primary">Shield</span>
            </span>
          </div>
          <p className="text-sm text-secondary-foreground/60 leading-relaxed">
            DC's premier pest control subscription. We handle it so you don't have to.
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

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/50">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {["How It Works", "Plans", "Why Us", "Reviews", "FAQ"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Area */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/50">
            Service Area
          </h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/60">
            <li>Washington DC</li>
            <li>Northern Virginia</li>
            <li>Maryland</li>
          </ul>
          <p className="text-xs text-secondary-foreground/40 mt-3">
            Licensed in DC, MD & VA
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/50">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/60">
            <li>(202) 555-0199</li>
            <li>hello@greenshieldpest.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} GreenShield Pest Control. All rights reserved.
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
