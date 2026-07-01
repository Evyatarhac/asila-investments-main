#!/usr/bin/env bash
# One-off media optimization: convert oversized source images to WebP (<=1920px)
# and the hero .mov to a compressed .mp4 + poster frame.
# Originals are left in place (non-destructive); the app is repointed to the
# optimized assets. Requires ffmpeg on PATH.
set -u
cd "$(dirname "$0")/.." || exit 1

echo "=== Images -> WebP (max 1920px, q80) ==="
count=0
while IFS= read -r -d '' f; do
  case "$f" in
    */web/*) continue ;;               # skip already-optimized folder
  esac
  out="${f%.*}.webp"
  ffmpeg -nostdin -y -loglevel error -i "$f" \
    -vf "scale='min(1920,iw)':-2:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 "$out" \
    && count=$((count+1)) && printf '  ✓ %s\n' "$out"
done < <(find public/images -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0)
echo "  Converted $count images."

echo ""
echo "=== Hero video -> MP4 + poster ==="
if [ -f public/hero.mov ]; then
  ffmpeg -y -loglevel error -i public/hero.mov \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow \
    -an -movflags +faststart public/hero.mp4 \
    && echo "  ✓ public/hero.mp4"
  ffmpeg -y -loglevel error -i public/hero.mov \
    -vf "scale='min(1920,iw)':-2" -frames:v 1 -q:v 3 public/hero-poster.jpg \
    && echo "  ✓ public/hero-poster.jpg"
else
  echo "  (hero.mov not found — skipped)"
fi

echo ""
echo "=== Done ==="
