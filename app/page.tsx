import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
    if (data.shortUrl) {
      navigator.clipboard.writeText(data.shortUrl);
      alert("Shortlink otomatis tersalin ke clipboard!");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Masukkan URL..."
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="p-2 bg-gray-600 hover:bg-gray-500 rounded">
          SHORTEN
        </button>
      </form>
      {shortUrl && (
        <p className="mt-4">
          Shortlink: <a href={shortUrl} className="text-blue-400 underline">{shortUrl}</a>
        </p>
      )}
    </main>
  );
}
