"""Memotret potongan halaman sumber (antara teks awal dan teks akhir) untuk dokumen validasi."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)

SHOTS = [
    # (nama berkas, url, klik dulu (opsional), teks awal, teks akhir)
    ("gcs-1-komponen", "https://www.glasgowcomascale.org/what-is-gcs/", None, "The Scale was described in 1974", "Comparisons of assessments"),
    ("gcs-2-nt", "https://www.glasgowcomascale.org/faq/", "1. What factors can interfere", "Treatment influences", "It is possible using statistical methods"),
    ("gcs-3-derajat", "https://www.glasgowcomascale.org/faq/", "7. What are the relationships", "Scale versus score", "Relation between the scale and the score"),
    ("gcs-4-pediatrik", "https://www.glasgowcomascale.org/faq/", "2. How is the Glasgow Coma Scale modified", "The scale can be applied without modification", "References"),
    ("gcs-5-istilah", "https://www.glasgowcomascale.org/gcs-aid/", None, "Eye and Verbal Scales", "Teasdale G Jennett B Assessment and Prognosis"),
    ("gcs-6-rangsang", "https://www.glasgowcomascale.org/gcs-aid/", None, "The technique of stimulation", "Teasdale G. Acute impairment"),
    ("hpl-1-280hari", "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date", None, "Traditionally, determining the first day", "Accurate determination of gestational age can"),
    ("hpl-2-trimester1-ivf", "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date", None, "Clinical Considerations in the First Trimester", "Clinical Considerations in the Second Trimester"),
    ("hpl-3-trimester2", "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date", None, "Using a single ultrasound examination in the second trimester", "the biparietal diameter and head"),
    ("hpl-4-trimester3", "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date", None, "Clinical Considerations in the Third Trimester", "Conclusion"),
    ("hpl-5-term", "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/11/definition-of-term-pregnancy", None, "Recommended Classification of Deliveries", "Uniform definitions of term"),
]

HIDE_FIXED = """
for (const el of document.querySelectorAll('body *')) {
  const s = getComputedStyle(el);
  if ((s.position === 'fixed' || s.position === 'sticky') && el.offsetHeight < innerHeight) el.style.setProperty('display','none','important');
}
"""

def box_of(page, text):
    loc = page.get_by_text(text, exact=False)
    for i in range(loc.count()):
        el = loc.nth(i)
        if el.is_visible():
            b = el.bounding_box()
            if b: return b
    return None

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    ctx = browser.new_context(viewport={"width": 1100, "height": 1400}, device_scale_factor=1.5, locale="en-US")
    page = ctx.new_page()
    current = None
    ONLY = set(sys.argv[2:])
    for name, url, click, start, end in SHOTS:
        if ONLY and name not in ONLY: continue
        try:
            if url != current:
                page.goto(url, wait_until="networkidle", timeout=60000)
                current = url
            if click:
                page.get_by_text(click, exact=False).first.click()
                page.wait_for_timeout(800)
            page.evaluate(HIDE_FIXED)
            page.wait_for_timeout(300)
            a, b = box_of(page, start), box_of(page, end)
            if not a or not b:
                results[name] = f"teks tidak ditemukan: awal={bool(a)} akhir={bool(b)}"; continue
            sy = page.evaluate("scrollY")
            y0 = a["y"] + sy - 12
            y1 = b["y"] + sy - 4
            if y1 <= y0: y1 = y0 + 300
            x0 = max(0, min(a["x"], b["x"]) - 48)
            right = max(a["x"] + a["width"], b["x"] + b["width"], x0 + 760) + 16
            clip = {"x": x0, "y": y0, "width": min(1100 - x0, right - x0), "height": min(y1 - y0, 1500)}
            page.screenshot(path=str(OUT / f"{name}.png"), clip=clip, full_page=True)
            results[name] = {"ok": True, "w": clip["width"], "h": clip["height"], "url": url}
        except Exception as e:
            results[name] = f"gagal: {e}"
    browser.close()
(OUT / "shots.json").write_text(json.dumps(results, indent=1))
print(json.dumps(results, indent=1))
