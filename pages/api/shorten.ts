import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function genId(len = 6) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.body as { url?: string };
  if (!url || !/^https?:\/\//i.test(url)) return res.status(400).json({ error: "URL invalid" });

  const id = genId(6);
  await redis.set(id, url);
  const base = process.env.BASE_URL || `https://${req.headers.host}`;
  const shortUrl = `${base}/${id}`;
  return res.status(200).json({ shortUrl, id });
}
