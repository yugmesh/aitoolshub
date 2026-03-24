"use client";

import { useState, useMemo, useRef } from "react";

/* ─────────────────────────── TYPES ─────────────────────────── */
type PricingType = "Free" | "Freemium" | "Paid" | "Open Source";
type Category =
  | "All"
  | "Chatbot / LLM"
  | "Image Generation"
  | "Code Assistant"
  | "AI Search"
  | "Video Generation"
  | "Audio / Music"
  | "Writing"
  | "Productivity";

interface AITool {
  id: string;
  name: string;
  emoji: string;
  category: Exclude<Category, "All">;
  tagline: string;
  description: string;
  pricing: PricingType;
  pricingDetail: string;
  monthlyPrice: number | null;
  rating: number;
  reviews: number;
  website: string;
  accentColor: string;
  badge?: string;
  features: {
    "Web Search": boolean;
    "Image Generation": boolean;
    "Code Execution": boolean;
    "File Upload": boolean;
    "API Access": boolean;
    "Voice Mode": boolean;
    "Mobile App": boolean;
    "Browser Extension": boolean;
    "Offline Mode": boolean;
    "Team / Collab": boolean;
    "Custom Instructions": boolean;
    "Context Window": string;
  };
  pros: string[];
  cons: string[];
  useCases: string[];
  speed: number;
  accuracy: number;
  creativity: number;
  easeOfUse: number;
}

/* ─────────────────────────── DATA ─────────────────────────── */
const TOOLS: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    emoji: "🤖",
    category: "Chatbot / LLM",
    tagline: "The world's most popular AI assistant",
    description: "OpenAI's flagship product. GPT-4o powers real-time vision, voice, and reasoning across millions of tasks daily.",
    pricing: "Freemium",
    pricingDetail: "Free tier available · Plus $20/mo · Team $25/mo",
    monthlyPrice: 20,
    rating: 4.8,
    reviews: 182400,
    website: "https://chat.openai.com",
    accentColor: "#10a37f",
    badge: "Most Popular",
    features: {
      "Web Search": true, "Image Generation": true, "Code Execution": true,
      "File Upload": true, "API Access": true, "Voice Mode": true,
      "Mobile App": true, "Browser Extension": true, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": true, "Context Window": "128K tokens",
    },
    pros: ["Largest ecosystem", "GPTs marketplace", "Best overall capability", "Constant updates"],
    cons: ["Paid for GPT-4", "Peak-hour slowdowns", "Privacy concerns"],
    useCases: ["Writing", "Coding", "Research", "Customer support", "Education"],
    speed: 4, accuracy: 5, creativity: 5, easeOfUse: 5,
  },
  {
    id: "claude",
    name: "Claude",
    emoji: "✦",
    category: "Chatbot / LLM",
    tagline: "Constitutional AI built for safety & nuance",
    description: "Anthropic's Claude excels at long documents, nuanced writing, and complex reasoning with industry-leading context.",
    pricing: "Freemium",
    pricingDetail: "Free tier available · Pro $20/mo · Team $25/mo",
    monthlyPrice: 20,
    rating: 4.7,
    reviews: 61300,
    website: "https://claude.ai",
    accentColor: "#c96442",
    badge: "Best for Writing",
    features: {
      "Web Search": true, "Image Generation": false, "Code Execution": true,
      "File Upload": true, "API Access": true, "Voice Mode": false,
      "Mobile App": true, "Browser Extension": false, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": true, "Context Window": "200K tokens",
    },
    pros: ["200K context window", "Exceptional writing quality", "Honest & nuanced", "Great for docs"],
    cons: ["No image generation", "No voice mode", "Fewer integrations"],
    useCases: ["Long documents", "Legal drafting", "Code review", "Research analysis"],
    speed: 4, accuracy: 5, creativity: 4, easeOfUse: 5,
  },
  {
    id: "gemini",
    name: "Gemini",
    emoji: "♊",
    category: "Chatbot / LLM",
    tagline: "Google's multimodal AI with 1M token context",
    description: "Deep Google integration, real-time search, and the largest publicly available context window make Gemini unique.",
    pricing: "Freemium",
    pricingDetail: "Free tier · Advanced $19.99/mo",
    monthlyPrice: 20,
    rating: 4.5,
    reviews: 79100,
    website: "https://gemini.google.com",
    accentColor: "#4285f4",
    features: {
      "Web Search": true, "Image Generation": true, "Code Execution": true,
      "File Upload": true, "API Access": true, "Voice Mode": true,
      "Mobile App": true, "Browser Extension": false, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": false, "Context Window": "1M tokens",
    },
    pros: ["1M token context", "Real-time Google data", "Deep Google Workspace sync", "Multimodal"],
    cons: ["Inconsistent creativity", "Less personality", "Privacy (Google)"],
    useCases: ["Research", "Email drafting", "Google Workspace", "Data analysis"],
    speed: 5, accuracy: 4, creativity: 3, easeOfUse: 5,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    emoji: "🎨",
    category: "Image Generation",
    tagline: "The gold standard for AI art generation",
    description: "Midjourney produces breathtaking, photorealistic and artistic images from text prompts with unmatched aesthetic quality.",
    pricing: "Paid",
    pricingDetail: "Basic $10/mo · Standard $30/mo · Pro $60/mo",
    monthlyPrice: 10,
    rating: 4.9,
    reviews: 103000,
    website: "https://midjourney.com",
    accentColor: "#7c5cbf",
    badge: "Best Images",
    features: {
      "Web Search": false, "Image Generation": true, "Code Execution": false,
      "File Upload": true, "API Access": false, "Voice Mode": false,
      "Mobile App": false, "Browser Extension": false, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": true, "Context Window": "N/A",
    },
    pros: ["Unmatched image quality", "Diverse artistic styles", "Active community", "Style consistency"],
    cons: ["No free tier", "Discord-only interface", "No public API"],
    useCases: ["Art creation", "Marketing", "Concept art", "Brand visuals"],
    speed: 3, accuracy: 5, creativity: 5, easeOfUse: 3,
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    emoji: "🔍",
    category: "AI Search",
    tagline: "AI answer engine with cited real-time sources",
    description: "Perplexity combines LLM intelligence with live web search to deliver cited, accurate answers instantly.",
    pricing: "Freemium",
    pricingDetail: "Free tier · Pro $20/mo",
    monthlyPrice: 20,
    rating: 4.6,
    reviews: 41700,
    website: "https://perplexity.ai",
    accentColor: "#20b8cd",
    features: {
      "Web Search": true, "Image Generation": true, "Code Execution": false,
      "File Upload": true, "API Access": true, "Voice Mode": false,
      "Mobile App": true, "Browser Extension": true, "Offline Mode": false,
      "Team / Collab": false, "Custom Instructions": false, "Context Window": "32K tokens",
    },
    pros: ["Real-time web search", "Always cited sources", "Fast research", "Clean UI"],
    cons: ["Less creative", "Short responses", "Limited conversation memory"],
    useCases: ["Research", "Fact checking", "News", "Quick answers"],
    speed: 5, accuracy: 5, creativity: 2, easeOfUse: 5,
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    emoji: "👾",
    category: "Code Assistant",
    tagline: "AI pair programmer for every developer",
    description: "Trained on billions of lines of code, Copilot autocompletes, explains, and refactors code right inside your IDE.",
    pricing: "Freemium",
    pricingDetail: "Free (limited) · Pro $10/mo · Business $19/mo",
    monthlyPrice: 10,
    rating: 4.7,
    reviews: 67200,
    website: "https://github.com/features/copilot",
    accentColor: "#238636",
    badge: "Best for Devs",
    features: {
      "Web Search": false, "Image Generation": false, "Code Execution": true,
      "File Upload": false, "API Access": true, "Voice Mode": false,
      "Mobile App": false, "Browser Extension": true, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": true, "Context Window": "64K tokens",
    },
    pros: ["IDE-native experience", "Multi-language support", "Test generation", "Code explanation"],
    cons: ["Code-only", "Requires IDE plugin", "Privacy with proprietary code"],
    useCases: ["Code completion", "Debugging", "Test writing", "Code review"],
    speed: 5, accuracy: 4, creativity: 3, easeOfUse: 4,
  },
  {
    id: "suno",
    name: "Suno AI",
    emoji: "🎵",
    category: "Audio / Music",
    tagline: "Create full songs from a text prompt",
    description: "Suno generates complete, radio-quality music tracks with vocals and instrumentation from simple text descriptions.",
    pricing: "Freemium",
    pricingDetail: "Free (10 songs/day) · Pro $8/mo · Premier $24/mo",
    monthlyPrice: 8,
    rating: 4.5,
    reviews: 28400,
    website: "https://suno.ai",
    accentColor: "#f59e0b",
    badge: "Best Music AI",
    features: {
      "Web Search": false, "Image Generation": false, "Code Execution": false,
      "File Upload": false, "API Access": false, "Voice Mode": false,
      "Mobile App": true, "Browser Extension": false, "Offline Mode": false,
      "Team / Collab": false, "Custom Instructions": true, "Context Window": "N/A",
    },
    pros: ["Full song generation", "Multiple genres", "Vocal quality", "Free tier generous"],
    cons: ["No API", "Limited control", "Copyright ambiguity"],
    useCases: ["Music creation", "Jingles", "Podcasts", "Content creation"],
    speed: 4, accuracy: 4, creativity: 5, easeOfUse: 5,
  },
  {
    id: "runway",
    name: "Runway ML",
    emoji: "🎬",
    category: "Video Generation",
    tagline: "AI-powered video generation and editing",
    description: "Runway's Gen-3 model creates stunning videos from text or images, plus professional editing tools for creators.",
    pricing: "Freemium",
    pricingDetail: "Free (125 credits) · Standard $15/mo · Pro $35/mo",
    monthlyPrice: 15,
    rating: 4.4,
    reviews: 19600,
    website: "https://runwayml.com",
    accentColor: "#ec4899",
    features: {
      "Web Search": false, "Image Generation": true, "Code Execution": false,
      "File Upload": true, "API Access": true, "Voice Mode": false,
      "Mobile App": true, "Browser Extension": false, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": false, "Context Window": "N/A",
    },
    pros: ["Industry-leading video AI", "Text-to-video", "Professional editing suite", "API available"],
    cons: ["Credits run out fast", "Expensive at scale", "Learning curve"],
    useCases: ["Video content", "Film production", "Social media", "Ads"],
    speed: 3, accuracy: 4, creativity: 5, easeOfUse: 3,
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    emoji: "📝",
    category: "Productivity",
    tagline: "AI built into your workspace",
    description: "Notion AI enhances your existing notes and docs with writing, summarization, translation, and Q&A — all in-context.",
    pricing: "Paid",
    pricingDetail: "Add-on $10/mo (requires Notion plan)",
    monthlyPrice: 10,
    rating: 4.3,
    reviews: 33800,
    website: "https://notion.so/product/ai",
    accentColor: "#64748b",
    features: {
      "Web Search": false, "Image Generation": false, "Code Execution": false,
      "File Upload": true, "API Access": true, "Voice Mode": false,
      "Mobile App": true, "Browser Extension": false, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": false, "Context Window": "32K tokens",
    },
    pros: ["Seamless Notion integration", "Workspace-aware", "Team collaboration", "Summarization"],
    cons: ["Requires Notion", "Not a standalone AI", "Limited creativity"],
    useCases: ["Note-taking", "Meeting summaries", "Content planning", "Team docs"],
    speed: 4, accuracy: 4, creativity: 3, easeOfUse: 5,
  },
  {
    id: "jasper",
    name: "Jasper AI",
    emoji: "✍️",
    category: "Writing",
    tagline: "AI content platform for marketing teams",
    description: "Jasper specializes in brand-consistent marketing copy — blogs, ads, emails, and social — with team workflows built in.",
    pricing: "Paid",
    pricingDetail: "Creator $49/mo · Pro $69/mo · Business custom",
    monthlyPrice: 49,
    rating: 4.3,
    reviews: 24100,
    website: "https://jasper.ai",
    accentColor: "#f97316",
    features: {
      "Web Search": true, "Image Generation": true, "Code Execution": false,
      "File Upload": true, "API Access": true, "Voice Mode": false,
      "Mobile App": false, "Browser Extension": true, "Offline Mode": false,
      "Team / Collab": true, "Custom Instructions": true, "Context Window": "32K tokens",
    },
    pros: ["Marketing-focused templates", "Brand voice training", "Team workflows", "SEO integration"],
    cons: ["Expensive", "No free tier", "Generic output sometimes"],
    useCases: ["Blog posts", "Ad copy", "Email marketing", "Social content"],
    speed: 4, accuracy: 4, creativity: 4, easeOfUse: 4,
  },
];

const CATEGORIES: Category[] = [
  "All", "Chatbot / LLM", "Image Generation", "Code Assistant",
  "AI Search", "Video Generation", "Audio / Music", "Writing", "Productivity",
];

const FEATURE_KEYS = [
  "Web Search", "Image Generation", "Code Execution", "File Upload",
  "API Access", "Voice Mode", "Mobile App", "Browser Extension",
  "Offline Mode", "Team / Collab", "Custom Instructions", "Context Window",
] as const;

/* ─────────────────────────── SUB COMPONENTS ─────────────────────────── */
function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: size, color: s <= Math.floor(rating) ? "#fbbf24" : "#2d2d50" }}>★</span>
      ))}
      <span style={{ fontSize: size - 1, color: "#7c7ca0", marginLeft: 4, fontWeight: 600 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

function PriceBadge({ type }: { type: PricingType }) {
  const map: Record<PricingType, { bg: string; color: string }> = {
    Free: { bg: "rgba(74,222,128,0.1)", color: "#4ade80" },
    Freemium: { bg: "rgba(96,165,250,0.1)", color: "#60a5fa" },
    Paid: { bg: "rgba(251,113,133,0.1)", color: "#fb7185" },
    "Open Source": { bg: "rgba(192,132,252,0.1)", color: "#c084fc" },
  };
  const s = map[type];
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}40`, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
      {type}
    </span>
  );
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${(value / 5) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: 999 }} />
      </div>
      <span style={{ fontSize: 11, color: "#7c7ca0", minWidth: 20, textAlign: "right" }}>{value}/5</span>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function ComparePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [selected, setSelected] = useState<string[]>(["chatgpt", "claude", "gemini"]);
  const [tab, setTab] = useState<"overview" | "features" | "scores" | "pricing">("overview");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "name">("rating");
  const tableRef = useRef<HTMLDivElement>(null);

  const C = {
    bg: "#07071a",
    surface: "#0e0e2a",
    card: "#11112e",
    border: "rgba(139,92,246,0.15)",
    text: "#e2e8ff",
    muted: "#6b6b9a",
    grad: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
  };

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      const catOk = category === "All" || t.category === category;
      const srchOk = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
      return catOk && srchOk;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0);
      return a.name.localeCompare(b.name);
    });
  }, [search, category, sortBy]);

  const comparingTools = useMemo(() => TOOLS.filter((t) => selected.includes(t.id)), [selected]);
  const toggle = (id: string) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:#6366f144;color:#c4b5fd;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:#0e0e2a;}
        ::-webkit-scrollbar-thumb{background:#3d2e6b;border-radius:3px;}
        .tcard{transition:all .2s;}
        .tcard:hover{transform:translateY(-3px);}
        .vbtn{transition:all .2s;}
        .vbtn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(139,92,246,.45)!important;}
        .xbtn{transition:all .15s;}
        .xbtn:hover{background:rgba(239,68,68,.18)!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .fu{animation:fadeUp .4s ease both;}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        .sh{background:linear-gradient(90deg,#818cf8,#c084fc,#38bdf8,#818cf8);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
        @media(max-width:768px){.h1{font-size:28px!important;}.og{grid-template-columns:1fr!important;}}
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", color: C.text }}>

        {/* ══ HERO ══ */}
        <div style={{ position: "relative", overflow: "hidden", padding: "72px 24px 60px", textAlign: "center" }}>
          {/* Orbs */}
          {[{ t: "-80px", l: "8%", s: 420, c: "#6366f1" }, { t: "30px", r: "6%", s: 320, c: "#8b5cf6" }, { b: "-50px", l: "38%", s: 360, c: "#3b82f6" }].map((o, i) => (
            <div key={i} style={{ position: "absolute", width: (o as {s:number}).s, height: (o as {s:number}).s, borderRadius: "50%", background: `radial-gradient(circle,${(o as {c:string}).c}22,transparent 70%)`, top: (o as {t?:string}).t, left: (o as {l?:string}).l, right: (o as {r?:string}).r, bottom: (o as {b?:string}).b, pointerEvents: "none", filter: "blur(24px)" }} />
          ))}
          {/* Grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
            <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.3)", borderRadius: 999, padding: "5px 18px", fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 28 }}>
              <span style={{ fontSize: 15 }}>⚡</span> AI Tools Hub — Compare
            </div>

            <h1 className="h1 sh fu" style={{ fontSize: "clamp(32px,5vw,58px)", fontFamily: "'Syne',sans-serif", fontWeight: 800, lineHeight: 1.08, marginBottom: 20, animationDelay: ".05s" }}>
              Compare AI Tools<br />Side by Side
            </h1>

            <p className="fu" style={{ fontSize: 17, color: C.muted, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.65, animationDelay: ".1s" }}>
              Instantly compare features, pricing, ratings, and performance of the world's top AI tools — all in one place.
            </p>

            <div className="fu" style={{ display: "flex", gap: 44, justifyContent: "center", flexWrap: "wrap", animationDelay: ".15s" }}>
              {[{ n: `${TOOLS.length}`, l: "Tools Listed" }, { n: "8", l: "Categories" }, { n: "100%", l: "Free to Use" }].map(({ n, l }) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
                  <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CONTENT ══ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 100px" }}>

          {/* ── FILTER BAR ── */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: "18px 22px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <div style={{ position: "relative", flex: "1 1 240px" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none", color: C.muted }}>🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search AI tools..." style={{ width: "100%", padding: "10px 16px 10px 40px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, color: C.text, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} style={{ padding: "10px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, color: C.text, fontSize: 13, fontWeight: 600, outline: "none", cursor: "pointer", fontFamily: "inherit" }}>
              <option value="rating">Sort: Top Rated</option>
              <option value="price">Sort: Price ↑</option>
              <option value="name">Sort: A–Z</option>
            </select>
            {selected.length >= 2 && (
              <button onClick={() => tableRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "10px 22px", background: C.grad, border: "none", borderRadius: 11, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                Compare {selected.length} Tools ↓
              </button>
            )}
          </div>

          {/* ── CATEGORY PILLS ── */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {CATEGORIES.map((c) => {
              const a = category === c;
              return (
                <button key={c} onClick={() => setCategory(c)} style={{ padding: "7px 16px", borderRadius: 999, border: a ? "1px solid rgba(139,92,246,.7)" : "1px solid rgba(139,92,246,.15)", background: a ? "rgba(139,92,246,.18)" : "transparent", color: a ? "#c4b5fd" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                  {c}
                </button>
              );
            })}
          </div>

          {/* ── TOOL PICKER ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Select Tools to Compare</p>
            <span style={{ fontSize: 11, color: C.muted }}>{selected.length} selected · {filtered.length} shown</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 12, marginBottom: 52 }}>
            {filtered.map((tool) => {
              const isSel = selected.includes(tool.id);
              return (
                <div key={tool.id} className="tcard" onClick={() => toggle(tool.id)} style={{ position: "relative", background: isSel ? `linear-gradient(145deg,${tool.accentColor}18,${C.card})` : C.card, border: isSel ? `1px solid ${tool.accentColor}66` : `1px solid ${C.border}`, borderRadius: 16, padding: "18px 16px", cursor: "pointer", boxShadow: isSel ? `0 0 0 1px ${tool.accentColor}20,0 8px 32px ${tool.accentColor}18` : "none" }}>
                  {tool.badge && (
                    <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 800, color: tool.accentColor, background: `${tool.accentColor}1a`, border: `1px solid ${tool.accentColor}44`, borderRadius: 999, padding: "2px 7px", letterSpacing: ".05em", textTransform: "uppercase" }}>{tool.badge}</div>
                  )}
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{tool.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: isSel ? "#e2e8ff" : "#b4b4d4", marginBottom: 3 }}>{tool.name}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 10 }}>{tool.category}</div>
                  <PriceBadge type={tool.pricing} />
                  {isSel && (
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: tool.accentColor }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: tool.accentColor, boxShadow: `0 0 6px ${tool.accentColor}`, display: "inline-block" }} />
                      In comparison
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ══ COMPARE SECTION ══ */}
          {comparingTools.length >= 2 ? (
            <div ref={tableRef}>
              {/* Tabs */}
              <div style={{ display: "flex", gap: 4, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 5, width: "fit-content", marginBottom: 28 }}>
                {([["overview", "📊 Overview"], ["features", "⚙️ Features"], ["scores", "📈 Scores"], ["pricing", "💰 Pricing"]] as const).map(([k, label]) => {
                  const a = tab === k;
                  return (
                    <button key={k} onClick={() => setTab(k)} style={{ padding: "9px 20px", borderRadius: 10, border: "none", background: a ? "rgba(139,92,246,.2)" : "transparent", color: a ? "#c4b5fd" : C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s", borderBottom: a ? "1px solid rgba(139,92,246,.5)" : "1px solid transparent" }}>
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* ── OVERVIEW ── */}
              {tab === "overview" && (
                <div className="og" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(comparingTools.length, 3)}, 1fr)`, gap: 20 }}>
                  {comparingTools.map((tool) => (
                    <div key={tool.id} style={{ background: C.card, border: `1px solid ${tool.accentColor}33`, borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: -50, right: -50, width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle,${tool.accentColor}20,transparent 70%)`, pointerEvents: "none" }} />

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 48, height: 48, borderRadius: 13, background: `${tool.accentColor}20`, border: `1px solid ${tool.accentColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{tool.emoji}</div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 17, color: "#f1f5ff", fontFamily: "'Syne',sans-serif" }}>{tool.name}</div>
                            <div style={{ fontSize: 11, color: C.muted }}>{tool.category}</div>
                          </div>
                        </div>
                        <button className="xbtn" onClick={() => toggle(tool.id)} style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid rgba(239,68,68,.3)", background: "rgba(239,68,68,.08)", color: "#ef4444", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", flexShrink: 0 }} title="Remove">×</button>
                      </div>

                      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 18 }}>{tool.description}</p>

                      <div style={{ marginBottom: 18 }}>
                        <StarRating rating={tool.rating} size={14} />
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{tool.reviews.toLocaleString()} reviews</div>
                      </div>

                      <div style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", marginBottom: 18, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                        <span style={{ fontWeight: 700, color: "#c4b5fd" }}>Pricing: </span>{tool.pricingDetail}
                      </div>

                      {/* Use cases */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Best For</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {tool.useCases.map((u) => (
                            <span key={u} style={{ fontSize: 11, background: `${tool.accentColor}15`, color: tool.accentColor, border: `1px solid ${tool.accentColor}30`, borderRadius: 6, padding: "3px 9px", fontWeight: 600 }}>{u}</span>
                          ))}
                        </div>
                      </div>

                      {/* Pros */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#4ade80", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>✓ Pros</div>
                        {tool.pros.map((p) => (
                          <div key={p} style={{ display: "flex", gap: 7, marginBottom: 6, fontSize: 12, color: "#86efac" }}>
                            <span style={{ color: "#4ade80", flexShrink: 0 }}>+</span>{p}
                          </div>
                        ))}
                      </div>

                      {/* Cons */}
                      <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#f87171", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>✕ Cons</div>
                        {tool.cons.map((c) => (
                          <div key={c} style={{ display: "flex", gap: 7, marginBottom: 6, fontSize: 12, color: "#fca5a5" }}>
                            <span style={{ color: "#ef4444", flexShrink: 0 }}>−</span>{c}
                          </div>
                        ))}
                      </div>

                      <a href={tool.website} target="_blank" rel="noopener noreferrer" className="vbtn" style={{ display: "block", padding: "12px 0", background: `linear-gradient(135deg,${tool.accentColor},${tool.accentColor}cc)`, borderRadius: 12, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none", letterSpacing: ".02em" }}>
                        Visit {tool.name} →
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* ── FEATURES ── */}
              {tab === "features" && (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                    <thead>
                      <tr style={{ background: C.surface }}>
                        <th style={{ padding: "18px 24px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: ".1em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, minWidth: 170 }}>Feature</th>
                        {comparingTools.map((tool) => (
                          <th key={tool.id} style={{ padding: "18px 20px", borderBottom: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}`, minWidth: 130 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                              <span style={{ fontSize: 20 }}>{tool.emoji}</span>
                              <span style={{ fontSize: 12, fontWeight: 800, color: tool.accentColor }}>{tool.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FEATURE_KEYS.map((feat, i) => (
                        <tr key={feat} style={{ background: i % 2 === 0 ? C.card : C.surface }}>
                          <td style={{ padding: "13px 24px", fontSize: 13, fontWeight: 600, color: "#9898c0", borderBottom: `1px solid ${C.border}` }}>{feat}</td>
                          {comparingTools.map((tool) => {
                            const val = tool.features[feat as keyof typeof tool.features];
                            return (
                              <td key={tool.id} style={{ padding: "13px 20px", textAlign: "center", borderBottom: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}` }}>
                                {typeof val === "string" ? (
                                  <span style={{ fontSize: 12, fontWeight: 700, color: "#c4b5fd" }}>{val}</span>
                                ) : val ? (
                                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(74,222,128,.12)", border: "1px solid rgba(74,222,128,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: 13, color: "#4ade80" }}>✓</div>
                                ) : (
                                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(107,114,128,.08)", border: "1px solid rgba(107,114,128,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: 12, color: "#374151" }}>✕</div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ── SCORES ── */}
              {tab === "scores" && (
                <div className="og" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(comparingTools.length, 3)}, 1fr)`, gap: 20 }}>
                  {comparingTools.map((tool) => (
                    <div key={tool.id} style={{ background: C.card, border: `1px solid ${tool.accentColor}33`, borderRadius: 20, padding: 28 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                        <span style={{ fontSize: 24 }}>{tool.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 16, color: "#f1f5ff", fontFamily: "'Syne',sans-serif" }}>{tool.name}</div>
                          <StarRating rating={tool.rating} />
                        </div>
                      </div>

                      {/* Ring */}
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                        <div style={{ width: 100, height: 100, borderRadius: "50%", background: `conic-gradient(${tool.accentColor} ${(tool.rating / 5) * 360}deg, rgba(255,255,255,.05) 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 74, height: 74, borderRadius: "50%", background: C.card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 22, fontWeight: 800, color: "#f1f5ff", fontFamily: "'Syne',sans-serif" }}>{tool.rating}</span>
                            <span style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}>OVERALL</span>
                          </div>
                        </div>
                      </div>

                      {[{ l: "Speed", v: tool.speed }, { l: "Accuracy", v: tool.accuracy }, { l: "Creativity", v: tool.creativity }, { l: "Ease of Use", v: tool.easeOfUse }].map(({ l, v }) => (
                        <div key={l} style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#9898c0", marginBottom: 6 }}>{l}</div>
                          <ScoreBar value={v} color={tool.accentColor} />
                        </div>
                      ))}

                      <div style={{ marginTop: 22, padding: "11px", background: `${tool.accentColor}10`, border: `1px solid ${tool.accentColor}25`, borderRadius: 10, fontSize: 12, color: C.muted, textAlign: "center" }}>
                        {tool.reviews.toLocaleString()} verified reviews
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PRICING ── */}
              {tab === "pricing" && (
                <div className="og" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(comparingTools.length, 3)}, 1fr)`, gap: 20 }}>
                  {comparingTools.map((tool) => (
                    <div key={tool.id} style={{ background: C.card, border: `1px solid ${tool.accentColor}33`, borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", bottom: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${tool.accentColor}18,transparent 70%)`, pointerEvents: "none" }} />

                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <span style={{ fontSize: 26 }}>{tool.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 17, color: "#f1f5ff", fontFamily: "'Syne',sans-serif" }}>{tool.name}</div>
                          <PriceBadge type={tool.pricing} />
                        </div>
                      </div>

                      <div style={{ padding: "20px", background: "rgba(255,255,255,.02)", border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 16, textAlign: "center" }}>
                        <div style={{ fontSize: 38, fontWeight: 800, color: tool.accentColor, fontFamily: "'Syne',sans-serif" }}>
                          {tool.monthlyPrice === null || tool.monthlyPrice === 0 ? "Free" : `$${tool.monthlyPrice}`}
                        </div>
                        {tool.monthlyPrice !== null && tool.monthlyPrice > 0 && (
                          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>per month (starting)</div>
                        )}
                      </div>

                      <div style={{ padding: "12px 14px", background: "rgba(255,255,255,.02)", border: `1px solid ${C.border}`, borderRadius: 11, fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 22 }}>
                        {tool.pricingDetail}
                      </div>

                      <div style={{ marginBottom: 22 }}>
                        <StarRating rating={tool.rating} size={14} />
                        <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{tool.reviews.toLocaleString()} reviews</div>
                      </div>

                      <a href={tool.website} target="_blank" rel="noopener noreferrer" className="vbtn" style={{ display: "block", padding: "13px 0", background: `linear-gradient(135deg,${tool.accentColor}ee,${tool.accentColor}aa)`, borderRadius: 12, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
                        Get Started →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "72px 24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 20 }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>⚡</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#c4b5fd", marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>Pick at least 2 tools to compare</div>
              <div style={{ fontSize: 14, color: C.muted, maxWidth: 300, margin: "0 auto" }}>Click tool cards above to add them to your comparison</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}