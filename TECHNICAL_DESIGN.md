# IITH Resume Builder - Technical Design Document

## 1. Architecture Overview

Client-only static web application:

- React + TypeScript + Vite
- Tailwind for styling
- @react-pdf/renderer for generated document preview/download
- Local LaTeX generation service
- No backend API
- No paid AI integrations

## 2. Runtime Flow

1. User edits structured form fields.
2. App stores data in React state.
3. Debounced state drives:
   - live PDF document rendering
   - LaTeX string generation
4. User exports PDF or copies LaTeX.

## 3. Data Model

The app uses a typed ResumeData model from src/types.ts with sections:
- Header fields: name, degree, department, institute, phone, email, links
- education[]
- experience[]
- publications[]
- projects[]
- skills[]
- achievements[]
- por[]

## 4. Component Design

- src/App.tsx
  - App shell, mode switching (edit/preview/latex), export actions
- src/components/ResumeForm.tsx
  - Structured section editors with add/remove behavior
- src/components/ResumePDF.tsx
  - PDF document composition layer
- src/components/PDFViewerComponent.tsx
  - In-app preview with pagination and zoom controls
- src/services/latexService.ts
  - Deterministic LaTeX source generator

## 5. State and Persistence

Current state source:
- In-memory React state

Recommended next addition:
- localStorage autosave with versioned schema key
- safe fallback to initial state on parse failure

## 6. Export Design

### PDF Export
- Uses @react-pdf/renderer document tree
- Download action uses generated blob URL

### LaTeX Export
- Escapes special characters
- Produces portable template without hard dependency on local image assets
- Normalizes profile links to avoid malformed URLs

## 7. Build and Deployment

- Dev: npm run dev (Vite)
- Build: npm run build
- Static output: dist/
- GitHub Pages compatible (relative asset base configured)

## 8. Reliability Notes

- Use bundled pdf.js worker instead of CDN worker to avoid runtime CDN failures
- Avoid hardcoded dev port assumptions; allow Vite to select available port
- Keep app independent from external APIs for predictable operation

## 9. Security and Privacy

- No API keys required for core functionality
- No backend data storage
- Resume content remains in browser context unless user exports data manually

## 10. Future Engineering Roadmap

1. Add local autosave + reset + sample profile data
2. Add section show/hide and ordering controls
3. Add formatting control panel (spacing/layout density) inspired by IITG workflow
4. Add basic automated tests for form->preview->export flow
