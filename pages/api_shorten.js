import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const id = Math.random().toString(36).substring(2, 8);
    await redis.set(id, url);
    const shortUrl = `${process.env.BASE_URL}/${id}`;
    return res.status(200).json({ shortUrl });
  }
  res.status(405).json({ error: "Method not allowed" });
}
