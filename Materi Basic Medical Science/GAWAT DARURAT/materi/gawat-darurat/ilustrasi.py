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


def bab08_distribusi():
    fig, ax = plt.subplots(figsize=(9, 4.2))
    ax.set_xlim(0, 10); ax.set_ylim(0, 4.4); ax.axis("off")
    for x0, judul, intra in ((0.3, "1.000 mL kristaloid", 25), (5.3, "1.000 mL koloid", 75)):
        ax.text(x0 + 2.2, 4.1, judul, ha="center", fontsize=12, fontweight="bold")
        lebar = 4.4
        wi = lebar * intra / 100
        ax.add_patch(FancyBboxPatch((x0, 1.6), wi, 1.6, boxstyle="square,pad=0", fc=KUNING, ec="black"))
        ax.add_patch(FancyBboxPatch((x0 + wi, 1.6), lebar - wi, 1.6, boxstyle="square,pad=0", fc=ABU, ec="black"))
        label = f"{intra}%\nintra-\nvaskular" if intra < 50 else f"{intra}%\nintravaskular"
        ax.text(x0 + wi / 2, 2.4, label, ha="center", va="center", fontsize=10.5)
        ax.text(x0 + wi + (lebar - wi) / 2, 2.4, f"{100 - intra}%\nruang lain", ha="center", va="center", fontsize=10.5)
    ax.text(5, 0.8, "Kristaloid terutama tersebar di cairan ekstraseluler; koloid terutama tetap di pembuluh darah.",
            ha="center", fontsize=10.5)
    simpan(fig, "bab08_distribusi_cairan")


def bab09_alur_agd():
    fig, ax = plt.subplots(figsize=(9.5, 7.6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 9.2); ax.axis("off")
    kotak(ax, 3.0, 8.1, 4.0, 0.85, "1. pH: kurang dari 7,35 asidemia,\nlebih dari 7,45 alkalemia", KUNING_MUDA, 10.5)
    kotak(ax, 0.2, 6.3, 4.4, 1.1, "2a. HCO3 turun (kurang dari 24):\nasidosis metabolik", ABU, 10.5)
    kotak(ax, 5.4, 6.3, 4.4, 1.1, "2b. PaCO2 naik (lebih dari 45):\nasidosis respiratorik", ABU, 10.5)
    kotak(ax, 0.2, 4.2, 4.4, 1.4, "3. Kompensasi: HCO3 turun 1 →\nPaCO2 turun 1,2 mmHg.\nLebih sedikit: + asidosis respiratorik\nLebih banyak: + alkalosis respiratorik", ABU, 10)
    kotak(ax, 5.4, 4.2, 4.4, 1.4, "3. Akut: HCO3 naik sekitar 1 mEq/L\nper kenaikan PaCO2 10 mmHg.\nKronik: kompensasi ginjal,\npH mendekati normal", ABU, 10)
    kotak(ax, 0.2, 2.1, 4.4, 1.4, "4. Anion gap = Na − (HCO3 + Cl)\nnormal 7 sampai 13 mEq/L", KUNING, 10.5, True)
    kotak(ax, 0.0, 0.1, 2.25, 1.55, "Meningkat:\nlaktat, ketoasidosis,\nmetanol, etilen glikol,\nsalisilat, penyakit\nginjal kronik", ABU, 9.5)
    kotak(ax, 2.45, 0.1, 2.25, 1.55, "Normal:\nenteritis (diare),\nRTA, penghambat\nkarbonik anhidrase", ABU, 9.5)
    panah(ax, 4.2, 8.1, 2.6, 7.4); panah(ax, 5.8, 8.1, 7.4, 7.4)
    panah(ax, 2.4, 6.3, 2.4, 5.6); panah(ax, 7.6, 6.3, 7.6, 5.6)
    panah(ax, 2.4, 4.2, 2.4, 3.5); panah(ax, 1.6, 2.1, 1.1, 1.65); panah(ax, 3.2, 2.1, 3.6, 1.65)
    simpan(fig, "bab09_alur_agd")


def bab10_jaras_nyeri():
    langkah = [("Nosiseptor", "ujung bebas serabut A-delta (bermielin tipis)\ndan serabut C (tanpa mielin)"),
               ("Ganglion radiks dorsalis", "ganglion spinalis; impuls masuk melalui\nradiks dorsalis"),
               ("Kornu dorsalis\nmedula spinalis", "substansia gelatinosa; neuron kedua\nmenyilang garis tengah"),
               ("Traktus spinotalamikus\nlateralis", "naik melalui medula oblongata, pons,\ndan mesensefalon"),
               ("Talamus", "nukleus ventroposterolateral; neuron ketiga"),
               ("Korteks somatosensorik", "susunan somatotopik: tungkai di atas,\nlengan di tengah, kepala di bawah")]
    fig, ax = plt.subplots(figsize=(8.4, 8.2))
    ax.set_xlim(0, 10); ax.set_ylim(0, 12.3); ax.axis("off")
    for i, (judul, isi) in enumerate(langkah):
        y = 10.6 - i * 2.05
        kotak(ax, 0.3, y, 3.6, 1.25, judul, KUNING if i in (0, 5) else KUNING_MUDA, 10.5, True)
        ax.text(4.2, y + 0.62, isi, va="center", fontsize=10.5)
        if i:
            panah(ax, 2.1, y + 2.05, 2.1, y + 1.25)
    simpan(fig, "bab10_jaras_nyeri")


def bab11_ekg():
    import numpy as np
    t = np.linspace(0, 1.0, 2000)

    def g(c, w, a):
        return a * np.exp(-((t - c) / w) ** 2)
    v = (g(0.12, 0.025, 0.15) - g(0.255, 0.008, 0.12) + g(0.275, 0.010, 1.1)
         - g(0.295, 0.009, 0.28) + g(0.52, 0.045, 0.32))
    fig, ax = plt.subplots(figsize=(10, 4.6))
    for x in np.arange(0, 1.0001, 0.04):
        ax.axvline(x, color="#F3C9C9", lw=0.4 if round(x / 0.04) % 5 else 1.0, zorder=0)
    for y in np.arange(-0.6, 1.61, 0.1):
        ax.axhline(y, color="#F3C9C9", lw=0.4 if round(y / 0.1) % 5 else 1.0, zorder=0)
    ax.plot(t, v, color="black", lw=1.8)
    for x, y, s in ((0.12, 0.26, "P"), (0.245, -0.22, "Q"), (0.245, 1.0, "R"), (0.305, -0.4, "S"), (0.52, 0.42, "T")):
        ax.text(x, y, s, ha="center", fontsize=12, fontweight="bold")

    def rentang(x0, x1, y, teks, dy=-0.08, va="top"):
        ax.annotate("", xy=(x0, y), xytext=(x1, y), arrowprops=dict(arrowstyle="<->", color="#B07D00", lw=1.3))
        ax.text((x0 + x1) / 2, y + dy, teks, ha="center", va=va, fontsize=10.5,
                bbox=dict(boxstyle="square,pad=0.1", fc="white", ec="none"))
    rentang(0.095, 0.25, -0.6, "Interval PR\n0,12 sampai 0,20 detik")
    rentang(0.25, 0.31, 1.32, "QRS kurang dari 0,12 detik", dy=0.06, va="bottom")
    rentang(0.25, 0.585, -0.95, "Interval QT")
    ax.text(0.73, 1.2, "Kecepatan kertas 25 mm/detik\n1 kotak kecil = 0,04 detik\n1 kotak sedang = 0,20 detik\n10 mm = 1 mV",
            fontsize=10.5, va="top", bbox=dict(boxstyle="round,pad=0.4", fc="white", ec=KUNING, lw=1.5))
    ax.set_xlim(0, 1.0); ax.set_ylim(-1.25, 1.65); ax.axis("off")
    simpan(fig, "bab11_ekg_normal")


def bab12_sandapan():
    data = [("V1, V2", "Septal", "Arteri desendens anterior kiri"),
            ("V3, V4", "Anterior", "Arteri desendens anterior kiri"),
            ("V1 sampai V6", "Anterior luas", "Arteri desendens anterior kiri"),
            ("V5, V6, I, aVL", "Lateral", "Arteri sirkumfleksa kiri"),
            ("II, III", "Inferior", "Diperiksa juga V3R, V4R, V7 sampai V9"),
            ("V3R, V4R", "Ventrikel kanan", "Arteri koroner kanan"),
            ("V7 sampai V9", "Posterior", "Arteri sirkumfleksa kiri")]
    fig, ax = plt.subplots(figsize=(9.5, 5.2))
    ax.set_xlim(0, 10); ax.set_ylim(0, len(data) + 1.2); ax.axis("off")
    for j, h in enumerate(("Sandapan elevasi ST", "Daerah miokard", "Pembuluh yang diwakili")):
        kotak(ax, [0.1, 3.0, 5.6][j], len(data) + 0.15, [2.8, 2.5, 4.3][j], 0.8, h, KUNING, 11, True)
    for i, (a, b, c) in enumerate(data):
        y = len(data) - 1 - i + 0.1
        for j, t in enumerate((a, b, c)):
            kotak(ax, [0.1, 3.0, 5.6][j], y, [2.8, 2.5, 4.3][j], 0.8, t, KUNING_MUDA if j == 1 else ABU, 10.5)
    simpan(fig, "bab12_sandapan_infark")


def bab15_ards():
    langkah = ["Pemicu paru (pneumonia, aspirasi, trauma toraks)\natau ekstraparu (sepsis, pankreatitis, transfusi multipel)",
               "Respons inflamasi paru difus;\nneutrofil tertahan di kapiler paru",
               "Permeabilitas kapiler meningkat\ndan pneumosit tipe 2 rusak",
               "Edema paru nonkardiogenik\ndan kolaps alveolus",
               "Komplians paru turun dan hipoksemia\n(gagal napas akut)"]
    fig, ax = plt.subplots(figsize=(7.6, 7.4))
    ax.set_xlim(0, 10); ax.set_ylim(0, 10.6); ax.axis("off")
    for i, t in enumerate(langkah):
        y = 9.0 - i * 2.05
        kotak(ax, 0.6, y, 8.8, 1.3, t, KUNING if i == 4 else (KUNING_MUDA if i == 0 else ABU), 11, i == 4)
        if i:
            panah(ax, 5, y + 2.05, 5, y + 1.3)
    simpan(fig, "bab15_ards")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    bab01_alur()
    bab02_lingkaran()
    bab05_alur_bhd()
    bab08_distribusi()
    bab09_alur_agd()
    bab10_jaras_nyeri()
    bab11_ekg()
    bab12_sandapan()
    bab15_ards()
