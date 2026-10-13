"""Render Case Report PDF pages privately, preserving PDF source files and all user data.

Run with Python containing pymupdf. Arguments: application directory, then one
or more SQLite database paths (shared/runtime). Only material.pdf-pages settings
are inserted/updated; no schema, user, quiz or progress records are modified.
"""
import hashlib
import json
from pathlib import Path
import sqlite3
import sys
import pymupdf as fitz

app = Path(sys.argv[1]).resolve()
databases = [Path(p).resolve() for p in sys.argv[2:]]
if not databases:
    raise SystemExit("Specify at least one database path")
db = sqlite3.connect(databases[0], timeout=30)
files = db.execute('SELECT DISTINCT f.id,f.storagePath FROM FileAsset f JOIN Item i ON i.fileId=f.id WHERE i.id LIKE ? ORDER BY i."order"', ('dea-case-report-chapter-%',)).fetchall()
db.close()
if len(files) != 18:
    raise SystemExit(f"Expected 18 Case Report PDFs, got {len(files)}")
records = []
for file_id, source in files:
    pdf_path = app / "storage" / source
    digest = hashlib.sha256(pdf_path.read_bytes()).hexdigest()
    directory = app / "storage" / "srma-pages" / digest
    directory.mkdir(parents=True, exist_ok=True)
    paths = []
    with fitz.open(pdf_path) as document:
        for number, page in enumerate(document, 1):
            image = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            output = directory / f"page-{number:03d}.png"
            image.save(str(output))
            paths.append(f"srma-pages/{digest}/{output.name}")
    if not paths:
        raise ValueError(f"Empty PDF {file_id}")
    records.append((f"material.pdf-pages.{file_id}", json.dumps({"pages": paths})))
    print(file_id, len(paths), "pages", flush=True)
for database in databases:
    connection = sqlite3.connect(database, timeout=30)
    with connection:
        connection.executemany('INSERT INTO Setting (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value', records)
    connection.close()
print("Registered", len(records), "PDFs /", sum(len(json.loads(value)["pages"]) for _, value in records), "pages in", len(databases), "databases")
