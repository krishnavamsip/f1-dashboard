"use client";
import { useEffect, useState } from "react";

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(()=>setNow(Date.now()), 1000); return ()=>clearInterval(t)}, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  const Box = ({v,l}:{v:number,l:string}) => (
    <div className="glass-strong rounded-2xl px-4 py-3 text-center min-w-[82px]">
      <div className="text-mono text-2xl font-semibold">{String(v).padStart(2,'0')}</div>
      <div className="text-[10px] uppercase tracking-widest text-zinc-400">{l}</div>
    </div>
  );
  return <div className="flex flex-wrap gap-3"><Box v={d} l="Days"/><Box v={h} l="Hours"/><Box v={m} l="Mins"/><Box v={s} l="Secs"/></div>
}
