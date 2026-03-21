import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import type { Tool } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Top Rated AI Tools" };

async function getTopTools(): Promise<Tool[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/tools?sort=rating`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.tools ?? []).slice(0, 12);
  } catch {
    return [];
  }
}

export default async function TopRatedPage() {
  const tools = await getTopTools();

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-amber-300">Community Verified</span>
          </div>
          <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-2">Top Rated AI Tools</h1>
          <p className="text-zinc-400 text-sm">The highest-rated tools across all categories, ranked by user scores.</p>
        </div>

        {tools.length === 0 ? (
          <div className="text-center py-24 border border-white/[0.06] rounded-2xl">
            <p className="text-zinc-400 mb-4">No tools yet.</p>
            <a href="/api/seed" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:opacity-90">
              Seed sample data →
            </a>
          </div>
        ) : (
          <>
            {/* Top 3 podium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {tools.slice(0, 3).map((tool, i) => (
                <div key={tool.slug} className={`relative ${i === 0 ? "sm:order-2" : i === 1 ? "sm:order-1" : "sm:order-3"}`}>
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold z-10 ${
                    i === 0 ? "bg-amber-400 text-black" : i === 1 ? "bg-zinc-400 text-black" : "bg-amber-700 text-white"
                  }`}>
                    {i + 1}
                  </div>
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            {/* Rest */}
            {tools.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools.slice(3).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="text-center mt-10">
          <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-300 text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-all">
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
