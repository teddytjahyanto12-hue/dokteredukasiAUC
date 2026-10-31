"""Pemeriksaan akhir naskah: dash, nama sumber, CaKes, AI, nomor halaman, urutan subjudul, sitasi."""
import glob, os, re, sys
bad = []
for f in sorted(glob.glob("naskah/*.md")):
    s = open(f, encoding="utf-8").read()
    n = os.path.basename(f)[:6]
    t = re.sub(r"\[@[^\]]+\]", "", s)
    t = re.sub(r"^\|[-|]+\|$", "", t, flags=re.M)
    for pat, lab in [(r"--", "--"), ("—", "emdash"), ("–", "endash"),
                     (r"(?i)cakes|catatan ?siswa|catatansiswa", "CAKES"),
                     (r"(?i)\bAI\b|kecerdasan buatan|otomatis dibuat|ChatGPT|Claude", "AI"),
                     (r"(?i)abbas|sherwood|lichtman|pillai|robbins|janeway|netea|pollard|ander|cardona", "NAMA"),
                     (r"(?i)\bhal(aman)?\.? \d+|\bh\. \d+", "HAL")]:
        for m in re.finditer(pat, t):
            bad.append((n, lab, t[max(0, m.start() - 30):m.end() + 30].replace("\n", " ")))
    secs = re.split(r"\n### ", s)
    for sec in secs:
        title = sec.split("\n")[0]
        if title in ("Hubungan sebab-akibat", "Korelasi klinis", "Rangkuman"):
            for line in sec.split("\n")[1:]:
                if line.startswith("- ") and "[@" not in line:
                    bad.append((n, "NOCITE " + title, line[:70]))
        if title == "Konsep dasar" and "[@" not in sec:
            bad.append((n, "NOCITE konsep", ""))
    order = [l.split("\n")[0] for l in secs[1:]]
    exp = ["Tujuan belajar", "Konsep dasar", "Gambar", "Hubungan sebab-akibat", "Korelasi klinis", "Rangkuman", "Soal aplikasi"]
    if order != exp:
        bad.append((n, "URUTAN", str(order)))
    for g in re.findall(r"\]\((gambar/[^)]+)\)", s):
        if not os.path.exists(g):
            bad.append((n, "GAMBAR HILANG", g))
for b in bad:
    print(b)
print("total", len(bad))
ris = open("ingatan/sumber.ris", encoding="utf-8").read()
keys = set(re.findall(r"^ID  - (\S+)", ris, re.M))
used = set()
for f in glob.glob("naskah/*.md"):
    for grp in re.findall(r"\[(@[^\]]+)\]", open(f, encoding="utf-8").read()):
        used |= {k.strip().lstrip("@") for k in grp.split(";")}
print("tak ada di ris:", used - keys, "tak terpakai:", keys - used)
print("CaKes di ris:", bool(re.search(r"(?i)cakes|catatansiswa|catatan siswa", ris)))
