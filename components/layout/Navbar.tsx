"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";
import { Sun, Moon, Search, Bell } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/live", label: "Live" },
  { href: "/drivers", label: "Drivers" },
  { href: "/teams", label: "Teams" },
  { href: "/calendar", label: "Race" },
  { href: "/stats", label: "Stats" },
  { href: "/compare", label: "Compare" },
  { href: "/predictions", label: "Predict" },
  { href: "/fantasy", label: "Fantasy" },
  { href: "/archive", label: "Archive" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0b12]/75 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-f1-red shadow-glow-red flex items-center justify-center font-display font-bold text-white">F1</div>
            <div>
              <div className="text-display font-bold tracking-tight text-[17px]">Formula1</div>
              <div className="text-[10px] -mt-1 tracking-widest text-white/45">ANALYTICS</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6 text-[13.5px] text-zinc-300">
            {nav.map(n => (
              <Link key={n.href} href={n.href}
                className={cn("transition hover:text-white", pathname === n.href ? "text-white font-semibold" : "text-zinc-400")}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 glass rounded-full px-3 py-1.5 text-[12px] text-zinc-300">
              <Search size={14}/> <span className="text-zinc-400">Search drivers…</span>
              <span className="text-[10px] text-zinc-500 ml-2">⌘K</span>
            </button>
            <button className="glass rounded-full p-2 text-zinc-300 hover:text-white transition"><Bell size={16}/></button>
            <button onClick={toggleTheme} className="glass rounded-full p-2 text-zinc-300 hover:text-white transition">
              {theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <button onClick={()=>setOpen(!open)} className="xl:hidden glass rounded-full px-3 py-2 text-xs">Menu</button>
          </div>
        </div>
        {open && (
          <div className="xl:hidden pb-4 grid grid-cols-2 gap-2 text-sm text-zinc-300">
            {nav.map(n => (
              <Link key={n.href} href={n.href} className="glass rounded-xl px-3 py-2" onClick={()=>setOpen(false)}>{n.label}</Link>
            ))}
          </div>
        )}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-f1-red to-transparent opacity-80" />
    </header>
  );
}
