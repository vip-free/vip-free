import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0b0d18", color: "white" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: "none", width: "300px", marginBottom: "1rem", color: "black" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1.5rem", borderRadius: "8px", background: "gray", color: "white", border: "none", cursor: "pointer" }}>
          SHORTEN
        </button>
      </form>
      {shortUrl && (
        <p style={{ marginTop: "1rem" }}>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: "cyan" }}>
            {shortUrl}
          </a>
        </p>
      )}
      <footer style={{ marginTop: "2rem", fontSize: "1.2rem" }}>PAGER KIKIS RW 02</footer>
    </div>
  );
}
