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
 why:'Idarucizumab is the specific reversal agent for dabigatran, a direct thrombin inhibitor. Andexanet alfa reverses factor Xa inhibitors, protamine reverses heparin, and vitamin K reverses warfarin.'}

];
