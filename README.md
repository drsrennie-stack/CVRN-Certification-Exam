# ECG & CVRN Review Course — competency build, v0.2

**Target credential: ABCM CVRN-BC.** ANCC CV-BC is carried as a tagged secondary readiness lens, not a second build.

Prepared by Dr. Sharilyn Rennie. August 13, 2026.

## Files

| File | What it is |
|---|---|
| `CVRN-BC-Exam-Blueprint.pdf` | The blueprint document, MedMasters branding, primary palette. Per-level weight tables, the ANCC crosswalk, the failure pattern, and the architecture summary. |
| `cvrn-competency-framework.md` | Full human-readable spec. 14 domains, 78 competencies, 311 objectives, DOK tagging, mastery states, rollup and priority math, ANCC alignment. |
| `cvrn-competencies.js` | Machine-readable registry, same shape as `competencies.js` in the mastery-os repo so it drops in. Adds `objectives[]`, `weightL1`, `weightL2`, `anccPrimary`, `anccAlso`, `weightSource`. |
| `cvrn-exam-bank.js` | Reserved practice-exam pool. 60 items authored. Kept out of the recall decks on purpose. |
| `cvrn-mastery-os.html` | The course shell. Setup and pacing, gap finder, right-now queue, readiness dashboard, ten practice exam forms. Loads the two JS files. |
| `ecg-lab.html` | ECG Learning Lab. Live monitor with sweep, freeze and calipers, 12-lead pattern viewer, DOK 1 to 4 practice. Standalone. |
| `blueprint-pdf.html` | Print source for the PDF. Edit this, re-render with `render.js`. |
| `render.js` | Headless Chromium render script. `node render.js` |
| `compliance-notes.md` | WCAG 2.2 audit. Contrast table, keyboard flow, screen reader verification, known limitations. |

## Running it

Open `cvrn-mastery-os.html` in a browser. It needs `cvrn-competencies.js` and `cvrn-exam-bank.js` beside it. `ecg-lab.html` is standalone. No build, no server, no dependencies.

Progress is stored in `localStorage` under `cvrn-setup`, `cvrn-progress`, and `cvrn-exams`. The ECG lab writes to `cvrn-progress` under the ECG strand IDs, using the same contract as `recall-integration-spec.md` in the mastery-os repo, so the two stay in sync across tabs.

## What is done and what is not

**Done.** Competency architecture. Per-level ABCM weights plus ANCC secondary tagging. Pacing engine. Gap finder, two passes. Weakness priority engine. Dashboard with both a CVRN-BC readiness figure and an ANCC secondary read. Exam engine with quick-check and full-length modes and honest fill reporting. ECG monitor with freeze and calipers. 12-lead viewer with twelve patterns.

**Not done.** The reserved exam pool needs roughly 600 items to support ten honest quick checks plus two full-length forms; 60 are authored. Remaining ABCM category weights. The patient and community education strand, needed only if ANCC becomes a real target. Real de-identified tracings to replace the synthesized ones for high-stakes items.
