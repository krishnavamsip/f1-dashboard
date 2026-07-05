import { GlassCard, SectionHeader } from "@/components/ui/Card";

const preds = [
  { label: "Race Winner", pick: "VER", conf: 42 },
  { label: "Pole Position", pick: "NOR", conf: 36 },
  { label: "Podium", pick: "VER / NOR / LEC", conf: 58 },
  { label: "Fastest Lap", pick: "PIA", conf: 28 },
  { label: "Safety Car", pick: "Yes", conf: 31 },
  { label: "Rain", pick: "No", conf: 94 },
  { label: "Tyre Strategy", pick: "M → H", conf: 71 },
  { label: "Pit Stops (avg)", pick: "1.8", conf: 66 },
];

export default function PredictionsPage(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-display text-[32px] font-bold">Prediction Center</h1>
      <p className="text-zinc-400">AI-style race predictions • Qatar GP</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {preds.map(p=>(
          <GlassCard key={p.label}>
            <div className="text-[11px] uppercase tracking-widest text-zinc-400">{p.label}</div>
            <div className="text-display text-xl font-bold mt-1">{p.pick}</div>
            <div className="mt-3 h-2 bg-white/[0.07] rounded-full overflow-hidden">
              <div className="h-full bg-f1-red" style={{width: `${p.conf}%`}} />
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">{p.conf}% confidence</div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="mt-6">
        <SectionHeader title="AI Race Summary" eyebrow="APEX Insights"/>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
          Lusail rewards traction and high-speed stability. McLaren’s low-drag concept should be strong in S1, but Red Bull’s traction out of T12-16 gives VER the edge for race pace. Expect a Medium-Hard one-stop, with Safety Car risk at 31% due to Turn 1 incidents. Championship probability: Verstappen 78%, Norris 19%, Leclerc 3%.
        </p>
      </GlassCard>
    </div>
  )
}
