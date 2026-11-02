"""Lembar kontak gambar hasil potong: python lembar_gambar.py awalan [kolom]"""
import glob
import sys

from PIL import Image

fs = sorted(glob.glob(f"gambar/{sys.argv[1]}*.png"))
W = int(sys.argv[2]) if len(sys.argv) > 2 else 5
sz = 400
ims = [Image.open(f) for f in fs]
h = (len(ims) + W - 1) // W
sheet = Image.new("RGB", (W * sz, h * sz), "white")
for i, im in enumerate(ims):
    im.thumbnail((sz - 10, sz - 10))
    sheet.paste(im, ((i % W) * sz, (i // W) * sz))
sheet.save("_lihat/cek.png")
print([f.split("\\")[-1] for f in fs])
