import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const id = Math.random().toString(36).substring(2, 8);
    await redis.set(id, url);

    const shortUrl = `${process.env.BASE_URL}/${id}`;
    res.status(200).json({ shortUrl });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
