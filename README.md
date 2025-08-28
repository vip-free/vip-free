# NYEXSOBATEN — Shortlink (Vercel + Upstash KV)

UI sesuai gambar (judul **NYEXSOBATEN**, tombol **SHORTEN**, footer **PAGER KIKIS RW 02**). App Router Next.js 14. Penyimpanan shortlink memakai Upstash Redis (REST).

## Deploy

1. Import ZIP ini ke Vercel (New Project → Import).
2. Tambah **Environment Variables** berikut di Vercel Project → Settings → Environment Variables:

```
KV_URL=rediss://...
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
REDIS_URL=rediss://...
```

> Yang penting untuk aplikasi ini: `KV_REST_API_URL` & `KV_REST_API_TOKEN`.

3. Deploy. Kunjungi `/` untuk membuat shortlink. Akses `/:slug` untuk redirect.

## API

- `POST /api/shorten` JSON `{ "url": "https://..." }` → `{ "slug": "Ab12Cd" }`
- `GET /:slug` → redirect ke URL asli.
