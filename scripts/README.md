# Benefit screenshots (/submit-tool)

The two annotated screenshots in the "Everything a listing gets you" section are
real captures of live aitoolslist.ai pages, stored in `public/screens/*.webp`.

## Auto-regeneration

`.github/workflows/screenshots.yml` runs after every **successful production
deploy** (so whenever the live design changes), recaptures both pages, redraws
the annotations, and commits the WebP back — but only if the images actually
changed. It is fail-safe: if the job errors, the existing screenshots are kept
and nothing on the site is affected. You can also trigger it manually from the
Actions tab (`Run workflow`).

## Regenerate locally

```bash
npm run screenshots           # captures https://aitoolslist.ai
BASE_URL=http://localhost:3000 npm run screenshots   # or a local build
```

Requires Python with Pillow (`pip install pillow`) and a Chrome/Chromium
binary (auto-detected, or set `CHROME=/path/to/chrome`).

## Adjusting after a redesign

Capture is 820px wide at 3x so page text stays readable in a half-width column.
The crop offsets and annotation coordinates live in `SHOTS` in
`gen-screenshots.py`; if a major layout change shifts elements, tweak those
boxes/labels there.
