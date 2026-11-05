"""Potong gambar buku berdasarkan posisi keterangan 'Figure N-M' di halaman."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
import potong_fitz as pf
import pymupdf

def indeks():
    idx = {}
    for l in open(os.path.join(pf.AKAR, 'ingatan/ekstraksi/indeks_gambar_fitz.tsv'), encoding='utf-8'):
        a = l.rstrip('\n').split('\t'); idx.setdefault(a[0], int(a[1]))
    return idx

def kolom(c, pw):
    if c.x0 > pw * 0.48: return pw * 0.48, pw - 30
    if c.x1 < pw * 0.55: return 30, pw * 0.55
    return 30, pw - 30

def potong(fig, pg):
    d = pymupdf.open(pf.SUMBER['fitz']); p = d[pg - 1]; pw = p.rect.width
    hits = p.search_for('Figure ' + fig + ' ') or p.search_for('Figure ' + fig)
    if not hits: return 'tanpa keterangan'
    c = hits[0]
    x0, x1 = kolom(c, pw)
    ims = [pymupdf.Rect(x['bbox']) for x in p.get_image_info() if (x['bbox'][2]-x['bbox'][0]) > 60 and not ((x['bbox'][2]-x['bbox'][0]) < 80)]
    ims = [r for r in ims if r.width > 60 and r.height > 40 and r.y1 <= c.y0 + 8 and r.x1 > x0 and r.x0 < x1]
    if ims:
        bot = max(r.y1 for r in ims)
        sel = [r for r in ims if bot - r.y1 < 260]
        # ambil kelompok yang berdekatan di atas keterangan
        sel.sort(key=lambda r: -r.y1)
        R = sel[0]
        for r in sel[1:]:
            if R.y0 - r.y1 < 25: R |= r
        pf.simpan(p, R, 'fig_' + fig); return 'raster'
    dr = [pymupdf.Rect(g['rect']) for g in p.get_drawings()]
    dr = [r for r in dr if r.y1 <= c.y0 + 4 and r.x0 >= x0 - 5 and r.x1 <= x1 + 5 and r.width < 600]
    if not dr: return 'tidak ada gambar'
    dr.sort(key=lambda r: -r.y1)
    R = dr[0]
    for r in dr[1:]:
        if R.y0 - r.y1 < 30: R |= r
    R = pymupdf.Rect(R.x0 - 4, R.y0 - 4, R.x1 + 4, min(R.y1 + 4, c.y0 - 1))
    pf.simpan(p, R, 'fig_' + fig); return 'vektor'

if __name__ == '__main__':
    idx = indeks()
    for f in sys.argv[1:]:
        print(f, potong(f, idx[f]))
