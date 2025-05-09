import Parser from 'rss-parser';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type LetterboxdItem = {
  title:            string;              // e.g. "Glengarry Glen Ross, 1992 - ★★★★"
  link:             string;
  isoDate?:         string;              // supplied by rss-parser if <pubDate> exists
  'letterboxd:watchedDate'?: string;
  'letterboxd:memberRating'?: string;
  'content:encoded'?: string;
};

const parser = new Parser<{}, LetterboxdItem>();

export default async function handler(_: VercelRequest, res: VercelResponse) {
  // const username = process.env.LETTERBOXD_USER;
  // if (!username) {
  //   return res.status(500).json({ error: 'missing LETTERBOXD_USER env var' });
  // }
  const username = 'dexterfreak'
  // 1 — fetch & parse the public RSS
  const feed = await parser.parseURL(`https://letterboxd.com/${username}/rss/`);
  const latest = feed.items[0];                     // FIRST <item>
  if (!latest) return res.status(200).json(null);

  // 2 — pull the poster URL from the HTML in <content:encoded>
  const poster =
    /<img[^>]+src="([^"]+)"/.exec(latest['content:encoded'] ?? '')?.[1] || '';

  // 3 — strip the star-rating suffix from <title>
  const cleanTitle = latest.title.replace(/\s*-\s*★+.?$/, '').trim();

  // 4 — build the JSON payload
  res.setHeader(
    'Cache-Control',
    's-maxage=600, stale-while-revalidate'           // 10 min edge-cache
  );

  res.status(200).json({
    title:        cleanTitle,                       // "Glengarry Glen Ross, 1992"
    watchedDate:  latest['letterboxd:watchedDate'] || latest.isoDate,
    rating:       latest['letterboxd:memberRating'],// "4.0"
    link:         latest.link,
    poster,
  });
}
