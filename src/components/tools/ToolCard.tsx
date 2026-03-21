"use client";
import Link from "next/link";
import { Bookmark, ExternalLink, BarChart2 } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Tool } from "@/types";

interface Props {
  tool: Tool;
  showCompareBtn?: boolean;
  onCompare?: (slug: string) => void;
  isInCompare?: boolean;
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.round(n) ? "text-amber-400" : "text-zinc-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

function PriceBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    Free:     "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
    Freemium: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    Paid:     "bg-rose-500/10 text-rose-400 border border-rose-500/25",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[type] ?? styles.Free}`}>
      {type}
    </span>
  );
}

export default function ToolCard({ tool, showCompareBtn = false, onCompare, isInCompare = false }: Props) {
  const { toggle, isBookmarked, mounted } = useBookmarks();
  const bookmarked = mounted && isBookmarked(tool.slug);

  return (
    <article className="group relative bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
      {/* Badge */}
      {tool.badge && (
        <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
          {tool.badge}
        </span>
      )}

      {/* Icon + name */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border border-white/[0.08]"
          style={{ background: `${tool.accent}18` }}
        >
          {tool.emoji}
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-bold text-[15px] text-white leading-tight truncate">{tool.name}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{tool.category}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-400 leading-relaxed flex-1 line-clamp-3">{tool.description}</p>

      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Stars n={tool.rating} />
          <span className="text-xs font-bold text-zinc-300">{tool.rating}</span>
          <span className="text-[10px] text-zinc-600">({tool.reviews.toLocaleString()})</span>
        </div>
        <PriceBadge type={tool.pricing} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
        <Link
          href={`/tools/${tool.slug}`}
          className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-gradient-to-r from-indigo-600/80 to-violet-600/80 text-white hover:from-indigo-600 hover:to-violet-600 transition-all"
        >
          View Details
        </Link>

        {showCompareBtn && onCompare && (
          <button
            onClick={() => onCompare(tool.slug)}
            title="Add to compare"
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
              isInCompare
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-400"
                : "border-white/[0.08] text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/30"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={() => toggle(tool.slug)}
          title={bookmarked ? "Remove bookmark" : "Bookmark"}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
            bookmarked
              ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
              : "border-white/[0.08] text-zinc-500 hover:text-amber-400 hover:border-amber-500/30"
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
        </button>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit official site"
          className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}

export { Stars, PriceBadge };
