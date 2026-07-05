"use client";
import { TEAMS, DRIVERS } from "@/lib/f1-data";
import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useParams } from "next/navigation";

const perf = Array.from({length:12}, (_,i)=>({r:i+12, pts: 18+Math.sin(i/2)*6 + Math.random()*4}));

export default function TeamPage(){
  const params = useParams();
  const teamId = params.teamId as string;
  const t = TEAMS.find(x=>x.id===teamId) ?? TEAMS[0];
  const ds = DRIVERS.filter(d=>d.teamId===t.id);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-display text-[34px] font-bold" style={{color:t.color}}>{t.name}</h1>
          <div className="text-zinc-400 text-sm mt-1">Engine: {t.engine} • Principal: {t.principal} • TD: {t.technicalDirector}</div>
        </div>
        <div className="text-mono text-2xl">{t.points} PTS</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Performance Graph" eyebrow="Constructor points progression"/>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perf}>
                <XAxis dataKey="r" stroke="#666" fontSize={11}/>
                <YAxis stroke="#666" fontSize={11}/>
                <Tooltip contentStyle={{background:"#15151E", border:"1px solid #333", borderRadius:12}}/>
                <Line type="monotone" dataKey="pts" stroke={t.color} strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Drivers"/>
          <div className="space-y-3">
            {ds.map(d=>(
              <div key={d.id} className="flex items-center gap-3">
                <img src={d.photo} className="w-12 h-12 rounded-xl object-cover" alt=""/>
                <div><div className="font-semibold">#{d.number} {d.lastName}</div><div className="text-xs text-zinc-400">{d.wins} wins • {d.podiums} podiums</div></div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-zinc-400 grid grid-cols-2 gap-3">
            <div>Budget Cap<br/><b className="text-white">Compliant</b></div>
            <div>Reliability<br/><b className="text-white">97.2%</b></div>
            <div>Pit Avg<br/><b className="text-white">2.31s</b></div>
            <div>Podiums 2025<br/><b className="text-white">14</b></div>
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <SectionHeader title="Car"/>
        <div className="h-36 rounded-xl bg-black/30 border border-white/[0.06] flex items-center justify-center text-zinc-400">Car render placeholder – {t.logoText} 2025</div>
      </GlassCard>
    </div>
  )
}
