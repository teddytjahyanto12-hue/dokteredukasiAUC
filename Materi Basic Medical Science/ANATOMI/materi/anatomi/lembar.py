"""Lembar kontak halaman PDF untuk pemeriksaan visual. Pemakaian: python lembar.py berkas.pdf [awal] [jumlah] [kolom]"""
import sys
import pymupdf
from PIL import Image
d = pymupdf.open(sys.argv[1])
a = int(sys.argv[2]) if len(sys.argv) > 2 else 1
n = int(sys.argv[3]) if len(sys.argv) > 3 else 12
k = int(sys.argv[4]) if len(sys.argv) > 4 else 6
ims = []
for i in range(a - 1, min(a - 1 + n, d.page_count)):
    d[i].get_pixmap(dpi=32).save("_lihat/_p.png")
    ims.append(Image.open("_lihat/_p.png").copy())
w, h = ims[0].size
r = (len(ims) + k - 1) // k
c = Image.new("RGB", (w * k, h * r), "white")
for j, im in enumerate(ims):
    c.paste(im, ((j % k) * w, (j // k) * h))
c.save("_lihat/lembar.png")
print(d.page_count, "halaman")
