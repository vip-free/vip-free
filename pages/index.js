import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${data.id}`;
    setShortUrl(fullUrl);

    // Auto copy
    navigator.clipboard.writeText(fullUrl);
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("✅ Link copied to clipboard!");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>NYEXSOBATEN</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "none",
            marginRight: "10px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background: "gray",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          SHORTEN
        </button>
      </form>

      {shortUrl && (
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#61dafb" }}>
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            style={{
              background: "none",
              border: "1px solid white",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            📋
          </button>
        </div>
      )}

      <footer style={{ marginTop: "50px", fontWeight: "bold" }}>
        PAGER KIKIS RW 02
      </footer>
    </div>
  );
}
