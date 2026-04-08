import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Tjänster", href: "/tjanster-fordelar" },
  { label: "Galleri", href: "/galleri" },
  { label: "Om oss", href: "/#om-oss" },
  { label: "Kontakt", href: "/#bokning" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#") && isHome) {
      const el = document.getElementById(href.replace("/#", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (link: { label: string; href: string }, className: string) => {
    if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
      return (
        <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className={className}>
          {link.label}
        </Link>
      );
    }

    if (link.href.startsWith("/#") && !isHome) {
      return (
        <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className={className}>
          {link.label}
        </Link>
      );
    }

    return (
      <a key={link.href} href={link.href.replace("/", "")} onClick={() => handleClick(link.href)} className={className}>
        {link.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-2xl font-bold tracking-wide text-gold-gradient">
          Glanzio Bil & Hemvård
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            renderLink(link, "font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors")
          )}
          <Link
            to="/#bokning"
            className="ml-4 px-5 py-2 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
          >
            Boka nu
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <a href="tel:+46761865882" className="text-primary">
            <Phone className="w-5 h-5" />
          </a>
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-6 pt-2">
          {navLinks.map((link) =>
            renderLink(link, "block py-3 font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors")
          )}
          <Link
            to="/#bokning"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center px-5 py-3 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase"
          >
            Boka nu
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
