"""Mengambil gambar dari PDF sumber ke folder gambar/.

Pemakaian: python potong_gambar.py [awalan_nama]
PDF sumber tidak disalin; hanya potongan gambar yang disimpan.
SPEK: nama -> (kode sumber, halaman PDF, kotak potong (x0, y0, x1, y1) dalam pt[, daftar kotak yang diputihkan]).
Perubahan hanya di memori; berkas PDF sumber tidak disimpan ulang.
Kode: Bnn = PDF "Bab nn ...", S1/S2 = Sobotta volume 1/2. Keterangan asli buku tidak ikut diambil.
"""
import glob
import os
import sys

import numpy as np
import pymupdf
from PIL import Image

AKAR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(AKAR, "..", "..")
OUT = os.path.join(AKAR, "gambar")
SOBOTTA = {"S1": "Anatomi- Sobotta 1 (Inggris) - Head, Neck, Upper Limb.pdf",
           "S2": "Anatomi- Sobotta 2(Inggris) - Trunk, Viscera, Lower Limb.pdf"}

SPEK = {
    # T01 Pengantar
    "t01_posisi_bidang": ("B01", 3, (55, 77, 545, 457)),
    "t01_gerak_1": ("B01", 4, (40, 183, 560, 704)),
    "t01_gerak_2": ("B01", 5, (40, 193, 560, 704)),
    # T02 Dasar tulang
    "t02_rangka": ("B01", 25, (40, 76, 545, 507)),
    "t02_jenis_tulang": ("B01", 26, (60, 80, 540, 515)),
    # T03 Tengkorak
    "t03_anterior": ("B11", 7, (45, 76, 550, 531)),
    "t03_lateral": ("B11", 9, (45, 76, 550, 487)),
    "t03_basis_inferior": ("B11", 11, (45, 200, 550, 702)),
    "t03_basis_interna": ("B11", 12, (45, 268, 550, 702)),
    "t03_neonatus": ("B11", 13, (50, 322, 535, 712), [(365, 688, 540, 720)]),
    # T04 Columna vertebralis dan thorax
    "t04_columna": ("B11", 24, (40, 78, 560, 818)),
    "t04_lengkung": ("B11", 25, (40, 76, 560, 547)),
    "t04_cervical": ("B11", 27, (40, 76, 560, 421)),
    "t04_sacrum": ("B11", 28, (40, 76, 560, 554)),
    "t04_sternum_thorax": ("B11", 33, (40, 76, 560, 432)),
    "t04_costa_sendi": ("B11", 34, (40, 76, 560, 681)),
    "t04_apertura": ("B11", 35, (40, 287, 560, 625)),
    # T05 Tulang ekstremitas superior
    "t05_lekat_thorax_humerus": ("B11", 37, (40, 76, 560, 403)),
    "t05_clavicula": ("B11", 37, (40, 418, 560, 701)),
    "t05_scapula": ("B11", 38, (40, 165, 560, 700)),
    "t05_humerus": ("B11", 39, (40, 296, 560, 703)),
    "t05_radius_ulna": ("B11", 40, (40, 306, 560, 704)),
    "t05_tangan_anterior": ("B11", 41, (40, 284, 560, 703)),
    "t05_tangan_posterior": ("B11", 42, (60, 76, 560, 459)),
    # T06 Pelvis dan ekstremitas inferior
    "t06_pelvis_pria_wanita": ("B11", 49, (40, 75, 560, 560)),
    "t06_os_coxae": ("B11", 51, (40, 75, 560, 628)),
    "t06_apertura_pelvis": ("B11", 53, (45, 75, 295, 519)),
    "t06_femur_anterior": ("B11", 54, (45, 75, 295, 562)),
    "t06_femur_posterior": ("B11", 55, (40, 76, 560, 604)),
    "t06_tibia_fibula": ("B11", 56, (40, 76, 560, 600)),
    "t06_tarsal": ("B11", 58, (40, 170, 560, 702)),
    "t06_kaki_dorsal": ("B11", 59, (40, 255, 560, 701)),
    # T07 Dasar sendi
    "t07_jenis_sinovial": ("B12", 3, (40, 150, 560, 671)),
    "t07_stabilitas": ("B12", 4, (40, 352, 560, 790), [(400, 666, 560, 800)]),
    "t07_tipe_sendi": ("B12", 6, (40, 70, 560, 607)),
    # T08 Sendi kepala, columna vertebralis, thorax
    "t08_tmj_ligamen": ("B12", 7, (40, 76, 560, 534)),
    "t08_tmj_gerak": ("B12", 9, (40, 76, 560, 560), [(370, 528, 560, 600)]),
    "t08_atlanto": ("B12", 13, (40, 76, 560, 552)),
    "t08_sendi_vertebra": ("B12", 14, (40, 76, 560, 592)),
    "t08_persarafan_vertebra": ("B12", 15, (55, 450, 372, 805)),
    # T09 Sendi ekstremitas superior
    "t09_sternoclav_acromioclav": ("B12", 19, (40, 70, 560, 468)),
    "t09_humeri": ("B12", 21, (40, 70, 560, 590)),
    "t09_humeri_dalam": ("B12", 22, (40, 70, 560, 523)),
    "t09_abduksi": ("B12", 25, (40, 70, 560, 565)),
    "t09_cubiti": ("B12", 26, (40, 70, 560, 484)),
    "t09_ligamen_tangan": ("B12", 27, (40, 76, 560, 563)),
    "t09_pronasi": ("B12", 30, (40, 76, 560, 720), [(55, 668, 255, 720)]),
    # T10 Sendi pelvis dan ekstremitas inferior
    "t10_sacroiliaca": ("B12", 31, (40, 405, 560, 702)),
    "t10_coxae_potongan": ("B12", 33, (40, 70, 560, 586)),
    "t10_coxae_ligamen": ("B12", 34, (40, 70, 560, 541)),
    "t10_genus": ("B12", 38, (40, 150, 560, 695)),
    "t10_genus_batas": ("B12", 39, (40, 70, 560, 468)),
    "t10_talocruralis": ("B12", 42, (40, 212, 560, 702)),
    "t10_arcus": ("B12", 51, (40, 253, 560, 693)),
    # O01 Dasar otot
    "o01_struktur_otot": ("B13", 3, (40, 76, 560, 474)),
    "o01_unit_motorik": ("B13", 4, (40, 76, 305, 371)),
    "o01_refleks": ("B13", 4, (40, 388, 560, 722), [(386, 627, 560, 722)]),
    "o01_kerja_otot": ("B13", 5, (40, 220, 560, 722), [(390, 536, 560, 722)]),
    # O02 Otot kepala dan leher
    "o02_scalp": ("B13", 7, (40, 400, 560, 680)),
    "o02_ekspresi_wajah": ("B13", 9, (40, 76, 560, 521)),
    "o02_platysma": ("B13", 12, (40, 76, 560, 346)),
    "o02_trigonum_anterior": ("B13", 12, (40, 374, 560, 703)),
    "o02_potongan_leher": ("B13", 14, (40, 76, 560, 450)),
    "o02_trigonum_leher": ("B13", 15, (40, 76, 560, 477)),
    # O03 Punggung, thorax, diaphragma
    "o03_punggung": ("B13", 16, (40, 76, 560, 519)),
    "o03_intercostal": ("B03", 6, (40, 76, 560, 553)),
    "o03_diaphragma": ("B03", 10, (40, 385, 560, 692)),
    # O04 Abdomen, pelvis, perineum
    "o04_otot_abdomen": ("B13", 18, (40, 76, 560, 636)),
    "o04_rectus": ("B13", 19, (40, 76, 560, 386)),
    "o04_vagina_recti": ("B13", 20, (40, 372, 560, 692)),
    "o04_inguinal": ("B13", 21, (40, 76, 560, 355)),
    "o04_dinding_pelvis": ("B13", 22, (40, 305, 560, 558)),
    "o04_levator_ani": ("B13", 23, (40, 342, 560, 680)),
    "o04_perineum": ("B13", 24, (40, 322, 560, 701)),
    "o04_diaphragma_urogenitale": ("B13", 25, (40, 76, 560, 424)),
    # O05 Otot ekstremitas superior
    "o05_axilla": ("B13", 27, (40, 76, 560, 432)),
    "o05_bahu_posterior": ("B13", 29, (40, 76, 560, 437)),
    "o05_lengan_anterior": ("B13", 30, (40, 76, 560, 607)),
    "o05_fossa_cubiti": ("B13", 32, (40, 76, 560, 531)),
    "o05_potongan_lengan": ("B13", 33, (40, 458, 560, 690)),
    "o05_lengan_bawah_anterior": ("B13", 34, (40, 76, 560, 676)),
    "o05_potongan_lengan_bawah": ("B13", 37, (40, 458, 560, 703)),
    "o05_selubung_sinovial": ("B13", 41, (40, 76, 560, 532)),
    "o05_insersi_tendo": ("B13", 42, (40, 76, 560, 607)),
    # O06 Otot ekstremitas inferior
    "o06_gluteus_maximus": ("B13", 45, (40, 76, 560, 451)),
    "o06_regio_glutea": ("B13", 47, (40, 76, 560, 536)),
    "o06_trigonum_femorale": ("B13", 48, (40, 76, 560, 608)),
    "o06_potongan_paha": ("B13", 53, (40, 375, 560, 702)),
    "o06_selubung_femoralis": ("B13", 54, (40, 76, 560, 612)),
    "o06_fossa_poplitea": ("B13", 55, (40, 76, 560, 566)),
    "o06_potongan_tungkai": ("B13", 62, (40, 76, 560, 526)),
    "o06_plantar_lapis1": ("B13", 66, (40, 76, 560, 571)),
    # S01 Organisasi sistem saraf
    "s01_neuron_spinal": ("B01", 18, (40, 76, 560, 577)),
    "s01_saraf_spinal": ("B01", 19, (40, 76, 560, 556)),
    "s01_dua_neuron": ("B01", 21, (40, 76, 560, 466)),
    "s01_somatik_otonom": ("B01", 22, (40, 76, 560, 360)),
    "s01_otonom_eferen": ("B01", 23, (40, 76, 560, 562), [(352, 476, 560, 552)]),
    # S02-S03 Otak, meningen, ventrikel
    "s02_sagital_kepala": ("B14", 13, (40, 185, 560, 705)),
    "s02_area_otak": ("B14", 21, (40, 76, 560, 602)),
    "s02_basis_otak": ("B14", 19, (40, 212, 560, 692)),
    "s03_meningen": ("B14", 14, (40, 76, 560, 345)),
    "s03_lipatan_dura": ("B14", 14, (40, 384, 560, 693)),
    "s03_falx_tentorium": ("B14", 16, (40, 322, 560, 691)),
    "s03_sinus_cavernosus": ("B14", 17, (40, 165, 560, 683)),
    "s03_css": ("B14", 22, (40, 220, 560, 701)),
    # S05-S06 Nervus cranialis
    "s05_olfactorius_opticus": ("B15", 5, (40, 76, 560, 581)),
    "s05_oculomotorius": ("B15", 6, (40, 76, 560, 530)),
    "s05_basis_saraf": ("B15", 7, (40, 76, 560, 456)),
    "s05_trigeminus": ("B15", 8, (40, 76, 560, 596)),
    "s05_dermatom_wajah": ("B15", 9, (40, 76, 560, 393)),
    "s06_facialis": ("B15", 13, (40, 172, 560, 692)),
    "s06_viii_ix": ("B15", 15, (40, 76, 560, 623)),
    "s06_vagus": ("B15", 16, (40, 218, 560, 702)),
    "s06_xi_xii": ("B15", 18, (40, 76, 560, 596)),
    # S04 Medulla spinalis
    "s04_ujung_medulla": ("B16", 8, (40, 76, 560, 570)),
    "s04_cauda_meningen": ("B16", 9, (40, 76, 560, 612)),
    "s04_radix": ("B16", 10, (40, 76, 560, 532)),
    "s04_potongan_vertebra": ("B16", 11, (40, 76, 560, 504)),
    "s04_mri_hernia": ("B16", 23, (40, 76, 560, 432)),
    # S07-S09 Saraf spinal
    "s07_plexus_brachialis": ("B17", 8, (40, 360, 560, 703)),
    "s07_kulit_ekstremitas_superior": ("B17", 10, (40, 76, 560, 567)),
    "s07_ringkasan_cabang": ("B17", 11, (40, 76, 560, 505)),
    "s07_radialis": ("B17", 23, (40, 76, 560, 487)),
    "s07_intercostal": ("B17", 24, (40, 76, 560, 398)),
    "s08_plexus_lumbalis": ("B17", 26, (40, 76, 298, 378)),
    "s08_kulit_anterior": ("B17", 28, (40, 76, 560, 587)),
    "s08_kulit_posterior": ("B17", 29, (40, 76, 560, 609)),
    "s08_ischiadicus_tibialis": ("B17", 41, (40, 76, 560, 577)),
    "s08_peroneus": ("B17", 45, (40, 76, 560, 516)),
    # P01-P03 Pembuluh dasar, koroner, thorax
    "p01_sistem_pembuluh": ("B01", 14, (40, 76, 560, 522)),
    "p01_jenis_pembuluh": ("B01", 15, (40, 76, 560, 616)),
    "p02_koroner": ("B04", 10, (40, 262, 560, 700), [(220, 698, 560, 720)]),
    "p02_dominansi": ("B04", 11, (40, 300, 560, 680)),
    "p03_jantung_pembuluh": ("B05", 3, (40, 76, 560, 419)),
    "p03_mediastinum_kiri": ("B05", 4, (40, 400, 560, 720), [(260, 700, 560, 722)]),
    "p03_aorta_descendens": ("B05", 5, (40, 235, 560, 700)),
    "p03_vena_thorax": ("B05", 9, (40, 76, 560, 622)),
    # P04 kepala leher
    "p04_arteri_kepala": ("B06", 3, (40, 76, 560, 462)),
    "p04_pangkal_leher": ("B06", 4, (40, 76, 560, 503)),
    "p04_carotis": ("B06", 6, (40, 76, 560, 537)),
    "p04_vena_kepala": ("B06", 12, (40, 76, 560, 468)),
    "p04_permukaan_leher": ("B06", 14, (40, 76, 560, 505)),
    # P05 ekstremitas superior
    "p05_axillaris": ("B07", 7, (40, 76, 560, 397)),
    "p05_anastomosis_bahu": ("B07", 9, (40, 76, 560, 492)),
    "p05_arteri_lengan": ("B07", 11, (40, 76, 560, 572)),
    "p05_arcus_profundus": ("B07", 15, (40, 76, 560, 475)),
    "p05_arcus_superficialis": ("B07", 16, (40, 76, 560, 533)),
    "p05_vena_superficialis": ("B07", 20, (40, 315, 560, 703)),
    # P06 abdomen pelvis
    "p06_aorta_abdominalis": ("B08", 4, (40, 70, 560, 435)),
    "p06_gaster": ("B08", 7, (40, 70, 400, 330)),
    "p06_mesenterica_superior": ("B08", 9, (40, 330, 405, 645)),
    "p06_mesenterica_inferior": ("B08", 11, (40, 70, 560, 488)),
    "p06_pelvis": ("B08", 12, (40, 70, 560, 377)),
    "p06_porta": ("B08", 19, (40, 70, 560, 599), [(400, 70, 560, 110)]),
    # P07 ekstremitas inferior
    "p07_trigonum_femorale": ("B09", 3, (40, 70, 560, 567)),
    "p07_fossa_poplitea": ("B09", 7, (40, 70, 560, 612)),
    "p07_tungkai_anterior": ("B09", 9, (40, 70, 560, 617)),
    "p07_arcus_plantaris": ("B09", 11, (40, 205, 560, 692)),
    "p07_tungkai_posterior": ("B09", 13, (40, 70, 560, 622)),
    "p07_vena_superficialis": ("B09", 18, (40, 70, 560, 609)),
    "p08_ductus": ("B10", 3, (40, 72, 560, 560)),
    "p08_kepala_leher": ("B10", 5, (40, 72, 560, 527)),
    "p08_axilla": ("B10", 6, (40, 380, 560, 697)),
    "p08_mamma": ("B10", 7, (40, 430, 560, 702)),
    "p08_paru": ("B10", 8, (40, 280, 560, 703), [(60, 278, 110, 293)]),
    "p08_abdomen": ("B10", 9, (40, 290, 560, 701)),
    "p08_ekstremitas_inferior": ("B10", 12, (40, 72, 560, 592)),
    "p08_tonsilla": ("B10", 13, (40, 290, 560, 574)),
    "v01_cavum_nasi": ("B02", 4, (40, 72, 560, 505)),
    "v01_sinus": ("B02", 9, (40, 72, 560, 282)),
    "v01_rongga_mulut": ("B02", 10, (40, 72, 560, 608)),
    "v01_pharynx": ("B02", 24, (40, 72, 560, 482)),
    "v01_larynx": ("B02", 29, (40, 72, 560, 589)),
    "v01_larynx_otot": ("B02", 31, (40, 72, 560, 631)),
    "v01_trachea": ("B02", 35, (40, 330, 560, 705)),
    "v01_permukaan": ("B02", 39, (40, 360, 560, 704)),
    "v02_mamma": ("B03", 16, (40, 72, 560, 570)),
    "v02_limfe_mamma": ("B03", 18, (40, 72, 560, 442)),
    "v02_mediastinum_bagian": ("B03", 20, (40, 436, 560, 702)),
    "v02_pleura": ("B03", 21, (40, 72, 560, 457)),
    "v02_persarafan_pleura": ("B03", 23, (40, 468, 560, 703)),
    "v02_paru_kanan": ("B03", 26, (40, 72, 560, 437)),
    "v02_paru_kiri": ("B03", 27, (40, 72, 560, 423)),
    "v02_mediastinum_sisi": ("B03", 28, (40, 72, 560, 704)),
    "v02_segmen": ("B03", 33, (40, 72, 560, 490)),
    "v02_inspirasi": ("B03", 35, (40, 72, 560, 661)),
    "v02_permukaan_anterior": ("B03", 50, (40, 400, 560, 653)),
    "v02_permukaan_posterior": ("B03", 51, (40, 415, 560, 647)),
    "v03_anterior": ("B04", 3, (40, 446, 560, 712), [(380, 660, 560, 712)]),
    "v03_posterior": ("B04", 4, (40, 400, 385, 702)),
    "v03_ruang_kanan": ("B04", 5, (40, 395, 538, 690)),
    "v03_katup": ("B04", 6, (40, 226, 560, 682)),
    "v03_katup_atas": ("B04", 7, (40, 430, 560, 704)),
    "v03_konduksi": ("B04", 9, (40, 72, 560, 343)),
    "v03_permukaan": ("B04", 14, (40, 420, 560, 659)),
    "v03_pericardium": ("B04", 20, (40, 400, 300, 701)),
    "v03_pericardium_dalam": ("B04", 21, (40, 72, 560, 415)),
    "v04_palpebra": ("B18", 3, (40, 72, 560, 666)),
    "v04_orbita_depan": ("B18", 6, (40, 72, 560, 688)),
    "v04_orbita_atas": ("B18", 7, (40, 290, 560, 680)),
    "v04_orbita_lateral": ("B18", 8, (40, 300, 560, 692)),
    "v04_otot_fungsi": ("B18", 12, (40, 330, 560, 680)),
    "v04_bola_mata": ("B18", 14, (40, 228, 560, 679)),
    "v04_telinga": ("B18", 19, (40, 72, 560, 583)),
    "v04_cavitas_tympani": ("B18", 21, (40, 170, 560, 681)),
    "v04_labyrinthus": ("B18", 22, (40, 203, 560, 701)),
    "v04_getaran": ("B18", 24, (40, 72, 560, 660)),
    "v05_dermatom": ("B19", 3, (40, 300, 560, 702)),
    "v05_pendarahan": ("B19", 4, (40, 337, 560, 690)),
    "v05_canalis": ("B19", 12, (40, 72, 380, 700)),
    "v05_lapisan": ("B19", 13, (40, 309, 560, 666)),
    "v05_testis": ("B19", 15, (40, 72, 560, 551)),
    "v05_sagital": ("B19", 22, (40, 72, 560, 509)),
    "v05_transversal": ("B19", 23, (40, 72, 560, 558)),
    "v05_bursa": ("B19", 25, (40, 72, 560, 413)),
    "v05_aliran": ("B19", 27, (40, 72, 560, 369)),
    "v06_viscera": ("B19", 31, (40, 72, 560, 501)),
    "v06_oesophagus": ("B19", 33, (40, 72, 400, 400)),
    "v06_gaster": ("B19", 36, (40, 72, 560, 512)),
    "v06_gaster_arteri": ("B19", 38, (40, 72, 560, 370)),
    "v06_gaster_limfe": ("B19", 38, (40, 396, 560, 703)),
    "v06_duodenum": ("B19", 44, (40, 358, 560, 702)),
    "v06_jejunum_ileum": ("B19", 49, (40, 72, 560, 445)),
    "v06_caecum": ("B19", 51, (40, 397, 400, 680), [(380, 380, 400, 425)]),
    "v06_canalis_analis": ("B19", 62, (40, 72, 560, 680)),
    "v06_usus_beda": ("B19", 63, (40, 72, 560, 514)),
    "v06_permukaan": ("B19", 72, (40, 72, 560, 583)),
    "v06_permukaan_organ": ("B19", 74, (40, 72, 560, 560)),
    "v07_hepar": ("B20", 4, (40, 72, 560, 506)),
    "v07_porta_hepatis": ("B20", 5, (40, 72, 560, 320)),
    "v07_vena_porta": ("B20", 6, (40, 72, 560, 592)),
    "v07_ductus": ("B20", 9, (40, 72, 560, 333)),
    "v07_ampulla": ("B20", 10, (40, 400, 560, 688)),
    "v07_pancreas": ("B20", 20, (40, 350, 560, 700)),
    "v07_pancreas_posterior": ("B20", 21, (40, 360, 560, 700)),
    "v07_lien": ("B20", 24, (40, 264, 560, 705)),
    "v08_ren_insitu": ("B21", 3, (40, 320, 560, 688)),
    "v08_ren_struktur": ("B21", 4, (40, 72, 560, 619)),
    "v08_ren_batas": ("B21", 6, (40, 72, 560, 316)),
    "v08_vesica": ("B21", 12, (40, 72, 560, 544)),
    "v08_ureter_uterina": ("B21", 13, (40, 72, 560, 543)),
    "v08_vesica_dalam": ("B21", 16, (40, 72, 560, 541)),
    "v08_kendali": ("B21", 19, (40, 72, 560, 368)),
    "v08_urethra": ("B21", 21, (40, 72, 560, 410)),
    "v08_permukaan": ("B21", 25, (40, 72, 560, 626)),
    "v09_sistem": ("B22", 3, (40, 72, 560, 303)),
    "v09_ductus_deferens": ("B22", 9, (40, 72, 560, 352)),
    "v09_prostat": ("B22", 11, (40, 72, 560, 570)),
    "v09_perineum": ("B22", 13, (40, 72, 560, 440)),
    "v09_radix": ("B22", 16, (40, 72, 560, 352)),
    "v09_penis": ("B22", 17, (40, 72, 560, 520)),
    "v10_dasar_pelvis": ("B23", 4, (40, 320, 560, 678)),
    "v10_perineum": ("B23", 5, (40, 300, 560, 688)),
    "v10_sagital": ("B23", 7, (40, 72, 560, 400)),
    "v10_vulva": ("B23", 8, (40, 72, 560, 508)),
    "v10_clitoris": ("B23", 9, (40, 72, 560, 407)),
    "v10_uterus_ligamentum": ("B23", 11, (40, 72, 560, 530)),
    "v10_ovarium": ("B23", 12, (40, 72, 560, 325)),
    "v10_uterus": ("B23", 14, (40, 300, 560, 658)),
    "v10_penyokong": ("B23", 17, (40, 72, 560, 336)),
    "v10_ligamenta": ("B23", 18, (40, 72, 560, 517)),
    "v11_lokasi": ("B24", 3, (40, 300, 560, 702)),
    "v11_pituitaria": ("B24", 6, (40, 72, 560, 405)),
    "v11_pituitaria_bagian": ("B24", 7, (40, 72, 560, 563)),
    "v11_thyroidea": ("B24", 11, (40, 72, 560, 646)),
    "v11_parathyroidea": ("B24", 16, (40, 72, 560, 320)),
    "t03_mandibula_hyoid": ("B11", 17, (40, 205, 560, 703)),
}


def berkas(kode):
    if kode in SOBOTTA:
        return os.path.join(SRC, SOBOTTA[kode])
    n = int(kode[1:])
    return glob.glob(os.path.join(SRC, f"Bab {n} *.pdf"))[0]


def pangkas(path, ambang=235, tepi=8):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im.convert("L"))
    gelap = a < ambang
    baris = np.where(gelap.sum(axis=1) > 3)[0]
    kolom = np.where(gelap.sum(axis=0) > 3)[0]
    isi = (baris, kolom) if baris.size and kolom.size else (np.array([]), np.array([]))
    if isi[0].size:
        y0, y1, x0, x1 = baris.min(), baris.max(), kolom.min(), kolom.max()
        im = im.crop((max(x0 - tepi, 0), max(y0 - tepi, 0), min(x1 + tepi, a.shape[1]), min(y1 + tepi, a.shape[0])))
    im.save(path)


def main():
    os.makedirs(OUT, exist_ok=True)
    awalan = sys.argv[1] if len(sys.argv) > 1 else ""
    cache = {}
    for nama, (kode, hlm, kotak, *tutup) in SPEK.items():
        if not nama.startswith(awalan):
            continue
        doc = cache.setdefault(kode, pymupdf.open(berkas(kode)))
        tujuan = os.path.join(OUT, nama + ".png")
        pg = doc[hlm - 1]
        # paragraf teks buku (blok panjang) di dalam kotak ikut diputihkan; label gambar pendek dipertahankan
        auto = [b[:4] for b in pg.get_text("blocks") if len(b[4].strip()) > 80]
        for r in (tutup[0] if tutup else []) + auto:
            pg.draw_rect(pymupdf.Rect(*r), color=(1, 1, 1), fill=(1, 1, 1))
        pg.get_pixmap(dpi=200, clip=pymupdf.Rect(*kotak)).save(tujuan)
        pangkas(tujuan)
        print(nama)


if __name__ == "__main__":
    main()
