/* ============================================================
   ECG & CVRN Review Course
   Competency map, source of truth for CVRN Mastery OS.

   Aligned to the ABCM CVRN-BC exam categories.
   Level 1 = Non-Acute Care (150 items, D1-D7)
   Level 2 = Acute Care (200 items, D1-D14)

   Fields per competency: id, domain, domainName, level,
   domainWeight, ecg, name, can, dok, yield, est (minutes),
   objectives[{id, dok, can}].

   ABCM weights are per level and sum to 100 within each level:
   weightL1 across the 7 Level I categories, weightL2 across all
   14. Coronary Artery Disease 22% and Heart Failure 20% at
   Level I are reported figures. Everything else is PROVISIONAL
   pending the ABCM detailed study list. ABCM publishes the category
   list but not percentage weights. Replace domainWeight when
   the detailed study list arrives; nothing else needs to change.

   ANCC alignment: every competency also carries anccPrimary
   (I Assessment, II Planning, III Evaluation, IV Education),
   anccAlso, and anccWeight, so the same map can be re-weighted
   for an ANCC CV-BC candidate without re-authoring content.
   ============================================================ */
window.CVRN_COMPETENCIES = [
 {
  "id": "D1.C1",
  "domain": "D1",
  "domainName": "Bedside Assessment",
  "level": 1,
  "domainWeight": 10,
  "ecg": [],
  "name": "Cardiac history and symptom analysis",
  "can": "Identify the components of a focused cardiovascular history including risk factors, family history, and functional baseline.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D1.C1.O1",
    "dok": 1,
    "can": "Identify the components of a focused cardiovascular history including risk factors, family history, and functional baseline."
   },
   {
    "id": "D1.C1.O2",
    "dok": 2,
    "can": "Characterize chest discomfort using onset, provocation, quality, radiation, severity, and timing."
   },
   {
    "id": "D1.C1.O3",
    "dok": 2,
    "can": "Distinguish anginal from non-anginal chest pain presentations."
   },
   {
    "id": "D1.C1.O4",
    "dok": 3,
    "can": "Recognize atypical presentations in women, older adults, and patients with diabetes, and adjust the assessment accordingly."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 10,
  "weightL2": 6
 },
 {
  "id": "D1.C2",
  "domain": "D1",
  "domainName": "Bedside Assessment",
  "level": 1,
  "domainWeight": 10,
  "ecg": [],
  "name": "Inspection, palpation, and precordial assessment",
  "can": "Locate the point of maximal impulse and the standard precordial landmarks.",
  "dok": 2,
  "yield": "support",
  "est": 50,
  "objectives": [
   {
    "id": "D1.C2.O1",
    "dok": 1,
    "can": "Locate the point of maximal impulse and the standard precordial landmarks."
   },
   {
    "id": "D1.C2.O2",
    "dok": 2,
    "can": "Interpret a displaced or sustained apical impulse in terms of chamber change."
   },
   {
    "id": "D1.C2.O3",
    "dok": 2,
    "can": "Assess jugular venous pressure and describe what an elevation indicates."
   },
   {
    "id": "D1.C2.O4",
    "dok": 2,
    "can": "Identify peripheral signs of chronic cardiac disease including clubbing, cyanosis, and dependent edema."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 10,
  "weightL2": 6
 },
 {
  "id": "D1.C3",
  "domain": "D1",
  "domainName": "Bedside Assessment",
  "level": 1,
  "domainWeight": 10,
  "ecg": [],
  "name": "Auscultation fundamentals",
  "can": "Name the five auscultatory areas and the valve each best transmits.",
  "dok": 2,
  "yield": "support",
  "est": 50,
  "objectives": [
   {
    "id": "D1.C3.O1",
    "dok": 1,
    "can": "Name the five auscultatory areas and the valve each best transmits."
   },
   {
    "id": "D1.C3.O2",
    "dok": 2,
    "can": "Differentiate S1 from S2 and relate each to the cardiac cycle."
   },
   {
    "id": "D1.C3.O3",
    "dok": 2,
    "can": "Recognize physiologic splitting of S2 and distinguish it from pathologic splitting."
   },
   {
    "id": "D1.C3.O4",
    "dok": 2,
    "can": "Describe a technique for isolating a soft sound, including positioning and respiratory maneuvers."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 10,
  "weightL2": 6
 },
 {
  "id": "D1.C4",
  "domain": "D1",
  "domainName": "Bedside Assessment",
  "level": 1,
  "domainWeight": 10,
  "ecg": [],
  "name": "Peripheral vascular and perfusion assessment",
  "can": "Identify and grade peripheral pulses using a standard scale.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D1.C4.O1",
    "dok": 1,
    "can": "Identify and grade peripheral pulses using a standard scale."
   },
   {
    "id": "D1.C4.O2",
    "dok": 2,
    "can": "Perform and interpret an ankle-brachial index."
   },
   {
    "id": "D1.C4.O3",
    "dok": 2,
    "can": "Differentiate arterial from venous insufficiency by exam findings."
   },
   {
    "id": "D1.C4.O4",
    "dok": 3,
    "can": "Integrate perfusion findings with vital signs to estimate adequacy of cardiac output at the bedside."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 10,
  "weightL2": 6
 },
 {
  "id": "D1.C5",
  "domain": "D1",
  "domainName": "Bedside Assessment",
  "level": 1,
  "domainWeight": 10,
  "ecg": [],
  "name": "Recognition of decompensation and escalation",
  "can": "Identify early bedside indicators of hemodynamic deterioration.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D1.C5.O1",
    "dok": 2,
    "can": "Identify early bedside indicators of hemodynamic deterioration."
   },
   {
    "id": "D1.C5.O2",
    "dok": 3,
    "can": "Prioritize assessment findings that require immediate escalation over those that require monitoring."
   },
   {
    "id": "D1.C5.O3",
    "dok": 3,
    "can": "Communicate a deteriorating cardiac patient using a structured handoff format."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": 10,
  "weightL2": 6
 },
 {
  "id": "D2.C1",
  "domain": "D2",
  "domainName": "Basic ECG Essentials",
  "level": 1,
  "domainWeight": 14,
  "ecg": [
   "E1",
   "E2"
  ],
  "name": "Lead systems, waveform components, and measurement",
  "can": "Identify P wave, QRS complex, T wave, U wave, and the PR, QRS, QT intervals on a tracing.",
  "dok": 2,
  "yield": "core",
  "est": 58,
  "objectives": [
   {
    "id": "D2.C1.O1",
    "dok": 1,
    "can": "Identify P wave, QRS complex, T wave, U wave, and the PR, QRS, QT intervals on a tracing."
   },
   {
    "id": "D2.C1.O2",
    "dok": 1,
    "can": "State the standard calibration, paper speed, and the time and voltage value of each grid box."
   },
   {
    "id": "D2.C1.O3",
    "dok": 2,
    "can": "Measure PR, QRS, and QT intervals and classify each as normal or prolonged."
   },
   {
    "id": "D2.C1.O4",
    "dok": 2,
    "can": "Calculate corrected QT and identify the threshold that raises torsades risk."
   },
   {
    "id": "D2.C1.O5",
    "dok": 2,
    "can": "Relate each waveform component to the underlying electrical event in the conduction system."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 14,
  "weightL2": 8
 },
 {
  "id": "D2.C2",
  "domain": "D2",
  "domainName": "Basic ECG Essentials",
  "level": 1,
  "domainWeight": 14,
  "ecg": [
   "E1",
   "E2"
  ],
  "name": "Rate determination and sinus rhythms",
  "can": "Calculate heart rate using the sequence method and the six-second method, and select the correct method for regular versus irregular rhythms.",
  "dok": 3,
  "yield": "core",
  "est": 64,
  "objectives": [
   {
    "id": "D2.C2.O1",
    "dok": 2,
    "can": "Calculate heart rate using the sequence method and the six-second method, and select the correct method for regular versus irregular rhythms."
   },
   {
    "id": "D2.C2.O2",
    "dok": 2,
    "can": "Identify normal sinus rhythm, sinus bradycardia, sinus tachycardia, and sinus arrhythmia."
   },
   {
    "id": "D2.C2.O3",
    "dok": 2,
    "can": "Recognize sinus arrest, sinus exit block, and sick sinus syndrome patterns."
   },
   {
    "id": "D2.C2.O4",
    "dok": 3,
    "can": "Determine whether a bradycardia is symptomatic and select the indicated first intervention."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 14,
  "weightL2": 8
 },
 {
  "id": "D2.C3",
  "domain": "D2",
  "domainName": "Basic ECG Essentials",
  "level": 1,
  "domainWeight": 14,
  "ecg": [
   "E1",
   "E2"
  ],
  "name": "Atrial dysrhythmias",
  "can": "Identify premature atrial contractions and distinguish conducted from non-conducted beats.",
  "dok": 3,
  "yield": "core",
  "est": 100,
  "objectives": [
   {
    "id": "D2.C3.O1",
    "dok": 2,
    "can": "Identify premature atrial contractions and distinguish conducted from non-conducted beats."
   },
   {
    "id": "D2.C3.O2",
    "dok": 2,
    "can": "Identify atrial flutter and estimate the conduction ratio."
   },
   {
    "id": "D2.C3.O3",
    "dok": 2,
    "can": "Identify atrial fibrillation and describe the two features that define it."
   },
   {
    "id": "D2.C3.O4",
    "dok": 2,
    "can": "Identify supraventricular tachycardia and multifocal atrial tachycardia."
   },
   {
    "id": "D2.C3.O5",
    "dok": 3,
    "can": "Differentiate SVT with aberrancy from ventricular tachycardia and justify the distinction."
   },
   {
    "id": "D2.C3.O6",
    "dok": 3,
    "can": "Select rate control, rhythm control, or anticoagulation priorities for new atrial fibrillation based on stability and duration."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 14,
  "weightL2": 8
 },
 {
  "id": "D2.C4",
  "domain": "D2",
  "domainName": "Basic ECG Essentials",
  "level": 1,
  "domainWeight": 14,
  "ecg": [
   "E1",
   "E2"
  ],
  "name": "Junctional and ventricular dysrhythmias",
  "can": "Identify junctional rhythm, accelerated junctional rhythm, and junctional tachycardia by P wave relationship.",
  "dok": 3,
  "yield": "core",
  "est": 78,
  "objectives": [
   {
    "id": "D2.C4.O1",
    "dok": 2,
    "can": "Identify junctional rhythm, accelerated junctional rhythm, and junctional tachycardia by P wave relationship."
   },
   {
    "id": "D2.C4.O2",
    "dok": 2,
    "can": "Identify premature ventricular contractions and classify them as unifocal, multifocal, coupled, or R-on-T."
   },
   {
    "id": "D2.C4.O3",
    "dok": 2,
    "can": "Identify monomorphic ventricular tachycardia, polymorphic VT, and torsades de pointes."
   },
   {
    "id": "D2.C4.O4",
    "dok": 2,
    "can": "Identify ventricular fibrillation, idioventricular rhythm, and asystole."
   },
   {
    "id": "D2.C4.O5",
    "dok": 3,
    "can": "Match each lethal or pre-lethal rhythm to its immediate intervention including defibrillation, synchronized cardioversion, or pacing."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 14,
  "weightL2": 8
 },
 {
  "id": "D2.C5",
  "domain": "D2",
  "domainName": "Basic ECG Essentials",
  "level": 1,
  "domainWeight": 14,
  "ecg": [
   "E1",
   "E2"
  ],
  "name": "AV block recognition",
  "can": "Identify first degree AV block by PR interval.",
  "dok": 3,
  "yield": "core",
  "est": 64,
  "objectives": [
   {
    "id": "D2.C5.O1",
    "dok": 2,
    "can": "Identify first degree AV block by PR interval."
   },
   {
    "id": "D2.C5.O2",
    "dok": 2,
    "can": "Differentiate Mobitz I from Mobitz II by PR behavior and dropped beat pattern."
   },
   {
    "id": "D2.C5.O3",
    "dok": 2,
    "can": "Identify third degree block by AV dissociation and independent atrial and ventricular rates."
   },
   {
    "id": "D2.C5.O4",
    "dok": 3,
    "can": "Determine which blocks carry a risk of progression and require pacing readiness."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 14,
  "weightL2": 8
 },
 {
  "id": "D2.C6",
  "domain": "D2",
  "domainName": "Basic ECG Essentials",
  "level": 1,
  "domainWeight": 14,
  "ecg": [
   "E1",
   "E2"
  ],
  "name": "Artifact, troubleshooting, and monitoring practice",
  "can": "Distinguish artifact from true dysrhythmia using lead comparison and patient correlation.",
  "dok": 3,
  "yield": "core",
  "est": 50,
  "objectives": [
   {
    "id": "D2.C6.O1",
    "dok": 2,
    "can": "Distinguish artifact from true dysrhythmia using lead comparison and patient correlation."
   },
   {
    "id": "D2.C6.O2",
    "dok": 2,
    "can": "Troubleshoot poor tracing quality including electrode placement, skin prep, and cable issues."
   },
   {
    "id": "D2.C6.O3",
    "dok": 3,
    "can": "Decide when a monitored change requires patient assessment before any documentation or intervention."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 14,
  "weightL2": 8
 },
 {
  "id": "D3.C1",
  "domain": "D3",
  "domainName": "Coronary Artery Disease",
  "level": 1,
  "domainWeight": 22,
  "ecg": [],
  "name": "Atherosclerosis and risk stratification",
  "can": "Describe the stages of atherosclerotic plaque development.",
  "dok": 2,
  "yield": "core",
  "est": 50,
  "objectives": [
   {
    "id": "D3.C1.O1",
    "dok": 1,
    "can": "Describe the stages of atherosclerotic plaque development."
   },
   {
    "id": "D3.C1.O2",
    "dok": 2,
    "can": "Differentiate modifiable from non-modifiable risk factors and rank their contribution."
   },
   {
    "id": "D3.C1.O3",
    "dok": 2,
    "can": "Explain plaque rupture and thrombus formation as the mechanism converting stable disease to an acute event."
   },
   {
    "id": "D3.C1.O4",
    "dok": 2,
    "can": "Apply a cardiovascular risk assessment tool to a patient profile."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "I",
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 22,
  "weightL2": 14
 },
 {
  "id": "D3.C2",
  "domain": "D3",
  "domainName": "Coronary Artery Disease",
  "level": 1,
  "domainWeight": 22,
  "ecg": [],
  "name": "The angina to ACS spectrum",
  "can": "Differentiate stable angina, unstable angina, NSTEMI, and STEMI by symptom pattern, biomarker, and ECG.",
  "dok": 3,
  "yield": "core",
  "est": 72,
  "objectives": [
   {
    "id": "D3.C2.O1",
    "dok": 2,
    "can": "Differentiate stable angina, unstable angina, NSTEMI, and STEMI by symptom pattern, biomarker, and ECG."
   },
   {
    "id": "D3.C2.O2",
    "dok": 2,
    "can": "Recognize Prinzmetal variant angina and its distinguishing feature."
   },
   {
    "id": "D3.C2.O3",
    "dok": 3,
    "can": "Classify a presenting patient into the correct point on the spectrum from combined data."
   },
   {
    "id": "D3.C2.O4",
    "dok": 3,
    "can": "Identify presentations where the absence of chest pain does not exclude ACS."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "I",
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 22,
  "weightL2": 14
 },
 {
  "id": "D3.C3",
  "domain": "D3",
  "domainName": "Coronary Artery Disease",
  "level": 1,
  "domainWeight": 22,
  "ecg": [],
  "name": "Biomarkers and diagnostic workup",
  "can": "Identify the cardiac biomarkers used in ACS evaluation and their release timing.",
  "dok": 3,
  "yield": "core",
  "est": 58,
  "objectives": [
   {
    "id": "D3.C3.O1",
    "dok": 1,
    "can": "Identify the cardiac biomarkers used in ACS evaluation and their release timing."
   },
   {
    "id": "D3.C3.O2",
    "dok": 2,
    "can": "Interpret serial high-sensitivity troponin values including delta change."
   },
   {
    "id": "D3.C3.O3",
    "dok": 2,
    "can": "Distinguish troponin elevation from myocardial infarction versus other causes of myocardial injury."
   },
   {
    "id": "D3.C3.O4",
    "dok": 3,
    "can": "Sequence the diagnostic workup for a patient presenting with undifferentiated chest pain."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "I",
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 22,
  "weightL2": 14
 },
 {
  "id": "D3.C4",
  "domain": "D3",
  "domainName": "Coronary Artery Disease",
  "level": 1,
  "domainWeight": 22,
  "ecg": [],
  "name": "Acute management",
  "can": "Identify the initial pharmacologic interventions for suspected ACS.",
  "dok": 3,
  "yield": "core",
  "est": 80,
  "objectives": [
   {
    "id": "D3.C4.O1",
    "dok": 1,
    "can": "Identify the initial pharmacologic interventions for suspected ACS."
   },
   {
    "id": "D3.C4.O2",
    "dok": 2,
    "can": "Compare primary PCI with fibrinolytic therapy including door-to-balloon and door-to-needle targets."
   },
   {
    "id": "D3.C4.O3",
    "dok": 2,
    "can": "Identify absolute and relative contraindications to fibrinolysis."
   },
   {
    "id": "D3.C4.O4",
    "dok": 3,
    "can": "Prioritize nursing interventions in the first ten minutes of a suspected STEMI."
   },
   {
    "id": "D3.C4.O5",
    "dok": 3,
    "can": "Recognize and respond to mechanical and electrical complications of MI including cardiogenic shock, papillary muscle rupture, and reperfusion dysrhythmias."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "I",
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 22,
  "weightL2": 14
 },
 {
  "id": "D3.C5",
  "domain": "D3",
  "domainName": "Coronary Artery Disease",
  "level": 1,
  "domainWeight": 22,
  "ecg": [],
  "name": "Secondary prevention",
  "can": "Identify the guideline-directed medication classes for post-MI secondary prevention.",
  "dok": 3,
  "yield": "core",
  "est": 44,
  "objectives": [
   {
    "id": "D3.C5.O1",
    "dok": 1,
    "can": "Identify the guideline-directed medication classes for post-MI secondary prevention."
   },
   {
    "id": "D3.C5.O2",
    "dok": 2,
    "can": "Explain the phases of cardiac rehabilitation and the criteria for entry."
   },
   {
    "id": "D3.C5.O3",
    "dok": 3,
    "can": "Build a discharge teaching plan addressing adherence barriers for a specific patient profile."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "I",
   "III"
  ],
  "anccWeight": 25,
  "weightSource": "reported",
  "weightL1": 22,
  "weightL2": 14
 },
 {
  "id": "D4.C1",
  "domain": "D4",
  "domainName": "Hypertension",
  "level": 1,
  "domainWeight": 12,
  "ecg": [],
  "name": "Measurement and classification",
  "can": "State the current blood pressure categories and their thresholds.",
  "dok": 2,
  "yield": "support",
  "est": 50,
  "objectives": [
   {
    "id": "D4.C1.O1",
    "dok": 1,
    "can": "State the current blood pressure categories and their thresholds."
   },
   {
    "id": "D4.C1.O2",
    "dok": 2,
    "can": "Identify the technique errors that produce falsely high or falsely low readings."
   },
   {
    "id": "D4.C1.O3",
    "dok": 2,
    "can": "Interpret ambulatory and home monitoring data including white coat and masked hypertension."
   },
   {
    "id": "D4.C1.O4",
    "dok": 2,
    "can": "Explain orthostatic measurement technique and interpret a positive result."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "II",
   "III"
  ],
  "anccWeight": 25,
  "weightSource": "provisional",
  "weightL1": 12,
  "weightL2": 6
 },
 {
  "id": "D4.C2",
  "domain": "D4",
  "domainName": "Hypertension",
  "level": 1,
  "domainWeight": 12,
  "ecg": [],
  "name": "Primary and secondary hypertension",
  "can": "Describe the mechanisms contributing to primary hypertension including RAAS and sympathetic activity.",
  "dok": 3,
  "yield": "support",
  "est": 64,
  "objectives": [
   {
    "id": "D4.C2.O1",
    "dok": 2,
    "can": "Describe the mechanisms contributing to primary hypertension including RAAS and sympathetic activity."
   },
   {
    "id": "D4.C2.O2",
    "dok": 2,
    "can": "Identify clinical clues suggesting a secondary cause."
   },
   {
    "id": "D4.C2.O3",
    "dok": 2,
    "can": "Match common secondary causes to their diagnostic test."
   },
   {
    "id": "D4.C2.O4",
    "dok": 3,
    "can": "Recognize resistant hypertension and identify the workup it triggers."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "II",
   "III"
  ],
  "anccWeight": 25,
  "weightSource": "provisional",
  "weightL1": 12,
  "weightL2": 6
 },
 {
  "id": "D4.C3",
  "domain": "D4",
  "domainName": "Hypertension",
  "level": 1,
  "domainWeight": 12,
  "ecg": [],
  "name": "Pharmacologic management",
  "can": "Identify first-line antihypertensive drug classes.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D4.C3.O1",
    "dok": 1,
    "can": "Identify first-line antihypertensive drug classes."
   },
   {
    "id": "D4.C3.O2",
    "dok": 2,
    "can": "Match antihypertensive selection to comorbidity including diabetes, chronic kidney disease, heart failure, and pregnancy."
   },
   {
    "id": "D4.C3.O3",
    "dok": 2,
    "can": "Identify the key adverse effects and monitoring parameters for each first-line class."
   },
   {
    "id": "D4.C3.O4",
    "dok": 3,
    "can": "Evaluate a regimen for redundant mechanisms or a missing indicated agent."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "II",
   "III"
  ],
  "anccWeight": 25,
  "weightSource": "provisional",
  "weightL1": 12,
  "weightL2": 6
 },
 {
  "id": "D4.C4",
  "domain": "D4",
  "domainName": "Hypertension",
  "level": 1,
  "domainWeight": 12,
  "ecg": [],
  "name": "Lifestyle intervention and adherence",
  "can": "Identify evidence-based lifestyle modifications and their approximate BP effect.",
  "dok": 3,
  "yield": "support",
  "est": 44,
  "objectives": [
   {
    "id": "D4.C4.O1",
    "dok": 1,
    "can": "Identify evidence-based lifestyle modifications and their approximate BP effect."
   },
   {
    "id": "D4.C4.O2",
    "dok": 2,
    "can": "Apply DASH principles to a patient's actual eating pattern."
   },
   {
    "id": "D4.C4.O3",
    "dok": 3,
    "can": "Identify adherence barriers and select an intervention matched to the barrier rather than to the behavior."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "II",
   "III"
  ],
  "anccWeight": 25,
  "weightSource": "provisional",
  "weightL1": 12,
  "weightL2": 6
 },
 {
  "id": "D4.C5",
  "domain": "D4",
  "domainName": "Hypertension",
  "level": 1,
  "domainWeight": 12,
  "ecg": [],
  "name": "Hypertensive urgency and emergency",
  "can": "Differentiate hypertensive urgency from emergency by end-organ involvement.",
  "dok": 3,
  "yield": "support",
  "est": 72,
  "objectives": [
   {
    "id": "D4.C5.O1",
    "dok": 2,
    "can": "Differentiate hypertensive urgency from emergency by end-organ involvement."
   },
   {
    "id": "D4.C5.O2",
    "dok": 2,
    "can": "Identify the target organs assessed in a hypertensive emergency."
   },
   {
    "id": "D4.C5.O3",
    "dok": 3,
    "can": "Explain why blood pressure is lowered gradually and state the accepted first-hour reduction target."
   },
   {
    "id": "D4.C5.O4",
    "dok": 3,
    "can": "Select an intravenous agent appropriate to the specific end-organ presentation."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": 12,
  "weightL2": 6
 },
 {
  "id": "D5.C1",
  "domain": "D5",
  "domainName": "Cardiomyopathy",
  "level": 1,
  "domainWeight": 9,
  "ecg": [],
  "name": "Classification",
  "can": "Differentiate dilated, hypertrophic, and restrictive cardiomyopathy by structural change.",
  "dok": 2,
  "yield": "support",
  "est": 36,
  "objectives": [
   {
    "id": "D5.C1.O1",
    "dok": 1,
    "can": "Differentiate dilated, hypertrophic, and restrictive cardiomyopathy by structural change."
   },
   {
    "id": "D5.C1.O2",
    "dok": 2,
    "can": "Identify arrhythmogenic right ventricular, takotsubo, and peripartum cardiomyopathy by presentation."
   },
   {
    "id": "D5.C1.O3",
    "dok": 2,
    "can": "Match each type to its characteristic hemodynamic consequence."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 9,
  "weightL2": 5
 },
 {
  "id": "D5.C2",
  "domain": "D5",
  "domainName": "Cardiomyopathy",
  "level": 1,
  "domainWeight": 9,
  "ecg": [],
  "name": "Pathophysiology to presentation",
  "can": "Explain how outflow tract obstruction produces symptoms in hypertrophic cardiomyopathy.",
  "dok": 3,
  "yield": "support",
  "est": 72,
  "objectives": [
   {
    "id": "D5.C2.O1",
    "dok": 2,
    "can": "Explain how outflow tract obstruction produces symptoms in hypertrophic cardiomyopathy."
   },
   {
    "id": "D5.C2.O2",
    "dok": 2,
    "can": "Explain why restrictive physiology produces diastolic rather than systolic failure."
   },
   {
    "id": "D5.C2.O3",
    "dok": 3,
    "can": "Predict which maneuvers and volume states worsen an obstructive murmur and explain the mechanism."
   },
   {
    "id": "D5.C2.O4",
    "dok": 3,
    "can": "Connect a presenting symptom set to the most likely cardiomyopathy type."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 9,
  "weightL2": 5
 },
 {
  "id": "D5.C3",
  "domain": "D5",
  "domainName": "Cardiomyopathy",
  "level": 1,
  "domainWeight": 9,
  "ecg": [],
  "name": "Diagnostic evaluation",
  "can": "Identify echocardiographic findings characteristic of each type.",
  "dok": 2,
  "yield": "support",
  "est": 36,
  "objectives": [
   {
    "id": "D5.C3.O1",
    "dok": 1,
    "can": "Identify echocardiographic findings characteristic of each type."
   },
   {
    "id": "D5.C3.O2",
    "dok": 2,
    "can": "Interpret ECG findings associated with hypertrophic cardiomyopathy."
   },
   {
    "id": "D5.C3.O3",
    "dok": 2,
    "can": "Identify the role of cardiac MRI, biopsy, and genetic testing."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 9,
  "weightL2": 5
 },
 {
  "id": "D5.C4",
  "domain": "D5",
  "domainName": "Cardiomyopathy",
  "level": 1,
  "domainWeight": 9,
  "ecg": [],
  "name": "Management and counseling",
  "can": "Identify medication classes indicated and contraindicated in hypertrophic cardiomyopathy.",
  "dok": 3,
  "yield": "support",
  "est": 50,
  "objectives": [
   {
    "id": "D5.C4.O1",
    "dok": 2,
    "can": "Identify medication classes indicated and contraindicated in hypertrophic cardiomyopathy."
   },
   {
    "id": "D5.C4.O2",
    "dok": 2,
    "can": "Describe septal reduction options and their candidacy criteria."
   },
   {
    "id": "D5.C4.O3",
    "dok": 3,
    "can": "Counsel on activity restriction, family screening, and pregnancy considerations for a specific type."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 25,
  "weightSource": "provisional",
  "weightL1": 9,
  "weightL2": 5
 },
 {
  "id": "D5.C5",
  "domain": "D5",
  "domainName": "Cardiomyopathy",
  "level": 1,
  "domainWeight": 9,
  "ecg": [],
  "name": "Sudden cardiac death risk",
  "can": "Identify the risk markers for sudden cardiac death in cardiomyopathy.",
  "dok": 3,
  "yield": "support",
  "est": 36,
  "objectives": [
   {
    "id": "D5.C5.O1",
    "dok": 2,
    "can": "Identify the risk markers for sudden cardiac death in cardiomyopathy."
   },
   {
    "id": "D5.C5.O2",
    "dok": 3,
    "can": "Determine ICD candidacy from a risk profile and explain the reasoning to a patient."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": 9,
  "weightL2": 5
 },
 {
  "id": "D6.C1",
  "domain": "D6",
  "domainName": "Heart Failure",
  "level": 1,
  "domainWeight": 20,
  "ecg": [],
  "name": "Classification and staging",
  "can": "Differentiate HFrEF, HFmrEF, and HFpEF by ejection fraction range.",
  "dok": 3,
  "yield": "core",
  "est": 58,
  "objectives": [
   {
    "id": "D6.C1.O1",
    "dok": 1,
    "can": "Differentiate HFrEF, HFmrEF, and HFpEF by ejection fraction range."
   },
   {
    "id": "D6.C1.O2",
    "dok": 2,
    "can": "Differentiate the ACC/AHA stages from the NYHA functional classes and explain what each is for."
   },
   {
    "id": "D6.C1.O3",
    "dok": 2,
    "can": "Distinguish left-sided from right-sided failure by symptom pattern."
   },
   {
    "id": "D6.C1.O4",
    "dok": 3,
    "can": "Assign stage and class to a patient case and identify what would change each."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 20,
  "weightL2": 13
 },
 {
  "id": "D6.C2",
  "domain": "D6",
  "domainName": "Heart Failure",
  "level": 1,
  "domainWeight": 20,
  "ecg": [],
  "name": "Compensatory mechanisms",
  "can": "Describe RAAS activation and its short-term benefit and long-term harm.",
  "dok": 3,
  "yield": "core",
  "est": 78,
  "objectives": [
   {
    "id": "D6.C2.O1",
    "dok": 2,
    "can": "Describe RAAS activation and its short-term benefit and long-term harm."
   },
   {
    "id": "D6.C2.O2",
    "dok": 2,
    "can": "Describe sympathetic activation and its effect on afterload and myocardial oxygen demand."
   },
   {
    "id": "D6.C2.O3",
    "dok": 2,
    "can": "Explain the Frank-Starling relationship in the failing ventricle."
   },
   {
    "id": "D6.C2.O4",
    "dok": 3,
    "can": "Explain ventricular remodeling and connect each GDMT pillar to the mechanism it interrupts."
   },
   {
    "id": "D6.C2.O5",
    "dok": 2,
    "can": "Interpret natriuretic peptide values including the conditions that raise and lower them independent of heart failure."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 20,
  "weightL2": 13
 },
 {
  "id": "D6.C3",
  "domain": "D6",
  "domainName": "Heart Failure",
  "level": 1,
  "domainWeight": 20,
  "ecg": [],
  "name": "Volume and congestion assessment",
  "can": "Identify the bedside signs of volume overload.",
  "dok": 3,
  "yield": "core",
  "est": 58,
  "objectives": [
   {
    "id": "D6.C3.O1",
    "dok": 1,
    "can": "Identify the bedside signs of volume overload."
   },
   {
    "id": "D6.C3.O2",
    "dok": 2,
    "can": "Interpret daily weight trends and set the threshold that triggers a call."
   },
   {
    "id": "D6.C3.O3",
    "dok": 2,
    "can": "Assess for congestion versus hypoperfusion and place a patient in the warm-wet, cold-wet, warm-dry, cold-dry framework."
   },
   {
    "id": "D6.C3.O4",
    "dok": 3,
    "can": "Select the management priority indicated by each of the four profiles."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 22,
  "weightSource": "reported",
  "weightL1": 20,
  "weightL2": 13
 },
 {
  "id": "D6.C4",
  "domain": "D6",
  "domainName": "Heart Failure",
  "level": 1,
  "domainWeight": 20,
  "ecg": [],
  "name": "Guideline-directed medical therapy",
  "can": "Identify the four pillars of GDMT for HFrEF.",
  "dok": 3,
  "yield": "core",
  "est": 72,
  "objectives": [
   {
    "id": "D6.C4.O1",
    "dok": 1,
    "can": "Identify the four pillars of GDMT for HFrEF."
   },
   {
    "id": "D6.C4.O2",
    "dok": 2,
    "can": "State the monitoring parameters and key adverse effects for each pillar."
   },
   {
    "id": "D6.C4.O3",
    "dok": 2,
    "can": "Explain the required washout when transitioning from an ACE inhibitor to an ARNI."
   },
   {
    "id": "D6.C4.O4",
    "dok": 3,
    "can": "Sequence GDMT initiation and titration when blood pressure, potassium, or renal function limits the plan."
   },
   {
    "id": "D6.C4.O5",
    "dok": 2,
    "can": "Identify management differences for HFpEF relative to HFrEF."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 20,
  "weightL2": 13
 },
 {
  "id": "D6.C5",
  "domain": "D6",
  "domainName": "Heart Failure",
  "level": 1,
  "domainWeight": 20,
  "ecg": [],
  "name": "Acute decompensated heart failure",
  "can": "Identify the common precipitants of acute decompensation.",
  "dok": 3,
  "yield": "core",
  "est": 72,
  "objectives": [
   {
    "id": "D6.C5.O1",
    "dok": 2,
    "can": "Identify the common precipitants of acute decompensation."
   },
   {
    "id": "D6.C5.O2",
    "dok": 2,
    "can": "Describe initial management of acute pulmonary edema including positioning, oxygenation, and diuresis."
   },
   {
    "id": "D6.C5.O3",
    "dok": 3,
    "can": "Differentiate diuretic resistance from inadequate dosing and select the next step."
   },
   {
    "id": "D6.C5.O4",
    "dok": 3,
    "can": "Recognize progression to cardiogenic shock and identify the escalation pathway."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "reported",
  "weightL1": 20,
  "weightL2": 13
 },
 {
  "id": "D6.C6",
  "domain": "D6",
  "domainName": "Heart Failure",
  "level": 1,
  "domainWeight": 20,
  "ecg": [],
  "name": "Self-care, transitions, and advanced therapy",
  "can": "Identify the components of a heart failure self-care plan.",
  "dok": 3,
  "yield": "core",
  "est": 80,
  "objectives": [
   {
    "id": "D6.C6.O1",
    "dok": 1,
    "can": "Identify the components of a heart failure self-care plan."
   },
   {
    "id": "D6.C6.O2",
    "dok": 2,
    "can": "Explain sodium and fluid guidance in terms a patient can act on."
   },
   {
    "id": "D6.C6.O3",
    "dok": 3,
    "can": "Design a transition-of-care plan targeting the specific readmission drivers in a given case."
   },
   {
    "id": "D6.C6.O4",
    "dok": 2,
    "can": "Identify criteria for advanced therapy referral including transplant and durable mechanical support."
   },
   {
    "id": "D6.C6.O5",
    "dok": 3,
    "can": "Recognize when palliative care conversation is indicated and describe how to open it."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 25,
  "weightSource": "reported",
  "weightL1": 20,
  "weightL2": 13
 },
 {
  "id": "D7.C1",
  "domain": "D7",
  "domainName": "Non-Invasive and Interventional Cardiology",
  "level": 1,
  "domainWeight": 13,
  "ecg": [],
  "name": "Non-invasive test selection and preparation",
  "can": "Identify what transthoracic echocardiography measures and its common indications.",
  "dok": 3,
  "yield": "high",
  "est": 72,
  "objectives": [
   {
    "id": "D7.C1.O1",
    "dok": 1,
    "can": "Identify what transthoracic echocardiography measures and its common indications."
   },
   {
    "id": "D7.C1.O2",
    "dok": 2,
    "can": "Differentiate exercise, pharmacologic, and nuclear stress testing by indication."
   },
   {
    "id": "D7.C1.O3",
    "dok": 2,
    "can": "Identify preparation requirements and held medications for each test."
   },
   {
    "id": "D7.C1.O4",
    "dok": 2,
    "can": "Identify the role of coronary CT angiography, calcium scoring, and cardiac MRI."
   },
   {
    "id": "D7.C1.O5",
    "dok": 3,
    "can": "Select the most appropriate non-invasive test for a specific patient and clinical question."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": 13,
  "weightL2": 7
 },
 {
  "id": "D7.C2",
  "domain": "D7",
  "domainName": "Non-Invasive and Interventional Cardiology",
  "level": 1,
  "domainWeight": 13,
  "ecg": [],
  "name": "Cardiac catheterization and PCI",
  "can": "Differentiate diagnostic catheterization from percutaneous coronary intervention.",
  "dok": 2,
  "yield": "high",
  "est": 50,
  "objectives": [
   {
    "id": "D7.C2.O1",
    "dok": 1,
    "can": "Differentiate diagnostic catheterization from percutaneous coronary intervention."
   },
   {
    "id": "D7.C2.O2",
    "dok": 2,
    "can": "Identify pre-procedure assessment priorities including renal function, allergy, and anticoagulation status."
   },
   {
    "id": "D7.C2.O3",
    "dok": 2,
    "can": "Compare radial and femoral access by complication profile and recovery requirement."
   },
   {
    "id": "D7.C2.O4",
    "dok": 2,
    "can": "Differentiate bare metal, drug-eluting, and bioresorbable stents by antiplatelet duration."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": 13,
  "weightL2": 7
 },
 {
  "id": "D7.C3",
  "domain": "D7",
  "domainName": "Non-Invasive and Interventional Cardiology",
  "level": 1,
  "domainWeight": 13,
  "ecg": [],
  "name": "Post-procedure care and complications",
  "can": "Describe access site assessment and the findings that indicate hematoma, pseudoaneurysm, or retroperitoneal bleed.",
  "dok": 3,
  "yield": "high",
  "est": 72,
  "objectives": [
   {
    "id": "D7.C3.O1",
    "dok": 2,
    "can": "Describe access site assessment and the findings that indicate hematoma, pseudoaneurysm, or retroperitoneal bleed."
   },
   {
    "id": "D7.C3.O2",
    "dok": 2,
    "can": "Identify activity, positioning, and hydration requirements after each access route."
   },
   {
    "id": "D7.C3.O3",
    "dok": 3,
    "can": "Recognize acute stent thrombosis and differentiate it from expected post-procedure discomfort."
   },
   {
    "id": "D7.C3.O4",
    "dok": 3,
    "can": "Prioritize response to a post-catheterization patient with hypotension and back pain."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": 13,
  "weightL2": 7
 },
 {
  "id": "D7.C4",
  "domain": "D7",
  "domainName": "Non-Invasive and Interventional Cardiology",
  "level": 1,
  "domainWeight": 13,
  "ecg": [],
  "name": "Contrast and radiation safety",
  "can": "Identify risk factors for contrast-associated acute kidney injury.",
  "dok": 2,
  "yield": "high",
  "est": 44,
  "objectives": [
   {
    "id": "D7.C4.O1",
    "dok": 1,
    "can": "Identify risk factors for contrast-associated acute kidney injury."
   },
   {
    "id": "D7.C4.O2",
    "dok": 2,
    "can": "Describe prevention strategies including hydration and contrast volume limitation."
   },
   {
    "id": "D7.C4.O3",
    "dok": 2,
    "can": "Identify metformin and nephrotoxic medication management around contrast exposure."
   },
   {
    "id": "D7.C4.O4",
    "dok": 1,
    "can": "State the principles of radiation protection for staff and patient."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": 13,
  "weightL2": 7
 },
 {
  "id": "D7.C5",
  "domain": "D7",
  "domainName": "Non-Invasive and Interventional Cardiology",
  "level": 1,
  "domainWeight": 13,
  "ecg": [],
  "name": "Structural and electrophysiology procedures",
  "can": "Identify the indications for TAVR, MitraClip, and left atrial appendage occlusion.",
  "dok": 2,
  "yield": "high",
  "est": 36,
  "objectives": [
   {
    "id": "D7.C5.O1",
    "dok": 1,
    "can": "Identify the indications for TAVR, MitraClip, and left atrial appendage occlusion."
   },
   {
    "id": "D7.C5.O2",
    "dok": 2,
    "can": "Describe nursing priorities after a structural heart intervention including conduction monitoring."
   },
   {
    "id": "D7.C5.O3",
    "dok": 2,
    "can": "Identify the indications for and post-procedure care following catheter ablation."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": 13,
  "weightL2": 7
 },
 {
  "id": "D8.C1",
  "domain": "D8",
  "domainName": "Heart Sounds and Valvular Disorders",
  "level": 2,
  "domainWeight": 5,
  "ecg": [],
  "name": "Systematic auscultation and timing",
  "can": "Time a sound to systole or diastole using a simultaneous pulse or a tracing.",
  "dok": 2,
  "yield": "high",
  "est": 42,
  "objectives": [
   {
    "id": "D8.C1.O1",
    "dok": 2,
    "can": "Time a sound to systole or diastole using a simultaneous pulse or a tracing."
   },
   {
    "id": "D8.C1.O2",
    "dok": 2,
    "can": "Use bell and diaphragm appropriately for frequency and describe why."
   },
   {
    "id": "D8.C1.O3",
    "dok": 2,
    "can": "Apply positioning and respiratory maneuvers to accentuate a target finding."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D8.C2",
  "domain": "D8",
  "domainName": "Heart Sounds and Valvular Disorders",
  "level": 2,
  "domainWeight": 5,
  "ecg": [],
  "name": "Extra sounds",
  "can": "Identify S3 and state what it indicates in a patient over forty.",
  "dok": 2,
  "yield": "high",
  "est": 56,
  "objectives": [
   {
    "id": "D8.C2.O1",
    "dok": 2,
    "can": "Identify S3 and state what it indicates in a patient over forty."
   },
   {
    "id": "D8.C2.O2",
    "dok": 2,
    "can": "Identify S4 and relate it to ventricular compliance."
   },
   {
    "id": "D8.C2.O3",
    "dok": 2,
    "can": "Distinguish a pericardial friction rub from a murmur."
   },
   {
    "id": "D8.C2.O4",
    "dok": 2,
    "can": "Identify ejection clicks, opening snaps, and prosthetic valve sounds."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D8.C3",
  "domain": "D8",
  "domainName": "Heart Sounds and Valvular Disorders",
  "level": 2,
  "domainWeight": 5,
  "ecg": [],
  "name": "Murmur characterization",
  "can": "Grade murmur intensity on the standard six-point scale.",
  "dok": 3,
  "yield": "high",
  "est": 66,
  "objectives": [
   {
    "id": "D8.C3.O1",
    "dok": 1,
    "can": "Grade murmur intensity on the standard six-point scale."
   },
   {
    "id": "D8.C3.O2",
    "dok": 2,
    "can": "Describe a murmur by timing, shape, location, radiation, pitch, and quality."
   },
   {
    "id": "D8.C3.O3",
    "dok": 3,
    "can": "Predict how Valsalva, squatting, standing, and handgrip change a specific murmur and explain the loading mechanism."
   },
   {
    "id": "D8.C3.O4",
    "dok": 3,
    "can": "Differentiate an innocent murmur from one requiring workup."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D8.C4",
  "domain": "D8",
  "domainName": "Heart Sounds and Valvular Disorders",
  "level": 2,
  "domainWeight": 5,
  "ecg": [],
  "name": "Stenotic lesions",
  "can": "Identify aortic stenosis by murmur characteristics and its symptom triad.",
  "dok": 3,
  "yield": "high",
  "est": 64,
  "objectives": [
   {
    "id": "D8.C4.O1",
    "dok": 2,
    "can": "Identify aortic stenosis by murmur characteristics and its symptom triad."
   },
   {
    "id": "D8.C4.O2",
    "dok": 2,
    "can": "Identify mitral stenosis by murmur characteristics and its association with atrial fibrillation."
   },
   {
    "id": "D8.C4.O3",
    "dok": 2,
    "can": "Describe the pressure and chamber consequences of each stenotic lesion."
   },
   {
    "id": "D8.C4.O4",
    "dok": 3,
    "can": "Explain why preload reduction is hazardous in severe aortic stenosis."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D8.C5",
  "domain": "D8",
  "domainName": "Heart Sounds and Valvular Disorders",
  "level": 2,
  "domainWeight": 5,
  "ecg": [],
  "name": "Regurgitant lesions",
  "can": "Identify mitral regurgitation and aortic regurgitation by murmur characteristics.",
  "dok": 3,
  "yield": "high",
  "est": 64,
  "objectives": [
   {
    "id": "D8.C5.O1",
    "dok": 2,
    "can": "Identify mitral regurgitation and aortic regurgitation by murmur characteristics."
   },
   {
    "id": "D8.C5.O2",
    "dok": 2,
    "can": "Differentiate acute from chronic regurgitation by presentation and tolerance."
   },
   {
    "id": "D8.C5.O3",
    "dok": 2,
    "can": "Identify tricuspid regurgitation and its peripheral findings."
   },
   {
    "id": "D8.C5.O4",
    "dok": 3,
    "can": "Explain how afterload reduction helps regurgitant lesions and harms stenotic ones."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D8.C6",
  "domain": "D8",
  "domainName": "Heart Sounds and Valvular Disorders",
  "level": 2,
  "domainWeight": 5,
  "ecg": [],
  "name": "Valve intervention and ongoing management",
  "can": "Compare mechanical and bioprosthetic valves by durability and anticoagulation requirement.",
  "dok": 3,
  "yield": "high",
  "est": 64,
  "objectives": [
   {
    "id": "D8.C6.O1",
    "dok": 2,
    "can": "Compare mechanical and bioprosthetic valves by durability and anticoagulation requirement."
   },
   {
    "id": "D8.C6.O2",
    "dok": 2,
    "can": "Identify target INR ranges and bridging considerations for mechanical valves."
   },
   {
    "id": "D8.C6.O3",
    "dok": 2,
    "can": "Identify infective endocarditis risk, prophylaxis indications, and presenting signs."
   },
   {
    "id": "D8.C6.O4",
    "dok": 3,
    "can": "Recognize prosthetic valve dysfunction and thrombosis and identify the immediate action."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D9.C1",
  "domain": "D9",
  "domainName": "12-Lead ECG Essentials",
  "level": 2,
  "domainWeight": 8,
  "ecg": [
   "E3",
   "E5"
  ],
  "name": "Acquisition and quality",
  "can": "Place limb and precordial leads at the correct anatomic landmarks.",
  "dok": 2,
  "yield": "core",
  "est": 36,
  "objectives": [
   {
    "id": "D9.C1.O1",
    "dok": 1,
    "can": "Place limb and precordial leads at the correct anatomic landmarks."
   },
   {
    "id": "D9.C1.O2",
    "dok": 2,
    "can": "Recognize misplacement patterns including limb lead reversal and high V1 and V2."
   },
   {
    "id": "D9.C1.O3",
    "dok": 2,
    "can": "Identify when posterior and right-sided leads are indicated and where they are placed."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D9.C2",
  "domain": "D9",
  "domainName": "12-Lead ECG Essentials",
  "level": 2,
  "domainWeight": 8,
  "ecg": [
   "E3",
   "E5"
  ],
  "name": "Axis, intervals, and chamber assessment",
  "can": "Determine axis using leads I and aVF and classify deviation.",
  "dok": 2,
  "yield": "core",
  "est": 56,
  "objectives": [
   {
    "id": "D9.C2.O1",
    "dok": 2,
    "can": "Determine axis using leads I and aVF and classify deviation."
   },
   {
    "id": "D9.C2.O2",
    "dok": 2,
    "can": "Identify criteria for left and right ventricular hypertrophy."
   },
   {
    "id": "D9.C2.O3",
    "dok": 2,
    "can": "Identify left and right atrial enlargement patterns."
   },
   {
    "id": "D9.C2.O4",
    "dok": 2,
    "can": "Recognize low voltage and electrical alternans and state what each suggests."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D9.C3",
  "domain": "D9",
  "domainName": "12-Lead ECG Essentials",
  "level": 2,
  "domainWeight": 8,
  "ecg": [
   "E3",
   "E5"
  ],
  "name": "Conduction abnormalities",
  "can": "Differentiate right from left bundle branch block using QRS duration and V1 morphology.",
  "dok": 2,
  "yield": "core",
  "est": 56,
  "objectives": [
   {
    "id": "D9.C3.O1",
    "dok": 2,
    "can": "Differentiate right from left bundle branch block using QRS duration and V1 morphology."
   },
   {
    "id": "D9.C3.O2",
    "dok": 2,
    "can": "Identify left anterior and left posterior fascicular block."
   },
   {
    "id": "D9.C3.O3",
    "dok": 2,
    "can": "Recognize bifascicular and trifascicular patterns and their progression risk."
   },
   {
    "id": "D9.C3.O4",
    "dok": 2,
    "can": "Identify pre-excitation and the delta wave."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D9.C4",
  "domain": "D9",
  "domainName": "12-Lead ECG Essentials",
  "level": 2,
  "domainWeight": 8,
  "ecg": [
   "E3",
   "E5"
  ],
  "name": "Ischemia, injury, and infarction",
  "can": "Differentiate ischemia, injury, and infarction by ECG change.",
  "dok": 3,
  "yield": "core",
  "est": 94,
  "objectives": [
   {
    "id": "D9.C4.O1",
    "dok": 2,
    "can": "Differentiate ischemia, injury, and infarction by ECG change."
   },
   {
    "id": "D9.C4.O2",
    "dok": 2,
    "can": "Identify significant ST elevation and depression using the correct measurement point and thresholds."
   },
   {
    "id": "D9.C4.O3",
    "dok": 3,
    "can": "Localize an infarct to anterior, inferior, lateral, septal, or posterior territory and name the likely culprit artery."
   },
   {
    "id": "D9.C4.O4",
    "dok": 3,
    "can": "Recognize reciprocal changes and explain why they raise specificity."
   },
   {
    "id": "D9.C4.O5",
    "dok": 3,
    "can": "Identify right ventricular infarction from an inferior STEMI and state the management change it forces."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D9.C5",
  "domain": "D9",
  "domainName": "12-Lead ECG Essentials",
  "level": 2,
  "domainWeight": 8,
  "ecg": [
   "E3",
   "E5"
  ],
  "name": "STEMI equivalents and mimics",
  "can": "Apply Sgarbossa criteria to evaluate ischemia in the presence of left bundle branch block or paced rhythm.",
  "dok": 3,
  "yield": "core",
  "est": 88,
  "objectives": [
   {
    "id": "D9.C5.O1",
    "dok": 3,
    "can": "Apply Sgarbossa criteria to evaluate ischemia in the presence of left bundle branch block or paced rhythm."
   },
   {
    "id": "D9.C5.O2",
    "dok": 3,
    "can": "Recognize Wellens pattern and de Winter T waves and state their significance."
   },
   {
    "id": "D9.C5.O3",
    "dok": 3,
    "can": "Differentiate acute pericarditis, early repolarization, and takotsubo from STEMI."
   },
   {
    "id": "D9.C5.O4",
    "dok": 3,
    "can": "Recognize left main and proximal LAD occlusion patterns."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D9.C6",
  "domain": "D9",
  "domainName": "12-Lead ECG Essentials",
  "level": 2,
  "domainWeight": 8,
  "ecg": [
   "E3",
   "E5"
  ],
  "name": "Metabolic, drug, and channel patterns",
  "can": "Identify the ECG progression of hyperkalemia and the changes of hypokalemia.",
  "dok": 3,
  "yield": "core",
  "est": 78,
  "objectives": [
   {
    "id": "D9.C6.O1",
    "dok": 2,
    "can": "Identify the ECG progression of hyperkalemia and the changes of hypokalemia."
   },
   {
    "id": "D9.C6.O2",
    "dok": 2,
    "can": "Identify calcium and magnesium derangement patterns."
   },
   {
    "id": "D9.C6.O3",
    "dok": 2,
    "can": "Recognize digoxin effect and distinguish it from digoxin toxicity."
   },
   {
    "id": "D9.C6.O4",
    "dok": 2,
    "can": "Identify QT prolongation and the drug classes that cause it."
   },
   {
    "id": "D9.C6.O5",
    "dok": 3,
    "can": "Recognize Brugada pattern and hypothermia changes and identify the action each requires."
   }
  ],
  "anccPrimary": "I",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 22,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D10.C1",
  "domain": "D10",
  "domainName": "Principles of Oxygenation",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Oxygen delivery and consumption",
  "can": "State the determinants of oxygen delivery.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D10.C1.O1",
    "dok": 1,
    "can": "State the determinants of oxygen delivery."
   },
   {
    "id": "D10.C1.O2",
    "dok": 2,
    "can": "Explain why hemoglobin contributes more to content than dissolved oxygen does."
   },
   {
    "id": "D10.C1.O3",
    "dok": 2,
    "can": "Interpret a mixed or central venous oxygen saturation as a supply and demand statement."
   },
   {
    "id": "D10.C1.O4",
    "dok": 3,
    "can": "Determine whether a low venous saturation reflects inadequate delivery or excessive consumption and select the intervention."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D10.C2",
  "domain": "D10",
  "domainName": "Principles of Oxygenation",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "The oxyhemoglobin dissociation curve",
  "can": "Identify the factors that shift the curve right and left.",
  "dok": 3,
  "yield": "support",
  "est": 50,
  "objectives": [
   {
    "id": "D10.C2.O1",
    "dok": 2,
    "can": "Identify the factors that shift the curve right and left."
   },
   {
    "id": "D10.C2.O2",
    "dok": 2,
    "can": "Explain the clinical consequence of each shift for tissue unloading."
   },
   {
    "id": "D10.C2.O3",
    "dok": 3,
    "can": "Predict the effect of a specific clinical state such as fever, acidosis, or hypothermia on unloading."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D10.C3",
  "domain": "D10",
  "domainName": "Principles of Oxygenation",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Arterial blood gas interpretation",
  "can": "State the normal ranges for pH, PaCO2, HCO3, PaO2, and base excess.",
  "dok": 3,
  "yield": "support",
  "est": 80,
  "objectives": [
   {
    "id": "D10.C3.O1",
    "dok": 1,
    "can": "State the normal ranges for pH, PaCO2, HCO3, PaO2, and base excess."
   },
   {
    "id": "D10.C3.O2",
    "dok": 2,
    "can": "Classify a gas as respiratory or metabolic, acidosis or alkalosis."
   },
   {
    "id": "D10.C3.O3",
    "dok": 2,
    "can": "Determine compensation status as uncompensated, partial, or full."
   },
   {
    "id": "D10.C3.O4",
    "dok": 3,
    "can": "Interpret a mixed disorder and identify the primary derangement."
   },
   {
    "id": "D10.C3.O5",
    "dok": 3,
    "can": "Connect a gas result to the cardiac cause producing it and select the intervention."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D10.C4",
  "domain": "D10",
  "domainName": "Principles of Oxygenation",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Oxygen delivery devices and titration",
  "can": "Match each delivery device to its approximate FiO2 range and flow requirement.",
  "dok": 2,
  "yield": "support",
  "est": 50,
  "objectives": [
   {
    "id": "D10.C4.O1",
    "dok": 1,
    "can": "Match each delivery device to its approximate FiO2 range and flow requirement."
   },
   {
    "id": "D10.C4.O2",
    "dok": 2,
    "can": "Select a device appropriate to the required FiO2 and the patient's minute ventilation."
   },
   {
    "id": "D10.C4.O3",
    "dok": 2,
    "can": "Identify the risks of hyperoxia in the cardiac patient and current saturation targets."
   },
   {
    "id": "D10.C4.O4",
    "dok": 2,
    "can": "Describe high flow nasal cannula and noninvasive ventilation indications in cardiogenic pulmonary edema."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D10.C5",
  "domain": "D10",
  "domainName": "Principles of Oxygenation",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Cardiopulmonary interaction",
  "can": "Explain how positive pressure ventilation reduces preload and afterload.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D10.C5.O1",
    "dok": 2,
    "can": "Explain how positive pressure ventilation reduces preload and afterload."
   },
   {
    "id": "D10.C5.O2",
    "dok": 3,
    "can": "Predict the hemodynamic effect of increasing PEEP in a hypovolemic versus a congested patient."
   },
   {
    "id": "D10.C5.O3",
    "dok": 3,
    "can": "Recognize when respiratory failure is a cardiac problem and adjust the management priority."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D11.C1",
  "domain": "D11",
  "domainName": "Hemodynamic Monitoring",
  "level": 2,
  "domainWeight": 7,
  "ecg": [],
  "name": "Hemodynamic principles",
  "can": "Define preload, afterload, contractility, and compliance.",
  "dok": 3,
  "yield": "core",
  "est": 58,
  "objectives": [
   {
    "id": "D11.C1.O1",
    "dok": 1,
    "can": "Define preload, afterload, contractility, and compliance."
   },
   {
    "id": "D11.C1.O2",
    "dok": 2,
    "can": "Identify the clinical measurements that estimate each."
   },
   {
    "id": "D11.C1.O3",
    "dok": 2,
    "can": "Explain how each responds to volume, vasoactive, and inotropic intervention."
   },
   {
    "id": "D11.C1.O4",
    "dok": 3,
    "can": "Predict the effect of a single intervention on all four parameters simultaneously."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "I",
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 7
 },
 {
  "id": "D11.C2",
  "domain": "D11",
  "domainName": "Hemodynamic Monitoring",
  "level": 2,
  "domainWeight": 7,
  "ecg": [],
  "name": "Arterial pressure monitoring",
  "can": "Describe leveling to the phlebostatic axis and zeroing, and state the error each prevents.",
  "dok": 3,
  "yield": "core",
  "est": 78,
  "objectives": [
   {
    "id": "D11.C2.O1",
    "dok": 2,
    "can": "Describe leveling to the phlebostatic axis and zeroing, and state the error each prevents."
   },
   {
    "id": "D11.C2.O2",
    "dok": 2,
    "can": "Identify overdamped and underdamped waveforms and perform a square wave test."
   },
   {
    "id": "D11.C2.O3",
    "dok": 2,
    "can": "Interpret the arterial waveform components including the dicrotic notch."
   },
   {
    "id": "D11.C2.O4",
    "dok": 3,
    "can": "Reconcile a discrepancy between arterial line and cuff pressure and decide which to act on."
   },
   {
    "id": "D11.C2.O5",
    "dok": 2,
    "can": "Interpret pulse pressure variation as a fluid responsiveness indicator and state its validity conditions."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "I",
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 7
 },
 {
  "id": "D11.C3",
  "domain": "D11",
  "domainName": "Hemodynamic Monitoring",
  "level": 2,
  "domainWeight": 7,
  "ecg": [],
  "name": "Central venous and right heart pressures",
  "can": "State the normal central venous pressure range.",
  "dok": 3,
  "yield": "core",
  "est": 44,
  "objectives": [
   {
    "id": "D11.C3.O1",
    "dok": 1,
    "can": "State the normal central venous pressure range."
   },
   {
    "id": "D11.C3.O2",
    "dok": 2,
    "can": "Identify the a, c, and v waves and the conditions that distort each."
   },
   {
    "id": "D11.C3.O3",
    "dok": 3,
    "can": "Explain the limits of central venous pressure as a preload surrogate."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "I",
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 7
 },
 {
  "id": "D11.C4",
  "domain": "D11",
  "domainName": "Hemodynamic Monitoring",
  "level": 2,
  "domainWeight": 7,
  "ecg": [],
  "name": "Pulmonary artery catheter",
  "can": "Identify the pressures measured at each catheter position.",
  "dok": 3,
  "yield": "core",
  "est": 58,
  "objectives": [
   {
    "id": "D11.C4.O1",
    "dok": 1,
    "can": "Identify the pressures measured at each catheter position."
   },
   {
    "id": "D11.C4.O2",
    "dok": 2,
    "can": "Recognize the waveform change at each chamber during insertion."
   },
   {
    "id": "D11.C4.O3",
    "dok": 2,
    "can": "Interpret pulmonary artery occlusion pressure as a left-sided filling estimate."
   },
   {
    "id": "D11.C4.O4",
    "dok": 3,
    "can": "Recognize spontaneous wedge, balloon rupture, and catheter migration and state the immediate action."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "I",
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 7
 },
 {
  "id": "D11.C5",
  "domain": "D11",
  "domainName": "Hemodynamic Monitoring",
  "level": 2,
  "domainWeight": 7,
  "ecg": [],
  "name": "Derived parameters",
  "can": "Calculate cardiac output, cardiac index, stroke volume, and stroke volume index.",
  "dok": 3,
  "yield": "core",
  "est": 50,
  "objectives": [
   {
    "id": "D11.C5.O1",
    "dok": 2,
    "can": "Calculate cardiac output, cardiac index, stroke volume, and stroke volume index."
   },
   {
    "id": "D11.C5.O2",
    "dok": 2,
    "can": "Calculate systemic and pulmonary vascular resistance and interpret each."
   },
   {
    "id": "D11.C5.O3",
    "dok": 3,
    "can": "Build a complete hemodynamic profile from a set of measured and derived values."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "I",
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 7
 },
 {
  "id": "D11.C6",
  "domain": "D11",
  "domainName": "Hemodynamic Monitoring",
  "level": 2,
  "domainWeight": 7,
  "ecg": [],
  "name": "Shock differentiation",
  "can": "Differentiate cardiogenic, hypovolemic, distributive, and obstructive shock by hemodynamic profile.",
  "dok": 4,
  "yield": "core",
  "est": 82,
  "objectives": [
   {
    "id": "D11.C6.O1",
    "dok": 2,
    "can": "Differentiate cardiogenic, hypovolemic, distributive, and obstructive shock by hemodynamic profile."
   },
   {
    "id": "D11.C6.O2",
    "dok": 3,
    "can": "Select the intervention priority indicated by each profile."
   },
   {
    "id": "D11.C6.O3",
    "dok": 2,
    "can": "Identify minimally invasive and non-invasive cardiac output technologies and their limitations."
   },
   {
    "id": "D11.C6.O4",
    "dok": 4,
    "can": "Manage a patient with a mixed shock state across changing hemodynamic data."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "I",
   "II"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 7
 },
 {
  "id": "D12.C1",
  "domain": "D12",
  "domainName": "Cardiac Assist Device Therapy",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Intra-aortic balloon pump",
  "can": "State the physiologic goals of counterpulsation.",
  "dok": 3,
  "yield": "support",
  "est": 72,
  "objectives": [
   {
    "id": "D12.C1.O1",
    "dok": 1,
    "can": "State the physiologic goals of counterpulsation."
   },
   {
    "id": "D12.C1.O2",
    "dok": 2,
    "can": "Identify correct inflation and deflation timing on the arterial waveform."
   },
   {
    "id": "D12.C1.O3",
    "dok": 3,
    "can": "Recognize early inflation, late inflation, early deflation, and late deflation and state the consequence of each."
   },
   {
    "id": "D12.C1.O4",
    "dok": 2,
    "can": "Identify contraindications including aortic regurgitation and aortic dissection."
   },
   {
    "id": "D12.C1.O5",
    "dok": 2,
    "can": "Perform the nursing assessment specific to balloon pump therapy including limb perfusion and position verification."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D12.C2",
  "domain": "D12",
  "domainName": "Cardiac Assist Device Therapy",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Percutaneous ventricular assist devices",
  "can": "Describe how a microaxial flow pump unloads the ventricle.",
  "dok": 2,
  "yield": "support",
  "est": 36,
  "objectives": [
   {
    "id": "D12.C2.O1",
    "dok": 1,
    "can": "Describe how a microaxial flow pump unloads the ventricle."
   },
   {
    "id": "D12.C2.O2",
    "dok": 2,
    "can": "Interpret placement signal and motor current alarms."
   },
   {
    "id": "D12.C2.O3",
    "dok": 2,
    "can": "Identify hemolysis, suction events, and migration and state the response."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D12.C3",
  "domain": "D12",
  "domainName": "Cardiac Assist Device Therapy",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Durable left ventricular assist devices",
  "can": "Identify the components of a durable LVAD system.",
  "dok": 3,
  "yield": "support",
  "est": 72,
  "objectives": [
   {
    "id": "D12.C3.O1",
    "dok": 1,
    "can": "Identify the components of a durable LVAD system."
   },
   {
    "id": "D12.C3.O2",
    "dok": 2,
    "can": "Explain why many LVAD patients have no palpable pulse and how blood pressure is obtained."
   },
   {
    "id": "D12.C3.O3",
    "dok": 2,
    "can": "Interpret flow, speed, power, and pulsatility index parameters."
   },
   {
    "id": "D12.C3.O4",
    "dok": 3,
    "can": "Differentiate pump thrombosis, suction event, and right ventricular failure from the parameter pattern."
   },
   {
    "id": "D12.C3.O5",
    "dok": 2,
    "can": "Describe driveline care and infection surveillance."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D12.C4",
  "domain": "D12",
  "domainName": "Cardiac Assist Device Therapy",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Extracorporeal membrane oxygenation",
  "can": "Differentiate venoarterial from venovenous ECMO by circuit and indication.",
  "dok": 3,
  "yield": "support",
  "est": 44,
  "objectives": [
   {
    "id": "D12.C4.O1",
    "dok": 1,
    "can": "Differentiate venoarterial from venovenous ECMO by circuit and indication."
   },
   {
    "id": "D12.C4.O2",
    "dok": 2,
    "can": "Identify circuit components and the nursing assessment for each."
   },
   {
    "id": "D12.C4.O3",
    "dok": 3,
    "can": "Recognize differential hypoxemia and state its cause and correction."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D12.C5",
  "domain": "D12",
  "domainName": "Cardiac Assist Device Therapy",
  "level": 2,
  "domainWeight": 4,
  "ecg": [],
  "name": "Complications and emergency response",
  "can": "Identify anticoagulation targets and bleeding surveillance for each device.",
  "dok": 3,
  "yield": "support",
  "est": 58,
  "objectives": [
   {
    "id": "D12.C5.O1",
    "dok": 2,
    "can": "Identify anticoagulation targets and bleeding surveillance for each device."
   },
   {
    "id": "D12.C5.O2",
    "dok": 3,
    "can": "Determine when chest compressions are and are not appropriate for a device-supported patient."
   },
   {
    "id": "D12.C5.O3",
    "dok": 3,
    "can": "Respond to device alarm plus hemodynamic collapse in the correct sequence."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 4
 },
 {
  "id": "D13.C1",
  "domain": "D13",
  "domainName": "Pacemaker Interpretation",
  "level": 2,
  "domainWeight": 5,
  "ecg": [
   "E4"
  ],
  "name": "Indications and coding",
  "can": "Identify the accepted indications for permanent pacing.",
  "dok": 2,
  "yield": "high",
  "est": 36,
  "objectives": [
   {
    "id": "D13.C1.O1",
    "dok": 1,
    "can": "Identify the accepted indications for permanent pacing."
   },
   {
    "id": "D13.C1.O2",
    "dok": 2,
    "can": "Interpret each position of the NBG pacemaker code."
   },
   {
    "id": "D13.C1.O3",
    "dok": 2,
    "can": "Differentiate single chamber, dual chamber, and biventricular systems by lead configuration."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D13.C2",
  "domain": "D13",
  "domainName": "Pacemaker Interpretation",
  "level": 2,
  "domainWeight": 5,
  "ecg": [
   "E4"
  ],
  "name": "Modes and timing",
  "can": "Describe the behavior of VVI, AAI, DDD, and DOO modes.",
  "dok": 3,
  "yield": "high",
  "est": 64,
  "objectives": [
   {
    "id": "D13.C2.O1",
    "dok": 2,
    "can": "Describe the behavior of VVI, AAI, DDD, and DOO modes."
   },
   {
    "id": "D13.C2.O2",
    "dok": 2,
    "can": "Explain the lower rate limit, AV delay, and upper tracking rate."
   },
   {
    "id": "D13.C2.O3",
    "dok": 2,
    "can": "Explain rate-responsive pacing and identify when it is indicated."
   },
   {
    "id": "D13.C2.O4",
    "dok": 3,
    "can": "Predict the tracing appearance produced by a given mode and patient rhythm."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D13.C3",
  "domain": "D13",
  "domainName": "Pacemaker Interpretation",
  "level": 2,
  "domainWeight": 5,
  "ecg": [
   "E4"
  ],
  "name": "Capture, sensing, and normal function",
  "can": "Identify atrial and ventricular pacing spikes and confirm capture.",
  "dok": 2,
  "yield": "high",
  "est": 42,
  "objectives": [
   {
    "id": "D13.C3.O1",
    "dok": 2,
    "can": "Identify atrial and ventricular pacing spikes and confirm capture."
   },
   {
    "id": "D13.C3.O2",
    "dok": 2,
    "can": "Recognize appropriate sensing and inhibition on a tracing."
   },
   {
    "id": "D13.C3.O3",
    "dok": 2,
    "can": "Identify fusion and pseudofusion beats and explain why neither is malfunction."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D13.C4",
  "domain": "D13",
  "domainName": "Pacemaker Interpretation",
  "level": 2,
  "domainWeight": 5,
  "ecg": [
   "E4"
  ],
  "name": "Malfunction recognition",
  "can": "Identify failure to capture and list the causes including lead dislodgement, threshold change, and electrolyte disturbance.",
  "dok": 3,
  "yield": "high",
  "est": 88,
  "objectives": [
   {
    "id": "D13.C4.O1",
    "dok": 3,
    "can": "Identify failure to capture and list the causes including lead dislodgement, threshold change, and electrolyte disturbance."
   },
   {
    "id": "D13.C4.O2",
    "dok": 3,
    "can": "Identify failure to sense and explain the R-on-T risk it creates."
   },
   {
    "id": "D13.C4.O3",
    "dok": 3,
    "can": "Identify oversensing and failure to output and differentiate them on a tracing."
   },
   {
    "id": "D13.C4.O4",
    "dok": 3,
    "can": "Recognize pacemaker-mediated tachycardia and state the immediate intervention."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D13.C5",
  "domain": "D13",
  "domainName": "Pacemaker Interpretation",
  "level": 2,
  "domainWeight": 5,
  "ecg": [
   "E4"
  ],
  "name": "ICD and cardiac resynchronization",
  "can": "Identify primary and secondary prevention ICD indications.",
  "dok": 3,
  "yield": "high",
  "est": 58,
  "objectives": [
   {
    "id": "D13.C5.O1",
    "dok": 1,
    "can": "Identify primary and secondary prevention ICD indications."
   },
   {
    "id": "D13.C5.O2",
    "dok": 2,
    "can": "Describe tiered therapy including antitachycardia pacing and shock."
   },
   {
    "id": "D13.C5.O3",
    "dok": 3,
    "can": "Differentiate appropriate from inappropriate shock and state the response to each."
   },
   {
    "id": "D13.C5.O4",
    "dok": 2,
    "can": "Identify CRT indications and describe how loss of biventricular pacing is detected."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "II",
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D13.C6",
  "domain": "D13",
  "domainName": "Pacemaker Interpretation",
  "level": 2,
  "domainWeight": 5,
  "ecg": [
   "E4"
  ],
  "name": "Perioperative, temporary, and patient management",
  "can": "Describe magnet response for a pacemaker and for an ICD, and explain why they differ.",
  "dok": 2,
  "yield": "high",
  "est": 70,
  "objectives": [
   {
    "id": "D13.C6.O1",
    "dok": 2,
    "can": "Describe magnet response for a pacemaker and for an ICD, and explain why they differ."
   },
   {
    "id": "D13.C6.O2",
    "dok": 2,
    "can": "Identify sources of electromagnetic interference and the precautions for each."
   },
   {
    "id": "D13.C6.O3",
    "dok": 2,
    "can": "Set rate, output, and sensitivity on a temporary external pacer and troubleshoot loss of capture."
   },
   {
    "id": "D13.C6.O4",
    "dok": 2,
    "can": "Describe transcutaneous pacing including confirmation of electrical and mechanical capture."
   },
   {
    "id": "D13.C6.O5",
    "dok": 2,
    "can": "Teach device precautions, site care, and when to call."
   }
  ],
  "anccPrimary": "IV",
  "anccAlso": [
   "II"
  ],
  "anccWeight": 25,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 5
 },
 {
  "id": "D14.C1",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "Antiplatelet and anticoagulant therapy",
  "can": "Identify the antiplatelet agents and their mechanisms.",
  "dok": 3,
  "yield": "core",
  "est": 94,
  "objectives": [
   {
    "id": "D14.C1.O1",
    "dok": 1,
    "can": "Identify the antiplatelet agents and their mechanisms."
   },
   {
    "id": "D14.C1.O2",
    "dok": 2,
    "can": "State dual antiplatelet therapy duration by stent type and clinical setting."
   },
   {
    "id": "D14.C1.O3",
    "dok": 2,
    "can": "Compare unfractionated heparin, low molecular weight heparin, and direct oral anticoagulants by monitoring and reversal."
   },
   {
    "id": "D14.C1.O4",
    "dok": 2,
    "can": "Identify the reversal agent for each anticoagulant."
   },
   {
    "id": "D14.C1.O5",
    "dok": 3,
    "can": "Recognize heparin-induced thrombocytopenia and state the immediate management change."
   },
   {
    "id": "D14.C1.O6",
    "dok": 3,
    "can": "Evaluate bleeding versus thrombotic risk in a patient requiring both antiplatelet and anticoagulant therapy."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D14.C2",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "Antiarrhythmic agents",
  "can": "Classify antiarrhythmics by Vaughan Williams class and mechanism.",
  "dok": 3,
  "yield": "core",
  "est": 72,
  "objectives": [
   {
    "id": "D14.C2.O1",
    "dok": 1,
    "can": "Classify antiarrhythmics by Vaughan Williams class and mechanism."
   },
   {
    "id": "D14.C2.O2",
    "dok": 2,
    "can": "Identify the indications and loading protocol for amiodarone."
   },
   {
    "id": "D14.C2.O3",
    "dok": 2,
    "can": "Identify adenosine indications, administration technique, and expected transient effect."
   },
   {
    "id": "D14.C2.O4",
    "dok": 2,
    "can": "State the organ toxicities requiring surveillance for amiodarone and other long-term agents."
   },
   {
    "id": "D14.C2.O5",
    "dok": 3,
    "can": "Recognize proarrhythmia and select the agent to avoid in a patient with structural heart disease or prolonged QT."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D14.C3",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "Vasoactive and inotropic agents",
  "can": "Identify the receptor activity of norepinephrine, epinephrine, dopamine, phenylephrine, and vasopressin.",
  "dok": 3,
  "yield": "core",
  "est": 94,
  "objectives": [
   {
    "id": "D14.C3.O1",
    "dok": 1,
    "can": "Identify the receptor activity of norepinephrine, epinephrine, dopamine, phenylephrine, and vasopressin."
   },
   {
    "id": "D14.C3.O2",
    "dok": 2,
    "can": "Differentiate inotropes from vasopressors by hemodynamic effect."
   },
   {
    "id": "D14.C3.O3",
    "dok": 2,
    "can": "Describe dobutamine and milrinone including the renal clearance difference that changes drug selection."
   },
   {
    "id": "D14.C3.O4",
    "dok": 3,
    "can": "Select the agent matched to a specific shock profile and justify the choice."
   },
   {
    "id": "D14.C3.O5",
    "dok": 3,
    "can": "Titrate to a hemodynamic endpoint and recognize when the endpoint itself is wrong."
   },
   {
    "id": "D14.C3.O6",
    "dok": 2,
    "can": "Identify extravasation risk, central access requirements, and the antidote protocol."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D14.C4",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "Antihypertensive and antianginal agents",
  "can": "Compare nitroglycerin, nitroprusside, nicardipine, clevidipine, and labetalol by onset, effect, and hazard.",
  "dok": 3,
  "yield": "core",
  "est": 64,
  "objectives": [
   {
    "id": "D14.C4.O1",
    "dok": 2,
    "can": "Compare nitroglycerin, nitroprusside, nicardipine, clevidipine, and labetalol by onset, effect, and hazard."
   },
   {
    "id": "D14.C4.O2",
    "dok": 2,
    "can": "Identify the contraindication to nitrates with phosphodiesterase inhibitors and the reason."
   },
   {
    "id": "D14.C4.O3",
    "dok": 2,
    "can": "Differentiate dihydropyridine from non-dihydropyridine calcium channel blockers by clinical effect."
   },
   {
    "id": "D14.C4.O4",
    "dok": 3,
    "can": "Select an intravenous agent for a hypertensive emergency based on the affected end organ."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D14.C5",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "Heart failure pharmacology",
  "can": "Identify the mechanism and monitoring for each GDMT pillar.",
  "dok": 3,
  "yield": "core",
  "est": 64,
  "objectives": [
   {
    "id": "D14.C5.O1",
    "dok": 2,
    "can": "Identify the mechanism and monitoring for each GDMT pillar."
   },
   {
    "id": "D14.C5.O2",
    "dok": 2,
    "can": "Compare loop, thiazide, and potassium-sparing diuretics and describe sequential nephron blockade."
   },
   {
    "id": "D14.C5.O3",
    "dok": 2,
    "can": "Identify digoxin therapeutic range, toxicity signs, and the electrolyte that potentiates toxicity."
   },
   {
    "id": "D14.C5.O4",
    "dok": 3,
    "can": "Adjust a heart failure regimen for worsening renal function or hyperkalemia without abandoning the pillars."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D14.C6",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "Lipid management",
  "can": "Identify statin intensity categories and their LDL reduction targets.",
  "dok": 2,
  "yield": "core",
  "est": 36,
  "objectives": [
   {
    "id": "D14.C6.O1",
    "dok": 1,
    "can": "Identify statin intensity categories and their LDL reduction targets."
   },
   {
    "id": "D14.C6.O2",
    "dok": 2,
    "can": "Identify ezetimibe, PCSK9 inhibitors, and bempedoic acid and when each is added."
   },
   {
    "id": "D14.C6.O3",
    "dok": 2,
    "can": "Recognize statin-associated muscle symptoms and describe the evaluation."
   }
  ],
  "anccPrimary": "II",
  "anccAlso": [
   "III",
   "IV"
  ],
  "anccWeight": 35,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 },
 {
  "id": "D14.C7",
  "domain": "D14",
  "domainName": "Cardiovascular Pharmacology",
  "level": 2,
  "domainWeight": 8,
  "ecg": [],
  "name": "High-alert medication safety",
  "can": "Identify the cardiovascular drugs classified as high-alert.",
  "dok": 4,
  "yield": "core",
  "est": 76,
  "objectives": [
   {
    "id": "D14.C7.O1",
    "dok": 1,
    "can": "Identify the cardiovascular drugs classified as high-alert."
   },
   {
    "id": "D14.C7.O2",
    "dok": 2,
    "can": "Describe independent double check, smart pump, and concentration standardization practices."
   },
   {
    "id": "D14.C7.O3",
    "dok": 3,
    "can": "Identify the clinically significant cardiovascular drug interactions and the monitoring each requires."
   },
   {
    "id": "D14.C7.O4",
    "dok": 4,
    "can": "Reconcile a complete cardiac medication list and identify redundancy, interaction, and a missing indicated agent."
   }
  ],
  "anccPrimary": "III",
  "anccAlso": [
   "IV"
  ],
  "anccWeight": 18,
  "weightSource": "provisional",
  "weightL1": null,
  "weightL2": 8
 }
];
