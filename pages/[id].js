import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function getServerSideProps(context) {
  const { id } = context.params;
  const url = await redis.get(id);

  if (url) {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function RedirectPage() {
  return null;
}