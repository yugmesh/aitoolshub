"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn("google"); // 🔥 REAL AUTH
  }

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-[17px] text-white">AIToolsHub</span>
          </Link>

          <h1 className="font-extrabold text-2xl text-white mb-1">
            Welcome back
          </h1>
          <p className="text-zinc-400 text-sm">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4"
        >
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#070709] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#070709] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          <button
  type="button"
  onClick={() => signIn("google")}
  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
>
  Continue with Google 🚀
</button>
          <p className="text-center text-xs text-zinc-500">
            Login via Google authentication.{" "}
            <Link
              href="/"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Go home →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}