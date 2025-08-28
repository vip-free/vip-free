'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setShort('');
    let to = url.trim();
    if (!/^https?:\/\//i.test(to)) {
      to = 'https://' + to;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: to })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setShort(`${origin}/${data.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{textAlign:'center', maxWidth: 900, width:'100%'}}>
        <h1 style={{fontSize: '80px', lineHeight: 1.0, margin: '0 0 40px 0', letterSpacing: 2, fontWeight: 800}}>
          NYEXSOBATEN
        </h1>

        <form onSubmit={onSubmit} style={{display:'grid', gap: 20, justifyItems:'center'}}>
          <input
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            placeholder="https://example.com"
            style={{
              width: '70%',
              minWidth: 320,
              padding: '22px 24px',
              borderRadius: 12,
              border: 'none',
              outline: 'none',
              fontSize: 26,
              color: '#0b1223'
            }}
          />
          <button
            disabled={loading || !url.trim()}
            style={{
              backgroundColor: '#8f98a3',
              color: 'white',
              border: 'none',
              padding: '16px 28px',
              borderRadius: 12,
              fontSize: 30,
              fontWeight: 800,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading || !url.trim() ? 0.8 : 1
            }}
          >
            {loading ? 'WORKING…' : 'SHORTEN'}
          </button>
        </form>

        {error && <p style={{color:'#ff8b8b', marginTop:20}}>{error}</p>}

        {short && (
          <div style={{marginTop: 28}}>
            <p style={{fontSize: 22, marginBottom: 10}}>Your shortlink:</p>
            <div style={{display:'flex', gap:10, justifyContent:'center', alignItems:'center'}}>
              <code style={{background:'#11172a', padding:'10px 14px', borderRadius:10, fontSize:18}}>{short}</code>
              <button onClick={()=>navigator.clipboard.writeText(short)} style={{padding:'10px 14px', borderRadius:10, border:'1px solid #2b3558', background:'#0c1430', color:'white', cursor:'pointer'}}>Copy</button>
            </div>
          </div>
        )}

        <div style={{marginTop: 60, fontSize: 44, fontWeight: 800, letterSpacing: 1}}>
          PAGER KIKIS RW 02
        </div>
      </div>
    </main>
  );
}
