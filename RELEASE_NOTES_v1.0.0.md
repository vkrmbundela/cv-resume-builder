# Release Notes - v1.0.0

Release date: YYYY-MM-DD

## Summary

Initial public release of Student Resume Builder with local-first resume editing, preview, export, and compliance-focused controls.

## Highlights

- Static, local-first architecture (no backend required)
- Live resume preview with autosave
- PDF, DOC, and LaTeX export
- Section toggles, presets, density controls, and custom section ordering
- Strict link validation mode
- Backup/restore JSON and variant snapshots
- Neutral default logo with user-upload support and size controls
- Terms and Privacy pages included in Pages build output

## Deployment and Build

- GitHub Pages workflow: [deploy-pages.yml](.github/workflows/deploy-pages.yml)
- Pages build script: `npm run build:pages`
- Legal files copied into dist during Pages build

## Legal and Policy

- Terms: [terms.html](terms.html)
- Privacy: [privacy.html](privacy.html)
- Unofficial, non-endorsed tool
- User responsible for factual claim accuracy and trademark usage permissions

## QA Checklist

- [ ] Chrome desktop test complete
- [ ] Edge desktop test complete
- [ ] Firefox desktop test complete
- [ ] Mobile viewport responsive check complete
- [ ] File-open mode check complete
- [ ] GitHub Pages URL check complete
- [ ] PDF export verified on long resume
- [ ] DOC export verified
- [ ] LaTeX copy verified
- [ ] Backup/restore and variant operations verified
- [ ] Section reorder + presets + toggles verified together
- [ ] Terms/Privacy links verified from app footer

## Known Limitations

- PDF rendering may vary slightly across browsers and viewers
- Strict link validation can reject unconventional but technically routable hostnames

## Media

Add release media before publishing:

- docs/media/screenshot-home.png
- docs/media/demo-edit-export.gif
