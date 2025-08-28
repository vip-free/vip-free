import { useState } from "react";
import { Copy } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShorten = async () => {
    setError(null);
    setCopied(false);
    setShortUrl(null);
    if (!url || !/^https?:\/\//i.test(url)) {
      setError("Masukkan URL valid yang diawali http:// atau https://");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok && data.shortUrl) {
        setShortUrl(data.shortUrl);
        try {
          await navigator.clipboard.writeText(data.shortUrl);
          setCopied(true);
        } catch {}
      } else {
        setError(data.error || "Gagal membuat shortlink");
      }
    } catch (e: any) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  const copyNow = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    } catch {}
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-2 tracking-wide">NYEXSOBATEN</h1>
        <p className="text-center text-sm opacity-70 mb-8">PAGER KIKIS RW 02</p>

        <div className="flex flex-col gap-3">
          <input
            type="url"
            placeholder="https://contoh.com/halaman"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded-xl text-black outline-none"
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-60 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "PROCESSING..." : "SHORTEN"}
          </button>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          {shortUrl && (
            <div className="mt-4 flex items-center justify-between gap-3 bg-neutral-900 border border-neutral-800 p-3 rounded-xl">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">
                {shortUrl}
              </a>
              <button
                onClick={copyNow}
                aria-label="Copy"
                className="p-2 rounded-lg hover:bg-neutral-800"
                title={copied ? "Copied!" : "Copy"}
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
