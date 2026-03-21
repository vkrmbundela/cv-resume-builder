# Contributing Guide

Thanks for helping improve IITH Resume Builder.

## Development Setup

1. Install dependencies:
   `npm install`
2. Start app:
   `npm run dev`
3. Type-check before opening PR:
   `npm run lint`

## Branch and PR Guidelines

- Create a feature branch from `main`.
- Keep PRs focused and small.
- Add clear PR descriptions with screenshots for UI changes.
- Mention any behavior changes to PDF/LaTeX outputs.

## Coding Standards

- Use TypeScript strict-compatible code.
- Preserve existing component structure and naming conventions.
- Avoid introducing client-side API key usage.
- Keep accessibility in mind for all form controls and buttons.

## Testing Expectations

At minimum, validate:
- Form editing for all sections
- PDF preview rendering
- LaTeX generation output

## Good First Issues

- UI polish and accessibility improvements
- Validation messages and helper text
- Documentation and onboarding
- Performance and bundle size improvements
