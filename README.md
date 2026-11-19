# DASIRO (다시로)

**Every space has a next chapter.**

A mobile-first, English-language startup competition prototype for coordinating commercial business transitions in Jeonju, South Korea. React + Vite + TypeScript, Tailwind CSS, Lucide, and Framer Motion. No database, backend, authentication, paid API, or runtime AI service.

## Run locally

Use Node.js 22.12 or newer.

```powershell
npm install
npm run dev
```

Open the Local URL printed by Vite (normally `http://127.0.0.1:5173/dasiro/`). Keep the terminal running while presenting.

```powershell
npm test
npm run build
npm run preview
```

`npm run build` checks TypeScript and creates the deployable `dist` folder. `npm test` checks matching determinism, score limits, date/budget/location effects, and financial formula totals, including a case where coordination costs more.

To test on a phone connected to the same Wi-Fi, run `npm run dev -- --host 0.0.0.0` and open your computer's LAN address at port 5173 with `/dasiro/` after it. For competition QR codes, use a publicly deployed HTTPS URL instead of a localhost or LAN address.

## Pages and interactions

- `/dasiro/#/` — editorial homepage with interactive match preview.
- `/dasiro/#/explore` — 8 fictional listings, business/rent/size/neighborhood filters, sorting, saved spaces.
- `/dasiro/#/spaces/gaeksa-cafe` — property details; each listing has its own route and photo gallery.
- `/dasiro/#/match` — five business types, budget slider, location and date; three ranked matches, reuse needs, renovation considerations, and expandable score explanations.
- `/dasiro/#/transition` — editable assumptions, side-by-side totals, and transparent calculations.
- `/dasiro/#/transfer` — three-step confidential demo, equipment choices, preview, and local draft save.
- `/dasiro/#/how-it-works` — concept and handover explanation.

Hash-based routing makes deep links work on static hosting without a server or custom rewrites. Saved property IDs use browser local storage. The transfer draft is stored only when you choose **Save Demo Draft**, in that browser tab's session storage. Forms make no network submissions. Font files and photographs are served locally.

## GitHub Pages: prepared, not published

The default Vite base is **`/dasiro/`**, for a GitHub repository named **`dasiro`**. All existing visual design, content, property data, images, and fonts are retained. The workflow in `.github/workflows/deploy-pages.yml` installs locked dependencies with `npm ci`, runs the existing tests, builds `dist`, and deploys it using the official GitHub Pages Actions. It runs on pushes to **`main`**, or manually from the Actions tab when `main` is selected. The Node version comes from `.nvmrc`. No personal access token, API key, database, or hosting secret is required.

No repository upload, push, Pages-setting change, or deployment has been performed. **Uploading this workflow to `main` enables its push trigger; completing the steps below is the publication step.**

### Exact next steps when you are ready to publish

1. On GitHub, create an **empty public repository** named exactly **`dasiro`**. Leave the README, license, and `.gitignore` initialization boxes unchecked because the local project already has its files. Public repositories can use GitHub Pages on GitHub Free.
2. Ensure GitHub Actions is enabled for the repository. In the repository's **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**, not a branch or `/docs` folder. If Pages settings are not available until the repository has content, push the files first, choose this setting, then manually rerun the workflow.
3. Open PowerShell in this project folder. Replace `YOUR-GITHUB-USERNAME` in the following commands with your actual GitHub username:

   ```powershell
   git add .
   git commit -m "Prepare DASIRO for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/dasiro.git
   git push -u origin main
   ```

   The workspace is already a Git repository, so `git init` is not needed. If Git asks for your commit identity, set `user.name` and `user.email` to your own Git identity and repeat the commit. If an `origin` remote already exists, inspect it with `git remote -v` and use the correct existing remote rather than adding it again. Do not commit `node_modules`, `dist`, or `qa`; `.gitignore` excludes them. Include `.github/workflows/deploy-pages.yml`, `package-lock.json`, all source files, and the complete `public` folder.
4. In the repository's **Actions** tab, open **Deploy DASIRO to GitHub Pages** and wait for the deployment to succeed. If the initial run happened before Pages was configured, choose **Run workflow**, select **main**, and run it again after setting the Pages source.
5. Open **`https://YOUR-GITHUB-USERNAME.github.io/dasiro/`**. This is the expected address format, not an already-published URL. Test **`https://YOUR-GITHUB-USERNAME.github.io/dasiro/#/match`** and refresh it. Keep the `#` in internal page links; `/dasiro/match` is not the routing format for this app.
6. For later updates, commit your changes and push to `main`; the same workflow automatically rebuilds and deploys the site. No `gh-pages` branch or manual `dist` upload is needed.

The setup follows [Vite's GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages) and [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Preview the exact GitHub Pages build locally

```powershell
npm run build
npm run preview
```

Open **`http://127.0.0.1:4173/dasiro/`** (or the port Vite prints). Deep links look like **`http://127.0.0.1:4173/dasiro/#/spaces/gaeksa-cafe`**. Refreshing these URLs requests `/dasiro/` from the static host, and `HashRouter` opens the selected page in the browser. Vite rewrites the CSS/font, script, and favicon references; runtime image URLs and responsive `srcSet` variants use `import.meta.env.BASE_URL`.

## Deploy publicly with Vercel

The instructions below are retained for alternative hosting. Since the project now defaults to `/dasiro/` for GitHub Pages, use **`npm run build -- --base=/`** as the build command on Vercel or Netlify if the site should live at the root of those hosts. The base override also applies to photographs and fonts.

1. Push this project to a Git repository.
2. In Vercel, add a new project and import the repository.
3. Use the **Vite** framework preset, **`npm run build`** as the build command, and **`dist`** as the output directory. No environment variables are needed.
4. Deploy, then open the assigned production HTTPS URL.
5. Test that URL on a phone and in a signed-out/incognito browser. The judges must be able to visit without signing in; check the project's deployment-protection settings before the competition.

The deployment instructions follow [Vercel's Vite documentation](https://vercel.com/docs/frameworks/frontend/vite). This project is prepared locally; no public deployment or account has been created.

For Netlify, import the repository with build command `npm run build` and publish directory `dist`; `netlify.toml` contains these settings. See [Netlify's Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/).

## Make the competition QR code

After deployment, copy the production URL into your preferred QR-code generator. On GitHub Pages, point the code to `https://YOUR-GITHUB-USERNAME.github.io/dasiro/`, or `https://YOUR-GITHUB-USERNAME.github.io/dasiro/#/match` to open the interactive demo directly. On another host, append `#/match` to the homepage URL ending in `/`. Download an SVG or high-resolution PNG, place it in the presentation, and scan the final slide with more than one phone. Use the stable production domain so a later deployment does not invalidate the QR code.

## Design and assets

- Burgundy `#571F32`, Butter Yellow `#F5DE9B`, Warm Ivory `#F9F3EA`, Dusty Rose `#D3A9A7`, Dark Text `#292124`; translucent lines and secondary text derive from these colors.
- Self-hosted Instrument Serif (regular and italic), DM Sans (400–700), and Pretendard for Korean. Font licenses are in `public/fonts`.
- **10 original AI-generated architectural photographs** were created with the built-in image-generation tool for this concept. Eight distinct lead images illustrate the eight properties; two additional images support detail galleries. The final assets are in `public/assets`, with 1400px and 640px WebP variants. Mobile images are approximately 28–43 KB each.
- Photos are illustrative, not documentary images of actual Jeonju properties. Gallery views are design references and can show different conceptual spaces; this is disclosed in the UI.
- The exact generation prompts and original local source paths are recorded in `scripts/image-sources.json`. `scripts/prepare-assets.mjs` uses Sharp to create the optimized variants if those original generated PNGs are available. Normal builds use the checked-in WebP files and do not require originals or an image-generation API.

## Demo scoring and estimates

Matching is deterministic: business fit **30**, equipment overlap **25**, budget **25**, location **10**, and availability **10**. See `src/model.ts` and each result's **Why this score?** disclosure. It is not AI analysis or a professional feasibility assessment.

The illustrative setup budget is deposit + two months' rent + ₩15M fit-out + up to ₩20M of missing equipment, scaled by overlap. Transition costs use editable, simplified assumptions documented beside the comparison. Totals combine owner vacancy losses with incoming-operator preparation costs; they are not one party's expenses. Deposits, key money, taxes, transfer payments, professional fees, repairs, and operations are excluded from the transition comparison.

All listings, prices, dates, equipment, scores, and financial outcomes are fictional or hypothetical. DASIRO is not a licensed real-estate brokerage and offers no real transaction. Actual inspections, landlord agreements, property transfers, legal agreements, and regulated brokerage activities require appropriate licensed professionals.

## Main files

`src/App.tsx`: shared components and all page flows. `src/styles.css`: responsive design system. `src/model.ts`: preserved fictional listings and calculation logic. `src/main.tsx`: React entry and router. `public/assets`: optimized photography. `public/fonts`: self-hosted typography. `tests/model.test.ts`: calculation and scoring checks.
