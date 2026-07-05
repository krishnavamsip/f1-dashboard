import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { TEAMS, DRIVERS } from "@/lib/f1-data";
import Link from "next/link";

export default function TeamsPage(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-display text-[32px] font-bold mb-6">Teams • 2025</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEAMS.map(t=>{
          const ds = DRIVERS.filter(d=>d.teamId===t.id);
          return (
            <Link key={t.id} href={`/teams/${t.id}`}>
              <GlassCard className="hover:border-white/20 transition">
                <div className="flex items-center justify-between">
                  <div className="text-display text-xl font-bold">{t.logoText}</div>
                  <div className="w-12 h-[4px] rounded-full" style={{background:t.color}}/>
                </div>
                <div className="text-sm text-zinc-400 mt-1">{t.name}</div>
                <div className="text-sm mt-4 text-zinc-300">Drivers: {ds.map(d=>d.code).join(" • ")}</div>
                <div className="text-xs text-zinc-500 mt-2">{t.engine} • {t.principal}</div>
                <div className="text-mono text-lg mt-3">{t.points} pts</div>
              </GlassCard>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
