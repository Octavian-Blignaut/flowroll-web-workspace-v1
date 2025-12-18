## FlowRoll Supply – Static Site (GitHub Pages)

This repo hosts the FlowRoll Supply ecommerce landing page for GitHub Pages.

### Key files
- `index.html` — main site
- `404.html` — custom not-found page (GitHub Pages will serve it for unknown routes)
- `.nojekyll` — disables Jekyll processing so all assets are served as-is

### Run locally
Open `index.html` in a browser, or serve with a simple HTTP server:
```bash
python3 -m http.server 8000
```
Then visit http://localhost:8000

### Deploy to GitHub Pages
1) Create a repo on GitHub (e.g., `my-website`), then:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-website.git
git push -u origin main
```
2) On GitHub: Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)`.
3) Wait for Pages to build; your site will be live at the URL GitHub provides.

### Notes
- Keep `index.html` and `404.html` at the repo root for Pages.
- `.nojekyll` is required if you add folders or filenames that start with `_`.
- For updates: edit files, then `git add`, `git commit`, and `git push`.
# flowroll-web-workspace-v1
this repo is aimed as using git pages for flowRoll rashie store
