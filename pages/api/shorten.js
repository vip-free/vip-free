import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = JSON.parse(req.body);

    if (!url || !url.startsWith("http")) {
      return res.status(400).json({ error: "URL tidak valid" });
    }

    const code = Math.random().toString(36).substring(2, 7);
    await kv.set(code, url);

    const shortUrl = `https://nyexsobaten.vercel.app/${code}`;
    return res.status(200).json({ shortUrl });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}