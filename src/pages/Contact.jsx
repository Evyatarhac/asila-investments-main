import { useOutletContext } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import ScrollFade from "../components/ScrollFade";
import Breadcrumb from "../components/Breadcrumb";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";
import useSEO from "../lib/useSEO";

export default function Contact() {
  const { t, lang } = useOutletContext();

  useSEO({
    path: "/contact",
    lang,
    title:
      lang === "he"
        ? "צור קשר — אסילה השקעות נדל״ן בקופנגן"
        : "Contact ASILA Investments — Koh Phangan Real Estate",
    description:
      lang === "he"
        ? "מעוניינים בהשקעת נדל״ן בקופנגן, תאילנד? צרו קשר עם אסילה השקעות בטלפון 054-5889256 או office@asila.co.il."
        : "Interested in real estate investment on Koh Phangan, Thailand? Contact ASILA Investments at +972-54-5889256 or office@asila.co.il.",
  });

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <Breadcrumb
        items={[
          { label: t.projects.breadcrumbHome, to: "/" },
          { label: t.nav.contact },
        ]}
      />

      <div className="max-w-3xl mx-auto">
        <ScrollFade>
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
              {t.contact.title}
            </h1>
            <div className="w-16 h-px bg-asila-blue/40 mx-auto mb-4" />
            <p className="text-asila-muted text-sm md:text-base font-body max-w-xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-12">
          <ScrollFade>
            <div className="bg-asila-navy border border-asila-blue/10 p-6 md:p-8">
              <LeadForm t={t} lang={lang} />
            </div>
          </ScrollFade>

          <ScrollFade delay={0.15}>
            <div className="space-y-6">
              <h3 className="font-heading text-xl text-white">{t.contact.title}</h3>
              <div className="space-y-4">
                <a href="tel:054-5889256" className="flex items-center gap-3 text-asila-muted hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-asila-light flex-shrink-0" />
                  054-5889256
                </a>
                <a href="mailto:office@asila.co.il" className="flex items-center gap-3 text-asila-muted hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-asila-light flex-shrink-0" />
                  office@asila.co.il
                </a>
                <a href="https://www.instagram.com/edenasilaa?igsh=MXUwMGdmeHk3c3Vhbw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-asila-muted hover:text-white text-sm transition-colors">
                  <Instagram className="w-4 h-4 text-asila-light flex-shrink-0" />
                  @asila.invest
                </a>
                <div className="flex items-center gap-3 text-asila-muted text-sm">
                  <MapPin className="w-4 h-4 text-asila-light flex-shrink-0" />
                  Thailand, Southeast Asia
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </div>
  );
}