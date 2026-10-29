"""OCR EIMED (PDF pindai) per halaman ke _ekstrak/E_ocr/<n>.txt; paralel 4 proses."""
import os, subprocess, tempfile, sys
from concurrent.futures import ThreadPoolExecutor
import pymupdf
AKAR=os.path.dirname(os.path.abspath(__file__))
SRC=os.path.join(AKAR,"..","..","MATERI MENTAH","EIMED-PAPDI-pdf.pdf")
OUT=os.path.join(AKAR,"_ekstrak","E_ocr"); os.makedirs(OUT,exist_ok=True)
TMP=tempfile.mkdtemp()
doc=pymupdf.open(SRC)
def kerja(i):
    o=os.path.join(OUT,f"{i+1:03d}.txt")
    if os.path.exists(o): return
    png=os.path.join(TMP,f"{i}.png")
    pymupdf.open(SRC)[i].get_pixmap(dpi=250).save(png)
    r=subprocess.run(["tesseract",png,"stdout","-l","eng","--psm","4"],capture_output=True)
    open(o,"wb").write(r.stdout); os.remove(png)
with ThreadPoolExecutor(4) as ex: list(ex.map(kerja,range(doc.page_count)))
print("selesai")
