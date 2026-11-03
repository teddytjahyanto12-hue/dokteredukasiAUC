"""Ekstraksi teks PDF sumber ke _ekstrak/<kode>.txt (penanda halaman ===== P n =====).
PDF sumber tidak disalin. Folder _ekstrak tidak untuk dipublikasikan.
Pemakaian: python ekstrak_teks.py "<folder MATERI MENTAH>"
"""
import os
import sys

import pymupdf

AKAR = os.path.dirname(os.path.abspath(__file__))
SUMBER = {
    "C": "Sistem Saraf - CaKes Edisi 2 .pdf",
    "S": "sherwood neurologi.pdf",
    "D": "duus.pdf",
    "J": "William W. Campbell MD DeJong’s The Neurologic Examination_compressed.pdf",
}


def main(folder):
    out = os.path.join(AKAR, "_ekstrak")
    os.makedirs(out, exist_ok=True)
    for kode, nama in SUMBER.items():
        doc = pymupdf.open(os.path.join(folder, nama))
        with open(os.path.join(out, kode + ".txt"), "w", encoding="utf-8") as fh:
            kosong = 0
            for i, hal in enumerate(doc, 1):
                t = hal.get_text()
                if len(t.strip()) < 30:
                    kosong += 1
                fh.write(f"\n===== P {i} =====\n{t}")
        print(kode, len(doc), "halaman,", kosong, "halaman hampir tanpa teks")


if __name__ == "__main__":
    main(sys.argv[1])
