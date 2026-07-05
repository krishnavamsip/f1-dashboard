"use client";
import { GlassCard, SectionHeader } from "@/components/ui/Card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

const champProgression = [
  {race:"BAH", VER:25, NOR:18, LEC:15},
  {race:"SAU", VER:43, NOR:36, LEC:27},
  {race:"AUS", VER:51, NOR:54, LEC:44},
  {race:"JPN", VER:77, NOR:62, LEC:59},
  {race:"CHN", VER:100, NOR:79, LEC:71},
  {race:"MIA", VER:118, NOR:101, LEC:90},
  {race:"IMO", VER:136, NOR:119, LEC:98},
  {race:"MON", VER:146, NOR:138, LEC:124},
  {race:"CAN", VER:169, NOR:155, LEC:139},
  {race:"ESP", VER:194, NOR:176, LEC:151},
];

const winsData = [
  {name:"VER", wins:11},
  {name:"NOR", wins:4},
  {name:"LEC", wins:3},
  {name:"PIA", wins:2},
  {name:"SAI", wins:2},
  {name:"RUS", wins:1},
];

export default function StatsPage(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-display text-[32px] font-bold">Statistics • 2025</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <SectionHeader title="Championship Progression" eyebrow="Points by race"/>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={champProgression}>
                <XAxis dataKey="race" stroke="#777" fontSize={11}/>
                <YAxis stroke="#777" fontSize={11}/>
                <Tooltip contentStyle={{background:"#15151E", border:"1px solid #333", borderRadius:12}}/>
                <Legend />
                <Line type="monotone" dataKey="VER" stroke="#3671C6" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="NOR" stroke="#FF8000" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="LEC" stroke="#E10600" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Wins by Driver"/>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winsData}>
                <XAxis dataKey="name" stroke="#777" />
                <YAxis stroke="#777" />
                <Tooltip contentStyle={{background:"#15151E", border:"1px solid #333", borderRadius:12}}/>
                <Bar dataKey="wins" fill="#E10600" radius={[8,8,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Tire Strategy Usage"/>
          <div className="text-sm text-zinc-300 space-y-2">
            <div className="flex justify-between"><span>1-stop</span><b>62%</b></div>
            <div className="flex justify-between"><span>2-stop</span><b>34%</b></div>
            <div className="flex justify-between"><span>3-stop</span><b>4%</b></div>
            <div className="mt-3 text-zinc-400">Most used: Medium → Hard</div>
          </div>
        </GlassCard>
        <GlassCard>
          <SectionHeader title="Pit Stop Comparison"/>
          <div className="text-sm text-zinc-300 grid grid-cols-2 gap-2">
            <div>Red Bull<br/><b>2.18s avg</b></div>
            <div>McLaren<br/><b>2.31s avg</b></div>
            <div>Ferrari<br/><b>2.44s avg</b></div>
            <div>Mercedes<br/><b>2.39s avg</b></div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
