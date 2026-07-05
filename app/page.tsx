"use client";
import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { Countdown } from "@/components/dashboard/Countdown";
import { NewsFeed } from "@/components/dashboard/NewsFeed";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { DRIVER_STANDINGS, CONSTRUCTOR_STANDINGS, DRIVERS, TEAMS, NEXT_RACE, PREV_RACE, CALENDAR_2025, getDriver, getTeam } from "@/lib/f1-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Timer, Flag, Radio } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[28px] glass-strong p-8 md:p-12 f1-grid">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-f1-red/20 blur-[120px] rounded-full"/>
        <div className="grid lg:grid-cols-[1.5fr_.9fr] gap-10 items-center relative z-10">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-zinc-400">Season 2025 • Round {NEXT_RACE.round}</div>
            <h1 className="text-display text-[44px] md:text-[62px] font-700 leading-[0.95] mt-2">
              {NEXT_RACE.name}
              <span className="block text-zinc-400 text-[26px] md:text-[30px] mt-2 font-600">{NEXT_RACE.circuit}</span>
            </h1>
            <p className="text-zinc-400 mt-4 max-w-xl">Live telemetry, championship probabilities, and AI race insights — built for real F1 fans.</p>
            <div className="mt-6">
              <Countdown targetIso={NEXT_RACE.date} />
            </div>
            <div className="flex gap-3 mt-6">
              <Link href="/live" className="bg-f1-red text-white rounded-full px-5 py-2.5 text-sm font-semibold shadow-glow-red">Open Live Race</Link>
              <Link href="/calendar" className="glass rounded-full px-5 py-2.5 text-sm">Race Weekend</Link>
            </div>
          </div>
          <GlassCard className="bg-zinc-900/30">
            <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-3">Lusail Circuit</div>
            <div className="aspect-[16/10] rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_60%)] border border-white/[0.06] relative overflow-hidden">
              {/* Simple SVG track */}
              <svg viewBox="0 0 600 380" className="absolute inset-0 w-full h-full opacity-90">
                <path d="M120,260 C80,180 140,80 250,100 C340,115 380,60 460,110 C520,150 520,240 440,270 C360,300 280,310 200,285 Z" fill="none" stroke="#E10600" strokeWidth="16" strokeLinecap="round"/>
                <path d="M120,260 C80,180 140,80 250,100 C340,115 380,60 460,110 C520,150 520,240 440,270 C360,300 280,310 200,285 Z" fill="none" stroke="#ffffff22" strokeWidth="2" strokeDasharray="6 12"/>
              </svg>
              <div className="absolute bottom-3 left-3 text-[11px] text-zinc-300 glass rounded-full px-3 py-1">DRS Zones • 3</div>
              <div className="absolute top-3 right-3 text-[11px] text-zinc-300">16 Turns</div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mt-4 text-sm">
              <div><div className="text-zinc-400 text-xs">Length</div><div className="text-mono">{NEXT_RACE.trackLength}</div></div>
              <div><div className="text-zinc-400 text-xs">Laps</div><div className="text-mono">{NEXT_RACE.laps}</div></div>
              <div><div className="text-zinc-400 text-xs">Record</div><div className="text-mono text-[12px]">1:24.319</div></div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Grid 1: Standings + Upcoming */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Driver Championship */}
        <GlassCard className="lg:col-span-1">
          <SectionHeader eyebrow="2025 Championship" title="Driver Standings" right={<Link href="/drivers" className="text-xs text-zinc-400 hover:text-white">View all →</Link>} />
          <div className="space-y-2">
            {DRIVER_STANDINGS.map((s, i) => {
              const d = getDriver(s.driverId);
              const t = getTeam(d.teamId);
              return (
                <motion.div key={s.driverId} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-white/[0.03] transition">
                  <div className="text-mono text-zinc-400 text-sm w-6">{s.pos}</div>
                  <div className="w-1 h-8 rounded-full" style={{background:t.color}} />
                  <div className="flex-1">
                    <div className="text-[13.5px]"><span className="text-zinc-400">{d.firstName}</span> <b>{d.lastName.toUpperCase()}</b></div>
                    <div className="text-[11px] text-zinc-500">{t.name.split(' ')[0]}</div>
                  </div>
                  <div className="text-mono text-sm font-semibold">{s.points}<span className="text-zinc-500 text-xs"> PTS</span></div>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
        {/* Constructor */}
        <GlassCard>
          <SectionHeader eyebrow="Constructors" title="Team Standings" />
          <div className="space-y-3">
            {CONSTRUCTOR_STANDINGS.slice(0,6).map((s) => {
              const t = getTeam(s.teamId);
              const pct = Math.round(s.points / 566 * 100);
              return (
                <div key={s.teamId}>
                  <div className="flex justify-between text-sm mb-1"><span className="font-medium">{t.logoText}</span><span className="text-mono">{s.points}</span></div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width: `${pct}%`, background: t.color}} />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
        {/* Upcoming Race Card + Weather */}
        <div className="space-y-6">
          <GlassCard>
            <SectionHeader eyebrow="Up Next" title="Qatar GP" right={<span className="text-[11px] glass rounded-full px-2 py-1">Round 23</span>} />
            <ul className="text-sm text-zinc-300 space-y-2">
              <li>Practice 1 – Fri 13:30</li>
              <li>Sprint Shootout – Fri 17:30</li>
              <li>Sprint – Sat 15:00</li>
              <li>Qualifying – Sat 19:00</li>
              <li className="text-white font-semibold">Race – Sun 18:00 AST</li>
            </ul>
            <Link href="/calendar" className="inline-block mt-4 text-xs text-f1-red">Full weekend →</Link>
          </GlassCard>
          <GlassCard>
            <WeatherWidget lat={25.49} lon={51.454} label="Lusail" />
          </GlassCard>
        </div>
      </div>

      {/* Middle strip */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {icon: <Trophy size={18}/>, label:"Pole – Las Vegas", value: getDriver(PREV_RACE.pole).code + " • 1:32.726"},
          {icon: <Timer size={18}/>, label:"Fastest Lap", value: getDriver(PREV_RACE.fastestLap.driverId).code + " • " + PREV_RACE.fastestLap.time},
          {icon: <Flag size={18}/>, label:"Driver of the Day", value: getDriver(PREV_RACE.driverOfTheDay).lastName.toUpperCase()},
          {icon: <Radio size={18}/>, label:"Race Winner", value: getDriver(PREV_RACE.winner).lastName.toUpperCase() + " • Red Bull"},
        ].map((c,i)=>(
          <GlassCard key={i} className="py-4">
            <div className="text-zinc-400 flex items-center gap-2 text-[11px]">{c.icon}{c.label}</div>
            <div className="text-display font-semibold mt-1">{c.value}</div>
          </GlassCard>
        ))}
      </div>

      {/* News + Results */}
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <SectionHeader eyebrow="Paddock Feed" title="Latest F1 News" right={<span className="text-[11px] text-zinc-500">Free RSS • /api/news</span>} />
          <NewsFeed />
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Recent Results" eyebrow="2025 Season" />
          <table className="w-full text-sm">
            <tbody>
              {CALENDAR_2025.map(r=>(
                <tr key={r.round} className="border-b border-white/[0.06] last:border-0">
                  <td className="py-2 text-zinc-500">R{r.round}</td>
                  <td className="py-2">{r.name}</td>
                  <td className="py-2 text-right text-mono">{r.winner ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-zinc-400 mt-3">Winner code • Full results in Archive</div>
        </GlassCard>
      </div>

      {/* Team marquee */}
      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-4 text-zinc-400 text-[13px] tracking-widest">
          {TEAMS.map(t=>(
            <div key={t.id} className="opacity-80 hover:opacity-100 transition" style={{color: t.color}}>
              {t.logoText}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
