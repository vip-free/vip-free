import { useState } from "react";
import { Copy } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) return;
    const id = Math.random().toString(36).substring(2, 8);
    const base = window.location.origin;
    localStorage.setItem(id, url);
    setShortUrl(`${base}/${id}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-8">NYEXSOBATEN</h1>
      
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-96 p-3 rounded-lg text-black"
      />
      <button
        onClick={handleShorten}
        className="mt-4 px-6 py-3 bg-gray-500 rounded-lg font-bold hover:bg-gray-600"
      >
        SHORTEN
      </button>

      {shortUrl && (
        <div className="flex items-center mt-6 space-x-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {shortUrl}
          </a>
          <button onClick={handleCopy}>
            <Copy size={20} />
          </button>
        </div>
      )}

      <footer className="absolute bottom-6 text-sm font-bold">
        PAGER KIKIS RW 02
      </footer>
    </div>
  );
}
