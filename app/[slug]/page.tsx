import { redirect } from "next/navigation";

const KV_REST_API_URL = process.env.KV_REST_API_URL!;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN!;

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${KV_REST_API_URL}/get/${params.slug}`, {
    headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` },
    cache: "no-store",
  });

  const data = await res.json();
  if (!data.result) {
    return <h1>404 - Shortlink Not Found</h1>;
  }

  redirect(data.result);
}
