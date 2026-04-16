import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";
  const SeparatorIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <nav className="flex items-center gap-1.5 text-xs font-body text-asila-muted mb-6" dir={isRTL ? "rtl" : "ltr"}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <SeparatorIcon className="w-3 h-3" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-asila-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}