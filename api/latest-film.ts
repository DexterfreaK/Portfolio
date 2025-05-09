import Parser from 'rss-parser';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const parser = new Parser();

export default async function handler(_: VercelRequest, res: VercelResponse) {
//   const username = process.env.LETTERBOXD_USER;
//   if (!username) {
//     return res.status(500).json({ error: 'missing LETTERBOXD_USER env var' });
//   }

  // Public RSS endpoint that Letterboxd exposes for every profile
  const feed = await parser.parseURL(`https://letterboxd.com/dexterfreak/rss/`);
  const latest = feed.items.find((i) =>
    i.categories?.includes('Diary entry'),
  );

  if (!latest) return res.status(200).json(null); // no public diaries yet

  // Grab the first <img src="…"> inside <content:encoded>
  const poster =
    /<img[^>]+src="([^"]+)"/.exec(
      (latest as any)['content:encoded'] ?? '',
    )?.[1] || '';

  res.setHeader(
    'Cache-Control',
    // 10 min edge-TTL, stale responses are revalidated in the background
    's-maxage=600, stale-while-revalidate',
  ); /* recommended by Vercel’s cache docs :contentReference[oaicite:0]{index=0} */

  res.status(200).json({
    title: latest.title,           // “Past Lives (2023)”
    watchedDate: latest.isoDate,   // ISO-8601 string
    link: latest.link,
    poster,
  });
}
