import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";

const SRC = "_original_assets/images";
const OUT = "public/images";

// Sizes to generate (width in px). Use 'full' for the main display size.
const SIZES = [
  { name: "sm", width: 640 },
  { name: "md", width: 1280 },
  { name: "lg", width: 1920 },
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

const files = await walk(SRC);
const images = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

console.log(`Found ${images.length} images`);

let totalIn = 0;
let totalOut = 0;

for (const file of images) {
  const rel = file.substring(SRC.length + 1); // e.g., sunset/01.png
  const relDir = dirname(rel);
  const base = basename(rel, extname(rel));
  const outDir = join(OUT, relDir);
  await ensureDir(outDir);

  const inStat = await stat(file);
  totalIn += inStat.size;

  const img = sharp(file, { failOn: "none" });
  const meta = await img.metadata();
  const origW = meta.width || 1920;

  for (const s of SIZES) {
    const w = Math.min(s.width, origW);
    const outWebp = join(outDir, `${base}-${s.name}.webp`);
    const outJpg = join(outDir, `${base}-${s.name}.jpg`);
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 75, effort: 5 })
      .toFile(outWebp);
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(outJpg);
    const [a, b] = await Promise.all([stat(outWebp), stat(outJpg)]);
    totalOut += a.size + b.size;
  }
  // Also write a default (largest available) under the ORIGINAL filename so legacy
  // references (e.g. /images/sunset/07.jpg) keep working, but heavily compressed.
  const legacyOut = join(outDir, basename(rel));
  const isPng = /\.png$/i.test(rel);
  const pipeline = sharp(file).resize({ width: Math.min(1920, origW), withoutEnlargement: true });
  if (isPng) {
    await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(legacyOut.replace(/\.png$/i, ".jpg"));
  } else {
    await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(legacyOut);
  }
  console.log(`ok ${rel}`);
}

console.log(
  `Done. In: ${(totalIn / 1e6).toFixed(1)}MB → Out: ${(totalOut / 1e6).toFixed(1)}MB (${((totalOut / totalIn) * 100).toFixed(1)}%)`
);
