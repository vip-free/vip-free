import { NextResponse } from "next/server";

const KV_REST_API_URL = process.env.KV_REST_API_URL!;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN!;

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const slug = Math.random().toString(36).substring(2, 8);

    await fetch(`${KV_REST_API_URL}/set/${slug}/${encodeURIComponent(url)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_REST_API_TOKEN}`,
      },
    });

    return NextResponse.json({
      slug,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
