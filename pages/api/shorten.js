import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "10 s"),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { success } = await ratelimit.limit("ratelimit_" + req.socket.remoteAddress);
  if (!success) {
    return res.status(429).json({ error: "Terlalu banyak permintaan, coba lagi nanti." });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL tidak boleh kosong" });
  }

  const id = Math.random().toString(36).substring(2, 8);
  await redis.set(id, url);

  const shortUrl = `${process.env.BASE_URL}/${id}`;
  res.status(200).json({ shortUrl });
}