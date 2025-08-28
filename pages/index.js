import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("✅ Short URL copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="px-4 py-2 rounded text-black w-80"
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-gray-600 rounded hover:bg-gray-700"
        >
          SHORTEN
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 flex items-center space-x-2">
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              {shortUrl}
            </a>
          </p>
          <button
            onClick={copyToClipboard}
            className="ml-2 px-2 py-1 bg-gray-700 rounded hover:bg-gray-800"
          >
            📋
          </button>
        </div>
      )}

      <footer className="absolute bottom-4 text-sm">PAGER KIKIS RW 02</footer>
    </div>
  );
}
