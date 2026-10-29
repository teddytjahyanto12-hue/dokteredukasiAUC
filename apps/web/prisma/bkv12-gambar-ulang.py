"""Potong ulang gambar Modul Fisiologi Kardiovaskular (BKV-12) dari buku sumber agar tidak terpotong.

Gambar di Modul_Fisiologi_Kardiovaskular.docx dipotong dari halaman buku sumber (render 150 dpi), tetapi
sebagian potongan terlalu ketat sehingga label atau bagian gambar hilang. Skrip ini:
  1. mencari tiap gambar modul di buku sumber (template matching kasar 0,5x lalu halus 150 dpi);
  2. memperluas kotak potongan ke semua elemen gambar di sekitarnya (raster, vektor, label teks kecil);
     keterangan asli buku ("Gambar 10-15 ...") dan teks isi buku yang terbawa ditutup putih, lalu tepi
     kosong dirapikan;
  3. merender ulang kotak itu pada 150 dpi dan menulis DOCX baru dengan gambar pengganti
     (lebar tampil tetap, tinggi mengikuti proporsi baru, dibatasi agar muat satu halaman).

Pemakaian: python -I prisma/bkv12-gambar-ulang.py <Modul.docx> <folder sumber PDF> <DOCX keluaran> <folder laporan>
"""
import io
import json
import re
import sys
import zipfile
from pathlib import Path

import cv2
import numpy as np
import pymupdf as fitz
from PIL import Image, ImageDraw

docx_in, src_dir, docx_out, report = (Path(p).resolve() for p in sys.argv[1:5])
report.mkdir(parents=True, exist_ok=True)
ZOOM = 150 / 72     # skala render modul = 150 dpi (Gambar 46 cocok 0,94 pada skala ini)
COARSE = 0.5
MAX_CY = int(21.5 * 360000)  # tinggi tampil maksimum 21,5 cm (EMU)

z = zipfile.ZipFile(docx_in)
xml = z.read("word/document.xml").decode("utf8")
rels = dict(re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', z.read("word/_rels/document.xml.rels").decode()))
paras = re.findall(r"<w:p[ >].*?</w:p>", xml, re.S)
figs = []
for i, p in enumerate(paras):
    for rid in re.findall(r'r:embed="([^"]+)"', p):
        cap = next((re.sub(r"<[^>]+>", "", q) for q in paras[i + 1:i + 4] if re.sub(r"<[^>]+>", "", q).startswith("Gambar ")), "")
        figs.append({"media": "word/" + rels[rid], "caption": cap})

sources = [fitz.open(p) for p in sorted(src_dir.glob("*.pdf"))]


def gray(page, zoom, clip=None):
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), colorspace=fitz.csGRAY, clip=clip)
    return np.frombuffer(pix.samples, np.uint8).reshape(pix.h, pix.w)


coarse_pages = [(si, pno, gray(doc[pno], COARSE)) for si, doc in enumerate(sources) for pno in range(doc.page_count)]
# Keterangan asli buku: baris diawali "Gambar"/"Tabel". Lapisan teks Sherwood rusak sebagian
# ("*ambar \x1c\x102" untuk "Gambar 9-2"), jadi huruf pertama dan angkanya tidak diandalkan.
CAPTION = re.compile(r"^\s*\S?ambar\s+\S|^\s*(Tabel|Figure|Table)\s*\d")


_deco = {}


def decorations(doc):
    """Gambar raster yang muncul di >= 3 halaman (logo/ikon buku), bukan bagian gambar materi."""
    if doc.name not in _deco:
        seen = {}
        for p in doc:
            for xref in {im[0] for im in p.get_images(full=True)}:
                seen[xref] = seen.get(xref, 0) + 1
        _deco[doc.name] = {x for x, n in seen.items() if n >= 3}
    return _deco[doc.name]


def figure_box(page, r):
    """Perluas kotak r (poin) ke elemen gambar di sekitarnya.

    Mengembalikan (kotak, teks_buku): teks_buku = keterangan asli & teks isi buku di dalam kotak,
    yang nantinya ditutup putih (bukan dipotong) agar label gambar di sebelahnya tidak ikut hilang.
    """
    d = page.get_text("dict")
    labels, stops = [], []
    for b in d["blocks"]:
        if "lines" not in b:
            continue
        in_caption = False  # baris keterangan dan seluruh baris lanjutannya dalam blok yang sama
        for l in b["lines"]:
            spans = [s for s in l["spans"] if s["text"].strip()]
            if not spans:
                continue
            lr = fitz.Rect(l["bbox"])
            size = max(s["size"] for s in spans)
            ltxt = "".join(s["text"] for s in spans)
            in_caption = in_caption or bool(CAPTION.match(ltxt))
            # Teks isi buku = Minion >= 9,5 pt dalam baris panjang (bisa menyusup ke potongan lama). Judul
            # subbab (kapital semua) dan teks serif kecil hanya dianggap teks buku bila di luar potongan lama;
            # teks lain di dalam potongan lama adalah label gambar dan tidak disentuh.
            serif = sum(len(s["text"]) for s in spans if "Minion" in s["font"]) > len(ltxt) / 2
            outside = (lr & r).get_area() < 0.5 * lr.get_area()
            words = re.findall(r"[A-Za-z]{2,}", ltxt)
            heading = len(words) >= 3 and all(w.isupper() for w in words)
            body = (serif and size >= 9.5 and lr.width > 100) or (outside and (heading or size >= 9.2 or (serif and lr.width > 60 and len(ltxt.split()) >= 2)))
            (stops if in_caption or body else labels).append(lr)
    # Baris lanjutan keterangan sering tersimpan sebagai blok terpisah (bahkan per kata): baris kecil
    # di kolom keterangan yang tepat di bawah baris keterangan sebelumnya ikut menjadi keterangan.
    for b in d["blocks"]:
        for l in b.get("lines", []):
            if not CAPTION.match("".join(x["text"] for x in l["spans"])):
                continue
            col = fitz.Rect(l["bbox"])
            # potongan lain yang sebaris dengan "Gambar ..." termasuk keterangan; kolom = lebar baris itu
            joined = True
            while joined:  # hanya potongan yang bersambung langsung (jarak < 12 pt) di baris yang sama
                joined = False
                for lr in [x for x in labels if abs(x.y0 - col.y0) < 3 and abs(x.y1 - col.y1) < 3]:
                    if lr.x0 - col.x1 < 12 and col.x0 - lr.x1 < 12:
                        labels.remove(lr)
                        stops.append(lr)
                        col |= lr
                        joined = True
            chain = [col]
            grew = True
            while grew:
                grew = False
                for lr in list(labels):
                    if col.x0 - 3 <= lr.x0 and lr.x1 <= col.x1 + 3 and any(0 <= lr.y0 - c.y0 <= 14 for c in chain):
                        labels.remove(lr)
                        stops.append(lr)
                        chain.append(lr)
                        grew = True
    pr = page.rect
    deco = decorations(page.parent)
    shapes = []
    for i in page.get_image_info(xrefs=True):
        ir = fitz.Rect(i["bbox"])
        if ir.get_area() >= pr.get_area() * 0.6 or i["xref"] in deco:
            continue
        if i["xref"] == 0 and not ir.intersects(r) and ir.width < 15 and ir.height < 15:
            continue  # kepingan kecil gambar inline di luar potongan lama (mis. logo "Clinical Note")
        if not ir.intersects(r) and ir.width < 80 and ir.height < 110 and not any(ir.intersects(fitz.Rect(t["bbox"])) for b in d["blocks"] for t in b.get("lines", [])):
            near_r = fitz.Rect(r.x0 - 6, r.y0 - 6, r.x1 + 6, r.y1 + 6)
            if not ir.intersects(near_r):
                continue  # gambar kecil terpisah di luar potongan lama (ikon/logo tepi halaman)
        shapes.append(ir)
    for dr in page.get_drawings():
        rr = fitz.Rect(dr["rect"])
        if rr.width > pr.width * 0.8 or rr.get_area() > pr.get_area() * 0.6:
            continue
        if rr.height < 1.5 and rr.width > 150:  # garis pemisah kolom/keterangan
            continue
        if not rr.intersects(r) and rr.width < 40 and rr.height < 40 and rr.get_area() < 60:
            continue  # titik/garis hias kecil di luar potongan lama
        shapes.append(rr)
    box = fitz.Rect(r)
    for _ in range(8):
        grown = fitz.Rect(box)
        near = fitz.Rect(box.x0 - 6, box.y0 - 6, box.x1 + 6, box.y1 + 6)
        for e in labels + shapes:
            if e.intersects(near) and not any(e.intersects(s) for s in stops):
                grown |= e
        if grown == box:
            break
        box = grown
    box = fitz.Rect(box.x0 - 3, box.y0 - 3, box.x1 + 3, box.y1 + 3) & pr
    # Logo/ikon buku yang berulang di banyak halaman, di luar potongan lama, ikut ditutup putih
    # (ikon berulang di dalam potongan lama, mis. ikon jantung di diagram, adalah bagian gambar).
    logos = [fitz.Rect(i["bbox"]) for i in page.get_image_info(xrefs=True) if i["xref"] in deco]
    logos = [fitz.Rect(g.x0 - 8, g.y0 - 8, g.x1 + 8, g.y1 + 8) for g in logos if g.intersects(box) and not g.intersects(r)]
    return box, [s for s in stops if s.intersects(box)] + logos, labels


def render_clean(page, box, masks, r, labels):
    """Render kotak, tutup teks buku dengan putih, buang hiasan lepas, lalu rapikan tepi kosong.

    Hiasan lepas = "pulau" gambar kecil tanpa label yang seluruhnya di luar potongan lama (mis. logo
    "Clinical Note" di tepi halaman). Hasil: (PIL, kotak akhir dalam poin).
    """
    pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=box, alpha=False)
    im = Image.frombytes("RGB", (pix.w, pix.h), pix.samples)
    draw = ImageDraw.Draw(im)
    for s in masks:
        draw.rectangle([(s.x0 - box.x0 - 1) * ZOOM, (s.y0 - box.y0 - 1) * ZOOM, (s.x1 - box.x0 + 1) * ZOOM, (s.y1 - box.y0 + 1) * ZOOM], fill="white")
    arr = np.asarray(im).copy()
    ink = np.asarray(im.convert("L")) < 250  # latar krem pucat tetap dihitung isi gambar
    grown = cv2.dilate(ink.astype(np.uint8), np.ones((9, 9), np.uint8))
    n, comp, stats, _ = cv2.connectedComponentsWithStats(grown)
    total = ink.sum()
    to_pt = lambda x, y: (box.x0 + x / ZOOM, box.y0 + y / ZOOM)
    for k in range(1, n):
        x, y, w, h, _ = stats[k]
        cr = fitz.Rect(*to_pt(x, y), *to_pt(x + w, y + h))
        part = (comp == k) & ink
        if not cr.intersects(r) and not any(cr.intersects(lb) for lb in labels) and part.sum() < 0.04 * total:
            arr[part] = 255
    im = Image.fromarray(arr)
    ink = np.asarray(im.convert("L")) < 250
    ys, xs = np.where(ink)
    pad = 6
    x0, y0 = max(0, xs.min() - pad), max(0, ys.min() - pad)
    x1, y1 = min(im.width, xs.max() + pad + 1), min(im.height, ys.max() + pad + 1)
    final = fitz.Rect(box.x0 + x0 / ZOOM, box.y0 + y0 / ZOOM, box.x0 + x1 / ZOOM, box.y0 + y1 / ZOOM)
    return im.crop((x0, y0, x1, y1)), final


results = []
for n, fg in enumerate(figs, 1):
    img = Image.open(io.BytesIO(z.read(fg["media"]))).convert("L")
    tpl = np.asarray(img)
    small = cv2.resize(tpl, (max(8, int(tpl.shape[1] * COARSE / ZOOM)), max(8, int(tpl.shape[0] * COARSE / ZOOM))), interpolation=cv2.INTER_AREA)
    cands = []
    for si, pno, pg in coarse_pages:
        if small.shape[0] > pg.shape[0] or small.shape[1] > pg.shape[1]:
            continue
        mx = cv2.minMaxLoc(cv2.matchTemplate(pg, small, cv2.TM_CCOEFF_NORMED))[1]
        cands.append((mx, si, pno))
    cands.sort(reverse=True)
    best = None
    for _, si, pno in cands[:4]:
        pg = gray(sources[si][pno], ZOOM)
        if tpl.shape[0] > pg.shape[0] or tpl.shape[1] > pg.shape[1]:
            continue
        _, mx, _, loc = cv2.minMaxLoc(cv2.matchTemplate(pg, tpl, cv2.TM_CCOEFF_NORMED))
        if not best or mx > best[0]:
            best = (mx, si, pno, loc)
    if not best or best[0] < 0.85:
        # Bukan potongan buku (mis. diagram buatan sendiri): gambar asli dipertahankan.
        results.append({"no": n, "caption": fg["caption"][:60], "source": None, "page": None,
                        "score": round(best[0], 3) if best else 0, "changed": False, "old_px": [tpl.shape[1], tpl.shape[0]]})
        fg["new"] = None
        img.save(report / f"{n:02d}_lama.png")
        print(f"{n:02d} skor {results[-1]['score']:.2f} bukan potongan buku -> gambar asli dipertahankan", flush=True)
        continue
    score, si, pno, (lx, ly) = best
    page = sources[si][pno]
    matched = fitz.Rect(lx / ZOOM, ly / ZOOM, (lx + tpl.shape[1]) / ZOOM, (ly + tpl.shape[0]) / ZOOM)
    box, masks, labels = figure_box(page, matched)
    clean, final = render_clean(page, box, masks, matched, labels)
    buf = io.BytesIO()
    clean.save(buf, "PNG")
    new_png = buf.getvalue()
    grew = [round(v, 1) for v in (matched.y0 - final.y0, final.y1 - matched.y1, matched.x0 - final.x0, final.x1 - matched.x1)]
    removed_text = any((m & matched).get_area() > 4 for m in masks)  # teks buku yang ikut di potongan lama
    changed = max(grew) > 4 or removed_text
    results.append({"no": n, "caption": fg["caption"][:60], "source": Path(sources[si].name).name, "page": pno + 1,
                     "score": round(score, 3), "grow_top_bottom_left_right_pt": grew, "changed": changed,
                     "removed_book_text": removed_text, "old_px": [tpl.shape[1], tpl.shape[0]], "new_px": list(clean.size)})
    fg["new"] = new_png if changed else None
    fg["new_size"] = clean.size
    Image.open(io.BytesIO(new_png)).save(report / f"{n:02d}_baru.png")
    img.save(report / f"{n:02d}_lama.png")
    print(f"{n:02d} skor {score:.2f} {Path(sources[si].name).name[:10]} hlm {pno + 1:3d} tambah(atas,bawah,kiri,kanan) {grew}{' teks-buku-dihapus' if removed_text else ''} {'DIGANTI' if changed else ''}", flush=True)

# Tulis DOCX baru: ganti berkas media yang berubah dan sesuaikan ukuran tampil.
new_xml = xml
rid_of = {v: k for k, v in rels.items()}
for fg in figs:
    if not fg["new"]:
        continue
    rid = rid_of[fg["media"][5:]]
    m = re.search(r'(<w:drawing>(?:(?!</w:drawing>).)*?r:embed="%s".*?</w:drawing>)' % rid, new_xml, re.S)
    block = m.group(1)
    cx, cy = map(int, re.search(r'<wp:extent cx="(\d+)" cy="(\d+)"', block).groups())
    w, h = fg["new_size"]
    ncx, ncy = cx, int(cx * h / w)
    if ncy > MAX_CY:
        ncx, ncy = int(ncx * MAX_CY / ncy), MAX_CY
    nb = block.replace(f'cx="{cx}" cy="{cy}"', f'cx="{ncx}" cy="{ncy}"')
    new_xml = new_xml.replace(block, nb, 1)

with zipfile.ZipFile(docx_out, "w", zipfile.ZIP_DEFLATED) as zo:
    replaced = {fg["media"]: fg["new"] for fg in figs if fg["new"]}
    for item in z.infolist():
        data = z.read(item.filename)
        if item.filename == "word/document.xml":
            data = new_xml.encode("utf8")
        elif item.filename in replaced:
            data = replaced[item.filename]
        zo.writestr(item, data)
(report / "laporan.json").write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf8")
print("diganti:", sum(r["changed"] for r in results), "dari", len(results), "| bukan potongan buku:", [r["no"] for r in results if r["source"] is None])
