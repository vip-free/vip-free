import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { v4 as uuidv4 } from "uuid";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const id = uuidv4().slice(0, 6);
  await redis.set(id, url);

  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`;
  res.status(200).json({ shortUrl });
}
