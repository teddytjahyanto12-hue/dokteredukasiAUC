const fs = require('fs');
const { docx, p, h1, h2, h3, bullets, numbered, note, gap, table, cover, makeDoc } = require('./helpers');
const { Packer } = docx;
const OUT = process.argv[2];
const C = [];

const DISCLAIMER = 'Fitur ini dibuat untuk membantu belajar. Keputusan klinis tetap di tangan dokter yang menangani pasien. Hasil perhitungan dapat salah, sehingga perlu diverifikasi dengan sumber guideline terlebih dahulu sebelum digunakan.';

C.push(...cover('RANCANGAN FITUR', 'Medical Cheatsheet & Calculator', 'Fitur kalkulator medis dengan penjelasan belajar di jalur Clinical Practice, Dokter Edukasi Academy', [
  ['Versi', 'Draf 1, 12 Oktober 2026'],
  ['Status', 'Usulan untuk ditinjau pemilik. Belum menjadi keputusan final.'],
  ['Disusun oleh', 'Claude Code'],
  ['Dasar', 'Arahan pemilik 12 Okt 2026; studi SPARK Medical (research/Framework Sparkmedical/); rencana eksekusi (docs/RENCANA_EKSEKUSI_DOKTER_EDUKASI.md)'],
  ['Purwarupa', '2 kalkulator: GCS dan HPL/Usia Kehamilan, di /cheatsheet (aplikasi lokal)'],
]));

// 1
C.push(h1('1. Tujuan dan Posisi Fitur'));
C.push(p('Kategori **Medical Cheatsheet** di jalur **Clinical Practice** diperluas menjadi **Medical Cheatsheet & Calculator**: kumpulan kalkulator dan skor klinis yang **cepat dipakai** dan **langsung disertai penjelasan belajar** di bawahnya.'));
C.push(h3('Masalah yang diselesaikan'));
C.push(...bullets([
  'Koas dan dokter muda perlu menghitung skor dengan cepat di bangsal, tetapi juga perlu **memahami** cara dan alasannya untuk ujian (UKMPPD/OSCE).',
  'Alat kalkulator yang ada (contoh SPARK) unggul untuk praktik, tetapi tidak terhubung dengan materi belajar.',
]));
C.push(h3('Pembeda Dokter Edukasi'));
C.push(table(['Aspek', 'Alat kalkulator biasa', 'Medical Cheatsheet & Calculator'], [
  ['Hasil', 'Angka + kategori', 'Angka + kategori + teks siap salin'],
  ['Penjelasan', 'Rumus singkat', 'Interpretasi, langkah hitung, jebakan ujian, latihan kasus'],
  ['Hubungan materi', 'Tidak ada', 'Tautan ke video, kuis, dan cheatsheet terkait'],
  ['Bukti', 'Sumber disebut', 'Sumber + dokumen validasi dokter (DOCX) + nama peninjau dan tanggal'],
], [22, 36, 42]));
C.push(gap());
C.push(h3('Sasaran pengguna'));
C.push(...bullets(['Koas (stase klinis)', 'Peserta UKMPPD / internsip', 'Dokter umum muda', 'Pengunjung umum dari pencarian Google (pintu masuk pemasaran)']));

// 2
C.push(h1('2. Prinsip yang Disepakati'));
C.push(...numbered([
  '**Sumber utama adalah guideline, jurnal primer, dan PPK/PNPK Kemenkes.** SPARK hanya dipakai sebagai catatan pembanding (daftar tool, cara tampil), bukan sumber isi.',
  '**Dibuat sendiri.** Teks, rumus dalam kode, desain, dan contoh kasus ditulis sendiri. Teks dan kode SPARK tidak disalin.',
  '**Ikuti struktur SPARK, lalu modifikasi** dengan versi Dokter Edukasi: penjelasan belajar, latihan, dan tautan materi.',
  '**Setiap kalkulator wajib divalidasi dokter** dengan dokumen bukti DOCX (sumber, tautan, cuplikan, penjelasan, uji kasus) sebelum terbit.',
  '**Disclaimer wajib** tampil di setiap kalkulator.',
  '**Gaya teks situs**: tanpa tanda pisah panjang (em-dash) dan tanpa kata sapaan orang kedua, mengikuti aturan situs yang berlaku.',
]));
C.push(h3('Teks disclaimer (dipakai di setiap kalkulator)'));
C.push(note(DISCLAIMER));

// 3
C.push(h1('3. Alur dan Struktur Halaman'));
C.push(h2('3.1 Pintu masuk'));
C.push(...bullets([
  'Jalur **Clinical Practice** → kartu kategori **Medical Cheatsheet & Calculator** → tombol "Buka kalkulator".',
  'Alamat langsung yang pendek: **/cheatsheet** (beranda fitur) dan **/cheatsheet/<nama>** (mis. /cheatsheet/gcs, /cheatsheet/hpl).',
  'Fase berikutnya: tautan di menu atas dan kotak pencarian situs.',
]));
C.push(h2('3.2 Beranda fitur (/cheatsheet)'));
C.push(...bullets([
  'Judul, deskripsi singkat, dan disclaimer ringkas.',
  '**Kotak cari** (nama skor, singkatan, atau nama kondisi; mis. "koma", "hamil", "gcs").',
  '**Filter bidang**: Emergensi, Obstetri & Ginekologi, Anak, Penyakit Dalam, Neurologi, Bedah, dan seterusnya.',
  '**Terakhir dipakai** dan **Favorit** (disimpan di perangkat; fase 2 tersimpan di akun).',
  'Kartu kalkulator: nama, bidang, deskripsi satu baris, label status validasi ("Tervalidasi" / "Draf, belum divalidasi").',
]));
C.push(h2('3.3 Halaman satu kalkulator'));
C.push(table(['Urutan', 'Bagian', 'Isi'], [
  ['1', 'Kepala', 'Nama, bidang, label status validasi, tombol Favorit'],
  ['2', 'Kalkulator', 'Input tombol/angka; hasil langsung tanpa tombol hitung'],
  ['3', 'Hasil', 'Angka, kategori berwarna, teks siap salin (tombol Salin), tombol Ulangi'],
  ['4', 'Interpretasi', 'Arti hasil dan tindak lanjut umum menurut sumber'],
  ['5', 'Cara menghitung', 'Langkah demi langkah memakai angka yang sedang diisi'],
  ['6', 'Jebakan ujian & catatan klinis', 'Hal yang sering salah (mis. GCS pada pasien terintubasi)'],
  ['7', 'Latihan kasus', '3–5 skenario singkat dengan pembahasan'],
  ['8', 'Materi terkait', 'Tautan ke video/kuis/cheatsheet Dokter Edukasi'],
  ['9', 'Sumber', 'Daftar rujukan primer dengan tautan, edisi, dan halaman'],
  ['10', 'Validasi', 'Nama dokter peninjau, tanggal, versi dokumen validasi'],
  ['11', 'Disclaimer', 'Teks disclaimer lengkap'],
], [10, 25, 65]));

// 4
C.push(h1('4. Daftar Kalkulator Bertahap'));
C.push(p('Dipilih berdasarkan: sering dipakai koas, sering muncul di UKMPPD, risiko rendah, dan ada sumber primer yang jelas. **Kalkulator dosis obat ditunda** karena risikonya paling tinggi.'));
C.push(h2('4.1 Fase 1 (15 kalkulator)'));
C.push(table(['No', 'Kalkulator', 'Bidang', 'Sumber primer (rencana)', 'Ada di SPARK'], [
  ['1', 'Glasgow Coma Scale (GCS)', 'Emergensi/Neuro', 'Teasdale & Jennett, Lancet 1974; glasgowcomascale.org', 'Ya'],
  ['2', 'HPL & Usia Kehamilan', 'Obsgyn', 'ACOG Committee Opinion 700 (2017); aturan Naegele', 'Ya'],
  ['3', 'IMT dewasa (Asia-Pasifik)', 'Umum', 'WHO WPRO 2000; klasifikasi IMT Kemenkes', 'Ya'],
  ['4', 'Mean Arterial Pressure', 'Emergensi', 'Rumus fisiologi standar; target Sepsis-3 (Singer, JAMA 2016)', 'Ya'],
  ['5', 'qSOFA', 'Emergensi', 'Singer dkk., JAMA 2016', 'Ya'],
  ['6', 'CURB-65', 'Paru', 'Lim dkk., Thorax 2003', 'Ya'],
  ['7', 'Luas luka bakar (Rule of 9) + cairan Parkland', 'Bedah/Emergensi', 'ATLS; Baxter 1968; pedoman luka bakar', 'Ya'],
  ['8', 'Cairan rumatan Holliday-Segar', 'Anak', 'Holliday & Segar, Pediatrics 1957', 'Ya'],
  ['9', 'Derajat dehidrasi WHO', 'Anak', 'WHO/MTBS; Buku Saku Pelayanan Kesehatan Anak di RS', 'Ya'],
  ['10', 'Skor TB anak', 'Anak', 'Petunjuk Teknis Manajemen TB Anak, Kemenkes', 'Ya'],
  ['11', 'Bishop Score', 'Obsgyn', 'Bishop, Obstet Gynecol 1964', 'Ya'],
  ['12', 'eGFR CKD-EPI 2021', 'Penyakit Dalam', 'Inker dkk., NEJM 2021', 'Ya'],
  ['13', 'Alvarado', 'Bedah', 'Alvarado, Ann Emerg Med 1986', 'Ya'],
  ['14', 'APGAR', 'Anak/Obsgyn', 'Apgar 1953; AAP/ACOG', 'Sebagian (di SOAP)'],
  ['15', 'Centor / McIsaac', 'THT', 'McIsaac dkk., CMAJ 1998', 'Ya'],
], [5, 26, 15, 40, 14]));
C.push(gap());
C.push(h2('4.2 Fase 2'));
C.push(p('Status gizi anak WHO (z-score, perlu tabel LMS), koreksi natrium & kalium, analisis gas darah, Siriraj & Hasanuddin, NIHSS, Downe, New Ballard, CHA₂DS₂-VASc, Wells DVT/PE, Child-Pugh, HEART, Killip & NYHA, Klasifikasi Dengue WHO, Poedji Rochjati, KPSP.'));
C.push(h2('4.3 Fase 3'));
C.push(...bullets(['Cheatsheet PDF per topik dan tanya-jawab AI berbasis isi cheatsheet (sesuai rencana awal)', 'Bank latihan kasus dengan skor', 'Pemasangan ke layar HP (PWA) dan mode luring', 'Kalkulator dosis obat (setelah ada validator farmasi/klinis)']));

// 5
C.push(h1('5. Akses dan Model Penjualan'));
C.push(table(['Tingkat', 'Yang didapat', 'Tujuan'], [
  ['Gratis, tanpa login', 'Semua kalkulator, hasil, teks salin, interpretasi singkat, sumber, disclaimer', 'Menarik pengunjung dari Google dan media sosial; cepat dipakai'],
  ['Premium (paket berbayar)', 'Cara menghitung langkah demi langkah, jebakan ujian, latihan kasus + pembahasan, cheatsheet PDF, tautan materi lengkap, favorit tersimpan di akun', 'Alasan berlangganan; memakai paket yang sudah ada "Clinical Practice: Medical Cheatsheet" dan "Clinical Practice Lengkap"'],
  ['Institusi', 'Akun massal per angkatan/kampus', 'Penjualan grosir'],
], [20, 50, 30]));
C.push(gap());
C.push(note('Keputusan harga ada di tangan pemilik. Pada purwarupa, semua bagian ditampilkan terbuka dan diberi tanda bagian mana yang rencananya Premium.', 'EAF2FB', '2E75B6'));

// 6
C.push(h1('6. Akses Cepat'));
C.push(...bullets([
  'Alamat pendek dan mudah diingat (/cheatsheet/gcs).',
  'Hasil langsung tanpa tombol hitung; tombol Salin satu klik.',
  'Tampilan ramah HP: tombol besar, satu kolom.',
  'Terakhir dipakai dan Favorit di beranda fitur.',
  'Fase 3: dipasang ke layar HP (PWA), tetap jalan saat sinyal buruk.',
]));

// 7
C.push(h1('7. Proses Validasi'));
C.push(h2('7.1 Alur status'));
C.push(table(['Status', 'Arti', 'Tampil di situs'], [
  ['Draf', 'Kalkulator dibuat, dokumen validasi disusun', 'Label "Draf, belum divalidasi" (hanya untuk uji internal)'],
  ['Ditinjau', 'Dokumen validasi diperiksa dokter', 'Tidak terbit'],
  ['Tervalidasi', 'Dokter menyetujui, tanda tangan dan tanggal di dokumen', 'Label "Tervalidasi oleh dr. … (tanggal)"'],
  ['Perlu tinjau ulang', 'Guideline berubah atau sudah 12 bulan', 'Label peringatan'],
], [18, 42, 40]));
C.push(gap());
C.push(h2('7.2 Isi dokumen validasi (DOCX, satu bab per kalkulator)'));
C.push(...numbered([
  'Identitas: nama kalkulator, versi, tanggal, penyusun.',
  'Sumber primer: judul, penulis, tahun, edisi, halaman/tabel, **tautan**.',
  '**Cuplikan tangkapan layar** bagian sumber yang dipakai (tabel skor, rumus).',
  'Penjelasan: bagaimana sumber diterjemahkan menjadi rumus dan kategori di aplikasi, termasuk keputusan yang tidak diatur sumber.',
  '**Tabel uji kasus**: input → hasil yang diharapkan menurut sumber → hasil aplikasi → cocok/tidak.',
  'Pembanding SPARK (catatan): persamaan dan perbedaan.',
  'Teks yang tampil di situs (interpretasi, jebakan, latihan) untuk diperiksa.',
  'Lembar persetujuan: nama dokter, nomor STR (opsional), keputusan (setuju/revisi), catatan, tanggal, tanda tangan.',
], 'n2'));
C.push(h2('7.3 Pengaman teknis'));
C.push(...bullets([
  'Rumus dipisah dari tampilan dan diberi **tes otomatis** dari tabel uji kasus, supaya angka tidak berubah diam-diam saat kode diperbarui.',
  'Setiap kalkulator mencatat versi dan tanggal validasi di kode.',
]));

// 8
C.push(h1('8. Rancangan Teknis'));
C.push(table(['Bagian', 'Rancangan'], [
  ['Lokasi kode', 'apps/web/src/lib/calculators/ (rumus murni + data konten per kalkulator), apps/web/src/components/calculators/ (tampilan), apps/web/src/app/cheatsheet/ (halaman)'],
  ['Data', 'Fase 1: definisi kalkulator dan teks penjelasan disimpan di kode (terkontrol versi, mudah diuji). Fase 2: teks penjelasan dipindah ke database agar bisa diedit admin.'],
  ['Database', 'Purwarupa tidak mengubah skema. Fase 2 butuh tabel favorit/riwayat per akun dan status validasi.'],
  ['Akses Premium', 'Memakai pengecekan paket yang sudah ada (accessibleCategoryIds untuk kategori medical-cheatsheet).'],
  ['SEO', 'Judul dan deskripsi halaman per kalkulator agar mudah ditemukan di Google.'],
  ['Tes', 'Skrip tes rumus memakai tsx (pola yang sama dengan tes yang sudah ada).'],
  ['Koordinasi', 'Hanya berkas baru + satu tautan di halaman jalur, agar tidak bertabrakan dengan pekerjaan SR-MA yang sedang berjalan.'],
], [22, 78]));

// 9
C.push(h1('9. Purwarupa yang Dibuat Sekarang'));
C.push(...bullets([
  '**/cheatsheet**: beranda fitur dengan daftar kalkulator, cari, filter bidang, terakhir dipakai, dan kartu "Segera hadir" untuk 13 kalkulator Fase 1 lainnya.',
  '**/cheatsheet/gcs**: Glasgow Coma Scale lengkap dengan pilihan NT (tidak dapat dinilai), bilah hasil menempel di layar HP, hasil, teks salin, interpretasi, cara menghitung, jebakan ujian, 3 latihan kasus, sumber, disclaimer.',
  '**/cheatsheet/hpl**: HPL & Usia Kehamilan dari HPHT, USG, atau transfer embrio (ACOG CO 700), dengan Naegele sebagai pembanding manual, interpretasi trimester/aterm, cara menghitung, jebakan, latihan, sumber, disclaimer.',
  'Dokumen validasi DOCX untuk kedua kalkulator berisi sumber, tautan, cuplikan layar, penjelasan, dan uji kasus, berstatus **Draf** sampai ditandatangani dokter.',
]));

// 10
C.push(h1('10. Risiko dan Mitigasi', false));
C.push(table(['Risiko', 'Mitigasi'], [
  ['Salah hitung berdampak pada pasien', 'Validasi dokter, tes otomatis, disclaimer, dosis obat ditunda'],
  ['Pelanggaran hak cipta', 'Teks dan kode ditulis sendiri; tabel skor berupa fakta dikutip dengan sumber; tidak menyalin SPARK'],
  ['Guideline berubah', 'Tanggal tinjau ulang 12 bulan; label "Perlu tinjau ulang"'],
  ['Disalahpahami sebagai alat diagnosis', 'Disclaimer di setiap halaman; penekanan "alat bantu belajar"'],
], [35, 65]));

// 11
C.push(h1('11. Keputusan yang Dibutuhkan dari Pemilik', false));
C.push(...numbered([
  'Nama final kategori: "Medical Cheatsheet & Calculator" (usulan) atau nama lain.',
  'Pembagian Gratis vs Premium dan harganya.',
  'Daftar Fase 1 final (tambah/kurangi).',
  'Nama dokter validator untuk tiap bidang.',
  'Apakah kalkulator boleh dibuka tanpa login (disarankan ya, untuk pemasaran).',
], 'n3'));

Packer.toBuffer(makeDoc('Rancangan Medical Cheatsheet & Calculator', 'Rancangan Medical Cheatsheet & Calculator · Dokter Edukasi Academy', C))
  .then(b => { fs.writeFileSync(OUT, b); console.log('written', b.length); });
