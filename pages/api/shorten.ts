import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const id = Math.random().toString(36).substring(2, 8);
    await redis.set(id, url);

    return res.status(200).json({ shortUrl: `${process.env.BASE_URL}/${id}` });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
