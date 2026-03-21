import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import type { Tool } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Releases – Latest AI Tools" };

async function getNewestTools(): Promise<Tool[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/tools?sort=newest`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.tools ?? []).slice(0, 12);
  } catch {
    return [];
  }
}

export default async function NewReleasesPage() {
  const tools = await getNewestTools();

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-300">Fresh Additions</span>
          </div>
          <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-2">New Releases</h1>
          <p className="text-zinc-400 text-sm">The latest AI tools added to our directory, sorted by date.</p>
        </div>

        {tools.length === 0 ? (
          <div className="text-center py-24 border border-white/[0.06] rounded-2xl">
            <p className="text-zinc-400 mb-4">No tools yet.</p>
            <a href="/api/seed" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:opacity-90">
              Seed sample data →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
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
