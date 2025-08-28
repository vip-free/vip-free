import { useState } from "react";
import { Copy } from "lucide-react";

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
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
      navigator.clipboard.writeText(data.shortUrl);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("✅ Link disalin ke clipboard!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">NYEXSOBATEN</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Masukkan URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="px-4 py-2 rounded-md text-black w-80"
          />
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-500"
            >
              SHORTEN
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="flex items-center justify-center space-x-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1 px-2 py-1 border border-white rounded-md hover:bg-gray-800"
            >
              <Copy size={16} />
              <span>Copy</span>
            </button>
          </div>
        )}

        <p className="mt-6 font-semibold">PAGER KIKIS RW 02</p>
      </div>
    </div>
  );
}