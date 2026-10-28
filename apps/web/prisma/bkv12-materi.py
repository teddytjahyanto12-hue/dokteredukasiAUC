"""Siapkan materi BKV-12 (Blok 12 Sistem Kardiovaskuler, Basic Medical Science) untuk website.

Sumber: "Materi Basic Medical Science/BKV-12/Materi WEBSITE/Bahasan_NN_*.pdf" (20 bahasan).
Langkah:
  1. PDF disalin ke <storage>/bms-bkv12/<sha256>.pdf (nama berdasarkan isi, tidak menimpa versi lain).
  2. Tiap halaman dirender ke <storage>/srma-pages/<sha256>/page-NNN.png (tampilan tanpa unduh PDF asli).
  3. SQL migrasi ditulis: 4 kelompok bahasan @5 PDF, kelompok 1 (bahasan 1-5) gratis untuk akun terdaftar,
     sisanya untuk pemilik paket; topik lama yang masih terbit di BKV-12 disembunyikan (tidak dihapus).

Database tidak disentuh skrip ini; perubahan data berjalan lewat `prisma migrate deploy` saat server start.
Pemakaian: python -I prisma/bkv12-materi.py <folder Materi WEBSITE> <folder storage> <berkas migration.sql>
"""
import hashlib
import json
import re
import shutil
import sys
import time
from pathlib import Path

import pymupdf as fitz

source, storage, out = (Path(p).resolve() for p in sys.argv[1:4])
GROUPS = [
    "Struktur dan Aktivitas Listrik Jantung",
    "Mekanika Jantung dan Dasar Aliran Darah",
    "Pembuluh Darah dan Regulasi Sirkulasi",
    "Korelasi Penyakit dan Penerapan Dasar",
]
NOTE = "Modul Fisiologi Kardiovaskular Dokter Edukasi Academy (rujukan utama Sherwood & CaKes)."

files = sorted(source.glob("Bahasan_[0-9][0-9]_*.pdf"))
if [int(f.name[8:10]) for f in files] != list(range(1, 21)):
    raise SystemExit(f"Diperlukan Bahasan_01 s.d. Bahasan_20, ditemukan {[f.name for f in files]}")


def q(text: str) -> str:
    return "'" + text.replace("'", "''") + "'"


now = int(time.time() * 1000)
cat = "(SELECT id FROM Category WHERE code = 'BKV-12')"
sql = [
    "-- Materi BKV-12 (Blok 12 Sistem Kardiovaskuler): 20 bahasan PDF dalam 4 kelompok.",
    "-- Dibuat oleh prisma/bkv12-materi.py; berkas PDF & gambar halaman sudah ada di storage server.",
    "-- Aman dijalankan pada database kosong (semua INSERT bergantung pada Blok BKV-12 yang ada).",
    "",
    "-- Topik lama yang masih terbit (contoh 'Bab 1') disembunyikan, riwayatnya tetap.",
    f"UPDATE Topic SET published = false WHERE categoryId = {cat} AND published = true AND id NOT LIKE 'dea-bkv12-%';",
    "-- Deskripsi kelas bawaan menyebut kuis per Bab; diganti hanya bila belum diubah admin.",
    "UPDATE Category SET description = 'Blok 12 tahap akademik (preklinik). 20 bahasan fisiologi kardiovaskular dalam 4 bagian, dari struktur dan listrik jantung hingga korelasi penyakit. Bagian 1 (bahasan 1–5) gratis untuk akun terdaftar.' "
    "WHERE code = 'BKV-12' AND description LIKE 'Blok 12 tahap akademik (preklinik). Materi dibagi per Bab%';",
    "",
]
for g, title in enumerate(GROUPS, 1):
    first, last = (g - 1) * 5 + 1, g * 5
    desc = f"Bahasan {first}–{last}. " + ("Gratis untuk semua akun terdaftar." if g == 1 else "Tersedia untuk pemilik paket Blok Kardiovaskuler atau Basic Medical Science.")
    sql.append(
        f'INSERT OR IGNORE INTO Topic (id, categoryId, title, description, "order", published) '
        f"SELECT 'dea-bkv12-group-{g}', id, {q(title)}, {q(desc)}, {g}, true FROM Category WHERE code = 'BKV-12';"
    )
sql.append("")

total_pages = 0
for no, pdf in enumerate(files, 1):
    data = pdf.read_bytes()
    if not data.startswith(b"%PDF-"):
        raise SystemExit(f"PDF tidak valid: {pdf.name}")
    digest = hashlib.sha256(data).hexdigest()
    rel = f"bms-bkv12/{digest}.pdf"
    (storage / "bms-bkv12").mkdir(parents=True, exist_ok=True)
    if not (storage / rel).exists():
        shutil.copyfile(pdf, storage / rel)
    pages_dir = storage / "srma-pages" / digest
    pages_dir.mkdir(parents=True, exist_ok=True)
    pages = []
    with fitz.open(pdf) as doc:
        heading = next((m.group(0).strip() for m in [re.search(r"Bahasan\s+\d+\.\s+[^\n]+", doc[0].get_text())] if m), None)
        for i, page in enumerate(doc, 1):
            target = pages_dir / f"page-{i:03d}.png"
            if not target.exists():
                page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(str(target))
            pages.append(f"srma-pages/{digest}/{target.name}")
    total_pages += len(pages)
    title = re.sub(r"\s+", " ", heading) if heading else f"Bahasan {no}. " + pdf.stem[11:].replace("_", " ")
    file_id = f"dea-bkv12-pdf-{digest[:24]}"
    group = (no - 1) // 5 + 1
    sql += [
        f"INSERT OR IGNORE INTO FileAsset (id, storagePath, originalName, mimeType, size, isPublic, createdAt) "
        f"VALUES ({q(file_id)}, {q(rel)}, {q(pdf.name)}, 'application/pdf', {len(data)}, false, {now});",
        f'INSERT OR IGNORE INTO Item (id, topicId, type, title, fileId, sourceNote, isFree, "order", published, createdAt) '
        f"SELECT 'dea-bkv12-item-{no:02d}', id, 'PDF', {q(title)}, {q(file_id)}, {q(NOTE)}, {'true' if group == 1 else 'false'}, {no}, true, {now} "
        f"FROM Topic WHERE id = 'dea-bkv12-group-{group}';",
        f"INSERT OR IGNORE INTO Setting (key, value) VALUES ({q('material.pdf-pages.' + file_id)}, {q(json.dumps({'pages': pages}))});",
        "",
    ]
    print(f"{no:02d} {len(pages):2d} hlm  {title}", flush=True)

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text("\n".join(sql), encoding="utf-8")
print(f"Selesai: 20 PDF / {total_pages} halaman; SQL -> {out}")
