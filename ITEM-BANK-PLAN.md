# Item Bank Plan: 2,000 questions and cases

Target set August 13, 2026. Status updated August 14, 2026. Quotas are proportional to the ABCM CVRN-BC Level II blueprint, so the bank stays exam-shaped as it fills rather than growing wherever writing is easiest.

## Current status

| Pool | File | Items | Feeds |
|---|---|---|---|
| Reserved exam | cvrn-exam-bank.js | 103 | Ten scored practice forms, nothing else |
| Written diagnostic | cvrn-diagnostic-bank.js | 90 | Written gap finder, forms A and B |
| Practical diagnostic | cvrn-practical-bank.js | 40 | Practical gap finder, forms A and B |
| ECG lab practice | ecg-lab.html | 23 | Open practice in the lab, unscored |
| **Authored total** | | **256** | |

### The four pool rule

An item lives in exactly one pool and is never copied into a second. If an item moves into a practice deck it is deleted from the pool it came from. This is the single rule that keeps a practice exam score an estimate rather than a memory test.

### Depth of knowledge in the reserved exam pool

| DOK | Items | Share | Target |
|---|---|---|---|
| 1 Recall | 16 | 15.5% | 15% |
| 2 Application | 47 | 45.6% | 45% |
| 3 Analysis | 35 | 34.0% | 35% |
| 4 Synthesis | 5 | 4.9% | 5% |

The pool previously held zero DOK 1 items and zero DOK 4 items, with DOK 3 at 57 percent. That skew made every form harder than the real exam at the top while giving the learner nothing that confirmed the foundation was in place at the bottom. Both ends are now authored and the distribution matches target.

### Next blocks, in order

1. Reserved exam pool to 300, so ten forms of 30 need no reuse. Remaining: 197.
2. Written diagnostic to 270, six forms of 45, so a learner can run the written gap finder six times before an item repeats. Remaining: 180.
3. Practical diagnostic to 120, six forms of 20. Remaining: 80.
4. Practice and recall decks to roughly 1100. This is the bulk, and none of it touches the scored pools.
5. ECG lab practice banks to roughly 150, generated against live tracings.

### Validation run on every write

1. No duplicate ids
2. Every competency id resolves against cvrn-competencies.js
3. Domain prefix matches the competency
4. Four options, valid answer index, no duplicate options
5. Rationale present and substantive
6. No stem appears in more than one pool
7. No em dashes in stem, options, or rationale
8. Every rhythm and pattern key in the practical pool exists in the ECG engine

## Item format, v2

Every item carries more than a right answer. This is the change that turns a quiz into a learning platform.

```js
{
  id:'X001', d:'D6', c:'D6.C4', dok:3,
  q:'stem',
  o:['A','B','C','D'],
  a:1,                       // index of the correct option
  optWhy:[                   // one per option, INCLUDING the correct one
    'Why A is wrong, and what reasoning error leads there',
    'Why B is right, and what makes it better than the near-miss',
    'Why C is wrong ...',
    'Why D is wrong ...'
  ],
  why:'What the item is actually testing, one level up from the answer',
  science:'The underlying anatomy or physiology, stated briefly',
  memory:'A hook that makes it retrievable under pressure',
  ref:'D6.C4.O4'             // objective it maps to
}
```

Distractors are written to be wrong for a *named reason*, not to be obviously silly. Each one should represent a real reasoning error a competent nurse makes: anchoring on a number, applying a unit protocol without the guideline behind it, treating the monitor instead of the patient, or confusing two lookalike conditions.

## Case format

A case is a stem plus two to five linked items that evolve. Vitals change between items. At least one item in each case must be answerable only by integrating across data streams, which is where DOK 4 lives.

Target: roughly one case per competency, 78 cases, about 250 case-linked items counted inside the 2,000.

## Quotas by domain

| Domain | Blueprint weight | Target items | Practice and recall | Reserved for exams | Authored | Remaining |
|---|---|---|---|---|---|---|
| D1 Bedside Assessment | 6% | 120 | 84 | 36 | 3 | 117 |
| D2 Basic ECG Essentials | 8% | 160 | 112 | 48 | 5 | 155 |
| D3 Coronary Artery Disease | 14% | 280 | 196 | 84 | 5 | 275 |
| D4 Hypertension | 6% | 120 | 84 | 36 | 3 | 117 |
| D5 Cardiomyopathy | 5% | 100 | 70 | 30 | 3 | 97 |
| D6 Heart Failure | 13% | 260 | 182 | 78 | 7 | 253 |
| D7 Non-Invasive and Interventional | 7% | 140 | 98 | 42 | 4 | 136 |
| D8 Heart Sounds and Valvular | 5% | 100 | 70 | 30 | 4 | 96 |
| D9 12-Lead ECG Essentials | 8% | 160 | 112 | 48 | 5 | 155 |
| D10 Principles of Oxygenation | 4% | 80 | 56 | 24 | 3 | 77 |
| D11 Hemodynamic Monitoring | 7% | 140 | 98 | 42 | 5 | 135 |
| D12 Cardiac Assist Devices | 4% | 80 | 56 | 24 | 3 | 77 |
| D13 Pacemaker Interpretation | 5% | 100 | 70 | 30 | 4 | 96 |
| D14 Cardiovascular Pharmacology | 8% | 160 | 112 | 48 | 6 | 154 |
| **Total** | **100%** | **2000** | **1400** | **600** | **256** | **1744** |

The reserved exam pool never overlaps the practice and recall decks. That separation is what makes a practice exam score an estimate rather than a memory test.

## Depth distribution within each domain

| DOK | Share | What it looks like |
|---|---|---|
| 1 Recall | 15% | Name it, state the value, identify the class |
| 2 Application | 45% | Given this strip or this result, classify or calculate |
| 3 Analysis | 35% | Given this patient and this change, decide and justify |
| 4 Synthesis | 5% | Manage across changing data, usually inside a case |

## Sequencing

Fill by blueprint weight, heaviest first, so the bank is usable at every stage rather than only when complete. Order: D3, D6, D14, D2, D9, D11, D7, D1, D4, D13, D8, D5, D10, D12.

At any point the practice exam engine reports exactly how many slots are filled per form and never pads a short form from the practice deck.

## Honest scale note

2,000 items with per-option rationale, background science, and a memory hook runs to roughly 250 words each, so about half a million words. That is a sustained authoring programme, not a single sitting. The structure above exists so the work can be done in batches by domain, dropped into `cvrn-exam-bank.js` and the practice bank, and counted automatically against these quotas.
