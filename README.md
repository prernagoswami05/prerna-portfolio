# Prerna Goswami — Personal Portfolio

Personal developer portfolio built with **pure HTML5, CSS3, and Vanilla JavaScript** — no Vite, React, TypeScript, build step, or backend server required.

## Static Folder Contents

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── Prerna_Goswami_Resume.pdf
    ├── 45-days-training.pdf
    ├── 45-days-training-preview.png
    ├── tutedude-uiux-certificate.pdf
    ├── tutedude-uiux-preview.png
    ├── codewithharry-web-development-certificate.pdf
    ├── codewithharry-web-development-preview.png
    ├── profile.jpeg
    ├── skillsync-dashboard.png
    ├── skillsync-assessment-engine.png
    ├── skillsync-assessment-interface.png
    ├── skillsync-company-suggestions.png
    ├── skillsync-performance-report.png
    ├── skillsync-placement-guide.png
    ├── skillsync-placement-mentor.png
    ├── skillsync-roadmap.png
    ├── skillsync-student-login.png
    ├── skillsync-student-profile.png
    └── skillsync-admin-login.png
```

---

## Deploying to Netlify

### Option 1: Netlify Drop (Fastest — No Git Required)
1. Download the `netlify-portfolio` folder (containing only `index.html`, `style.css`, `script.js`, `README.md`, and `assets/`).
2. Open [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `netlify-portfolio` folder onto the page to publish immediately.

### Option 2: Netlify via GitHub
1. Push the contents of `netlify-portfolio` (`index.html`, `style.css`, `script.js`, `README.md`, and `assets/`) to a GitHub repository.
2. In Netlify, click **Add new site** → **Import an existing project** → choose your repository.
3. Configure build settings:
   - **Build command**: *(leave blank)*
   - **Publish directory**: `.`
4. Click **Deploy site**.

---

## Deploying to Render (Static Site) or GitHub Pages

- **Render Static Site**: Connect the repository containing the static files above, leave **Build Command** blank, and set **Publish Directory** to `.`.
- **GitHub Pages**: Open repository **Settings** → **Pages** → **Deploy from a branch** → select `main` and `/ (root)` → **Save**.

---

## Local Preview (Without Build Tools)

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
