# Business Analyst Portfolio (static)
Plain HTML/CSS/JS. No npm, React or build step.

## Upload to GitHub
1. Create a new repository on GitHub.
2. Upload **all files** (drag and drop). `index.html` must be in the repository root.
3. Commit changes.

## GitHub Pages
Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save. Your site opens from `index.html`.

## Update your content
- **Almost everything** (name, title, bio, skills, experience, projects, resume path, contact, social links, Formspree endpoint): `assets/js/data.js`. Replace anything in `[SQUARE BRACKETS]`.
- **Images:** put them in `assets/images/` (`profile.jpg`, `project-01.jpg` … `project-04.jpg`). Missing project images show a neutral placeholder.
- **Resume / project PDFs:** put in `assets/documents/` and match the file name in `data.js`.
- **Add a project:** copy one project block in `data.js` and edit it.
- **Colours:** CSS variables at the top of `assets/css/style.css`. **Fonts:** the `--font` variable.
- **Favicon:** replace `favicon.ico` in the root.
- **SEO tags:** top of `index.html`.
