import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const url = await redis.get(slug);
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

export default function Slug() {
  return null;
}
