"""Memotong gambar dari PDF sumber ke folder gambar/.

Pemakaian: python potong_gambar.py "<folder MATERI MENTAH>"
PDF sumber tidak disalin. S = halaman PDF Sherwood (dipotong per wilayah, 200 dpi,
keterangan asli dibuang). O = gambar tersemat (xref) di PDF bahan ringkasan yang
berasal dari OpenStax (CC BY), diambil utuh.
"""
import io
import os
import sys

import pymupdf
from PIL import Image

AKAR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AKAR, "gambar")

SPEK = {
    "bab01_sistem_endokrin": ("S", 5, (0, 321, 615, 765)),
    "bab06_anatomi_hipofisis": ("S", 10, (25, 428, 380, 678)),
    "bab06_hipofisis_posterior": ("S", 11, (340, 0, 648, 622)),
    "bab07_hormon_hipofisis_anterior": ("S", 15, (20, 10, 640, 658)),
    "bab05_rantai_komando": ("S", 18, (60, 25, 396, 553)),
    "bab06_sistem_porta": ("S", 19, (50, 25, 645, 320)),
    "bab08_tulang_panjang": ("S", 22, (0, 218, 648, 697)),
    "bab08_kontrol_gh": ("S", 24, (5, 5, 410, 532)),
    "bab12_sirkadian": ("S", 30, (20, 5, 645, 386)),
    "bab04_kelas_hormon": ("O", 728, None),
    "bab13_anatomi_tiroid": ("S", 36, (325, 55, 648, 554)),
    "bab13_sintesis_th": ("S", 38, (0, 15, 648, 545)),
    "bab13_regulasi_th": ("S", 39, (360, 0, 642, 413)),
    "bab15_graves_tsi": ("S", 41, (0, 15, 338, 205)),
    "bab17_anatomi_adrenal": ("S", 43, (0, 0, 648, 474)),
    "bab17_steroidogenesis": ("S", 44, (25, 15, 560, 321)),
    "bab17_kontrol_kortisol": ("S", 46, (50, 10, 320, 445)),
    "bab18_adrenogenital": ("S", 49, (40, 25, 427, 412)),
    "bab21_integrasi_stres": ("S", 53, (40, 190, 648, 698)),
    "bab23_jalur_nutrien": ("S", 55, (0, 0, 648, 600)),
    "bab22_pankreas": ("S", 59, (0, 0, 648, 395)),
    "bab22_sekresi_insulin": ("S", 62, (0, 0, 352, 440)),
    "bab22_kontrol_insulin": ("S", 63, (0, 0, 412, 300)),
    "bab24_efek_akut_dm": ("S", 66, (0, 0, 648, 560)),
    "bab26_anatomi_paratiroid": ("S", 72, (350, 25, 600, 370)),
    "bab26_rankl_opg": ("S", 73, (330, 0, 648, 461)),
    "bab26_umpan_balik_pth": ("S", 79, (0, 0, 330, 213)),
    "bab26_aktivasi_vitd": ("S", 80, (0, 0, 402, 575)),
}


# wilayah keterangan asli yang menempel di dalam gambar (pt, relatif terhadap halaman) ditutup warna latar
TUTUP = {
    "bab22_pankreas": [(0, 360, 335, 395)],
    "bab26_anatomi_paratiroid": [(468, 25, 600, 70)],
}


def main(folder):
    os.makedirs(OUT, exist_ok=True)
    s = pymupdf.open(os.path.join(folder, "sherwood endokrin.pdf"))
    c = pymupdf.open(os.path.join(folder, "Endokrin - CaKes Edisi 2.pdf"))
    for nama, (src, ref, kotak) in SPEK.items():
        tujuan = os.path.join(OUT, nama + ".png")
        if src == "S":
            pix = s[ref - 1].get_pixmap(dpi=200, clip=pymupdf.Rect(*kotak))
            im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            k = 200 / 72
            for (x0, y0, x1, y1) in TUTUP.get(nama, []):
                a = (int((x0 - kotak[0]) * k), int((y0 - kotak[1]) * k), int((x1 - kotak[0]) * k), int((y1 - kotak[1]) * k))
                warna = im.getpixel((max(a[0], 1), max(a[1] - 4, 1)))
                Image.Image.paste(im, warna, a)
            im.save(tujuan)
        else:
            pix = pymupdf.Pixmap(c, ref)
            if pix.alpha or pix.n - pix.alpha >= 4:
                pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
            Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB").save(tujuan)
    print(len(SPEK), "gambar")


if __name__ == "__main__":
    main(sys.argv[1])
