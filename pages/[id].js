import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getServerSideProps(context) {
  const { id } = context.params;
  const url = await redis.get(id);

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
