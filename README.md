# Portfolio / engineering resume — static site

A single-page portfolio in the style of
`https://dvurechensky.github.io/Dvurechensky/` — dark, glassmorphic, gold + cyan
accents, sticky pill navigation, scroll progress bar, cursor spotlight and
reveal-on-scroll.

No build step, no framework, no dependencies to install. Plain HTML, CSS and
JavaScript, so it deploys anywhere that serves files — including GitHub Pages.

```
index.html                 page shell (structure and sections)
assets/css/style.css       design system: tokens, layout, components, responsive
assets/js/app.js           renders content and wires up the interactions
assets/data/profile.js     ALL the content — this is the file you edit
assets/img/                favicon and avatar placeholders
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
| `hero.chips` | Technology pills under the headline |
| `hero.stats` | The "career at a glance" numbers |
| `profile` | Intro paragraphs and bullet list |
| `contacts` | Contact cards (email, GitHub, ORCID, …) |
| `value` | "Value for an employer" cards |
| `achievements` | Achievement groups |
| `experience` | Timeline entries, with optional `tags` |
| `projects` | Project cards; `category` drives the filter buttons |
| `stack` | Technology groups |

Two things worth knowing:

- **The project filters are generated from the data.** Add a new `category` to a
  project and its filter button appears automatically; remove the last project in
  a category and the button disappears. There is no separate list to keep in sync.
- **Text is treated as text.** A small whitelist (`<strong>`, `<em>`, `<code>`,
  `<br>`, `<a href>`) is allowed inside `profile`, `achievements` and
  `projects[].proves` so you can emphasise a word. Anything else — including
  `<script>`, `<img>` and inline `on*` handlers — is stripped rather than
  executed, so a stray tag in the data file cannot break or hijack the page.

To change the accent colours, edit the tokens at the top of
`assets/css/style.css` (`--gold`, `--cyan`, `--blue`, `--green`). The light theme
is a separate token block under `html[data-theme='light']`. Dark is the default;
the toggle in the top bar switches to light and remembers the choice.

Replace `assets/img/avatar.svg` and `assets/img/favicon.svg` with your own images
(keep the same filenames, or update the two `<link>`/`<meta>` tags in
`index.html`).

## Deploy to GitHub Pages

1. Create a repository and push these files to the default branch.
2. In **Settings → Pages**, set the source to that branch and the `/` root.
3. The site appears at `https://<user>.github.io/<repo>/`.

All paths in `index.html` are relative, so it works both at a domain root and in
a repository subfolder without changes.

## Notes on behaviour and accessibility

- Respects `prefers-reduced-motion`: all animation is disabled for users who ask
  for it.
- Works without JavaScript — a `<noscript>` block shows the name and contact
  links instead of an empty page.
- Keyboard accessible: visible focus rings, a skip link, and the theme toggle is
  a real `<button>` with an accessible label.
- Prints cleanly: chrome, filters and decorative layers are hidden, and content
  is switched to dark-on-white.
- No tracking, no cookies, no external requests beyond the Google Fonts
  stylesheet. Remove that `<link>` if you would rather self-host the fonts.

## Tests

The page logic is covered by a DOM test suite (rendering, filtering, empty state,
XSS sanitising, theme persistence) plus a real-browser audit that checks for
console errors, horizontal overflow and broken scroll behaviour at desktop,
tablet and mobile widths.
