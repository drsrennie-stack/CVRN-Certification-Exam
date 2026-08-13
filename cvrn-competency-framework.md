# ECG & CVRN Review Course
## Competency Framework, v0.1

Dr. Sharilyn Rennie
August 13, 2026

---

## 1. What this document is

This is the competency spine for the ECG & CVRN review course. Everything downstream depends on it: the question bank, the spaced recall scheduler, the weakness dashboard, and the learner-facing progress map all read from the same competency IDs defined here.

The structure is three tiers.

| Tier | What it is | ID shape | Purpose |
|------|-----------|----------|---------|
| Domain | An ABCM blueprint category | `D6` | Top-level dashboard tile, matches what the exam reports |
| Competency | A coherent chunk of practice inside a domain | `D6.C4` | Study unit, one lesson or lab, the level learners navigate |
| Objective | One observable, testable behavior | `D6.C4.O2` | The thing an item is tagged to, the level the dashboard diagnoses |

Every question in the bank carries exactly one primary objective ID and may carry secondary IDs for cross-domain integration items. The dashboard never reports a weakness above the level it can defend with items, so objective-level tagging is what makes "you are weak in heart failure" become "you cannot sequence GDMT initiation when the patient is hypotensive."

---

## 2. Blueprint alignment

Source: American Board of Cardiovascular Medicine, CVRN-BC exam categories, retrieved August 13, 2026.

**Level I, Non-Acute Care.** 150 items, domains D1 through D7.
**Level II, Acute Care.** 200 items, domains D1 through D14.

Level II is a superset. A learner targeting Level II works the full fourteen; a learner targeting Level I sees D8 through D14 in a locked state on the map, visible so they know the ladder continues, not scored against them.

**Target credential: ABCM CVRN-BC.** Settled August 13, 2026. The ANCC CV-BC remains a tagged secondary lens on the dashboard, described in section 10, but it is not what the course is built to pass.

**Weights.** Weights are per level and sum to 100 within each level. `weightL1` spreads across the seven Level I categories, `weightL2` across all fourteen.

| Domain | Level I | Level II |
|---|---|---|
| D1 Bedside Assessment | 10 | 6 |
| D2 Basic ECG Essentials | 14 | 8 |
| D3 Coronary Artery Disease | **22** | 14 |
| D4 Hypertension | 12 | 6 |
| D5 Cardiomyopathy | 9 | 5 |
| D6 Heart Failure | **20** | 13 |
| D7 Non-Invasive and Interventional | 13 | 7 |
| D8 Heart Sounds and Valvular Disorders | — | 5 |
| D9 12-Lead ECG Essentials | — | 8 |
| D10 Principles of Oxygenation | — | 4 |
| D11 Hemodynamic Monitoring | — | 7 |
| D12 Cardiac Assist Device Therapy | — | 4 |
| D13 Pacemaker Interpretation | — | 5 |
| D14 Cardiovascular Pharmacology | — | 8 |
| **Total** | **100** | **100** |

Bold figures are reported. Everything else is an estimate allocated by clinical load and objective count, and carries `weightSource: "provisional"` in `cvrn-competencies.js` so the whole set swaps in one pass. Coronary artery disease plus heart failure carry 42 percent of Level I between them, which is why the pacing engine front-loads those two domains. Email ABCM for the detailed study list before the item bank is locked.

---

## 3. The ECG spine

ECG is not treated as three scattered blueprint categories. It runs as a parallel strand the length of the course, scored on its own dashboard tile, because ECG interpretation is a compounding skill and it is where candidates actually lose points.

| Strand | Name | Feeds from | Cross-links into |
|--------|------|-----------|------------------|
| E1 | Waveform literacy | D2 | D14 |
| E2 | Rhythm diagnosis under time pressure | D2 | D5, D6, D12 |
| E3 | 12-lead ischemia and localization | D9 | D3, D7 |
| E4 | Paced and device tracings | D13 | D12 |
| E5 | Tracing-to-patient integration | D9, D2 | D1, D8, D10, D11 |

The spine does not duplicate objectives. It re-indexes them. An objective like `D9.C4.O3` is owned by domain D9 and referenced by strand E3. The dashboard reads the same mastery score through two lenses: "how is your 12-lead domain" and "how is your ECG skill overall." One source of truth, two rollups.

E5 exists because the exam does not ask learners to read a tracing in isolation. It asks what the tracing means for a patient who is also hypotensive, or on an amiodarone drip, or three days post-PCI. E5 items are integration items, tagged with a primary objective in the clinical domain and a secondary in the ECG strand.

---

## 4. Depth of knowledge tagging

Every objective carries a DOK level. This governs item writing, spacing intervals, and how the dashboard interprets a miss.

| DOK | Name | What an item looks like | Dashboard meaning of a miss |
|-----|------|------------------------|----------------------------|
| 1 | Recall | Name the primary intervention for symptomatic bradycardia | Knowledge gap, remediate with content |
| 2 | Application | Given this rhythm strip and rate, classify it | Skill gap, remediate with reps |
| 3 | Analysis | Given this patient and this change, decide and justify | Reasoning gap, remediate with worked cases |
| 4 | Synthesis | Manage a multi-system deterioration across several data streams | Integration gap, remediate with simulation |

Certification items cluster at DOK 2 and 3. The framework targets roughly 20 percent DOK 1, 45 percent DOK 2, 30 percent DOK 3, 5 percent DOK 4. DOK 4 objectives are deliberately few and are where the drawing-based synthesis checks belong.

A learner is not marked mastered on a competency until they have cleared its DOK 3 objectives. Clearing only DOK 1 and 2 registers as **Fragile**, not mastered, which is the distinction that makes the dashboard honest.

---

## 5. Mastery states and the weakness engine

### 5.1 Four states plus a flag

Each objective sits in one of four states, driven by confidence-scored responses.

| Response pattern | State | Priority |
|-----------------|-------|----------|
| Confident and correct, repeated across spacing intervals | **Mastered** | None |
| Correct but flagged unsure, or correct once and not yet re-tested | **Fragile** | Medium |
| Incorrect and flagged unsure | **Gap** | High |
| Incorrect and flagged confident | **Gap plus Misconception flag** | Highest |
| No items answered yet | **Untested** | Not scored |

The confident-and-wrong case is the whole reason for confidence scoring. A learner who does not know something will study it. A learner who is certain of something wrong will walk past it every time, and it will cost them on exam day. That case gets its own visual treatment on the dashboard and its own remediation path, which starts by surfacing the misconception explicitly rather than re-teaching the correct answer around it.

### 5.2 Rollup math

```
objective_mastery  = weighted recency-decayed accuracy, 0 to 100
competency_mastery = mean(objective_mastery), weighted by objective DOK
domain_mastery     = mean(competency_mastery), weighted by competency weight
readiness          = mean(domain_mastery), weighted by blueprint weight
```

Recency decay uses the SM-2 style interval already running in the spaced recall tool, so a mastery score earned six weeks ago and never re-tested drifts back toward Fragile on its own. Mastery is a claim about right now, not a trophy.

### 5.3 Weakness ranking

The dashboard's core job is answering "what do I do next." Priority score:

```
priority = blueprint_weight
         x gap_severity        (Misconception 1.0, Gap 0.8, Fragile 0.4)
         x recency_decay
         x prerequisite_lift   (raised if other objectives depend on this one)
```

`prerequisite_lift` is what keeps the engine from sending someone to study STEMI localization when the real problem is that they cannot identify a bundle branch block. Dependencies are declared per objective in the JSON registry.

### 5.4 Progress states on the map

Per the primary palette. Never green for completed.

- **Locked.** Gray, dashed border. Prerequisites not met, or above the learner's target level.
- **Unlocked.** Brushed gold `#B8924A`, solid border. Available now.
- **Completed.** Navy `#1E3D4C` solid border on navy-tint `#EDF1F3` fill. Mastered and holding.

Fragile and Gap states render inside an unlocked card rather than as a fourth border treatment, so the map stays readable at a glance and the diagnosis lives one layer in.

---

## 6. Domain map

The weight noted under each domain heading is the Level I figure where the domain appears at Level I, otherwise Level II. The authoritative per-level table is in section 2. `[DOKn]` tags each objective.

---

### D1. Bedside Assessment
Weight 8. Level I. Foundation domain, prerequisite to D3, D5, D6, D8.

**D1.C1 Cardiac history and symptom analysis**
- D1.C1.O1 [DOK1] Identify the components of a focused cardiovascular history including risk factors, family history, and functional baseline.
- D1.C1.O2 [DOK2] Characterize chest discomfort using onset, provocation, quality, radiation, severity, and timing.
- D1.C1.O3 [DOK2] Distinguish anginal from non-anginal chest pain presentations.
- D1.C1.O4 [DOK3] Recognize atypical presentations in women, older adults, and patients with diabetes, and adjust the assessment accordingly.

**D1.C2 Inspection, palpation, and precordial assessment**
- D1.C2.O1 [DOK1] Locate the point of maximal impulse and the standard precordial landmarks.
- D1.C2.O2 [DOK2] Interpret a displaced or sustained apical impulse in terms of chamber change.
- D1.C2.O3 [DOK2] Assess jugular venous pressure and describe what an elevation indicates.
- D1.C2.O4 [DOK2] Identify peripheral signs of chronic cardiac disease including clubbing, cyanosis, and dependent edema.

**D1.C3 Auscultation fundamentals**
- D1.C3.O1 [DOK1] Name the five auscultatory areas and the valve each best transmits.
- D1.C3.O2 [DOK2] Differentiate S1 from S2 and relate each to the cardiac cycle.
- D1.C3.O3 [DOK2] Recognize physiologic splitting of S2 and distinguish it from pathologic splitting.
- D1.C3.O4 [DOK2] Describe a technique for isolating a soft sound, including positioning and respiratory maneuvers.

**D1.C4 Peripheral vascular and perfusion assessment**
- D1.C4.O1 [DOK1] Identify and grade peripheral pulses using a standard scale.
- D1.C4.O2 [DOK2] Perform and interpret an ankle-brachial index.
- D1.C4.O3 [DOK2] Differentiate arterial from venous insufficiency by exam findings.
- D1.C4.O4 [DOK3] Integrate perfusion findings with vital signs to estimate adequacy of cardiac output at the bedside.

**D1.C5 Recognition of decompensation and escalation**
- D1.C5.O1 [DOK2] Identify early bedside indicators of hemodynamic deterioration.
- D1.C5.O2 [DOK3] Prioritize assessment findings that require immediate escalation over those that require monitoring.
- D1.C5.O3 [DOK3] Communicate a deteriorating cardiac patient using a structured handoff format.

---

### D2. Basic ECG Essentials
Weight 12. Level I. ECG spine E1, E2. Prerequisite to D9, D13.

**D2.C1 Lead systems, waveform components, and measurement**
- D2.C1.O1 [DOK1] Identify P wave, QRS complex, T wave, U wave, and the PR, QRS, QT intervals on a tracing.
- D2.C1.O2 [DOK1] State the standard calibration, paper speed, and the time and voltage value of each grid box.
- D2.C1.O3 [DOK2] Measure PR, QRS, and QT intervals and classify each as normal or prolonged.
- D2.C1.O4 [DOK2] Calculate corrected QT and identify the threshold that raises torsades risk.
- D2.C1.O5 [DOK2] Relate each waveform component to the underlying electrical event in the conduction system.

**D2.C2 Rate determination and sinus rhythms**
- D2.C2.O1 [DOK2] Calculate heart rate using the sequence method and the six-second method, and select the correct method for regular versus irregular rhythms.
- D2.C2.O2 [DOK2] Identify normal sinus rhythm, sinus bradycardia, sinus tachycardia, and sinus arrhythmia.
- D2.C2.O3 [DOK2] Recognize sinus arrest, sinus exit block, and sick sinus syndrome patterns.
- D2.C2.O4 [DOK3] Determine whether a bradycardia is symptomatic and select the indicated first intervention.

**D2.C3 Atrial dysrhythmias**
- D2.C3.O1 [DOK2] Identify premature atrial contractions and distinguish conducted from non-conducted beats.
- D2.C3.O2 [DOK2] Identify atrial flutter and estimate the conduction ratio.
- D2.C3.O3 [DOK2] Identify atrial fibrillation and describe the two features that define it.
- D2.C3.O4 [DOK2] Identify supraventricular tachycardia and multifocal atrial tachycardia.
- D2.C3.O5 [DOK3] Differentiate SVT with aberrancy from ventricular tachycardia and justify the distinction.
- D2.C3.O6 [DOK3] Select rate control, rhythm control, or anticoagulation priorities for new atrial fibrillation based on stability and duration.

**D2.C4 Junctional and ventricular dysrhythmias**
- D2.C4.O1 [DOK2] Identify junctional rhythm, accelerated junctional rhythm, and junctional tachycardia by P wave relationship.
- D2.C4.O2 [DOK2] Identify premature ventricular contractions and classify them as unifocal, multifocal, coupled, or R-on-T.
- D2.C4.O3 [DOK2] Identify monomorphic ventricular tachycardia, polymorphic VT, and torsades de pointes.
- D2.C4.O4 [DOK2] Identify ventricular fibrillation, idioventricular rhythm, and asystole.
- D2.C4.O5 [DOK3] Match each lethal or pre-lethal rhythm to its immediate intervention including defibrillation, synchronized cardioversion, or pacing.

**D2.C5 AV block recognition**
- D2.C5.O1 [DOK2] Identify first degree AV block by PR interval.
- D2.C5.O2 [DOK2] Differentiate Mobitz I from Mobitz II by PR behavior and dropped beat pattern.
- D2.C5.O3 [DOK2] Identify third degree block by AV dissociation and independent atrial and ventricular rates.
- D2.C5.O4 [DOK3] Determine which blocks carry a risk of progression and require pacing readiness.

**D2.C6 Artifact, troubleshooting, and monitoring practice**
- D2.C6.O1 [DOK2] Distinguish artifact from true dysrhythmia using lead comparison and patient correlation.
- D2.C6.O2 [DOK2] Troubleshoot poor tracing quality including electrode placement, skin prep, and cable issues.
- D2.C6.O3 [DOK3] Decide when a monitored change requires patient assessment before any documentation or intervention.

---

### D3. Coronary Artery Disease
Weight 12. Level I.

**D3.C1 Atherosclerosis and risk stratification**
- D3.C1.O1 [DOK1] Describe the stages of atherosclerotic plaque development.
- D3.C1.O2 [DOK2] Differentiate modifiable from non-modifiable risk factors and rank their contribution.
- D3.C1.O3 [DOK2] Explain plaque rupture and thrombus formation as the mechanism converting stable disease to an acute event.
- D3.C1.O4 [DOK2] Apply a cardiovascular risk assessment tool to a patient profile.

**D3.C2 The angina to ACS spectrum**
- D3.C2.O1 [DOK2] Differentiate stable angina, unstable angina, NSTEMI, and STEMI by symptom pattern, biomarker, and ECG.
- D3.C2.O2 [DOK2] Recognize Prinzmetal variant angina and its distinguishing feature.
- D3.C2.O3 [DOK3] Classify a presenting patient into the correct point on the spectrum from combined data.
- D3.C2.O4 [DOK3] Identify presentations where the absence of chest pain does not exclude ACS.

**D3.C3 Biomarkers and diagnostic workup**
- D3.C3.O1 [DOK1] Identify the cardiac biomarkers used in ACS evaluation and their release timing.
- D3.C3.O2 [DOK2] Interpret serial high-sensitivity troponin values including delta change.
- D3.C3.O3 [DOK2] Distinguish troponin elevation from myocardial infarction versus other causes of myocardial injury.
- D3.C3.O4 [DOK3] Sequence the diagnostic workup for a patient presenting with undifferentiated chest pain.

**D3.C4 Acute management**
- D3.C4.O1 [DOK1] Identify the initial pharmacologic interventions for suspected ACS.
- D3.C4.O2 [DOK2] Compare primary PCI with fibrinolytic therapy including door-to-balloon and door-to-needle targets.
- D3.C4.O3 [DOK2] Identify absolute and relative contraindications to fibrinolysis.
- D3.C4.O4 [DOK3] Prioritize nursing interventions in the first ten minutes of a suspected STEMI.
- D3.C4.O5 [DOK3] Recognize and respond to mechanical and electrical complications of MI including cardiogenic shock, papillary muscle rupture, and reperfusion dysrhythmias.

**D3.C5 Secondary prevention**
- D3.C5.O1 [DOK1] Identify the guideline-directed medication classes for post-MI secondary prevention.
- D3.C5.O2 [DOK2] Explain the phases of cardiac rehabilitation and the criteria for entry.
- D3.C5.O3 [DOK3] Build a discharge teaching plan addressing adherence barriers for a specific patient profile.

---

### D4. Hypertension
Weight 8. Level I.

**D4.C1 Measurement and classification**
- D4.C1.O1 [DOK1] State the current blood pressure categories and their thresholds.
- D4.C1.O2 [DOK2] Identify the technique errors that produce falsely high or falsely low readings.
- D4.C1.O3 [DOK2] Interpret ambulatory and home monitoring data including white coat and masked hypertension.
- D4.C1.O4 [DOK2] Explain orthostatic measurement technique and interpret a positive result.

**D4.C2 Primary and secondary hypertension**
- D4.C2.O1 [DOK2] Describe the mechanisms contributing to primary hypertension including RAAS and sympathetic activity.
- D4.C2.O2 [DOK2] Identify clinical clues suggesting a secondary cause.
- D4.C2.O3 [DOK2] Match common secondary causes to their diagnostic test.
- D4.C2.O4 [DOK3] Recognize resistant hypertension and identify the workup it triggers.

**D4.C3 Pharmacologic management**
- D4.C3.O1 [DOK1] Identify first-line antihypertensive drug classes.
- D4.C3.O2 [DOK2] Match antihypertensive selection to comorbidity including diabetes, chronic kidney disease, heart failure, and pregnancy.
- D4.C3.O3 [DOK2] Identify the key adverse effects and monitoring parameters for each first-line class.
- D4.C3.O4 [DOK3] Evaluate a regimen for redundant mechanisms or a missing indicated agent.

**D4.C4 Lifestyle intervention and adherence**
- D4.C4.O1 [DOK1] Identify evidence-based lifestyle modifications and their approximate BP effect.
- D4.C4.O2 [DOK2] Apply DASH principles to a patient's actual eating pattern.
- D4.C4.O3 [DOK3] Identify adherence barriers and select an intervention matched to the barrier rather than to the behavior.

**D4.C5 Hypertensive urgency and emergency**
- D4.C5.O1 [DOK2] Differentiate hypertensive urgency from emergency by end-organ involvement.
- D4.C5.O2 [DOK2] Identify the target organs assessed in a hypertensive emergency.
- D4.C5.O3 [DOK3] Explain why blood pressure is lowered gradually and state the accepted first-hour reduction target.
- D4.C5.O4 [DOK3] Select an intravenous agent appropriate to the specific end-organ presentation.

---

### D5. Cardiomyopathy
Weight 8. Level I.

**D5.C1 Classification**
- D5.C1.O1 [DOK1] Differentiate dilated, hypertrophic, and restrictive cardiomyopathy by structural change.
- D5.C1.O2 [DOK2] Identify arrhythmogenic right ventricular, takotsubo, and peripartum cardiomyopathy by presentation.
- D5.C1.O3 [DOK2] Match each type to its characteristic hemodynamic consequence.

**D5.C2 Pathophysiology to presentation**
- D5.C2.O1 [DOK2] Explain how outflow tract obstruction produces symptoms in hypertrophic cardiomyopathy.
- D5.C2.O2 [DOK2] Explain why restrictive physiology produces diastolic rather than systolic failure.
- D5.C2.O3 [DOK3] Predict which maneuvers and volume states worsen an obstructive murmur and explain the mechanism.
- D5.C2.O4 [DOK3] Connect a presenting symptom set to the most likely cardiomyopathy type.

**D5.C3 Diagnostic evaluation**
- D5.C3.O1 [DOK1] Identify echocardiographic findings characteristic of each type.
- D5.C3.O2 [DOK2] Interpret ECG findings associated with hypertrophic cardiomyopathy.
- D5.C3.O3 [DOK2] Identify the role of cardiac MRI, biopsy, and genetic testing.

**D5.C4 Management and counseling**
- D5.C4.O1 [DOK2] Identify medication classes indicated and contraindicated in hypertrophic cardiomyopathy.
- D5.C4.O2 [DOK2] Describe septal reduction options and their candidacy criteria.
- D5.C4.O3 [DOK3] Counsel on activity restriction, family screening, and pregnancy considerations for a specific type.

**D5.C5 Sudden cardiac death risk**
- D5.C5.O1 [DOK2] Identify the risk markers for sudden cardiac death in cardiomyopathy.
- D5.C5.O2 [DOK3] Determine ICD candidacy from a risk profile and explain the reasoning to a patient.

---

### D6. Heart Failure
Weight 14. Level I. Highest-weight domain.

**D6.C1 Classification and staging**
- D6.C1.O1 [DOK1] Differentiate HFrEF, HFmrEF, and HFpEF by ejection fraction range.
- D6.C1.O2 [DOK2] Differentiate the ACC/AHA stages from the NYHA functional classes and explain what each is for.
- D6.C1.O3 [DOK2] Distinguish left-sided from right-sided failure by symptom pattern.
- D6.C1.O4 [DOK3] Assign stage and class to a patient case and identify what would change each.

**D6.C2 Compensatory mechanisms**
- D6.C2.O1 [DOK2] Describe RAAS activation and its short-term benefit and long-term harm.
- D6.C2.O2 [DOK2] Describe sympathetic activation and its effect on afterload and myocardial oxygen demand.
- D6.C2.O3 [DOK2] Explain the Frank-Starling relationship in the failing ventricle.
- D6.C2.O4 [DOK3] Explain ventricular remodeling and connect each GDMT pillar to the mechanism it interrupts.
- D6.C2.O5 [DOK2] Interpret natriuretic peptide values including the conditions that raise and lower them independent of heart failure.

**D6.C3 Volume and congestion assessment**
- D6.C3.O1 [DOK1] Identify the bedside signs of volume overload.
- D6.C3.O2 [DOK2] Interpret daily weight trends and set the threshold that triggers a call.
- D6.C3.O3 [DOK2] Assess for congestion versus hypoperfusion and place a patient in the warm-wet, cold-wet, warm-dry, cold-dry framework.
- D6.C3.O4 [DOK3] Select the management priority indicated by each of the four profiles.

**D6.C4 Guideline-directed medical therapy**
- D6.C4.O1 [DOK1] Identify the four pillars of GDMT for HFrEF.
- D6.C4.O2 [DOK2] State the monitoring parameters and key adverse effects for each pillar.
- D6.C4.O3 [DOK2] Explain the required washout when transitioning from an ACE inhibitor to an ARNI.
- D6.C4.O4 [DOK3] Sequence GDMT initiation and titration when blood pressure, potassium, or renal function limits the plan.
- D6.C4.O5 [DOK2] Identify management differences for HFpEF relative to HFrEF.

**D6.C5 Acute decompensated heart failure**
- D6.C5.O1 [DOK2] Identify the common precipitants of acute decompensation.
- D6.C5.O2 [DOK2] Describe initial management of acute pulmonary edema including positioning, oxygenation, and diuresis.
- D6.C5.O3 [DOK3] Differentiate diuretic resistance from inadequate dosing and select the next step.
- D6.C5.O4 [DOK3] Recognize progression to cardiogenic shock and identify the escalation pathway.

**D6.C6 Self-care, transitions, and advanced therapy**
- D6.C6.O1 [DOK1] Identify the components of a heart failure self-care plan.
- D6.C6.O2 [DOK2] Explain sodium and fluid guidance in terms a patient can act on.
- D6.C6.O3 [DOK3] Design a transition-of-care plan targeting the specific readmission drivers in a given case.
- D6.C6.O4 [DOK2] Identify criteria for advanced therapy referral including transplant and durable mechanical support.
- D6.C6.O5 [DOK3] Recognize when palliative care conversation is indicated and describe how to open it.

---

### D7. Non-Invasive and Interventional Cardiology
Weight 10. Level I.

**D7.C1 Non-invasive test selection and preparation**
- D7.C1.O1 [DOK1] Identify what transthoracic echocardiography measures and its common indications.
- D7.C1.O2 [DOK2] Differentiate exercise, pharmacologic, and nuclear stress testing by indication.
- D7.C1.O3 [DOK2] Identify preparation requirements and held medications for each test.
- D7.C1.O4 [DOK2] Identify the role of coronary CT angiography, calcium scoring, and cardiac MRI.
- D7.C1.O5 [DOK3] Select the most appropriate non-invasive test for a specific patient and clinical question.

**D7.C2 Cardiac catheterization and PCI**
- D7.C2.O1 [DOK1] Differentiate diagnostic catheterization from percutaneous coronary intervention.
- D7.C2.O2 [DOK2] Identify pre-procedure assessment priorities including renal function, allergy, and anticoagulation status.
- D7.C2.O3 [DOK2] Compare radial and femoral access by complication profile and recovery requirement.
- D7.C2.O4 [DOK2] Differentiate bare metal, drug-eluting, and bioresorbable stents by antiplatelet duration.

**D7.C3 Post-procedure care and complications**
- D7.C3.O1 [DOK2] Describe access site assessment and the findings that indicate hematoma, pseudoaneurysm, or retroperitoneal bleed.
- D7.C3.O2 [DOK2] Identify activity, positioning, and hydration requirements after each access route.
- D7.C3.O3 [DOK3] Recognize acute stent thrombosis and differentiate it from expected post-procedure discomfort.
- D7.C3.O4 [DOK3] Prioritize response to a post-catheterization patient with hypotension and back pain.

**D7.C4 Contrast and radiation safety**
- D7.C4.O1 [DOK1] Identify risk factors for contrast-associated acute kidney injury.
- D7.C4.O2 [DOK2] Describe prevention strategies including hydration and contrast volume limitation.
- D7.C4.O3 [DOK2] Identify metformin and nephrotoxic medication management around contrast exposure.
- D7.C4.O4 [DOK1] State the principles of radiation protection for staff and patient.

**D7.C5 Structural and electrophysiology procedures**
- D7.C5.O1 [DOK1] Identify the indications for TAVR, MitraClip, and left atrial appendage occlusion.
- D7.C5.O2 [DOK2] Describe nursing priorities after a structural heart intervention including conduction monitoring.
- D7.C5.O3 [DOK2] Identify the indications for and post-procedure care following catheter ablation.

---

### D8. Heart Sounds and Valvular Disorders
Weight 10. Level II.

**D8.C1 Systematic auscultation and timing**
- D8.C1.O1 [DOK2] Time a sound to systole or diastole using a simultaneous pulse or a tracing.
- D8.C1.O2 [DOK2] Use bell and diaphragm appropriately for frequency and describe why.
- D8.C1.O3 [DOK2] Apply positioning and respiratory maneuvers to accentuate a target finding.

**D8.C2 Extra sounds**
- D8.C2.O1 [DOK2] Identify S3 and state what it indicates in a patient over forty.
- D8.C2.O2 [DOK2] Identify S4 and relate it to ventricular compliance.
- D8.C2.O3 [DOK2] Distinguish a pericardial friction rub from a murmur.
- D8.C2.O4 [DOK2] Identify ejection clicks, opening snaps, and prosthetic valve sounds.

**D8.C3 Murmur characterization**
- D8.C3.O1 [DOK1] Grade murmur intensity on the standard six-point scale.
- D8.C3.O2 [DOK2] Describe a murmur by timing, shape, location, radiation, pitch, and quality.
- D8.C3.O3 [DOK3] Predict how Valsalva, squatting, standing, and handgrip change a specific murmur and explain the loading mechanism.
- D8.C3.O4 [DOK3] Differentiate an innocent murmur from one requiring workup.

**D8.C4 Stenotic lesions**
- D8.C4.O1 [DOK2] Identify aortic stenosis by murmur characteristics and its symptom triad.
- D8.C4.O2 [DOK2] Identify mitral stenosis by murmur characteristics and its association with atrial fibrillation.
- D8.C4.O3 [DOK2] Describe the pressure and chamber consequences of each stenotic lesion.
- D8.C4.O4 [DOK3] Explain why preload reduction is hazardous in severe aortic stenosis.

**D8.C5 Regurgitant lesions**
- D8.C5.O1 [DOK2] Identify mitral regurgitation and aortic regurgitation by murmur characteristics.
- D8.C5.O2 [DOK2] Differentiate acute from chronic regurgitation by presentation and tolerance.
- D8.C5.O3 [DOK2] Identify tricuspid regurgitation and its peripheral findings.
- D8.C5.O4 [DOK3] Explain how afterload reduction helps regurgitant lesions and harms stenotic ones.

**D8.C6 Valve intervention and ongoing management**
- D8.C6.O1 [DOK2] Compare mechanical and bioprosthetic valves by durability and anticoagulation requirement.
- D8.C6.O2 [DOK2] Identify target INR ranges and bridging considerations for mechanical valves.
- D8.C6.O3 [DOK2] Identify infective endocarditis risk, prophylaxis indications, and presenting signs.
- D8.C6.O4 [DOK3] Recognize prosthetic valve dysfunction and thrombosis and identify the immediate action.

---

### D9. 12-Lead ECG Essentials
Weight 12. Level II. ECG spine E3, E5.

**D9.C1 Acquisition and quality**
- D9.C1.O1 [DOK1] Place limb and precordial leads at the correct anatomic landmarks.
- D9.C1.O2 [DOK2] Recognize misplacement patterns including limb lead reversal and high V1 and V2.
- D9.C1.O3 [DOK2] Identify when posterior and right-sided leads are indicated and where they are placed.

**D9.C2 Axis, intervals, and chamber assessment**
- D9.C2.O1 [DOK2] Determine axis using leads I and aVF and classify deviation.
- D9.C2.O2 [DOK2] Identify criteria for left and right ventricular hypertrophy.
- D9.C2.O3 [DOK2] Identify left and right atrial enlargement patterns.
- D9.C2.O4 [DOK2] Recognize low voltage and electrical alternans and state what each suggests.

**D9.C3 Conduction abnormalities**
- D9.C3.O1 [DOK2] Differentiate right from left bundle branch block using QRS duration and V1 morphology.
- D9.C3.O2 [DOK2] Identify left anterior and left posterior fascicular block.
- D9.C3.O3 [DOK2] Recognize bifascicular and trifascicular patterns and their progression risk.
- D9.C3.O4 [DOK2] Identify pre-excitation and the delta wave.

**D9.C4 Ischemia, injury, and infarction**
- D9.C4.O1 [DOK2] Differentiate ischemia, injury, and infarction by ECG change.
- D9.C4.O2 [DOK2] Identify significant ST elevation and depression using the correct measurement point and thresholds.
- D9.C4.O3 [DOK3] Localize an infarct to anterior, inferior, lateral, septal, or posterior territory and name the likely culprit artery.
- D9.C4.O4 [DOK3] Recognize reciprocal changes and explain why they raise specificity.
- D9.C4.O5 [DOK3] Identify right ventricular infarction from an inferior STEMI and state the management change it forces.

**D9.C5 STEMI equivalents and mimics**
- D9.C5.O1 [DOK3] Apply Sgarbossa criteria to evaluate ischemia in the presence of left bundle branch block or paced rhythm.
- D9.C5.O2 [DOK3] Recognize Wellens pattern and de Winter T waves and state their significance.
- D9.C5.O3 [DOK3] Differentiate acute pericarditis, early repolarization, and takotsubo from STEMI.
- D9.C5.O4 [DOK3] Recognize left main and proximal LAD occlusion patterns.

**D9.C6 Metabolic, drug, and channel patterns**
- D9.C6.O1 [DOK2] Identify the ECG progression of hyperkalemia and the changes of hypokalemia.
- D9.C6.O2 [DOK2] Identify calcium and magnesium derangement patterns.
- D9.C6.O3 [DOK2] Recognize digoxin effect and distinguish it from digoxin toxicity.
- D9.C6.O4 [DOK2] Identify QT prolongation and the drug classes that cause it.
- D9.C6.O5 [DOK3] Recognize Brugada pattern and hypothermia changes and identify the action each requires.

---

### D10. Principles of Oxygenation
Weight 8. Level II.

**D10.C1 Oxygen delivery and consumption**
- D10.C1.O1 [DOK1] State the determinants of oxygen delivery.
- D10.C1.O2 [DOK2] Explain why hemoglobin contributes more to content than dissolved oxygen does.
- D10.C1.O3 [DOK2] Interpret a mixed or central venous oxygen saturation as a supply and demand statement.
- D10.C1.O4 [DOK3] Determine whether a low venous saturation reflects inadequate delivery or excessive consumption and select the intervention.

**D10.C2 The oxyhemoglobin dissociation curve**
- D10.C2.O1 [DOK2] Identify the factors that shift the curve right and left.
- D10.C2.O2 [DOK2] Explain the clinical consequence of each shift for tissue unloading.
- D10.C2.O3 [DOK3] Predict the effect of a specific clinical state such as fever, acidosis, or hypothermia on unloading.

**D10.C3 Arterial blood gas interpretation**
- D10.C3.O1 [DOK1] State the normal ranges for pH, PaCO2, HCO3, PaO2, and base excess.
- D10.C3.O2 [DOK2] Classify a gas as respiratory or metabolic, acidosis or alkalosis.
- D10.C3.O3 [DOK2] Determine compensation status as uncompensated, partial, or full.
- D10.C3.O4 [DOK3] Interpret a mixed disorder and identify the primary derangement.
- D10.C3.O5 [DOK3] Connect a gas result to the cardiac cause producing it and select the intervention.

**D10.C4 Oxygen delivery devices and titration**
- D10.C4.O1 [DOK1] Match each delivery device to its approximate FiO2 range and flow requirement.
- D10.C4.O2 [DOK2] Select a device appropriate to the required FiO2 and the patient's minute ventilation.
- D10.C4.O3 [DOK2] Identify the risks of hyperoxia in the cardiac patient and current saturation targets.
- D10.C4.O4 [DOK2] Describe high flow nasal cannula and noninvasive ventilation indications in cardiogenic pulmonary edema.

**D10.C5 Cardiopulmonary interaction**
- D10.C5.O1 [DOK2] Explain how positive pressure ventilation reduces preload and afterload.
- D10.C5.O2 [DOK3] Predict the hemodynamic effect of increasing PEEP in a hypovolemic versus a congested patient.
- D10.C5.O3 [DOK3] Recognize when respiratory failure is a cardiac problem and adjust the management priority.

---

### D11. Hemodynamic Monitoring
Weight 12. Level II.

**D11.C1 Hemodynamic principles**
- D11.C1.O1 [DOK1] Define preload, afterload, contractility, and compliance.
- D11.C1.O2 [DOK2] Identify the clinical measurements that estimate each.
- D11.C1.O3 [DOK2] Explain how each responds to volume, vasoactive, and inotropic intervention.
- D11.C1.O4 [DOK3] Predict the effect of a single intervention on all four parameters simultaneously.

**D11.C2 Arterial pressure monitoring**
- D11.C2.O1 [DOK2] Describe leveling to the phlebostatic axis and zeroing, and state the error each prevents.
- D11.C2.O2 [DOK2] Identify overdamped and underdamped waveforms and perform a square wave test.
- D11.C2.O3 [DOK2] Interpret the arterial waveform components including the dicrotic notch.
- D11.C2.O4 [DOK3] Reconcile a discrepancy between arterial line and cuff pressure and decide which to act on.
- D11.C2.O5 [DOK2] Interpret pulse pressure variation as a fluid responsiveness indicator and state its validity conditions.

**D11.C3 Central venous and right heart pressures**
- D11.C3.O1 [DOK1] State the normal central venous pressure range.
- D11.C3.O2 [DOK2] Identify the a, c, and v waves and the conditions that distort each.
- D11.C3.O3 [DOK3] Explain the limits of central venous pressure as a preload surrogate.

**D11.C4 Pulmonary artery catheter**
- D11.C4.O1 [DOK1] Identify the pressures measured at each catheter position.
- D11.C4.O2 [DOK2] Recognize the waveform change at each chamber during insertion.
- D11.C4.O3 [DOK2] Interpret pulmonary artery occlusion pressure as a left-sided filling estimate.
- D11.C4.O4 [DOK3] Recognize spontaneous wedge, balloon rupture, and catheter migration and state the immediate action.

**D11.C5 Derived parameters**
- D11.C5.O1 [DOK2] Calculate cardiac output, cardiac index, stroke volume, and stroke volume index.
- D11.C5.O2 [DOK2] Calculate systemic and pulmonary vascular resistance and interpret each.
- D11.C5.O3 [DOK3] Build a complete hemodynamic profile from a set of measured and derived values.

**D11.C6 Shock differentiation**
- D11.C6.O1 [DOK2] Differentiate cardiogenic, hypovolemic, distributive, and obstructive shock by hemodynamic profile.
- D11.C6.O2 [DOK3] Select the intervention priority indicated by each profile.
- D11.C6.O3 [DOK2] Identify minimally invasive and non-invasive cardiac output technologies and their limitations.
- D11.C6.O4 [DOK4] Manage a patient with a mixed shock state across changing hemodynamic data.

---

### D12. Cardiac Assist Device Therapy
Weight 8. Level II.

**D12.C1 Intra-aortic balloon pump**
- D12.C1.O1 [DOK1] State the physiologic goals of counterpulsation.
- D12.C1.O2 [DOK2] Identify correct inflation and deflation timing on the arterial waveform.
- D12.C1.O3 [DOK3] Recognize early inflation, late inflation, early deflation, and late deflation and state the consequence of each.
- D12.C1.O4 [DOK2] Identify contraindications including aortic regurgitation and aortic dissection.
- D12.C1.O5 [DOK2] Perform the nursing assessment specific to balloon pump therapy including limb perfusion and position verification.

**D12.C2 Percutaneous ventricular assist devices**
- D12.C2.O1 [DOK1] Describe how a microaxial flow pump unloads the ventricle.
- D12.C2.O2 [DOK2] Interpret placement signal and motor current alarms.
- D12.C2.O3 [DOK2] Identify hemolysis, suction events, and migration and state the response.

**D12.C3 Durable left ventricular assist devices**
- D12.C3.O1 [DOK1] Identify the components of a durable LVAD system.
- D12.C3.O2 [DOK2] Explain why many LVAD patients have no palpable pulse and how blood pressure is obtained.
- D12.C3.O3 [DOK2] Interpret flow, speed, power, and pulsatility index parameters.
- D12.C3.O4 [DOK3] Differentiate pump thrombosis, suction event, and right ventricular failure from the parameter pattern.
- D12.C3.O5 [DOK2] Describe driveline care and infection surveillance.

**D12.C4 Extracorporeal membrane oxygenation**
- D12.C4.O1 [DOK1] Differentiate venoarterial from venovenous ECMO by circuit and indication.
- D12.C4.O2 [DOK2] Identify circuit components and the nursing assessment for each.
- D12.C4.O3 [DOK3] Recognize differential hypoxemia and state its cause and correction.

**D12.C5 Complications and emergency response**
- D12.C5.O1 [DOK2] Identify anticoagulation targets and bleeding surveillance for each device.
- D12.C5.O2 [DOK3] Determine when chest compressions are and are not appropriate for a device-supported patient.
- D12.C5.O3 [DOK3] Respond to device alarm plus hemodynamic collapse in the correct sequence.

---

### D13. Pacemaker Interpretation
Weight 10. Level II. ECG spine E4.

**D13.C1 Indications and coding**
- D13.C1.O1 [DOK1] Identify the accepted indications for permanent pacing.
- D13.C1.O2 [DOK2] Interpret each position of the NBG pacemaker code.
- D13.C1.O3 [DOK2] Differentiate single chamber, dual chamber, and biventricular systems by lead configuration.

**D13.C2 Modes and timing**
- D13.C2.O1 [DOK2] Describe the behavior of VVI, AAI, DDD, and DOO modes.
- D13.C2.O2 [DOK2] Explain the lower rate limit, AV delay, and upper tracking rate.
- D13.C2.O3 [DOK2] Explain rate-responsive pacing and identify when it is indicated.
- D13.C2.O4 [DOK3] Predict the tracing appearance produced by a given mode and patient rhythm.

**D13.C3 Capture, sensing, and normal function**
- D13.C3.O1 [DOK2] Identify atrial and ventricular pacing spikes and confirm capture.
- D13.C3.O2 [DOK2] Recognize appropriate sensing and inhibition on a tracing.
- D13.C3.O3 [DOK2] Identify fusion and pseudofusion beats and explain why neither is malfunction.

**D13.C4 Malfunction recognition**
- D13.C4.O1 [DOK3] Identify failure to capture and list the causes including lead dislodgement, threshold change, and electrolyte disturbance.
- D13.C4.O2 [DOK3] Identify failure to sense and explain the R-on-T risk it creates.
- D13.C4.O3 [DOK3] Identify oversensing and failure to output and differentiate them on a tracing.
- D13.C4.O4 [DOK3] Recognize pacemaker-mediated tachycardia and state the immediate intervention.

**D13.C5 ICD and cardiac resynchronization**
- D13.C5.O1 [DOK1] Identify primary and secondary prevention ICD indications.
- D13.C5.O2 [DOK2] Describe tiered therapy including antitachycardia pacing and shock.
- D13.C5.O3 [DOK3] Differentiate appropriate from inappropriate shock and state the response to each.
- D13.C5.O4 [DOK2] Identify CRT indications and describe how loss of biventricular pacing is detected.

**D13.C6 Perioperative, temporary, and patient management**
- D13.C6.O1 [DOK2] Describe magnet response for a pacemaker and for an ICD, and explain why they differ.
- D13.C6.O2 [DOK2] Identify sources of electromagnetic interference and the precautions for each.
- D13.C6.O3 [DOK2] Set rate, output, and sensitivity on a temporary external pacer and troubleshoot loss of capture.
- D13.C6.O4 [DOK2] Describe transcutaneous pacing including confirmation of electrical and mechanical capture.
- D13.C6.O5 [DOK2] Teach device precautions, site care, and when to call.

---

### D14. Cardiovascular Pharmacology
Weight 14. Level II. Highest-weight Level II domain, cross-links into every clinical domain.

**D14.C1 Antiplatelet and anticoagulant therapy**
- D14.C1.O1 [DOK1] Identify the antiplatelet agents and their mechanisms.
- D14.C1.O2 [DOK2] State dual antiplatelet therapy duration by stent type and clinical setting.
- D14.C1.O3 [DOK2] Compare unfractionated heparin, low molecular weight heparin, and direct oral anticoagulants by monitoring and reversal.
- D14.C1.O4 [DOK2] Identify the reversal agent for each anticoagulant.
- D14.C1.O5 [DOK3] Recognize heparin-induced thrombocytopenia and state the immediate management change.
- D14.C1.O6 [DOK3] Evaluate bleeding versus thrombotic risk in a patient requiring both antiplatelet and anticoagulant therapy.

**D14.C2 Antiarrhythmic agents**
- D14.C2.O1 [DOK1] Classify antiarrhythmics by Vaughan Williams class and mechanism.
- D14.C2.O2 [DOK2] Identify the indications and loading protocol for amiodarone.
- D14.C2.O3 [DOK2] Identify adenosine indications, administration technique, and expected transient effect.
- D14.C2.O4 [DOK2] State the organ toxicities requiring surveillance for amiodarone and other long-term agents.
- D14.C2.O5 [DOK3] Recognize proarrhythmia and select the agent to avoid in a patient with structural heart disease or prolonged QT.

**D14.C3 Vasoactive and inotropic agents**
- D14.C3.O1 [DOK1] Identify the receptor activity of norepinephrine, epinephrine, dopamine, phenylephrine, and vasopressin.
- D14.C3.O2 [DOK2] Differentiate inotropes from vasopressors by hemodynamic effect.
- D14.C3.O3 [DOK2] Describe dobutamine and milrinone including the renal clearance difference that changes drug selection.
- D14.C3.O4 [DOK3] Select the agent matched to a specific shock profile and justify the choice.
- D14.C3.O5 [DOK3] Titrate to a hemodynamic endpoint and recognize when the endpoint itself is wrong.
- D14.C3.O6 [DOK2] Identify extravasation risk, central access requirements, and the antidote protocol.

**D14.C4 Antihypertensive and antianginal agents**
- D14.C4.O1 [DOK2] Compare nitroglycerin, nitroprusside, nicardipine, clevidipine, and labetalol by onset, effect, and hazard.
- D14.C4.O2 [DOK2] Identify the contraindication to nitrates with phosphodiesterase inhibitors and the reason.
- D14.C4.O3 [DOK2] Differentiate dihydropyridine from non-dihydropyridine calcium channel blockers by clinical effect.
- D14.C4.O4 [DOK3] Select an intravenous agent for a hypertensive emergency based on the affected end organ.

**D14.C5 Heart failure pharmacology**
- D14.C5.O1 [DOK2] Identify the mechanism and monitoring for each GDMT pillar.
- D14.C5.O2 [DOK2] Compare loop, thiazide, and potassium-sparing diuretics and describe sequential nephron blockade.
- D14.C5.O3 [DOK2] Identify digoxin therapeutic range, toxicity signs, and the electrolyte that potentiates toxicity.
- D14.C5.O4 [DOK3] Adjust a heart failure regimen for worsening renal function or hyperkalemia without abandoning the pillars.

**D14.C6 Lipid management**
- D14.C6.O1 [DOK1] Identify statin intensity categories and their LDL reduction targets.
- D14.C6.O2 [DOK2] Identify ezetimibe, PCSK9 inhibitors, and bempedoic acid and when each is added.
- D14.C6.O3 [DOK2] Recognize statin-associated muscle symptoms and describe the evaluation.

**D14.C7 High-alert medication safety**
- D14.C7.O1 [DOK1] Identify the cardiovascular drugs classified as high-alert.
- D14.C7.O2 [DOK2] Describe independent double check, smart pump, and concentration standardization practices.
- D14.C7.O3 [DOK3] Identify the clinically significant cardiovascular drug interactions and the monitoring each requires.
- D14.C7.O4 [DOK4] Reconcile a complete cardiac medication list and identify redundancy, interaction, and a missing indicated agent.

---

## 7. Counts

| Level | Domains | Competencies | Objectives |
|-------|---------|--------------|-----------|
| I, D1 through D7 | 7 | 37 | 147 |
| II adds D8 through D14 | 7 | 41 | 164 |
| **Total** | **14** | **78** | **311** |

Item bank target at four items per objective for adequate dashboard resolution: roughly 1,250 items. At six per objective for a defensible practice exam pool plus spacing, roughly 1,900. The ten practice exams draw from a separate reserved pool of 300, which is not part of those totals.

---

## 8. What is settled and what is not

**Settled.** Domain list and blueprint alignment. Three-tier structure and ID scheme. ECG parallel spine. DOK tagging. Mastery state model with confidence scoring. Rollup and priority math. Progress state colors.

**Open, needs a decision before the question bank starts.**

1. Category percentage weights from ABCM. Request by email. Provisional weights are in place and swappable.
2. Whether the course also serves the ANCC CV-BC exam. If yes, the JSON registry needs a second alignment field per objective, cheap to add now and expensive to retrofit.
3. Items per objective. Four gives resolution, six gives a practice exam pool. This sets the authoring workload.
4. Whether DOK 4 objectives use drawing-based synthesis the way the anatomy courses do, and if so what the capture mechanism is in a self-paced online context.
5. Whether the review course is timed cohort or fully self-paced, which determines whether spacing intervals are anchored to an exam date or to a rolling window.

---

## 9. Files

- `cvrn-competency-framework.md` This document. The human-readable spec.
- `cvrn-competencies.json` The machine-readable registry. Same content, structured for the dashboard and the item bank. Every objective carries id, text, dok, domain, competency, ecg_strand, prerequisites, and provisional weight.

Prepared by Dr. Sharilyn Rennie

---

## 10. ANCC CV-BC alignment, added August 13, 2026

The ANCC Cardiac-Vascular Nursing test content outline, effective December 5, 2024, is a different credential from the ABCM CVRN-BC and uses a different frame. It is worth stating plainly because study guide marketing conflates the two.

**ANCC CV-BC.** 150 items, 125 scored, 25 unscored pretest items that cannot be distinguished from scored ones. Four categories, organized by nursing process rather than by disease.

| Category | Content domain | Items | Percent |
|---|---|---|---|
| I | Assessment and Diagnosis | 27 | 22 |
| II | Planning and Implementation | 44 | 35 |
| III | Evaluation and Modification | 23 | 18 |
| IV | Patient and Community Education | 31 | 25 |
| | **Total** | **125** | **100** |

Every competency in `cvrn-competencies.js` now carries `anccPrimary`, `anccAlso`, and `anccWeight`, so one map serves both exams. Current distribution of the 78 competencies by primary ANCC category: I has 26, II has 28, III has 16, IV has 8.

### The gap that exposes

Eight competencies carrying 25 percent of the ANCC score is not enough. Patient and community education needs a dedicated strand, not a few objectives tucked inside heart failure self-care and secondary prevention. It should cover health literacy and teaching barriers, outpatient cardiac rehabilitation, anticoagulation clinic teaching, daily weight and blood pressure self-monitoring, community resources, remote telemetry and point-of-care testing, and health promotion. This is an addition to the map, not a rewrite of it.

### The failure pattern the course is built against

The common way a strong bedside nurse fails this exam is over-reliance on daily cardiac experience across two blocks that together carry 60 percent of the score.

**Patient and Community Education, 25 percent.** Outpatient rehab, anticoagulation clinic teaching, self-monitoring, health literacy, and community risk reduction. Inpatient-focused candidates rarely encounter this content, because it lives downstream of discharge. Response: education gets its own strand, its own dashboard tile, and scored practice at the same depth as ECG, so a learner strong everywhere else sees exactly where the hole is.

**Planning and Implementation, 35 percent.** ACC and AHA guideline framings of STEMI and NSTEMI, heart failure, hypertension, and atrial fibrillation anticoagulation. Working nurses apply these pathways constantly without ever studying them as pathways. They know what happens on their unit; the exam asks what the guideline says and why. Response: items in this block are written at DOK 3 to surface the decision rule rather than the local protocol step. Why this threshold, what changes the answer, what the alternative is when the first pathway is contraindicated.

Two design consequences follow. The gap finder does not trust self-rating alone, because experience inflates self-assessment in exactly these two blocks; pass two tests the heaviest domains regardless of how the learner rated them. And the confident-and-incorrect flag matters more here than in any other population, because these are candidates who are genuinely good at their jobs.

### Status

Settled: the course targets the ABCM CVRN-BC. The ANCC tags stay live and the dashboard reports a secondary ANCC readiness figure from the same evidence, which will read low against Domain IV until the education strand is built. That figure is deliberately left honest rather than suppressed, so the option to serve ANCC candidates later stays cheap.
