import { Phone, Mail, Instagram } from "lucide-react";
import Logo from "./Logo";

export default function Footer({ t }) {
  return (
    <footer className="bg-asila-dark border-t border-asila-light/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-6">
          <Logo size="md" />
          <p className="text-asila-muted text-sm font-body">
            {t.footer.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-4">
            <a
              href="tel:054-5889256"
              className="flex items-center gap-2 text-asila-muted hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              054-5889256
            </a>
            <a
              href="mailto:office@asila.co.il"
              className="flex items-center gap-2 text-asila-muted hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              office@asila.co.il
            </a>
            <a
              href="https://www.instagram.com/edenasilaa?igsh=MXUwMGdmeHk3c3Vhbw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-asila-muted hover:text-white transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              @asila.invest
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-asila-blue/20 w-full">
            <p className="text-asila-muted/60 text-xs font-body">
              © {new Date().getFullYear()} Asila Invest. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}