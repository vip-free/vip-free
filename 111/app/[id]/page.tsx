import { redirect } from "next/navigation";

interface Params {
  params: { id: string };
}

export default async function RedirectPage({ params }: Params) {
  const { id } = params;

  // Ambil dari KV
  const res = await fetch(`${process.env.KV_REST_API_URL}/get/${id}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    cache: "no-store",
  });

  const data = await res.json();
  const url = data.result;

  if (url) {
    redirect(decodeURIComponent(url));
  }

  return <p className="text-center mt-20 text-red-500">Link tidak ditemukan</p>;
}
