# Accessibility Compliance Notes

## 1. Project

**Project:** ECG & CVRN-BC Review Course (CVRN/OS)
**Owner:** MedMasters Collaborative, LLC
**Files covered:**

1. `index.html` (merged single-file application, the file that ships to Kajabi)
2. `cvrn-mastery-os.html` (plan, written gap finder, practice exams)
3. `ecg-lab.html` (live monitor, 12-lead viewer, practice, practical gap finder)
4. `study-notes.html` (chaptered notes, screen and print)
5. `cvrn-dashboard.html` (weakness dashboard)
6. `blueprint-pdf.html` (source for the printed blueprint)
7. `embed-kit.html`, `kajabi-embed.txt` (host page embed)

**Date of this review:** 14 August 2026
**Reviewer:** Dr. Sharilyn Rennie

## 2. WCAG version and target level

**Standard:** WCAG 2.2
**Floor:** Level AA on every criterion
**Stretch:** Level AAA where achievable, met for contrast on all primary text

Criteria verified in this pass:

1. **1.1.1 Non-text content, A.** Every canvas carries `role="img"` and a descriptive `aria-label`. Icon-only controls carry accessible names.
2. **1.3.1 Info and relationships, A.** Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), real headings in order, real tables with `thead` and `th`, labels bound to inputs by `for` and `id`.
3. **1.4.3 Contrast minimum, AA.** See section 3. Every pair passes.
4. **1.4.6 Contrast enhanced, AAA.** Met for all primary and secondary text in both themes. Two muted-text pairs and two accent pairs land in AA rather than AAA and are listed as known limitations.
5. **1.4.10 Reflow, AA.** No horizontal scrolling at 320 CSS pixels. The 12-lead grid collapses from four columns to two to one.
6. **1.4.11 Non-text contrast, AA.** Focus rings, card borders, and pill borders all exceed 3:1 against their background.
7. **1.4.12 Text spacing, AA.** No fixed-height text containers.
8. **2.1.1 Keyboard, A.** Every interactive element is reachable and operable from the keyboard. Verified path in section 4.
9. **2.1.2 No keyboard trap, A.** Verified, including the caliper overlay.
10. **2.4.1 Bypass blocks, A.** Skip link to main content, first in tab order, visible on focus.
11. **2.4.3 Focus order, A.** DOM order matches visual order in every panel.
12. **2.4.7 Focus visible, AA.** 2px accent outline with offset on every focusable element.
13. **2.4.11 Focus not obscured, AA (2.2).** The sticky header does not overlap a focused element; panels scroll to top on route change.
14. **2.5.8 Target size minimum, AA (2.2).** All controls at or above 24 by 24 CSS pixels. Buttons and tabs are 40 pixels tall or more.
15. **2.3.3 Animation from interactions, AAA.** `prefers-reduced-motion` stops the monitor sweep, freezes the strip, and removes card lift transitions.
16. **3.1.1 Language of page, A.** `lang="en"`.
17. **3.2.2 On input, A.** No control changes context on input. Every change requires an explicit button press.
18. **3.3.1 Error identification, A.** Validation messages are text, not colour alone, delivered into a live region.
19. **3.3.2 Labels or instructions, A.** Every input has a visible label and a unit where a unit applies.
20. **4.1.2 Name, role, value, A.** `role="tab"` and `role="tabpanel"` with `aria-selected` and `aria-controls`, `aria-pressed` on toggles, `aria-current="page"` on the active nav link.
21. **4.1.3 Status messages, AA.** `aria-live="polite"` on the caliper readout, the practice feedback block, the vitals row, and both gap finder report regions.

## 3. Colour contrast audit

Measured against the computed custom properties in the shipped build, not against the design file. Ratios calculated with the WCAG relative luminance formula.

| Theme | Pair | Colours | Ratio | Level |
|---|---|---|---|---|
| Dark | Body text on panel | #EEF2FF on #0B1530 | 16.13:1 | AAA |
| Dark | Body text on raised card | #EEF2FF on #111C3A | 15.01:1 | AAA |
| Dark | Secondary text | #BCC6DD on #0B1530 | 10.53:1 | AAA |
| Dark | Muted text | #8F9BB5 on #0B1530 | 6.46:1 | AA |
| Dark | Accent, links and active tab | #4ADE80 on #0B1530 | 10.35:1 | AAA |
| Dark | Gold highlight | #E8D4A8 on #0B1530 | 12.38:1 | AAA |
| Dark | Terra eyebrow | #E8A08E on #0B1530 | 8.46:1 | AAA |
| Dark | Priority pill | #EF5350 on #0B1530 | 5.17:1 | AA |
| Dark | Alert pill | #FFD54F on #0B1530 | 12.78:1 | AAA |
| Dark | Dashboard text | #E8EDF8 on #0C1322 | 15.81:1 | AAA |
| Dark | ECG trace on ECG paper | #15191E on #FFF7F4 | 16.70:1 | AAA |
| Light | Body text | #0B1530 on #FFFFFF | 18.04:1 | AAA |
| Light | Secondary text | #3A465F on #FFFFFF | 9.45:1 | AAA |
| Light | Muted text | #5A6478 on #FFFFFF | 5.95:1 | AA |
| Light | Accent, links and active tab | #166534 on #FFFFFF | 7.13:1 | AAA |
| Light | Gold highlight | #8A6B2E on #FFFFFF | 4.97:1 | AA |
| Light | Terra eyebrow | #8B3A2E on #FFFFFF | 7.66:1 | AAA |
| Light | Priority pill | #8B3A2E on #FFFFFF | 7.66:1 | AAA |
| Light | Alert pill | #A0452F on #FFFFFF | 6.20:1 | AA |
| Light | Text on raised card | #0B1530 on #F8F8F8 | 16.99:1 | AAA |
| Light | Dashboard text | #141C2D on #FFFFFF | 17.02:1 | AAA |
| Light | Text on page background | #141C2D on #F5F7F9 | 15.85:1 | AAA |

Light mode green was corrected from #16A34A, which measured 3.30:1 and failed AA for normal text, to #166534 at 7.13:1, which passes AAA.

### Colour is never the only signal

1. Mastery states carry a text label as well as a border colour: Locked, Unlocked, Completed.
2. Completed state is navy on navy tint, never green. Green is reserved for the interface accent and the ECG trace on the monitor channel.
3. Gap finder reads carry text: Holding, Fragile, Priority, Too thin to call.
4. Correct and incorrect feedback carries a written heading, not a coloured border alone.
5. Chart series carry direct labels and value text, not a legend swatch alone.

## 4. Keyboard navigation flow verified

Verified end to end with keyboard only, no pointer.

1. `Tab` from page load reaches the skip link first. `Enter` moves focus to `main`.
2. `Tab` through the brand link, then each nav route link. `aria-current` announces the active view.
3. Inside a view, `Tab` reaches each tab button. `Enter` or `Space` activates. Focus stays on the tab, and the panel is exposed below.
4. **Monitor:** rhythm select reached by `Tab`, changed with arrow keys, applied on change. Run and freeze, gain, and paper view are all buttons.
5. **Calipers:** the toggle is a button. When on, each caliper handle is focusable and moves with arrow keys. `Escape` is not required to leave, because `Tab` exits normally. No trap.
6. **12-lead:** pattern select by keyboard. All twelve canvases are labelled images and are skipped by tab order, which is correct since they are not interactive.
7. **Practice and both gap finders:** depth select, radio group with arrow keys, numeric input, the two confidence buttons, then Submit. Feedback is inserted into a live region and announced without moving focus.
8. **Practice exams:** identical pattern, with the review list reachable after scoring.
9. **Notes:** every collapsible section header is a real button carrying `aria-expanded`. `Enter` and `Space` both toggle.
10. **Dashboard:** charts are labelled images. Every figure they present is also given as text in the table beneath, so nothing is available only inside a canvas.

## 5. Screen reader testing

**Readers used:** NVDA 2024.x with Firefox, and VoiceOver on macOS with Safari.

Verified:

1. Landmarks announce correctly: banner, navigation, main, contentinfo.
2. Heading tree is ordered, with one `h1` per view and no skipped levels.
3. Tabs announce as "tab, selected" and report the controlled panel.
4. Canvas elements announce their `aria-label` rather than reading as "graphic" with no name.
5. Caliper readout, vitals row, and answer feedback announce as polite live updates without stealing focus.
6. Tables announce row and column headers when navigating in table mode.
7. Form fields announce label plus unit, for example "Your measurement in ms, edit".
8. Buttons that toggle announce pressed state.
9. Print stylesheet output was checked as a linearised document. Reading order matches the visual order.

## 6. Known limitations and remediation plan

1. **The ECG waveform itself is visual.** A blind learner cannot read a strip from the canvas. Mitigation in place: every practice and gap finder item states the rhythm or pattern in the written rationale after submission, so the teaching point is available in text. Planned: a text description track that names rate, rhythm, P wave relationship, PR, QRS, and QT for the current strip, exposed on demand.
2. **Caliper measurement is a pointer and arrow-key interaction on a graphic.** A learner who cannot see the strip cannot perform the measurement task. Planned: a numeric mode that presents the same intervals as values to be classified rather than measured.
3. **Muted text sits at AA rather than AAA** in both themes, 6.46:1 dark and 5.95:1 light. It is used only for supporting metadata, never for instructions or answers. Accepted.
4. **Light mode gold highlight at 4.97:1** passes AA but not AAA. Used for emphasis, never as the sole carrier of meaning. Accepted.
5. **Dark mode priority pill at 5.17:1** passes AA but not AAA. The pill also carries its text label. Accepted.
6. **Embedded in an iframe**, the host page controls the outer page language and landmark structure. The embed kit documents the requirement that the host page supply a heading before the frame.
7. **Progress storage is `localStorage`.** In a browser with storage blocked the tools still run, but progress does not persist between sessions. A note states this in the interface rather than failing silently.

## 7. Student privacy

No student name, identifier, email, grade, or other personal information is collected, stored, or transmitted by any file in this project. All progress data is written to `localStorage` on the learner's own device under keys prefixed `cvrn-`. Nothing is sent to a server. There is no analytics call, no third-party script beyond the Google Fonts stylesheet, and no cookie.

## 8. Reviewer

Reviewed by Dr. Sharilyn Rennie, 14 August 2026.
Contrast figures computed from the shipped build. Keyboard and screen reader paths walked manually against `index.html`.
