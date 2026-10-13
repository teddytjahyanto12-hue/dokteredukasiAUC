import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT = Path(sys.argv[1])
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_context(viewport={"width": 1280, "height": 1000}, device_scale_factor=1.5).new_page()
    pg.goto("http://localhost:3000/cheatsheet/gcs", wait_until="networkidle"); pg.wait_for_timeout(1500)
    for t in ["Terhadap suara", "Bingung", "Melokalisasi"]:
        pg.get_by_role("button", name=t).first.click()
    pg.wait_for_timeout(400)
    pg.locator("aside").screenshot(path=str(OUT / "app-gcs.png"))
    pg.get_by_role("button", name="Ulangi").click()
    for t in ["Spontan", "Mengikuti perintah"]:
        pg.get_by_role("button", name=t).first.click()
    pg.locator("fieldset").nth(1).get_by_role("button", name="Tidak dapat dinilai").click()
    pg.wait_for_timeout(400)
    pg.locator("aside").screenshot(path=str(OUT / "app-gcs-nt.png"))
    pg.goto("http://localhost:3000/cheatsheet/hpl", wait_until="networkidle"); pg.wait_for_timeout(1500)
    d = pg.locator("input[type=date]")
    d.nth(0).fill("2026-05-20"); d.nth(1).fill("2026-10-12")
    pg.wait_for_timeout(400)
    pg.locator("aside").screenshot(path=str(OUT / "app-hpl.png"))
    pg.goto("http://localhost:3000/cheatsheet", wait_until="networkidle"); pg.wait_for_timeout(1500)
    pg.screenshot(path=str(OUT / "app-hub.png"))
    b.close()
print("ok")
