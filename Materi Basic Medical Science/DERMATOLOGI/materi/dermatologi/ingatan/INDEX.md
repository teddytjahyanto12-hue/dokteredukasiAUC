# Dermatologi preklinik

Status 31 Oktober 2026 WIB: 32 naskah BAB telah ditulis dan dirakit menjadi DOCX gabungan serta 32 PDF mandiri. Pemeriksaan akhir dan sinkronisasi Git dicatat setelah selesai.

## Struktur
- naskah/: sumber utama penyuntingan. Sitasi ^n^ mengikuti ingatan/nomor_sitasi.json.
- build.py: adaptasi skrip BRP-18. Merakit modul lengkap dan DOCX per BAB.
- isi_daftar_isi.py: Microsoft Word COM tersembunyi mengisi TOC lalu mengekspor PDF.
- gaya_referensi.docx: gaya Times New Roman dengan garis judul kuning.
- gambar/: 24 diagram orisinal. gambar/buku/: 8 potongan dari buku yang disediakan.
- ingatan/sumber.ris: 10 sumber. Delapan artikel mempunyai DOI dan PMID terverifikasi.
- ingatan/peta_bahasan.md: lokasi materi dan provenance gambar.
- ingatan/ekstraksi/: ekstraksi sumber dan bukti penelusuran. Tidak disinkronkan Git.
- keluaran/: hasil unduhan lokal. Tidak disinkronkan Git karena memuat gambar dari buku berlisensi.
- qa/: PNG halaman dan laporan pemeriksaan. Tidak disinkronkan Git.

## Aturan
- PDF sumber tidak disalin. Ekstraksi saja yang disimpan.
- Naskah final tidak menyebut sumber ringkasan yang dilarang pengguna. Klaim yang diambil dari peta cakupan ditulis ulang dan diperiksa pada sumber yang boleh disitasi.
- Nomor halaman sumber hanya ada pada catatan internal.
- Tidak ada dosis, statistik atau rekomendasi operasional yang diambil tanpa pemeriksaan sumber.
- Nama buku/artikel hanya muncul dalam daftar pustaka, bukan dalam tubuh modul atau sampul.
- Skrip siapkan.py hanya untuk persiapan awal dan menolak dijalankan bila naskah sudah ada. Blok materi_*.md adalah draf awal. Jangan menimpa naskah final dari draf tersebut.
- Perakitan ulang: jalankan build.py lalu isi_daftar_isi.py dengan Python runtime dokumen yang tersedia. PyMuPDF lokal digunakan untuk ekstraksi dan QA karena tidak ada pada runtime dokumen.

## Batas
Sherwood khusus kulit belum tersedia. Fisiologi pada semua BAB yang relevan didukung buku utama sehingga tidak ada BAB kosong. RPS/CPL belum tersedia. Verifikasi isi mengacu pada bagian yang digunakan dan abstrak/teks penunjang yang dicatat, bukan telaah sistematis semua edisi dan guideline terbaru.

## Final 2026-10-31 09:39 WIB
- DOCX gabungan 68 halaman. PDF gabungan 68 halaman dan 32 PDF BAB mandiri tersedia. Jumlah halaman seluruh PDF hasil 165.
- QA struktur lulus: 32 BAB, 32 gambar, 2 tabel, 10 pustaka, 8 artikel ber-DOI/PMID, TOC terisi, sitasi bagian wajib hadir, tidak ada nama terlarang/penyebutan AI/placeholder/em dash dalam hasil.
- Semua halaman hasil dirender untuk inspeksi. Daftar poin, tinggi gambar, pemenggalan halaman dan daftar jawaban BAB 32 diperbaiki lalu diperiksa ulang.
- ZIP 32 PDF diuji CRC dan SHA256 setiap entri cocok dengan hasil final.
- Ekspor menggunakan Microsoft Word COM. Tidak memakai LibreOffice desktop atau menyalin PDF sumber.
- Sisa pekerjaan: tidak ada BAB tertunda. Pemetaan RPS dan penambahan sumber Sherwood memerlukan berkas yang belum tersedia.
