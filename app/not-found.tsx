export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Link Tidak Ditemukan</h1>
      <p className="mb-6">Link yang kamu cari tidak ada atau sudah dihapus.</p>
      <a href="/" className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
        Kembali ke Beranda
      </a>
    </div>
  );
}
