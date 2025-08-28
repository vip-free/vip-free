import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const slug = Math.random().toString(36).substring(2, 8);
    await redis.set(slug, url);
    res.status(200).json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}` });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
