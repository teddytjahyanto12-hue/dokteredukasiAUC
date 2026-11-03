"""Ilustrasi Dokter Edukasi Academy (data dari sumber yang dirujuk di keterangan).
Pemakaian: python ilustrasi.py [nama]"""
import os
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

AKAR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AKAR, "gambar")
KUNING, BIRU, HIJAU, MERAH, ABU = "#FFD20A", "#9cc9e8", "#b5dfa8", "#f4b6b0", "#e6e6e6"
plt.rcParams["font.family"] = "DejaVu Sans"


def kotak(ax, x, y, w, h, teks, warna, ukuran=10, tebal=False):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08",
                                fc=warna, ec="#333333", lw=1))
    ax.text(x + w / 2, y + h / 2, teks, ha="center", va="center", fontsize=ukuran,
            fontweight="bold" if tebal else "normal", wrap=True)


def panah(ax, x0, y0, x1, y1):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0), arrowprops=dict(arrowstyle="->", lw=1.2, color="#333333"))


def simpan(fig, nama):
    fig.savefig(os.path.join(OUT, nama + ".png"), dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def bab02_vesikel():
    fig, ax = plt.subplots(figsize=(11, 6.2))
    ax.set_xlim(0, 11); ax.set_ylim(0, 6.4); ax.axis("off")
    for x, t in ((0.2, "Tabung saraf\n(minggu 3-4)"), (2.5, "Tiga vesikel"), (5.0, "Lima vesikel\n(lengkap minggu 6)"), (8.0, "Turunan dewasa")):
        ax.text(x + 1.0 if x < 8 else x + 1.4, 6.2, t, ha="center", va="top", fontsize=10, fontweight="bold")
    kotak(ax, 0.2, 1.0, 2.0, 4.4, "Tabung saraf\n\nbagian kranial\n→ otak\n\nbagian kaudal\n→ medula\nspinalis", ABU, 10)
    v3 = [("Prosensefalon\n(otak depan)", 4.0, 1.0), ("Mesensefalon\n(otak tengah)", 2.75, 0.75), ("Rombensefalon\n(otak belakang)", 1.0, 1.0)]
    v5 = [("Telensefalon", 4.6, KUNING), ("Diensefalon", 3.85, KUNING), ("Mesensefalon", 2.9, BIRU), ("Metensefalon", 1.9, HIJAU), ("Mielensefalon", 1.1, HIJAU)]
    dewasa = [("Hemisfer serebri, ganglia basalis\nVentrikel lateral", 4.6), ("Talamus, hipotalamus, epitalamus,\nsubtalamus. Ventrikel III", 3.85),
              ("Otak tengah\nAkuaduktus serebri", 2.9), ("Pons dan serebelum\nVentrikel IV", 1.9), ("Medula oblongata\nVentrikel IV", 1.1)]
    warna3 = [KUNING, BIRU, HIJAU]
    for (t, y, h), w in zip(v3, warna3):
        kotak(ax, 2.6, y, 1.9, h, t, w, 9.5)
    for t, y, w in v5:
        kotak(ax, 5.1, y, 1.9, 0.6, t, w, 9.5)
    for t, y in dewasa:
        kotak(ax, 7.8, y, 3.1, 0.6, t, "white", 8.8)
        panah(ax, 7.0, y + 0.3, 7.8, y + 0.3)
    for y5, y3 in ((4.9, 4.5), (4.15, 4.5), (3.2, 3.12), (2.2, 1.5), (1.4, 1.5)):
        panah(ax, 4.5, y3, 5.1, y5)
    panah(ax, 2.2, 3.2, 2.6, 3.2)
    simpan(fig, "bab02_vesikel")


def bab25_lokalisasi():
    fig, ax = plt.subplots(figsize=(11, 8.2))
    ax.set_xlim(0, 11); ax.set_ylim(0, 8.4); ax.axis("off")
    tingkat = [
        ("Hemisfer serebri", "Defisit sesisi (hemi), hiperrefleksia, refleks patologis.\nKorteks: afasia, apraksia, kejang, gangguan kognitif", KUNING),
        ("Ganglia basalis", "Gangguan gerak hipokinetik (bradikinesia, rigiditas)\natau hiperkinetik (korea), tremor", KUNING),
        ("Serebelum", "Tremor, inkoordinasi, gangguan jalan, disartria, nistagmus.\nTanpa kelemahan dan tanpa gangguan sensorik", BIRU),
        ("Batang otak", "Defisit menyilang: saraf kranial satu sisi,\nmotorik atau sensorik sisi berlawanan", BIRU),
        ("Medula spinalis", "Kelemahan di bawah tingkat lesi, batas sensorik,\ngangguan kandung kemih dan usus", HIJAU),
        ("Akar saraf", "Nyeri radikular, defisit motorik-sensorik dan\nrefleks menurun sesuai akar", MERAH),
        ("Saraf tepi", "Polineuropati: distal simetris, pola kaus kaki-sarung tangan,\nrefleks menurun. Mononeuropati: sesuai satu saraf", MERAH),
        ("Taut neuromuskular", "Kelemahan proksimal yang mudah lelah dan berfluktuasi,\nptosis, diplopia, gangguan bulbar, tanpa gangguan sensorik", ABU),
        ("Otot", "Kelemahan proksimal simetris, refleks umumnya normal,\ntanpa gangguan sensorik, jalan bergoyang", ABU),
    ]
    y = 7.55
    for nama, ciri, w in tingkat:
        kotak(ax, 0.2, y, 2.6, 0.72, nama, w, 10, True)
        kotak(ax, 3.1, y, 7.7, 0.72, ciri, "white", 9)
        panah(ax, 2.8, y + 0.36, 3.1, y + 0.36)
        y -= 0.86
    ax.text(0.02, 6.19, "SSP", rotation=90, ha="center", va="center", fontsize=11, fontweight="bold")
    ax.text(0.02, 2.32, "SST", rotation=90, ha="center", va="center", fontsize=11, fontweight="bold")
    simpan(fig, "bab25_lokalisasi")


SEMUA = {"bab02_vesikel": bab02_vesikel, "bab25_lokalisasi": bab25_lokalisasi}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for n, f in SEMUA.items():
        if len(sys.argv) < 2 or n.startswith(sys.argv[1]):
            f()
            print(n)
