"""Ilustrasi buatan sendiri (data dari sumber yang dirujuk di keterangan gambar).

Pemakaian: python ilustrasi.py
"""
import os

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

AKAR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AKAR, "gambar")
plt.rcParams["font.family"] = "Times New Roman"
KUNING = "#FFD20A"
KUNING_MUDA = "#FFF4C2"
ABU = "#F2F2F2"


def kotak(ax, x, y, w, h, teks, warna=ABU, ukuran=11, tebal=False):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08",
                                fc=warna, ec="black", lw=1))
    ax.text(x + w / 2, y + h / 2, teks, ha="center", va="center", fontsize=ukuran,
            fontweight="bold" if tebal else "normal", wrap=True)


def panah(ax, x0, y0, x1, y1):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0),
                arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))


def simpan(fig, nama):
    fig.savefig(os.path.join(OUT, nama + ".png"), dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(nama)


def bab01_alur():
    langkah = ["Persiapan", "Triase", "Survei primer\n(ABCDE)", "Resusitasi",
               "Pemeriksaan\ntambahan\nsurvei primer", "Pertimbangan\nrujukan",
               "Survei sekunder", "Pemeriksaan\ntambahan\nsurvei sekunder",
               "Pemantauan dan\nevaluasi ulang", "Perawatan definitif"]
    fig, ax = plt.subplots(figsize=(10, 4.2))
    ax.set_xlim(0, 10); ax.set_ylim(0, 4.2); ax.axis("off")
    w, h = 1.7, 0.95
    xs = [0.1, 2.1, 4.1, 6.1, 8.1]
    for i, t in enumerate(langkah[:5]):
        kotak(ax, xs[i], 2.9, w, h, t, KUNING_MUDA if i in (2, 3) else ABU, 10.5)
        if i:
            panah(ax, xs[i - 1] + w, 3.375, xs[i], 3.375)
    for i, t in enumerate(langkah[5:]):
        x = xs[4 - i]
        kotak(ax, x, 0.6, w, h, t, KUNING if i == 4 else (KUNING_MUDA if i == 1 else ABU), 10.5, i == 4)
        if i:
            panah(ax, xs[5 - i], 1.075, x + w, 1.075)
    panah(ax, xs[4] + w / 2, 2.9, xs[4] + w / 2, 0.6 + h)
    ax.annotate("", xy=(xs[2] + 0.3, 2.9), xytext=(xs[1] + w - 0.3, 0.6 + h),
                arrowprops=dict(arrowstyle="-|>", color="#7A7A7A", lw=1.1, ls="--"))
    ax.text(xs[1] + w - 0.1, 2.25, "nilai ulang bila\nkondisi memburuk", fontsize=9.5,
            color="#444444", va="center", ha="right")
    simpan(fig, "bab01_alur")


def bab02_lingkaran():
    import math
    teks = ["Perfusi jaringan\ntidak adekuat", "Hipoksia sel\nmetabolisme anaerob\nlaktat meningkat",
            "Jejas sel\nmediator inflamasi", "Gangguan aliran\nmikrovaskular", "Perfusi sel\nmakin buruk"]
    fig, ax = plt.subplots(figsize=(8, 6.6))
    ax.set_xlim(-4.3, 4.3); ax.set_ylim(-3.6, 3.7); ax.axis("off"); ax.set_aspect("equal")
    r, w, h = 2.95, 2.3, 1.1
    pos = []
    for i, t in enumerate(teks):
        a = math.pi / 2 - i * 2 * math.pi / len(teks)
        x, y = r * math.cos(a), r * math.sin(a)
        pos.append((x, y))
        kotak(ax, x - w / 2, y - h / 2, w, h, t, KUNING_MUDA if i == 0 else ABU, 11)
    for i in range(len(pos)):
        (x0, y0), (x1, y1) = pos[i], pos[(i + 1) % len(pos)]
        dx, dy = x1 - x0, y1 - y0
        L = math.hypot(dx, dy)
        f = 0.36
        ax.annotate("", xy=(x1 - dx * f, y1 - dy * f), xytext=(x0 + dx * f, y0 + dy * f),
                    arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    kotak(ax, -1.05, -0.75, 2.1, 0.85, "Disfungsi dan\ngagal organ", KUNING, 11.5, True)
    ax.annotate("", xy=(0, 0.1), xytext=(0, 2.3), arrowprops=dict(arrowstyle="-|>", color="#7A7A7A", lw=1.1, ls="--"))
    simpan(fig, "bab02_lingkaran_syok")


def bab05_alur_bhd():
    fig, ax = plt.subplots(figsize=(8.6, 9.2))
    ax.set_xlim(0, 10); ax.set_ylim(0, 11); ax.axis("off")
    kotak(ax, 2.2, 9.7, 5.6, 1.0, "Lokasi aman. Tidak responsif dan napas\ntidak ada atau hanya gasping", KUNING_MUDA, 11)
    kotak(ax, 2.2, 8.1, 5.6, 1.0, "Aktifkan sistem gawat darurat\ndan minta AED atau defibrilator", ABU, 11)
    kotak(ax, 2.2, 6.5, 5.6, 1.0, "Tenaga kesehatan: raba nadi\npaling lama 10 detik", ABU, 11)
    kotak(ax, 0.1, 4.6, 3.9, 1.2, "Nadi teraba, napas tidak normal:\n1 napas tiap 6 detik\n(10 kali per menit)", ABU, 10.5)
    kotak(ax, 5.2, 4.6, 4.7, 1.2, "Nadi tidak teraba pasti:\nRJP 30 kompresi : 2 napas\nmulai dengan kompresi", KUNING, 10.5, True)
    kotak(ax, 5.2, 2.85, 4.7, 1.2, "AED tiba: pasang pad,\nanalisis ritme", ABU, 10.5)
    kotak(ax, 2.6, 0.6, 3.7, 1.35, "Ritme dapat dikejut:\nberi kejutan listrik,\nsegera lanjutkan RJP", KUNING_MUDA, 10.5)
    kotak(ax, 6.6, 0.6, 3.3, 1.35, "Ritme tidak dapat\ndikejut: segera\nlanjutkan RJP", ABU, 10.5)
    panah(ax, 5, 9.7, 5, 9.1)
    panah(ax, 5, 8.1, 5, 7.5)
    panah(ax, 3.8, 6.5, 2.4, 5.8)
    panah(ax, 6.2, 6.5, 7.4, 5.8)
    panah(ax, 7.55, 4.6, 7.55, 4.05)
    panah(ax, 6.6, 2.85, 5.0, 1.95)
    panah(ax, 8.2, 2.85, 8.2, 1.95)
    ax.text(0.1, 3.4, "Kualitas RJP:\nkedalaman 5 sampai 6 cm\nlaju 100 sampai 120 per menit\nrekoil penuh\njeda sesingkat mungkin\nganti pengompresi tiap 2 menit",
            fontsize=10, va="center", ha="left",
            bbox=dict(boxstyle="round,pad=0.4", fc="white", ec=KUNING, lw=1.5))
    simpan(fig, "bab05_alur_bhd")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    bab01_alur()
    bab02_lingkaran()
    bab05_alur_bhd()
