"""Cari kalimat pendukung di ekstraksi buku utama. Pemakaian: python skrip/cek.py "pola1" "pola2" ..."""
import re, sys, os
AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = re.sub(r'\s+', ' ', open(os.path.join(AKAR, 'ingatan/ekstraksi/utama.md'), encoding='utf-8').read())
for q in sys.argv[1:]:
    ms = list(re.finditer(r'[^.]{0,160}' + q + r'[^.]{0,200}\.', t, re.I))[:2]
    print('##', q, len(ms))
    for m in ms: print('   ', m.group(0)[:360])
