import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url } = await req.json();
  const shortId = Math.random().toString(36).substring(2, 8);
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${shortId}`;
  return NextResponse.json({ shortUrl });
}
