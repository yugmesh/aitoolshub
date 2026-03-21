"use client";
import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [sent, setSent]     = useState(false);
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: send to API route or email service
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-5">
            <Mail className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="font-extrabold text-3xl tracking-tight text-white mb-2">Contact Us</h1>
          <p className="text-zinc-400 text-sm">Have a question, suggestion, or want to submit a tool? We&apos;d love to hear from you.</p>
        </div>

        {sent ? (
          <div className="bg-[#0d0d14] border border-emerald-500/30 rounded-2xl p-10 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="font-bold text-xl text-white mb-2">Message Sent!</h2>
            <p className="text-zinc-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-8 flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Name</label>
              <input
                required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-[#070709] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Email</label>
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#070709] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Message</label>
              <textarea
                required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help…"
                className="w-full bg-[#070709] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors resize-none"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
