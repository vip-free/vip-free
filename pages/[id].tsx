import { GetServerSideProps } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String((params as any)?.id || "");
  const url = id ? await redis.get<string>(id) : null;

  if (!url) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};

export default function Redirect() { return null; }
