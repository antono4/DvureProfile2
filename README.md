# Portfolio / engineering resume — static site

A single-page portfolio for Antono — dark, glassmorphic, gold + cyan accents,
sticky pill navigation, scroll progress bar, cursor spotlight, reveal-on-scroll
and a drifting rain-and-snow weather layer behind the content.

Content is based on `https://antono4.github.io/`. The visual style follows the
glassmorphic dark aesthetic of `dvurechensky.github.io`.

No build step, no framework, no dependencies to install. Plain HTML, CSS and
JavaScript, so it deploys anywhere that serves files — including GitHub Pages.

```
index.html                 page shell (structure, sections, decorative canvas)
assets/css/style.css       design system: tokens, layout, components, responsive
assets/css/fonts.css       @font-face rules for the self-hosted web fonts
assets/js/app.js           renders content and wires up the interactions
assets/data/profile.js     ALL the content — this is the file you edit
assets/img/                favicon and avatar placeholders
assets/fonts/              Inter + JetBrains Mono woff2 files (304 KB total)
```

## Run it locally

Open `index.html` directly, or serve the folder so relative paths behave exactly
as they will in production:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Make it yours

Everything you would normally want to change lives in **`assets/data/profile.js`**.
It is plain data — edit the text, add or remove array items, save, reload. The
page rebuilds itself from it.

| Key | What it controls |
| --- | --- |
| `hero.photo` | Hero portrait: `{ src, alt }` |
| `hero.chips` | Technology pills under the headline |
| `hero.stats` | The "career at a glance" numbers |
| `profile` | Intro paragraphs and bullet list |
| `contacts` | Contact cards (email, GitHub, ORCID, …) |
| `value` | Expertise cards; add `level` (0-100) for a proficiency bar and `tags` for pills |
| `credentials` | Education and certification cards (`kind`, `field`, `issuer`, `period`, `detail`, `seal`) |
| `experience` | Timeline entries, with optional `tags` |
| `projects` | Project cards; `category` drives the filter buttons, `note` is shown when `url` is absent |
| `stack` | Technology groups |

Two things worth knowing:

- **The project filters are generated from the data.** Add a new `category` to a
  project and its filter button appears automatically; remove the last project in
  a category and the button disappears. There is no separate list to keep in sync.
- **Text is treated as text.** A small whitelist (`<strong>`, `<em>`, `<code>`,
  `<br>`, `<a href>`) is allowed inside `profile`, `credentials` and
  `projects[].proves` so you can emphasise a word. Anything else — including
  `<script>`, `<img>` and inline `on*` handlers — is stripped rather than
  executed, so a stray tag in the data file cannot break or hijack the page.

To change the accent colours, edit the tokens at the top of
`assets/css/style.css`. There are three families, and the difference matters:

| Family | Tokens | Used for |
| --- | --- | --- |
| Accents | `--gold`, `--cyan`, `--blue`, `--green` | Borders, glows, bars and **text on the page background** |
| Ink | `--gold-ink`, `--cyan-ink` | Accent-coloured **text**; the lighter/darker partner of the accent above |
| Fills | `--fill-gold`, `--fill-cyan`, `--fill-blue` | **Backgrounds of chips that carry dark text** — the brand mark, credential seals and the top-bar buttons |

The light theme is a separate token block under `html[data-theme='light']`. It
redefines the accent and ink tokens, but deliberately **not** the `--fill-*`
tokens — that is the whole point of the third family. An accent dark enough to be
readable *on* white is too dark for dark text to sit *on top of*; using one there
drops contrast to roughly 3.5:1, below the 4.5:1 that WCAG AA asks for. Fills stay
saturated in both themes so their dark text stays legible. If you add a chip with
dark text on it, reach for a `--fill-*` token, never `--gold` or `--cyan` directly.

Dark is the default; the toggle in the top bar switches to light and remembers the
choice.

### Top-bar buttons

The top bar carries two pill buttons next to the theme toggle. Both are plain
`<a>` elements using the `gh-btn` class for shape, spacing and responsive
behaviour; the second adds `profile-btn`, which only recolours it.

| Button | Class | Links to |
| --- | --- | --- |
| AntonoProfile | `gh-btn profile-btn` | `https://antono4.github.io/AntonoProfile` |
| GitHub | `gh-btn` | `https://github.com/antono4` |

Edit the `href` values directly in `index.html`. Below 860px the labels are hidden
and only the icons remain, so the bar still fits on a phone.

### Images

| File | Used for |
| --- | --- |
| `assets/img/avatar.jpg` | Hero portrait (square, shown as a circle) |
| `assets/img/og-cover.jpg` | Social preview when the link is shared (1200x630) |
| `assets/img/favicon.svg` | Browser tab icon |

Replace them with your own, keeping the filenames. If you deploy to a different
URL, update the `canonical`, `og:url`, `og:image` and `twitter:image` tags near
the top of `index.html` — social crawlers require **absolute** URLs, and the
preview image must be PNG or JPEG (an SVG will not render).

## Deploy to GitHub Pages

1. Create a repository and push these files to the default branch.
2. In **Settings → Pages**, set the source to that branch and the `/` root.
3. The site appears at `https://<user>.github.io/<repo>/`.

All paths in `index.html` are relative, so it works both at a domain root and in
a repository subfolder without changes.

## The weather layer

`index.html` contains one decorative element: `<canvas class="weather">`, painted
by the `weather()` function in `assets/js/app.js`. It draws a light rain of cyan
streaks plus a few drifting gold snowflakes. Each particle has a `depth` used for
parallax, so nearer ones are longer, faster and brighter than distant ones.

It is built to stay cheap and never get in the way:

- **Behind everything.** The canvas is `position: fixed; z-index: -1`, above the
  grid and gradient washes (which sit at `-3` and `-2`) but below all content, and
  it has `pointer-events: none` so it cannot intercept a click.
- **Capped work.** Particle counts scale with viewport area but top out at 150
  drops and 46 flakes, and `devicePixelRatio` is capped at 2, so a 4K display does
  not pay several times the cost of a phone.
- **Pauses when unseen.** The animation stops on `visibilitychange` while the tab
  is hidden and resumes when it returns.
- **Skipped under `prefers-reduced-motion: reduce`.** The canvas then stays empty
  rather than animating.
- **Theme aware.** Particle opacity drops in the light theme so the effect does not
  muddy the white background.

To remove it, delete the `<canvas>` element and the `weather()` call in the boot
section of `app.js`. Nothing else depends on it.

## Notes on behaviour and accessibility

- Respects `prefers-reduced-motion`: all animation is disabled for users who ask
  for it.
- Works without JavaScript — a `<noscript>` block shows the name and contact
  links instead of an empty page.
- Keyboard accessible: visible focus rings, a skip link, and the theme toggle is
  a real `<button>` with an accessible label.
- **Download CV** triggers the browser's print dialog; choosing "Save as PDF"
  produces a clean, roughly seven-page CV. The print stylesheet switches to
  dark-on-white, hides the chrome, filters, tech pills and counters, keeps job
  and credential entries from splitting across pages, and appends the URL after
  every link so a printed copy stays usable.

  Note the `@media print` rule that forces `.reveal` to `opacity: 1`. Scroll
  animations start elements invisible and JavaScript reveals them on scroll, so
  without that override everything below the fold prints as a blank page.
- No tracking, no cookies, and no external requests at all: the Inter and
  JetBrains Mono web fonts are self-hosted under `assets/fonts/` and declared in
  `assets/css/fonts.css`. The page works fully offline.

## Tests

The page is covered by ten suites, all of which must pass:

| Suite | Covers |
| --- | --- |
| `data` | Content integrity — every entry in `profile.js` renders, no gaps |
| `validate` | HTML structure, CSS parsing, and that every referenced asset exists |
| `test` | DOM logic — rendering, filtering, empty state, XSS sanitising, theme persistence |
| `browser` | Real-browser audit at desktop, tablet and mobile widths |
| `a11y` | Contrast in **both** themes, reduced motion, reflow at 200% zoom, skip link |
| `links` | Every external URL and `mailto` resolves |
| `perf` | Page weight, request count, script placement and first paint |
| `print` | The printed CV: no blank pages, dark-on-white, chrome hidden |
| `edge` | Filters, theme persistence, scroll spy, overflow 320–1920px, tap targets |
| `verify_contrast` | The specific contrast fixes, in both themes |

Two testing notes worth keeping, because both cost real time to learn:

- **Measure contrast from painted pixels, not computed styles.** Computed colours
  lie about translucent panels and gradients. The reliable method is to screenshot
  an element twice — once normally, once with `color: transparent` — and compare
  each changed pixel against *the same pixel* of the text-free render, which is its
  true local background. Score the ~20th percentile of those ratios: the single
  worst pixel is always an antialiased glyph edge, and it always "fails".
- **Scroll state breaks screenshot tooling.** This page sets
  `html { scroll-behavior: smooth }` and `body { overflow: hidden auto }`, so
  `scrollIntoView` is asynchronous and `body` — not the document — is the scroller.
  Either force `scrollBehavior = 'auto'` and assign
  `document.scrollingElement.scrollTop`, or size the viewport to the full document
  height so nothing scrolls at all.

The test scripts are not committed; they live in a scratch directory while
developing.
