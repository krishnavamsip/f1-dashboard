// Free, no-key live F1 timing
// OpenF1 – https://openf1.org
// No API key required. CORS enabled.
// Rate limit: ~ be nice, cache 2-4s for live

const BASE = "https://api.openf1.org/v1";

export async function getLatestSessionKey() {
  // get the most recent Race session
  const r = await fetch(`${BASE}/sessions?session_name=Race&year=2024`, { cache: "no-store" });
  if (!r.ok) throw new Error("openf1 sessions");
  const sessions = await r.json();
  return sessions[sessions.length - 1]?.session_key;
}

export async function getLivePositions(session_key: number | "latest" = "latest") {
  const r = await fetch(`${BASE}/position?session_key=${session_key}`, { cache: "no-store" });
  if (!r.ok) throw new Error("openf1 position");
  return r.json();
}

export async function getIntervals(session_key: number | "latest" = "latest") {
  const r = await fetch(`${BASE}/intervals?session_key=${session_key}`, { cache: "no-store" });
  return r.ok ? r.json() : [];
}

export async function getRaceControl(session_key: number | "latest" = "latest") {
  const r = await fetch(`${BASE}/race_control?session_key=${session_key}`, { cache: "no-store" });
  return r.ok ? r.json() : [];
}

export async function getCarData(driver_number: number, session_key: number | "latest" = "latest") {
  const r = await fetch(`${BASE}/car_data?driver_number=${driver_number}&session_key=${session_key}`, { cache: "no-store" });
  return r.ok ? r.json() : [];
}

export async function getStints(session_key: number | "latest" = "latest") {
  const r = await fetch(`${BASE}/stints?session_key=${session_key}`, { cache: "no-store" });
  return r.ok ? r.json() : [];
}

// Helper: build a live leaderboard merging position + intervals + stints
export async function getLiveLeaderboard(session_key: number | "latest" = "latest") {
  const [pos, intervals, stints] = await Promise.all([
    getLivePositions(session_key),
    getIntervals(session_key),
    getStints(session_key),
  ]);
  // pos is a stream – take latest per driver_number
  const latest = new Map();
  for (const p of pos) latest.set(p.driver_number, p);
  return Array.from(latest.values()).sort((a,b)=>a.position-b.position);
}
