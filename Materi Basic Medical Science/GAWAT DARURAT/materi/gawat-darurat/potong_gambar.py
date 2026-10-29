"""Mengambil gambar dari PDF sumber ke folder gambar/.

Pemakaian: python potong_gambar.py
PDF sumber tidak disalin; hanya potongan gambar yang disimpan.
Spesifikasi: nama -> (kode sumber, halaman PDF, xref gambar tersemat) atau
(kode sumber, halaman PDF, kotak potong (x0, y0, x1, y1) dalam pt).
Keterangan asli buku tidak ikut diambil.
"""
import os

import numpy as np
import pymupdf
from PIL import Image

AKAR = os.path.dirname(os.path.abspath(__file__))
MENTAH = os.path.join(AKAR, "..", "..", "MATERI MENTAH")
OUT = os.path.join(AKAR, "gambar")
SUMBER = {"A": "ATLS 9th ed.pdf", "E": "EIMED-PAPDI-pdf.pdf",
          "P": "Emergency   Critical Care Pocket Guide.pdf"}

SPEK = {
    "bab01_prarumahsakit": ("A", 10, 179),
    "bab02_curah_jantung": ("A", 70, (40, 490, 380, 736)),
    "bab03_survei_primer": ("A", 13, 194),
    "bab03_imobilisasi_segaris": ("A", 14, 201),
    "bab04_radiologi_resusitasi": ("A", 18, 224),
    "bab04_usg_syok": ("A", 72, 572),
    "bab05_kompresi_dada": ("E", 172, (207, 388, 532, 520)),
    "bab05_buka_jalan_napas": ("E", 174, (204, 73, 533, 150)),
    "bab05_posisi_pulih": ("E", 174, (276, 477, 525, 560)),
    "bab05_tanda_tersedak": ("E", 175, (200, 186, 297, 322)),
}


def bersihkan(path):
    """Hapus garis lurus panjang (garis tabel buku) lalu pangkas tepi putih."""
    im = np.array(Image.open(path).convert("L"))
    gelap = im < 140
    tepi = 30
    for i in np.where(gelap.mean(axis=1) > 0.85)[0]:
        if i < tepi or i > im.shape[0] - tepi:
            im[max(i - 2, 0):i + 3, :] = 255
    for j in np.where(gelap.mean(axis=0) > 0.85)[0]:
        if j < tepi or j > im.shape[1] - tepi:
            im[:, max(j - 2, 0):j + 3] = 255
    isi = np.where(im < 200)
    if isi[0].size:
        y0, y1, x0, x1 = isi[0].min(), isi[0].max(), isi[1].min(), isi[1].max()
        im = im[max(y0 - 6, 0):y1 + 7, max(x0 - 6, 0):x1 + 7]
    Image.fromarray(im).save(path)


def main():
    os.makedirs(OUT, exist_ok=True)
    cache = {}
    for nama, (kode, hlm, isi) in SPEK.items():
        doc = cache.setdefault(kode, pymupdf.open(os.path.join(MENTAH, SUMBER[kode])))
        tujuan = os.path.join(OUT, nama + ".png")
        if isinstance(isi, int):
            pix = pymupdf.Pixmap(doc, isi)
            if pix.n - pix.alpha >= 4:
                pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
            pix.save(tujuan)
        else:
            doc[hlm - 1].get_pixmap(dpi=200, clip=pymupdf.Rect(*isi)).save(tujuan)
            if kode == "E":
                bersihkan(tujuan)
        print(nama)


if __name__ == "__main__":
    main()
