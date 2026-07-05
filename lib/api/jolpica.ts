// Free, no-key F1 historical data
// Jolpica-F1 – Ergast-compatible replacement
// Docs: https://github.com/jolpica/jolpica-f1
// Base: https://api.jolpi.ca/ergast/f1/

const BASE = "https://api.jolpi.ca/ergast/f1";

export async function getCurrentDriverStandings() {
  const r = await fetch(`${BASE}/current/driverStandings.json`, { next: { revalidate: 3600 }});
  if (!r.ok) throw new Error("jolpica driverStandings failed");
  const json = await r.json();
  const list = json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  return list.map((s: any) => ({
    position: parseInt(s.position),
    points: parseFloat(s.points),
    wins: parseInt(s.wins),
    driverId: s.Driver.driverId,
    code: s.Driver.code,
    givenName: s.Driver.givenName,
    familyName: s.Driver.familyName,
    nationality: s.Driver.nationality,
    constructorId: s.Constructors[0].constructorId,
  }));
}

export async function getCurrentConstructorStandings() {
  const r = await fetch(`${BASE}/current/constructorStandings.json`, { next: { revalidate: 3600 }});
  if (!r.ok) throw new Error("jolpica constructorStandings failed");
  const json = await r.json();
  const list = json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  return list.map((s: any) => ({
    position: parseInt(s.position),
    points: parseFloat(s.points),
    wins: parseInt(s.wins),
    constructorId: s.Constructor.constructorId,
    name: s.Constructor.name,
    nationality: s.Constructor.nationality,
  }));
}

export async function getCurrentSchedule() {
  const r = await fetch(`${BASE}/current.json`, { next: { revalidate: 86400 }});
  if (!r.ok) throw new Error("jolpica schedule failed");
  const json = await r.json();
  return json.MRData.RaceTable.Races;
}

export async function getLastResult() {
  const r = await fetch(`${BASE}/current/last/results.json`, { next: { revalidate: 600 }});
  if (!r.ok) throw new Error("jolpica last result failed");
  const json = await r.json();
  return json.MRData.RaceTable.Races[0];
}

// No API key, CORS enabled, 100% free.
