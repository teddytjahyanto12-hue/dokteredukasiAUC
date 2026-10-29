"""Mengisi daftar isi (TOC) lewat Microsoft Word lalu menyimpan PDF.

Pemakaian: python isi_daftar_isi.py
Memproses keluaran/Modul_Gawat_Darurat.docx dan semua DOCX di
keluaran/DOCX per BAB. PDF disimpan di keluaran/ dan keluaran/PDF per BAB/.
"""
import glob
import os
import subprocess
import tempfile

AKAR = os.path.dirname(os.path.abspath(__file__))
KEL = os.path.join(AKAR, "keluaran")

PS = r'''
$ErrorActionPreference = "Stop"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  foreach ($baris in Get-Content -LiteralPath "%DAFTAR%" -Encoding UTF8) {
    $src, $pdf = $baris -split "\|"
    $doc = $word.Documents.Open($src, $false, $false)
    foreach ($t in $doc.TablesOfContents) { $t.Update() }
    $doc.Fields.Update() | Out-Null
    foreach ($t in $doc.TablesOfContents) { $t.Update() }
    $doc.Save()
    $doc.ExportAsFixedFormat($pdf, 17)
    $doc.Close($false)
    Write-Output "OK $pdf"
  }
} finally { $word.Quit() }
'''


def main():
    os.makedirs(os.path.join(KEL, "PDF per BAB"), exist_ok=True)
    pasangan = [(os.path.join(KEL, "Modul_Gawat_Darurat.docx"),
                 os.path.join(KEL, "Modul_Gawat_Darurat.pdf"))]
    for f in sorted(glob.glob(os.path.join(KEL, "DOCX per BAB", "*.docx"))):
        nama = os.path.splitext(os.path.basename(f))[0]
        pasangan.append((f, os.path.join(KEL, "PDF per BAB", nama + ".pdf")))
    tmpdir = tempfile.mkdtemp()
    daftar = os.path.join(tmpdir, "daftar.txt")
    with open(daftar, "w", encoding="utf-8") as fh:
        fh.write("\n".join(f"{a}|{b}" for a, b in pasangan))
    skrip = os.path.join(tmpdir, "isi.ps1")
    with open(skrip, "w", encoding="utf-8-sig") as fh:
        fh.write(PS.replace("%DAFTAR%", daftar))
    subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", skrip], check=True)


if __name__ == "__main__":
    main()
