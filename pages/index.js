import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", fontFamily: "Arial", background: "#020617", height: "100vh", color: "white" }}>
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>NYEXSOBATEN</h1>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "12px", borderRadius: "10px", width: "300px", marginTop: "20px", color: "black" }}
      />
      <button onClick={handleShorten} style={{ marginTop: "20px", padding: "12px 24px", background: "#9ca3af", borderRadius: "10px", fontWeight: "bold" }}>
        SHORTEN
      </button>
      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue" }}>{shortUrl}</a>
        </p>
      )}
      <footer style={{ position: "absolute", bottom: "30px", fontWeight: "bold" }}>PAGER KIKIS RW 02</footer>
    </div>
  );
}
