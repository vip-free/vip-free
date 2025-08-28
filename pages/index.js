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

    // Auto copy
    navigator.clipboard.writeText(data.shortUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="container">
      <h1>NYEXSOBATEN</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />
      <button onClick={handleShorten}>SHORTEN</button>
      {shortUrl && (
        <div className="short-url">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button className="copy-btn" onClick={copyToClipboard}>📋 Copy</button>
        </div>
      )}
      <footer style={{ marginTop: "2rem", fontWeight: "bold" }}>PAGER KIKIS RW 02</footer>
    </div>
  );
}
