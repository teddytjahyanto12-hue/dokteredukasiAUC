# Akses website mini PC melalui LAN MikroTik

Alamat semua PC: http://192.168.88.251:3000

`localhost:3000` menunjuk komputer yang sedang dipakai. Dari PC utama, PING2 atau Lenovo, gunakan alamat IP mini PC di atas atau klik `Buka Website dari PC Lain.url`.

Pada mini PC DESKTOP-CH10VNS, tutup jendela server lama, lalu jalankan `Jalankan Website LAN Mini PC.bat`. Peluncur tersebut mengaktifkan DEA_LAN_HTTP=true dan alamat tautan email APP_URL khusus LAN, lalu menjalankan build produksi stabil yang bind 0.0.0.0 port3000. Jangan jalankan peluncur server di PC klien. Tidak ada reset/seed database.

Mode LAN mempertahankan HttpOnly/SameSite cookie. Secure cookie hanya dikecualikan ketika mode LAN eksplisit aktif dan Host adalah localhost/127.0.0.1/192.168.88.x. Host publik tetap memakai Secure pada produksi. Akses HTTP LAN ini untuk jaringan internal tepercaya; penggunaan publik memerlukan HTTPS dan peluncur produksi tanpa mode LAN. Tidak membuat port forwarding/WAN atau membuka folder/database ke internet.

Pemeriksaan 15 Oktober 2026: PC utama192.168.88.254 bisa GET mini PC192.168.88.251:3000 HTTP200 melalui Ethernet MikroTik. Rute192.168.88.0/24 on-link. Ini bukan bukti seluruh browser PC klien telah diuji. Firewall mini PC sudah meloloskan permintaan ini; aturan router/firewall tidak diubah. IP mini PC berasal catatan jaringan dan koneksi aktual, reservasi DHCP belum diverifikasi; jika IP berubah alamat perlu diperbarui atau DHCP dibuat tetap.

Uji login: jalankan `$env:LAN_TEST_URL="http://192.168.88.251:3000"; node tests/lan-login-http.mjs` dari lingkungan aplikasi dengan DB yang sama. Tes membuat akun sementara, memastikan cookie/login dan halaman akun, lalu menghapus akun uji. Jangan mencetak cookie/token. Dari browser PC lain, coba login akun sendiri dan buka materi.

Pembaruan16 Oktober: login/registrasi sukses memakai history replace sehingga Back tidak mampir ke form login. Katalog menyimpan posisi kartu per halaman/filter di sessionStorage maksimal30menit, memulihkan tanpa animasi saat kembali, dan tetap berfungsi bila storage browser ditolak. Cookie tidak dibagikan antara localhost,IP,dan hostname; gunakan alamat LAN yang sama secara konsisten.

Verifikasi build .next-lan-navigation-20261016 (BuildID F4OM1WD8LCIFDZ_vk9Yky): TypeScript,lint cakupan,dan build produksi penuh lulus. Tes login HTTP preview3009 lulus pada localhost dan IP LAN .254; Host publik tetap Secure. QA browser: login akun sementara ke materiToolkit,Back sekali kembali ke katalog posisiToolkit; batal loginBack sekali juga kembali tepat. Akun sementara sudah dibersihkan setelah QA. PenampilPDF dan gerbang80 tidak diedit. Runtime mini PC menunggu aktivasi build dan tes alamat .251:3000.

Status 2026-10-16 07:25 WIB: pengguna menyatakan mini PC belum dijalankan ulang. Tes pada server .251 mengonfirmasi cookie produksi lama masih Secure melalui HTTP, sehingga sesi browser LAN tidak tersimpan. Build baru telah disalin lengkap dan bundle login cocok hash staging, tetapi belum aktif. Setelah restart lewat Server Selalu Aktif.bat, jalankan kembali tes login LAN. Akun uji sudah dibersihkan; database pengguna tidak diganti.
