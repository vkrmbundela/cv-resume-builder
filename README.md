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
- Settings search bar, pinned favorite controls, inline tips, and recommended-default badges
- Diagnostics panel with page-budget and bullet-quality hints
- Pre-export checklist panel (page fit, date quality, links, bullet length, contact completeness)
- One-click date normalization and a short clear-data undo safety window
- Legal-safe defaults (neutral default logo, non-affiliation language)

## How To Use (Detailed)

1. Open [index.html](index.html) in your browser.
2. Fill `Basic Info` first (name, roll number, degree, department, institute, phone, email, links).
3. In `Controls`, configure image upload/reset, image width/height, shape, fit, header name alignment, line spacing, and font.
4. In `Basic Info`, choose `Social Link Display` (`Text hyperlinks`, `Logos only`, or `Logos + text`) and `Contact Link Spacing` (`Compact`, `Balanced`, `Relaxed`).
5. Fill sections in priority order: `Education`, `Experience`, `Projects`, `Technical Skills`, `Achievements`, `POR`, `Key Courses`, and `Extracurriculars`.
6. Use `+ Add`, `Up/Down`, and `Remove` to curate entries; write metric-backed bullets (action + scope + result).
7. Use quick actions in `Controls` for `Backup JSON`, `Restore JSON`, `Save Restore Point`, and `Export Readiness Report` before major edits.
8. Open `Settings` for advanced controls and apply them intentionally (see guide below).
9. Use the Settings search field to jump to controls quickly and pin frequent controls with the star icon.
10. Review diagnostics plus the pre-export checklist for page-budget, date consistency, link quality, and content warnings.
11. Use `Normalize All Dates` if your date formats are mixed.
12. Export using `Download / Print PDF` (`Export PDF`, `Print`, `Export DOC`) and verify final margins/spacing.
13. Use `Copy LaTeX` when you need Overleaf or local LaTeX editing.

## Settings Feature Guide

1. `Legal Acknowledgement`: confirms responsibility for factual claims and authorized logo/trademark usage.
2. `Advanced Controls`:
   Use the search bar to find controls by keyword and star frequently used controls to pin them at the top.
   Tooltips (`?`) explain what each toggle does and when to use it.
   Use the mini before/after preview to see ATS + density impact before applying.
   `Template Pack` applies profile-oriented defaults.
   `Role Preset` updates section emphasis/order.
   `Export Preset` adjusts final output style.
   `Density Preset` sets global compactness.
   `Print Profile` switches ATS-safe/visual/publication behavior.
   `Target Pages` changes diagnostics page budget.
   Toggles: `ATS Safe Mode`, `Strict Print Calibration`, `Strict Link Validation`, `Enable Content Coach + Grammar Lint`.
3. `Add / Remove Sections`: show/hide sections that should appear in final CV.
4. `Section Density`: set each section to `Normal`, `Compact`, or `Tight`.
5. `Custom Section Order`: move sections up/down and see preview order update instantly.
6. `Variant Snapshots`: save named variants, then load or delete them safely.
7. `Version Compare`: compare current CV with saved snapshot/variant and preview change impact before switching.
8. `Data Management`:
   `Backup JSON` for cross-device transfer.
   `Restore JSON` to import previous backup.
   `Normalize All Dates` to standardize date ranges automatically.
   `Save Restore Point` and `Load Restore Point` for rollback.
   `Export Readiness Report` for final checks.
   `Clear Local Data` for full local reset (use carefully; one-time recovery prompt appears after refresh).

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
- Mention the current app version and release date in the GitHub Release draft.

## Release Notes

- Draft release notes directly in the GitHub Release draft notes.
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

## Project Standards

- License: [LICENSE](LICENSE)
- Use Issues and PR descriptions to document changes, review context, and release decisions.

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
