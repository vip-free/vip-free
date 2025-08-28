import { useState } from "react";

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
    setShortUrl(data.shortUrl);
    if (data.shortUrl) {
      navigator.clipboard.writeText(data.shortUrl);
      alert("✅ Shortlink berhasil dibuat & sudah disalin!");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="url"
          required
          placeholder="Masukkan URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "gray", color: "white", fontWeight: "bold" }}>
          SHORTEN
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: "1rem" }}>
          <span>{shortUrl}</span>
          <button onClick={() => navigator.clipboard.writeText(shortUrl)} style={{ marginLeft: "0.5rem", background: "none", border: "1px solid white", color: "white", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
}