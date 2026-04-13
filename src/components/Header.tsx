import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, ChevronDown, ChevronRight } from "lucide-react";

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

interface HeaderProps {
  onGetQuote?: () => void;
}

const Header = ({ onGetQuote }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pestDropdown, setPestDropdown] = useState(false);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [mobilePestOpen, setMobilePestOpen] = useState(false);
  const [mobileLocationOpen, setMobileLocationOpen] = useState(false);
  const pestRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setPestDropdown(false);
    setLocationDropdown(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (pestRef.current && !pestRef.current.contains(e.target as Node)) setPestDropdown(false);
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setLocationDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const anchorLink = (href: string, label: string) => {
    if (isHome) {
      return (
        <a
          href={href}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        to={`/${href}`}
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
      </Link>
    );
  };

  const mobileAnchorLink = (href: string, label: string) => {
    if (isHome) {
      return (
        <a
          href={href}
          onClick={() => setMobileOpen(false)}
          className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        to={`/${href}`}
        onClick={() => setMobileOpen(false)}
        className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container-max flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-secondary">
              Pest<span className="text-primary">Guard</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {anchorLink("#how-it-works", "How It Works")}
            <Link to="/plans" className={`text-sm font-medium transition-colors ${location.pathname === "/plans" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>Plans</Link>

            {/* Pest Types Dropdown */}
            <div ref={pestRef} className="relative">
              <button
                onClick={() => { setPestDropdown(!pestDropdown); setLocationDropdown(false); }}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pest Types <ChevronDown className={`h-3.5 w-3.5 transition-transform ${pestDropdown ? "rotate-180" : ""}`} />
              </button>
              {pestDropdown && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-background border border-border rounded-xl shadow-lg py-2 z-50">
                  {pestLinks.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/pests/${p.slug}`}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Service Areas Dropdown */}
            <div ref={locationRef} className="relative">
              <button
                onClick={() => { setLocationDropdown(!locationDropdown); setPestDropdown(false); }}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Service Areas <ChevronDown className={`h-3.5 w-3.5 transition-transform ${locationDropdown ? "rotate-180" : ""}`} />
              </button>
              {locationDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg py-2 z-50">
                  {locationLinks.map((l) => (
                    <Link
                      key={l.slug}
                      to={`/locations/${l.slug}`}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">The Nest</Link>
          </nav>

          <div className="hidden lg:block">
            <Button className="quote-trigger" onClick={onGetQuote}>
              Get a Quote
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav — rendered outside header to avoid stacking context issues */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-background z-[60] overflow-y-auto">
          <div className="px-4 pb-24 pt-2">
            {mobileAnchorLink("#how-it-works", "How It Works")}
            <Link to="/plans" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground">Plans</Link>

            {/* Mobile Pest Accordion */}
            <button
              onClick={() => setMobilePestOpen(!mobilePestOpen)}
              className="flex items-center justify-between w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pest Types
              <ChevronRight className={`h-4 w-4 transition-transform ${mobilePestOpen ? "rotate-90" : ""}`} />
            </button>
            {mobilePestOpen && (
              <div className="pl-4 border-l-2 border-primary/20 mb-2">
                {pestLinks.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/pests/${p.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Location Accordion */}
            <button
              onClick={() => setMobileLocationOpen(!mobileLocationOpen)}
              className="flex items-center justify-between w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Service Areas
              <ChevronRight className={`h-4 w-4 transition-transform ${mobileLocationOpen ? "rotate-90" : ""}`} />
            </button>
            {mobileLocationOpen && (
              <div className="pl-4 border-l-2 border-primary/20 mb-2">
                {locationLinks.map((l) => (
                  <Link
                    key={l.slug}
                    to={`/locations/${l.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}

          </div>

          {/* Pinned CTA */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-[70]">
            <Button
              className="w-full quote-trigger"
              onClick={() => {
                setMobileOpen(false);
                onGetQuote?.();
              }}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
