import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const id = nanoid(6);
    await redis.set(`shortlink:${id}`, url);

    return res.status(200).json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${id}` });
  }
}
