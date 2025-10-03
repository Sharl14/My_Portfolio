# Portfolio — Sharlene Pillay

This is a minimal, responsive portfolio template. It is plain HTML/CSS/JS so you can edit it quickly.

Files created:

- `index.html` — main page
- `css/styles.css` — styles
- `js/script.js` — small UI script + demo projects
- `package.json` — convenience script to run a static server

How to run (quick):

Option A — Open locally

- Open `index.html` in your browser (double-click or use VS Code Live Server).

Option B — Run a local static server (PowerShell):

```powershell
# from project root
npx http-server . -p 3000 -c-1
# then open http://localhost:3000
```

Option C — Use npm script

```powershell
npm install -g http-server # optional to install globally
npm run start
```

What I can do next (pick any):

- Customize text, bio, skills and add your real contact email
- Add real project cards with images and links
- Add a resume download and a contact form (Netlify/Forms or server endpoint)
- Deploy to GitHub Pages or Netlify and I can prepare the steps

Tell me which name, email, projects (titles + descriptions + links) and color preferences you want and I’ll customize the site for you.

## Hosting / deploy options

Below are three easy ways to publish this static portfolio.

1. GitHub Pages (automatic via Actions)

- This repo includes a GitHub Actions workflow at `.github/workflows/deploy-gh-pages.yml` that will deploy the repository root to the branch `gh-pages` whenever you push to `main`.
- To enable: push your code to GitHub. The action will run and create/update the `gh-pages` branch. Then in your repository Settings → Pages, set the site source to the `gh-pages` branch and the root folder. The site will be available at `https://<your-username>.github.io/<repo-name>/`.

2. Netlify (recommended for static sites)

- There's a `netlify.toml` included which tells Netlify to publish the repository root. To deploy:
  - Connect the repository in Netlify (Site → New site → Import from Git).
  - Choose this repo, use the default settings (build command empty, publish directory `.`) and trigger a deploy.

3. Vercel (zero-config for static frontends)

- Import the repository in Vercel (vercel.com). Vercel detects static sites and will publish to a `vercel.app` URL.

### Local preview

You can continue to preview locally with the npm script:

```powershell
npm run start
# then open http://localhost:3000
```

Notes

- If you prefer GitHub Pages without Actions, you can enable Pages to serve from the `main` branch directly, but Actions + `gh-pages` gives cleaner deploys.
- The contact form currently uses Formspree and requires replacing `YOUR_FORM_ID` in `index.html` to collect submissions. Alternatively, use Netlify Forms if you deploy to Netlify.
