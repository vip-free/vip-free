import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

function makeSlug() {
  const s = Math.random().toString(36).slice(2, 8);
  return s;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { url } = req.body || {};
  try {
    if (!url || !/^https?:\/\//i.test(url)) {
      return res.status(400).json({ error: "Valid URL required" });
    }
    let slug = makeSlug();
    let exists = await redis.exists(slug);
    while (exists) {
      slug = makeSlug();
      exists = await redis.exists(slug);
    }
    await redis.set(slug, url);
    return res.status(200).json({ slug });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}
