"use client";
import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res  = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMsg(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle className="w-10 h-10 text-emerald-400" />
        <p className="text-sm font-semibold text-emerald-400">{msg}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs text-zinc-500 hover:text-zinc-300 underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-[#0d0d14] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        {status === "loading" ? "Subscribing…" : "Subscribe Free"}
      </button>

      {status === "error" && (
        <div className="w-full flex items-center gap-2 text-xs text-rose-400 mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {msg}
        </div>
      )}
    </form>
  );
}
