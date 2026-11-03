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


def bab26_iskemia():
    fig, ax = plt.subplots(figsize=(11, 6.6))
    ax.set_xlim(0, 11); ax.set_ylim(0, 6.8); ax.axis("off")
    ax.text(2.6, 6.6, "Ambang aliran darah otak", ha="center", va="top", fontsize=11, fontweight="bold")
    kotak(ax, 0.2, 4.6, 4.8, 1.3, "Di atas 20 ml/100 g/menit\nfungsi dan struktur normal", HIJAU, 10)
    kotak(ax, 0.2, 2.9, 4.8, 1.3, "Antara 5-8 dan 20 ml/100 g/menit\nfungsi hilang, struktur masih utuh\n(penumbra, dapat diselamatkan)", KUNING, 10)
    kotak(ax, 0.2, 1.2, 4.8, 1.3, "Di bawah 5-8 ml/100 g/menit\nstruktur rusak (inti infark)", MERAH, 10)
    ax.text(8.2, 6.6, "Eksitotoksisitas di sekitar infark", ha="center", va="top", fontsize=11, fontweight="bold")
    langkah = ["Sel kekurangan O2 melepaskan\nglutamat berlebihan", "Reseptor NMDA tetap terbuka", "Ca2+ masuk berlebihan\nke neuron sekitar",
               "Radikal bebas dan sinyal apoptosis\n(menyebar lewat taut celah)", "Kematian neuron meluas\nmelebihi daerah iskemia"]
    y = 5.4
    for i, t in enumerate(langkah):
        kotak(ax, 5.9, y, 4.6, 0.75, t, BIRU if i < 4 else MERAH, 9.5)
        if i < 4:
            panah(ax, 8.2, y, 8.2, y - 0.35)
        y -= 1.1
    simpan(fig, "bab26_iskemia")


def bab29_klasifikasi():
    fig, ax = plt.subplots(figsize=(11, 5.6))
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.8); ax.axis("off")
    kotak(ax, 3.5, 4.8, 4.0, 0.8, "Bangkitan epileptik", KUNING, 12, True)
    kelas = [(0.1, "Fokal", BIRU), (2.85, "Generalisata", HIJAU), (5.6, "Tidak diketahui", ABU), (8.35, "Tidak terklasifikasi", ABU)]
    for x, t, w in kelas:
        kotak(ax, x, 3.4, 2.55, 0.75, t, w, 11, True)
        panah(ax, 5.5, 4.8, x + 1.27, 4.15)
    kotak(ax, 0.1, 0.6, 2.55, 2.4, "Kesadaran:\n- terjaga\n- terganggu\n\nDapat berlanjut menjadi\ntonik-klonik bilateral", "white", 9.5)
    kotak(ax, 2.85, 0.6, 2.55, 2.4, "- Absans\n- Tonik-klonik\n  generalisata\n- Bangkitan generalisata\n  lain (mis. mioklonik,\n  atonik)", "white", 9.5)
    kotak(ax, 5.6, 0.6, 2.55, 2.4, "Awitan fokal atau\ngeneralisata belum\ndapat ditentukan;\ndinilai juga menurut\nkesadaran", "white", 9.5)
    kotak(ax, 8.35, 0.6, 2.55, 2.4, "Informasi tidak\ncukup untuk\nmenggolongkan", "white", 9.5)
    for x, _, _ in kelas:
        panah(ax, x + 1.27, 3.4, x + 1.27, 3.0)
    simpan(fig, "bab29_klasifikasi")


def bab29_target_obat():
    fig, ax = plt.subplots(figsize=(11, 5.2))
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.4); ax.axis("off")
    kotak(ax, 3.6, 4.4, 3.8, 0.8, "Hipereksitabilitas neuron\n(eksitasi > inhibisi)", MERAH, 11, True)
    kelompok = [
        ("Kanal ion\nberpintu listrik", "Na+: fenitoin, karbamazepin,\nlamotrigin\nCa2+: etosuksimid\nK+: retigabin", BIRU),
        ("Inhibisi GABA", "Benzodiazepin, tiagabin,\nvigabatrin", HIJAU),
        ("Eksitasi glutamat", "Perampanel", KUNING),
        ("Pelepasan\nneurotransmiter", "Levetirasetam, brivarasetam,\ngabapentin,\npregabalin", ABU),
    ]
    x = 0.1
    for judul, isi, w in kelompok:
        kotak(ax, x, 2.75, 2.55, 0.9, judul, w, 10, True)
        kotak(ax, x, 0.5, 2.55, 2.0, isi, "white", 9.5)
        panah(ax, 5.5, 4.4, x + 1.27, 3.65)
        x += 2.75
    simpan(fig, "bab29_target_obat")


def bab30_gbs():
    fig, ax = plt.subplots(figsize=(11, 4.6))
    ax.set_xlim(0, 11); ax.set_ylim(0, 4.8); ax.axis("off")
    langkah = [("Infeksi pendahulu:\nsaluran napas atas,\ndiare; C. jejuni,\nvirus Zika,\nSARS-CoV-2", KUNING),
               ("Mimikri\nmolekular antara\nmikroorganisme\ndan saraf tepi", BIRU),
               ("Proses imun\ndiperantarai\nautoantibodi", BIRU),
               ("Akar saraf\ndan saraf tepi\nrusak", MERAH),
               ("Kelemahan\nprogresif,\ngangguan sensorik,\notonom, dan\nnapas", MERAH)]
    x = 0.1
    for i, (t, w) in enumerate(langkah):
        kotak(ax, x, 1.6, 1.95, 2.1, t, w, 9)
        if i < 4:
            panah(ax, x + 1.95, 2.65, x + 2.2, 2.65)
        x += 2.2
    kotak(ax, 0.6, 0.1, 9.8, 1.0, "CSS: disosiasi albuminositologik; pemeriksaan elektrodiagnostik mendukung diagnosis.\nTerapi: IVIg atau plasmaferesis bila tidak dapat berjalan tanpa bantuan", "white", 9)
    simpan(fig, "bab30_gbs")

def bab34_pd_hd():
    fig, ax = plt.subplots(figsize=(11, 5.6))
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.8); ax.axis("off")
    kolom = [(0.3, "Penyakit Parkinson", ["Degenerasi proyeksi\ndopaminergik nigrostriatal", "Aktivitas jalur tidak\nlangsung berlebihan;\nnukleus subtalamikus aktif", "Inhibisi talamus\nmeningkat", "Aktivasi korteks motorik\nberkurang: hipokinesia,\nrigiditas, tremor istirahat"], BIRU),
             (5.8, "Penyakit Huntington", ["Ekspansi CAG gen huntingtin;\nneuron striatum GABA/\nenkefalin berdegenerasi", "Jalur tidak langsung\nterhambat; nukleus\nsubtalamikus lebih dihambat", "Inhibisi talamus\nberkurang", "Aktivasi korteks motorik\nmeningkat: korea,\nlalu demensia"], MERAH)]
    for x, judul, langkah, w in kolom:
        ax.text(x + 2.45, 5.65, judul, ha="center", va="top", fontsize=12, fontweight="bold")
        y = 4.3
        for i, t in enumerate(langkah):
            kotak(ax, x, y, 4.9, 0.95, t, w if i in (0, 3) else "white", 9.5)
            if i < 3:
                panah(ax, x + 2.45, y, x + 2.45, y - 0.3)
            y -= 1.25
    simpan(fig, "bab34_pd_hd")


def bab35_alzheimer():
    fig, ax = plt.subplots(figsize=(11, 5.2))
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.4); ax.axis("off")
    atas = [("Protein prekursor amiloid\n(APP) diputus di\ntempat alternatif", KUNING), ("Amiloid beta (Aβ)\npembentuk plak\nmeningkat", KUNING),
            ("Plak neuritik ekstrasel;\nmikroglia menyerang plak\ndan melepas zat toksik", MERAH), ("Tau hiperfosforilasi\nlepas dari tubulin", MERAH)]
    x = 0.1
    for i, (t, w) in enumerate(atas):
        kotak(ax, x, 3.3, 2.5, 1.5, t, w, 9.5)
        if i < 3:
            panah(ax, x + 2.5, 4.05, x + 2.75, 4.05)
        x += 2.75
    bawah = [("Neurofibrillary tangles;\nmikrotubulus rusak,\ntranspor akson terganggu", MERAH), ("Neuron basal otak depan\nkolinergik berdegenerasi\n(defisiensi asetilkolin)", BIRU),
             ("Kematian neuron dan\nhilangnya komunikasi sinaps\nterutama di hipokampus", BIRU), ("Demensia: memori\nanterograd terganggu lebih\ndulu, lalu ranah lain", ABU)]
    panah(ax, 9.6, 3.3, 9.6, 2.85)
    x = 8.35
    for i, (t, w) in enumerate(bawah):
        kotak(ax, x, 1.2, 2.5, 1.6, t, w, 9.5)
        if i < 3:
            panah(ax, x, 2.0, x - 0.25, 2.0)
        x -= 2.75
    simpan(fig, "bab35_alzheimer")


SEMUA = {"bab35_alzheimer": bab35_alzheimer, "bab34_pd_hd": bab34_pd_hd, "bab30_gbs": bab30_gbs, "bab29_klasifikasi": bab29_klasifikasi, "bab29_target_obat": bab29_target_obat, "bab26_iskemia": bab26_iskemia, "bab02_vesikel": bab02_vesikel, "bab25_lokalisasi": bab25_lokalisasi}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for n, f in SEMUA.items():
        if len(sys.argv) < 2 or n.startswith(sys.argv[1]):
            f()
            print(n)
