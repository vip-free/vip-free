import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const url = await redis.get(slug);
    if (url) {
      return { redirect: { destination: url, permanent: false } };
    }
  } catch (e) {}
  return { notFound: true };
}

export default function Redirecting() { return null; }
