import type { Metadata } from "next";
export const metadata: Metadata = { title: "Changelog" };

const CHANGES = [
  {
    version: "v2.3.0",
    date: "January 2025",
    tag: "Feature",
    tagColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    items: [
      "Added side-by-side compare page supporting up to 4 tools",
      "Newsletter subscription with MongoDB persistence",
      "Bookmark / favorites system using localStorage",
      "Dynamic tool detail pages with pros, cons, and features",
    ],
  },
  {
    version: "v2.2.0",
    date: "December 2024",
    tag: "Improvement",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    items: [
      "Added 40 new tools across Video, Audio, and Automation categories",
      "Improved search to include description and tag matching",
      "Category filter pills on browse page",
      "Related tools section on detail pages",
    ],
  },
  {
    version: "v2.1.0",
    date: "November 2024",
    tag: "Feature",
    tagColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    items: [
      "Launched AIToolsHub 2.0 with complete redesign",
      "MongoDB backend with full-text search",
      "API endpoints for tools and newsletter",
      "Blog section with AI tool guides",
    ],
  },
  {
    version: "v1.0.0",
    date: "August 2024",
    tag: "Launch",
    tagColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    items: [
      "Initial launch with 50 hand-curated AI tools",
      "Static site with basic category browsing",
      "Hero search bar and category grid",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight text-white mb-3">Changelog</h1>
          <p className="text-zinc-400 text-sm">A running log of everything we ship.</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/[0.07]" />

          <div className="flex flex-col gap-8">
            {CHANGES.map((c) => (
              <div key={c.version} className="flex gap-5 relative">
                {/* Dot */}
                <div className="w-9 h-9 rounded-full bg-[#0d0d14] border border-white/[0.12] flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                </div>

                <div className="flex-1 bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-bold text-white text-base">{c.version}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.tagColor}`}>{c.tag}</span>
                    <span className="text-xs text-zinc-500 ml-auto">{c.date}</span>
                  </div>
                  <ul className="space-y-2">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-indigo-400 mt-1 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
