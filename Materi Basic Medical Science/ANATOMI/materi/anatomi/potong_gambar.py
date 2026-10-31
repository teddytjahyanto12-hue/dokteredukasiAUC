"""Mengambil gambar dari PDF sumber ke folder gambar/.

Pemakaian: python potong_gambar.py [awalan_nama]
PDF sumber tidak disalin; hanya potongan gambar yang disimpan.
SPEK: nama -> (kode sumber, halaman PDF, kotak potong (x0, y0, x1, y1) dalam pt[, daftar kotak yang diputihkan]).
Perubahan hanya di memori; berkas PDF sumber tidak disimpan ulang.
Kode: Bnn = PDF "Bab nn ...", S1/S2 = Sobotta volume 1/2. Keterangan asli buku tidak ikut diambil.
"""
import glob
import os
import sys

import numpy as np
import pymupdf
from PIL import Image

AKAR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(AKAR, "..", "..")
OUT = os.path.join(AKAR, "gambar")
SOBOTTA = {"S1": "Anatomi- Sobotta 1 (Inggris) - Head, Neck, Upper Limb.pdf",
           "S2": "Anatomi- Sobotta 2(Inggris) - Trunk, Viscera, Lower Limb.pdf"}

SPEK = {
    # T01 Pengantar
    "t01_posisi_bidang": ("B01", 3, (55, 77, 545, 457)),
    "t01_gerak_1": ("B01", 4, (40, 183, 560, 704)),
    "t01_gerak_2": ("B01", 5, (40, 193, 560, 704)),
    # T02 Dasar tulang
    "t02_rangka": ("B01", 25, (40, 76, 545, 507)),
    "t02_jenis_tulang": ("B01", 26, (60, 80, 540, 515)),
    # T03 Tengkorak
    "t03_anterior": ("B11", 7, (45, 76, 550, 531)),
    "t03_lateral": ("B11", 9, (45, 76, 550, 487)),
    "t03_basis_inferior": ("B11", 11, (45, 200, 550, 702)),
    "t03_basis_interna": ("B11", 12, (45, 268, 550, 702)),
    "t03_neonatus": ("B11", 13, (50, 322, 535, 712), [(365, 688, 540, 720)]),
    # T04 Columna vertebralis dan thorax
    "t04_columna": ("B11", 24, (40, 78, 560, 818)),
    "t04_lengkung": ("B11", 25, (40, 76, 560, 547)),
    "t04_cervical": ("B11", 27, (40, 76, 560, 421)),
    "t04_sacrum": ("B11", 28, (40, 76, 560, 554)),
    "t04_sternum_thorax": ("B11", 33, (40, 76, 560, 432)),
    "t04_costa_sendi": ("B11", 34, (40, 76, 560, 681)),
    "t04_apertura": ("B11", 35, (40, 287, 560, 625)),
    # T05 Tulang ekstremitas superior
    "t05_lekat_thorax_humerus": ("B11", 37, (40, 76, 560, 403)),
    "t05_clavicula": ("B11", 37, (40, 418, 560, 701)),
    "t05_scapula": ("B11", 38, (40, 165, 560, 700)),
    "t05_humerus": ("B11", 39, (40, 296, 560, 703)),
    "t05_radius_ulna": ("B11", 40, (40, 306, 560, 704)),
    "t05_tangan_anterior": ("B11", 41, (40, 284, 560, 703)),
    "t05_tangan_posterior": ("B11", 42, (60, 76, 560, 459)),
    # T06 Pelvis dan ekstremitas inferior
    "t06_pelvis_pria_wanita": ("B11", 49, (40, 75, 560, 560)),
    "t06_os_coxae": ("B11", 51, (40, 75, 560, 628)),
    "t06_apertura_pelvis": ("B11", 53, (45, 75, 295, 519)),
    "t06_femur_anterior": ("B11", 54, (45, 75, 295, 562)),
    "t06_femur_posterior": ("B11", 55, (40, 76, 560, 604)),
    "t06_tibia_fibula": ("B11", 56, (40, 76, 560, 600)),
    "t06_tarsal": ("B11", 58, (40, 170, 560, 702)),
    "t06_kaki_dorsal": ("B11", 59, (40, 255, 560, 701)),
    # T07 Dasar sendi
    "t07_jenis_sinovial": ("B12", 3, (40, 150, 560, 671)),
    "t07_stabilitas": ("B12", 4, (40, 352, 560, 790), [(400, 666, 560, 800)]),
    "t07_tipe_sendi": ("B12", 6, (40, 70, 560, 607)),
    # T08 Sendi kepala, columna vertebralis, thorax
    "t08_tmj_ligamen": ("B12", 7, (40, 76, 560, 534)),
    "t08_tmj_gerak": ("B12", 9, (40, 76, 560, 560), [(370, 528, 560, 600)]),
    "t08_atlanto": ("B12", 13, (40, 76, 560, 552)),
    "t08_sendi_vertebra": ("B12", 14, (40, 76, 560, 592)),
    "t08_persarafan_vertebra": ("B12", 15, (55, 450, 372, 805)),
    # T09 Sendi ekstremitas superior
    "t09_sternoclav_acromioclav": ("B12", 19, (40, 70, 560, 468)),
    "t09_humeri": ("B12", 21, (40, 70, 560, 590)),
    "t09_humeri_dalam": ("B12", 22, (40, 70, 560, 523)),
    "t09_abduksi": ("B12", 25, (40, 70, 560, 565)),
    "t09_cubiti": ("B12", 26, (40, 70, 560, 484)),
    "t09_ligamen_tangan": ("B12", 27, (40, 76, 560, 563)),
    "t09_pronasi": ("B12", 30, (40, 76, 560, 720), [(55, 668, 255, 720)]),
    # T10 Sendi pelvis dan ekstremitas inferior
    "t10_sacroiliaca": ("B12", 31, (40, 405, 560, 702)),
    "t10_coxae_potongan": ("B12", 33, (40, 70, 560, 586)),
    "t10_coxae_ligamen": ("B12", 34, (40, 70, 560, 541)),
    "t10_genus": ("B12", 38, (40, 150, 560, 695)),
    "t10_genus_batas": ("B12", 39, (40, 70, 560, 468)),
    "t10_talocruralis": ("B12", 42, (40, 212, 560, 702)),
    "t10_arcus": ("B12", 51, (40, 253, 560, 693)),
    # O01 Dasar otot
    "o01_struktur_otot": ("B13", 3, (40, 76, 560, 474)),
    "o01_unit_motorik": ("B13", 4, (40, 76, 305, 371)),
    "o01_refleks": ("B13", 4, (40, 388, 560, 722), [(386, 627, 560, 722)]),
    "o01_kerja_otot": ("B13", 5, (40, 220, 560, 722), [(390, 536, 560, 722)]),
    # O02 Otot kepala dan leher
    "o02_scalp": ("B13", 7, (40, 400, 560, 680)),
    "o02_ekspresi_wajah": ("B13", 9, (40, 76, 560, 521)),
    "o02_platysma": ("B13", 12, (40, 76, 560, 346)),
    "o02_trigonum_anterior": ("B13", 12, (40, 374, 560, 703)),
    "o02_potongan_leher": ("B13", 14, (40, 76, 560, 450)),
    "o02_trigonum_leher": ("B13", 15, (40, 76, 560, 477)),
    # O03 Punggung, thorax, diaphragma
    "o03_punggung": ("B13", 16, (40, 76, 560, 519)),
    "o03_intercostal": ("B03", 6, (40, 76, 560, 553)),
    "o03_diaphragma": ("B03", 10, (40, 385, 560, 692)),
    # O04 Abdomen, pelvis, perineum
    "o04_otot_abdomen": ("B13", 18, (40, 76, 560, 636)),
    "o04_rectus": ("B13", 19, (40, 76, 560, 386)),
    "o04_vagina_recti": ("B13", 20, (40, 372, 560, 692)),
    "o04_inguinal": ("B13", 21, (40, 76, 560, 355)),
    "o04_dinding_pelvis": ("B13", 22, (40, 305, 560, 558)),
    "o04_levator_ani": ("B13", 23, (40, 342, 560, 680)),
    "o04_perineum": ("B13", 24, (40, 322, 560, 701)),
    "o04_diaphragma_urogenitale": ("B13", 25, (40, 76, 560, 424)),
    # O05 Otot ekstremitas superior
    "o05_axilla": ("B13", 27, (40, 76, 560, 432)),
    "o05_bahu_posterior": ("B13", 29, (40, 76, 560, 437)),
    "o05_lengan_anterior": ("B13", 30, (40, 76, 560, 607)),
    "o05_fossa_cubiti": ("B13", 32, (40, 76, 560, 531)),
    "o05_potongan_lengan": ("B13", 33, (40, 458, 560, 690)),
    "o05_lengan_bawah_anterior": ("B13", 34, (40, 76, 560, 676)),
    "o05_potongan_lengan_bawah": ("B13", 37, (40, 458, 560, 703)),
    "o05_selubung_sinovial": ("B13", 41, (40, 76, 560, 532)),
    "o05_insersi_tendo": ("B13", 42, (40, 76, 560, 607)),
    # O06 Otot ekstremitas inferior
    "o06_gluteus_maximus": ("B13", 45, (40, 76, 560, 451)),
    "o06_regio_glutea": ("B13", 47, (40, 76, 560, 536)),
    "o06_trigonum_femorale": ("B13", 48, (40, 76, 560, 608)),
    "o06_potongan_paha": ("B13", 53, (40, 375, 560, 702)),
    "o06_selubung_femoralis": ("B13", 54, (40, 76, 560, 612)),
    "o06_fossa_poplitea": ("B13", 55, (40, 76, 560, 566)),
    "o06_potongan_tungkai": ("B13", 62, (40, 76, 560, 526)),
    "o06_plantar_lapis1": ("B13", 66, (40, 76, 560, 571)),
    # S01 Organisasi sistem saraf
    "s01_neuron_spinal": ("B01", 18, (40, 76, 560, 577)),
    "s01_saraf_spinal": ("B01", 19, (40, 76, 560, 556)),
    "s01_dua_neuron": ("B01", 21, (40, 76, 560, 466)),
    "s01_somatik_otonom": ("B01", 22, (40, 76, 560, 360)),
    "s01_otonom_eferen": ("B01", 23, (40, 76, 560, 562), [(352, 476, 560, 552)]),
    "t03_mandibula_hyoid": ("B11", 17, (40, 205, 560, 703)),
}


def berkas(kode):
    if kode in SOBOTTA:
        return os.path.join(SRC, SOBOTTA[kode])
    n = int(kode[1:])
    return glob.glob(os.path.join(SRC, f"Bab {n} *.pdf"))[0]


def pangkas(path, ambang=235, tepi=8):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im.convert("L"))
    gelap = a < ambang
    baris = np.where(gelap.sum(axis=1) > 3)[0]
    kolom = np.where(gelap.sum(axis=0) > 3)[0]
    isi = (baris, kolom) if baris.size and kolom.size else (np.array([]), np.array([]))
    if isi[0].size:
        y0, y1, x0, x1 = baris.min(), baris.max(), kolom.min(), kolom.max()
        im = im.crop((max(x0 - tepi, 0), max(y0 - tepi, 0), min(x1 + tepi, a.shape[1]), min(y1 + tepi, a.shape[0])))
    im.save(path)


def main():
    os.makedirs(OUT, exist_ok=True)
    awalan = sys.argv[1] if len(sys.argv) > 1 else ""
    cache = {}
    for nama, (kode, hlm, kotak, *tutup) in SPEK.items():
        if not nama.startswith(awalan):
            continue
        doc = cache.setdefault(kode, pymupdf.open(berkas(kode)))
        tujuan = os.path.join(OUT, nama + ".png")
        pg = doc[hlm - 1]
        # paragraf teks buku (blok panjang) di dalam kotak ikut diputihkan; label gambar pendek dipertahankan
        auto = [b[:4] for b in pg.get_text("blocks") if len(b[4].strip()) > 80]
        for r in (tutup[0] if tutup else []) + auto:
            pg.draw_rect(pymupdf.Rect(*r), color=(1, 1, 1), fill=(1, 1, 1))
        pg.get_pixmap(dpi=200, clip=pymupdf.Rect(*kotak)).save(tujuan)
        pangkas(tujuan)
        print(nama)


if __name__ == "__main__":
    main()
