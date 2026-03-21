export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Star, CheckCircle, XCircle, Zap } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import type { Tool } from "@/types";
import type { Metadata } from "next";

async function getTool(slug: string): Promise<{ tool: Tool; related: Tool[] } | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL!;
    const res  = await fetch(`${base}/api/tools/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getTool(params.slug);
  if (!data) return { title: "Tool Not Found" };
  return {
    title: `${data.tool.name} – Review & Details`,
    description: data.tool.description,
  };
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(n) ? "text-amber-400" : "text-zinc-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const data = await getTool(params.slug);
  if (!data) notFound();

  const { tool, related } = data;

  const pricingColors: Record<string, string> = {
    Free:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    Freemium: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    Paid:     "bg-rose-500/10 text-rose-400 border-rose-500/25",
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">

            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 border border-white/[0.08]"
              style={{ background: `${tool.accent}18` }}>
              {tool.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="font-extrabold text-3xl text-white">{tool.name}</h1>
              </div>

              <p className="text-zinc-400 text-sm mb-4">{tool.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Stars n={tool.rating} />
                  <span className="font-bold text-white">{tool.rating}</span>
                </div>
              </div>

              <a href={tool.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white">
                Visit {tool.name} <ExternalLink className="w-4 h-4" />
              </a>

            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="font-extrabold text-xl mb-5">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => <ToolCard key={r.slug} tool={r} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}