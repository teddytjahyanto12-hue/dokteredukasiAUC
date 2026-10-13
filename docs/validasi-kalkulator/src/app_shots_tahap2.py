"""Screenshot kalkulator baru dengan akun owner UJI lokal (kredensial dibaca dari AKUN_DAN_ISIAN.md, tidak dicetak)."""
import re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parents[3]
OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
row = next(l for l in (ROOT / "AKUN_DAN_ISIAN.md").read_text(encoding="utf-8").splitlines() if l.startswith("| Owner"))
email, pw = [c.strip() for c in row.split("|")[2:4]]
PLAN = {
    "bishop": ["1–2 cm", "40–50%", "−2", "Sedang (medium)", "Tengah (mid position)"],
    "cairan-dewasa": [("Berat badan", "60"), "Dewasa tanpa kondisi khusus (25–30 mL/kg/hari)", "Makro 20 tetes/mL"],
    "alvarado": ["Nyeri berpindah ke kuadran kanan bawah", "Anoreksia", "Nyeri tekan kuadran kanan bawah", "Leukositosis"],
    "dehidrasi": ["12 bulan sampai 5 tahun", ("Berat badan", "12"), "Rewel atau mudah marah", "Cekung", "Haus, minum dengan lahap", "Segera"],
    "killip": ["Kelas II: gagal jantung"],
    "gir": [("Konsentrasi dekstrosa", "10"), ("Laju infus", "10"), ("Berat badan", "3")],
}
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_context(viewport={"width": 1280, "height": 1000}, device_scale_factor=1.5).new_page()
    pg.goto("http://localhost:3000/masuk", wait_until="networkidle")
    pg.fill("input[name=email]", email); pg.fill("input[name=password]", pw)
    pg.click("button[type=submit]"); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(1500)
    print("setelah masuk:", pg.url)
    for slug, steps in PLAN.items():
        pg.goto(f"http://localhost:3000/kalkulator/{slug}", wait_until="networkidle"); pg.wait_for_timeout(2500)
        if "khusus pelanggan Premium" in pg.inner_text("main"): print("TERKUNCI", slug); continue
        for s in steps:
            if isinstance(s, tuple):
                pg.locator("label", has_text=s[0]).locator("input").first.fill(s[1])
            else:
                el = pg.get_by_role("button", name=s, exact=True)
                if el.count() == 0: el = pg.get_by_label(s, exact=True)
                if el.count() == 0: el = pg.get_by_text(s, exact=True)
                el.first.click()
        pg.wait_for_timeout(600)
        aside = pg.locator("aside").first
        print(f"== {slug}\n" + aside.inner_text()[:700])
        aside.screenshot(path=str(OUT / f"app-{slug}.png"))
        pg.screenshot(path=str(OUT / f"app-{slug}-full.png"), full_page=True)
    b.close()
