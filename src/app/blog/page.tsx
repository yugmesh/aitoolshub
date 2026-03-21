import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/seed";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog – AI Tools Insights & Guides" };

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-xs font-medium text-indigo-300">AIToolsHub Blog</span>
          </div>
          <h1 className="font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            AI Tools Insights &amp; Guides
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            In-depth comparisons, tutorials, and industry news to help you get the most out of AI tools.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/8 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-3xl shrink-0">{post.emoji}</span>
                <h2 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {post.title}
                </h2>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{post.excerpt}</p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
                <span className="text-xs text-zinc-600">{new Date(post.date).toLocaleDateString("en-US",{ month:"short",day:"numeric",year:"numeric" })}</span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
