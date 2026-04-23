import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Instagram } from "lucide-react";
import ScrollFade from "../components/ScrollFade";
import Breadcrumb from "../components/Breadcrumb";
import SmartImage from "../components/SmartImage";

export default function About() {
  const { t, lang } = useOutletContext();
  const isRTL = lang === "he";

  const paragraphs = t.about.companyParagraphs || [];
  const bioItems = t.about.founderBioItems || [];

  return (
    <div className="bg-asila-page text-asila-body min-h-screen" dir={isRTL ? "rtl" : "ltr"}>

      {/* Hero Band */}
      <div className="bg-asila-navy pt-28 pb-16 md:pt-36 md:pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb
            items={[
              { label: isRTL ? "דף הבית" : "Home", to: "/" },
              { label: isRTL ? "אודות" : "About" },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-6xl font-medium text-white tracking-wide mt-6"
          >
            {t.about.companyTitle}
          </motion.h1>
          {/* Gold underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`mt-4 h-[2px] w-16 bg-asila-gold origin-${isRTL ? "right" : "left"}`}
          />
        </div>
      </div>

      {/* Company Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Text */}
          <ScrollFade>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`font-body text-sm md:text-base leading-relaxed text-asila-body/85 ${
                    i === 0 ? "text-base md:text-lg font-medium text-asila-body" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

          </ScrollFade>

          {/* Image */}
          <ScrollFade delay={0.2}>
            <div className="relative">
              {/* Gold frame accent */}
              <div className={`absolute -top-3 ${isRTL ? "-left-3" : "-right-3"} w-full h-full border border-asila-gold/30 pointer-events-none`} />
              <SmartImage
                src="/images/sunset/07.jpg"
                alt="Asila Invest — Koh Phangan"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-1.5 h-1.5 bg-asila-gold rotate-45" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Founder Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          <ScrollFade>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-asila-gold mb-3">
              {isRTL ? "הכירו את המייסד" : "Meet the Founder"}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-asila-navy mb-10">
              {t.about.founderTitle}
            </h2>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-16 items-start">

            {/* Photo */}
            <ScrollFade>
              <div className="relative">
                <div className={`absolute -top-3 ${isRTL ? "-right-3" : "-left-3"} w-full h-full border border-asila-gold/25 pointer-events-none`} />
                <SmartImage
                  src="/images/eden.jpeg"
                  alt="Eden Asila"
                  sizes="(min-width: 768px) 300px, 100vw"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </div>
            </ScrollFade>

            {/* Bio */}
            <ScrollFade delay={0.15}>
              <div className="space-y-5 mt-2">
                {bioItems.map((item, i) => (
                  <div key={i} className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 bg-asila-gold rotate-45" />
                    <p className="font-body text-sm md:text-base leading-relaxed text-asila-body/80">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="mt-10 pt-8 border-t border-gray-200 space-y-3">
                <a
                  href="tel:054-5889256"
                  className="flex items-center gap-3 text-asila-subtle hover:text-asila-navy text-sm font-body transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-asila-gold/40 flex items-center justify-center group-hover:border-asila-gold transition-colors">
                    <Phone className="w-3.5 h-3.5 text-asila-gold" />
                  </span>
                  054-5889256
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-asila-subtle hover:text-asila-navy text-sm font-body transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-asila-gold/40 flex items-center justify-center group-hover:border-asila-gold transition-colors">
                    <Instagram className="w-3.5 h-3.5 text-asila-gold" />
                  </span>
                  @asila.invest
                </a>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

    </div>
  );
}
