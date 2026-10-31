"""Cetak blok teks + koordinat (pt) halaman PDF untuk menentukan kotak potong. Pemakaian: python blok.py B01 3 [5 ...]"""
import sys
import pymupdf
from potong_gambar import berkas
sys.stdout.reconfigure(encoding="utf-8")
d = pymupdf.open(berkas(sys.argv[1]))
for h in map(int, sys.argv[2:]):
    pg = d[h - 1]
    print("== hlm", h, [round(v) for v in pg.rect])
    for b in sorted(pg.get_text("blocks"), key=lambda b: b[1]):
        print([round(x) for x in b[:4]], b[4][:50].replace("\n", " "))
