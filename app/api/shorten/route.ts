import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !origin.includes("vip-free.vercel.app")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

  const id = nanoid(6);
  await redis.set(id, url);
  return NextResponse.json({ shortUrl: `https://vip-free.vercel.app/${id}` });
}
