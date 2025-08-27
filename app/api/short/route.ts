import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

  const slug = generateSlug();
  await kv.set(slug, url);

  return NextResponse.json({ slug });
}

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const url = await kv.get(slug);

  if (!url) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.redirect(url as string);
}
