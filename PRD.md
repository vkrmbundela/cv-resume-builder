# IITH Resume Builder - Product Requirements Document (PRD)

## 1. Executive Summary

IITH Resume Builder is a free, open-source, manual resume builder for IIT Hyderabad students.
Users fill a structured form, view a live PDF preview, download a final PDF, and copy LaTeX source.

This product is intentionally local-first and does not depend on paid AI services.

## 2. Problem Statement

Students often struggle with:
- Inconsistent formatting across resumes
- Slow manual formatting in Word/LaTeX
- High friction when adapting to institute-style templates

We solve this with a structured editor that enforces format consistency and gives immediate visual feedback.

## 3. Product Goals

1. Fast resume creation in under 10 minutes for first-time users
2. Consistent IITH-style output from structured data
3. Fully functional offline-friendly local workflow (form + preview + export)
4. Zero paid external dependencies

## 4. Core User Stories

1. As a student, I can enter my resume details section by section.
2. As a student, I can see a live preview while editing.
3. As a student, I can download my resume as PDF.
4. As a student, I can copy LaTeX code and compile in Overleaf.
5. As a student, I can hide optional sections and reorder content.

## 5. Feature Scope (Current + Near-Term)

### Current
- Structured form editing
- Dynamic entries (education, experience, projects, skills)
- Live PDF preview
- PDF download
- LaTeX generation and copy

### Near-Term
- Section show/hide toggles
- Section ordering controls
- Local autosave and restore
- Validation hints for key fields (email, links, required entries)
- Resume density controls (spacing/margins)

## 6. Out of Scope

- AI extraction
- AI content enhancement
- Paid API integrations
- Server-side user data storage

## 7. Non-Functional Requirements

- Startup: under 2 seconds on modern laptop
- Preview updates: responsive under normal typing
- Browser support: modern Chrome/Edge/Firefox/Safari
- Accessibility: keyboard-friendly controls and meaningful labels
- Privacy: all editing data remains local to the browser session unless user exports

## 8. UX Direction

The preferred interaction style is inspired by the IITG editor workflow:
- low-friction editing
- quick format controls
- immediate visual feedback

Implementation remains React + TypeScript with structured state (no contenteditable-first architecture).

## 9. Success Metrics

- >90% users can generate first usable resume in one session
- Minimal formatting deviations from intended template
- Low bug rate in export flow (PDF + LaTeX)

## 10. Release Priorities

### Phase 1
- Stabilize core editing and export flow
- Add autosave + reset + sample data

### Phase 2
- Add section visibility and ordering controls
- Improve preview/layout customization controls

### Phase 3
- Multiple templates (IITH student resume, optional academic CV variant)
