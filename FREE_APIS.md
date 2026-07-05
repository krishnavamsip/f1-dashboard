# APEX F1 – 100% Free API Stack

Zero API keys. Zero cost. Production-usable.

### 1. Race results, standings, schedule – Jolpica-F1
- URL: `https://api.jolpi.ca/ergast/f1/`
- Replaces the retired Ergast API, same JSON shape
- No key, CORS enabled
- Endpoints used:
  - `/current/driverStandings.json`
  - `/current/constructorStandings.json`
  - `/current.json` (schedule)
  - `/current/last/results.json`
- Code: `lib/api/jolpica.ts`

### 2. Live timing / telemetry – OpenF1
- URL: `https://api.openf1.org/v1`
- No key, CORS enabled
- Endpoints:
  - `/position?session_key=latest`
  - `/intervals?session_key=latest`
  - `/race_control?session_key=latest`
  - `/car_data?driver_number=1&session_key=latest`
  - `/stints?session_key=latest`
  - `/sessions?session_name=Race&year=2024`
- Code: `lib/api/openf1.ts`
- Note: 2024/2023 historic sessions are fully populated. For a live 2025 race, just poll with `session_key=latest`. The UI falls back to mock data when no live session is running, so the dashboard never looks broken.

### 3. Weather – Open-Meteo
- URL: `https://api.open-meteo.com/v1/forecast`
- No key, CORS enabled, CC-BY 4.0
- Example: `?latitude=25.49&longitude=51.454&current=temperature_2m,weather_code,wind_speed_10m`
- Code: `lib/api/weather.ts` + `<WeatherWidget />`
- Circuit coordinates for all 24 tracks are in `CIRCUITS`

### 4. F1 News – Free RSS
- No key. Two options:
  1. **Server-side (recommended, unlimited)**: `/app/api/news/route.ts` – fetches PlanetF1 / BBC Sport RSS and parses it with zero dependencies. Cached 10 min. Used by `<NewsFeed />`
  2. **Client-side fallback**: `lib/api/news.ts` – uses rss2json.com free tier
- Feeds: `https://www.planetf1.com/feed`, `https://feeds.bbci.co.uk/sport/formula1/rss.xml`

### 5. Driver photos – free, no key
Currently using pravatar.cc placeholders. Swap to:
- UI Avatars: `https://ui-avatars.com/api/?name=Max+Verstappen&background=E10600&color=fff`
- DiceBear: `https://api.dicebear.com/9.x/initials/svg?seed=VER`
- Wikimedia (check license per driver)

No keys for any of the above.

---

### How the app uses them

`lib/f1-data.ts` exports:
```ts
f1Api.getDriverStandings()  // Jolpica, fallback to mock
f1Api.getConstructorStandings() // Jolpica
f1Api.getLiveTiming()       // OpenF1, fallback to mock
f1Api.getWeather('lusail')  // Open-Meteo
f1Api.getNews()             // /api/news → RSS
```

All fetchers catch errors and return the bundled mock data, so the UI is always fast and never blank.

### Environment variables
None. `cp .env.example .env.local` – empty.

If you want to add paid upgrades later:
- OpenWeatherMap: `OPENWEATHER_KEY=...`
- NewsAPI: `NEWSAPI_KEY=...`

But you don't need them.

### Rate limits / caching
- Jolpica: be kind, cache 1h – Next.js `next: { revalidate: 3600 }` is set
- OpenF1: poll 3-4s during a live race only
- Open-Meteo: 10k/day free, we cache 15 min
- RSS: 10 min cache in `/api/news`

All set up already.

---

Enjoy – $0/month F1 analytics platform.
