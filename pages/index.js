import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleShorten() {
    setError("");
    if (!url) return;
    try {
      setLoading(true);
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to shorten");
      setShortUrl(`${window.location.origin}/${data.slug}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide mb-10">NYEXSOBATEN</h1>

        <div className="mx-auto w-full">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full max-w-3xl mx-auto block rounded-lg px-5 py-4 text-black text-lg outline-none"
          />
        </div>

        <button
          onClick={handleShorten}
          disabled={loading}
          className="mt-5 inline-block bg-gray-600 hover:bg-gray-700 active:scale-[.99] transition rounded-lg px-8 py-3 font-bold"
        >
          {loading ? "PROCESS..." : "SHORTEN"}
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {shortUrl && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href={shortUrl} className="text-lg underline" target="_blank" rel="noreferrer">{shortUrl}</a>
            <button
              onClick={handleCopy}
              aria-label="Copy short URL"
              title="Copy"
              className="p-1 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <rect x="9" y="9" width="10" height="10" rx="2" ry="2" strokeWidth="2"/>
                <rect x="5" y="5" width="10" height="10" rx="2" ry="2" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        )}

        <p className="mt-10 font-semibold tracking-wide">PAGER KIKIS RW 02</p>
      </div>
    </div>
  );
}
