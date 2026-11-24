---

## name: notion-portfolio description: Build a product designer / PM portfolio in Notion's design language (white canvas, warm-gray ink, pastel tint cards, 8px rectangles, Inter) with a recruiter-first structure. Use when someone asks for "a portfolio like this", a Notion-style portfolio, or a homepage \+ case-study system for a designer or PM. Includes tokens, components, page skeleton, case-study skeleton and copy rules.

# Notion-style portfolio

A portfolio for designers and PMs, read by recruiters on a phone in under a minute. Visual language: Notion's marketing site (white canvas, warm-charcoal text, pastel tags and cards, sober 8px rectangles). Structure: results first, then proof.

Stack-agnostic. Works in plain HTML, Astro, Next or anything with CSS variables. Astro \+ one global CSS file is the reference setup: no client framework, no UI kit.

## 1\. Tokens (paste into :root)

```css
:root {
  /* Surface */
  --canvas: #fff; --n-surface: #f6f5f4;
  --hairline: #e5e3df; --hairline-soft: #ede9e4; --hairline-strong: #c8c4be;
  /* Text: warm grays, never pure gray */
  --ink-deep: #000; --n-ink: #1a1a1a; --charcoal: #37352f;
  --slate: #5d5b54; --steel: #787671; --stone: #a4a097; --on-dark: #fff;
  /* Pastel tints: tag and card backgrounds only */
  --tint-sky: #dcecfa; --tint-rose: #fde0ec; --tint-mint: #d9f3e1;
  --tint-lavender: #e6e0f5; --tint-peach: #ffe8d4;
  --tint-yellow: #fef7d6; --tint-yellow-bold: #f9e79f; --tag-gray: #f0eeec;
  /* Text on tints (deep shade of the same hue, AA on its tint) */
  --on-peach: #793400; --on-mint: #1a5c2b; --on-lavender: #391c57;
  --link: #0075de; --green: #1aae39;
  /* Depth */
  --sh-2: 0 4px 12px rgba(15,15,15,.08);        /* hover lift */
  --sh-3: 0 24px 48px -8px rgba(15,15,15,.20);  /* one hero mockup only */
  --sans: "Inter", -apple-system, system-ui, "Segoe UI", Helvetica, sans-serif;
}
```

Type scale (weight 600 headings, 500 buttons, 400 body, letter-spacing 0):

| Use | Size / line-height |
| :---- | :---- |
| H1 (hero) | clamp(32px, 2.8vw, 40px) / 1.3 |
| H2 (section) | 32px / 1.2 (26px under 1000px) |
| Card title | 20–22px / 1.3 |
| Lead | 18px / 1.7, `--slate` |
| Body | 16px / 1.55 |
| Small / tags / buttons | 14px |
| Eyebrow | 600 12px / 1.4, uppercase, .8px tracking, `--steel` |

Shape: 8px for buttons, tags, chips and tabs. 12px for cards. Pills only for status dots. Space: 8px grid. Section gap 64px, heading-to-content 32px, max-width 1280px, gutter 32px (20px on phones).

## 2\. Components

```css
.btn { display:inline-flex; align-items:center; gap:8px; min-height:44px; padding:10px 18px;
  border-radius:8px; border:1px solid var(--hairline-strong); background:var(--canvas);
  font:500 14px/1.3 var(--sans); color:var(--n-ink); transition:background-color .15s ease; }
.btn:hover { background:var(--n-surface); }
.btn-ink { background:var(--ink-deep); border-color:var(--ink-deep); color:var(--on-dark); }

.card { background:var(--canvas); border:1px solid var(--hairline); border-radius:12px; }
.card:hover { border-color:var(--hairline-strong); box-shadow:var(--sh-2); }

.tag { display:inline-block; padding:3px 10px; border-radius:8px; font:600 14px/1.4 var(--sans);
  background:var(--tag-gray); color:var(--charcoal); }
.tag-b2b  { background:var(--tint-peach);    color:var(--on-peach); }
.tag-b2c  { background:var(--tint-mint);     color:var(--on-mint); }
.tag-role { background:var(--tint-lavender); color:var(--on-lavender); }

/* Notion text highlight: one phrase in the H1 only */
.hl { padding:0 .18em; border-radius:4px; background:var(--tint-yellow);
  box-decoration-break:clone; -webkit-box-decoration-break:clone; }
/* Marker underline for result numbers */
.num { background:linear-gradient(transparent 62%, var(--tint-yellow-bold) 62%); font-weight:600; }

.eyebrow { font:600 12px/1.4 var(--sans); letter-spacing:.8px; text-transform:uppercase; color:var(--steel); }

/* Work cards rotate tints so neighbours never match */
.feat:nth-child(5n+1){--tint:var(--tint-sky)} .feat:nth-child(5n+2){--tint:var(--tint-lavender)}
.feat:nth-child(5n+3){--tint:var(--tint-peach)} .feat:nth-child(5n+4){--tint:var(--tint-mint)}
.feat:nth-child(5n+5){--tint:var(--tint-rose)}
.feat-shot { background:var(--tint); border-radius:12px; }
```

Each colour has one job. Keep it that way:

- **Yellow**: the H1 highlight and the result numbers. Nothing else.  
- **Peach \= B2B, mint \= B2C, lavender \= job title**, the same everywhere on the site.  
- **Black button** is the one primary action per screen. Everything else is outlined.  
- **Blue** is for inline text links only.

## 3\. Homepage skeleton

In this order. The first screen alone has to answer "who, what level, what results".

1. **Hero card** (white card, 12px, on a photo or `--n-surface` band): name, H1 with one `.hl` phrase, 18px lead with role \+ years \+ domain, tags (role, B2B/B2C, years), two buttons (black "View résumé", outlined "Email"), availability line with a green dot. Logo wall of past companies along the card's foot on `--n-surface`.  
2. **Results strip**: 3–5 cards in one row (swipe row under 1280px). Each card has a market tag, company, a `.num` figure, a 3-line summary and one link to its case study.  
3. **Selected work**: eyebrow \+ H2 \+ filter tabs (All / B2B / B2C). Cards are text on the left and a tinted screenshot on the right. Each shows market tag · company · dates, title, role, one stat, Problem / What I did, and "Read case study".  
4. **Experience**: one card per role (logo, title, dates, 2–3 outcome lines).  
5. **Recommendations**: real quotes with name, title and relationship.  
6. **Footer**: email, LinkedIn, résumé PDF.

On phones the hero card comes first, the photo shrinks to a band, and every touch target is at least 44px.

## 4\. Case-study skeleton

A reviewer with two minutes reads only blocks 1–3, so they must stand alone.

1. Back link, then the hero: eyebrow tag, H1 stating the outcome, 1–2 lead lines, chips (discipline \+ headline metric).  
2. Meta row: Role · Company · Scope · Timeline.  
3. **At a glance** (4 lines): Problem, My role, What I did, Outcome.  
4. **Decisions**: the 2–3 that mattered, each with the alternative it beat.  
5. Problem → research → what was built → flows (collapsible if long) → states → outcome → learnings.  
6. Failure boxes always pair the gap with its fix. Close with a "Next case" link.

## 5\. Copy rules

- Role, constraint and outcome readable in 10 seconds. Lead with what shipped and what changed.  
- Every number has a source (the résumé or the case itself). Targets are labelled targets. Work that didn't ship says "proposed, not shipped".  
- Headings state the point, not the topic: "Setup fell from 20 minutes to under 2", not "Outcome".  
- Sentence case. First person for your own work, "we" for team calls.  
- Plain verbs. Never "leverage", "seamless", "robust", "delve", "showcase". No em dashes.  
- Bold one phrase per paragraph at most.

## 6\. Build rules

- Tokens only in pages: no raw hex, no one-off shadows, no new radius.  
- Real screenshots in `.webp` with width, height, `loading="lazy"` and alt text that describes the screen.  
- Self-host Inter (woff2, `font-display: swap`).  
- Visible `:focus-visible` outline (2px `--n-ink`). Body text AA contrast; `--stone` is for disabled/placeholder only.  
- Check at 1280px and 390px before calling it done.

## Don't

- Copy Notion's logo, illustrations, purple CTA or copy. Use the language, not the brand.  
- Use pill-shaped buttons, heavy shadows on flat cards, or more than one `--sh-3`.  
- Let a tint do two jobs (e.g. peach for both B2B and "new").  
- Use someone else's case studies, numbers, photos or quotes. Fill every slot with your own.

Full Notion token reference (optional): `awesome-design-md/references/notion.md` from github.com/voltagent/awesome-design-md (MIT).