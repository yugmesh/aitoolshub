import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PlaceholderPageProps {
  emoji: string;
  title: string;
  subtitle: string;
  sections?: { heading: string; body: string }[];
  backHref?: string;
  backLabel?: string;
}

export default function PlaceholderPage({
  emoji, title, subtitle, sections = [], backHref = "/", backLabel = "Back to Home",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>

        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-10 text-center mb-8">
          <div className="text-5xl mb-4">{emoji}</div>
          <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight text-white mb-3">{title}</h1>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">{subtitle}</p>
        </div>

        {sections.map((s) => (
          <div key={s.heading} className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-base text-white mb-2">{s.heading}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
