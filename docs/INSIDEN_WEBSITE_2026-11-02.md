# Gangguan website publik 2 November 2026



## 2026-11-02 22:33 WIB - Codex pemulihan website: titik gangguan WAN
- Terverifikasi dari WebFig RouterOS 7.21.4: ether1 DHCP 192.168.1.100/24, DHCP/gateway/DNS 192.168.1.14; default route ke gateway itu. Ping gateway berhasil 3/3, ping 192.168.1.1 dan 1.1.1.1 gagal, termasuk sumber eksplisit 192.168.1.100. ARP 192.168.1.1 failed; gateway MAC 3C:84:6A:83:EA:7D reachable.
- Alamat statis lama 192.168.1.5 masih ada di ether1 dan sama dengan Wi-Fi PC; belum diubah. Kegagalan juga terjadi dengan sumber DHCP .100 sehingga konflik ini belum terbukti menjadi satu-satunya penyebab. Tidak ada perubahan konfigurasi MikroTik.
- Dugaan: uplink/extender kehilangan koneksi upstream; identitas/status Wi-Fi perangkat belum terverifikasi. Tool fetch RouterOS ditolak device-mode; pembatasan tidak diubah. Forwarder loopback diagnostik sementara telah dihentikan, tidak ada helper latar belakang ditinggalkan.
- Menunggu bantuan fisik pengguna: nyalakan ulang perangkat yang terhubung ke ether1 saja, tanpa reset pabrik; lalu uji WAN, DNS container dan domain publik. Website publik belum pulih. NAS DNS manual tetap 1.1.1.1/8.8.8.8; data aplikasi tidak disentuh.
- Git fetch: HEAD=origin/main=5b3609e, 0/0; perubahan materi/kode sesi lain dipertahankan. Catatan rinci docs/INSIDEN_WEBSITE_2026-11-02.md. Klaim aktif Codex sesi ini dilepas sambil menunggu tindakan fisik.

## Tindakan yang sudah dilakukan
- Restart paket Container Manager selesai; website LAN kembali HTTP200, publik masih HTTP530/Cloudflare1033.
- DNS host NAS diganti dari otomatis 192.168.88.1 menjadi manual 1.1.1.1 dan 8.8.8.8; tersimpan. Restart tunnel tidak menyelesaikan gangguan.
- Runtime tunnel sudah HTTP2 dari perbaikan sesi sebelumnya. Log timeout DNS SRV melalui Docker127.0.0.11.
- Uji PC dipaksa Ethernet17 ke1.1.1.1:443 timeout; Wi-Fi4 berhasil. Ini membedakan jalur PC dari jalur NAS.
- Komposisi deploy/nas/docker-compose.yml yang diubah sesi sebelumnya tetap belum di-commit; tidak dinyatakan memperbaiki masalah karena WAN masih gagal. Database/storage dan kode aplikasi tidak diubah sesi diagnosis.

## Verifikasi sesudah uplink pulih
1. MikroTik mencapai internet dan DNS normal.
2. Container cloudflared mencatat tunnel connected tanpa restart berulang.
3. https://dokteredukasi.com dan www menampilkan website, bukan1033.
4. Rekonsiliasi konfigurasi compose yang sudah diuji, baru commit perubahan terkait.
