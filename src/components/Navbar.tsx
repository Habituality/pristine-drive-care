import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Tjänster", href: "#tjanster" },
  { label: "Galleri", href: "#galleri" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Kontakt", href: "#bokning" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="font-display text-2xl font-bold tracking-wide text-gold-gradient">
          PureShine
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#bokning"
            className="ml-4 px-5 py-2 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase hover:bg-gold-light transition-colors"
          >
            Boka nu
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <a href="tel:+46701234567" className="text-primary">
            <Phone className="w-5 h-5" />
          </a>
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#bokning"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center px-5 py-3 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wider uppercase"
          >
            Boka nu
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
