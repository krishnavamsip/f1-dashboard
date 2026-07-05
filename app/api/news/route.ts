export const revalidate = 600; // cache 10 min

const FEEDS = [
  "https://www.planetf1.com/feed",
  "https://feeds.bbci.co.uk/sport/formula1/rss.xml",
  "https://www.motorsport.com/rss/f1/news/",
];

function parseRSS(xml: string, source: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const get = (tag: string) => {
      const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
      const v = block.match(re);
      if (!v) return "";
      return v[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    };
    items.push({
      title: get("title"),
      link: get("link"),
      pubDate: get("pubDate"),
      source,
    });
  }
  return items;
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      FEEDS.map((url, i) => fetch(url, { next: { revalidate: 600 }}).then(r => r.text()).then(xml => parseRSS(xml, ["PlanetF1","BBC","Motorsport"][i])))
    );
    const items = results.flatMap(r => r.status === "fulfilled" ? r.value : [])
      .filter(it => it.title)
      .sort((a,b) => +new Date(b.pubDate) - +new Date(a.pubDate))
      .slice(0, 16);
    return Response.json({ items });
  } catch (e) {
    return Response.json({ items: [] }, { status: 200 });
  }
}
