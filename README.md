# Proyek platform pembelajaran

Workspace bersama untuk membangun platform murid dan tutor dengan video pembelajaran serta backend, berdasarkan analisis platform referensi yang akan diberikan.

## Mulai / lanjutkan
1. Buka folder proyek ini di Codex atau Claude Code.
2. Minta alat membaca PROJECT_MEMORY.md dan AGENTS.md sebelum bekerja.
3. Untuk sesi Claude pertama, gunakan pesan dalam handoffs/START_CLAUDE.md.
4. Berikan URL referensi untuk memulai audit.
5. Sebelum pindah alat, minta pembaruan memori lalu akhiri pekerjaan sesi sebelumnya.

Memori bersama berupa file proyek; riwayat chat kedua produk tidak tersinkron otomatis. Gunakan folder yang sama atau sinkronkan seluruh perubahan sebelum berpindah komputer. Hindari dua sesi mengedit berkas yang sama pada waktu bersamaan.

## Struktur
- PROJECT_MEMORY.md: status, keputusan, progres, dan serah terima bersama.
- AGENTS.md: aturan kerja agen.
- CLAUDE.md: pintu masuk instruksi Claude Code.
- research/: inventaris platform, bukti audit, dan referensi.
- docs/: kebutuhan, arsitektur, model data, dan kebijakan proyek.
- design/: alur pengguna dan rancangan antarmuka.
- apps/web/: website + backend (Next.js). Cara menjalankan: apps/web/README.md.
- backend/: kode backend jika arsitektur memerlukan direktori terpisah.
- assets/: aset milik proyek atau yang telah diizinkan.
- tests/: pengujian yang relevan.
- handoffs/: pesan untuk melanjutkan pekerjaan.

Aplikasi utama ada di apps/web (lihat README di sana).
