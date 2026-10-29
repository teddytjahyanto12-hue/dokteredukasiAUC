"""Ekstraksi teks PDF sumber ke _ekstrak/<kode>.txt (penanda ==== Hlm n ====). PDF tidak disalin."""
import os, sys
import pymupdf
M = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "MATERI MENTAH")
SUMBER = {"C": "Ruang Gawat Darurat - CaKes Edisi 2.pdf", "A": "ATLS 9th ed.pdf",
          "E": "EIMED-PAPDI-pdf.pdf", "P": "Emergency   Critical Care Pocket Guide.pdf",
          "D": "dosis obat emergency.pdf"}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_ekstrak")
for k, f in SUMBER.items():
    doc = pymupdf.open(os.path.join(M, f))
    with open(os.path.join(OUT, k + ".txt"), "w", encoding="utf-8") as fh:
        for i, p in enumerate(doc, 1):
            fh.write(f"\n==== Hlm {i} ====\n" + p.get_text())
    print(k, doc.page_count, os.path.getsize(os.path.join(OUT, k + ".txt")))
