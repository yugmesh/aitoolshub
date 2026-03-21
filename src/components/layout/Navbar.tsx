"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Zap, Menu, X, Bookmark, Search } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

const NAV_LINKS = [
  { label: "Browse",     href: "/tools" },
  { label: "Compare",    href: "/compare" },
  { label: "Categories", href: "/tools" },
  { label: "Pricing",    href: "/#pricing" },
  { label: "Blog",       href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const { bookmarks } = useBookmarks();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setMobileOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight text-white">AIToolsHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === link.href
                  ? "text-white bg-white/[0.08]"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Quick search */}
          <form onSubmit={handleSearch} className="flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Quick search…"
              className="bg-transparent outline-none text-xs text-zinc-300 placeholder-zinc-600 w-32"
            />
          </form>
          <Link
            href="/bookmarks"
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                {bookmarks.length}
              </span>
            )}
          </Link>
          <Link href="/signin" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/tools"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a12] border-t border-white/[0.06] px-4 py-4 flex flex-col gap-1">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 mb-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search tools…"
              className="flex-1 bg-transparent outline-none text-sm text-zinc-300 placeholder-zinc-600"
            />
          </form>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/[0.06] pt-3 mt-2 flex flex-col gap-2">
            <Link href="/bookmarks" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Bookmarks {bookmarks.length > 0 && `(${bookmarks.length})`}
            </Link>
            <Link href="/signin" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white">
              Sign In
            </Link>
            <Link href="/tools" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
