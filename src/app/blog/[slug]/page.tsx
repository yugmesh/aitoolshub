import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/seed";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("# "))  return <h1 key={i} className="font-extrabold text-2xl text-white mt-8 mb-4">{line.slice(2)}</h1>;
    if (line.startsWith("## ")) return <h2 key={i} className="font-bold text-xl text-white mt-6 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="font-bold text-lg text-indigo-300 mt-4 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-zinc-200 my-2">{line.slice(2,-2)}</p>;
    }
    if (line.trim() === "") return <div key={i} className="h-3" />;
    return <p key={i} className="text-zinc-400 leading-relaxed text-sm my-1">{line}</p>;
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0,2);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500"><Clock className="w-3 h-3" />{post.readTime}</span>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-5xl shrink-0">{post.emoji}</span>
            <h1 className="font-extrabold text-2xl md:text-3xl text-white leading-tight">{post.title}</h1>
          </div>

          <p className="text-zinc-400 mt-4 text-sm leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Content */}
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-8 mb-8 prose prose-invert">
          {renderMarkdown(post.content)}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-bold text-lg text-white mb-4">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`}
                  className="bg-[#0d0d14] border border-white/[0.07] rounded-xl p-4 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{r.emoji}</span>
                    <div>
                      <h3 className="font-bold text-sm text-white leading-snug">{r.title}</h3>
                      <p className="text-xs text-zinc-500 mt-1">{r.readTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
