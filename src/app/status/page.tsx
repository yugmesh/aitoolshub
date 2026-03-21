import type { Metadata } from "next";
export const metadata: Metadata = { title: "System Status" };

const SERVICES = [
  { name: "Website",            status: "operational",  uptime: "99.98%" },
  { name: "API (Tools)",        status: "operational",  uptime: "99.95%" },
  { name: "API (Newsletter)",   status: "operational",  uptime: "99.90%" },
  { name: "Search",             status: "operational",  uptime: "99.92%" },
  { name: "Database (MongoDB)", status: "operational",  uptime: "99.99%" },
];

const INCIDENTS: { date: string; title: string; status: string; body: string }[] = [];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">🟢</div>
          <h1 className="font-extrabold text-3xl tracking-tight text-white mb-2">System Status</h1>
          <p className="text-zinc-400 text-sm">All systems are operating normally.</p>
        </div>

        {/* Services */}
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-bold text-sm text-white">Services</h2>
          </div>
          {SERVICES.map((s, i) => (
            <div key={s.name} className={`flex items-center justify-between px-6 py-4 ${i < SERVICES.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-zinc-200">{s.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500">{s.uptime} uptime</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Incidents */}
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="font-bold text-sm text-white mb-4">Recent Incidents</h2>
          {INCIDENTS.length === 0 ? (
            <p className="text-sm text-zinc-500">No incidents in the past 30 days. 🎉</p>
          ) : (
            INCIDENTS.map((inc) => (
              <div key={inc.date} className="border-b border-white/[0.05] pb-4 mb-4 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-white">{inc.title}</span>
                  <span className="text-xs text-zinc-500">{inc.date}</span>
                </div>
                <p className="text-xs text-zinc-400">{inc.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
