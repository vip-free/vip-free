import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function POST(req) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  const id = Math.random().toString(36).substring(2, 8);
  await redis.set(id, url);

  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`;
  return NextResponse.json({ shortUrl });
}
