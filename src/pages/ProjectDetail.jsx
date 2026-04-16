import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import projects, { getStatusLabel } from "../lib/projects";
import Breadcrumb from "../components/Breadcrumb";
import Lightbox from "../components/Lightbox";
import ScrollFade from "../components/ScrollFade";

const statusColors = {
  completed: "bg-asila-mid/30 text-asila-accent",
  "in-progress": "bg-asila-light/20 text-asila-light",
  upcoming: "bg-asila-blue/30 text-asila-muted",
};

export default function ProjectDetail() {
  const { t, lang } = useOutletContext();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isRTL = lang === "he";

  const urlParams = new URLSearchParams(window.location.search);
  const slug = window.location.pathname.split("/").pop();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 pb-16 px-4 text-center">
        <p className="text-asila-muted font-body">Project not found.</p>
        <Link to="/projects" className="text-asila-light mt-4 inline-block font-body text-sm">
          {t.projects.backToProjects}
        </Link>
      </div>
    );
  }

  const galleryImages = project.gallery.length > 0 ? project.gallery : [null, null, null, null];
  const description = project.fullDescription[lang] || project.fullDescription.en;
  const statusColor = statusColors[project.status] || statusColors.upcoming;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-asila-surface">
          {project.heroImage ? (
            <img
              src={project.heroImage}
              alt={project.name}
              className="w-full h-full object-cover"
              width="1920"
              height="1080"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-asila-muted/30 text-sm font-body">
              {project.name} — Hero Image Placeholder
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-asila-dark via-asila-dark/40 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-4 md:px-8 pb-8 md:pb-12 max-w-7xl mx-auto w-full"
        >
          <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 mb-3 ${statusColor}`}>
            {getStatusLabel(project.status, lang)}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-white tracking-wide">
            {project.name}
          </h1>
          <p className="text-asila-muted text-sm font-body mt-2">
            {project.location} • {project.year}
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: t.projects.breadcrumbHome, to: "/" },
            { label: t.projects.breadcrumbProjects, to: "/projects" },
            { label: project.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Details */}
          <ScrollFade>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-white mb-6">
                {t.projects.details}
              </h2>

              <div className="space-y-4 mb-8">
                {project.details && project.details[lang] && (
                  <>
                    <DetailRow label={lang === "he" ? "מספר וילות" : "Number of Villas"} value={project.details[lang].villas} />
                    <DetailRow label={lang === "he" ? "סוג" : "Type"} value={project.details[lang].type} />
                    <DetailRow label={t.projects.location} value={project.details[lang].locationDetail || project.location} />
                    <DetailRow label={lang === "he" ? "חדרי שינה" : "Bedrooms"} value={project.details[lang].bedrooms} />
                    <DetailRow label={lang === "he" ? "בריכה פרטית" : "Private Pool"} value={project.details[lang].pool} />
                    {project.details[lang].features && (
                      <DetailRow label={lang === "he" ? "מאפיינים" : "Key Features"} value={project.details[lang].features} />
                    )}
                  </>
                )}
                <DetailRow label={t.projects.status} value={getStatusLabel(project.status, lang)} />
              </div>

              <div className="border-t border-asila-blue/20 pt-6">
                <h3 className="text-sm text-asila-muted font-body uppercase tracking-wider mb-3">
                  {t.projects.description}
                </h3>
                {description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-asila-text/80 font-body text-sm leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </ScrollFade>

          {/* Gallery */}
          <ScrollFade delay={0.15}>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-white mb-6">
                {t.projects.gallery}
              </h2>

              {/* Mobile: horizontal scroll */}
              <div className="flex gap-3 overflow-x-auto pb-4 lg:hidden scrollbar-none">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => img && setLightboxIndex(i)}
                    className="flex-shrink-0 w-56 aspect-[4/3] bg-asila-surface border border-asila-blue/10 overflow-hidden"
                  >
                    {img ? (
                      <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" width="224" height="168" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-asila-muted/30 text-xs">Image {i + 1}</div>
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop: grid */}
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => img && setLightboxIndex(i)}
                    className={`bg-asila-surface border border-asila-blue/10 overflow-hidden hover:border-asila-light/30 transition-all ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    {img ? (
                      <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" width="400" height="300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-asila-muted/30 text-xs">Image {i + 1}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollFade>
        </div>

        <div className="mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-asila-light text-sm font-body hover:text-white transition-colors"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t.projects.backToProjects}
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages.filter(Boolean)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-asila-blue/10">
      <span className="text-asila-muted text-sm font-body">{label}</span>
      <span className="text-white text-sm font-body">{value}</span>
    </div>
  );
}