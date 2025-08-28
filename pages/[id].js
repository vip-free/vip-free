import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function getServerSideProps({ params }) {
  const url = await redis.get(`shortlink:${params.id}`);
  if (!url) {
    return { notFound: true };
  }
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}
