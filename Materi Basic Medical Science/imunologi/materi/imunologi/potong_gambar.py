"""Memotong gambar dari PDF sumber ke folder gambar/ (PDF tidak disalin).

Pemakaian: python potong_gambar.py "<folder materi mentah>" [nama ...]
A = Abbas (dicari dari keterangan 'FIGURE x.y', area gambar di atas keterangan,
    keterangan asli tidak ikut). S = Sherwood (halaman + kotak potong manual).
"""
import os
import sys

import pymupdf
from PIL import Image

AKAR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AKAR, "gambar")

# nama: ("A", "FIGURE 1.1", koreksi kotak (dx0,dy0,dx1,dy1) atau None)
#       ("S", halaman PDF, (x0,y0,x1,y1)); "AB" = Abbas dengan kotak manual
SPEK = {}
exec(open(os.path.join(AKAR, "spek_gambar.py"), encoding="utf-8").read())


import json
INDEKS = json.load(open(os.path.join(AKAR, "ingatan", "indeks_gambar_abbas.json")))


def cari_abbas(doc, label):
    for hal in [doc[INDEKS[label] - 1]]:
        for r in hal.search_for(label):
            return hal, r
    raise SystemExit("tidak ketemu " + label)


def kotak_abbas(hal, kap):
    rects = [d["rect"] for d in hal.get_drawings() if d["rect"].width < hal.rect.width * 0.98]
    rects += [pymupdf.Rect(i["bbox"]) for i in hal.get_image_info()]
    rects = [r for r in rects if r.is_valid and not r.is_empty and r.y1 <= kap.y0 + 3
             and r.y0 >= 30 and r.height < 700]
    # hanya gambar yang menyatu dengan keterangan (rantai dari bawah ke atas)
    rects.sort(key=lambda r: -r.y1)
    u = None
    batas = kap.y0
    for r in rects:
        if r.y1 >= batas - 40 and (u is None or r.x1 > u.x0 - 5 and r.x0 < u.x1 + 5 or True):
            u = r if u is None else u | r
            batas = min(batas, r.y0)
    if u is None:
        raise SystemExit("tanpa gambar")
    # label teks di dalam area
    for b in hal.get_text("blocks"):
        br = pymupdf.Rect(b[:4])
        if br.intersects(u) and br.y1 <= kap.y0 + 1 and br.height < 60:
            u |= br
    return u


def main(folder, pilih):
    os.makedirs(OUT, exist_ok=True)
    a = pymupdf.open(os.path.join(folder, "Cellular and Molecular Immunology 9e.pdf"))
    s = pymupdf.open(os.path.join(folder, "sherwood pertahanan tubuh.pdf"))
    for nama, (src, ref, kotak) in SPEK.items():
        if pilih and nama not in pilih:
            continue
        tujuan = os.path.join(OUT, nama + ".png")
        if src == "AC":
            hal = a[ref - 1]
            hal.get_pixmap(dpi=200, clip=pymupdf.Rect(*kotak)).save(tujuan)
            continue
        if src == "A":
            try:
                hal, kap = cari_abbas(a, ref)
                r = kotak_abbas(hal, kap)
            except SystemExit as e:
                print("GAGAL", nama, ref, e)
                continue
            if kotak:
                r = pymupdf.Rect(r.x0 + kotak[0], r.y0 + kotak[1], r.x1 + kotak[2], r.y1 + kotak[3])
            r = pymupdf.Rect(max(r.x0 - 4, 0), max(r.y0 - 4, 0), min(r.x1 + 4, hal.rect.x1), min(r.y1 + 2, kap.y0 - 1))
            pix = hal.get_pixmap(dpi=200, clip=r)
            print(nama, "A hal", hal.number + 1, [round(x) for x in r])
        else:
            # render seluruh halaman lalu potong (clip PyMuPDF bergeser karena cropbox)
            z = 200 / 72
            hal = (a if src == "AB" else s)[ref - 1]
            pix = hal.get_pixmap(matrix=pymupdf.Matrix(z, z))
            im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            im.crop(tuple(int(v * z) for v in kotak)).save(tujuan)
            continue
        pix.save(tujuan)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:])
