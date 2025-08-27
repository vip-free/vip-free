'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/short', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(window.location.origin + '/' + data.slug);
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', width: '300px', fontSize: '1rem', color: '#000' }}
        />
        <button type="submit" style={{ padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', background: '#888', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          SHORTEN
        </button>
      </form>
      {shortUrl && (
        <p style={{ marginTop: '1rem' }}>Shortlink: <a href={shortUrl} style={{ color: '#4fc3f7' }}>{shortUrl}</a></p>
      )}
      <footer style={{ marginTop: '2rem', fontWeight: 'bold' }}>PAGER KIKIS RW 02</footer>
    </main>
  );
}
