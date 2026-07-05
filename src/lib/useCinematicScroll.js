import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Reusable cinematic scroll engine (generalized from the Sunset experience).
 *
 * Structure it drives (all optional, discovered within scopeRef):
 *  - .cine-fly  > .cine-sticky > canvas   — Act 1: drone frame-sequence scrub
 *  - .cine-hero > .cine-sticky > .cine-slides > .cine-slide > .cine-img
 *                                           — Act 2: crossfade + push-in "descent"
 *  - .cine-beat[data-in][data-out]         — text beats, timed along their act's scroll
 *  - .cine-reveal / .cine-ri / .cine-cbg / .cine-tile — reveals + parallax
 *
 * No-ops entirely when !enabled (mobile / reduced-motion).
 *
 * opts: { enabled, scopeRef, canvasRef, onProgress, aerialCount, aerialPath, preload }
 */
export default function useCinematicScroll({ enabled, scopeRef, canvasRef, onProgress, aerialCount = 0, aerialPath, preload = [] }) {
  useEffect(() => {
    if (!enabled) return;
    const scope = scopeRef.current;
    if (!scope) return;
    const canvas = canvasRef && canvasRef.current;
    const ctx2d = canvas ? canvas.getContext("2d") : null;

    const frames = [];
    let loaded = 0;
    const total = (canvas ? aerialCount : 0) + preload.length;
    let killed = false;
    let lenis, tickFn, gsapCtx;
    const fstate = { frame: 0 };

    const q = (sel) => scope.querySelector(sel);
    const qa = (sel) => Array.from(scope.querySelectorAll(sel));

    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    function drawCover(img) {
      if (!ctx2d || !img || !img.width) return;
      const cw = canvas.width, ch = canvas.height;
      const ir = img.width / img.height, cr = cw / ch;
      let dw, dh, dx, dy;
      if (cr > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      else { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2; }
      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(img, dx, dy, dw, dh);
    }
    function renderFly() { drawCover(frames[Math.round(fstate.frame)]); }

    function bump() {
      loaded++;
      if (onProgress) onProgress(total ? loaded / total : 1);
      if (loaded >= total && !killed) init();
    }

    if (canvas && aerialCount > 0) {
      for (let i = 1; i <= aerialCount; i++) {
        const im = new Image();
        im.decoding = "async";
        im.onload = im.onerror = bump;
        im.src = aerialPath(i);
        frames[i - 1] = im;
      }
    }
    preload.forEach((src) => {
      const im = new Image();
      im.onload = im.onerror = bump;
      im.src = src;
    });
    if (total === 0) init();

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { sizeCanvas(); renderFly(); ScrollTrigger.refresh(); }, 150);
    }
    const noTouch = !window.matchMedia("(pointer:coarse)").matches;
    function onMove(e) {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      const s = q(".cine-slides");
      if (s) s.style.transform = `translate(${cx * -14}px,${cy * -14}px)`;
      const g = q(".cine-grid3d");
      if (g) {
        const r = g.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight)
          g.style.transform = `rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
      }
    }

    function addBeats(container, timeline) {
      Array.from(container.querySelectorAll(".cine-beat[data-in]")).forEach((b) => {
        const din = parseFloat(b.dataset.in);
        const dout = parseFloat(b.dataset.out);
        if (din <= 0) timeline.set(b, { opacity: 1, y: 0 }, 0); // visible on landing
        else timeline.fromTo(b, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, din);
        if (!Number.isNaN(dout)) timeline.to(b, { opacity: 0, y: -30, duration: 0.4 }, dout);
      });
    }

    function init() {
      if (killed) return;
      sizeCanvas();
      renderFly();
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      tickFn = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tickFn);
      gsap.ticker.lagSmoothing(0);

      gsapCtx = gsap.context(() => {
        /* ACT 1 — drone frame scrub */
        const fly = q(".cine-fly");
        if (fly && canvas && aerialCount > 0) {
          const flyEl = fly.querySelector(".cine-sticky");
          const FLY_END = "+=1600";
          gsap.to(fstate, {
            frame: aerialCount - 1, ease: "none", onUpdate: renderFly,
            scrollTrigger: { trigger: flyEl, start: "top top", end: FLY_END, scrub: 0.6, pin: flyEl, pinSpacing: true },
          });
          const tlf = gsap.timeline({ scrollTrigger: { trigger: flyEl, start: "top top", end: FLY_END, scrub: 0.6 } });
          addBeats(fly, tlf);
          const hint = q(".cine-hint");
          if (hint) gsap.to(hint, { opacity: 0, scrollTrigger: { trigger: flyEl, start: "top top", end: "+=250", scrub: true } });
        }

        /* ACT 2 — render crossfade / descent */
        const hero = q(".cine-hero");
        if (hero) {
          const slides = Array.from(hero.querySelectorAll(".cine-slide"));
          const N = slides.length;
          const heroEl = hero.querySelector(".cine-sticky");
          const HERO_END = "+=" + Math.max(N, 1) * 900;
          const tl = gsap.timeline({ scrollTrigger: { trigger: heroEl, start: "top top", end: HERO_END, scrub: 0.7, pin: heroEl, pinSpacing: true } });
          // lighter effect on touch devices: no blur (GPU-expensive), softer zoom
          const touch = window.matchMedia("(pointer:coarse)").matches;
          const OUT_SCALE = touch ? 1.7 : 2.0;
          const OUT_BLUR = touch ? "blur(0px)" : "blur(4px)";
          const IN_BLUR = touch ? "blur(0px)" : "blur(3px)";

          // initial states (one timeline unit per slide; seam at each integer)
          slides.forEach((s, i) => {
            gsap.set(s, { opacity: i === 0 ? 1 : 0 });
            gsap.set(s.querySelector(".cine-img"), { scale: i === 0 ? 1 : 1.22, filter: "blur(0px)", transformOrigin: "50% 48%" });
          });

          // first room: gentle drift
          tl.to(slides[0].querySelector(".cine-img"), { scale: 1.08, duration: 0.85, ease: "sine.inOut" }, 0.1);

          // room-to-room: step INTO the frame — outgoing zooms past the camera while the next room snaps into focus
          for (let i = 1; i < N; i++) {
            const prev = slides[i - 1];
            const prevImg = prev.querySelector(".cine-img");
            const cur = slides[i];
            const curImg = cur.querySelector(".cine-img");
            // outgoing: dive forward through it
            tl.to(prevImg, { scale: OUT_SCALE, filter: OUT_BLUR, duration: 0.44, ease: "power2.in" }, i - 0.44);
            tl.to(prev, { opacity: 0, duration: 0.26, ease: "power1.in" }, i - 0.26);
            // incoming: emerges from depth and snaps sharp
            tl.fromTo(cur, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" }, i - 0.3);
            tl.fromTo(curImg, { scale: 1.22, filter: IN_BLUR }, { scale: 1.0, filter: "blur(0px)", duration: 0.56, ease: "power3.out" }, i - 0.3);
            // settle / drift while in the room
            tl.to(curImg, { scale: 1.08, duration: 0.7, ease: "sine.inOut" }, i + 0.3);
          }
          addBeats(hero, tl);
        }

        /* progress bar + reveals + parallax */
        const prog = q(".cine-prog");
        if (prog) gsap.to(prog, { width: "100%", ease: "none", scrollTrigger: { trigger: scope, start: "top top", end: "bottom bottom", scrub: true } });
        qa(".cine-reveal").forEach((el) =>
          gsap.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } })
        );
        qa(".cine-ri").forEach((ri) =>
          gsap.fromTo(ri, { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: ri.closest(".cine-revealimg") || ri, start: "top bottom", end: "bottom top", scrub: true } })
        );
        const cbg = q(".cine-cbg");
        if (cbg) gsap.fromTo(cbg, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: q(".cine-cta"), start: "top bottom", end: "bottom top", scrub: true } });
        qa(".cine-tile").forEach((el, i) => {
          const d = (i % 3) - 1;
          gsap.fromTo(el, { yPercent: d * 8 }, { yPercent: d * -8, ease: "none", scrollTrigger: { trigger: q(".cine-gallery"), start: "top bottom", end: "bottom top", scrub: true } });
        });
      }, scope);

      window.addEventListener("resize", onResize);
      if (noTouch) window.addEventListener("mousemove", onMove);
      ScrollTrigger.refresh();
    }

    return () => {
      killed = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (noTouch) window.removeEventListener("mousemove", onMove);
      if (gsapCtx) gsapCtx.revert();
      if (tickFn) gsap.ticker.remove(tickFn);
      if (lenis) lenis.destroy();
    };
  }, [enabled]);
}
