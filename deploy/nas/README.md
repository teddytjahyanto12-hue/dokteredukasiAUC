# Server website di NAS Synology

Server utama Dokter Edukasi Academy berjalan di NAS Synology (Container Manager).

| Bagian | Lokasi |
|---|---|
| Compose (Project `dokter-edukasi`) | `deploy/nas/docker-compose.yml` |
| Image | `ghcr.io/teddytjahyanto12-hue/dokteredukasi-web:latest` (dibangun GitHub Actions) |
| Database + storage live | `_server/data/` (tidak masuk Git) |
| Konfigurasi rahasia website | `_server/web.env` (tidak masuk Git) |
| Token Cloudflare Tunnel | `_server/tunnel.env` (tidak masuk Git) |
| Alamat LAN | http://192.168.88.10:3100 |

## Rilis versi baru
1. Commit + push perubahan `apps/web` ke `main`.
2. Tunggu GitHub Actions "Build image website (NAS)" selesai (±5 menit).
3. DSM > Container Manager > Project > `dokter-edukasi` > Action > Build.
   Container menyalin `dev.db.sebelum-start`, menjalankan migrasi Prisma, lalu start.

## Membuka website ke internet (Cloudflare Tunnel)
1. Domain aktif di akun Cloudflare (paket Free).
2. Cloudflare dashboard > Zero Trust > Networks > Tunnels > Create a tunnel > Cloudflared.
   Nama: `nas-dokter-edukasi`. Pilih lingkungan **Docker**, lalu salin token (teks panjang setelah `--token`).
3. Buat file `_server/tunnel.env` berisi satu baris:
   `TUNNEL_TOKEN=<token>`
   (lihat contoh `_server/tunnel.env.contoh`). Jangan menempel token di chat, dokumen, atau Git.
4. Di tunnel yang sama: Public Hostname > Add:
   - Subdomain kosong (atau `www`), Domain: domainmu
   - Service: `HTTP` `web:3000`
5. Aktifkan service `tunnel` di `docker-compose.yml` (dilakukan oleh Claude/Codex), ubah `APP_URL` di `_server/web.env`
   ke `https://domainmu`, lalu Action > Build.

## Cadangan
Backup harian (02:00) data server ke mini PC: `\\desktop-ch10vns\data bersama pc 1 pc 2\Backup Server NAS\<tanggal>`.
Mini PC bisa menjalankan website sebagai cadangan darurat (peluncur meminta konfirmasi CADANGAN; pulihkan backup terbaru dulu).
