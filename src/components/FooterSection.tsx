import { Phone, Mail, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display text-2xl font-bold text-gold-gradient mb-4">Glanzio</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Professionell mobil rengöring och detaljering i Stockholmsområdet. Vi kommer till dig.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4">Tjänster</h4>
            <ul className="space-y-2">
              <li><a href="#tjanster" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">Bilvård & Detailing</a></li>
              <li><a href="#tjanster" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">Uppfart & Altan</a></li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <a href="tel:+46761865882" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                <Phone className="w-4 h-4 text-primary" /> 076-186 58 82
              </a>
              <a href="mailto:info@glanzio.se" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                <Mail className="w-4 h-4 text-primary" /> info@glanzio.se
              </a>
              <div className="flex items-center gap-3 text-muted-foreground font-body text-sm">
                <MapPin className="w-4 h-4 text-primary" /> Stockholm
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground font-body text-xs tracking-wider">
            © {new Date().getFullYear()} Glanzio Bil & Hemvård. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
