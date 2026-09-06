# AICON

Non-custodial swap router on Robinhood Chain. Static site, no build step required.

- Live site: `index.html`
- Docs: `docs.html`
- GitHub: https://github.com/aiconhood
- Twitter/X: https://x.com/aicon_hood

## Structure

```
aicon-site/
├── index.html        landing page
├── docs.html          documentation
├── assets/
│   ├── logo.svg        original brand logo
│   └── style.css       shared design system (colors, type, layout)
└── README.md
```

## Deploy

This is a plain static site (no build step, no framework), so any static host works.

### Vercel
1. Push this folder to a GitHub repo (e.g. `aiconhood/aicon-site`).
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: "Other" / "Static". No build command needed, output directory: `.`
4. Deploy.

### Netlify
1. Push to GitHub.
2. Netlify → Add new site → Import from Git.
3. Build command: leave blank. Publish directory: `.`
4. Deploy.

### GitHub Pages
1. Push this folder to the repo, e.g. `aiconhood/aicon-site`.
2. Repo Settings → Pages → Source: `main` branch, root folder.
3. Site will be live at `https://aiconhood.github.io/aicon-site/`.

## Customizing

- Brand colors and type live in `assets/style.css` (`:root` variables at the top: `--bg`, `--lime`, `--olive`).
- Replace the placeholder stats (`—`) in `index.html` under `.stats-band` once real routing volume exists.
- Wire the "Launch App" buttons to the actual app route once the router frontend is live.
- Contract addresses and audit links go in `docs.html` under the "Smart contracts" section.

## Disclaimer

AICON is an independent third-party application built on Robinhood Chain. It is not affiliated with, endorsed by, or sponsored by Robinhood Markets, Inc.
