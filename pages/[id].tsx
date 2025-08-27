import type { GetServerSideProps } from 'next';
import kv from '@/lib/kv';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  if (!id) {
    return { notFound: true };
  }
  const target = await kv.get<string>(`link:${id}`);
  if (!target) {
    return { notFound: true };
  }
  return {
    redirect: {
      destination: target,
      permanent: false,
    },
  };
};

export default function Go() { return null; }
