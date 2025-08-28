import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) return;

    // contoh shorten, nanti bisa ganti dengan API redis
    const short = window.location.origin + "/abcd123";
    setShortUrl(short);
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Link copied!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Judul */}
      <h1 className="text-5xl font-extrabold mb-10">NYEXSOBATEN</h1>

      {/* Input + Button */}
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full p-4 rounded-lg text-black text-lg"
        />
        <button
          onClick={handleShorten}
          className="w-full py-3 bg-gray-600 rounded-lg text-white font-bold text-lg"
        >
          SHORTEN
        </button>
      </div>

      {/* Hasil shortlink */}
      {shortUrl && (
        <div className="flex items-center space-x-2 mt-6">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-sm border border-gray-400 rounded"
          >
            📋
          </button>
        </div>
      )}

      {/* Footer */}
      <p className="absolute bottom-6 text-gray-300 font-bold">
        PAGER KIKIS RW 02
      </p>
    </div>
  );
}