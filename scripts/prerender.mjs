/**
 * Static prerendering step (runs as `postbuild`).
 *
 * Serves the built SPA from `dist/`, renders each route in a modern headless
 * Chromium, and writes a fully-populated `index.html` per route. Crawlers then
 * receive real content + per-page meta/JSON-LD on the first response, without
 * waiting for client-side JavaScript.
 *
 * SAFETY: this step must NEVER break the production build. If a headless
 * browser can't launch in the host environment, it logs a warning and exits 0 —
 * the site still ships as a normal SPA (no regression).
 */
import { createServer } from "http";
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import { existsSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 45999;

const ROUTES = [
  "/",
  "/projects",
  "/about",
  "/blog",
  "/contact",
  "/projects/paradise",
  "/projects/sunset",
  "/projects/coco",
  "/projects/arias",
  "/blog/koh-phangan-real-estate-investment-guide",
  "/blog/foreign-property-ownership-thailand-freehold-leasehold",
  "/blog/koh-phangan-vs-phuket-vs-koh-samui-where-to-invest",
  "/blog/koh-phangan-property-roi-rental-yields",
  "/blog/how-to-buy-property-koh-phangan-step-by-step",
];

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon", ".woff": "font/woff",
  ".woff2": "font/woff2", ".mov": "video/quicktime", ".mp4": "video/mp4",
  ".txt": "text/plain", ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error("dist/index.html not found — run vite build first.");
  }

  // Keep a pristine copy of the SPA shell for SPA-fallback routing,
  // so per-route overwrites never affect subsequent renders.
  const shellHtml = await readFile(join(DIST, "index.html"), "utf8");

  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    // Mirror production: unknown API routes 404 (app degrades gracefully).
    if (urlPath.startsWith("/api/")) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end('{"error":"not found"}');
      return;
    }
    const filePath = join(DIST, urlPath);
    try {
      if (existsSync(filePath) && (await stat(filePath)).isFile()) {
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(await readFile(filePath));
        return;
      }
    } catch { /* fall through to SPA shell */ }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(shellHtml);
  });

  await new Promise((r) => server.listen(PORT, r));

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    // Skip heavy media (hero video, images) to speed up rendering.
    await page.setRequestInterception(true);
    page.on("request", (r) => {
      if (r.resourceType() === "media") r.abort();
      else r.continue();
    });
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      // Wait for the SPA to render real page content.
      await page.waitForSelector("#root h1, #root main", { timeout: 15000 });
      // Let useEffect-based meta/JSON-LD and markdown settle.
      await new Promise((r) => setTimeout(r, 900));
      // Drop the splash overlay from the static snapshot.
      await page.evaluate(() => {
        document.querySelectorAll('[class*="z-[9999]"]').forEach((el) => el.remove());
      });
      const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const outPath = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf8");
      ok++;
      console.log("[prerender] ✓", route);
    } catch (e) {
      console.warn("[prerender] ⚠ failed:", route, "-", e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] Done — ${ok}/${ROUTES.length} routes rendered.`);
}

main().catch((err) => {
  console.warn("\n[prerender] ⚠ Skipped — headless browser unavailable in this environment.");
  console.warn("[prerender]   Reason:", err && err.message ? err.message : err);
  console.warn("[prerender]   The site will still deploy as a standard SPA.\n");
  process.exit(0);
});
