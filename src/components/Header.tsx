import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    if (!isHomepage) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

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

  const isSolid = !isHomepage || scrolled || mobileOpen;

  const navLinkClass = "text-sm font-medium transition-colors";
  const navLinkColor = "text-white/75 hover:text-white";

  const anchorLink = (href: string, label: string) => {
    if (isHomepage) {
      return (
        <a href={href} className={`${navLinkClass} ${navLinkColor}`}>
          {label}
        </a>
      );
    }
    return (
      <Link to={`/${href}`} className={`${navLinkClass} ${navLinkColor}`}>
        {label}
      </Link>
    );
  };

  const mobileAnchorLink = (href: string, label: string) => {
    if (isHomepage) {
      return (
        <a
          href={href}
          onClick={() => setMobileOpen(false)}
          className={`block py-3 ${navLinkClass} ${navLinkColor}`}
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        to={`/${href}`}
        onClick={() => setMobileOpen(false)}
        className={`block py-3 ${navLinkClass} ${navLinkColor}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow] duration-300 ease-out"
        style={{
          background: isSolid ? "#0A1628" : "transparent",
          boxShadow: isSolid ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div className="container-max flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7" style={{ color: "#3DB87A" }} />
            <span className="text-xl font-bold text-white">
              Pest<span style={{ color: "#3DB87A" }}>Guard</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/plans"
              className={`${navLinkClass} ${
                location.pathname === "/plans"
                  ? "text-white font-semibold"
                  : navLinkColor
              }`}
            >
              Plans
            </Link>
            <Link
              to="/commercial"
              className={`${navLinkClass} ${
                location.pathname.startsWith("/commercial")
                  ? "text-white font-semibold"
                  : navLinkColor
              }`}
            >
              Commercial
            </Link>

            {/* Pest Types Dropdown */}
            <div ref={pestRef} className="relative">
              <button
                onClick={() => { setPestDropdown(!pestDropdown); setLocationDropdown(false); }}
                className={`flex items-center gap-1 ${navLinkClass} ${navLinkColor}`}
              >
                Pest Types
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${pestDropdown ? "rotate-180" : ""}`}
                  style={{ color: "rgba(255,255,255,0.6)" }}
                />
              </button>
              {pestDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 rounded-xl py-2 z-50"
                  style={{
                    background: "#0A1628",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  {pestLinks.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/pests/${p.slug}`}
                      className="block px-3.5 py-2 text-sm rounded-lg mx-1.5 transition-colors"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                        e.currentTarget.style.background = "transparent";
                      }}
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
                className={`flex items-center gap-1 ${navLinkClass} ${navLinkColor}`}
              >
                Service Areas
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${locationDropdown ? "rotate-180" : ""}`}
                  style={{ color: "rgba(255,255,255,0.6)" }}
                />
              </button>
              {locationDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 rounded-xl py-2 z-50"
                  style={{
                    background: "#0A1628",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  {locationLinks.map((l) => (
                    <Link
                      key={l.slug}
                      to={`/locations/${l.slug}`}
                      className="block px-3.5 py-2 text-sm rounded-lg mx-1.5 transition-colors"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`${navLinkClass} ${
                location.pathname.startsWith("/blog")
                  ? "text-white font-semibold"
                  : navLinkColor
              }`}
            >
              The Nest
            </Link>
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={onGetQuote}
              className="rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#3DB87A", padding: "10px 22px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2ea86a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3DB87A")}
            >
              Get a Free Quote
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 sm:top-20 z-[60] overflow-y-auto"
          style={{
            background: "#0A1628",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="px-4 pb-24 pt-2">
            {mobileAnchorLink("#how-it-works", "How It Works")}
            <Link
              to="/plans"
              onClick={() => setMobileOpen(false)}
              className={`block py-3 ${navLinkClass} ${navLinkColor}`}
            >
              Plans
            </Link>
            <Link
              to="/commercial"
              onClick={() => setMobileOpen(false)}
              className={`block py-3 ${navLinkClass} ${navLinkColor}`}
            >
              Commercial
            </Link>

            {/* Mobile Pest Accordion */}
            <button
              onClick={() => setMobilePestOpen(!mobilePestOpen)}
              className={`flex items-center justify-between w-full py-3 ${navLinkClass} ${navLinkColor}`}
            >
              Pest Types
              <ChevronRight className={`h-4 w-4 transition-transform ${mobilePestOpen ? "rotate-90" : ""}`} />
            </button>
            {mobilePestOpen && (
              <div className="pl-4 mb-2" style={{ borderLeft: "2px solid rgba(61,184,122,0.3)" }}>
                {pestLinks.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/pests/${p.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 text-sm ${navLinkColor}`}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Location Accordion */}
            <button
              onClick={() => setMobileLocationOpen(!mobileLocationOpen)}
              className={`flex items-center justify-between w-full py-3 ${navLinkClass} ${navLinkColor}`}
            >
              Service Areas
              <ChevronRight className={`h-4 w-4 transition-transform ${mobileLocationOpen ? "rotate-90" : ""}`} />
            </button>
            {mobileLocationOpen && (
              <div className="pl-4 mb-2" style={{ borderLeft: "2px solid rgba(61,184,122,0.3)" }}>
                {locationLinks.map((l) => (
                  <Link
                    key={l.slug}
                    to={`/locations/${l.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 text-sm ${navLinkColor}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pinned CTA */}
          <div
            className="fixed bottom-0 left-0 right-0 p-4 z-[70]"
            style={{
              background: "#0A1628",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              className="w-full rounded-full text-sm font-semibold text-white py-3"
              style={{ background: "#3DB87A" }}
              onClick={() => {
                setMobileOpen(false);
                onGetQuote?.();
              }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
