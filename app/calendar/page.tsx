import { GlassCard, SectionHeader } from "@/components/ui/Card";

export default function CalendarPage(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-display text-[32px] font-bold">Qatar Grand Prix • Race Weekend</h1>
      <p className="text-zinc-400">Lusail International Circuit • Dec 1, 2025</p>
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Circuit Map" />
          <div className="aspect-[16/9] rounded-2xl bg-black/30 border border-white/[0.08] relative overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 600 360" className="w-[90%] opacity-90">
              <path d="M120,260 C80,180 140,80 250,100 C340,115 380,60 460,110 C520,150 520,240 440,270 C360,300 280,310 200,285 Z" fill="none" stroke="#E10600" strokeWidth="14"/>
            </svg>
            <div className="absolute bottom-3 left-3 text-xs glass rounded-full px-3 py-1">DRS 1 • 2 • 3</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4 text-zinc-300">
            <div>Length<br/><b className="text-white">5.419 km</b></div>
            <div>Laps<br/><b className="text-white">57</b></div>
            <div>Distance<br/><b className="text-white">308.6 km</b></div>
            <div>Lap Record<br/><b className="text-white">1:24.319</b></div>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Weekend Schedule" eyebrow="AST • UTC+3"/>
          <ul className="text-sm space-y-2 text-zinc-300">
            <li><b>Fri</b> Practice 1 — 13:30</li>
            <li><b>Fri</b> Sprint Shootout — 17:30</li>
            <li><b>Sat</b> Sprint — 15:00</li>
            <li><b>Sat</b> Qualifying — 19:00</li>
            <li><b>Sun</b> Race — 18:00</li>
          </ul>
          <div className="mt-4 text-xs text-zinc-400">Compounds: C2 • C3 • C4<br/>Overtaking zones: T1, T6, T12</div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Weather Forecast"/>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>Fri – 29° Clear</li>
            <li>Sat – 27° Clear</li>
            <li>Sun – 27° Clear • 0% Rain</li>
          </ul>
        </GlassCard>
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Circuit History"/>
          <div className="text-sm text-zinc-300">Previous winners: Verstappen (2023), Hamilton (2021). High-speed flowing layout, abrasive surface, strong tyre degradation. </div>
        </GlassCard>
      </div>
    </div>
  )
}
