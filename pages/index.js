import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.shortUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-8">NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded-md text-black w-80"
          required
        />
        <button type="submit" className="bg-gray-500 px-6 py-2 rounded-md font-bold hover:bg-gray-600">
          SHORTEN
        </button>
      </form>

      {shortUrl && (
        <div className="flex items-center space-x-2 mt-6">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {shortUrl}
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            className="border border-white px-2 py-1 rounded flex items-center space-x-1"
          >
            <span>📋</span> <span>Copy</span>
          </button>
        </div>
      )}

      <footer className="mt-10 text-lg font-bold">PAGER KIKIS RW 02</footer>
    </div>
  );
}
