import { GetServerSideProps } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const url = await redis.get(id as string);

  if (!url) {
    return { notFound: true };
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
