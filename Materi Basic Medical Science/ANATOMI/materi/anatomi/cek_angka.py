"""Render blok teks PDF yang memuat frasa, untuk mencocokkan angka OCR dengan gambar halaman.
Pemakaian: python cek_angka.py B11 "frasa" [frasa lain ...] -> _lihat/angka_N.png"""
import sys
import pymupdf
from PIL import Image
from potong_gambar import berkas
d = pymupdf.open(berkas(sys.argv[1]))
ims = []
for fr in sys.argv[2:]:
    for pg in d:
        bl = [b for b in pg.get_text("blocks") if fr in b[4].replace("\n", " ")]
        if bl:
            r = pymupdf.Rect(bl[0][:4]) + (-3, -3, 3, 3)
            pg.get_pixmap(dpi=110, clip=r).save("_lihat/_a.png")
            ims.append(Image.open("_lihat/_a.png").copy())
            break
    else:
        print("tidak ditemukan:", fr)
W = max(i.width for i in ims); H = sum(i.height for i in ims)
c = Image.new("RGB", (W, H), "white"); y = 0
for i in ims:
    c.paste(i, (0, y)); y += i.height
c.save("_lihat/angka.png"); print(c.size)
