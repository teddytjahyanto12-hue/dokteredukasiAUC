"""Pindahkan foto klinis ke bawah blok penyakitnya dan tambahkan foto baru.

Foto yang tidak dipetakan (diagram, skema) tetap di bagian ### Gambar.
Jalankan sekali. Skrip menolak berjalan bila penanda sudah ada.
"""
import os
import re

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NASKAH = os.path.join(AKAR, "naskah")

# berkas gambar -> nama entri (judul tebal)
PETA = {
    "fig_16-4": "Eksim vesikular palmoplantar", "fig_96-14": "Dermatitis kontak alergik",
    "fig_17-1": "Dermatitis stasis", "fig_48-1": "Dermatitis kontak iritan",
    "fig_15-5": "Liken simpleks kronikus", "fig_15-1": "Dermatitis numular",
    "fig_14-9": "Dermatitis atopik", "fig_22-3": "Dermatitis seboroik",
    "fig_18-7": "Psoriasis plak", "kulit_13": "Psoriasis plak", "fig_42-1": "Pitiriasis rosea",
    "fig_26-5": "Liken planus",
    "fig_41-4": "Pustulosis eksantematosa generalisata akut (AGEP)",
    "fig_40-3": "Nekrolisis epidermal toksik (TEN)", "bab14_urtikaria": "Urtikaria",
    "bab14_angioedema": "Angioedema", "bab14_morbiliform": "Erupsi obat morbiliform",
    "bab14_dress": "DRESS", "bab14_fde": "Erupsi obat tetap",
    "fig_61-2": "Dermatitis herpetiformis", "fig_39-9": "Eritema multiforme",
    "fig_56-3": "Pemfigoid bulosa", "fig_54-3": "Pemfigus vulgaris", "kulit_15": "Pemfigus vulgaris",
    "fig_80-4": "Akne vulgaris", "fig_81-2": "Rosasea",
    "fig_9-4": "Hiperpigmentasi pascainflamasi", "fig_75-17": "Melasma",
    "fig_73-2": "Albinisme okulokutan", "fig_49-1": "Iktiosis vulgaris", "fig_74-1": "Vitiligo",
    "fig_176-9": "Karbunkel", "fig_176-8": "Furunkel", "fig_176-1": "Impetigo nonbulosa",
    "fig_177-1": "Impetigo bulosa", "fig_178-1": "Selulitis", "fig_178-3": "Erisipelas",
    "fig_188-11": "Tinea kruris", "fig_189-11": "Pitiriasis versikolor",
    "fig_189-4": "Kandidiasis intertriginosa", "fig_188-9": "Tinea korporis",
    "fig_188-14": "Tinea unguium", "fig_188-12": "Tinea pedis", "fig_188-6": "Kerion",
    "fig_188-3": "Tinea kapitis",
    "fig_208-6": "Pedikulosis pubis", "fig_208-1": "Skabies berkrusta",
    "fig_207-3": "Larva migrans kutaneus", "fig_208-2": "Skabies",
    "fig_196-3B": "Veruka plantaris", "fig_196-3": "Veruka vulgaris", "fig_194-3": "Varisela",
    "fig_193-3": "Herpes simpleks", "fig_195-12": "Moluskum kontagiosum", "fig_194-4": "Herpes zoster",
    "fig_177-8": "Sindrom syok toksik", "fig_177-4": "Sindrom kulit melepuh stafilokokus",
    "fig_192-5": "Eritema infeksiosum", "fig_177-9": "Demam skarlatina", "fig_192-4": "Rubela",
    "fig_192-3": "Campak",
    "fig_186-7": "Reaksi kusta tipe 1", "fig_75-8": "Kusta",
    "fig_66-2": "Dermatofibroma", "fig_118-22": "Milium", "fig_118-18": "Kista epidermoid",
    "fig_118-1": "Keratosis seboroik",
    "fig_172-2": "Malformasi kapiler", "fig_122-27": "Lentigo solar", "fig_123-1": "Nevus displastik",
    "fig_126-2": "Hemangioma infantil",
    "fig_92-1": "Fototoksisitas", "fig_132-8": "Porfiria kutanea tarda",
    "fig_124-1": "Melanoma", "fig_117-2": "Keratoakantoma", "fig_114-1": "Karsinoma sel skuamosa kutan",
    "fig_246-2": "Keratosis aktinik", "fig_115-1": "Karsinoma sel basal",
    "fig_144-3": "Purpura", "fig_155-4": "Lupus kutan", "fig_130-9": "Skorbut",
    "fig_130-10": "Akrodermatitis enteropatika", "fig_130-8": "Pelagra", "fig_151-4": "Xantoma",
    "fig_151-1": "Akantosis nigrikans",
}

# foto baru: (bab, entri, berkas, keterangan, sitasi, lebar)
BARU = [
    (12, "Dermatitis akut", "gambar/buku/fig_13-1.png", "Papul eritematosa dan vesikel pada dermatitis kontak alergik stadium akut.", "1", "8cm"),
    (14, "Sindrom Stevens–Johnson (SJS)", "gambar/buku/fig_40-2A.png", "Erupsi awal berupa makula merah keunguan yang menyerupai lesi target datar atipikal dan mulai menyatu.", "1", "6cm"),
    (14, "Sindrom Stevens–Johnson (SJS)", "gambar/buku/fig_40-4A.png", "Erosi dan nekrosis luas pada bibir bawah dan mukosa mulut.", "1", "8cm"),
    (14, "Nekrolisis epidermal toksik (TEN)", "gambar/buku/fig_40-2D.png", "Nekrolisis epidermal yang meluas dengan pelepasan epidermis.", "1", "7cm"),
    (17, "Neurofibromatosis tipe 1", "gambar/buku/fig_141-1.png", "Bercak kafe au lait.", "1", "5cm"),
    (17, "Neurofibromatosis tipe 1", "gambar/buku/fig_141-3.png", "Neurofibroma kutan dengan hiperpigmentasi di atasnya.", "1", "5cm"),
    (18, "Folikulitis bakteri", "gambar/buku/fig_176-5.png", "Folikulitis superfisial akibat Staphylococcus aureus berupa pustul multipel di daerah janggut.", "1", "8cm"),
    (18, "Abses kulit", "gambar/buku/fig_176-10.png", "Abses besar dan nyeri akibat Staphylococcus aureus pada tumit pasien diabetes.", "1", "8cm"),
    (18, "Infeksi jaringan lunak nekrotikan", "gambar/buku/fig_179-2.png", "Gangren Fournier dengan eritema nyeri, edema hebat, deskuamasi dan daerah nekrosis pada skrotum.", "1", "7cm"),
    (19, "Tinea incognito", "gambar/terbuka/tinea_incognito_pmc12366883.jpg", "Tinea incognito pada wajah berupa eritema gelap dan papul tanpa skuama jelas setelah pemakaian kortikosteroid topikal dan takrolimus. Pemeriksaan KOH menemukan hifa.", "17", "6cm"),
    (20, "Pedikulosis kapitis", "gambar/buku/fig_208-4.png", "Selubung telur (nit) berisi kutu yang belum menetas, melekat pada batang rambut.", "1", "5cm"),
    (20, "Pedikulosis korporis", "gambar/terbuka/cdc_body_louse.jpg", "Kutu badan Pediculus humanus var. corporis jantan dilihat dari dorsal.", "15", "5cm"),
    (22, "Roseola", "gambar/buku/fig_192-14A.png", "Eksantema subitum pada bayi berupa makula merah muda di badan yang muncul sehari setelah demam turun.", "1", "6cm"),
    (22, "Penyakit tangan, kaki dan mulut", "gambar/buku/fig_192-16C.png", "Vesikel lonjong dengan halo eritema pada telapak tangan.", "1", "7cm"),
    (23, "Reaksi kusta tipe 2 atau eritema nodosum leprosum", "gambar/buku/fig_186-8.png", "Lesi eritema nodosum leprosum papular pada wajah pasien kusta lepromatosa.", "1", "8cm"),
    (23, "Tuberkulosis kutis", "gambar/buku/fig_184-5A.png", "Plak cokelat kemerahan yang sedikit meninggi pada lupus vulgaris.", "1", "6cm"),
    (23, "Mikosis dalam pada kulit", "gambar/buku/fig_190-1.png", "Sporotrikosis berupa nodul berulkus di ibu jari dengan nodul subkutan yang menyebar mengikuti aliran limfe.", "1", "8cm"),
    (24, "Kista pilar", "gambar/buku/fig_118-20.png", "Kista trikilemal (pilar) pada kulit kepala.", "1", "5cm"),
    (24, "Ganglion", "gambar/terbuka/ganglion_heilman.jpg", "Ganglion berupa benjolan di pergelangan tangan (tanda panah).", "16", "8cm"),
    (24, "Akrokordon", "gambar/buku/fig_66-3.png", "Fibroma lunak atau akrokordon di leher di atas akantosis nigrikans.", "1", "7cm"),
    (25, "Kalus", "gambar/buku/fig_98-4.png", "Kalus besar di bawah kaput metatarsal kedua.", "1", "6cm"),
    (25, "Klavus", "gambar/buku/fig_98-1.png", "Klavus di bawah kaput metatarsal kelima dengan inti putih di tengah.", "1", "7cm"),
    (26, "Nevus melanositik didapat", "gambar/buku/fig_122-9.png", "Nevus melanositik didapat. A. Nevus junctional berupa makula cokelat tua yang bulat dan berbatas teratur. B. Nevus compound berupa papul berpigmen merata.", "1", "11cm"),
    (26, "Nevus melanositik kongenital", "gambar/buku/fig_122-4.png", "Nevus pigmentosus kongenital raksasa dengan distribusi seperti celana renang dan nevus satelit.", "1", "7cm"),
    (26, "Efelid", "gambar/terbuka/efelid_pmc6364722.jpg", "Efelid berupa makula cokelat kecil multipel di wajah.", "19", "5cm"),
    (27, "Fotoalergi", "gambar/terbuka/fotoalergi_pmc10825262.jpg", "Papul dan plak eritematosa pada leher dengan pola daerah terpajan cahaya. Uji fototempel menunjukkan reaksi terhadap metil antranilat dalam tabir surya setelah pajanan UVA.", "18", "7cm"),
]

POLA_IMG = re.compile(r"^!\[Gambar #\. (.*?)\]\(([^)]+)\)(\{[^}]*\})?\s*$")


def blok_akhir(baris, judul):
    """Indeks baris terakhir blok entri (baris Pengobatan)."""
    for i, b in enumerate(baris):
        if b.strip() == f"**{judul}**":
            for j in range(i + 1, len(baris)):
                if baris[j].startswith("- **Pengobatan:**"):
                    return j
                if baris[j].startswith("**") and j > i + 1 and not baris[j].startswith("- "):
                    break
    return None


def main():
    for f in sorted(os.listdir(NASKAH)):
        m = re.match(r"BAB_(\d+)_", f)
        if not m or not (12 <= int(m.group(1)) <= 29):
            continue
        bab = int(m.group(1))
        p = os.path.join(NASKAH, f)
        teks = open(p, encoding="utf-8").read()
        if "<!-- foto-per-entri -->" in teks:
            print("lewati", f)
            continue
        baris = teks.split("\n")
        sisip = {}  # judul -> daftar baris gambar
        tetap = []
        for i, b in enumerate(baris):
            mm = POLA_IMG.match(b)
            if not mm:
                continue
            nama = os.path.splitext(os.path.basename(mm.group(2)))[0]
            judul = PETA.get(nama)
            if judul and blok_akhir(baris, judul) is not None:
                sisip.setdefault(judul, []).append(b)
                baris[i] = None
        for (bb, judul, berkas, ket, sit, lebar) in BARU:
            if bb == bab:
                sisip.setdefault(judul, []).append(f"![Gambar #. {ket}^{sit}^]({berkas}){{width={lebar}}}")
        baris = [b for b in baris if b is not None]
        for judul, imgs in sisip.items():
            j = blok_akhir(baris, judul)
            if j is None:
                print("ENTRI TIDAK DITEMUKAN", f, judul)
                continue
            baris[j + 1:j + 1] = [""] + [x for im in imgs for x in (im, "")]
        teks = "\n".join(baris)
        teks = re.sub(r"\n{3,}", "\n\n", teks)
        teks = teks.replace("### Konsep dasar", "### Konsep dasar\n<!-- foto-per-entri -->", 1)
        open(p, "w", encoding="utf-8").write(teks)
        print("ok", f, sum(len(v) for v in sisip.values()), "foto")


if __name__ == "__main__":
    main()
