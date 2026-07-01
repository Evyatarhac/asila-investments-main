import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Breadcrumb from "../components/Breadcrumb";
import ScrollFade from "../components/ScrollFade";
import posts, { getPost } from "../lib/posts";
import useSEO, { SITE_URL } from "../lib/useSEO";

const mdComponents = {
  h2: (props) => <h2 className="font-heading text-2xl md:text-3xl font-medium text-asila-navy mt-12 mb-4" {...props} />,
  h3: (props) => <h3 className="font-heading text-xl md:text-2xl font-medium text-asila-navy mt-8 mb-3" {...props} />,
  p: (props) => <p className="font-body text-base leading-relaxed text-asila-body/85 mb-5" {...props} />,
  ul: (props) => <ul className="list-disc space-y-2 mb-6 ps-6 text-asila-body/85 font-body" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-2 mb-6 ps-6 text-asila-body/85 font-body" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => <a className="text-asila-gold underline underline-offset-2 hover:opacity-80 transition-opacity" {...props} />,
  strong: (props) => <strong className="font-semibold text-asila-navy" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-s-2 border-asila-gold/60 ps-4 my-6 text-asila-subtle italic font-body text-sm md:text-base" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm font-body border-collapse" {...props} />
    </div>
  ),
  th: (props) => <th className="border border-gray-200 bg-asila-page px-3 py-2 text-start font-semibold text-asila-navy" {...props} />,
  td: (props) => <td className="border border-gray-200 px-3 py-2 text-asila-body/85" {...props} />,
};

export default function BlogPost() {
  const { lang } = useOutletContext();
  const isRTL = lang === "he";
  const slug = window.location.pathname.split("/").pop();
  const post = getPost(slug);

  useSEO({
    path: `/blog/${slug}`,
    lang,
    noindex: !post,
    type: "article",
    title: post ? (post.title[lang] || post.title.en) : undefined,
    description: post ? (post.excerpt[lang] || post.excerpt.en) : undefined,
    image: post?.coverImage,
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title[lang] || post.title.en,
          description: post.excerpt[lang] || post.excerpt.en,
          image: `${SITE_URL}${post.coverImage}`,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: lang,
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          author: { "@type": "Organization", name: "ASILA Investments" },
          publisher: {
            "@type": "Organization",
            name: "ASILA Investments",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-transparent.png` },
          },
        }
      : undefined,
  });

  if (!post) {
    return (
      <div className="pt-32 pb-16 px-4 text-center bg-asila-page min-h-screen">
        <p className="text-asila-subtle font-body">{isRTL ? "המאמר לא נמצא." : "Article not found."}</p>
        <Link to="/blog" className="text-asila-gold mt-4 inline-block font-body text-sm underline">
          {isRTL ? "חזרה לבלוג" : "Back to Blog"}
        </Link>
      </div>
    );
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-asila-page text-asila-body min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero */}
      <div className="relative h-[42vh] md:h-[52vh] overflow-hidden bg-asila-navy">
        <img src={post.coverImage} alt={post.title[lang] || post.title.en} className="w-full h-full object-cover opacity-70" width="1920" height="1080" />
        <div className="absolute inset-0 bg-gradient-to-t from-asila-navy via-asila-navy/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-4 md:px-8 pb-8 md:pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-3 text-[11px] uppercase tracking-widest text-asila-gold">
              <span>{post.category[lang] || post.category.en}</span>
              <span className="flex items-center gap-1 text-white/70 normal-case tracking-normal">
                <Clock className="w-3 h-3" />
                {post.readingTime} {isRTL ? "דק׳ קריאה" : "min read"}
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-medium text-white tracking-wide leading-tight"
            >
              {post.title[lang] || post.title.en}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: isRTL ? "דף הבית" : "Home", to: "/" },
              { label: isRTL ? "בלוג" : "Blog", to: "/blog" },
              { label: post.title[lang] || post.title.en },
            ]}
          />
          <ScrollFade>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {post.body[lang] || post.body.en}
            </ReactMarkdown>
          </ScrollFade>

          {/* CTA */}
          <div className="mt-12 p-6 md:p-8 bg-asila-navy text-center">
            <h3 className="font-heading text-xl md:text-2xl text-white mb-3">
              {isRTL ? "מעוניינים להשקיע בקופנגן?" : "Interested in investing in Koh Phangan?"}
            </h3>
            <p className="text-asila-muted text-sm font-body mb-5 max-w-md mx-auto">
              {isRTL
                ? "ASILA מפתחת פרויקטי נדל״ן פרימיום באי. דברו איתנו על ההזדמנויות."
                : "ASILA develops premium real estate projects on the island. Talk to us about the opportunities."}
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-asila-light hover:bg-asila-mid text-white font-body text-sm tracking-wide px-8 py-3.5 transition-colors">
              {isRTL ? "צרו קשר" : "Get in Touch"}
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="font-heading text-lg text-asila-navy mb-5">
                {isRTL ? "מאמרים נוספים" : "More articles"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group block border border-gray-200 hover:border-asila-gold/50 transition-colors p-4 bg-white">
                    <span className="text-[10px] uppercase tracking-widest text-asila-gold">{r.category[lang] || r.category.en}</span>
                    <p className="font-heading text-base text-asila-navy mt-1.5 leading-snug">{r.title[lang] || r.title.en}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-asila-subtle hover:text-asila-navy text-sm font-body transition-colors">
              <BackArrow className="w-4 h-4" />
              {isRTL ? "חזרה לבלוג" : "Back to Blog"}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
