import { redis } from "@/lib/redis";
import { notFound, redirect } from "next/navigation";

interface Params {
  params: { id: string };
}

export default async function ShortlinkPage({ params }: Params) {
  const url = await redis.get(params.id);
  if (!url) return notFound();
  redirect(url as string);
}
