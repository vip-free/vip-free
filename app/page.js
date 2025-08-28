export default function Home() {
  async function handleSubmit(e) {
    e.preventDefault();
    const url = e.target.url.value;
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    document.getElementById("result").innerHTML =
      `<p class='mt-4 text-white'>Short URL: <a href="${data.shortUrl}" target="_blank" class="text-blue-400 underline">${data.shortUrl}</a></p>`;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">NYEXSOBATEN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
        <input
          type="url"
          name="url"
          placeholder="https://example.com"
          required
          className="w-full p-3 rounded-md text-black"
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg"
        >
          SHORTEN
        </button>
      </form>
      <div id="result" className="mt-4"></div>
      <footer className="absolute bottom-4 text-sm">PAGER KIKIS RW 02</footer>
    </main>
  );
}
