import React, { useRef, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import projects, { getStatusLabel } from "../lib/projects";
import Breadcrumb from "../components/Breadcrumb";
import Lightbox from "../components/Lightbox";
import ScrollFade from "../components/ScrollFade";
import useSEO, { SITE_URL } from "../lib/useSEO";
import useCinematicScroll from "../lib/useCinematicScroll";
import "../styles/cinematic-sunset.css";

const statusColors = {
  completed: "bg-asila-mid/30 text-asila-accent",
  "in-progress": "bg-asila-light/20 text-asila-light",
  upcoming: "bg-asila-blue/30 text-asila-muted",
};

// the descent through Sunset's own renders
const SLIDES = [
  "/images/sunset/web/03.jpg", // aerial establish
  "/images/sunset/web/02.jpg", // villas among palms
  "/images/sunset/web/04.jpg", // pool villa, golden hour
  "/images/sunset/web/06.jpg", // sunset over the ocean
];
const CTA_BG = "/images/sunset/web/06.jpg";
const PRELOAD = SLIDES;

// map a full-res gallery path to its web-optimized version
const webVersion = (p) => {
  const base = p.split("/").pop().replace(/\.(png|jpe?g)$/i, "");
  return `/images/sunset/web/${base}.jpg`;
};

const ML = (s) =>
  s.split("\n").map((line, i, a) => (
    <React.Fragment key={i}>{line}{i < a.length - 1 && <br />}</React.Fragment>
  ));

export default function SunsetExperience() {
  const { t, lang, isRTL } = useOutletContext();
  const project = projects.find((p) => p.slug === "sunset");

  const scopeRef = useRef(null);
  const canvasRef = useRef(null); // unused (no drone canvas) — hook handles null
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width:768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useCinematicScroll({ enabled, scopeRef, canvasRef, aerialCount: 0, preload: PRELOAD });

  useSEO({
    path: "/projects/sunset",
    lang,
    title:
      lang === "he"
        ? `${project.name} — נדל״ן יוקרה בקופנגן, תאילנד`
        : `${project.name} — Luxury Real Estate in Koh Phangan, Thailand`,
    description: project.shortDescription[lang] || project.shortDescription.en,
    image: project.heroImage,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Residence",
          name: `ASILA — ${project.name}`,
          description: project.fullDescription[lang] || project.fullDescription.en,
          url: `${SITE_URL}/projects/${project.slug}`,
          image: project.gallery.map((g) => `${SITE_URL}${g}`),
          address: { "@type": "PostalAddress", addressLocality: "Koh Phangan", addressRegion: "Surat Thani", addressCountry: "TH" },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
            { "@type": "ListItem", position: 3, name: project.name, item: `${SITE_URL}/projects/${project.slug}` },
          ],
        },
      ],
    },
  });

  const description = project.fullDescription[lang] || project.fullDescription.en;
  const statusColor = statusColors[project.status] || statusColors.upcoming;
  const galleryImages = project.gallery.map(webVersion);

  const C =
    lang === "he"
      ? {
          eyebrow: "בביצוע · 2024",
          sub: "וילות פרימיום, ממוסגרות בצמרות",
          b2: "מעל הכל",
          b3: "שעת הזהב\nהמושלמת",
          ctaEye: "מעוניינים?",
          ctaBig: "קנו פיסה מהאופק.",
          cta: "לתיאום סיור פרטי",
        }
      : {
          eyebrow: "In Progress · 2024",
          sub: "Premium villas, framed by the canopy",
          b2: "Above it all",
          b3: "The perfect\ngolden hour",
          ctaEye: "Interested?",
          ctaBig: "Own a piece of the horizon.",
          cta: "Arrange a Private Viewing",
        };

  return (
    <div>
      {/* ===== CINEMATIC — dive straight into Sunset's renders ===== */}
      {enabled && (
        <div className="cine-root" ref={scopeRef}>
          <div className="cine-prog" />
          <section className="cine-hero">
            <div className="cine-sticky">
              <div className="cine-slides">
                {SLIDES.map((src, i) => (
                  <div className="cine-slide" key={i}>
                    <div className="cine-img" style={{ backgroundImage: `url('${src}')` }} />
                  </div>
                ))}
              </div>
              <div className="cine-doorway"><div className="cine-door cine-door-l" /><div className="cine-door cine-door-r" /></div>
              <div className="cine-grade" />
              <div className="cine-vignette" />

              <div className="cine-beat cine-center" data-in="0" data-out="1.2">
                <div className="cine-eyebrow">{C.eyebrow}</div>
                <div className="cine-big"><b>{project.name}</b></div>
                <div className="cine-sub">{C.sub}</div>
              </div>
              <div className="cine-beat cine-center" data-in="1.5" data-out="2.5" style={{ opacity: 0 }}>
                <div className="cine-big">{C.b2}</div>
              </div>
              <div className="cine-beat cine-center" data-in="2.85" data-out="3.5" style={{ opacity: 0 }}>
                <div className="cine-big">{ML(C.b3)}</div>
              </div>
            </div>
          </section>

          <section className="cine-cta">
            <div className="cine-cbg" style={{ backgroundImage: `url('${CTA_BG}')` }} />
            <div className="cine-cgrade" />
            <div className="cine-inner">
              <div className="cine-reveal cine-kicker">{C.ctaEye}</div>
              <h2 className="cine-reveal cine-h2">{C.ctaBig}</h2>
              <div className="cine-line" />
              <Link to="/contact" className="cine-ctabtn cine-reveal">{C.cta}</Link>
            </div>
          </section>
        </div>
      )}

      {/* ===== PROJECT INFO (single, non-duplicated) ===== */}
      <section className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* mobile / reduced-motion get a compact image header (desktop uses the cinematic above) */}
        {!enabled && (
          <div className="relative h-[48vh] min-h-[320px] -mx-4 md:-mx-8 mb-10 overflow-hidden">
            <img src="/images/sunset/web/03.jpg" alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-asila-dark via-asila-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8 max-w-7xl mx-auto">
              <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 mb-3 ${statusColor}`}>
                {getStatusLabel(project.status, lang)}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-light text-white tracking-wide">{project.name}</h1>
              <p className="text-asila-muted text-sm font-body mt-2">{project.location} • {project.year}</p>
            </div>
          </div>
        )}

        <Breadcrumb
          items={[
            { label: t.projects.breadcrumbHome, to: "/" },
            { label: t.projects.breadcrumbProjects, to: "/projects" },
            { label: project.name },
          ]}
        />

        {/* desktop text header (no image — the cinematic is the hero) */}
        {enabled && (
          <div className="mb-10">
            <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 mb-3 ${statusColor}`}>
              {getStatusLabel(project.status, lang)}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-white tracking-wide">{project.name}</h1>
            <p className="text-asila-muted text-sm font-body mt-2">{project.location} • {project.year}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Details */}
          <ScrollFade>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-white mb-6">{t.projects.details}</h2>
              <div className="space-y-4 mb-8">
                <DetailRow label={t.projects.location} value={project.location} />
                <DetailRow label={t.projects.status} value={getStatusLabel(project.status, lang)} />
                <DetailRow label={t.projects.year} value={project.year} />
              </div>
              <div className="border-t border-asila-blue/20 pt-6">
                <h3 className="text-sm text-asila-muted font-body uppercase tracking-wider mb-3">{t.projects.description}</h3>
                {description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-asila-text/80 font-body text-sm leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>
          </ScrollFade>

          {/* Gallery (the single gallery on the page) */}
          <ScrollFade delay={0.15}>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-white mb-6">{t.projects.gallery}</h2>
              <div className="flex gap-3 overflow-x-auto pb-4 lg:hidden scrollbar-none">
                {galleryImages.map((img, i) => (
                  <button key={i} onClick={() => setLightboxIndex(i)} className="flex-shrink-0 w-56 aspect-[4/3] bg-asila-surface border border-asila-blue/10 overflow-hidden">
                    <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" width="224" height="168" />
                  </button>
                ))}
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {galleryImages.map((img, i) => (
                  <button key={i} onClick={() => setLightboxIndex(i)} className={`bg-asila-surface border border-asila-blue/10 overflow-hidden hover:border-asila-light/30 transition-all ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" width="400" height="300" />
                  </button>
                ))}
              </div>
            </div>
          </ScrollFade>
        </div>

        <div className="mt-12">
          <Link to="/projects" className="inline-flex items-center gap-2 text-asila-light text-sm font-body hover:text-white transition-colors">
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t.projects.backToProjects}
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={galleryImages} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
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
