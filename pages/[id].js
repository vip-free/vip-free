import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch('/api/shorten')
        .then((res) => res.json())
        .then((data) => {
          if (data[id]) {
            window.location.href = data[id];
          }
        });
    }
  }, [id]);

  return <p className="text-white">Redirecting...</p>;
}
