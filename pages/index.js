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
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
      navigator.clipboard.writeText(data.shortUrl);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Masukkan URL..."
          className="px-4 py-2 rounded text-black w-80"
        />
        <button type="submit" className="mt-4 px-6 py-2 bg-gray-600 rounded">
          SHORTEN
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6 flex items-center space-x-2">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {shortUrl}
          </a>
          <button
            onClick={copyToClipboard}
            className="px-2 py-1 border border-gray-400 rounded text-xs flex items-center"
          >
            📋 Copy
          </button>
        </div>
      )}
      <footer className="absolute bottom-4 text-sm">PAGER KIKIS RW 02</footer>
    </div>
  );
}
