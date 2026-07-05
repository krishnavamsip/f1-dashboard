"use client";
import { useEffect, useState } from "react";

type NewsItem = { title: string; link: string; pubDate: string };

export function NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  useEffect(() => {
    fetch("/api/news").then(r=>r.json()).then(j=>setItems(j.items?.slice(0,4) ?? [])).catch(()=>{});
  }, []);
  if (!items.length) {
    // fallback skeleton
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1,2,3,4].map(i=>(
          <div key={i} className="rounded-2xl border border-white/[0.06] p-4 bg-white/[0.02] animate-pulse h-20" />
        ))}
      </div>
    )
  }
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((n, i)=>(
        <a key={i} href={n.link} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/[0.06] p-4 bg-white/[0.02] hover:bg-white/[0.04] transition block">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400">{new Date(n.pubDate).toLocaleDateString()} • PlanetF1 / BBC</div>
          <div className="font-medium mt-1">{n.title}</div>
        </a>
      ))}
    </div>
  )
}
