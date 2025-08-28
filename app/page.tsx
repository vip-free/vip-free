'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Link copied!');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-extrabold mb-6">NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="p-3 rounded-md text-black w-full mb-4"
        />
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md"
        >
          SHORTEN
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6">
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              {shortUrl}
            </a>
          </p>
          <button
            onClick={copyToClipboard}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
          >
            Copy
          </button>
        </div>
      )}
      <footer className="absolute bottom-4 text-sm">PAGER KIKIS RW 02</footer>
    </main>
  );
}
