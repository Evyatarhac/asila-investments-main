import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Colour tokens ─── */
const BLUE_DARK  = "#1B3A6B";
const BLUE_LIGHT = "#4A7AB5";

/* ─── Main component ─── */
export default function SplashScreen({ onDone, videoReady }) {
  const [phase, setPhase] = useState("in"); // "in" | "hold" | "out"
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Minimum display time for the splash animation
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setMinTimePassed(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Start exit once both min time passed AND video is ready (or 5s max)
  useEffect(() => {
    if (!minTimePassed) return;
    if (videoReady) {
      setPhase("out");
      const t = setTimeout(() => onDone?.(), 500);
      return () => clearTimeout(t);
    }
    // Safety: don't wait more than 3s total — release splash early, video loads behind
    const safety = setTimeout(() => {
      setPhase("out");
      setTimeout(() => onDone?.(), 500);
    }, 1300); // 1700 already passed + 1300 = 3000ms max
    return () => clearTimeout(safety);
  }, [minTimePassed, videoReady, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "out") setPhase("done");
          }}
        >
          {/* Monogram — real logo image, no filter (white bg shows original blue) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/logo-mark.jpeg"
              alt="ASILA"
              style={{ width: 140, height: 140, objectFit: "contain" }}
            />
          </motion.div>

          {/* ASILA */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          >
            <span
              className="font-heading font-semibold tracking-[0.28em] text-4xl"
              style={{ color: BLUE_DARK }}
            >
              ASILA
            </span>
            <span
              className="font-body tracking-[0.35em] text-xs uppercase"
              style={{ color: BLUE_LIGHT }}
            >
              invest
            </span>
          </motion.div>

          {/* Thin gold line */}
          <motion.div
            className="mt-8 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}