"""Potong gambar dari PDF buku utama menurut nomor halaman PDF.

Pemakaian:
  python skrip/potong_fitz.py daftar   HAL            # tampilkan kotak gambar di halaman
  python skrip/potong_fitz.py potong   HAL IDX NAMA   # simpan gambar ke-IDX (urutan daftar)
  python skrip/potong_fitz.py kotak    HAL x0 y0 x1 y1 NAMA   # potong kotak bebas
  python skrip/potong_fitz.py kontak   NAMA1 NAMA2 ...        # lembar kontak untuk pemeriksaan visual

Keterangan asli buku tidak ikut karena hanya area gambar yang dirender.
"""
import os
import sys

import pymupdf

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUMBER = {
    "fitz": os.path.join(AKAR, "..", "..", "MATERI MENTAH",
                         "Fitzpatrick dermatology in general medicine 8th edition.pdf"),
}
KELUAR = os.path.join(AKAR, "gambar", "buku")


def kotak_gambar(hal):
    d = pymupdf.open(SUMBER["fitz"])
    p = d[hal - 1]
    inf = [x for x in p.get_image_info(xrefs=True)
           if (x["bbox"][2] - x["bbox"][0]) > 60 and (x["bbox"][3] - x["bbox"][1]) > 60]
    inf.sort(key=lambda x: (round(x["bbox"][1] / 20), x["bbox"][0]))
    return d, p, inf


def simpan(p, rect, nama, zoom=3):
    pix = p.get_pixmap(clip=rect, matrix=pymupdf.Matrix(zoom, zoom))
    out = os.path.join(KELUAR, nama + ".png")
    pix.save(out)
    print("disimpan", out, pix.width, "x", pix.height)


def main():
    cmd = sys.argv[1]
    if cmd == "daftar":
        _, p, inf = kotak_gambar(int(sys.argv[2]))
        for i, x in enumerate(inf):
            print(i, [round(v) for v in x["bbox"]], x["width"], x["height"])
    elif cmd == "potong":
        _, p, inf = kotak_gambar(int(sys.argv[2]))
        idx = [int(v) for v in sys.argv[3].split("+")]
        r = pymupdf.Rect(inf[idx[0]]["bbox"])
        for i in idx[1:]:
            r |= pymupdf.Rect(inf[i]["bbox"])
        simpan(p, r, sys.argv[4])
    elif cmd == "kotak":
        d = pymupdf.open(SUMBER["fitz"])
        p = d[int(sys.argv[2]) - 1]
        r = pymupdf.Rect(*[float(v) for v in sys.argv[3:7]])
        simpan(p, r, sys.argv[7])
    elif cmd == "kontak":
        from PIL import Image, ImageDraw
        ims = []
        for n in sys.argv[2:]:
            f = n if os.path.exists(n) else os.path.join(KELUAR, n + ".png")
            im = Image.open(f).convert("RGB")
            im.thumbnail((420, 340))
            ims.append((os.path.basename(n), im))
        kol = 4
        baris = (len(ims) + kol - 1) // kol
        lembar = Image.new("RGB", (kol * 430, baris * 370), "white")
        dr = ImageDraw.Draw(lembar)
        for i, (n, im) in enumerate(ims):
            x, y = (i % kol) * 430, (i // kol) * 370
            lembar.paste(im, (x + 5, y + 22))
            dr.text((x + 5, y + 4), n, fill="black")
        out = os.path.join(AKAR, "qa", "kontak_baru.jpg")
        lembar.save(out, quality=85)
        print(out)


if __name__ == "__main__":
    main()
