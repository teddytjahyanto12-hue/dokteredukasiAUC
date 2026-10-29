"""Buat ulang PDF materi BKV-12 dari Modul_Fisiologi_Kardiovaskular.docx memakai Microsoft Word.

Versi PDF sebelumnya (diekspor LibreOffice) memotong sebagian gambar dan labelnya. Skrip ini:
  1. memecah modul menjadi 20 DOCX per bahasan: kepala modul + seluruh isi bahasan (tujuan, konsep,
     gambar & keterangan, rangkuman, soal) + Daftar Pustaka yang dinomori ulang sesuai rujukan bahasan;
  2. mengekspor tiap DOCX dan modul utuh ke PDF lewat Word (gambar tidak dipotong);
  3. memeriksa jumlah gambar dan keterangan "Gambar" setiap PDF sama dengan isi DOCX.

Pemakaian (Windows dengan Word + pywin32):
  python -I prisma/bkv12-pdf-dari-docx.py <Modul.docx> <folder keluaran>
"""
import copy
import re
import sys
from pathlib import Path

import docx
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt
import pymupdf as fitz
import win32com.client

src = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve()
work = out / "_docx"
work.mkdir(parents=True, exist_ok=True)

W = qn("w:p")


def text_of(el):
    return "".join(t.text or "" for t in el.iter(qn("w:t")))


def style_of(el):
    s = el.find(qn("w:pPr") + "/" + qn("w:pStyle"))
    return s.get(qn("w:val")) if s is not None else ""


base = docx.Document(str(src))
children = list(base.element.body.iterchildren())
heads = [(i, style_of(el), text_of(el).strip()) for i, el in enumerate(children) if el.tag == W and style_of(el) in ("Heading1", "Heading2")]
pustaka_at = next(i for i, s, t in heads if s == "Heading1" and t.upper() == "DAFTAR PUSTAKA")
refs = [text_of(el).strip() for el in children[pustaka_at + 1:] if el.tag == W and text_of(el).strip()]

bahasan = []  # (nomor, judul, bagian, mulai, akhir)
bagian = ""
for k, (i, s, t) in enumerate(heads):
    if s == "Heading1":
        bagian = t
        continue
    m = re.match(r"Bahasan (\d+)\.", t)
    if m:
        end = next((j for j, _, _ in heads[k + 1:]), pustaka_at)
        bahasan.append((int(m.group(1)), t, bagian, i, end))
if [b[0] for b in bahasan] != list(range(1, 21)):
    raise SystemExit("Modul harus memuat Bahasan 1 s.d. 20")

NUM = re.compile(r"\d+")


def superscripts(body):
    for r in body.iter(qn("w:r")):
        va = r.find(qn("w:rPr") + "/" + qn("w:vertAlign"))
        if va is not None and va.get(qn("w:val")) == "superscript":
            for t in r.iter(qn("w:t")):
                if NUM.search(t.text or ""):
                    yield t


def para(doc, text, size, bold=False, italic=False, border=False, space_after=0):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(0)
    r = p.add_run(text)
    r.font.size, r.font.bold, r.font.italic = Pt(size), bold, italic
    if border:
        pBdr = OxmlElement("w:pBdr")
        b = OxmlElement("w:bottom")
        for k, v in (("w:val", "single"), ("w:sz", "6"), ("w:space", "6"), ("w:color", "BFBFBF")):
            b.set(qn(k), v)
        pBdr.append(b)
        p._p.get_or_add_pPr().append(pBdr)
    return p._p


word = win32com.client.DispatchEx("Word.Application")
word.Visible = False
word.DisplayAlerts = 0
results = []
try:
    for no, title, part, start, end in bahasan:
        d = docx.Document(str(src))
        body = d.element.body
        kids = list(body.iterchildren())
        sect = kids[-1] if kids[-1].tag == qn("w:sectPr") else None
        keep = kids[start:end]
        for el in kids:
            if el is not sect and el not in keep:
                body.remove(el)
        # Kepala modul di halaman pertama (sama seperti versi sebelumnya).
        header = [
            para(d, "MODUL FISIOLOGI KARDIOVASKULAR", 11, bold=True),
            para(d, "Dokter Edukasi Academy · Pusat Pembelajaran & Riset Medis", 10),
            para(d, part, 10, italic=True, border=True, space_after=12),
        ]
        for h in reversed(header):
            body.remove(h)
            body.insert(0, h)
        # Keterangan gambar dinomori per bahasan ("Gambar 46." -> "Gambar 13.1."), seperti versi sebelumnya;
        # teks isi tidak merujuk nomor gambar sehingga aman. Modul lengkap tetap memakai nomor aslinya.
        fig = 0
        for el in keep:
            if el.tag != W or not re.match(r"Gambar \d+\.", text_of(el).strip()):
                continue
            fig += 1
            for t in el.iter(qn("w:t")):
                if re.search(r"\d+\.", t.text or ""):
                    t.text = re.sub(r"\d+\.", f"{no}.{fig}.", t.text, count=1)
                    break
        # Rujukan dinomori ulang per bahasan (urut nomor global).
        cited = sorted({int(n) for t in superscripts(body) for n in NUM.findall(t.text)})
        remap = {g: i + 1 for i, g in enumerate(cited)}
        for t in superscripts(body):
            t.text = NUM.sub(lambda m: str(remap[int(m.group(0))]), t.text)
        h3 = next(s for s in d.styles if s.style_id == "Heading3")
        tail = [d.add_paragraph("Daftar Pustaka", style=h3)._p]
        for i, g in enumerate(cited, 1):
            p = d.add_paragraph(style="Normal")
            p.paragraph_format.left_indent = Pt(18)
            p.paragraph_format.first_line_indent = Pt(-18)
            p.add_run(f"{i}.\t{refs[g - 1]}")
            tail.append(p._p)
        if sect is not None:
            for el in tail:
                body.remove(el)
                sect.addprevious(el)
        stem = f"Bahasan_{no:02d}_" + re.sub(r"[^A-Za-z0-9]+", "_", title.split(". ", 1)[1]).strip("_")
        dx = work / f"{stem}.docx"
        d.save(str(dx))
        results.append((no, stem, dx, keep))

    jobs = [(dx, out / f"{stem}.pdf") for _, stem, dx, _ in results] + [(src, out / "Modul_Fisiologi_Kardiovaskular_Lengkap.pdf")]
    for dx, pdf in jobs:
        doc = word.Documents.Open(str(dx), ReadOnly=True, AddToRecentFiles=False)
        # Nomor gambar (field SEQ) dibekukan ke teks aslinya, mis. "13.1"; tanpa ini Word
        # menghitung ulang secara global per berkas (Gambar 46) saat ekspor.
        for i in range(doc.Fields.Count, 0, -1):
            if doc.Fields(i).Type == 12:  # wdFieldSequence
                doc.Fields(i).Unlink()
        doc.ExportAsFixedFormat(str(pdf), 17)  # wdExportFormatPDF
        doc.Close(False)
        print("PDF", pdf.name, flush=True)
finally:
    word.Quit()

# Pemeriksaan: jumlah gambar & keterangan PDF sama dengan isi DOCX tiap bahasan.
ok = True
for no, stem, dx, keep in results:
    want_img = sum(len(list(el.iter(qn("a:blip")))) for el in keep)
    want_cap = sum(1 for el in keep if el.tag == W and text_of(el).strip().startswith("Gambar "))
    with fitz.open(out / f"{stem}.pdf") as p:
        txt = "".join(pg.get_text() for pg in p)
        got_img = sum(1 for pg in p for i in pg.get_image_info() if fitz.Rect(i["bbox"]).width > 60)
        got_cap = len(re.findall(r"(?m)^Gambar \d+\.\d+\.", txt))
        pages = p.page_count
    flag = "ok" if (got_img, got_cap) == (want_img, want_cap) else "PERIKSA"
    ok &= flag == "ok"
    print(f"{no:02d} {pages:2d} hlm gambar {got_img}/{want_img} keterangan {got_cap}/{want_cap} {flag}")
print("SEMUA COCOK" if ok else "ADA YANG PERLU DIPERIKSA")
