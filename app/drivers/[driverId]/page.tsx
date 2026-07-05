"use client";
import { DRIVERS, getTeam } from "@/lib/f1-data";
import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useParams } from "next/navigation";

const dummyRadar = [
  { stat: "Quali", v: 92 },
  { stat: "Race", v: 94 },
  { stat: "Overtake", v: 81 },
  { stat: "Tyres", v: 88 },
  { stat: "Consistency", v: 90 },
  { stat: "Wet", v: 85 },
];

export default function DriverPage() {
  const params = useParams();
  const driverId = params.driverId as string;
  const d = DRIVERS.find(x=>x.id===driverId) ?? DRIVERS[0];
  const t = getTeam(d.teamId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex flex-wrap items-start gap-6">
            <img src={d.photo} alt={d.lastName} className="w-28 h-28 rounded-2xl object-cover border border-white/10"/>
            <div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-widest">{t.name}</div>
              <h1 className="text-display text-[36px] font-bold">{d.firstName} <span style={{color:t.color}}>{d.lastName.toUpperCase()}</span></h1>
              <div className="flex gap-6 text-sm text-zinc-300 mt-2">
                <div>No. <b className="text-mono">{d.number}</b></div>
                <div>{d.nationality}</div>
                <div>Age {d.age}</div>
                <div>{d.championships}× WDC</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4 mt-6">
            {[
              ["Wins", d.wins],
              ["Podiums", d.podiums],
              ["Poles", d.poles],
              ["Avg Quali", "3.4"],
            ].map(([k,v])=>(
              <div key={k as string} className="glass rounded-2xl px-4 py-3">
                <div className="text-[11px] text-zinc-400">{k}</div>
                <div className="text-xl font-semibold text-display">{v as any}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <SectionHeader title="Season Statistics" />
            <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-300">
              <div className="space-y-2">
                <div className="flex justify-between"><span>Average race finish</span><b>3.8</b></div>
                <div className="flex justify-between"><span>Average qualifying</span><b>3.2</b></div>
                <div className="flex justify-between"><span>Points finishes</span><b>18 / 22</b></div>
                <div className="flex justify-between"><span>DNFs</span><b>1</b></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><span>Fastest laps</span><b>5</b></div>
                <div className="flex justify-between"><span>Q3 appearances</span><b>21</b></div>
                <div className="flex justify-between"><span>Head-to-head Quali</span><b>15-7</b></div>
                <div className="flex justify-between"><span>Head-to-head Race</span><b>14-6</b></div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeader title="Driver Strengths" eyebrow="Radar" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dummyRadar} outerRadius={80}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="stat" tick={{ fill: "#9ca3af", fontSize: 11 }}/>
                <Radar dataKey="v" stroke={t.color} fill={t.color} fillOpacity={0.35}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-zinc-400 mt-2">Compare any two drivers in the Compare tool.</div>
        </GlassCard>
      </div>
    </div>
  )
}
