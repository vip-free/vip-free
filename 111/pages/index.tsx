import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setResult(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-full flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide mb-12">
          NYEXSOBATEN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <input
              type="url"
              required
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full md:w-[720px] rounded-lg px-6 py-5 text-gray-900 placeholder-gray-500 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 rounded-lg bg-gray-500 hover:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold tracking-wider text-2xl"
            >
              {loading ? 'WORKING…' : 'SHORTEN'}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 text-lg">
            <p>Short URL:</p>
            <a className="underline" href={result} target="_blank" rel="noreferrer">
              {result}
            </a>
          </div>
        )}
        {error && <p className="mt-6 text-red-400">{error}</p>}

        <p className="mt-16 text-4xl font-extrabold tracking-wide">
          PAGER KIKIS RW 02
        </p>
      </div>
    </main>
  );
}
