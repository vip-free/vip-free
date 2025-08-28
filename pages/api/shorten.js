import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const id = Math.random().toString(36).substring(2, 8);
  await redis.set(id, url);

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  return res.status(200).json({ shortUrl: `${baseUrl}/${id}` });
}