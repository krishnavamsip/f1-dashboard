# APEX • Formula 1 Analytics Dashboard

Premium, modern F1 dashboard — inspired by the official F1 site, Apple UI, and pro sports analytics tools.

Dark carbon theme, F1 red #E10600, glassmorphism, Framer Motion, Recharts.

Live: https://apex-f1 (run locally)

## Features

Home Dashboard
- Hero with current season / Round 23 Qatar GP
- Live countdown timer
- Driver Championship standings (animated)
- Constructor Championship with progress bars
- Upcoming race card + session times
- Latest F1 news feed
- Weather widget for circuit
- Fastest lap / Pole / DOTD / Winner strip
- Recent race results
- Team logos marquee
- Interactive SVG circuit map

Live Race Dashboard – /live
- Live leaderboard, intervals, tyre compound + age, pits
- Sector times, fastest laps
- Race Control: Yellow flags, SC/VSC, DRS, Track status
- Lap counter
- Live telemetry placeholder
- Pit stop timeline
- Driver radio transcript

Driver Pages – /drivers + /drivers/[id]
- Photo, team, number, nationality, age, titles
- Career wins/podiums/poles
- Season stats, average quali/finish, form
- Radar chart of strengths
- Comparison CTA

Team Pages – /teams
- Profile, drivers, engine, principal, TD
- Performance graph (Recharts)
- Budget cap, reliability, pit stop avg
- Car image placeholder

Race Weekend – /calendar
- Practice / Quali / Sprint / Race schedule
- Track map (SVG), length, laps, record
- Tyre compounds, weather forecast
- Circuit history, previous winners, overtaking zones

Statistics – /stats
- Championship progression line chart
- Wins by driver bar chart
- Tire strategy usage, pit stop comparison
- Ready for DNFs, poles, consistency, etc.

Driver Comparison – /compare
- Pick any two drivers
- Radar chart, bar graphs
- Quali/Race H2H, avg finish, points, etc.

Prediction Center – /predictions
- Winner / Podium / Pole / Safety Car / Rain / Fastest Lap / Strategy
- Confidence %
- AI race summary + championship probability

Fantasy F1 Helper – /fantasy
- Suggested lineup, budget remaining
- Captain / Turbo picks
- Undervalued drivers, form analysis

Historical Archive – /archive
- Champions, records, iconic races, browse every season 2000–2025

UI Extras
- Dark / Light mode toggle (persisted)
- Favorite driver / team (localStorage)
- Search (⌘K UI)
- Smooth page transitions (Framer Motion)
- Animated standings
- Glassmorphism cards, hover effects, sticky nav
- Fully responsive

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide Icons
- shadcn-style components

## Data / APIs – 100% FREE, zero keys

All wired up in `lib/api/` with mock fallbacks:

- **Jolpica-F1** – standings, schedule, results – `https://api.jolpi.ca/ergast/f1/` – no key
- **OpenF1** – live timing, intervals, race control, car_data – `https://api.openf1.org/v1` – no key
- **Open-Meteo** – circuit weather – `https://open-meteo.com` – no key
- **F1 News RSS** – PlanetF1 / BBC Sport via `/api/news` – no key, server-parsed, unlimited

```ts
import { f1Api } from "@/lib/f1-data"
await f1Api.getDriverStandings()  // Jolpica
await f1Api.getLiveTiming()       // OpenF1
await f1Api.getWeather('lusail')  // Open-Meteo
await f1Api.getNews()             // RSS
```

See `FREE_APIS.md` for full endpoint list, circuit coordinates, and rate-limit/caching notes.

No `.env` keys required. Everything works out of the box.

## Run

```bash
cd f1-dashboard
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
app/
  page.tsx          Home Dashboard
  live/page.tsx     Live Race
  drivers/          Drivers
  teams/            Teams
  calendar/page.tsx Race Weekend
  stats/page.tsx    Statistics
  compare/page.tsx  Driver Comparison
  predictions/page.tsx
  fantasy/page.tsx
  archive/page.tsx
components/
  layout/Navbar.tsx
  ui/Card.tsx
  dashboard/Countdown.tsx
lib/f1-data.ts      Mock + API adapters
```

## Customizing
- Theme red: `tailwind.config.ts` → `f1.red: "#E10600"`
- Add drivers/teams in `lib/f1-data.ts`
- Wire OpenF1: replace `f1Api.getLiveTiming()` with a fetch to `https://api.openf1.org/v1/position?session_key=latest`

---

Built for F1 fans. Not affiliated with Formula 1.
