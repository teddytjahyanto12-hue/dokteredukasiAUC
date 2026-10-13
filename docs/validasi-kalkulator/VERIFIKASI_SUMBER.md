# Log verifikasi sumber Kalkulator Medis

Catatan kerja verifikasi (Claude Code, mulai 12 Okt 2026). SPARK Medical dipakai sebagai acuan daftar tool dan perilaku yang sudah dipakai klinis; logika setiap kalkulator dicocokkan ke sumber primer. Perbedaan dengan SPARK dicatat di bagian "Perbedaan" dan dilaporkan ke pemilik sebelum kalkulator terkait dibuat.

Status: TERKONFIRMASI = cocok dengan sumber yang dibaca langsung; PERLU DOKUMEN = sumber asli belum bisa diakses daring; BERBEDA = ada selisih dengan SPARK.

## Sitasi primer yang dikonfirmasi lewat PubMed (12 Okt 2026)
| Skor | Sitasi | PMID | DOI | Isi yang terkonfirmasi dari abstrak |
|---|---|---|---|---|
| Alvarado | Alvarado A. Ann Emerg Med 1986;15:557-64 | 3963537 | 10.1016/s0196-0644(86)80993-3 | 8 faktor prediktif (abstrak tidak memuat bobot/batas) |
| CURB-65 | Lim WS dkk. Thorax 2003;58:377 | 12728155 | | sitasi |
| qSOFA | Singer M dkk. JAMA 2016;315:801 | 26903338 | | sitasi |
| SIRS | Bone RC dkk. Chest 1992;101:1644 | 1303622 | | sitasi |
| CKD-EPI 2021 | Inker LA dkk. NEJM 2021;385:1737 | 34554658 | | sitasi |
| Cockcroft-Gault | Cockcroft DW, Gault MH. Nephron 1976;16:31 | 1244564 | | sitasi |
| Centor/McIsaac | McIsaac WJ dkk. CMAJ 1998;158:75-83 | 9475915 | | skor 0–4, umur 3–76 th |
| NOSE | Stewart MG dkk. Otolaryngol HNS 2004;130:157 | 14990910 | | sitasi |
| Kelas NOSE | Lipan MJ, Most SP. JAMA Facial Plast Surg 2013;15:358-61 | 23846399 | 10.1001/jamafacial.2013.344 | ringan 5–25, sedang 30–50, berat 55–75, ekstrem 80–100 |
| RSI | Belafsky PC dkk. J Voice 2002;16:274 | 12150380 | | sitasi |
| STOP-BANG | Chung F dkk. Anesthesiology 2008;108:812 | 18431116 | | sitasi |
| Siriraj | Poungvarin N dkk. BMJ 1991;302:1565-7 | 1855041 | 10.1136/bmj.302.6792.1565 | rumus (2,5×kesadaran)+(2×muntah)+(2×nyeri kepala)+(0,1×diastolik)−(3×ateroma)−12; >1 perdarahan, <−1 infark, −1..1 meragukan |
| ABCD² | Johnston SC dkk. Lancet 2007;369:283-92 | 17258668 | 10.1016/S0140-6736(07)60150-0 | usia ≥60 (1), TD ≥140/90 (1), lemah sesisi (2), bicara tanpa lemah (1), durasi ≥60 (2)/10–59 (1), DM (1); risiko 0–3 rendah, 4–5 sedang, 6–7 tinggi |
| FOUR | Wijdicks EF dkk. Ann Neurol 2005;58:585 | 16178024 | | sitasi |
| New Ballard | Ballard JL dkk. J Pediatr 1991;119:417-23 | 1880657 | 10.1016/s0022-3476(05)82056-6 | rentang UK 20–44 minggu |
| VBAC | Flamm BL, Geiger AM. Obstet Gynecol 1997;90:907-10 | 9397100 | 10.1016/s0029-7844(97)00531-0 | 5 variabel; keberhasilan 49% (skor 0–2) s.d. 95% (8–10) |
| Bishop | Bishop EH. Obstet Gynecol 1964;24:266 | 14199536 | | sitasi |
| Berlin ARDS | ARDS Definition Task Force. JAMA 2012;307:2526 | 22797452 | | sitasi (isi tabel sudah diperiksa sebelumnya) |
| Light | Light RW dkk. Ann Intern Med 1972;77:507 | 4642731 | | sitasi |
| PAT | Dieckmann RA dkk. Pediatr Emerg Care 2010;26:312-5 | 20386420 | 10.1097/PEC.0b013e3181d6db37 | alat observasi 3 komponen |
| Paradise | Paradise JL dkk. NEJM 1984;310:674 | 6700642 | | sitasi |
| Asam-basa | Berend K dkk. NEJM 2014;371:1434 | 25295502 | | sitasi |
| Holliday-Segar | Holliday MA, Segar WE. Pediatrics 1957;19:823 | 13431307 | | sitasi |

## Sumber nasional yang dibaca langsung
### PNPK Hipertensi Dewasa 2026 (KMK HK.01.07/MENKES/303/2026, ditetapkan 17 April 2026) — BERBEDA dengan SPARK
- Mengganti KMK 4634/2021 (yang dikutip SPARK).
- Tabel 2 (hal. 9) mengutip ESC 2024 Table 5: Office BP: tidak meningkat <120/70; meningkat 120/70–<140/90; hipertensi ≥140/90. Home BP & daytime ABPM: <120/70; 120/70–<135/85; ≥135/85. ABPM 24 jam: <115/65; 115/65–<130/80; ≥130/80. Malam: <110/60; 110/60–<120/70; ≥120/70.
- Catatan: Tabel 1 (teks rekomendasi) masih menyebut "optimal, normal, normal-tinggi, derajat 1–3", tidak konsisten dengan Tabel 2.
- Bukti: src halaman 9 dirender (pnpk_ht_hal9.png).

### Juknis Penatalaksanaan TB Sensitif Obat 2025 (Kemenkes; Kepdirjen P2 HK.02.02/C/5401/2025) — BERBEDA dengan SPARK
- Tabel 14 Sistem Skoring pada Anak (hal. 113): Kontak TB 0 tidak jelas / 2 laporan keluarga, tidak terkonfirmasi bakteriologis atau tidak jelas/tidak tahu / 3 terkonfirmasi bakteriologis; Uji tuberkulin 0 negatif / 3 positif (≥10 mm atau ≥5 mm imunokompromais); BB/status gizi 1 BB/TB <90% atau BB/U <80% / 2 klinis gizi buruk atau BB/TB <70% atau BB/U <60%; Demam tanpa sebab ≥2 pekan 1; **Batuk kronik ≥2 pekan 1**; KGB kolli/aksila/inguinal ≥1 cm, >1, tidak nyeri 1; Pembengkakan tulang/sendi panggul/lutut 1; Radiografi toraks normal/tidak jelas 0 / sugestif TB 1.
- Gambar 8 (hal. 111): skoring dipakai bila TCM negatif/tidak bisa dan ada akses rontgen toraks dan/atau uji tuberkulin/IGRA. **Skor ≥6 → TBC klinis**; skor <6 → TBC klinis bila ada kontak ATAU tuberkulin/IGRA positif DAN rontgen sugestif; bila tidak → bukan TBC/observasi.
- SPARK: batuk ≥3 minggu dan mengutip Juknis lama.

### Hasanuddin Stroke Score (SPARK) — PERLU DOKUMEN / BERBEDA
- Variabel SPARK (TD, aktivitas saat onset, nyeri kepala, penurunan kesadaran, muntah proyektil; bobot 7,5/6,5/10 dst.) sama dengan skor stroke dari Departemen Neurologi FK Unhas.
- Publikasi yang ditemukan: (1) Umbas DG. Aplikasi Sistem Skor Stroke Dave dan Djoenaidi (SSSDD). CDK 2015;42(9): cut-off **≥17** = stroke hemoragik (n=185, Makassar 2014; sens 90,3%, spes 89,1%). (2) Gunawan D, Aliah A, Akbar M dkk. Skor stroke Dave Unhas dalam membedakan stroke iskemik dan hemoragik. Neurona 2014;32(1):20-7: cut-off **≥10** (dikutip Supardin dkk., Neurona 2019;36(4):299). SPARK memakai **≥15**, rentang 2–44.
- Tabel bobot asli belum dapat diunduh (CDK 404, Neliti 403).

## Perbedaan lain yang dilaporkan ke pemilik (12 Okt 2026)
Rincian dan usulan: docs/validasi-kalkulator/Laporan_Perbedaan_SPARK_vs_Sumber_2026-10-12.docx (P1–P13).
- P4 Bishop: SPARK "<5 tidak favorabel"; rujukan umum ≤6 tidak favorabel, ≥8 favorabel (ACOG PB 107; kini ACOG CPG No. 9, 2025, belum dibaca langsung).
- P5 Koreksi natrium: rumus defisit (140 − Na) dilabeli Adrogué–Madias; rumus Adrogué–Madias = (Na infus − Na serum) ÷ (TBW + 1). Pedoman Eropa 2014 (Eur J Endocrinol 2014;170:G1; PMID 24569496) belum dibaca penuh.
- P6 Cairan dewasa: 4-2-1 dipakai untuk dewasa; NICE CG174 25–30 mL/kg/hari.
- P7 Kalori: nama Broca–Lorentz vs Broca modifikasi PERKENI.
- P8 Fletcher: 4 frekuensi vs indeks Fletcher klasik 3 frekuensi.
- P9 ARIA: butir "gejala mengganggu" tidak ada di SPARK.
- P10 Dehidrasi: SPARK memakai tanda air mata dan mulut (tabel lama); MTBS memakai 4 tanda.
- P11 Alvarado: leukosit ≥10.000 vs >10.000 (tabel asli belum dibaca).
- P12 Cairan luka bakar: skema anak 3 mL/kg (ATLS 10) tidak tampak di SPARK; buku ATLS berbayar.
- P13 Koreksi kalium: rumus defisit faktor 0,3 belum punya sumber primer terverifikasi.
- Bobot Ballard, deskripsi FOUR, tabel kesan PAT, kategori Downes, risiko Centor per skor, bobot VBAC, koefisien kompensasi AGD: ditandai PERLU KONFIRMASI VALIDATOR di dokumen validasi Tahap 1.

## Sesi 12 Okt 2026 (lanjutan, Claude Code PC 2)
- Bishop: tabel poin dari Tabel 1 Sinha dkk. 2024 (Europe PMC full text PMC10945042), ambang NICE NG207 (situs NICE, dipotret). PNPK induksi POGI tidak ditemukan daring.
- Cairan rumatan dewasa: NICE CG174 1.4.1–1.4.5 (situs NICE, dipotret).
- Alvarado: Ohle 2011 Gambar 1 dan teks (PMC3299622); WSES 2020 Statement/Rekomendasi 1.2–1.5 (PMC7386163).
- Dehidrasi: Bagan MTBS 2022 hal. 4, 24, 25 (PDF Puskesmas Kediri Lombok Barat; sertifikat server tidak lengkap sehingga unduhan otomatis memerlukan peramban penuh).
- Killip: PNPK SKA lama (KMK 675/2019) diganti KMK 876/2026 (10 Agustus 2026). Tabel 19 hal. 57 dibaca; opsi dan mortalitas 30 hari disesuaikan.
- GIR: rumus dan GIR normal 4–6 / >8 dari konsensus CHI Inggris 2023 (PMC10646160); batas dekstrosa 12,5% perifer dari Reddy 2017 (PMC5734558). Target lama "perlu konfirmasi" dihapus.
- HPL: aturan Naegele kini bertautan ke Darwish dkk. 1994 (arsip WHO EMRO IMEMR).
- GCS: Teasdale 1974 (PMID 4136544) dan Teasdale 2014 (PMID 25030516) kini bertautan.
- IMT: Tabel 2.2 WHO WPRO 2000 dibaca dari PDF IRIS (OCR) dan cocok dengan kalkulator.
- Pemeriksaan tautan: 48 tautan PubMed/PMC dicocokkan judul, penulis, jurnal, tahun lewat Europe PMC (semua cocok). Tautan non-PubMed dibuka Edge headless: semua 200 kecuali DOI Thorax (403 Cloudflare, diganti PubMed 37433578) dan PDF MTBS (sertifikat tidak lengkap, isi sudah diunduh sebelumnya). Tes calculators.test.ts kini gagal bila ada sumber tanpa tautan.
- Catatan: pemeriksaan tautan memastikan identitas sumber; isi tiap klaim dicatat di docs/validasi-kalkulator/src/evidence.ts (status ok/cek).

## Natrium dan kalium: SPARK vs sumber (12 Okt 2026, belum dibangun, menunggu keputusan pemilik)
- SPARK (catatan audit, hanya membaca): natrium = defisit (140 − Na) × faktor × BB, NaCl 3% (≈512 mEq/L), laju 0,5 mEq/L/jam (sadar) atau 1 mEq/L/jam (kesadaran menurun), menyebut Adrogué–Madias. Kalium = defisit (4 − K) × 0,3 × BB; KCl 25 mEq/flakon dalam NaCl 0,9%, maks 10 mEq/jam, maks 60 mEq/1000 cc.
- Sumber natrium: Hoorn & Zietse, JASN 2017 (PMC5407738) Tabel 2 membandingkan pedoman AS dan Eropa: bolus NaCl 3% (Eropa 150 mL dalam 20 menit, 2–3 kali bila gejala berat; sekali bila gejala sedang; AS 100 mL dalam 10 menit × 3), batas kenaikan 10 mmol/L per hari (AS 8 bila risiko ODS tinggi: hipokalemia, alkoholisme, malnutrisi, penyakit hati). Sahay & Sahay 2014 (PMC4192979): rumus Adrogué–Madias ΔNa per 1 L = (Na infus − Na serum) ÷ (TBW + 1), TBW = BB × 0,6 pria / 0,5 wanita; NaCl 3% = 513 mEq/L; ±1 mL/kg NaCl 3% menaikkan Na ±1 mEq/L; "dalam pedoman saat ini rumus ini tidak dipakai", rumus defisit natrium tidak akurat. Naskah pedoman Eropa 2014 (EJE/NDT) masih terblokir (Cloudflare 525/verifikasi bot). PAPDI tidak tersedia daring.
- Perbedaan dengan SPARK: target 140 dengan laju 0,5–1 mEq/L/jam dapat menaikkan 12–24 mmol/L per hari, melebihi batas 10 (atau 8) mmol/L per hari pada pedoman.
- Sumber kalium: Kardalas dkk., Endocr Connect 2018 (PMC5881435) Tabel 3: ringan 3,0–3,4; sedang 2,5–2,9; berat <2,5 atau bergejala → KCl IV 40 mmol dalam 1 L NaCl 0,9%, laju standar 10 mmol/jam, maksimum 20 mmol/jam, cek magnesium; EKG untuk semua pasien hipokalemia; tiap penurunan 1 mEq/L ≈ defisit 200–400 mEq. Ini ulasan, bukan pedoman resmi.
- Perbedaan dengan SPARK: rumus (4 − K) × 0,3 × BB (mis. 70 kg, K 2,5 = 31,5 mEq) jauh lebih kecil daripada perkiraan defisit 200–400 mEq per 1 mEq/L pada Kardalas 2018.
- Dibaca ulang dari SPARK (12 Okt 2026, hanya membaca, contoh dihitung di peramban tanpa menyimpan): Sodium Correction "Na 120 → 140, 60 kg, pria, sadar" = kebutuhan 720 mEq, 0,5 mEq/L/jam → 40 jam, NaCl 3% 1406 cc; sumber yang dicantumkan "TBW sodium deficit + correction rate per Adrogué–Madias (NEJM 2000)". Laju 0,5/jam = 12 mmol/L per 24 jam (1/jam = 24), di atas batas 10 (8 risiko tinggi) mmol/L per hari. Potassium Correction "K 2,5, 60 kg" = 27 mEq (1,1 flakon KCl 25), maks 10 mEq/jam, maks 60 mEq/1000 cc; tidak mencantumkan guideline.
