import { NextResponse } from 'next/server';
import { redis, SHORT_PREFIX } from '@/lib/redis';
import { customAlphabet } from 'nanoid';

const nano = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', 6);

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    let target;
    try {
      target = new URL(url);
    } catch {
      return NextResponse.json({ error: 'URL tidak valid' }, { status: 400 });
    }

    if (target.protocol !== 'http:' && target.protocol !== 'https:') {
      return NextResponse.json({ error: 'Protocol harus http/https' }, { status: 400 });
    }

    let slug = nano();
    const exists = await redis.get(SHORT_PREFIX + slug);
    if (exists) slug = nano();

    await redis.set(SHORT_PREFIX + slug, target.toString());

    return NextResponse.json({ slug });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
