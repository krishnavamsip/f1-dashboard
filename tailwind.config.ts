import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: "#E10600",
          dark: "#0B0B12",
          carbon: "#15151E",
          graphite: "#1E1E29",
          silver: "#EDEDED",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.36)',
        'glow-red': '0 0 30px rgba(225, 6, 0, 0.25)',
      },
      backgroundImage: {
        'carbon-fiber': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)',
      }
    },
  },
  plugins: [],
};
export default config;
