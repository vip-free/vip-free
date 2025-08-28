import { Redis } from "@upstash/redis";
import { notFound, redirect } from "next/navigation";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function RedirectPage({ params }) {
  const id = params.id;
  const url = await redis.get(id);
  if (!url) return notFound();
  redirect(url);
}
