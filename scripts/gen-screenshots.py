#!/usr/bin/env python3
"""
Regenerate the annotated benefit screenshots used on /submit-tool.

Captures real aitoolslist.ai pages with headless Chrome, crops off the promo
bar + cookie notice, draws brand annotations, and writes optimized WebP into
public/screens/.

Usage:
    python3 scripts/gen-screenshots.py
Env:
    BASE_URL  target site (default https://aitoolslist.ai)
    CHROME    path to a Chrome/Chromium binary (auto-detected if unset)

Notes:
- Capture is 820px wide at 3x so page text stays large and readable when the
  image is shown in a half-width column.
- Crop offsets and annotation coordinates assume the current layout/example
  tools (Midjourney in AI Image Generation). After a major redesign, adjust the
  SHOTS config below.
"""
import os
import shutil
import subprocess
import sys
import tempfile
from PIL import Image, ImageDraw, ImageFont

BASE_URL = os.environ.get("BASE_URL", "https://aitoolslist.ai").rstrip("/")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "screens")
BRAND = (0, 139, 220)    # #008BDC — Internshala-style primary blue
BRAND6 = (23, 87, 170)   # #1757AA — darker blue for outlines/arrows

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",       # macOS
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",     # Ubuntu
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]

CHROME_CANDIDATES = [
    os.environ.get("CHROME"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    shutil.which("google-chrome"),
    shutil.which("google-chrome-stable"),
    shutil.which("chromium-browser"),
    shutil.which("chromium"),
]

# Per-shot: page path, crop box (after a 820x900@3x = 2460x2700 capture), and
# annotations (highlight boxes, labels, optional arrows).
SHOTS = {
    "product-page": {
        "path": "/tools/midjourney",
        "crop": (0, 180, 2460, 2525),
        "highlights": [
            (45, 500, 1230, 930),
            (50, 1160, 665, 1275),
            (55, 1545, 2405, 2290),
        ],
        "labels": [
            ("Your product, front and centre", 45, 430),
            ("A direct link to your site", 710, 1178),
            ("Structured details buyers & AI can read", 55, 1470),
        ],
        "arrows": [],
    },
    "category-page": {
        "path": "/categories/ai-image-generation",
        "crop": (0, 180, 2460, 2470),
        "highlights": [(55, 1185, 1205, 2240)],
        "labels": [("Your product, featured at the top", 1285, 1250)],
        "arrows": [((1270, 1330), (1130, 1250))],
    },
}


def find_one(candidates, what):
    for c in candidates:
        if c and os.path.exists(c):
            return c
    sys.exit(f"ERROR: could not find a {what}. Tried: {candidates}")


def capture(chrome, url, dst, profile):
    subprocess.run(
        [
            chrome, "--headless=new", "--hide-scrollbars",
            "--no-sandbox", "--disable-dev-shm-usage",
            "--force-device-scale-factor=3", "--window-size=820,900",
            f"--user-data-dir={profile}", f"--screenshot={dst}", url,
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def font(path, sz):
    return ImageFont.truetype(path, sz)


def annotate(img_path, cfg, font_path):
    import math

    im = Image.open(img_path).convert("RGB").crop(cfg["crop"])
    d = ImageDraw.Draw(im)
    for box in cfg["highlights"]:
        d.rounded_rectangle(box, radius=24, outline=BRAND6, width=7)
    f = font(font_path, 46)
    for text, x, y in cfg["labels"]:
        pad = 20
        l, t, r, b = d.textbbox((0, 0), text, font=f)
        d.rounded_rectangle((x, y, x + (r - l) + 2 * pad, y + (b - t) + 2 * pad + 6), radius=16, fill=BRAND)
        d.text((x + pad, y + pad - t), text, font=f, fill="white")
    for p1, p2 in cfg["arrows"]:
        d.line([p1, p2], fill=BRAND6, width=8)
        ang = math.atan2(p2[1] - p1[1], p2[0] - p1[0])
        for a in (ang + 2.6, ang - 2.6):
            d.line([p2, (p2[0] + 34 * math.cos(a), p2[1] + 34 * math.sin(a))], fill=BRAND6, width=8)
    return im


def main():
    chrome = find_one(CHROME_CANDIDATES, "Chrome/Chromium binary")
    font_path = find_one(FONT_CANDIDATES, "bold .ttf font")
    os.makedirs(OUT_DIR, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for name, cfg in SHOTS.items():
            raw = os.path.join(tmp, f"{name}.png")
            capture(chrome, BASE_URL + cfg["path"], raw, os.path.join(tmp, f"profile-{name}"))
            im = annotate(raw, cfg, font_path)
            out = os.path.join(OUT_DIR, f"{name}.webp")
            im.save(out, "WEBP", quality=84, method=6)
            print(f"wrote {out} {im.size} from {BASE_URL}{cfg['path']}")


if __name__ == "__main__":
    main()
