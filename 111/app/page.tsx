export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">NYEXSOBATEN Shortlink</h1>
      <form action="/api/shorten" method="post" className="flex gap-2 w-full max-w-md">
        <input
          type="url"
          name="url"
          placeholder="Masukkan URL panjang..."
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded"
        >
          SHORTEN
        </button>
      </form>
    </main>
  );
}
