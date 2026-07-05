// Free F1 news – RSS, no API key
// We use rss2json.com (free tier) to convert RSS to JSON with CORS
// Alternative: run your own /api/news route that parses RSS server-side (no rate limit)
// Feeds that work well:
//  - https://www.planetf1.com/feed
//  - https://www.motorsport.com/rss/f1/news/
//  - https://feeds.bbci.co.uk/sport/formula1/rss.xml

const RSS_FEED = "https://www.planetf1.com/feed";
const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
};

export async function getF1News(): Promise<NewsItem[]> {
  try {
    const r = await fetch(RSS2JSON + encodeURIComponent(RSS_FEED), { next: { revalidate: 600 } });
    if (!r.ok) throw new Error("rss2json failed");
    const json = await r.json();
    return (json.items || []).slice(0, 8).map((it: any) => ({
      title: it.title,
      link: it.link,
      pubDate: it.pubDate,
      source: "PlanetF1",
    }));
  } catch {
    // Fallback – static, so UI never breaks
    return [
      { title: "McLaren clinch Constructors lead in Vegas thriller", link: "#", pubDate: new Date().toISOString(), source: "APEX" },
      { title: "Ferrari unveil floor upgrade for Qatar", link: "#", pubDate: new Date().toISOString(), source: "APEX" },
      { title: "Pirelli confirm C2-C3-C4 compound allocation for Lusail", link: "#", pubDate: new Date().toISOString(), source: "APEX" },
    ];
  }
}

// 100% free option without rss2json (no rate limit):
// Create app/api/news/route.ts and parse RSS server-side with fast-xml-parser.
// See /app/api/news/route.ts in this repo for a zero-dependency version.
