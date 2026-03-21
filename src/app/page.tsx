export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  Zap, Search, ArrowRight, Star, Check, ChevronRight,
  Code2, Paintbrush, Video, FileText, Brain, Music,
  Shield, Clock, Users, Award,
  TrendingUp, Cpu, BarChart3, Layers, Sparkles, Globe,
} from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import NewsletterForm from "@/components/ui/NewsletterForm";
import type { Tool } from "@/types";

// ─── Static data (categories, why items, testimonials, plans stay same) ───────

const CATEGORIES = [
  { name: "Coding",      Icon: Code2,      color: "#6366f1", count: 142 },
  { name: "Writing",     Icon: FileText,   color: "#f97316", count: 198 },
  { name: "Image Gen",   Icon: Paintbrush, color: "#ec4899", count: 87  },
  { name: "Video",       Icon: Video,      color: "#14b8a6", count: 63  },
  { name: "Research",    Icon: Brain,      color: "#0ea5e9", count: 109 },
  { name: "Audio",       Icon: Music,      color: "#a855f7", count: 54  },
  { name: "Analytics",   Icon: BarChart3,  color: "#22c55e", count: 76  },
  { name: "Automation",  Icon: Cpu,        color: "#f59e0b", count: 118 },
  { name: "Design",      Icon: Layers,     color: "#ef4444", count: 93  },
  { name: "SEO",         Icon: TrendingUp, color: "#06b6d4", count: 47  },
];

const WHY_ITEMS = [
  { Icon: Shield, color: "#6366f1", title: "Independent & Unbiased",   desc: "We never accept payment for rankings. Every rating is earned through rigorous hands-on testing by our expert team." },
  { Icon: Clock,  color: "#f97316", title: "Updated Every 24 Hours",   desc: "AI moves fast. Our database refreshes daily so you always see the latest models, pricing changes, and new launches." },
  { Icon: Users,  color: "#ec4899", title: "50K+ Community Votes",     desc: "Ratings validated by a community of developers, designers, and researchers who use these tools daily." },
  { Icon: Award,  color: "#14b8a6", title: "Depth Over Breadth",       desc: "Each tool page features category-specific scores, detailed pros/cons, and real use-case analysis — not just summaries." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma",    role: "ML Engineer @ Stripe",          initials: "PS", color: "#6366f1", quote: "AIToolsHub saved me 10+ hours of research. The compare feature is brilliant — I switched from Copilot to Cursor after seeing the side-by-side breakdown." },
  { name: "Marcus Webb",     role: "Creative Director @ Figma",     initials: "MW", color: "#ec4899", quote: "The image generation category alone is worth bookmarking. Quality scores are spot-on and the new releases section keeps me ahead of the curve." },
  { name: "Sofia Andersson", role: "Founder @ Notion Templates",    initials: "SA", color: "#f97316", quote: "I recommend this to every founder I meet. It's the Bloomberg Terminal of AI tools — comprehensive, current, and actually trustworthy." },
];

const PLANS = [
  { name: "Free",  price: "$0",  period: "forever",  color: "#6b7280", desc: "For casual AI explorers",      popular: false, cta: "Get Started",     ctaHref: "/tools",   features: ["Browse all 2,400+ tools", "Basic search & filtering", "Compare up to 2 tools", "Community ratings", "Weekly digest email"] },
  { name: "Pro",   price: "$12", period: "/month",   color: "#6366f1", desc: "For serious AI power users",  popular: true,  cta: "Start Free Trial", ctaHref: "/tools",   features: ["Everything in Free", "Compare up to 5 tools", "Advanced filters & sort", "Save favorites & lists", "Early access to new tools", "Export comparisons to PDF", "Priority support"] },
  { name: "Team",  price: "$49", period: "/month",   color: "#14b8a6", desc: "For teams evaluating AI stack",popular: false, cta: "Contact Sales",   ctaHref: "/contact", features: ["Everything in Pro", "Up to 10 team members", "Shared tool collections", "Team comparison boards", "API access", "SSO / SAML", "Dedicated support"] },
];

const STATS = [
  { value: "2,400+", label: "AI Tools Listed" },
  { value: "180K+",  label: "Monthly Users" },
  { value: "98%",    label: "Satisfaction Rate" },
  { value: "24h",    label: "Update Frequency" },
];

// ─── Fetch featured tools from DB ─────────────────────────────────────────────

async function getFeaturedTools(): Promise<Tool[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res  = await fetch(`${base}/api/tools?featured=true`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.tools ?? [];
  } catch {
    return [];
  }
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.round(n) ? "text-amber-400" : "text-zinc-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

// ─── Hero search (client island) ──────────────────────────────────────────────
import HeroSearch from "@/components/ui/HeroSearch";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const featuredTools = await getFeaturedTools();

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100">

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="relative overflow-hidden py-28 text-center px-4">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-violet-600/8 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-56 bg-cyan-600/8 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-zinc-400">2,400+ AI Tools · Updated Daily</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="font-extrabold leading-[1.08] tracking-tight mb-6" style={{ fontSize: "clamp(2.4rem, 7vw, 4.8rem)" }}>
            Find the{" "}
            <span style={{ background: "linear-gradient(135deg,#e2d9ff,#a87eff 45%,#6366f1 70%,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Perfect AI Tool
            </span>
            <br />
            <span className="text-zinc-300">for Every Workflow</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop guessing. Browse expert-reviewed AI tools with honest ratings, side-by-side comparisons, and use-case-specific scores — all in one place.
          </p>

          {/* Client search bar */}
          <HeroSearch />

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity text-base">
              Browse All Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/compare" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-zinc-300 font-semibold hover:bg-white/[0.08] hover:text-white transition-all text-base">
              Compare Tools
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ STATS ══════════════════════════════ */}
      <section className="border-y border-white/[0.06] py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-6 py-3">
              <div className="font-extrabold text-3xl md:text-4xl mb-1" style={{ background: "linear-gradient(135deg,#e2d9ff,#a87eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {s.value}
              </div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════ FEATURED TOOLS ═══════════════════════════ */}
      <section id="tools" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
                <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                <span className="text-xs font-medium text-indigo-300">Featured Tools</span>
              </div>
              <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight">Top-Rated AI Tools</h2>
              <p className="text-zinc-400 mt-2 text-sm">Independently tested. Updated daily. No sponsored rankings.</p>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors shrink-0">
              View all 2,400+ tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            /* Fallback static cards if DB not seeded yet */
            <div className="text-center py-16 border border-white/[0.06] rounded-2xl">
              <p className="text-zinc-400 text-sm mb-4">No tools in database yet.</p>
              <a href="/api/seed" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:opacity-90">
                Click to seed sample tools →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════ CATEGORIES ════════════════════════════ */}
      <section id="categories" className="py-20 border-t border-white/[0.06] bg-[#09090f] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
              <Layers className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">10 Categories</span>
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-3">Explore by Use Case</h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto">Whatever you&apos;re building, there&apos;s an AI tool designed exactly for it.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map(({ name, Icon, color, count }) => (
              <Link
                key={name}
                href={`/tools?category=${encodeURIComponent(name)}`}
                className="group flex flex-col items-center gap-3 bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-200 text-center"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">{name}</p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">{count} tools</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ WHY CHOOSE US ════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/8 blur-[120px] pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-violet-600/8 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-6">
                <Shield className="w-3 h-3 text-violet-400" />
                <span className="text-xs font-medium text-violet-300">Why Trust Us</span>
              </div>
              <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-5 leading-tight">
                The AI Tools Directory<br />
                <span style={{ background: "linear-gradient(135deg,#e2d9ff,#a87eff 45%,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  You Can Actually Trust
                </span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm mb-8">The AI landscape is noisy. We cut through marketing fluff with rigorous, hands-on testing and data-driven ratings you can rely on for real decisions.</p>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                Our review methodology <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_ITEMS.map(({ Icon, color, title, desc }) => (
                <div key={title} className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon className="w-[18px] h-[18px]" style={{ color }} />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2">{title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ═════════════════════════════ */}
      <section className="py-20 border-t border-white/[0.06] bg-[#09090f] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-3 py-1 mb-4">
              <Globe className="w-3 h-3 text-rose-400" />
              <span className="text-xs font-medium text-rose-300">Loved by Thousands</span>
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-3">What Professionals Say</h2>
            <p className="text-zinc-400 text-sm">From engineers to founders — here&apos;s who trusts AIToolsHub.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-5 hover:border-white/[0.12] transition-colors">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{t.name}</p>
                      <p className="text-[11px] text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                  <Stars n={5} />
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">&quot;{t.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ PRICING ════════════════════════════════ */}
      <section id="pricing" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/8 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
              <Zap className="w-3 h-3 text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">Simple Pricing</span>
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-3">Start Free. Scale as You Grow.</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">No hidden fees. Cancel anytime. 14-day free trial on Pro.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 transition-all ${
                  plan.popular
                    ? "bg-gradient-to-b from-indigo-600/20 to-violet-600/10 border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/10 md:scale-[1.03]"
                    : "bg-[#0d0d14] border border-white/[0.07] hover:border-white/[0.12]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/30 whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-zinc-500">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-4xl text-white">{plan.price}</span>
                  <span className="text-sm text-zinc-500">{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${plan.color}20` }}>
                        <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                      </div>
                      <span className="text-xs text-zinc-400">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90"
                      : "border border-white/[0.1] bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════ NEWSLETTER ══════════════════════════════ */}
      <section id="newsletter" className="py-16 border-t border-white/[0.06] px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Search className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-3">Stay Ahead of the Curve</h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
            Weekly roundup of the best new AI tools, model updates, and pricing changes — straight to your inbox. No spam, ever.
          </p>
          <NewsletterForm />
          <p className="text-[11px] text-zinc-600 mt-4">Join 18,000+ AI enthusiasts. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  );
}
