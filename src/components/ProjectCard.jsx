import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getStatusLabel } from "../lib/projects";
import SmartImage from "./SmartImage";

const statusColors = {
  completed: "bg-asila-mid/30 text-asila-accent",
  "in-progress": "bg-asila-light/20 text-asila-light",
  upcoming: "bg-asila-blue/30 text-asila-muted",
};

export default function ProjectCard({ project, lang, t }) {
  const statusColor = statusColors[project.status] || statusColors.upcoming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block bg-asila-navy border border-asila-blue/10 hover:border-asila-light/30 transition-all duration-300"
      >
        <div className="relative overflow-hidden aspect-[16/9] md:aspect-[4/3] bg-asila-surface">
          {project.heroImage ? (
            <SmartImage
              src={project.heroImage}
              alt={project.name}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              width="400"
              height="300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-asila-muted/40 text-sm font-body">
              {project.name} — Image Placeholder
            </div>
          )}
        </div>
        <div className="p-4 md:p-5">
          <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 mb-3 ${statusColor}`}>
            {getStatusLabel(project.status, lang)}
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-white tracking-wide mb-1">
            {project.name}
          </h3>
          <p className="text-asila-muted text-xs font-body">
            {project.location} • {project.year}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-asila-light text-sm font-body group-hover:gap-3 transition-all duration-300">
            {t.projects.viewProject}
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}