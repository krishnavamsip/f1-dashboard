import { GlassCard, SectionHeader } from "@/components/ui/Card";

export default function ArchivePage(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-display text-[32px] font-bold">Historical Archive</h1>
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <GlassCard>
          <SectionHeader title="Champions" eyebrow="World Drivers"/>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>2024 – Verstappen</li>
            <li>2023 – Verstappen</li>
            <li>2022 – Verstappen</li>
            <li>2021 – Verstappen</li>
            <li>2020 – Hamilton</li>
            <li>2019 – Hamilton</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Records"/>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>Most wins: Hamilton – 105</li>
            <li>Most poles: Hamilton – 104</li>
            <li>Most titles: Hamilton/Schumacher – 7</li>
            <li>Win % season: Verstappen 2023 – 86%</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Iconic Races"/>
          <ul className="text-sm text-zinc-300 space-y-1">
            <li>Brazil 2008</li>
            <li>Abu Dhabi 2021</li>
            <li>Monaco 1992</li>
            <li>Japan 1989</li>
          </ul>
        </GlassCard>
      </div>
      <GlassCard className="mt-6">
        <SectionHeader title="Browse by Season"/>
        <div className="flex flex-wrap gap-2 text-sm">
          {Array.from({length: 26}, (_,i)=>2000+i).reverse().map(y=>(
            <span key={y} className="glass px-3 py-1.5 rounded-full hover:bg-white/[0.06] cursor-pointer">{y}</span>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
