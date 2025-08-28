import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RedirectPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const originalUrl = localStorage.getItem(id);
      if (originalUrl) {
        window.location.href = originalUrl;
      }
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <p>Redirecting...</p>
    </div>
  );
}
