"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/tools?search=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 bg-[#0f0f17] border border-white/[0.1] rounded-2xl px-5 py-4 focus-within:border-indigo-500/50 transition-colors shadow-2xl shadow-black/40">
        <Search className="w-5 h-5 text-zinc-500 shrink-0" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search ChatGPT, Midjourney, Cursor…"
          className="flex-1 bg-transparent outline-none text-base text-zinc-200 placeholder-zinc-600"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          Search
        </button>
      </div>
      <p className="text-xs text-zinc-600 mt-3">
        Popular:&nbsp;
        <span className="text-zinc-500">ChatGPT · Copilot · DALL-E 3 · Perplexity · Sora</span>
      </p>
    </form>
  );
}
