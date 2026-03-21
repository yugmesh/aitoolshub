"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import type { Tool } from "@/types";

const CATEGORIES = ["All","Coding","Writing","Image Gen","Video","Research","Audio","Analytics","Automation","Design","SEO","Presentations"];
const PRICINGS   = ["All","Free","Freemium","Paid"];
const SORTS      = [
  { value: "rating",  label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "name",    label: "Name A–Z" },
  { value: "newest",  label: "Newest" },
];

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [tools,    setTools]    = useState<Tool[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [pricing,  setPricing]  = useState("All");
  const [sort,     setSort]     = useState("rating");
  const [input,    setInput]    = useState(searchParams.get("search") || "");

  const fetchTools = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search)              params.set("search",   search);
      if (category !== "All")  params.set("category", category);
      if (pricing  !== "All")  params.set("pricing",  pricing);
      params.set("sort", sort);

      const res  = await fetch(`/api/tools?${params.toString()}`);
      const data = await res.json();
      setTools(data.tools ?? []);
    } catch {
      setTools([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, pricing, sort]);

  useEffect(() => { fetchTools(); }, [fetchTools]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(input);
    router.push(`/tools?search=${encodeURIComponent(input)}`);
  }

  function clearSearch() {
    setInput("");
    setSearch("");
    router.push("/tools");
  }

  // Compare state
  const [compareList, setCompareList] = useState<string[]>([]);
  function toggleCompare(slug: string) {
    setCompareList((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length < 4 ? [...prev, slug] : prev
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-2">Browse AI Tools</h1>
          <p className="text-zinc-400 text-sm">Discover and compare the best AI tools across every category.</p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-[#0d0d14] border border-white/[0.1] rounded-2xl px-5 py-3.5 mb-6 focus-within:border-indigo-500/40 transition-colors">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by name, category, or description…"
            className="flex-1 bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-600"
          />
          {input && (
            <button type="button" onClick={clearSearch} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <button type="submit" className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold hover:opacity-90 shrink-0">
            Search
          </button>
        </form>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 items-center mb-8">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500 shrink-0" />

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  category === c
                    ? "bg-indigo-600 text-white"
                    : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.08] hover:text-white border border-white/[0.07]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {/* Pricing filter */}
            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              className="bg-[#0d0d14] border border-white/[0.1] text-zinc-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500/50"
            >
              {PRICINGS.map((p) => <option key={p} value={p}>{p === "All" ? "All Pricing" : p}</option>)}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#0d0d14] border border-white/[0.1] text-zinc-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500/50"
            >
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-xs text-zinc-500 mb-6">
            {tools.length} tool{tools.length !== 1 ? "s" : ""} found
            {search ? ` for "${search}"` : ""}
            {category !== "All" ? ` in ${category}` : ""}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-28 border border-white/[0.06] rounded-2xl">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold text-lg text-white mb-2">No tools found</h3>
            <p className="text-zinc-400 text-sm mb-6">Try adjusting your search or filters.</p>
            <button onClick={clearSearch} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:opacity-90">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                showCompareBtn
                onCompare={toggleCompare}
                isInCompare={compareList.includes(tool.slug)}
              />
            ))}
          </div>
        )}

        {/* Compare sticky bar */}
        {compareList.length >= 2 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0d14] border border-indigo-500/40 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-indigo-500/20">
            <span className="text-sm text-zinc-300 font-medium">{compareList.length} tools selected</span>
            <a
              href={`/compare?slugs=${compareList.join(",")}`}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90"
            >
              Compare Now →
            </a>
            <button onClick={() => setCompareList([])} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}