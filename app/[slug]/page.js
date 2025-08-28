import { redirect, notFound } from 'next/navigation';
import { redis, SHORT_PREFIX } from '@/lib/redis';

export default async function SlugPage({ params }) {
  const { slug } = params;
  const url = await redis.get(SHORT_PREFIX + slug);

  if (!url) {
    notFound();
  }

  redirect(url);
}
