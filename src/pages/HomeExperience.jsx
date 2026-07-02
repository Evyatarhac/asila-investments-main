import React, { useRef, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import Home from "./Home";
import useCinematicScroll from "../lib/useCinematicScroll";
import "../styles/cinematic-sunset.css";

// the descent: aerial screens -> villa exterior -> room-by-room interior (cohesive Coco villa)
const SLIDES = [
  "/images/sunset/web/03.jpg",   // 0 aerial (Sunset) — first image from the video
  "/images/paradise/web/04.jpg", // 1 Paradise with pool
  "/images/coco/web/02.jpg",     // 2 villa exterior (arrival / threshold)
  "/images/coco/web/03.jpg",     // 3 living room
  "/images/coco/web/05.jpg",     // 4 kitchen
  "/images/coco/web/06.jpg",     // 5 lounge
  "/images/coco/web/07.jpg",     // 6 suite
];
const CTA_BG = "/images/sunset/web/06.jpg";
const PRELOAD = [...SLIDES, CTA_BG];

const ML = (s) =>
  s.split("\n").map((line, i, a) => (
    <React.Fragment key={i}>{line}{i < a.length - 1 && <br />}</React.Fragment>
  ));

export default function HomeExperience() {
  const { lang } = useOutletContext();
  const scopeRef = useRef(null);
  const canvasRef = useRef(null); // unused (no drone canvas on home) — hook handles null

  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width:768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // no canvas act -> aerialCount 0; just preload the render descent so it doesn't flash
  useCinematicScroll({ enabled, scopeRef, canvasRef, aerialCount: 0, preload: PRELOAD });

  // mobile / reduced-motion -> original home (video hero + all content)
  if (!enabled) return <Home />;

  const he = lang === "he";
  const C = he
    ? {
        brand: "אסילה השקעות",
        videoSub: "וילות יוקרה בקופנגן",
        headline: "יוקרה\nמושרשת בטבע",
        headlineSub: "אסילה השקעות — וילות פרימיום בקופנגן, תאילנד",
        cta: "לתיאום סיור פרטי",
        skip: "דלג ↓",
        scroll: "גללו כדי להיכנס",
        h1Eye: "מבט על מהשמיים",
        h1: "מרחפים מעל\nגן עדן",
        stepEye: "הכניסה",
        step: "היכנסו פנימה",
        rooms: ["הסלון", "המטבח", "מרחב האירוח", "חדר השינה"],
        ctaBigEye: "מוזמנים לגלות",
        ctaBig: "הווילה שלכם מחכה.",
        trust: "יזמות בהובלת המייסד · קופנגן, תאילנד",
      }
    : {
        brand: "ASILA Investments",
        videoSub: "premium villas on Koh Phangan",
        headline: "Luxury living,\nrooted in the wild",
        headlineSub: "ASILA Investments — premium villas on Koh Phangan, Thailand",
        cta: "Arrange a Private Viewing",
        skip: "Skip ↓",
        scroll: "Scroll to enter",
        h1Eye: "A view from above",
        h1: "Soaring over\nparadise",
        stepEye: "The threshold",
        step: "Step inside",
        rooms: ["The Living Room", "The Kitchen", "The Lounge", "The Suite"],
        ctaBigEye: "Come discover",
        ctaBig: "Your villa awaits.",
        trust: "Founder-led development · Koh Phangan, Thailand",
      };

  return (
    <>
      <div className="cine-root" ref={scopeRef}>
        <div className="cine-prog" />

        {/* ACT 1 — VIDEO landing (plays, not scrubbed) */}
        <section className="cine-videohero">
          <video className="cine-videobg" poster="/hero-poster.jpg" autoPlay muted loop playsInline preload="metadata">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="cine-grade" />
          <div className="cine-videocontent">
            <img className="cine-logoimg" src="/logo-transparent.png" alt="ASILA" />
            <div className="cine-videoname">{ML(C.brand)}</div>
            <div className="cine-sub">{C.videoSub}</div>
          </div>
          <a href="#projects" className="cine-skip">{C.skip}</a>
          <div className="cine-hint">
            <div className="l">{C.scroll}</div>
            <div className="d" />
          </div>
        </section>

        {/* ACT 2 — designed render descent (aerial -> exterior -> rooms) */}
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
            {/* match-cut bloom at exterior->interior seam (slide 2 -> 3) */}
            <div className="cine-beat cine-flash" data-in="2.55" data-out="2.95" style={{ opacity: 0 }} />

            {/* moved headline (was on the video) — now the first designed screen */}
            <div className="cine-beat cine-center" data-in="0" data-out="1.0">
              <div className="cine-big">{ML(C.headline)}</div>
              <div className="cine-sub">{C.headlineSub}</div>
              <Link to="/contact" className="cine-topcta">{C.cta}</Link>
            </div>

            <div className="cine-beat cine-center" data-in="1.3" data-out="2.0" style={{ opacity: 0 }}>
              <div className="cine-eyebrow">{C.h1Eye}</div>
              <div className="cine-big">{ML(C.h1)}</div>
            </div>
            <div className="cine-beat cine-center" data-in="2.15" data-out="2.7" style={{ opacity: 0 }}>
              <div className="cine-eyebrow">{C.stepEye}</div>
              <div className="cine-big">{C.step}</div>
            </div>
            {C.rooms.map((room, i) => (
              <div className="cine-beat cine-center" key={i} data-in={`${3.1 + i}`} data-out={`${3.9 + i}`} style={{ opacity: 0 }}>
                <div className="cine-roomlabel">{room}</div>
              </div>
            ))}
          </div>
        </section>

        {/* closing concierge CTA */}
        <section className="cine-cta">
          <div className="cine-cbg" style={{ backgroundImage: `url('${CTA_BG}')` }} />
          <div className="cine-cgrade" />
          <div className="cine-inner">
            <div className="cine-reveal cine-kicker">{C.ctaBigEye}</div>
            <h2 className="cine-reveal cine-h2">{C.ctaBig}</h2>
            <div className="cine-line" />
            <Link to="/contact" className="cine-ctabtn cine-reveal">{C.cta}</Link>
            <div className="cine-reveal cine-trust">{C.trust}</div>
          </div>
        </section>
      </div>

      {/* ===== all existing home content preserved (projects grid, about, founder, lead form + SEO) ===== */}
      <Home hideHero />
    </>
  );
}
