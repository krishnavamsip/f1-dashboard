"use client";
import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { DRIVERS } from "@/lib/f1-data";
import { useState } from "react";
import { RadarChart, Radar, PolarAngleAxis, PolarGrid, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ComparePage(){
  const [a, setA] = useState("verstappen");
  const [b, setB] = useState("norris");
  const da = DRIVERS.find(d=>d.id===a)!;
  const db = DRIVERS.find(d=>d.id===b)!;

  const radar = [
    { stat:"Quali", A:93, B:89 },
    { stat:"Race", A:95, B:91 },
    { stat:"Overtakes", A:82, B:86 },
    { stat:"Tyres", A:90, B:84 },
    { stat:"Consistency", A:94, B:88 },
    { stat:"Wet", A:88, B:85 },
  ];
  const bars = [
    {name:"Wins", A: da.wins, B: db.wins},
    {name:"Podiums", A: da.podiums, B: db.podiums},
    {name:"Poles", A: da.poles, B: db.poles},
  ];

  const Select = ({value, onChange}:{value:string,onChange:(v:string)=>void}) => (
    <select value={value} onChange={e=>onChange(e.target.value)} className="glass rounded-xl px-3 py-2 bg-transparent text-sm">
      {DRIVERS.map(d=><option key={d.id} value={d.id} className="bg-[#15151E]">{d.code} – {d.lastName}</option>)}
    </select>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-display text-[32px] font-bold">Driver Comparison</h1>
        <div className="flex gap-3">
          <Select value={a} onChange={setA}/>
          <span className="text-zinc-500 pt-2">vs</span>
          <Select value={b} onChange={setB}/>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeader title="Head-to-Head Radar"/>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="#333"/>
                <PolarAngleAxis dataKey="stat" tick={{fill:"#aaa", fontSize:12}}/>
                <Radar dataKey="A" stroke="#E10600" fill="#E10600" fillOpacity={0.25}/>
                <Radar dataKey="B" stroke="#FF8000" fill="#FF8000" fillOpacity={0.25}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-zinc-400">{da.code} red • {db.code} orange</div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Career Totals"/>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <XAxis dataKey="name" stroke="#888"/>
                <YAxis stroke="#888"/>
                <Tooltip contentStyle={{background:"#15151E", border:"1px solid #333", borderRadius:12}}/>
                <Bar dataKey="A" fill="#E10600" radius={[6,6,0,0]}/>
                <Bar dataKey="B" fill="#FF8000" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="grid md:grid-cols-6 gap-4 text-sm">
          {[
            ["Quali H2H", "15-7", "11-11"],
            ["Race H2H", "14-6", "9-13"],
            ["Avg Finish", "3.1", "3.9"],
            ["Points", "393", "324"],
            ["Fastest Laps", "5", "6"],
            ["Consistency", "92", "87"],
          ].map(([k,av,bv])=>(
            <div key={k as string} className="glass rounded-2xl px-4 py-3 text-center">
              <div className="text-[11px] text-zinc-400">{k}</div>
              <div className="text-display">{av} <span className="text-zinc-500">|</span> {bv}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
