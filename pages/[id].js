import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getServerSideProps({ params }) {
  const originalUrl = await redis.get(params.id);
  if (!originalUrl) {
    return {
      notFound: true,
    };
  }
  return {
    redirect: {
      destination: originalUrl,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}
