# Riset payment gateway Duitku

Tanggal: 28 September 2026. Status proyek: ../PROJECT_MEMORY.md.

## Bukti Auctus dari pengguna
Pengguna mengirim dua screenshot. Gambar pertama menampilkan checkout Auctus dengan pilihan paket, ringkasan, voucher, akses yang telah dimiliki, upgrade dan tombol pembayaran. Gambar kedua menampilkan merchant AUCTUS pada domain app-prod.duitku.com, path /redirect_checkout, serta logo Duitku. Kesimpulan: transaksi yang ditunjukkan memakai Duitku. Ini tidak membuktikan semua transaksi Auctus hanya memakai satu penyedia.

Metode yang terlihat: BSI, Mandiri, BNI, BRI, Permata, CIMB Niaga VA. Biaya pada gambar Rp3.000 kecuali Mandiri Rp4.000; item EKG Pro Rp349.000. Status pembayaran berhasil tidak ditampilkan. Identitas pelanggan, referensi transaksi dan URL pembayaran pribadi tidak disalin ke dokumen.

## Integrasi resmi
[Duitku Pop](https://docs.duitku.com/pop/id/) menyediakan invoice, paymentUrl untuk redirect, callback server, serta sandbox. Pola URL screenshot sesuai pendekatan redirect tersebut; kode Auctus belum diperiksa. Callback browser/return URL tidak boleh menjadi dasar menandai pesanan lunas. Integrasi memerlukan kode merchant dan API key.

## Tarif publik saat diperiksa
[Daftar harga](https://www.duitku.com/harga/): VA lainnya Rp3.000, Mandiri Rp4.000, BCA Rp5.000, QRIS 0,7%, kartu 2,9%+Rp2.500. OVO digital 3,03%, ShopeePay digital 4%. Halaman menyatakan harga termasuk PPN; tarif/ketersediaan aktual perlu diperiksa pada akun merchant. FAQ harga menyebut refund ditangani merchant; jangan menjanjikan refund otomatis terintegrasi tanpa verifikasi tambahan.

## Pendaftaran
[FAQ Duitku](https://www.duitku.com/frequently-asked-questions/) menjelaskan sandbox, aktivasi production, dan dokumen merchant personal dengan nama konsisten pada KTP, NPWP dan rekening. Persyaratan perusahaan lebih lengkap. FAQ juga mengategorikan kelas online sebagai produk digital untuk tarif OVO. Tidak ada pendaftaran atau dokumen pribadi dikirim pada sesi riset ini.

## Usulan untuk proyek
Duitku menjadi kandidat yang sesuai untuk meniru pola checkout ini, belum keputusan final pengguna. Buat checkout milik proyek, kirim invoice dari server, buka halaman gateway, lalu perbarui pesanan dan entitlement setelah konfirmasi sah. Periksa signature, kecocokan order/nominal, dan proses notifikasi secara idempotent; simpan API key hanya di server.

Uji sandbox: pembayaran berhasil/gagal/kedaluwarsa, callback berulang/terlambat, nominal tidak cocok, refresh halaman, dan pesanan beberapa produk. Tentukan siapa menanggung biaya per kanal, aturan diskon/upgrade, pencairan, dan refund sebelum production. Implementasi belum dimulai.
