import { kv } from "@vercel/kv";

export async function getServerSideProps(context) {
  const { code } = context.params;
  const url = await kv.get(code);

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