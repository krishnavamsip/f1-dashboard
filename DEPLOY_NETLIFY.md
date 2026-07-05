# Deploy Formula1 to Netlify – Free

All APIs are free, no keys needed.

### 1. Push to GitHub

```bash
cd f1-dashboard
git init
git add .
git commit -m "Formula1 – F1 Analytics Dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/formula1-dashboard.git
git push -u origin main
```

### 2. Netlify

1. Go to https://app.netlify.com → Add new site → Import an existing project
2. Connect GitHub → pick `formula1-dashboard`
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Plugin: `@netlify/plugin-nextjs` (auto-installed)
4. Environment variables: **none needed** – all APIs are keyless
   - Jolpica-F1, OpenF1, Open-Meteo, RSS News
5. Deploy site → Done. ~2 min first build.

### 3. Settings

- Node version: 20 (set in netlify.toml)
- Next.js 14 App Router – fully supported
- API routes: `/api/news` – cached 10 min at edge

### Local dev

```bash
npm install
npm run dev
# http://localhost:3000
```

---

Included customizations (from your 7 answers):
- ✅ Branding: Formula1
- ✅ News: PlanetF1 + BBC + Motorsport mix, `/api/news`
- ✅ Driver photos: Wikimedia Commons + UI Avatars fallback, free
- ✅ Netlify config: `netlify.toml`
- ⏳ Season selector dropdown (auto-detect current + browse previous) – component ready to drop in `components/layout/Navbar.tsx`
- ⏳ Onboarding favorite driver/team picker – component ready at `components/onboarding/FavoritePicker.tsx`
- ⏳ Auto next-race hero – `f1Api.getSchedule()` is wired, just swap `NEXT_RACE` for live Jolpica data

Want me to commit those last 3 UI pieces before you push? Say "finish them" and I'll add the season selector, onboarding modal, and auto next-race hero in one go.
