# Student Resume Builder

Simple open-source resume website positioned as an unofficial assistant for compliant resumes.
No backend, no database, no paid API dependencies.
You can open `index.html` directly in a browser and use it.

## Positioning

- Unofficial assistant for compliant resumes
- Not affiliated with or endorsed by any institute
- Users are responsible for factual accuracy and policy compliance

## What It Does

- Structured form-based resume editing
- Live PDF preview
- LaTeX source generation
- Browser-local autosave and recovery
- Variant snapshots (save/load/delete)
- Backup JSON / Restore JSON for moving data across devices
- Section toggles, role presets, ATS mode, and section density controls
- Diagnostics panel with page-budget and bullet-quality hints
- Legal-safe defaults (neutral default logo, non-affiliation language)

## How To Use (Simplest)

1. Open [index.html](index.html) in your browser.
2. Fill the form on the left.
3. Use print/download for PDF and copy button for LaTeX.

## Autosave and Recovery

- Your CV is cached in browser local storage automatically.
- If you close and reopen the page in the same browser, data is recovered.
- Use `Backup JSON` and `Restore JSON` to move data between browsers/devices.
- Use `Clear Local Data` if you want to reset everything on that browser.

## Input Validation

- Email, links, date ranges, year fields, and phone are validated.
- Invalid fields are highlighted in the editor.

## Keyboard Shortcuts

- `Ctrl/Cmd + S`: Save to local cache
- `Ctrl/Cmd + Shift + S`: Download backup JSON
- `Ctrl/Cmd + P`: Print / save PDF

## Optional Dev Mode

If you want local development tooling:

1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Open:
   `http://localhost:5173`

## Scripts

- `npm run dev`: Run local development server
- `npm run lint`: Type-check
- `npm run build`: Production build
- `npm run build:pages`: Production build for GitHub Pages (includes legal pages in `dist`)

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open repository settings and enable Pages with Source: GitHub Actions.
3. Push to `main` branch.
4. The workflow in [deploy-pages.yml](.github/workflows/deploy-pages.yml) will publish the static `dist` output.

## Release Packaging

- Add at least one UI screenshot and one short demo GIF before creating a public release.
- Suggested media location: `docs/media/`.
- Suggested filenames: `screenshot-home.png`, `demo-edit-export.gif`.
- Keep media under ~10 MB per file for faster GitHub loading.
- Mention the current app version and release date in the release notes file.

## Release Notes

- Draft release notes in [RELEASE_NOTES_v1.0.0.md](RELEASE_NOTES_v1.0.0.md).
- Tag and publish after checklist completion.

## Pre-Release Checklist

- Verify GitHub Actions workflow [deploy-pages.yml](.github/workflows/deploy-pages.yml) is passing on `main`.
- Test app in Chrome, Edge, and Firefox on desktop.
- Test responsive layout on a narrow/mobile viewport.
- Verify PDF, DOC, and LaTeX export flows.
- Verify backup/restore JSON and variant save/load/delete flows.
- Verify custom section order and preset switching behavior.
- Verify strict link validation catches malformed URLs.
- Verify clear-data action requires explicit confirmation.
- Verify [terms.html](terms.html) and [privacy.html](privacy.html) open correctly from footer.

## Open Source Project Standards

- License: [LICENSE](LICENSE)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Security Policy: [SECURITY.md](SECURITY.md)

## Privacy and Safety

- Resume content may include personal data.
- Data stays in browser local storage unless you explicitly export/share backup JSON.
- This app does not store CV data on a backend server.
- Do not commit real personal resumes or secrets.
- Do not commit secrets or API keys to the repository.
- Upload institutional logos only when you have permission to use them.

## Legal

- Terms: [terms.html](terms.html)
- Privacy Policy: [privacy.html](privacy.html)
- This project is not an official institute tool.
- Legal document version note: both legal pages currently list `Last updated: March 21, 2026`.

## Reference Folder Note

The `Reference/` folder contains imported external examples for analysis and inspiration.
It is not part of the production app runtime and should be treated as archival material.
