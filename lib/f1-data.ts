// APEX F1 Data Layer – 100% FREE APIs
// - Jolpica-F1 (Ergast replacement): https://api.jolpi.ca/ergast/f1/ – no key, CORS yes
// - OpenF1 (live timing): https://openf1.org – no key, CORS yes
// - Open-Meteo (weather): https://open-meteo.com – no key, CORS yes
// - F1 News RSS via /api/news – free, no key (PlanetF1 / BBC Sport)
//
// All mock data below is used as a fallback if a free API is down / rate-limited.
// See /lib/api/ for the actual fetchers.

export type Driver = {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  number: number;
  teamId: string;
  nationality: string;
  age: number;
  photo: string;
  color: string;
  championships: number;
  wins: number;
  podiums: number;
  poles: number;
};

export type Team = {
  id: string;
  name: string;
  color: string;
  engine: string;
  principal: string;
  technicalDirector: string;
  logoText: string;
  points: number;
};

export const TEAMS: Team[] = [
  { id: "red_bull", name: "Oracle Red Bull Racing", color: "#3671C6", engine: "Honda RBPT", principal: "Christian Horner", technicalDirector: "Pierre Waché", logoText: "RED BULL", points: 488 },
  { id: "mclaren", name: "McLaren F1 Team", color: "#FF8000", engine: "Mercedes", principal: "Andrea Stella", technicalDirector: "Rob Marshall", logoText: "McLAREN", points: 566 },
  { id: "ferrari", name: "Scuderia Ferrari", color: "#E10600", engine: "Ferrari", principal: "Frédéric Vasseur", technicalDirector: "Enrico Cardile", logoText: "FERRARI", points: 441 },
  { id: "mercedes", name: "Mercedes-AMG PETRONAS", color: "#27F4D2", engine: "Mercedes", principal: "Toto Wolff", technicalDirector: "James Allison", logoText: "MERCEDES", points: 396 },
  { id: "aston_martin", name: "Aston Martin Aramco", color: "#229971", engine: "Mercedes", principal: "Mike Krack", technicalDirector: "Dan Fallows", logoText: "ASTON", points: 82 },
  { id: "alpine", name: "BWT Alpine F1", color: "#FF87BC", engine: "Renault", principal: "Bruno Famin", technicalDirector: "Matt Harman", logoText: "ALPINE", points: 14 },
];

const avatar = (code: string, bg = "15151E") => `https://ui-avatars.com/api/?name=${code}&background=${bg.replace('#','')}&color=fff&size=300&bold=true&format=svg`;

// Wikimedia Commons CC headshots where available, fallback to ui-avatars – all free
export const DRIVERS: Driver[] = [
  { id: "verstappen", code: "VER", firstName: "Max", lastName: "Verstappen", number: 1, teamId: "red_bull", nationality: "Netherlands", age: 27, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Max_Verstappen_2017_Malaysia_3.jpg/400px-Max_Verstappen_2017_Malaysia_3.jpg", color: "#3671C6", championships: 3, wins: 62, podiums: 108, poles: 40 },
  { id: "norris", code: "NOR", firstName: "Lando", lastName: "Norris", number: 4, teamId: "mclaren", nationality: "United Kingdom", age: 25, photo: avatar("NOR","FF8000"), color: "#FF8000", championships: 0, wins: 4, podiums: 25, poles: 7 },
  { id: "leclerc", code: "LEC", firstName: "Charles", lastName: "Leclerc", number: 16, teamId: "ferrari", nationality: "Monaco", age: 27, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Charles_Leclerc_2019.jpg/400px-Charles_Leclerc_2019.jpg", color: "#E10600", championships: 0, wins: 7, podiums: 37, poles: 26 },
  { id: "piastri", code: "PIA", firstName: "Oscar", lastName: "Piastri", number: 81, teamId: "mclaren", nationality: "Australia", age: 23, photo: avatar("PIA","FF8000"), color: "#FF8000", championships: 0, wins: 2, podiums: 9, poles: 0 },
  { id: "sainz", code: "SAI", firstName: "Carlos", lastName: "Sainz", number: 55, teamId: "ferrari", nationality: "Spain", age: 30, photo: avatar("SAI","E10600"), color: "#E10600", championships: 0, wins: 4, podiums: 24, poles: 6 },
  { id: "russell", code: "RUS", firstName: "George", lastName: "Russell", number: 63, teamId: "mercedes", nationality: "United Kingdom", age: 26, photo: avatar("RUS","27F4D2"), color: "#27F4D2", championships: 0, wins: 2, podiums: 13, poles: 3 },
  { id: "hamilton", code: "HAM", firstName: "Lewis", lastName: "Hamilton", number: 44, teamId: "mercedes", nationality: "United Kingdom", age: 39, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/400px-Lewis_Hamilton_2016_Malaysia_2.jpg", color: "#27F4D2", championships: 7, wins: 105, podiums: 201, poles: 104 },
  { id: "alonso", code: "ALO", firstName: "Fernando", lastName: "Alonso", number: 14, teamId: "aston_martin", nationality: "Spain", age: 43, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Fernando_Alonso_2016_Malaysia_2.jpg/400px-Fernando_Alonso_2016_Malaysia_2.jpg", color: "#229971", championships: 2, wins: 32, podiums: 106, poles: 22 },
];

export const DRIVER_STANDINGS = [
  { pos: 1, driverId: "verstappen", points: 393 },
  { pos: 2, driverId: "norris", points: 324 },
  { pos: 3, driverId: "leclerc", points: 298 },
  { pos: 4, driverId: "piastri", points: 268 },
  { pos: 5, driverId: "sainz", points: 245 },
  { pos: 6, driverId: "russell", points: 192 },
  { pos: 7, driverId: "hamilton", points: 189 },
  { pos: 8, driverId: "alonso", points: 62 },
];

export const CONSTRUCTOR_STANDINGS = TEAMS.map((t,i)=>({ pos: i+1, teamId: t.id, points: t.points })).sort((a,b)=>b.points-a.points);

export const NEXT_RACE = {
  name: "QATAR GRAND PRIX",
  circuit: "Lusail International Circuit",
  country: "Qatar",
  round: 23,
  date: new Date(Date.now() + 1000*60*60*24*4 + 1000*60*60*7).toISOString(),
  trackLength: "5.419 km",
  laps: 57,
  lapRecord: "1:24.319 - Verstappen (2023)",
};

export const PREV_RACE = {
  name: "Las Vegas GP",
  winner: "verstappen",
  pole: "russell",
  fastestLap: { driverId: "norris", time: "1:34.876" },
  driverOfTheDay: "leclerc",
};

export const NEWS = [
  { id:1, title: "McLaren clinch Constructors lead in Vegas thriller", tag: "Breaking", time: "2h ago" },
  { id:2, title: "Ferrari unveil floor upgrade for Qatar", tag: "Tech", time: "5h ago"},
  { id:3, title: "Pirelli confirm C2-C3-C4 compound allocation for Lusail", tag: "Pirelli", time: "9h ago"},
  { id:4, title: "Apex Analysis: Why the W15 finally came alive", tag: "Analysis", time: "14h ago"},
];

export const CALENDAR_2025 = [
  { round: 20, name: "Las Vegas GP", winner: "VER", date: "Nov 23" },
  { round: 21, name: "Qatar GP", winner: null, date: "Dec 1" },
  { round: 22, name: "Abu Dhabi GP", winner: null, date: "Dec 8" },
];

export function getDriver(id: string) { return DRIVERS.find(d=>d.id===id)! }
export function getTeam(id: string) { return TEAMS.find(t=>t.id===id)! }

// Live timing mock - replace with OpenF1: https://openf1.org/
export const LIVE_LEADERBOARD = DRIVERS.slice(0,12).map((d, i) => ({
  pos: i+1,
  driverId: d.id,
  interval: i===0 ? "LEADER" : `+${(i*1.842).toFixed(3)}`,
  tyre: ["SOFT","MEDIUM","HARD","MEDIUM","SOFT","HARD","MEDIUM","SOFT","HARD","MEDIUM","HARD","SOFT"][i % 12],
  tyreAge: 6+i*2,
  pits: i < 4 ? 1 : 0,
  lastLap: `1:3${2+i%6}.${400+i*31}`,
  bestLap: `1:32.${900+i*12}`,
  s1: "24.411", s2: "32.108", s3: "36.221",
}));

import { getCurrentDriverStandings, getCurrentConstructorStandings, getCurrentSchedule, getLastResult } from "./api/jolpica";
import { getLiveLeaderboard as getOpenF1Leaderboard } from "./api/openf1";
import { getCircuitWeather, CIRCUITS } from "./api/weather";
import { getF1News } from "./api/news";

export const f1Api = {
  // History / standings – Jolpica-F1 – FREE, no key
  getDriverStandings: async () => { try { return await getCurrentDriverStandings() } catch { return DRIVER_STANDINGS } },
  getConstructorStandings: async () => { try { return await getCurrentConstructorStandings() } catch { return CONSTRUCTOR_STANDINGS } },
  getSchedule: async () => { try { return await getCurrentSchedule() } catch { return CALENDAR_2025 } },
  getLastResult: async () => { try { return await getLastResult() } catch { return PREV_RACE } },

  // Live – OpenF1 – FREE, no key
  getLiveTiming: async (session_key: number | "latest" = "latest") => { 
    try { 
      const live = await getOpenF1Leaderboard(session_key);
      // Map OpenF1 shape to our mock shape for the UI
      if (live.length) return live;
    } catch {}
    return LIVE_LEADERBOARD;
  },

  // Weather – Open-Meteo – FREE, no key
  getWeather: async (circuitKey: keyof typeof CIRCUITS = "lusail") => {
    try { return await getCircuitWeather(CIRCUITS[circuitKey]) } catch { return null }
  },

  // News – RSS via /api/news – FREE, no key
  getNews: async () => { try { return await getF1News() } catch { return NEWS } },
};

export { CIRCUITS };
