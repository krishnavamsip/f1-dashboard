import { cn } from "@/lib/utils";
import React from "react";

export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass rounded-[24px] p-5 md:p-6 relative noise", className)} {...props}>
      {children}
    </div>
  )
}

export function SectionHeader({ eyebrow, title, right }: {eyebrow?: string, title: string, right?: React.ReactNode}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        {eyebrow && <div className="text-[11px] uppercase tracking-widest text-zinc-400">{eyebrow}</div>}
        <h3 className="text-display text-[18px] md:text-[20px] font-semibold">{title}</h3>
      </div>
      {right}
    </div>
  )
}
