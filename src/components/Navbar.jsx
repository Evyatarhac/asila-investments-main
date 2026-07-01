import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({ t, lang, toggleLang, isRTL }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { to: "/projects", label: t.nav.projects },
    { to: "/about", label: t.nav.about },
    { to: "/blog", label: t.nav.blog },
    { to: "/contact", label: t.nav.contact },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        dir={isRTL ? "rtl" : "ltr"}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-asila-dark/95 backdrop-blur-md border-b border-asila-light/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="relative z-10 flex items-center">
            <Logo size="sm" showText={false} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-body tracking-wide transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-asila-light border-b border-asila-light pb-0.5"
                    : "text-asila-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="text-xs font-body bg-asila-surface px-3 py-1.5 rounded-sm text-asila-muted hover:text-white transition-colors"
            >
              {lang === "en" ? "עב" : "EN"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-white min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-asila-dark flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex items-center justify-between px-4 h-16">
            <Logo size="sm" showText={false} />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-heading text-2xl tracking-wide transition-colors ${
                  isActive(link.to) ? "text-asila-light" : "text-white"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLang();
                setMenuOpen(false);
              }}
              className="mt-4 text-base font-body bg-asila-surface px-6 py-3 text-asila-muted hover:text-white transition-colors"
            >
              {lang === "en" ? "עברית" : "English"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}