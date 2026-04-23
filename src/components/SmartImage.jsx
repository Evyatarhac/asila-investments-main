// Responsive <picture> wrapper that serves WebP + JPEG at 640/1280/1920 widths.
// Expects a src like "/images/sunset/01.jpg" — if a matching generated set exists
// (see scripts/optimize-images.mjs) it will emit a srcset; otherwise it falls back
// to a plain <img>.
const SIZES = [
  { name: "sm", w: 640 },
  { name: "md", w: 1280 },
  { name: "lg", w: 1920 },
];

function deriveBase(src) {
  const m = src.match(/^(.*)\.(png|jpe?g|webp)$/i);
  if (!m) return null;
  return m[1]; // without extension
}

export default function SmartImage({
  src,
  alt = "",
  sizes = "100vw",
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  width,
  height,
  ...rest
}) {
  const base = deriveBase(src);
  if (!base) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    );
  }
  const webpSet = SIZES.map((s) => `${base}-${s.name}.webp ${s.w}w`).join(", ");
  const jpgSet = SIZES.map((s) => `${base}-${s.name}.jpg ${s.w}w`).join(", ");
  const fallback = `${base}-md.jpg`;
  return (
    <picture>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={jpgSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    </picture>
  );
}
