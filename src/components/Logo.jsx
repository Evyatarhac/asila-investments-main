export default function Logo({ size = "md", showText = true, className = "" }) {
  const sizes = {
    sm: { img: "h-8 md:h-10", text: "text-lg md:text-xl", sub: "text-[8px] md:text-[9px]" },
    md: { img: "h-10 md:h-12", text: "text-xl md:text-2xl", sub: "text-[9px] md:text-[10px]" },
    lg: { img: "h-16 md:h-20", text: "text-3xl md:text-4xl", sub: "text-[11px] md:text-[13px]" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <img
        src="https://media.base44.com/images/public/user_68346bec474ad5c843af673b/eb44c5271_WhatsAppImage2026-04-13at2029491.jpeg"
        alt="ASILA Monogram"
        className={`${s.img} w-auto object-contain brightness-0 invert`}
        width="40"
        height="40"
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-heading font-bold tracking-wider text-white ${s.text}`}>
            ASILA
          </span>
          <span className={`${s.sub} tracking-[0.2em] text-asila-muted font-body uppercase`}>
            investments
          </span>
        </div>
      )}
    </div>
  );
}