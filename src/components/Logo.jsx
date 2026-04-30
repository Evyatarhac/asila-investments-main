export default function Logo({ size = "md", showText = true, showImage = true, className = "" }) {
  const sizes = {
    sm: { image: "h-10 md:h-12", text: "text-lg md:text-xl", sub: "text-[8px] md:text-[9px]" },
    md: { image: "h-12 md:h-14", text: "text-xl md:text-2xl", sub: "text-[9px] md:text-[10px]" },
    lg: { image: "h-16 md:h-20", text: "text-3xl md:text-4xl", sub: "text-[11px] md:text-[13px]" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      {showImage && (
        <img
          src="https://media.base44.com/images/public/69dd2ec22657e2153222d859/ddf288bb1_asilalogoblue.png"
          alt="ASILA logo"
          className={`${s.image} w-auto object-contain`}
          width="144"
          height="171"
        />
      )}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-heading font-bold tracking-wider text-white ${s.text}`}>
            ASILA
          </span>
          <span className={`${s.sub} tracking-[0.2em] text-asila-muted font-body uppercase`}>
            invest
          </span>
        </div>
      )}
    </div>
  );
}