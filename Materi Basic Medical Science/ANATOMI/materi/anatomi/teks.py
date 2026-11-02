"""Cetak teks isi halaman PDF Bab tanpa label gambar pendek.

    python teks.py B02 3 10
Blok dipertahankan bila panjang >= 50 karakter atau hurufnya besar (judul).
Kolom kiri dibaca dulu, lalu kolom kanan.
"""
import sys

import pymupdf

from potong_gambar import berkas

kode, a, b = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
d = pymupdf.open(berkas(kode))
for n in range(a, b + 1):
    hal = d[n - 1]
    lebar = hal.rect.width
    simpan = []
    for blk in hal.get_text("dict")["blocks"]:
        baris = blk.get("lines", [])
        if not baris:
            continue
        teks = " ".join("".join(s["text"] for s in l["spans"]) for l in baris).strip()
        ukuran = max(s["size"] for l in baris for s in l["spans"])
        if len(teks) >= 50 or ukuran >= 9.5:
            x0, y0 = blk["bbox"][:2]
            kolom = 0 if x0 < lebar / 2 - 20 else 1
            simpan.append((kolom, y0, teks))
    print(f"==== {kode} hlm {n}")
    for _, _, t in sorted(simpan):
        print(t)
