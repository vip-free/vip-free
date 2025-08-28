import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleShorten() {
    if (!url) return;
    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">NYEXSOBATEN</h1>
      
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-4 py-2 rounded-md text-black w-80"
      />

      <button
        onClick={handleShorten}
        className="mt-4 px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
      >
        SHORTEN
      </button>

      {shortUrl && (
        <div className="mt-4">
          <a href={shortUrl} target="_blank" rel="noreferrer" className="underline">
            {shortUrl}
          </a>
        </div>
      )}

      <footer className="absolute bottom-4 text-gray-400">
        PAGER KIKIS RW 02
      </footer>
    </div>
  );
}