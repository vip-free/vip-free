import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const url = formData.get("url") as string;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Buat ID unik sederhana
  const id = Math.random().toString(36).substring(2, 8);

  // Simpan ke Upstash KV
  await fetch(`${process.env.KV_REST_API_URL}/set/${id}/${encodeURIComponent(url)}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });

  return NextResponse.redirect(`/${id}`);
}
