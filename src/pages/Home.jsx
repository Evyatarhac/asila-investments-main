import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Logo from "../components/Logo";
import ProjectCard from "../components/ProjectCard";
import LeadForm from "../components/LeadForm";
import ScrollFade from "../components/ScrollFade";
import projects from "../lib/projects";

const filters = ["all", "completed", "in-progress", "upcoming"];

export default function Home({ onVideoReady }) {
  const { t, lang } = useOutletContext();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  const filterLabels = {
    all: t.projects.all,
    completed: t.projects.completed,
    "in-progress": t.projects.inProgress,
    upcoming: t.projects.upcoming,
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[100svh] flex items-end justify-center overflow-hidden">
        {/* Hero Video */}
        <div className="absolute inset-0 bg-asila-dark">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero.mov"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/sunset/07.jpg"
            onCanPlayThrough={() => onVideoReady?.()}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-asila-dark via-asila-dark/60 to-transparent" />

        <div className="relative z-10 text-center px-4 pb-20 md:pb-28 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-8">
              <Logo size="lg" showImage={false} />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
              {t.hero.headline}
            </h1>
            <p className="text-asila-muted text-sm md:text-base font-body font-light mb-8">
              {t.hero.subheadline}
            </p>
            <a
              href="#projects"
              className="inline-flex items-center justify-center bg-asila-light hover:bg-asila-mid text-white font-body text-sm tracking-wide px-8 py-3.5 md:px-10 md:py-4 w-full md:w-auto min-h-[52px] transition-colors"
            >
              {t.hero.cta}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-asila-muted/50" />
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollFade>
          <div className="mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white tracking-wide">
              {t.projects.title}
            </h2>
            <div className="w-16 h-px bg-asila-blue/40 mt-3" />
          </div>
        </ScrollFade>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap text-xs font-body tracking-wide px-4 py-2 min-h-[40px] transition-all ${
                filter === f
                  ? "bg-asila-light text-white"
                  : "bg-asila-surface text-asila-muted hover:text-white"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} lang={lang} t={t} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-asila-navy/50" dir={lang === "he" ? "rtl" : "ltr"}>
        {/* Company */}
        <div className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <ScrollFade>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-white mb-6">
                {t.about.companyTitle}
              </h2>
              <div className="w-16 h-[2px] bg-asila-gold/60 mb-8" />
              <div className="space-y-5">
                {(t.about.companyParagraphs || []).map((para, i) => (
                  <p
                    key={i}
                    className={`font-body text-sm md:text-base leading-relaxed text-asila-muted ${
                      i === 0 ? "text-base md:text-lg font-medium text-asila-text" : ""
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

            </ScrollFade>

            <ScrollFade delay={0.2}>
              <img
                src="/images/sunset/07.jpg"
                alt="Asila Invest — Koh Phangan"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
                decoding="async"
              />
            </ScrollFade>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-asila-blue/30" />
            <div className="w-1.5 h-1.5 bg-asila-gold/60 rotate-45" />
            <div className="flex-1 h-px bg-asila-blue/30" />
          </div>
        </div>

        {/* Founder */}
        <div className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollFade>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-asila-gold/80 mb-3">
                {lang === "he" ? "הכירו את המייסד" : "Meet the Founder"}
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-white mb-10">
                {t.about.founderTitle}
              </h2>
            </ScrollFade>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-16 items-start">
              <ScrollFade>
                <img
                  src="https://media.base44.com/images/public/69dd2ec22657e2153222d859/888bc014c_WhatsAppImage2026-04-16at132508.jpg"
                  alt="Eden Asila"
                  className="w-full aspect-[3/4] object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </ScrollFade>

              <ScrollFade delay={0.15}>
                <div className="space-y-5 mt-2">
                  {(t.about.founderBioItems || []).map((item, i) => (
                    <div key={i} className={`flex gap-4 ${lang === "he" ? "flex-row-reverse" : ""}`}>
                      <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 bg-asila-gold/60 rotate-45" />
                      <p className="font-body text-sm md:text-base leading-relaxed text-asila-muted">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-asila-navy">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollFade>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white tracking-wide mb-2">
              {t.lead.headline}
            </h2>
            <div className="w-16 h-px bg-asila-blue/40 mx-auto mt-3 mb-10" />
          </ScrollFade>
          <LeadForm t={t} lang={lang} />
        </div>
      </section>
    </div>
  );
}