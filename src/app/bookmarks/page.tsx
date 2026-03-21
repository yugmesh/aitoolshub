"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import ToolCard from "@/components/tools/ToolCard";
import type { Tool } from "@/types";

export default function BookmarksPage() {
  const { bookmarks, mounted } = useBookmarks();
  const [tools,   setTools]   = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    if (bookmarks.length === 0) { setLoading(false); return; }

    async function load() {
      setLoading(true);
      const results = await Promise.all(
        bookmarks.map(async (slug) => {
          try {
            const res  = await fetch(`/api/tools/${slug}`);
            const data = await res.json();
            return data.tool as Tool | null;
          } catch { return null; }
        })
      );
      setTools(results.filter(Boolean) as Tool[]);
      setLoading(false);
    }
    load();
  }, [bookmarks, mounted]);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-3xl tracking-tight">Your Bookmarks</h1>
            <p className="text-zinc-400 text-sm mt-0.5">
              {mounted && bookmarks.length > 0 ? `${bookmarks.length} saved tool${bookmarks.length !== 1 ? "s" : ""}` : "Tools you've saved for later"}
            </p>
          </div>
        </div>

        {!mounted || loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-28 border border-white/[0.06] rounded-2xl">
            <div className="text-5xl mb-4">🔖</div>
            <h3 className="font-bold text-xl text-white mb-2">No bookmarks yet</h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">
              Browse AI tools and click the bookmark icon on any card to save it here.
            </p>
            <Link href="/tools" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Browse Tools
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
