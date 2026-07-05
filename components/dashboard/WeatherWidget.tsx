"use client";
import { useEffect, useState } from "react";
import { CloudSun } from "lucide-react";

export function WeatherWidget({ lat=25.49, lon=51.454, label="Lusail"}: {lat?:number, lon?:number, label?:string}) {
  const [w, setW] = useState<any>(null);
  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,precipitation_probability_max&timezone=auto`)
      .then(r=>r.json()).then(setW).catch(()=>{});
  }, [lat, lon]);
  const temp = w?.current?.temperature_2m ?? 28;
  const wind = w?.current?.wind_speed_10m ?? 8;
  const rain = w?.daily?.precipitation_probability_max?.[0] ?? 0;
  return (
    <div>
      <div className="flex items-center gap-3">
        <CloudSun className="text-zinc-300" />
        <div>
          <div className="font-semibold">{label} • {Math.round(temp)}°C Clear</div>
          <div className="text-xs text-zinc-400">Wind {Math.round(wind)} km/h • Rain {rain}%</div>
        </div>
      </div>
      <div className="flex gap-2 mt-3 text-[11px] flex-wrap">
        {(w?.daily?.temperature_2m_max || [29,27,27]).slice(0,3).map((t:number,i:number)=>(
          <span key={i} className="glass px-2 py-1 rounded-full">
            {["FP","Quali","Race"][i]} {Math.round(t)}°
          </span>
        ))}
      </div>
      <div className="text-[10px] text-zinc-500 mt-2">Open-Meteo – free, no key</div>
    </div>
  )
}
