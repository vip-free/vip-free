import { useState } from "react";
import { Copy } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
      navigator.clipboard.writeText(data.shortUrl);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-8">NYEXSOBATEN</h1>
      <div className="w-full max-w-xl">
        <input
          type="text"
          placeholder="Masukkan URL disini..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />
        <button
          onClick={handleShorten}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 mt-4 rounded-lg"
        >
          SHORTEN
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {shortUrl}
          </a>
          <Copy className="w-5 h-5 cursor-pointer" onClick={copyToClipboard} />
        </div>
      )}
    </div>
  );
}
