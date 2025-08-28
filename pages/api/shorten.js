import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const id = nanoid(6);

    await redis.set(id, url);
    res.status(200).json({ id });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
