import { useOutletContext } from "react-router-dom";
import ScrollFade from "../components/ScrollFade";
import Breadcrumb from "../components/Breadcrumb";
import { Phone, Instagram } from "lucide-react";

export default function About() {
  const { t, lang } = useOutletContext();

  const stats = [
    { value: "04", label: t.about.projectsBuilt },
    { value: "05", label: t.about.yearsExperience },
    { value: "01", label: t.about.countries },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <Breadcrumb
        items={[
          { label: t.projects.breadcrumbHome, to: "/" },
          { label: t.nav.about },
        ]}
      />

      {/* Company Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-32">
        <ScrollFade>
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-light text-white tracking-wide mb-6">
              {t.about.companyTitle}
            </h1>
            <div className="w-16 h-px bg-asila-blue/40 mb-8" />
            <p className="text-asila-text/80 font-body text-sm md:text-base leading-relaxed mb-10">
              {t.about.companyText}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center py-4 border border-asila-blue/20">
                  <div className="font-heading text-3xl md:text-4xl text-asila-light font-light">
                    {stat.value}
                  </div>
                  <div className="text-asila-muted text-[10px] md:text-xs font-body uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFade>

        <ScrollFade delay={0.15}>
          <div className="bg-asila-surface aspect-[3/4] md:aspect-auto md:min-h-[500px] flex items-center justify-center text-asila-muted/30 text-sm font-body border border-asila-blue/10">
            Company Image Placeholder
          </div>
        </ScrollFade>
      </section>

      {/* Founder Section */}
      <section className="border-t border-asila-blue/20 pt-16 md:pt-24">
        <ScrollFade>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-white tracking-wide mb-10 text-center">
            {t.about.founderTitle}
          </h2>
        </ScrollFade>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
          <ScrollFade>
            <div className="mx-auto md:mx-0 w-60 h-60 md:w-full md:h-72 bg-asila-surface border border-asila-blue/10 flex items-center justify-center text-asila-muted/30 text-sm font-body">
              Founder Photo
            </div>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <div>
              <h3 className="font-heading text-2xl text-white mb-1">{t.about.founderName}</h3>
              <p className="text-asila-light text-sm font-body mb-4">{t.about.founderRole}</p>
              <p className="text-asila-text/80 font-body text-sm leading-relaxed mb-6">
                {t.about.founderBio}
              </p>
              <div className="space-y-2">
                <a href="tel:054-5889256" className="flex items-center gap-2 text-asila-muted hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4" /> 054-5889256
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-asila-muted hover:text-white text-sm transition-colors">
                  <Instagram className="w-4 h-4" /> @asila.invest
                </a>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>
    </div>
  );
}