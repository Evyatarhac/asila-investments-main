import { useEffect } from "react";

const SITE_URL = "https://asila.co.il";
const DEFAULT_IMAGE = `${SITE_URL}/images/paradise/cover.webp`;
const SITE_NAME = "ASILA Investments";

/**
 * Dependency-free SEO head manager for the SPA.
 * Updates <title>, meta description, canonical and Open Graph / Twitter tags
 * on every route change, and can inject a page-level JSON-LD block.
 *
 * Usage (inside a page component):
 *   useSEO({
 *     title: "...",
 *     description: "...",
 *     path: "/projects",
 *     image: "/images/...",   // optional, absolute or root-relative
 *     lang: "he",             // optional
 *     jsonLd: {...},          // optional structured data object
 *     noindex: false,         // optional
 *   });
 */
export default function useSEO({
  title,
  description,
  path = "/",
  image,
  lang,
  jsonLd,
  type = "website",
  noindex = false,
} = {}) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    const ogImage = !image
      ? DEFAULT_IMAGE
      : image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`;
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Luxury Real Estate Development in Koh Phangan, Thailand`;

    if (title) document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");

    setLink("canonical", canonical);

    setMeta("property", "og:title", title || fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", type);

    setMeta("name", "twitter:title", title || fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    let scriptEl;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.setAttribute("data-seo", "page");
      scriptEl.textContent = JSON.stringify(jsonLd);
      // Remove any previous page-level JSON-LD before adding the new one
      document
        .querySelectorAll('script[data-seo="page"]')
        .forEach((el) => el.remove());
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };
  }, [title, description, path, image, lang, type, noindex, jsonLd]);
}

function setMeta(attr, key, value) {
  if (value == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export { SITE_URL, SITE_NAME };
