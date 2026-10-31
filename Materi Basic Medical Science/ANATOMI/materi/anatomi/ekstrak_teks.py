"""Ekstraksi teks PDF sumber ke _ekstrak/B<nn>.txt (penanda ==== Hlm n ====). PDF tidak disalin."""
import glob, os, re
import pymupdf
AKAR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(AKAR, "..", "..")
OUT = os.path.join(AKAR, "_ekstrak")
for f in glob.glob(os.path.join(SRC, "Bab *.pdf")):
    n = int(re.search(r"Bab (\d+)", os.path.basename(f)).group(1))
    doc = pymupdf.open(f)
    with open(os.path.join(OUT, f"B{n:02d}.txt"), "w", encoding="utf-8") as fh:
        for i, p in enumerate(doc, 1):
            fh.write(f"\n==== Hlm {i} ====\n" + p.get_text())
    print(n, doc.page_count)
for kode, f in (("S1", "Anatomi- Sobotta 1 (Inggris) - Head, Neck, Upper Limb.pdf"),
                ("S2", "Anatomi- Sobotta 2(Inggris) - Trunk, Viscera, Lower Limb.pdf")):
    doc = pymupdf.open(os.path.join(SRC, f))
    with open(os.path.join(OUT, kode + ".txt"), "w", encoding="utf-8") as fh:
        for i, p in enumerate(doc, 1):
            fh.write(f"\n==== Hlm {i} ====\n" + p.get_text())
    print(kode, doc.page_count)
