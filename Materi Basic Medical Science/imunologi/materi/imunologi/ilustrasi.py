"""Ilustrasi buatan sendiri (data dari sumber yang dirujuk di keterangan naskah)."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

plt.rcParams["font.family"] = "Times New Roman"


def kotak(ax, x, y, w, h, teks, warna):
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h, boxstyle="round,pad=0.02",
                                fc=warna, ec="#333333", lw=1.2))
    ax.text(x, y, teks, ha="center", va="center", fontsize=11)


def panah(ax, a, b, teks="", warna="#1f4e79", dx=0, dy=0):
    ax.add_patch(FancyArrowPatch(a, b, arrowstyle="-|>", mutation_scale=16, lw=1.6, color=warna))
    if teks:
        ax.text((a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy, teks, ha="center", va="center",
                fontsize=10, color=warna, style="italic")


def bab29():
    fig, ax = plt.subplots(figsize=(8, 5.2))
    ax.set_xlim(0, 10); ax.set_ylim(0, 6.5); ax.axis("off")
    kotak(ax, 2.2, 5.3, 3.4, 1.0, "Sistem imun\n(makrofag, limfosit)", "#fde9a9")
    kotak(ax, 7.8, 5.3, 3.4, 1.0, "Sistem saraf dan endokrin\n(respons stres)", "#cfe2f3")
    kotak(ax, 7.8, 1.6, 3.4, 1.0, "Kortisol dan mediator stres", "#d9ead3")
    kotak(ax, 2.2, 1.6, 3.4, 1.0, "Asetilkolin dari saraf vagus", "#ead1dc")
    panah(ax, (3.95, 5.45), (6.05, 5.45), "IL-1 dan sitokin (+)", dy=0.3)
    panah(ax, (7.8, 4.75), (7.8, 2.15), "sekresi", dx=0.55)
    panah(ax, (6.05, 1.9), (3.0, 4.75), "menghambat limfosit dan\nmakrofag, sitokin turun (−)",
          warna="#a61c00", dx=1.6, dy=-0.6)
    panah(ax, (2.2, 2.15), (2.2, 4.75), "menekan inflamasi (−)", warna="#a61c00", dx=-0.95)
    ax.text(5, 0.45, "Lengkung umpan balik negatif mencegah respons imun berlebihan",
            ha="center", fontsize=11, weight="bold")
    fig.savefig("gambar/bab29_lengkung_neuroimun.png", dpi=200, bbox_inches="tight")


def bab22():
    fig, ax = plt.subplots(figsize=(8.5, 5.6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 7); ax.axis("off")
    kotak(ax, 5, 3.5, 3.0, 1.0, "Janin: alograft alami\n(antigen warisan ayah)", "#fde9a9")
    items = [
        (5.0, 6.2, "Trofoblas tanpa MHC II;\npada manusia hanya HLA-G", "#cfe2f3", (5.0, 5.57), (5.0, 4.0)),
        (1.7, 5.0, "Sel T regulator menekan\nrespons terhadap\nantigen ayah", "#d9ead3", (3.2, 4.8), (3.6, 3.9)),
        (8.3, 5.0, "IDO desidua:\ntriptofan turun,\nkinurenin naik", "#ead1dc", (6.8, 4.8), (6.4, 3.9)),
        (1.7, 1.6, "FasL trofoblas:\napoptosis limfosit ibu\nyang teraktivasi", "#fce5cd", (3.2, 1.9), (3.6, 3.1)),
        (8.3, 1.6, "Galektin-1 desidua:\nsel dendritik tolerogenik\nmendukung Treg", "#e6e0f8", (6.8, 1.9), (6.4, 3.1)),
    ]
    for x, y, t, w, a, b in items:
        kotak(ax, x, y, 3.0, 1.25, t, w)
        panah(ax, a, b)
    fig.savefig("gambar/bab22_toleransi_maternal.png", dpi=200, bbox_inches="tight")


bab29()
bab22()
