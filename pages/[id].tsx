import { GetServerSideProps } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const url = await redis.get(id as string);

  if (!url) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: url as string,
      permanent: false,
    },
  };
};

export default function RedirectPage() {
  return null;
}
