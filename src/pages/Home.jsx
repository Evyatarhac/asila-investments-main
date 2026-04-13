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

export default function Home() {
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
        {/* Video placeholder */}
        <div className="absolute inset-0 bg-asila-dark">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-40 md:w-96 md:h-56 border border-asila-blue/20 flex items-center justify-center text-asila-muted/30 text-xs font-body animate-pulse">
              VIDEO PLACEHOLDER — 1920×1080
            </div>
          </div>
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
              <Logo size="lg" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-4">
              {t.hero.headline}
            </h1>
            <p className="text-asila-muted text-sm md:text-base font-body font-light mb-8">
              {t.hero.subheadline}
            </p>
            <a
              href="#projects"
              className="inline-block bg-asila-light hover:bg-asila-mid text-white font-body text-sm tracking-wide px-8 py-3.5 md:px-10 md:py-4 w-full md:w-auto min-h-[52px] flex items-center justify-center transition-colors"
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