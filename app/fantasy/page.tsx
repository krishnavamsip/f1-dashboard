import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { DRIVERS, getTeam } from "@/lib/f1-data";

export default function FantasyPage(){
  const picks = ["verstappen","norris","leclerc","piastri","russell"];
  const team = picks.map(id=>DRIVERS.find(d=>d.id===id)!);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-display text-[32px] font-bold">Fantasy F1 Helper</h1>
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Suggested Lineup" right={<span className="text-sm text-zinc-400">$97.4m / $100m</span>} />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {team.map(d=>{
              const t = getTeam(d.teamId);
              return (
                <div key={d.id} className="glass rounded-2xl px-4 py-3">
                  <div className="text-xs text-zinc-400">{t.logoText}</div>
                  <div className="font-semibold">{d.code} • {d.lastName}</div>
                  <div className="text-xs text-zinc-400 mt-1">${(18+Math.random()*8).toFixed(1)}m</div>
                </div>
              )
            })}
          </div>
          <div className="text-xs text-zinc-400 mt-3">Captain: VER • Turbo Driver: PIA</div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Recommendations"/>
          <ul className="text-sm text-zinc-300 space-y-2">
            <li>• Undervalued: Piastri – form +8.2</li>
            <li>• Differential: Alonso – Q pace improving</li>
            <li>• Avoid: SAI – grid penalty risk</li>
            <li>• Constructor pick: McLaren</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}
