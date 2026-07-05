"use client";
import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { LIVE_LEADERBOARD, getDriver, getTeam } from "@/lib/f1-data";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tyreColor: Record<string,string> = {
  SOFT: "#FF4E4E",
  MEDIUM: "#FFD12A",
  HARD: "#F2F2F2"
};

export default function LivePage() {
  const [lap, setLap] = useState(34);
  useEffect(()=>{ const t = setInterval(()=>setLap(l=> l<57?l+1:1), 4600); return ()=>clearInterval(t)},[]);
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-zinc-400">Live • Qatar Grand Prix</div>
          <h1 className="text-display text-[28px] md:text-[34px] font-bold">Race Control</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-2 glass px-3 py-1.5 rounded-full"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>Track: GREEN</span>
          <span className="glass px-3 py-1.5 rounded-full">DRS: <b className="text-green-400">ENABLED</b></span>
          <span className="glass px-3 py-1.5 rounded-full text-mono">LAP {lap} / 57</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <SectionHeader title="Live Leaderboard" eyebrow="Timing" right={<span className="text-[11px] text-zinc-400">Auto-refresh • OpenF1</span>} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[11px] text-zinc-400 uppercase tracking-wider">
                  <tr className="border-b border-white/[0.07]">
                    <th className="text-left py-2 font-medium">Pos</th>
                    <th className="text-left py-2 font-medium">Driver</th>
                    <th className="text-left py-2 font-medium">Interval</th>
                    <th className="text-left py-2 font-medium">Tyre</th>
                    <th className="text-left py-2 font-medium">Pits</th>
                    <th className="text-left py-2 font-medium">Last</th>
                    <th className="text-left py-2 font-medium">S1 / S2 / S3</th>
                  </tr>
                </thead>
                <tbody>
                  {LIVE_LEADERBOARD.map((row, idx)=>{
                    const d = getDriver(row.driverId);
                    const t = getTeam(d.teamId);
                    return (
                      <motion.tr key={row.driverId} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: idx*0.025}}
                        className="border-b border-white/[0.05] hover:bg-white/[0.03]">
                        <td className="py-2.5 text-mono">{row.pos}</td>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-1 h-6 rounded" style={{background:t.color}}/>
                            <span className="font-semibold">{d.code}</span>
                            <span className="text-zinc-400 text-xs hidden sm:inline">{d.lastName}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-mono">{row.interval}</td>
                        <td className="py-2.5">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold text-black" style={{background: tyreColor[row.tyre]}}>{row.tyre[0]}</span>
                          <span className="ml-2 text-xs text-zinc-400">{row.tyreAge}L</span>
                        </td>
                        <td className="py-2.5 text-mono">{row.pits}</td>
                        <td className="py-2.5 text-mono text-zinc-300">{row.lastLap}</td>
                        <td className="py-2.5 text-mono text-[11px] text-zinc-400">{row.s1} • {row.s2} • {row.s3}</td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard>
              <SectionHeader title="Live Telemetry" eyebrow="VER • NOR" />
              <div className="h-36 rounded-xl bg-black/30 border border-white/[0.06] flex items-center justify-center text-zinc-400 text-sm">
                Speed / Throttle / RPM trace — hook OpenF1 car_data
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs mt-3 text-zinc-400">
                <div><div className="text-mono text-white text-lg">312</div> km/h</div>
                <div><div className="text-mono text-white text-lg">98%</div> Throttle</div>
                <div><div className="text-mono text-white text-lg">11800</div> RPM</div>
              </div>
            </GlassCard>
            <GlassCard>
              <SectionHeader title="Pit Stop Timeline" eyebrow="Strategy" />
              <div className="space-y-2 text-sm">
                {[
                  {lap:14, driver:"NOR", tyre:"HARD"},
                  {lap:18, driver:"LEC", tyre:"MEDIUM"},
                  {lap:21, driver:"VER", tyre:"HARD"},
                ].map(p=>(
                  <div key={p.lap} className="flex justify-between glass rounded-xl px-3 py-2">
                    <span>Lap {p.lap} • {p.driver}</span>
                    <span className="text-zinc-400">{p.tyre}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <SectionHeader title="Race Control" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Yellow Flags</span><span className="text-zinc-400">None</span></div>
              <div className="flex justify-between"><span>Safety Car</span><span className="text-green-400">NO</span></div>
              <div className="flex justify-between"><span>VSC</span><span className="text-green-400">NO</span></div>
              <div className="flex justify-between"><span>Track Status</span><span>GREEN</span></div>
            </div>
          </GlassCard>
          <GlassCard>
            <SectionHeader title="Fastest Laps" />
            <ol className="text-sm space-y-1 text-zinc-300">
              <li>1. NOR – 1:32.900</li>
              <li>2. VER – 1:33.041</li>
              <li>3. LEC – 1:33.198</li>
            </ol>
          </GlassCard>
          <GlassCard>
            <SectionHeader title="Weather" />
            <div className="text-sm text-zinc-300">Air 27°C • Track 34°C<br/>Wind NW 9 km/h • Rain 0%</div>
          </GlassCard>
          <GlassCard>
            <SectionHeader title="Driver Radio" eyebrow="Live transcript" />
            <div className="text-[13px] text-zinc-300 space-y-2">
              <p><b className="text-white">VER:</b> “Tyres feel good, we can push.”</p>
              <p><b className="text-white">NOR:</b> “Give me gap to Piastri please.”</p>
              <p className="text-zinc-500">— auto-transcribed</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
