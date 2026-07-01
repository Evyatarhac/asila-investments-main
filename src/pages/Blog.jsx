import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import ScrollFade from "../components/ScrollFade";
import posts from "../lib/posts";
import useSEO, { SITE_URL } from "../lib/useSEO";

export default function Blog() {
  const { lang } = useOutletContext();
  const isRTL = lang === "he";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useSEO({
    path: "/blog",
    lang,
    title:
      isRTL
        ? "בלוג ומדריכי השקעה — נדל״ן בתאילנד | ASILA"
        : "Blog & Investment Guides — Thailand Real Estate",
    description:
      isRTL
        ? "מדריכים ותובנות על השקעות נדל״ן בקופנגן ובתאילנד — בעלות זרים, השוואת שווקים ומדריכי משקיעים מאת ASILA Investments."
        : "Guides and insights on real estate investment in Koh Phangan and Thailand — foreign ownership, market comparisons and investor guides from ASILA Investments.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: isRTL ? "הבלוג של ASILA Investments" : "ASILA Investments Blog",
      url: `${SITE_URL}/blog`,
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title[lang] || p.title.en,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        image: `${SITE_URL}${p.coverImage}`,
      })),
    },
  });

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <Breadcrumb
        items={[
          { label: isRTL ? "דף הבית" : "Home", to: "/" },
          { label: isRTL ? "בלוג" : "Blog" },
        ]}
      />

      <ScrollFade>
        <div className="mb-4">
          <h1 className="font-heading text-3xl md:text-5xl font-light text-white tracking-wide">
            {isRTL ? "בלוג ומדריכים" : "Blog & Guides"}
          </h1>
          <div className="w-16 h-px bg-asila-blue/40 mt-3" />
        </div>
        <p className="text-asila-muted text-sm md:text-base font-body max-w-2xl mb-10">
          {isRTL
            ? "תובנות, מדריכים וניתוחי שוק על השקעות נדל״ן בקופנגן ובתאילנד."
            : "Insights, guides and market analysis on real estate investment in Koh Phangan and Thailand."}
        </p>
      </ScrollFade>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="group block bg-asila-navy border border-asila-blue/10 hover:border-asila-light/30 transition-all duration-300 h-full"
            >
              <div className="relative overflow-hidden aspect-[16/9] bg-asila-surface">
                <img
                  src={post.coverImage}
                  alt={post.title[lang] || post.title.en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  width="400"
                  height="225"
                />
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-widest text-asila-light">
                  <span>{post.category[lang] || post.category.en}</span>
                  <span className="flex items-center gap-1 text-asila-muted normal-case tracking-normal">
                    <Clock className="w-3 h-3" />
                    {post.readingTime} {isRTL ? "דק׳" : "min"}
                  </span>
                </div>
                <h2 className="font-heading text-lg md:text-xl font-semibold text-white tracking-wide mb-2 leading-snug">
                  {post.title[lang] || post.title.en}
                </h2>
                <p className="text-asila-muted text-xs md:text-sm font-body leading-relaxed line-clamp-3">
                  {post.excerpt[lang] || post.excerpt.en}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-asila-light text-sm font-body group-hover:gap-3 transition-all duration-300">
                  {isRTL ? "קראו עוד" : "Read more"}
                  <Arrow className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
