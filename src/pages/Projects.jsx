import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Breadcrumb from "../components/Breadcrumb";
import ScrollFade from "../components/ScrollFade";
import projects from "../lib/projects";

const filters = ["all", "completed", "in-progress", "upcoming"];

export default function Projects() {
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
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <Breadcrumb
        items={[
          { label: t.projects.breadcrumbHome, to: "/" },
          { label: t.projects.breadcrumbProjects },
        ]}
      />

      <ScrollFade>
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-5xl font-light text-white tracking-wide">
            {t.projects.title}
          </h1>
          <div className="w-16 h-px bg-asila-blue/40 mt-3" />
        </div>
      </ScrollFade>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
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

      <p className="text-asila-muted text-xs font-body mb-8">
        {t.projects.showing} {filtered.length} {t.projects.projectsLabel}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} lang={lang} t={t} />
        ))}
      </div>
    </div>
  );
}