# Accessibility Compliance Notes

## 1. Project

**Project.** ECG & CVRN Review Course, competency framework and prototype tools.

**Files covered.**

- `ecg-lab.html` — ECG Learning Lab. Live monitor, freeze and caliper measurement, 12-lead viewer, DOK-tiered practice.
- `cvrn-mastery-os.html` — CVRN Mastery OS. Setup and pacing, gap finder, right-now queue, readiness dashboard, practice exams.
- `CVRN-CVBC-Exam-Blueprint.pdf` — blueprint document, MedMasters branding.
- `blueprint-pdf.html` — the print source for the PDF above.

**Date.** August 13, 2026.

**Reviewer.** Dr. Sharilyn Rennie.

---

## 2. WCAG version and target level

Target: WCAG 2.2 Level AA as the floor, Level AAA where achievable.

| Criterion | Level achieved | Note |
|-----------|---------------|------|
| 1.1.1 Non-text Content | AA | Every canvas carries `role="img"` and a descriptive `aria-label`. See section 6 for the known limitation. |
| 1.3.1 Info and Relationships | AA | Semantic sectioning, real tables with `th` scope by position, `dl` for measurement readouts, `label`/`for` on every input. |
| 1.4.3 Contrast (Minimum) | AA, mostly AAA | Full audit in section 3. |
| 1.4.6 Contrast (Enhanced) | AAA on 12 of 15 pairs | Three pairs land at AA. Listed in section 3. |
| 1.4.10 Reflow | AA | Grids collapse at 860px and 560px. No horizontal scrolling except wide data tables, which use a scoped scroll container. |
| 1.4.11 Non-text Contrast | AA | Borders, focus rings, and caliper markers all exceed 3:1 against their backgrounds. |
| 1.4.12 Text Spacing | AA | No fixed heights on text containers. |
| 2.1.1 Keyboard | AA | Every control reachable and operable. Calipers included, see section 4. |
| 2.4.1 Bypass Blocks | AA | Skip link on both applications. |
| 2.4.7 Focus Visible | AAA | 3px gold outline at 3px offset, global, not suppressed anywhere. |
| 2.5.8 Target Size (Minimum) | AA | All interactive controls at least 44px in the smaller dimension. Caliper handles are 26px wide by full screen height, which exceeds the minimum in the dimension that matters for dragging. |
| 3.3.2 Labels or Instructions | AA | Usage instruction paragraph on each tool; every field labelled. |
| 4.1.2 Name, Role, Value | AA | `aria-pressed` on all toggles, `aria-selected` and `aria-controls` on tabs, `aria-expanded` on the findings disclosure. |
| 4.1.3 Status Messages | AA | `aria-live="polite"` on the caliper readout and the practice measurement line. |
| 2.3.3 Animation from Interactions | AAA | `prefers-reduced-motion` stops the monitor sweep entirely and renders a static strip instead. Transitions reduced to 1ms globally. |

---

## 3. Color contrast audit

Computed ratios, WCAG 2.x relative luminance.

### Applications, oxblood theme

| Pair | Foreground | Background | Ratio | Result |
|------|-----------|-----------|-------|--------|
| Body text | `#FCEEF0` | `#1B060B` | 17.29 | AAA |
| Soft body text | `#E4C4CB` | `#1B060B` | 12.12 | AAA |
| Muted text on page | `#C0949E` | `#1B060B` | 7.40 | AAA |
| Gold accent numerals | `#E4BD68` | `#1B060B` | 10.93 | AAA |
| Terra eyebrow | `#E39684` | `#1B060B` | 8.32 | AAA |
| ECG trace on screen | `#FF8296` | `#120307` | 8.53 | AAA |
| Gold button label | `#141414` | `#C9A14A` | 7.61 | AAA |
| Text on card | `#FCEEF0` | `#2A0C13` | 16.05 | AAA |
| Muted text on card | `#C0949E` | `#37121B` | 6.30 | AA |

### Blueprint PDF, primary palette

| Pair | Foreground | Background | Ratio | Result |
|------|-----------|-----------|-------|--------|
| Body text | `#1E3D4C` | `#FAFAF9` | 11.01 | AAA |
| Body text on tint | `#1E3D4C` | `#EDF1F3` | 10.11 | AAA |
| Table header | `#FFFFFF` | `#1E3D4C` | 11.49 | AAA |
| Eyebrow and subhead | `#A0522D` | `#FAFAF9` | 5.38 | AA |
| Muted caption text | `#5C6E78` | `#FAFAF9` | 5.08 | AA |
| Source tag label | `#7A6021` | `#FFFFFF` | 5.96 | AA |

**Remediation applied during this audit.** The source tag in the PDF was originally brushed gold `#B8924A` on white at 2.90, which failed AA. It was darkened to `#7A6021`, which reaches 5.96 while keeping the gold border so the visual system is unchanged. This is the only failure found and it is resolved.

**Accepted at AA rather than AAA.** Terra cotta `#A0522D` at 5.38 and slate `#5C6E78` at 5.08 are brand colors carrying the eyebrow, subhead, and caption roles. Both clear AA comfortably. Pushing either to AAA would require darkening past the point where the color reads as itself. Neither carries body copy.

---

## 4. Keyboard navigation flow verified

**ECG Learning Lab.** Skip link, then tab list, then paper view toggle, then the toolbar in visual order: rhythm select, rate override, gain, run/freeze, calipers, clear. Calipers layer inserts two focusable markers when enabled. Each marker moves with left and right arrow keys at 6px steps, or 1px with shift held, and the measurement readout announces through the live region on every move. Tab order then continues to the caliper readout region and the notes. On the practice tab: depth select, new question, calipers, then the radio group, then the confidence buttons, then submit.

**CVRN Mastery OS.** Skip link, tab list, then the setup form in a single logical column per side of the grid, then build plan and reset. Gap finder self-rating rows expose four buttons per domain with `aria-pressed` reflecting the current selection. Diagnostic and exam runners keep focus inside the question card and move forward on submit.

No keyboard traps found. No positive `tabindex` values used anywhere. Modal-like states are avoided entirely, which is why no focus trapping is required.

---

## 5. Screen reader testing

**Reader used.** VoiceOver on macOS with Safari, and NVDA with Firefox on Windows.

**Verified.**

- Landmark structure announces: banner, main, contentinfo. Each tool section is a `section` with `aria-labelledby` pointing at its tab.
- Tab list announces as a tab list with the selected tab identified, and panel changes are reflected because hidden panels use the `hidden` attribute rather than CSS display alone.
- Every canvas announces its `aria-label` rather than being skipped or read as an unlabelled graphic.
- The caliper measurement region announces the new interval, box count, and rate when a marker moves, without interrupting other speech, because it is `polite` rather than `assertive`.
- Toggle buttons announce their pressed state and the state changes are read on activation.
- The 12-lead findings disclosure announces expanded and collapsed.
- Form fields announce their label, type, and current value.

---

## 6. Known limitations and remediation plan

1. **Canvas tracings are not readable content.** A screen reader user is told there is an ECG strip and which rhythm is loaded, but cannot read the waveform. This is the significant limitation and it is inherent to the medium rather than to the implementation.
   **Plan.** Add a structured text description per rhythm that reports rate, regularity, P wave presence and relationship, PR, QRS, and QT, exposed in a visually hidden region that updates with the rhythm selection. This gives a non-visual learner the same measurable facts the calipers give a sighted one. Targeted for the next build.

2. **Caliper measurement is inherently visual.** Arrow key operation works, but a non-visual user has no way to know where a QRS complex sits on the strip.
   **Plan.** Add a snap-to-feature mode that steps the caliper marker between detected waveform landmarks rather than by pixel, announcing each landmark by name. This makes the measurement task performable without sight.

3. **12-lead panel labels rely partly on color.** The lead name badge uses the trace color for visual continuity.
   **Plan.** Already mitigated by the `aria-label` on each panel canvas. No further action needed, noted for completeness.

4. **`prefers-reduced-motion` disables the sweep.** This is correct behavior, but it means a learner with that setting does not see the live monitor at all.
   **Plan.** Add an explicit in-app control to run the sweep anyway, so the system preference sets the default rather than removing the capability.

5. **PDF tagging.** The blueprint PDF is generated from HTML through headless Chromium, which produces a reasonably structured but not fully tagged PDF.
   **Plan.** Verify heading and table tag structure in a PDF accessibility checker before the document is distributed outside the team, and remediate if the reading order is wrong.

---

## 7. Reviewer

Reviewed by Dr. Sharilyn Rennie, August 13, 2026.

This project is not complete until items 1 and 2 in section 6 are closed, because the ECG lab is the core teaching tool and its central interaction is currently sight-dependent.
