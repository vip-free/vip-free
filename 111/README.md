# NYEXSOBATEN — Shortlink (Vercel + KV)

Tampilan persis seperti preview: judul putih tebal, tombol abu-abu "SHORTEN", latar gelap, dan teks bawah "PAGER KIKIS RW 02" permanen.

## Deploy ke Vercel (tanpa kartu)
1. Buat project baru di Vercel → Import dari ZIP ini.
2. Pada **Storage → KV**, buat instance baru, lalu pergi ke **Environment Variables** dan tambahkan ke Project:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
3. Tambahkan juga env ini agar URL pendek yang dihasilkan benar:
   - `NEXT_PUBLIC_BASE_URL` → contoh: `https://nyexsobaten.vercel.app`
4. Deploy.

## Catatan
- Redirect dilakukan melalui halaman dinamis `/[id]` menggunakan `getServerSideProps`.
- Data tersimpan di Vercel KV dengan key `link:<id>`.
- Validasi URL otomatis menambahkan `https://` jika pengguna tidak menulis protokol.
