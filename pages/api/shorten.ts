import type { NextApiRequest, NextApiResponse } from 'next';
import kv from '@/lib/kv';

function normalizeUrl(input: string) {
  try {
    const hasProtocol = /^https?:\/\//i.test(input);
    const url = new URL(hasProtocol ? input : `https://${input}`);
    return url.toString();
  } catch {
    return null;
  }
}

function makeId(len = 6) {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { url } = req.body || {};
  const normalized = typeof url === 'string' ? normalizeUrl(url.trim()) : null;
  if (!normalized) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  // generate unique id
  let id = makeId();
  // ensure uniqueness
  // try a few times
  for (let i = 0; i < 5; i++) {
    const existing = await kv.get(`link:${id}`);
    if (!existing) break;
    id = makeId();
  }

  await kv.set(`link:${id}`, normalized);
  const base = process.env.NEXT_PUBLIC_BASE_URL || (req.headers.origin as string) || '';
  const shortUrl = `${base.replace(/\/$/, '')}/${id}`;
  return res.status(200).json({ id, shortUrl });
}
