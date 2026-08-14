/* ============================================================
   ECG & CVRN Review Course
   PRACTICE EXAM POOL

   These items are reserved for scored practice exams only.
   They are deliberately kept out of the practice and spaced
   recall banks so an exam score stays an honest estimate
   rather than a measure of how many answers a learner has
   already seen.

   Rule: an item lives in exactly one pool. If an item moves
   into the recall deck, delete it from here.

   Fields: id, d (domain), c (competency), dok, q (stem),
   o (options), a (index of correct), why (rationale).

   Form assembly and current fill status are computed at run
   time by the exam engine in cvrn-mastery-os.html. Nothing
   here pretends a form is complete when it is not.
   ============================================================ */
window.CVRN_EXAM_POOL = [

/* ---------- D1 Bedside Assessment ---------- */
{id:'X001',d:'D1',c:'D1.C1',dok:3,q:'A 71 year old woman with diabetes reports three days of unusual fatigue, mild nausea, and a sense that she cannot catch her breath climbing stairs. She denies chest pain. Which conclusion is best supported?',
 o:['Her presentation is inconsistent with acute coronary syndrome because she has no chest pain','Anginal equivalents are common in women and patients with diabetes, so this warrants an ischemic workup','Fatigue and nausea in this age group are most likely medication related','A normal initial ECG would rule out ischemia'],a:1,
 why:'Autonomic neuropathy and sex differences in symptom reporting mean ischemia often presents as dyspnea, fatigue, or nausea rather than pain. Waiting for chest pain in this population is how infarcts get missed. A single normal ECG never rules out ACS.'},
{id:'X002',d:'D1',c:'D1.C4',dok:2,q:'A patient has an ankle systolic pressure of 88 mmHg and a brachial systolic pressure of 140 mmHg. What does this indicate?',
 o:['Normal arterial flow','Mild peripheral arterial disease','Moderate peripheral arterial disease','Venous insufficiency'],a:2,
 why:'ABI is 88 divided by 140, which is 0.63. Values from 0.41 to 0.90 indicate mild to moderate peripheral arterial disease, and 0.63 sits in the moderate range. ABI measures arterial, not venous, disease.'},
{id:'X003',d:'D1',c:'D1.C2',dok:2,q:'On exam the apical impulse is palpated in the sixth intercostal space at the anterior axillary line. What does this most likely reflect?',
 o:['Normal position in a tall adult','Left ventricular dilation','Right ventricular hypertrophy','Pericardial effusion'],a:1,
 why:'The normal PMI sits at the fifth intercostal space near the midclavicular line. Lateral and inferior displacement reflects left ventricular enlargement. A large effusion typically muffles rather than displaces the impulse.'},

/* ---------- D2 Basic ECG ---------- */
{id:'X004',d:'D2',c:'D2.C1',dok:2,q:'A rhythm strip shows an R to R interval of 20 small boxes. What is the ventricular rate?',
 o:['50 per minute','60 per minute','75 per minute','100 per minute'],a:2,
 why:'Twenty small boxes equal four large boxes, which is 800 ms. Dividing 300 by four large boxes gives 75. The same math from the other direction: 60000 divided by 800 is 75.'},
{id:'X005',d:'D2',c:'D2.C5',dok:3,q:'A monitored patient shows a constant PR interval of 0.18 seconds with an intermittently dropped QRS and no PR lengthening beforehand. What is the priority?',
 o:['Reassure the patient, this is a benign finding','Prepare for transcutaneous pacing because this block can progress without warning','Give adenosine to unmask the underlying rhythm','Increase the monitor alarm limits and continue observing'],a:1,
 why:'A fixed PR with sudden dropped beats is Mobitz II. The block is infranodal, so it can progress abruptly to complete block with an unreliable escape. Pacing readiness is the point. Mobitz I with progressive PR lengthening is the one that usually tolerates observation.'},
{id:'X006',d:'D2',c:'D2.C3',dok:3,q:'A patient with a known history of ischemic cardiomyopathy has a regular wide complex tachycardia at 168 and is hemodynamically stable. Which action is safest?',
 o:['Give a calcium channel blocker to slow conduction','Treat as ventricular tachycardia','Give adenosine as a diagnostic and therapeutic trial without other preparation','Assume aberrancy because the patient is stable'],a:1,
 why:'A wide complex tachycardia in a patient with structural heart disease is ventricular tachycardia until proven otherwise. Calcium channel blockers can cause hemodynamic collapse in ventricular tachycardia. Stability is not evidence of a supraventricular origin.'},
{id:'X007',d:'D2',c:'D2.C4',dok:2,q:'The monitor shows a chaotic, undulating baseline with no identifiable QRS complexes. The patient is unresponsive with no pulse. What is the immediate action?',
 o:['Synchronized cardioversion','Defibrillation','Transcutaneous pacing','Adenosine push'],a:1,
 why:'Ventricular fibrillation is a pulseless, disorganized rhythm and is defibrillated. Synchronization requires an R wave to sense, which is why the synchronized mode cannot be used here. Pacing does nothing for a fibrillating ventricle.'},
{id:'X008',d:'D2',c:'D2.C6',dok:3,q:'A monitor alarms for ventricular tachycardia. The patient is sitting up brushing her hair and reports feeling fine. What should the nurse do first?',
 o:['Call a rapid response','Assess the patient and check a pulse','Document the rhythm and reset the alarm','Prepare for immediate cardioversion'],a:1,
 why:'Repetitive motion artifact mimics ventricular tachycardia convincingly. The patient is assessed before the tracing is acted on. Treating the monitor instead of the patient produces both unnecessary interventions and missed real events.'},

/* ---------- D3 Coronary Artery Disease ---------- */
{id:'X009',d:'D3',c:'D3.C3',dok:3,q:'A patient presents with chest pain. Initial high-sensitivity troponin is 14 ng/L (upper reference 14) and the two hour value is 62 ng/L. How is this best interpreted?',
 o:['Normal, since the first value was at the reference limit','A significant delta rise consistent with acute myocardial injury','Chronic troponin elevation from renal disease','A laboratory error requiring a repeat draw'],a:1,
 why:'The delta, the change between serial values, carries more diagnostic weight than any single number. A rise of this magnitude over two hours indicates acute injury. Chronic elevation from renal disease is typically stable across serial draws.'},
{id:'X010',d:'D3',c:'D3.C4',dok:2,q:'A patient with an acute STEMI arrives at a facility without PCI capability. Transfer time to a PCI center is estimated at 180 minutes. What is the preferred strategy?',
 o:['Transfer for primary PCI regardless of time','Administer fibrinolytic therapy if there is no contraindication','Wait for serial troponins before deciding','Give aspirin only and admit for observation'],a:1,
 why:'When anticipated first medical contact to device time exceeds 120 minutes, fibrinolysis is preferred if the patient has no contraindication, followed by transfer. The goal is reperfusion within the window, not reperfusion by a preferred route.'},
{id:'X011',d:'D3',c:'D3.C4',dok:3,q:'Three days after an anterior MI, a patient develops sudden dyspnea, a new loud holosystolic murmur, and hypotension. What is the most likely cause?',
 o:['Reinfarction','Papillary muscle rupture with acute mitral regurgitation','Pericarditis','Anxiety related hyperventilation'],a:1,
 why:'A new holosystolic murmur with abrupt hemodynamic decline in the days after an MI points to a mechanical complication. Acute mitral regurgitation from papillary muscle rupture gives the ventricle no time to compensate, which is why it presents as shock rather than gradual failure.'},
{id:'X012',d:'D3',c:'D3.C2',dok:2,q:'Which finding best distinguishes unstable angina from NSTEMI?',
 o:['Presence of ST elevation','Duration of chest pain','Elevation of cardiac troponin','Response to nitroglycerin'],a:2,
 why:'Both are acute coronary syndromes without ST elevation and can present identically. Troponin elevation is what defines NSTEMI. Symptom response to nitroglycerin has no diagnostic value for ischemia.'},
{id:'X013',d:'D3',c:'D3.C5',dok:2,q:'Which statement about cardiac rehabilitation is accurate?',
 o:['It is contraindicated after coronary artery bypass grafting','Phase II is a monitored outpatient exercise and education program','It is limited to patients under 65','It should begin only after six months of recovery'],a:1,
 why:'Phase I is inpatient, phase II is monitored outpatient, and phase III is maintenance. Rehabilitation reduces mortality and readmission after both MI and bypass surgery, and referral is underused rather than restricted.'},

/* ---------- D4 Hypertension ---------- */
{id:'X014',d:'D4',c:'D4.C1',dok:2,q:'A blood pressure cuff that is too small for the patient will most likely produce which result?',
 o:['A falsely low reading','A falsely high reading','An accurate reading with a wider pulse pressure','No measurable reading'],a:1,
 why:'An undersized cuff requires more pressure to occlude the artery, so it reads falsely high. The bladder should encircle at least 80 percent of the arm. Cuff size error is one of the most common reasons a patient is treated for hypertension they do not have.'},
{id:'X015',d:'D4',c:'D4.C5',dok:3,q:'A patient presents with a blood pressure of 232 over 128, a severe headache, and new visual changes. Which is the goal for the first hour?',
 o:['Reduce mean arterial pressure by no more than 20 to 25 percent','Normalize blood pressure to below 120 over 80 immediately','Reduce systolic pressure to 140 within 15 minutes','Withhold treatment until a cause is identified'],a:0,
 why:'This is a hypertensive emergency with end-organ involvement. Cerebral autoregulation has shifted, so rapid normalization causes hypoperfusion and stroke. Controlled reduction of about a quarter of the mean arterial pressure in the first hour is the accepted target.'},
{id:'X016',d:'D4',c:'D4.C3',dok:2,q:'Which antihypertensive class is contraindicated in pregnancy?',
 o:['Labetalol','Methyldopa','ACE inhibitors','Nifedipine'],a:2,
 why:'ACE inhibitors and ARBs are fetotoxic, causing renal dysgenesis and oligohydramnios. Labetalol, methyldopa, and nifedipine are the agents used in pregnancy.'},

/* ---------- D5 Cardiomyopathy ---------- */
{id:'X017',d:'D5',c:'D5.C2',dok:3,q:'A patient with hypertrophic obstructive cardiomyopathy has a systolic murmur. Which maneuver will make the murmur louder?',
 o:['Squatting','Passive leg raise','Valsalva strain','Handgrip'],a:2,
 why:'Valsalva decreases venous return, which shrinks the ventricular cavity and worsens outflow tract obstruction, so the murmur intensifies. Squatting, leg raise, and handgrip all increase preload or afterload and reduce the gradient.'},
{id:'X018',d:'D5',c:'D5.C4',dok:3,q:'Which medication should be avoided in a patient with hypertrophic obstructive cardiomyopathy and symptomatic outflow obstruction?',
 o:['Metoprolol','Verapamil','High dose furosemide','Disopyramide'],a:2,
 why:'Aggressive diuresis reduces preload and worsens the outflow gradient. Negative inotropes such as beta blockers, verapamil, and disopyramide reduce obstruction and are used deliberately. Volume depletion is the common avoidable harm here.'},
{id:'X019',d:'D5',c:'D5.C1',dok:2,q:'A postmenopausal woman develops acute chest pain and apical ballooning on ventriculography after the sudden death of her spouse. Coronary arteries are clean. What is the likely diagnosis?',
 o:['Dilated cardiomyopathy','Takotsubo cardiomyopathy','Restrictive cardiomyopathy','Arrhythmogenic right ventricular cardiomyopathy'],a:1,
 why:'Catecholamine-mediated stress cardiomyopathy presents like an anterior MI with apical ballooning and non-obstructed coronaries. It is usually reversible over weeks, which is what separates management from true infarction.'},

/* ---------- D6 Heart Failure ---------- */
{id:'X020',d:'D6',c:'D6.C4',dok:2,q:'A patient is transitioning from lisinopril to sacubitril-valsartan. What is required?',
 o:['No washout, start immediately','A 36 hour washout period','A 7 day washout period','Concurrent dosing for one week'],a:1,
 why:'Overlapping neprilysin and ACE inhibition raises bradykinin and causes angioedema. A 36 hour washout is required when switching from an ACE inhibitor. No washout is needed when switching from an ARB.'},
{id:'X021',d:'D6',c:'D6.C3',dok:3,q:'A patient with heart failure has cool extremities, narrow pulse pressure, elevated jugular venous pressure, and crackles. Which profile is this and what does it call for?',
 o:['Warm and dry, continue current therapy','Warm and wet, diuresis alone','Cold and wet, diuresis plus consideration of inotropic support','Cold and dry, fluid resuscitation'],a:2,
 why:'Congestion plus hypoperfusion is the cold and wet profile, the highest risk of the four. Diuresis alone may worsen perfusion, so inotropic support is considered alongside decongestion.'},
{id:'X022',d:'D6',c:'D6.C4',dok:3,q:'A patient on guideline-directed therapy has a potassium of 5.4 and a creatinine that has risen 20 percent since starting an MRA. What is the most appropriate response?',
 o:['Discontinue all four GDMT pillars','Reduce or hold the MRA, recheck labs, and review dietary and medication potassium sources','Add a potassium supplement','Continue unchanged and recheck in one month'],a:1,
 why:'A modest creatinine rise after starting an MRA or ACE inhibitor is often expected and not a reason to abandon therapy. The MRA is the pillar most responsible for hyperkalemia, so it is the one adjusted, with the goal of preserving the rest.'},
{id:'X023',d:'D6',c:'D6.C2',dok:2,q:'A BNP result is lower than expected in a patient with clear clinical congestion. Which factor most likely explains this?',
 o:['Advanced age','Obesity','Renal impairment','Atrial fibrillation'],a:1,
 why:'Obesity lowers natriuretic peptide levels and can mask heart failure. Age, renal impairment, and atrial fibrillation all raise levels. A normal BNP in an obese patient does not exclude congestion.'},
{id:'X024',d:'D6',c:'D6.C6',dok:2,q:'Which instruction should a heart failure patient receive about daily weights?',
 o:['Weigh weekly at any time of day','Weigh daily after breakfast in street clothes','Weigh daily on waking, after voiding, in similar clothing, and call for a gain of 2 to 3 pounds in a day or 5 in a week','Weigh only when symptoms occur'],a:2,
 why:'The trend matters more than the number, so conditions have to be consistent. The call thresholds turn a measurement into an action, which is what actually reduces readmission.'},
{id:'X025',d:'D6',c:'D6.C5',dok:3,q:'A patient with acute decompensated heart failure has received escalating IV furosemide doses with minimal urine output and persistent congestion. What is the most appropriate next step?',
 o:['Switch to oral furosemide','Add a thiazide-type diuretic for sequential nephron blockade','Restrict all fluid intake to 500 mL daily as the sole intervention','Discontinue diuretics and observe'],a:1,
 why:'Diuretic resistance from distal tubular sodium reabsorption responds to sequential nephron blockade, typically adding metolazone or chlorothiazide. Oral dosing is less reliable in a congested gut, which is why the switch would worsen the problem.'},
{id:'X026',d:'D6',c:'D6.C1',dok:2,q:'A patient has structural heart disease and prior symptoms of heart failure but is currently asymptomatic on therapy. How is this classified?',
 o:['ACC/AHA Stage B, NYHA Class I','ACC/AHA Stage C, NYHA Class I','ACC/AHA Stage A, NYHA Class II','ACC/AHA Stage D, NYHA Class IV'],a:1,
 why:'Stages do not move backward. Once a patient has had symptoms they remain Stage C even when currently asymptomatic. NYHA class does move with current function, which is exactly why both systems are used.'},

/* ---------- D7 Non-Invasive and Interventional ---------- */
{id:'X027',d:'D7',c:'D7.C3',dok:3,q:'Two hours after femoral cardiac catheterization, a patient reports back pain and becomes hypotensive and tachycardic. The groin site looks unremarkable. What should be suspected?',
 o:['Normal post-procedure discomfort','Retroperitoneal hemorrhage','Contrast reaction','Vasovagal response'],a:1,
 why:'A retroperitoneal bleed can hide entirely from the groin exam. Back or flank pain with unexplained hypotension after femoral access is the classic presentation and requires immediate imaging and volume resuscitation.'},
{id:'X028',d:'D7',c:'D7.C4',dok:2,q:'Which intervention has the strongest evidence for reducing contrast-associated acute kidney injury?',
 o:['N-acetylcysteine','Isotonic intravenous fluid before and after the procedure','Sodium bicarbonate infusion alone','Routine prophylactic dialysis'],a:1,
 why:'Volume expansion with isotonic fluid and limiting contrast volume are the interventions that hold up. N-acetylcysteine has repeatedly failed to show benefit in adequately powered trials.'},
{id:'X029',d:'D7',c:'D7.C1',dok:3,q:'A patient with a left bundle branch block needs evaluation for ischemia and cannot exercise. Which test is most appropriate?',
 o:['Exercise treadmill ECG','Dobutamine stress echocardiogram','Vasodilator nuclear perfusion imaging','Resting ECG alone'],a:2,
 why:'Left bundle branch block makes exercise ECG uninterpretable, and dobutamine can produce false septal defects in this setting. Vasodilator stress with regadenoson or adenosine and perfusion imaging avoids both problems.'},
{id:'X030',d:'D7',c:'D7.C5',dok:2,q:'Which complication is monitored most closely in the first 24 hours after transcatheter aortic valve replacement?',
 o:['Hypoglycemia','New conduction block requiring pacing','Hyperthermia','Delayed gastric emptying'],a:1,
 why:'The valve sits directly against the conduction system, so new left bundle branch block and high grade AV block are the expected complications. A meaningful proportion of these patients need a permanent pacemaker.'},

/* ---------- D8 Heart Sounds and Valves ---------- */
{id:'X031',d:'D8',c:'D8.C4',dok:3,q:'A patient with severe aortic stenosis becomes hypotensive. Which intervention carries the greatest risk?',
 o:['Cautious isotonic fluid','Nitroglycerin infusion','Phenylephrine','Maintaining sinus rhythm'],a:1,
 why:'A stenotic valve creates a fixed obstruction, so cardiac output depends on adequate preload. Nitrates drop preload and can cause abrupt, hard to reverse hypotension. Preserving sinus rhythm matters because the atrial kick contributes a large share of filling.'},
{id:'X032',d:'D8',c:'D8.C2',dok:2,q:'An S3 heard in a 62 year old patient most often indicates what?',
 o:['A normal variant','Rapid early diastolic filling into a volume-overloaded ventricle','Reduced ventricular compliance from hypertrophy','Aortic valve stenosis'],a:1,
 why:'An S3 after roughly age 40 suggests volume overload and is a common finding in decompensated heart failure. The S4 is the sound of a stiff ventricle from hypertrophy.'},
{id:'X033',d:'D8',c:'D8.C6',dok:2,q:'A patient has a mechanical mitral valve. What is the appropriate anticoagulation?',
 o:['Apixaban','Warfarin with an INR target of 2.5 to 3.5','Aspirin alone','Low dose rivaroxaban'],a:1,
 why:'Direct oral anticoagulants are contraindicated with mechanical valves after trials showed increased thromboembolism and bleeding. Mechanical mitral valves need a higher INR target than mechanical aortic valves.'},
{id:'X034',d:'D8',c:'D8.C5',dok:3,q:'A patient develops acute severe mitral regurgitation. Why does this present with pulmonary edema when chronic mitral regurgitation of similar severity may be tolerated for years?',
 o:['The murmur is louder in acute regurgitation','The left atrium has not had time to dilate and become compliant','Acute regurgitation always involves the coronary arteries','Chronic regurgitation does not raise left atrial pressure'],a:1,
 why:'In chronic regurgitation the atrium remodels and accommodates the volume at a lower pressure. Acutely there is no compliance reserve, so pressure transmits straight to the pulmonary circulation. Acute severe regurgitation often has a soft or absent murmur, which makes it easy to miss.'},

/* ---------- D9 12-Lead ---------- */
{id:'X035',d:'D9',c:'D9.C4',dok:3,q:'A 12-lead shows ST elevation in II, III, and aVF with elevation greater in III than in II, plus depression in I and aVL. Which vessel is most likely occluded?',
 o:['Left anterior descending artery','Right coronary artery','Left circumflex artery','Left main coronary artery'],a:1,
 why:'Elevation greater in III than II with reciprocal change in I and aVL points to the right coronary artery. When the circumflex is the culprit, elevation tends to be greater in II than III.'},
{id:'X036',d:'D9',c:'D9.C4',dok:3,q:'A patient with an inferior STEMI has V4R showing 1 mm of ST elevation. Which order should be questioned?',
 o:['Aspirin 324 mg chewed','Nitroglycerin infusion','Isotonic fluid bolus','Heparin per protocol'],a:1,
 why:'ST elevation in V4R confirms right ventricular infarction, which is preload dependent. Nitrates can cause abrupt profound hypotension. Volume, not vasodilation, supports this patient.'},
{id:'X037',d:'D9',c:'D9.C5',dok:3,q:'A patient with a paced ventricular rhythm has chest pain. Which finding would most strongly support acute ischemia?',
 o:['Any ST depression in the lateral leads','ST elevation of 1 mm concordant with the QRS complex','A wide QRS complex','T wave inversion in V1'],a:1,
 why:'Discordant ST changes are expected with paced and left bundle branch block complexes. Concordant elevation of 1 mm or more is the most specific Sgarbossa criterion and carries the highest weight.'},
{id:'X038',d:'D9',c:'D9.C6',dok:2,q:'Which ECG sequence best describes progressive hyperkalemia?',
 o:['ST elevation, then Q waves, then T inversion','Peaked T waves, then P wave flattening with PR prolongation, then QRS widening toward a sine wave','QT shortening, then U waves, then torsades','Delta wave, then wide QRS, then atrial fibrillation'],a:1,
 why:'The progression is predictable and is the reason the ECG is treated as a real-time potassium monitor. Once the QRS widens toward a sine wave, calcium for membrane stabilization comes before anything that shifts or removes potassium.'},
{id:'X039',d:'D9',c:'D9.C5',dok:3,q:'Which finding best distinguishes acute pericarditis from acute STEMI?',
 o:['Chest pain relieved by sitting forward','Diffuse concave ST elevation crossing coronary territories with PR depression','An elevated troponin','Tachycardia'],a:1,
 why:'The distinguishing feature is anatomic. STEMI respects a vascular territory and produces reciprocal change. Pericarditis elevates nearly everywhere with reciprocal change only in aVR. Positional pain is suggestive but not reliable, and pericarditis can raise troponin.'},

/* ---------- D10 Oxygenation ---------- */
{id:'X040',d:'D10',c:'D10.C3',dok:3,q:'ABG results: pH 7.28, PaCO2 30, HCO3 14. How is this best classified?',
 o:['Respiratory acidosis, uncompensated','Metabolic acidosis with partial respiratory compensation','Metabolic alkalosis','Mixed respiratory and metabolic alkalosis'],a:1,
 why:'The pH is acidotic and the bicarbonate is low, which makes the disorder metabolic. The low PaCO2 shows the respiratory system is compensating, and the pH remains outside normal, so compensation is partial rather than full.'},
{id:'X041',d:'D10',c:'D10.C1',dok:3,q:'A patient in cardiogenic shock has a central venous oxygen saturation of 48 percent. What does this indicate?',
 o:['Excessive oxygen delivery','Tissue extraction has increased because delivery is inadequate','Sepsis with impaired extraction','Laboratory error'],a:1,
 why:'A low venous saturation means tissues are pulling more oxygen from each unit of blood because delivery is not keeping up. In early septic shock the pattern is often the opposite, with a normal or high value from impaired extraction.'},
{id:'X042',d:'D10',c:'D10.C5',dok:3,q:'A hypovolemic patient has PEEP increased from 5 to 12. What hemodynamic effect is expected?',
 o:['Increased preload and increased cardiac output','Decreased venous return with a fall in cardiac output','No hemodynamic change','Increased systemic vascular resistance only'],a:1,
 why:'Positive intrathoracic pressure opposes venous return. A patient with adequate volume tolerates this; a hypovolemic patient does not. The same PEEP increase can help a congested patient by reducing preload and afterload, which is why volume status changes the answer.'},

/* ---------- D11 Hemodynamics ---------- */
{id:'X043',d:'D11',c:'D11.C6',dok:3,q:'A patient has a cardiac index of 1.7, a pulmonary artery occlusion pressure of 24, and a systemic vascular resistance of 1900. Which shock state does this describe?',
 o:['Hypovolemic','Distributive','Cardiogenic','Obstructive from pulmonary embolism'],a:2,
 why:'Low output with high filling pressures and high resistance is the cardiogenic pattern. Hypovolemic shock has low filling pressures, distributive shock has low resistance, and a large pulmonary embolism raises right-sided pressures while the wedge stays low.'},
{id:'X044',d:'D11',c:'D11.C2',dok:2,q:'An arterial line transducer is positioned 5 cm below the phlebostatic axis. What is the effect on the reading?',
 o:['Falsely low','Falsely high','No effect if zeroed correctly','Waveform is lost'],a:1,
 why:'A transducer below the axis carries an added hydrostatic column, so the displayed pressure is falsely high by roughly 3.7 mmHg for every 5 cm. Zeroing corrects for atmospheric pressure, not for leveling error.'},
{id:'X045',d:'D11',c:'D11.C2',dok:2,q:'A square wave test produces a flattened waveform with no oscillations on return to baseline. What does this indicate?',
 o:['Optimal damping','Overdamping, which underestimates systolic pressure','Underdamping, which overestimates systolic pressure','A failed transducer requiring replacement'],a:1,
 why:'Overdamping comes from air bubbles, clots, kinks, or a loose connection and blunts the systolic peak. Underdamping shows excessive oscillations and exaggerates systolic pressure. Mean arterial pressure stays comparatively reliable in both.'},
{id:'X046',d:'D11',c:'D11.C4',dok:3,q:'A pulmonary artery catheter tracing suddenly shows a persistent wedge waveform with the balloon deflated. What is the priority action?',
 o:['Inflate the balloon to confirm the reading','Reposition or withdraw the catheter immediately and notify the provider','Flush the line vigorously','Document and recheck in one hour'],a:1,
 why:'A spontaneous wedge means the catheter has migrated distally and is occluding a branch, risking pulmonary infarction or arterial rupture. Inflating the balloon compounds the danger.'},
{id:'X047',d:'D11',c:'D11.C5',dok:2,q:'A patient has a cardiac output of 4.2 L/min and a heart rate of 84. What is the stroke volume?',
 o:['20 mL','35 mL','50 mL','84 mL'],a:2,
 why:'Stroke volume equals cardiac output divided by heart rate, so 4200 mL divided by 84 is 50 mL. Normal is roughly 60 to 100 mL, so this value is low.'},

/* ---------- D12 Assist Devices ---------- */
{id:'X048',d:'D12',c:'D12.C1',dok:3,q:'On an intra-aortic balloon pump waveform, the balloon inflates before the dicrotic notch. What is the consequence?',
 o:['Improved diastolic augmentation with no harm','Premature aortic valve closure with increased afterload and reduced stroke volume','Reduced coronary perfusion only','Loss of the assisted end-diastolic pressure'],a:1,
 why:'Early inflation closes the aortic valve while the ventricle is still ejecting, which increases the work the ventricle has to do. The entire purpose of counterpulsation is to reduce that work, so early inflation reverses the therapy.'},
{id:'X049',d:'D12',c:'D12.C3',dok:3,q:'A durable LVAD patient has rising power, low pulsatility index, and dark urine. What should be suspected?',
 o:['Pump thrombosis with hemolysis','Right ventricular failure','Driveline infection','Suction event from hypovolemia'],a:0,
 why:'Rising power reflects the pump working against a clot, and hemolysis produces hemoglobinuria. A suction event typically shows low flow with a high pulsatility index and responds to volume, which is the opposite management.'},
{id:'X050',d:'D12',c:'D12.C5',dok:3,q:'A durable LVAD patient is found unresponsive with no audible pump hum and no signs of perfusion. What is appropriate?',
 o:['Chest compressions are always contraindicated','Assess the device and controller first, and perform compressions if the pump is not functioning and the patient shows no perfusion','Wait for the LVAD coordinator before any intervention','Defibrillation is contraindicated in LVAD patients'],a:1,
 why:'The old blanket prohibition on compressions has softened. A non-functioning pump with an unperfused patient means the risk of doing nothing exceeds the risk of cannula dislodgement. Defibrillation is not contraindicated.'},

/* ---------- D13 Pacemakers ---------- */
{id:'X051',d:'D13',c:'D13.C4',dok:3,q:'A tracing shows pacing spikes that are not followed by a QRS complex. What is this and what is a common cause?',
 o:['Failure to sense, caused by low sensitivity settings','Failure to capture, caused by lead dislodgement, threshold rise, or electrolyte disturbance','Oversensing, caused by myopotentials','Normal fusion'],a:1,
 why:'A spike without a resulting complex is failure to capture. The output is not enough to depolarize the myocardium, most often from a lead problem, a rising threshold, or a metabolic disturbance such as hyperkalemia or acidosis.'},
{id:'X052',d:'D13',c:'D13.C6',dok:3,q:'A magnet is placed over a permanent pacemaker. What happens?',
 o:['The device is disabled','The device paces asynchronously at a fixed rate','The device increases its sensitivity','The device delivers a shock'],a:1,
 why:'A magnet puts a pacemaker into asynchronous mode, which protects against inhibition from interference such as electrocautery. In an ICD the same magnet suspends tachytherapy without changing the pacing mode, and confusing the two is a frequent error.'},
{id:'X053',d:'D13',c:'D13.C1',dok:2,q:'A device is programmed DDD. What does this code indicate?',
 o:['Paces the ventricle, senses the ventricle, inhibits','Paces both chambers, senses both chambers, and both inhibits and triggers','Paces the atrium only with no sensing','Dual sensing with no pacing capability'],a:1,
 why:'The first position is the chamber paced, the second the chamber sensed, and the third the response. Three Ds mean dual, dual, and dual response, which allows the device to track atrial activity and maintain AV synchrony.'},
{id:'X054',d:'D13',c:'D13.C5',dok:3,q:'A patient with an ICD receives repeated shocks while awake and alert, and the device interrogation shows the shocks were delivered for rapidly conducted atrial fibrillation. How is this best described?',
 o:['Appropriate therapy','Inappropriate shock requiring rate control and device reprogramming','Device failure requiring immediate explant','Expected antitachycardia pacing'],a:1,
 why:'The device met its rate cutoff but the rhythm was supraventricular, so therapy was inappropriate. Management addresses the underlying atrial fibrillation and adjusts detection settings rather than replacing the device.'},

/* ---------- D14 Pharmacology ---------- */
{id:'X055',d:'D14',c:'D14.C1',dok:3,q:'A patient on heparin has a platelet count fall from 240,000 to 85,000 on day six with a new lower extremity clot. What is the correct action?',
 o:['Continue heparin and transfuse platelets','Stop all heparin and start a non-heparin anticoagulant such as argatroban','Stop heparin and start warfarin alone','Reduce the heparin dose by half'],a:1,
 why:'This is heparin-induced thrombocytopenia, a prothrombotic state despite the low platelet count. All heparin sources stop, and an alternative anticoagulant starts. Warfarin alone early can precipitate venous limb gangrene, and platelet transfusion adds fuel.'},
{id:'X056',d:'D14',c:'D14.C2',dok:3,q:'A patient in torsades de pointes has received magnesium. Which medication would worsen the situation?',
 o:['Isoproterenol','Amiodarone','Overdrive pacing','Potassium repletion'],a:1,
 why:'Amiodarone prolongs the QT interval, which is the substrate for torsades. Magnesium, correcting electrolytes, and increasing the rate through pacing or isoproterenol all shorten the QT or suppress the pauses that trigger it.'},
{id:'X057',d:'D14',c:'D14.C3',dok:3,q:'A patient in cardiogenic shock with renal impairment needs inotropic support. Which consideration favors dobutamine over milrinone?',
 o:['Dobutamine has a longer half-life','Milrinone is renally cleared and accumulates in renal impairment','Dobutamine causes more vasodilation','Milrinone has no inotropic effect'],a:1,
 why:'Milrinone is renally cleared with a long half-life, so its effects, including hypotension, persist once they appear. Dobutamine is metabolized and has a short half-life, which makes it easier to titrate and stop.'},
{id:'X058',d:'D14',c:'D14.C4',dok:2,q:'A patient took sildenafil 12 hours ago and now has chest pain. Which order should be questioned?',
 o:['Aspirin 324 mg chewed','Nitroglycerin sublingual','Morphine 2 mg IV','Supplemental oxygen if saturation is below 90 percent'],a:1,
 why:'Combining nitrates with a phosphodiesterase-5 inhibitor causes profound refractory hypotension. The accepted interval is at least 24 hours for sildenafil and vardenafil and 48 hours for tadalafil.'},
{id:'X059',d:'D14',c:'D14.C5',dok:2,q:'Which electrolyte abnormality most increases the risk of digoxin toxicity?',
 o:['Hypernatremia','Hypokalemia','Hypercalcemia alone','Hypochloremia'],a:1,
 why:'Digoxin and potassium compete for the same binding site on the sodium potassium ATPase, so low potassium increases digoxin binding and toxicity at otherwise therapeutic levels. This matters because loop diuretics and digoxin are often prescribed together.'},
{id:'X060',d:'D14',c:'D14.C1',dok:2,q:'Which agent reverses dabigatran?',
 o:['Protamine sulfate','Idarucizumab','Andexanet alfa','Vitamin K'],a:1,
 why:'Idarucizumab is the specific reversal agent for dabigatran, a direct thrombin inhibitor. Andexanet alfa reverses factor Xa inhibitors, protamine reverses heparin, and vitamin K reverses warfarin.'},

/* ============================================================
   DOK 1 BLOCK  (X061 to X075)
   Straight recall. These exist so an exam form can open with
   items that confirm the foundation is there before the form
   asks the learner to apply anything.
   ============================================================ */

{id:'X061',d:'D1',c:'D1.C3',dok:1,q:'Which heart sound is produced by closure of the aortic and pulmonic valves?',
 o:['S1','S2','S3','S4'],a:1,
 why:'S2 marks closure of the semilunar valves, aortic and pulmonic, at the end of ventricular systole. S1 is closure of the mitral and tricuspid valves at the start of systole. S3 and S4 are filling sounds, not valve closure sounds.'},

{id:'X062',d:'D2',c:'D2.C1',dok:1,q:'Which waveform on the ECG represents ventricular repolarization?',
 o:['P wave','QRS complex','T wave','U wave'],a:2,
 why:'The T wave is ventricular repolarization. The P wave is atrial depolarization, the QRS is ventricular depolarization, and the U wave, when visible, is thought to reflect late repolarization of the Purkinje system or papillary muscles.'},

{id:'X063',d:'D2',c:'D2.C2',dok:1,q:'What is the normal intrinsic firing rate of the sinoatrial node in an adult?',
 o:['20 to 40 per minute','40 to 60 per minute','60 to 100 per minute','100 to 140 per minute'],a:2,
 why:'The sinoatrial node fires at 60 to 100 per minute and is therefore the dominant pacemaker. The AV junction is the first backup at 40 to 60, and the ventricular Purkinje escape rate is 20 to 40.'},

{id:'X064',d:'D3',c:'D3.C1',dok:1,q:'Which coronary artery supplies the anterior wall of the left ventricle and most of the interventricular septum?',
 o:['Right coronary artery','Left circumflex artery','Left anterior descending artery','Posterior descending artery'],a:2,
 why:'The left anterior descending artery runs down the anterior interventricular groove and supplies the anterior wall, the anterior two thirds of the septum, and the apex. This is why an LAD occlusion carries the largest infarct burden and the highest risk of pump failure.'},

{id:'X065',d:'D3',c:'D3.C3',dok:1,q:'Which laboratory marker is the most specific indicator of myocardial injury?',
 o:['Creatine kinase, total','Myoglobin','Cardiac troponin','Lactate dehydrogenase'],a:2,
 why:'Cardiac troponin I and T are structural proteins found in cardiac muscle, which makes them the most specific markers of myocardial injury. Myoglobin rises early but is released by any muscle. Total creatine kinase and lactate dehydrogenase are not cardiac specific.'},

{id:'X066',d:'D4',c:'D4.C1',dok:1,q:'Under the 2017 ACC/AHA classification, which blood pressure defines stage 2 hypertension?',
 o:['120 to 129 over less than 80','130 to 139 over 80 to 89','140 over 90 or higher','180 over 120 or higher'],a:2,
 why:'Stage 2 begins at 140 systolic or 90 diastolic. The tier below it, 130 to 139 over 80 to 89, is stage 1, and 120 to 129 over less than 80 is elevated. Readings of 180 over 120 or higher are a hypertensive crisis, not a stage.'},

{id:'X067',d:'D5',c:'D5.C1',dok:1,q:'Which type of cardiomyopathy is the most common?',
 o:['Hypertrophic','Restrictive','Dilated','Arrhythmogenic right ventricular'],a:2,
 why:'Dilated cardiomyopathy accounts for the majority of cases. Chamber enlargement with thin walls produces systolic failure. Hypertrophic is the most common inherited form, restrictive is the least common, and arrhythmogenic right ventricular cardiomyopathy is rare.'},

{id:'X068',d:'D6',c:'D6.C1',dok:1,q:'What does New York Heart Association class III describe?',
 o:['No limitation of physical activity','Slight limitation, comfortable at rest, ordinary activity causes symptoms','Marked limitation, comfortable at rest, less than ordinary activity causes symptoms','Symptoms at rest'],a:2,
 why:'Class III is marked limitation. The patient is comfortable at rest but less than ordinary activity brings on symptoms. Class II is symptoms with ordinary activity, and class IV is symptoms at rest. NYHA class describes current function and can move in both directions, unlike ACC/AHA stages.'},

{id:'X069',d:'D6',c:'D6.C4',dok:1,q:'Which four drug classes make up guideline-directed medical therapy for heart failure with reduced ejection fraction?',
 o:['ACE inhibitor or ARNI, beta blocker, mineralocorticoid receptor antagonist, SGLT2 inhibitor','Digoxin, loop diuretic, nitrate, hydralazine','Calcium channel blocker, statin, aspirin, beta blocker','Amiodarone, warfarin, loop diuretic, ACE inhibitor'],a:0,
 why:'The four pillars are renin angiotensin system inhibition preferably with an ARNI, a beta blocker proven in heart failure, a mineralocorticoid receptor antagonist, and an SGLT2 inhibitor. Each lowers mortality independently. Diuretics relieve symptoms but do not extend survival.'},

{id:'X070',d:'D7',c:'D7.C1',dok:1,q:'Which non-invasive test measures ejection fraction, wall motion, and valve function at the bedside without radiation?',
 o:['Transthoracic echocardiogram','Cardiac computed tomography angiography','Nuclear perfusion imaging','Exercise treadmill test'],a:0,
 why:'Transthoracic echocardiography uses ultrasound, so it carries no radiation, needs no contrast in its basic form, and can be done at the bedside. It is the standard first test for ventricular function and valve disease.'},

{id:'X071',d:'D8',c:'D8.C3',dok:1,q:'What separates a grade IV murmur from a grade III murmur?',
 o:['A grade IV is heard without a stethoscope','A grade IV has a palpable thrill','A grade IV is holosystolic','A grade IV radiates to the neck'],a:1,
 why:'Grade IV is the point at which a palpable thrill appears. Grades I through III are increasingly loud but have no thrill. Grade V needs only the edge of the stethoscope on the chest, and grade VI is audible with the stethoscope lifted off the chest.'},

{id:'X072',d:'D9',c:'D9.C2',dok:1,q:'What is the upper limit of a normal QRS duration?',
 o:['0.08 seconds','0.10 seconds','0.12 seconds','0.20 seconds'],a:2,
 why:'A QRS of less than 0.12 seconds, meaning under three small boxes, is narrow and indicates supraventricular conduction through the His Purkinje system. At 0.12 seconds or more the complex is wide, which points to bundle branch block, ventricular origin, pacing, or a conduction poison such as hyperkalemia.'},

{id:'X073',d:'D10',c:'D10.C4',dok:1,q:'A nasal cannula running at 4 liters per minute delivers approximately what fraction of inspired oxygen?',
 o:['0.28','0.36','0.50','0.70'],a:1,
 why:'A nasal cannula adds roughly 4 percentage points of FiO2 per liter above room air at 21 percent, so 4 liters gives about 36 percent. The number is an estimate only, because the actual value falls as minute ventilation rises and the patient entrains more room air.'},

{id:'X074',d:'D11',c:'D11.C3',dok:1,q:'What is the normal range for central venous pressure?',
 o:['0 to 1 mmHg','2 to 6 mmHg','8 to 12 mmHg','15 to 20 mmHg'],a:1,
 why:'Normal central venous pressure is 2 to 6 mmHg measured at the phlebostatic axis at end expiration. It reflects right ventricular preload and is raised by volume overload, right heart failure, tamponade, and high intrathoracic pressure.'},

{id:'X075',d:'D13',c:'D13.C2',dok:1,q:'In the NBG pacemaker code, what does the third letter describe?',
 o:['The chamber paced','The chamber sensed','The response to a sensed event','The rate response feature'],a:2,
 why:'Position one is the chamber paced, position two is the chamber sensed, and position three is the response to sensing, given as I for inhibited, T for triggered, D for dual, or O for none. Position four covers rate modulation.'},

/* ============================================================
   DOK 2 BLOCK  (X076 to X094)
   Apply a rule, run a calculation, classify a finding.
   ============================================================ */

{id:'X076',d:'D1',c:'D1.C5',dok:2,q:'Over two hours a post-operative cardiac surgery patient moves from a blood pressure of 118 over 62 to 106 over 88, with the respiratory rate rising from 16 to 26 and new restlessness. Which interpretation is best supported?',
 o:['The patient is stable because the systolic pressure is above 100','The narrowing pulse pressure with tachypnea and restlessness suggests falling stroke volume and warrants escalation','The changes reflect normal post-operative pain and can be treated with analgesia alone','A rising diastolic pressure indicates improving cardiac output'],a:1,
 why:'Pulse pressure fell from 56 to 18. A narrowing pulse pressure means stroke volume is dropping while vasoconstriction holds the systolic number up. Tachypnea and restlessness are early compensation for low output or blood loss. Systolic pressure is the last number to fall, so waiting for it is waiting too long.'},

{id:'X077',d:'D2',c:'D2.C6',dok:2,q:'A monitor shows low amplitude complexes that intermittently drop out. The patient is diaphoretic and the electrode gel is dry. What is the first action?',
 o:['Increase the monitor gain and continue observing','Change the electrodes and prepare the skin before reapplying','Obtain a 12-lead ECG to look for a new conduction defect','Silence the alarm and reassess in one hour'],a:1,
 why:'Dry gel and moist skin both break the electrode to skin interface, which produces low amplitude and dropout. Fix the source before adjusting the display. Raising the gain magnifies noise along with signal and can create false alarms.'},

{id:'X078',d:'D3',c:'D3.C4',dok:2,q:'Forty minutes after fibrinolytic therapy for an inferior STEMI, the patient reports the chest pain has resolved and the ST elevation has fallen by more than half. What does this most likely indicate?',
 o:['Reperfusion of the infarct related artery','Failed lysis requiring immediate rescue PCI','Development of pericarditis','A false positive initial diagnosis'],a:0,
 why:'Successful reperfusion shows as relief of pain, resolution of at least 50 percent of the ST elevation by 60 to 90 minutes, and often accelerated idioventricular rhythm. Failed lysis shows the opposite and triggers transfer for rescue PCI.'},

{id:'X079',d:'D3',c:'D3.C5',dok:2,q:'Six weeks after a myocardial infarction, a patient taking moderate intensity atorvastatin has an LDL cholesterol of 96 mg/dL. What is the appropriate next step?',
 o:['Continue the current dose since the LDL is under 100','Stop the statin and start a fibrate','Intensify to high intensity statin therapy and recheck in four to twelve weeks','Add niacin to the current regimen'],a:2,
 why:'After an acute coronary syndrome the LDL goal is less than 70 mg/dL, and less than 55 mg/dL for very high risk patients. Reaching 96 on moderate intensity therapy means the dose is not doing enough. Move to high intensity statin first, then consider ezetimibe or a PCSK9 inhibitor if the goal is still missed.'},

{id:'X080',d:'D4',c:'D4.C3',dok:2,q:'A 54 year old Black patient with no heart failure, no chronic kidney disease, and no diabetes needs first line therapy for stage 2 hypertension. Which choice is preferred?',
 o:['An ACE inhibitor alone','A thiazide type diuretic or a calcium channel blocker','A beta blocker alone','An alpha blocker alone'],a:1,
 why:'In Black adults without a compelling indication, thiazide type diuretics and calcium channel blockers lower blood pressure more effectively than renin angiotensin blockers used alone, and they reduce stroke risk more. If heart failure or albuminuric kidney disease is present, an ACE inhibitor or ARB is added regardless.'},

{id:'X081',d:'D5',c:'D5.C5',dok:2,q:'Which finding most supports placing an implantable defibrillator for primary prevention in nonischemic dilated cardiomyopathy?',
 o:['An ejection fraction of 35 percent or less with NYHA class II or III symptoms after at least three months of optimal therapy','A single episode of nonsustained ventricular tachycardia on telemetry','A brain natriuretic peptide above 1000','A left ventricular end diastolic diameter above 60 mm'],a:0,
 why:'Primary prevention criteria hinge on an ejection fraction of 35 percent or less with class II or III symptoms after at least three months of guideline directed therapy, plus an expected survival over one year. Ejection fraction is measured after therapy because many patients recover function and no longer qualify.'},

{id:'X082',d:'D6',c:'D6.C3',dok:2,q:'A heart failure patient reports early satiety, abdominal fullness, and worsening leg swelling, but denies orthopnea and has clear lung fields. Which pattern does this fit?',
 o:['Predominantly left sided congestion','Predominantly right sided congestion','Low output without congestion','Noncardiac abdominal disease only'],a:1,
 why:'Early satiety, abdominal fullness from hepatic and gut congestion, and dependent edema are right sided congestion. Left sided congestion backs into the pulmonary circuit and shows as orthopnea, paroxysmal nocturnal dyspnea, and crackles. Clear lungs with a swollen abdomen point right, not left.'},

{id:'X083',d:'D6',c:'D6.C5',dok:2,q:'A patient arrives with sudden severe dyspnea, diffuse crackles, an oxygen saturation of 84 percent, and a blood pressure of 196 over 104. Body weight is unchanged from last week. Which initial approach fits best?',
 o:['Large dose intravenous diuretic as the single priority','Intravenous vasodilator with noninvasive positive pressure ventilation','Intravenous fluid bolus to improve preload','Immediate intubation and a beta blocker infusion'],a:1,
 why:'This is sympathetic crashing acute pulmonary edema. The problem is redistribution of fluid into the lungs driven by a sudden rise in afterload, not total body volume overload, which is why the weight has not changed. Afterload reduction with nitroglycerin and positive pressure ventilation reverses it quickly. Heavy diuresis in this setting can leave the patient volume depleted.'},

{id:'X084',d:'D7',c:'D7.C3',dok:2,q:'Four hours after radial artery access, a patient reports increasing hand pain with pallor and numbness. The compression band is in place at the access site. What is the priority action?',
 o:['Tighten the band further to control bleeding','Remove the band completely and apply direct pressure','Release band pressure in small steps while watching for bleeding and reassessing perfusion','Elevate the arm and continue monitoring'],a:2,
 why:'Pain, pallor, and numbness point to the band being tight enough to obstruct arterial inflow. Patent hemostasis means the least pressure that stops bleeding while flow continues. Step the pressure down gradually so the site is not left unsupported.'},

{id:'X085',d:'D7',c:'D7.C4',dok:2,q:'A patient taking metformin with an eGFR of 42 is scheduled for coronary angiography with iodinated contrast. What is the appropriate medication action?',
 o:['Continue metformin without change','Hold metformin at the time of the procedure and restart after 48 hours once renal function is confirmed stable','Stop metformin permanently','Double the metformin dose to offset contrast effects'],a:1,
 why:'Metformin is cleared by the kidney. If contrast injures the kidney, metformin accumulates and raises the risk of lactic acidosis. With an eGFR from 30 to 60 receiving arterial contrast, hold the dose and restart after 48 hours once creatinine is confirmed stable.'},

{id:'X086',d:'D8',c:'D8.C4',dok:2,q:'A patient with known severe aortic stenosis reports two episodes of syncope on exertion in the past month. What does this add?',
 o:['Nothing, syncope is common and nonspecific','It marks symptomatic severe stenosis, which sharply shortens survival without valve replacement','It indicates the stenosis has become mild','It suggests the primary problem is vasovagal'],a:1,
 why:'Once severe aortic stenosis becomes symptomatic the survival curve drops steeply. Average survival is roughly five years after angina, three years after syncope, and two years after heart failure symptoms. Symptoms move the patient from watchful waiting to valve replacement.'},

{id:'X087',d:'D9',c:'D9.C3',dok:2,q:'A 12-lead shows a QRS duration of 0.14 seconds, a broad monophasic R wave in leads I and V6, and a deep QS complex in V1. What is this?',
 o:['Right bundle branch block','Left bundle branch block','Ventricular paced rhythm with normal function','Left ventricular hypertrophy with strain'],a:1,
 why:'A wide QRS with a broad monophasic R in the lateral leads and a QS or rS in V1 is left bundle branch block. Right bundle branch block produces the opposite, an rSR pattern in V1 with a wide slurred S in I and V6. This pattern also obscures ordinary ST criteria for infarction, which is why Sgarbossa criteria exist.'},

{id:'X088',d:'D10',c:'D10.C2',dok:2,q:'A patient has an oxygen saturation of 90 percent with a normal pH and temperature. What is the approximate arterial oxygen tension?',
 o:['40 mmHg','60 mmHg','80 mmHg','100 mmHg'],a:1,
 why:'Three reference points anchor the oxyhemoglobin dissociation curve: saturation 90 matches a PaO2 near 60, saturation 80 matches 50, and saturation 70 matches 40. Saturation 90 sits at the top of the steep part of the curve, so any further fall produces a rapid drop in oxygen content.'},

{id:'X089',d:'D11',c:'D11.C5',dok:2,q:'A patient has a mean arterial pressure of 62 mmHg, a central venous pressure of 8 mmHg, and a cardiac output of 5.0 liters per minute. What is the systemic vascular resistance?',
 o:['432 dynes per second per cm to the fifth','864 dynes per second per cm to the fifth','1120 dynes per second per cm to the fifth','1400 dynes per second per cm to the fifth'],a:1,
 why:'SVR equals mean arterial pressure minus central venous pressure, divided by cardiac output, times 80. That is 62 minus 8, which is 54, divided by 5, which is 10.8, times 80, which is 864. Normal is roughly 800 to 1200, so this sits at the low end and fits a vasodilated state.'},

{id:'X090',d:'D12',c:'D12.C2',dok:2,q:'A patient on a percutaneous left ventricular assist device develops a suction alarm, a flattened motor current waveform, and a rising plasma free hemoglobin. What is the most likely cause?',
 o:['The device is correctly positioned and the alarm is artifact','The inlet is against the ventricular wall or the ventricle is underfilled','The patient has developed aortic regurgitation','The purge solution concentration is too high'],a:1,
 why:'Suction alarms mean the inlet cannot get enough volume, either because the catheter has migrated against the wall or because preload has dropped. Continued suction shears red cells, which is why plasma free hemoglobin rises. Assess position with imaging and treat volume status before assuming device failure.'},

{id:'X091',d:'D12',c:'D12.C4',dok:2,q:'A patient on femoral venoarterial ECMO has a right radial arterial saturation of 84 percent while the circuit post-oxygenator saturation is 100 percent and the left femoral arterial saturation is 99 percent. What does this indicate?',
 o:['Oxygenator failure','Differential hypoxia, with poorly oxygenated native cardiac output perfusing the upper body','Circuit recirculation','A miscalibrated pulse oximeter'],a:1,
 why:'This is differential hypoxia, also called harlequin or north south syndrome. As the native heart recovers, it ejects blood that passed through injured lungs into the aortic root and up the arch, while the retrograde femoral circuit flow serves the lower body. Monitor the right radial artery, since it reflects what the brain and right coronary receive. Treatment options include improving native lung gas exchange or converting to a venoarteriovenous configuration.'},

{id:'X092',d:'D13',c:'D13.C3',dok:2,q:'A pacemaker dependent patient has spikes at the programmed rate with no QRS after most of them. Potassium is 6.1 mmol/L and the patient was started on a new antiarrhythmic yesterday. What is the most likely explanation?',
 o:['Oversensing of myopotentials','A rise in the pacing threshold above the programmed output','Lead dislodgement into the atrium','Normal device function with fusion beats'],a:1,
 why:'Hyperkalemia and class IC antiarrhythmics both raise the myocardial capture threshold, so the programmed output no longer depolarizes tissue. Spikes present with no capture points to threshold, not to sensing. Correct the potassium, review the drug, and expect the device to need output reprogramming.'},

{id:'X093',d:'D14',c:'D14.C1',dok:2,q:'A patient on warfarin for atrial fibrillation has an INR of 6.2 with no bleeding and no planned procedure. What is the appropriate management?',
 o:['Give four factor prothrombin complex concentrate now','Hold warfarin and monitor, with oral vitamin K considered if the risk of bleeding is high','Give fresh frozen plasma and hold warfarin','Continue the current dose and recheck in one week'],a:1,
 why:'With an INR from 4.5 to 10 and no bleeding, holding doses and monitoring is enough for most patients, and low dose oral vitamin K is reserved for those at high bleeding risk. Prothrombin complex concentrate and plasma are for serious bleeding or urgent reversal, and both carry thrombotic and volume risks.'},

{id:'X094',d:'D14',c:'D14.C7',dok:2,q:'Which practice most reduces harm from high alert vasoactive infusions?',
 o:['Allowing each nurse to choose a familiar concentration','Standardized concentrations with smart pump limits and an independent double check at initiation and rate change','Documenting the rate every four hours','Rounding doses to whole numbers for easier calculation'],a:1,
 why:'Errors with vasoactive drugs come from concentration confusion and mistyped rates. Standard concentrations remove one variable, smart pump dose limits catch the outliers, and an independent double check at start and at every rate change catches the rest. An independent check means a second clinician calculates separately, not simply agrees.'},

/* ============================================================
   DOK 4 BLOCK  (X095 to X099)
   Extended reasoning. Each stem carries conflicting data and
   asks the learner to weigh several competencies at once and
   defend a plan, not to name a single finding.
   ============================================================ */

{id:'X095',d:'D3',c:'D3.C4',dok:4,q:'A 68 year old arrives 90 minutes into crushing chest pain. The 12-lead shows 3 mm of ST elevation in II, III, and aVF with reciprocal depression in I and aVL. Blood pressure is 82 over 54, heart rate 46, lungs clear, jugular veins distended. The nearest PCI center is 25 minutes away. A colleague has already drawn up nitroglycerin and morphine. Which plan best fits the whole picture?',
 o:['Give the nitroglycerin, then activate the cath lab','Hold nitrates, obtain right sided leads, give a cautious fluid challenge, and activate the cath lab for primary PCI','Give fibrinolytics now because the pressure is too low for transfer','Treat the bradycardia with atropine and observe for one hour before deciding'],a:1,
 why:'Four threads have to be pulled together. First, inferior ST elevation with hypotension, clear lungs, and distended neck veins is right ventricular infarction until proven otherwise, so V4R comes before any drug. Second, the right ventricle in that state is preload dependent, so nitrates and morphine can drop the pressure sharply. Third, transfer time of 25 minutes is well inside the 120 minute first medical contact to device window, so primary PCI beats fibrinolysis. Fourth, the bradycardia usually reflects the same right coronary occlusion and improves with reperfusion, so it is not the target. The order matters as much as the elements.'},

{id:'X096',d:'D6',c:'D6.C4',dok:4,q:'A patient with an ejection fraction of 28 percent is on sacubitril-valsartan, carvedilol, and spironolactone. Today the creatinine has risen from 1.1 to 1.5 mg/dL, potassium is 5.3 mmol/L, blood pressure is 96 over 58, and the patient feels better than last month with no orthopnea and no edema. An SGLT2 inhibitor has not been started. What is the most defensible plan?',
 o:['Stop the spironolactone and the sacubitril-valsartan and recheck in one week','Hold nothing, reduce the diuretic, recheck chemistry in three to five days, counsel on potassium sources, and start the SGLT2 inhibitor','Increase the loop diuretic to protect the kidney','Stop all four pillar medications until the creatinine returns to baseline'],a:1,
 why:'The temptation is to read a rising creatinine as harm and pull back therapy. Look at what changed instead. The patient is dry by exam and feels better, which points at over diuresis as the driver rather than the disease drugs. A creatinine rise up to about 30 percent above baseline that plateaus is expected with renin angiotensin blockade and does not by itself require stopping. Potassium at 5.3 is manageable with dietary review before dose changes. The SGLT2 inhibitor is the missing mortality benefit and produces its own small early creatinine dip that then recovers. Stopping pillars is the single most common cause of avoidable readmission in this population.'},

{id:'X097',d:'D9',c:'D9.C5',dok:4,q:'A 52 year old with 40 minutes of chest pain has a 12-lead showing 2 mm of ST depression in V1 through V3 with tall R waves in V2 and upright T waves, plus 1 mm of ST depression in I and aVL. Troponin is pending, blood pressure is 138 over 80. The emergency physician plans a stress test in the morning. What is the strongest interpretation and action?',
 o:['This is a nonspecific pattern and a morning stress test is reasonable','This is anterior subendocardial ischemia and heparin alone is enough','This is a posterior STEMI equivalent, so obtain V7 to V9 and activate the cath lab','This is early repolarization and needs no further workup'],a:2,
 why:'Anterior ST depression is not always anterior ischemia. Leads V1 through V3 look at the posterior wall from the front, so a posterior injury current shows up inverted, as ST depression with tall R waves and upright T waves. Posterior leads V7 to V9 convert the mirror image back into recognizable ST elevation, and 0.5 mm there is diagnostic. The reciprocal depression in I and aVL fits a circumflex territory event. Treating this as a non-STEMI and waiting for a morning stress test lets a full thickness infarct complete overnight. This is the classic missed STEMI on the certification exam and in practice.'},

{id:'X098',d:'D11',c:'D11.C6',dok:4,q:'A patient two days after mitral valve replacement has a blood pressure of 84 over 52, heart rate 118, central venous pressure 18 mmHg, pulmonary artery occlusion pressure 19 mmHg, cardiac index 1.6, systemic vascular resistance 1580, and mixed venous oxygen saturation 51 percent. Chest radiograph shows a widened mediastinum and the heart sounds are muffled. Which reading of the data is best supported?',
 o:['Distributive shock, so start norepinephrine and give fluid','Cardiogenic shock from ventricular failure, so start dobutamine and diurese','Obstructive shock from tamponade, so support filling and prepare for urgent surgical evaluation','Hypovolemic shock, so give two liters of crystalloid'],a:2,
 why:'Read the numbers as a set. Low cardiac index with high systemic vascular resistance and low mixed venous saturation says the problem is forward flow, not vasodilation, which rules out distributive shock. What separates tamponade from pump failure is the equalization of filling pressures, with central venous pressure and occlusion pressure nearly the same at 18 and 19, combined with muffled sounds and a widened mediastinum two days after cardiac surgery. Diuresis would remove the preload this patient depends on, and inotropes cannot fill a ventricle that is being squeezed from outside. Support filling, avoid anything that drops preload, and get the surgical team now.'},

{id:'X099',d:'D14',c:'D14.C2',dok:4,q:'A patient admitted with heart failure is on amiodarone, digoxin, furosemide, and warfarin. Levofloxacin was started yesterday for pneumonia and ondansetron was given twice for nausea. Today: potassium 3.2 mmol/L, magnesium 1.4 mg/dL, QTc 530 ms, and a run of polymorphic ventricular tachycardia. Which analysis best explains the event and directs care?',
 o:['Digoxin toxicity is the sole cause, so give digoxin immune Fab','Several QT prolonging drugs stacked on top of low potassium and low magnesium, so repair the electrolytes, give magnesium, and remove the avoidable QT offenders','This is monomorphic ventricular tachycardia from ischemia, so give more amiodarone','The warfarin interaction with levofloxacin caused the arrhythmia'],a:1,
 why:'No single agent explains this. Amiodarone, levofloxacin, and ondansetron each prolong repolarization, and their effects add. Furosemide drove potassium and magnesium down, and both losses lengthen the QT further and destabilize the membrane. That combination produces torsades de pointes, which is polymorphic by definition. Management is magnesium regardless of the serum level, aggressive potassium replacement to the high normal range, and stopping every avoidable QT prolonging drug. Adding more amiodarone would extend the QT and worsen it. The warfarin and levofloxacin interaction raises INR and bleeding risk but has nothing to do with repolarization.'}
,

/* ---------- D3 top-up: coronary artery disease is the single
     heaviest block on the blueprint at 14 percent, so the pool
     carries proportional weight rather than nominal coverage ---------- */

{id:'X100',d:'D3',c:'D3.C2',dok:1,q:'Which term describes chest pain that is brought on by a predictable amount of exertion and relieved within minutes by rest or nitroglycerin?',
 o:['Unstable angina','Stable angina','Prinzmetal angina','Acute myocardial infarction'],a:1,
 why:'Stable angina is reproducible, predictable, and relieved by rest or nitroglycerin within about five minutes. Unstable angina is new, occurs at rest, or has become more frequent or severe. Prinzmetal angina comes from coronary vasospasm and typically occurs at rest, often at night.'},

{id:'X101',d:'D3',c:'D3.C1',dok:2,q:'A patient has a 10 year atherosclerotic cardiovascular disease risk of 9.4 percent, an LDL of 142 mg/dL, no diabetes, and a blood pressure of 134 over 84. Which management step fits current risk based guidance?',
 o:['No pharmacologic therapy is indicated at any risk level below 10 percent','Discuss moderate intensity statin therapy, since this is intermediate risk, and use risk enhancing factors to settle the decision','Start high intensity statin plus ezetimibe immediately','Repeat the lipid panel in five years'],a:1,
 why:'A 10 year risk of 7.5 to 19.9 percent is intermediate, and the guideline calls for a clinician and patient discussion rather than an automatic yes or no. Risk enhancing factors such as family history of premature disease, persistent LDL of 160 or more, chronic kidney disease, inflammatory disease, or a raised lipoprotein(a) tip the decision toward starting a moderate intensity statin. A coronary calcium score can settle the question when the decision stays uncertain.'},

{id:'X102',d:'D3',c:'D3.C3',dok:2,q:'A patient with chest pain has a high sensitivity troponin of 8 ng/L on arrival and 47 ng/L at one hour, with the assay upper reference limit at 14 ng/L. How is this best read?',
 o:['A single value below the reference limit rules out infarction','The rise across serial draws indicates acute myocardial injury and warrants an ischemic pathway','The result is a false positive because the first value was normal','Troponin should be repeated at six hours before any conclusion'],a:1,
 why:'High sensitivity assays are read as a pattern, not a single number. A significant delta across a one hour or two hour protocol identifies acute injury even when the first draw is normal, because the first draw may have been taken before release began. A flat elevated value across draws suggests chronic injury instead. Waiting six hours discards the advantage the high sensitivity assay provides.'},

{id:'X103',d:'D3',c:'D3.C5',dok:3,q:'A patient six weeks after drug eluting stent placement asks to stop clopidogrel because of easy bruising, while continuing aspirin. Which response is best supported?',
 o:['Stopping clopidogrel now is reasonable since aspirin alone prevents stent thrombosis','Early discontinuation of the P2Y12 inhibitor carries a high risk of stent thrombosis, so the bruising should be evaluated and the decision made with cardiology','Both antiplatelet agents should be stopped and restarted in one month','Switch to warfarin, which causes less bruising'],a:1,
 why:'Until the stent endothelializes, the P2Y12 inhibitor is what prevents stent thrombosis, an event that presents as an acute infarct and carries high mortality. Minor bruising is expected on dual antiplatelet therapy and is not by itself a reason to stop. Evaluate for a real bleeding source, review interacting drugs, and make any change with the interventional team. Warfarin does not prevent platelet mediated stent thrombosis.'}

];
