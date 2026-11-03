"""Memotong gambar dari PDF sumber ke folder gambar/.

Pemakaian: python potong_gambar.py "<folder MATERI MENTAH>" [awalan_nama]
PDF sumber tidak disalin; hanya potongan gambar yang disimpan.
Kode sumber: S = Sherwood, D = Duus, J = DeJong. Kotak potong dalam pt
(x0, y0, x1, y1), keterangan asli buku tidak ikut dipotong.
"""
import os
import sys

import pymupdf

AKAR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AKAR, "gambar")
BERKAS = {
    "S": "sherwood neurologi.pdf",
    "D": "duus.pdf",
    "J": "William W. Campbell MD DeJong\u2019s The Neurologic Examination_compressed.pdf",
}

# nama: (sumber, halaman PDF, kotak potong)
SPEK = {
    "bab01_organisasi": ("S", 53, (48, 30, 580, 426)),
    "bab01_kelas_neuron": ("S", 54, (66, 30, 380, 300)),
    "bab02_telensefalon": ("D", 365, (31, 28, 333, 243)),
    "bab02_laminasi": ("D", 367, (31, 28, 333, 297)),
    "bab02_lempeng": ("J", 136, (255, 35, 517, 218)),
    "bab06_kolom_sel": ("J", 136, (40, 300, 505, 640)),
    "bab03_neuron": ("D", 18, (27, 30, 300, 480)),
    "bab03_mielin": ("D", 20, (32, 44, 332, 372)),
    "bab03_glia": ("S", 55, (54, 36, 576, 362)),
    "bab03_saraf_tepi": ("D", 36, (27, 30, 330, 258)),
    "bab04_girus_lateral": ("D", 370, (27, 30, 333, 226)),
    "bab04_girus_medial": ("D", 370, (27, 238, 333, 489)),
    "bab04_substansia_alba": ("D", 382, (27, 40, 333, 477)),
    "bab04_batang_otak": ("D", 132, (27, 30, 333, 462)),
    "bab04_serebelum": ("D", 256, (27, 30, 335, 240)),
    "bab04_diensefalon": ("D", 275, (31, 262, 333, 479)),
    "bab05_saraf_spinalis": ("S", 93, (60, 15, 600, 455)),
    "bab05_potongan": ("S", 94, (70, 30, 610, 246)),
    "bab05_traktus": ("S", 94, (66, 275, 620, 559)),
    "bab05_redistribusi": ("D", 39, (31, 30, 333, 420)),
    "bab05_dermatom": ("D", 41, (12, 40, 333, 382)),
    "bab05_pleksus_brakialis": ("D", 115, (27, 150, 333, 488)),
    "bab05_pleksus_lumbosakral": ("D", 118, (27, 30, 333, 442)),
    "bab05_palsi_tangan": ("D", 121, (31, 40, 232, 336)),
    "bab06_keluar": ("D", 140, (25, 30, 342, 477)),
    "bab06_foramina": ("D", 141, (31, 30, 333, 370)),
    "bab06_palsi_fasialis": ("D", 184, (27, 40, 224, 172)),
    "bab06_refleks_pupil": ("D", 169, (30, 30, 333, 338)),
    "bab07_meninges": ("D", 417, (30, 30, 333, 228)),
    "bab07_ventrikel": ("D", 421, (31, 30, 333, 480)),
    "bab07_sirkulasi_css": ("D", 422, (27, 30, 330, 336)),
    "bab08_arteri_basis": ("D", 436, (27, 35, 333, 376)),
    "bab08_willis": ("D", 448, (27, 40, 333, 309)),
    "bab08_teritori_lateral": ("D", 440, (27, 30, 333, 224)),
    "bab08_teritori_medial": ("D", 440, (27, 248, 333, 442)),
    "bab08_sinus": ("D", 452, (27, 45, 333, 316)),
    "bab09_potensial_aksi": ("S", 9, (45, 448, 318, 690)),
    "bab09_kanal": ("S", 10, (90, 25, 600, 203)),
    "bab09_fluks_ion": ("S", 11, (18, 60, 484, 597)),
    "bab09_hantaran_merambat": ("S", 15, (34, 34, 594, 571)),
    "bab09_refrakter": ("S", 17, (40, 28, 300, 243)),
    "bab10_sinaps": ("S", 23, (10, 328, 560, 600)),
    "bab10_sinaps_glutamat": ("D", 23, (31, 30, 333, 244)),
    "bab10_sumasi": ("S", 26, (25, 355, 600, 560)),
    "bab10_inhibisi_prasinaps": ("S", 29, (100, 472, 560, 650)),
    "bab11_adaptasi": ("S", 108, (55, 456, 362, 652)),
    "bab11_homunkulus": ("S", 66, (20, 30, 625, 482)),
    "bab11_traktus": ("D", 56, (27, 30, 334, 476)),
    "bab11_jalur": ("D", 57, (31, 30, 333, 482)),
    "bab12_jalur_nyeri": ("S", 114, (28, 30, 595, 645)),
    "bab12_zona_head": ("D", 322, (27, 40, 330, 311)),
    "bab12_nyeri_alih": ("D", 323, (23, 40, 333, 340)),
    "bab13_area_motorik": ("D", 72, (27, 45, 252, 200)),
    "bab13_piramidal": ("D", 74, (27, 252, 329, 490)),
    "bab13_lokasi_lesi": ("D", 79, (18, 30, 333, 478)),
    "bab13_jalur_motorik": ("D", 76, (27, 30, 330, 478)),
    "bab14_refleks_lucut": ("S", 98, (15, 30, 600, 326)),
    "bab14_reseptor_otot": ("S", 212, (40, 15, 600, 260)),
    "bab14_sirkuit_panjang": ("D", 48, (27, 30, 331, 246)),
    "bab14_ekstensor_silang": ("D", 46, (27, 30, 180, 497)),
    "bab15_ganglia_basalis": ("D", 348, (27, 40, 330, 217)),
    "bab15_jalur_langsung": ("D", 353, (31, 30, 333, 276)),
    "bab15_korteks_serebelum": ("D", 258, (27, 30, 326, 375)),
    "bab15_hubungan_serebelum": ("D", 261, (38, 20, 524, 314)),
    "bab16_otonom": ("S", 162, (12, 30, 625, 570)),
    "bab16_inervasi_organ": ("S", 164, (62, 30, 606, 652)),
    "bab16_simpatis_parasimpatis": ("D", 304, (27, 30, 305, 478)),
    "bab16_trunkus": ("D", 307, (31, 40, 333, 234)),
    "bab17_eeg_alfa": ("S", 70, (340, 576, 592, 682)),
    "bab17_eeg_tidur": ("S", 90, (45, 30, 325, 318)),
    "bab17_hipnogram": ("S", 90, (340, 30, 592, 226)),
    "bab17_ras": ("S", 88, (60, 28, 332, 250)),
    "bab18_area_fungsional": ("S", 65, (20, 30, 630, 378)),
    "bab18_jalur_bahasa": ("S", 69, (25, 410, 424, 676)),
    "bab18_habituasi": ("S", 79, (45, 165, 370, 630)),
    "bab18_ltp": ("S", 80, (70, 172, 330, 716)),
    "bab19_korteks_limbik": ("D", 327, (30, 30, 333, 263)),
    "bab19_papez": ("D", 328, (27, 40, 335, 388)),
    "bab19_sistem_limbik": ("S", 74, (340, 20, 615, 270)),
    "bab20_mata": ("S", 117, (20, 25, 630, 336)),
    "bab20_retina": ("S", 124, (68, 40, 612, 366)),
    "bab20_jalur_visual": ("D", 145, (27, 30, 333, 480)),
    "bab21_koklea": ("S", 141, (30, 28, 625, 660)),
    "bab21_sel_rambut": ("S", 143, (30, 28, 625, 632)),
    "bab21_vestibular": ("S", 147, (30, 28, 625, 692)),
    "bab22_kuncup_kecap": ("S", 151, (20, 516, 405, 708)),
    "bab22_olfaktorius": ("S", 153, (28, 25, 600, 330)),
    "bab22_bulbus": ("S", 154, (110, 30, 343, 320)),
    "bab23_taut_nm": ("S", 173, (15, 25, 630, 458)),
    "bab23_organisasi_otot": ("S", 183, (25, 25, 630, 668)),
    "bab23_eksitasi_kontraksi": ("S", 191, (25, 25, 630, 716)),
    "bab23_tetanus": ("S", 199, (40, 25, 620, 316)),
    "bab23_panjang_tegangan": ("S", 200, (262, 25, 612, 308)),
    "bab24_jalur_atp": ("S", 202, (15, 25, 640, 722)),
    "bab24_tipe_serat": ("S", 206, (15, 15, 640, 212)),
    "bab24_kalsium_polos": ("S", 219, (15, 270, 290, 715)),
    "bab24_listrik_polos": ("S", 221, (15, 20, 320, 362)),
    "bab24_persarafan_polos": ("S", 222, (15, 20, 468, 250)),
    "bab26_hemodinamik": ("D", 461, (28, 122, 264, 242)),
    "bab26_lakunar": ("D", 463, (28, 192, 287, 326)),
    "bab26_oklusi_mca": ("D", 470, (31, 112, 310, 234)),
    "bab27_perdarahan_ganglia": ("D", 492, (32, 43, 163, 193)),
    "bab27_aneurisma": ("D", 495, (31, 280, 222, 500)),
    "bab27_hsa": ("D", 498, (32, 43, 163, 174)),
    "bab27_subdural": ("D", 501, (30, 358, 161, 500)),
    "bab27_epidural": ("D", 503, (29, 44, 161, 179)),
    "bab27_nph": ("D", 427, (29, 221, 275, 352)),
    "bab27_herniasi": ("J", 766, (268, 416, 460, 610)),
    "bab28_degenerasi_kombinasi": ("D", 89, (28, 212, 338, 364.5)),
    "bab28_brown_sequard": ("D", 93, (28, 228, 338, 378)),
    "bab28_transeksi": ("D", 95, (28, 60, 222, 352)),
    "bab28_konus_kauda": ("D", 100, (31, 44, 330, 424)),
    "bab30_terowongan": ("D", 122, (28, 40, 334, 278)),
    "bab31_kornu_anterior": ("D", 91, (28, 42, 335, 177)),
    "bab31_als_sindrom": ("D", 91, (28, 188, 335, 329)),
    "bab31_als_atrofi": ("J", 489, (52, 66, 260, 291)),
    "bab32_ms_traktus_optikus": ("D", 150, (31, 303, 318, 438)),
    "bab32_ino": ("D", 162, (30, 208, 333, 489)),
    "bab33_ptosis_mg": ("J", 203, (275, 66, 482, 366)),
    "bab33_taut_mg_lems": ("J", 382, (128, 316, 370, 610)),
    "bab33_pseudohipertrofi": ("J", 493, (295, 66, 463, 420)),
    "bab34_huntington": ("D", 359, (29, 43, 298, 205)),
    "bab34_hemibalismus": ("D", 360, (32, 296, 313, 440)),
    "bab36_tumor_spinal": ("D", 104, (32, 43, 330, 221)),
    "bab36_medulloblastoma": ("D", 271, (29, 43, 298, 201)),
    "bab36_hipofisis": ("D", 302, (32, 43, 301, 186)),
    "bab36_schwannoma": ("D", 272, (32, 43, 163, 228)),
    "bab37_kernig": ("J", 776, (258, 66, 466, 293)),
    "bab37_brudzinski": ("J", 777, (53, 32, 312, 205)),
}


def main(folder, awalan=""):
    os.makedirs(OUT, exist_ok=True)
    buka = {}
    n = 0
    for nama, (src, hal, kotak) in SPEK.items():
        if not nama.startswith(awalan):
            continue
        if src not in buka:
            buka[src] = pymupdf.open(os.path.join(folder, BERKAS[src]))
        pix = buka[src][hal - 1].get_pixmap(dpi=200, clip=pymupdf.Rect(*kotak))
        pix.save(os.path.join(OUT, nama + ".png"))
        n += 1
    print(n, "gambar")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "")
