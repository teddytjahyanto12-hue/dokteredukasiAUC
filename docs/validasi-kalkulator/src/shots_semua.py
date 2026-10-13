"""Cuplikan hasil semua kalkulator (kasus uji pertama) dengan akun owner UJI lokal; kredensial dibaca dari AKUN_DAN_ISIAN.md dan tidak dicetak.
Pakai: python shots_semua.py plan.json FOLDER_KELUAR"""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parents[3]
plan = json.load(open(sys.argv[1], encoding="utf-8"))
OUT = Path(sys.argv[2]); OUT.mkdir(parents=True, exist_ok=True)
row = next(l for l in (ROOT / "AKUN_DAN_ISIAN.md").read_text(encoding="utf-8").splitlines() if l.startswith("| Owner"))
email, pw = [c.strip() for c in row.split("|")[2:4]]
res = {}
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_context(viewport={"width": 1280, "height": 1000}, device_scale_factor=1.5).new_page()
    pg.goto("http://localhost:3000/masuk", wait_until="networkidle")
    pg.fill("input[name=email]", email); pg.fill("input[name=password]", pw)
    pg.click("button[type=submit]"); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(1500)
    for slug, steps in plan.items():
        pg.goto(f"http://localhost:3000/kalkulator/{slug}", wait_until="networkidle"); pg.wait_for_timeout(3500)
        try:
            for s in steps:
                if s["kind"] == "fill":
                    pg.locator("label", has_text=s["label"]).locator("input").first.fill(s["value"])
                elif s["kind"] == "check":
                    pg.locator("button").filter(has=pg.get_by_text(s["label"], exact=True)).first.click()
                else:
                    fs = pg.locator("fieldset").filter(has=pg.locator("legend", has_text=s["label"]))
                    fs.locator("button").filter(has=pg.get_by_text(s["value"], exact=True)).first.click()
            pg.wait_for_timeout(500)
            aside = pg.locator("aside").first
            aside.screenshot(path=str(OUT / f"app-{slug}.png"))
            res[slug] = aside.inner_text()
            print("ok", slug)
        except Exception as e:
            print("GAGAL", slug, str(e)[:120])
    for slug, acts in {"gcs": ["Terhadap suara", "Bingung", "Melokalisasi"]}.items():
        pg.goto(f"http://localhost:3000/kalkulator/{slug}", wait_until="networkidle"); pg.wait_for_timeout(2000)
        for t in acts: pg.get_by_role("button", name=t).first.click()
        pg.wait_for_timeout(400); pg.locator("aside").first.screenshot(path=str(OUT / f"app-{slug}.png")); res[slug] = pg.locator("aside").first.inner_text(); print("ok", slug)
    pg.goto("http://localhost:3000/kalkulator/hpl", wait_until="networkidle"); pg.wait_for_timeout(2000)
    d = pg.locator("input[type=date]"); d.nth(0).fill("2026-01-10"); d.nth(1).fill("2026-01-10"); pg.wait_for_timeout(400)
    pg.locator("aside").first.screenshot(path=str(OUT / "app-hpl.png")); res["hpl"] = pg.locator("aside").first.inner_text(); print("ok hpl")
    b.close()
json.dump(res, open(OUT / "hasil.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
