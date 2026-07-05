// Free, no-key weather
// Open-Meteo – https://open-meteo.com
// No API key. CORS enabled. CC-BY 4.0

export type CircuitLocation = { name: string; lat: number; lon: number };

export const CIRCUITS: Record<string, CircuitLocation> = {
  lusail: { name: "Lusail International Circuit", lat: 25.490, lon: 51.454 },
  monza: { name: "Monza", lat: 45.619, lon: 9.281 },
  silverstone: { name: "Silverstone", lat: 52.073, lon: -1.015 },
  monaco: { name: "Monaco", lat: 43.7347, lon: 7.42056 },
  spa: { name: "Spa", lat: 50.4372, lon: 5.97139 },
  suzuka: { name: "Suzuka", lat: 34.8431, lon: 136.541 },
  vegas: { name: "Las Vegas", lat: 36.1147, lon: -115.173 },
  abu_dhabi: { name: "Yas Marina", lat: 24.4672, lon: 54.6031 },
};

export async function getCircuitWeather(circuit: CircuitLocation = CIRCUITS.lusail) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${circuit.lat}&longitude=${circuit.lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
  const r = await fetch(url, { next: { revalidate: 900 } });
  if (!r.ok) throw new Error("open-meteo failed");
  return r.json();
}

// Example response: current.temperature_2m, current.wind_speed_10m, daily.precipitation_probability_max
