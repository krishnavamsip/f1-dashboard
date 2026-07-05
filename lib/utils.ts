import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatGap = (ms: number) => {
  if (ms < 1000) return `+${(ms/1000).toFixed(3)}`
  return `+${(ms/1000).toFixed(3)}s`
}
