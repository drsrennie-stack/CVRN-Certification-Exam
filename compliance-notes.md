# Accessibility Compliance Notes

## 1. Project

**Project:** ECG & CVRN-BC Review Course (CVRN/OS)
**Owner:** MedMasters Collaborative, LLC
**Files covered:**

1. `index.html` (merged single-file application, the file that ships to Kajabi)
2. `cvrn-mastery-os.html` (plan, written gap finder, study sessions, practice exams)
3. `ecg-lab.html` (live monitor, 12-lead viewer, practice, IABP lab, practical gap finder)
4. `study-notes.html` (chaptered notes, screen and print)
5. `cvrn-dashboard.html` (weakness dashboard)
6. `build_app.py` (shell, routing, and the accessibility layer)
7. `embed-kit.html`, `kajabi-embed.txt` (host page embed)

**Date of this review:** 29 September 2026
**Reviewer:** Dr. Sharilyn Rennie

## 2. Standard and result

**Standard:** WCAG 2.2
**Floor:** Level AA on every criterion
**Stretch:** Level AAA, met for contrast on all text in every mode

**Automated result:** axe-core 4.13, tags `wcag2a wcag2aa wcag21a wcag21aa wcag22aa best-practice`,
run across 8 routes in 5 display configurations (default, high contrast dark, high
contrast light, 150 percent text, Hyperlegible with underlined links). **40 page
states, 0 violations.**

Automated testing catches roughly a third of what matters, so the checks in
sections 5 through 8 were run separately.

## 3. The accessibility control

Every screen carries an **Accessibility** button in the header. Settings are
stored in this browser under `cvrn-a11y` and applied to the document element by
an inline script that runs before the stylesheet, so nothing flashes on load.

| Setting | Options | What it does |
|---|---|---|
| Text size | 100, 115, 130, 150 percent | Every font size in the merged stylesheet is multiplied by `--ui-scale` at build time, so text grows without the layout being scaled with it. Fluid `clamp()` headings scale on all three of their values. |
| Typeface | Default, Hyperlegible | Switches to Atkinson Hyperlegible, which is drawn so that characters people most often confuse, such as capital I, lowercase l and the digit 1, stay distinct. |
| Contrast | Standard, High | A separate token set for each theme. Card shadows become 2px borders, pills and chips gain weight, and focus rings go to 4px. |
| Motion | System, Reduce | Honours `prefers-reduced-motion` on its own. The switch is for people whose system does not expose the preference. It stops the monitor sweep, not just CSS transitions, and restores it when turned off. |
| Links | Default, Always underlined | Underlines every link that is not already a card or a button. |

Print output ignores all of it. A screen preference should not follow the
learner onto paper.

## 4. Colour contrast

Measured from the shipped build with the WCAG relative luminance formula.

### Standard themes

| Theme | Pair | Colours | Ratio | Level |
|---|---|---|---|---|
| Dark | Body text on panel | #EEF2FF on #0B1530 | 16.13:1 | AAA |
| Dark | Secondary text | #BCC6DD on #0B1530 | 10.53:1 | AAA |
| Dark | Muted text | #8F9BB5 on #0B1530 | 6.46:1 | AA |
| Dark | Accent, links and active tab | #4ADE80 on #0B1530 | 10.35:1 | AAA |
| Dark | Gold highlight | #E8D4A8 on #0B1530 | 12.38:1 | AAA |
| Dark | Terra eyebrow | #E8A08E on #0B1530 | 8.46:1 | AAA |
| Dark | ECG trace on ECG paper | #15191E on #FFF7F4 | 16.70:1 | AAA |
| Light | Body text | #0B1530 on #FFFFFF | 18.04:1 | AAA |
| Light | Secondary text | #3A465F on #FFFFFF | 9.45:1 | AAA |
| Light | Muted text | #5A6478 on #FFFFFF | 5.95:1 | AA |
| Light | Accent, links and active tab | #166534 on #FFFFFF | 7.13:1 | AAA |
| Light | Terra eyebrow | #8B3A2E on #FFFFFF | 7.66:1 | AAA |

### High contrast

| Mode | Pair | Colours | Ratio | Level |
|---|---|---|---|---|
| Dark | Body text | #FFFFFF on #000000 | 21.00:1 | AAA |
| Dark | Secondary text | #F2F4F8 on #000000 | 19.07:1 | AAA |
| Dark | Muted text | #DCE2EC on #000000 | 16.13:1 | AAA |
| Dark | Accent and active tab | #7DF7A6 on #000000 | 15.73:1 | AAA |
| Dark | Gold highlight | #FFD98A on #000000 | 15.54:1 | AAA |
| Dark | Terra eyebrow | #FFB39E on #000000 | 12.19:1 | AAA |
| Light | Body text | #000000 on #FFFFFF | 21.00:1 | AAA |
| Light | Muted text | #2B2B2B on #FFFFFF | 14.16:1 | AAA |
| Light | Accent and active tab | #0A4D20 on #FFFFFF | 10.02:1 | AAA |
| Light | Text on accent | #FFFFFF on #0A4D20 | 10.02:1 | AAA |
| Notes | Body ink on paper | #000000 on #FFFFFF | 21.00:1 | AAA |
| Notes | Physiology heading | #123E44 on #FFFFFF | 11.68:1 | AAA |
| Notes | Pathology heading | #6B1F14 on #FFFFFF | 11.47:1 | AAA |

The study notes are a paper document and stay black on white in high contrast
whichever theme the rest of the app is in. Forcing the dark set on them put
white ink on a white page, which is how that case was found.

### Colour is never the only signal

1. Mastery states carry a word as well as a border: Locked, Unlocked, Completed.
2. Completed is navy on navy tint, never green.
3. Gap finder reads carry text: Holding, Fragile, Priority, Too thin to call.
4. Answer feedback carries a written heading, not a coloured border alone.
5. Every chart is also available as a data table.
6. In the Wiggers diagram and the print stylesheet, curves separate by line
   pattern as well as colour, and each is labelled on the chart itself.

## 5. Keyboard

1. **Skip link** is the first tab stop and moves focus into `main`.
2. **Tab lists follow the ARIA authoring practices pattern.** One tab stop for
   the whole list, arrow keys between tabs, Home and End to the ends. Before
   this, all six ECG tabs sat in the tab order, which was six extra stops on
   every visit. Panels are focusable so the content is reachable straight after.
3. **Calipers** are buttons. Arrow keys move them by 6px, Shift and arrow by
   1px, Home and End jump to the ends, and the measurement is announced through
   a polite live region as it changes. They carry an explicit focus ring because
   the handle itself is transparent.
4. **The accessibility panel** opens with Enter, moves focus to the first
   control, closes on Escape, and returns focus to the button that opened it.
   It also closes on focus leaving it or on a click outside.
5. **Wide tables** sit in focusable, labelled scroll regions, so a keyboard user
   can pan them instead of losing the columns off the edge.
6. **Route changes** move focus to the main region and announce the view name in
   a polite live region. A hash change used to swap the whole screen and leave
   focus where it was, silently.
7. Verified: no keyboard traps, focus order matches visual order, every
   interactive element has a visible focus indicator.

## 6. Screen reader

**Readers used:** NVDA 2024.x with Firefox, VoiceOver on macOS with Safari.

1. **Landmarks.** One banner, one navigation, one main, one contentinfo. Each
   tool used to ship its own `<main>`, which merged into several nested mains
   inside the shell's and made the landmark list useless. The shell now owns the
   only main.
2. **Headings** run in order with one `h1` per view and no skipped levels.
3. **Tabs** announce as tab, selected, with the panel they control.
4. **Every ECG tracing now has a text alternative.** See section 7.
5. **Every chart has a data table**, with a caption naming what it holds.
6. **Live regions:** the alarm bar is assertive; caliper readouts, answer
   feedback, route changes and accessibility setting changes are polite. The
   vitals numbers are deliberately not a live region, because they update
   continuously and would never stop talking.
7. **Forms:** every input has a visible label and its unit; the settings panel
   uses real fieldsets and legends with radio groups.
8. Print output was checked as a linearised document. Reading order matches.

## 7. The ECG tracings

This was the one real hole in the previous review, and it is closed.

Every strip carries a **Describe this tracing** control. The description is
measured from the beats the engine actually generated, not from a stored
sentence, so it cannot drift from what is drawn. It reports rate, regularity,
P wave presence and relationship, PR, QRS width, QT, and anything unusual about
the baseline. A one-line summary is also written onto the canvas `aria-label`,
so a screen reader gets the gist without opening anything.

It runs in two modes:

1. **Naming mode**, on the monitor, where the rhythm is already chosen from a
   labelled control and repeating it costs nothing.
2. **Findings mode**, in practice and both gap finders, where naming the rhythm
   would hand over the answer. It gives exactly what a sighted learner gets from
   looking at the strip, and says so: "Naming the rhythm is the question, so the
   name is not given here."

Worked examples from the shipped build:

- Third degree block: "P waves are present and march out at their own regular
  rate, faster than the QRS rate. They have no fixed relationship to the QRS
  complexes. Some fall on T waves, some just after a QRS, and the PR interval is
  different on every beat."
- Mobitz I: "regular apart from the dropped beats, which produces group beating
  ... The PR interval lengthens progressively from about 160 ms to about 300 ms
  across consecutive beats, then a QRS is dropped and the cycle restarts."
- Ventricular bigeminy: "The complexes alternate. Every second beat is early,
  wide and bizarre with no P wave in front of it."

The 12-lead patterns describe which leads carry elevation and which carry
depression, again without naming the diagnosis in question mode.

**Still visual only:** performing a caliper measurement on the strip. A learner
who cannot see the trace cannot do that task. Planned remediation is a numeric
mode that presents the same intervals as values to classify rather than measure.

## 8. Text, zoom and reflow

1. **1.4.4 Resize text.** In-app control to 150 percent, on top of browser zoom.
   The in-app control matters because the course runs inside a Kajabi iframe.
2. **1.4.10 Reflow.** No horizontal scrolling at 320, 360, 400 or 768 CSS pixels
   **with text at 150 percent**, on every route, with all dashboard tables open
   and all note sections expanded. The requirement is 320px at 100 percent, so
   this clears it with margin.
3. **1.4.12 Text spacing.** Applying line height 1.5, letter spacing 0.12em,
   word spacing 0.16em and paragraph spacing 2em clips no content. The only
   element that clips is the visually hidden live region, which is meant to.
4. **2.5.8 Target size.** Every control is at least 24 by 24 CSS pixels. Most
   are 40 or 44.
5. **2.4.11 Focus not obscured.** The sticky header's height is measured at
   runtime into `--hdr-h` and used as `scroll-padding-top`, so nothing scrolled
   to or focused lands underneath it. The header changes height when the nav
   wraps or the text size is raised, which is why it is measured rather than
   hardcoded.

## 9. Bugs this review found

1. **Every responsive rule in every tool was dead.** The CSS scoper matched
   at-rule names by splitting on whitespace, so `@media(max-width:700px)` with no
   space was never recognised, and its contents were emitted unscoped. An
   unscoped `.grid2` then lost to the scoped `#view-os .grid2` base rule, so no
   layout ever collapsed on a phone. Fixed by matching the at-rule name properly.
2. **Anchors styled as buttons rendered as default links,** `#0000EE` on a dark
   panel, 1.78:1, because the rules were written `button.act` and never matched
   an `<a>`.
3. **Opacity was being used to de-emphasise 10.5px text,** dropping the monitor
   vitals to between 2.8:1 and 4.0:1. Opacity removed; the labels keep their full
   colour.
4. **Locked exam tiles were dimmed with opacity** to 2.97:1. The dashed border
   and the word Locked already carried the state.
5. **Six tab buttons and a view toggle shared one `role="tablist"`,** which is
   invalid and made the whole list announce wrongly.
6. **DOI links in the references could not wrap,** setting a minimum page width
   of 721px on a phone.

## 10. Known limitations and remediation plan

1. **Caliper measurement is a visual task.** Mitigated by the text description
   of every strip, which states the intervals. A numeric classification mode is
   planned.
2. **Muted text sits at AA rather than AAA** in the standard themes, 6.46:1 dark
   and 5.95:1 light. Used only for supporting metadata, never instructions or
   answers, and high contrast raises it to 16.13:1 and 14.16:1. Accepted.
3. **Embedded in an iframe**, the host page controls the outer document
   language and landmark structure. The embed kit documents that the host must
   supply a heading before the frame.
4. **Progress storage is `localStorage`.** With storage blocked the tools still
   run but progress does not persist between sessions, and the interface says so
   rather than failing silently.

## 11. Student privacy

No student name, identifier, email, grade or other personal information is
collected, stored or transmitted by any file in this project. All progress and
all accessibility settings are written to `localStorage` on the learner's own
device under keys prefixed `cvrn-`. Nothing is sent to a server. There is no
analytics call, no third-party script beyond the Google Fonts stylesheet, and
no cookie.

## 12. Reviewer

Reviewed by Dr. Sharilyn Rennie, 29 September 2026.
Contrast figures computed from the shipped build. axe-core run across 40 page
states. Keyboard, reflow, text spacing and screen reader paths walked manually
against `index.html`.
