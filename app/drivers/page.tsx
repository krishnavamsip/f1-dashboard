import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { DRIVERS, getTeam } from "@/lib/f1-data";
import Link from "next/link";

export default function DriversPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-display text-[32px] font-bold mb-6">Drivers • 2025</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DRIVERS.map(d=>{
          const t = getTeam(d.teamId);
          return (
            <Link key={d.id} href={`/drivers/${d.id}`}>
              <GlassCard className="hover:border-white/20 transition h-full">
                <div className="flex items-center justify-between">
                  <div className="text-mono text-3xl font-bold" style={{color: t.color}}>{d.number}</div>
                  <div className="text-[11px] text-zinc-400">{d.nationality}</div>
                </div>
                <div className="mt-3 text-lg font-semibold text-display">{d.firstName}<br/>{d.lastName.toUpperCase()}</div>
                <div className="text-sm text-zinc-400 mt-1" style={{color:t.color}}>{t.logoText}</div>
                <div className="flex gap-4 text-[11px] text-zinc-400 mt-4">
                  <div><b className="text-white">{d.wins}</b><br/>Wins</div>
                  <div><b className="text-white">{d.podiums}</b><br/>Podiums</div>
                  <div><b className="text-white">{d.poles}</b><br/>Poles</div>
                </div>
              </GlassCard>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
