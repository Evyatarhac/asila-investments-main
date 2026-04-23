import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";

export default function Lightbox({ images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white min-h-[48px] min-w-[48px] flex items-center justify-center"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 md:left-6 z-10 p-2 text-white/70 hover:text-white min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 md:right-6 z-10 p-2 text-white/70 hover:text-white min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="max-w-5xl max-h-[85vh] w-full px-4" onClick={(e) => e.stopPropagation()}>
        {images[index] ? (
          <SmartImage
            src={images[index]}
            alt={`Gallery image ${index + 1}`}
            sizes="(min-width: 1024px) 80vw, 100vw"
            loading="eager"
            className="w-full h-full object-contain max-h-[80vh]"
          />
        ) : (
          <div className="aspect-video bg-asila-surface flex items-center justify-center text-asila-muted">
            Image {index + 1}
          </div>
        )}
      </div>

      <div className="absolute bottom-6 text-asila-muted text-sm">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}