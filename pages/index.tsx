import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-8">NYEXSOBATEN</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="w-80 p-3 rounded text-black"
      />
      <button
        onClick={shortenUrl}
        className="mt-4 px-6 py-2 bg-gray-600 rounded text-white"
      >
        SHORTEN
      </button>
      {shortUrl && (
        <p className="mt-6">
          Short URL:{" "}
          <a href={shortUrl} className="text-blue-400 underline">
            {shortUrl}
          </a>
        </p>
      )}
      <p className="mt-10 text-lg">PAGER KIKIS RW 02</p>
    </div>
  );
}