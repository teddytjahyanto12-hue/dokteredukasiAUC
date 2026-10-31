"""Buat lembar pratinjau beberapa gambar (untuk pemeriksaan visual)."""
import sys
from PIL import Image, ImageDraw
fs = sys.argv[2:]
ims = [Image.open(f).convert("RGB") for f in fs]
W = int(__import__("os").environ.get("MW", "700"))
rows = []
for f, im in zip(fs, ims):
    im = im.resize((W, int(im.height * W / im.width)))
    c = Image.new("RGB", (W, im.height + 22), "white")
    c.paste(im, (0, 22)); ImageDraw.Draw(c).text((4, 4), f, fill="red")
    rows.append(c)
cols = int(__import__("os").environ.get("MC", "2"))
h = [max(r.height for r in rows[i:i+cols]) for i in range(0, len(rows), cols)]
out = Image.new("RGB", (W * cols + 10, sum(h) + 10 * len(h)), (200, 200, 200))
y = 0
for i in range(0, len(rows), cols):
    for j, r in enumerate(rows[i:i+cols]):
        out.paste(r, (j * (W + 10), y))
    y += h[i // cols] + 10
out.save(sys.argv[1])
