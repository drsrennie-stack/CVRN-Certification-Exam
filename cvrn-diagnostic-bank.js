/* ============================================================
   ECG & CVRN Review Course
   DIAGNOSTIC POOL  ·  third pool, reserved for the gap finder

   Three pools, no item ever crosses between them:
     1. cvrn-diagnostic-bank.js   the gap finder            (this file)
     2. practice and recall decks the ECG lab, study notes
     3. cvrn-exam-bank.js         scored practice exams

   That separation is what lets a practice exam score stay an
   estimate rather than a memory test, and it lets the gap
   finder be re-run without the learner recognizing items.

   Design rules for this pool:
   - Every item is DOK 2. Application discriminates best when
     the system knows nothing about the learner yet. DOK 1 is
     too easy to carry signal; DOK 3 confounds a knowledge gap
     with a reasoning gap on the first pass.
   - Each FORM is independently blueprint-proportional, so
     re-running form B gives a comparable read to form A, not a
     different-shaped exam.
   - One rationale per item. Full per-option rationale lives in
     the exam pool and the notes; the gap finder is a locator.

   Fields: id, form, d (domain), c (competency), dok, q, o, a, why
   ============================================================ */
window.CVRN_DIAGNOSTIC_POOL = [

/* ================= FORM A ================= */

/* D1 Bedside Assessment, 3 */
{id:'GA01',form:'A',d:'D1',c:'D1.C3',dok:2,q:'Where is the mitral valve best auscultated?',
 o:['Second intercostal space, right sternal border','Second intercostal space, left sternal border','Fifth intercostal space, midclavicular line','Fourth intercostal space, left sternal border'],a:2,
 why:'The mitral area is the apex, fifth intercostal space at the midclavicular line. The other three are aortic, pulmonic, and tricuspid.'},
{id:'GA02',form:'A',d:'D1',c:'D1.C2',dok:2,q:'Jugular venous distension measured at 5 cm above the sternal angle with the head of bed at 45 degrees most directly indicates what?',
 o:['Left ventricular failure','Elevated right atrial pressure','Aortic stenosis','Hypovolemia'],a:1,
 why:'The jugular veins are a manometer for the right atrium. Elevation reflects right-sided filling pressure, whatever the upstream cause.'},
{id:'GA03',form:'A',d:'D1',c:'D1.C4',dok:2,q:'A patient has cool, pale, hairless lower legs with pain that worsens on walking and improves with rest. This pattern indicates what?',
 o:['Venous insufficiency','Arterial insufficiency','Lymphedema','Deep vein thrombosis'],a:1,
 why:'Claudication with cool, pale, hairless skin is arterial. Venous disease gives warm, brown-stained, edematous legs with pain relieved by elevation.'},

/* D2 Basic ECG, 4 */
{id:'GA04',form:'A',d:'D2',c:'D2.C1',dok:2,q:'At standard paper speed, how much time does one small box represent?',
 o:['0.02 seconds','0.04 seconds','0.10 seconds','0.20 seconds'],a:1,
 why:'At 25 mm per second one small box is 0.04 seconds and one large box is 0.20 seconds.'},
{id:'GA05',form:'A',d:'D2',c:'D2.C3',dok:2,q:'A rhythm is irregularly irregular with no discernible P waves. What is it?',
 o:['Atrial flutter','Atrial fibrillation','Multifocal atrial tachycardia','Sinus arrhythmia'],a:1,
 why:'Absent organized atrial activity plus an irregularly irregular ventricular response defines atrial fibrillation.'},
{id:'GA06',form:'A',d:'D2',c:'D2.C5',dok:2,q:'The PR interval lengthens progressively over three beats and then a QRS is dropped. What is this?',
 o:['First degree AV block','Mobitz type I','Mobitz type II','Third degree AV block'],a:1,
 why:'Progressive PR lengthening before a dropped beat is Wenckebach, Mobitz type I, usually within the AV node.'},
{id:'GA07',form:'A',d:'D2',c:'D2.C4',dok:2,q:'A wide complex rhythm at 180 per minute is regular and uniform in shape. What is the most likely rhythm?',
 o:['Supraventricular tachycardia','Monomorphic ventricular tachycardia','Atrial flutter with 2 to 1 conduction','Junctional tachycardia'],a:1,
 why:'Wide, fast, regular, and uniform is monomorphic ventricular tachycardia, and in structural heart disease it is assumed until proven otherwise.'},

/* D3 Coronary Artery Disease, 6 */
{id:'GA08',form:'A',d:'D3',c:'D3.C2',dok:2,q:'What distinguishes unstable angina from NSTEMI?',
 o:['ST elevation on the ECG','Troponin elevation','Duration of chest pain','Response to nitroglycerin'],a:1,
 why:'They can present identically. Troponin elevation is what defines NSTEMI.'},
{id:'GA09',form:'A',d:'D3',c:'D3.C1',dok:2,q:'Which event converts stable coronary disease into an acute coronary syndrome?',
 o:['Gradual progression of the stenosis','Plaque rupture with thrombus formation','Coronary vasospasm alone','Increased myocardial oxygen demand'],a:1,
 why:'Plaque rupture or erosion exposes thrombogenic material, platelets aggregate, and a thrombus forms. That is the acute event.'},
{id:'GA10',form:'A',d:'D3',c:'D3.C4',dok:2,q:'For a STEMI at a PCI capable facility, what is the target from first medical contact to device?',
 o:['30 minutes','60 minutes','90 minutes','120 minutes'],a:2,
 why:'90 minutes at a PCI capable facility, 120 minutes if transfer is required.'},
{id:'GA11',form:'A',d:'D3',c:'D3.C3',dok:2,q:'A patient has a troponin that is elevated but unchanged across three serial draws. How is this best described?',
 o:['Acute myocardial infarction','Chronic myocardial injury','Laboratory error','Unstable angina'],a:1,
 why:'Acute injury requires a rise or fall. A stable elevation is chronic injury, common in renal impairment and chronic heart failure.'},
{id:'GA12',form:'A',d:'D3',c:'D3.C4',dok:2,q:'Which is an absolute contraindication to fibrinolytic therapy?',
 o:['Systolic pressure of 165','Age over 75','Any prior intracranial hemorrhage','Current warfarin therapy with an INR of 2.0'],a:2,
 why:'Any prior intracranial hemorrhage is absolute. The others are relative considerations.'},
{id:'GA13',form:'A',d:'D3',c:'D3.C5',dok:2,q:'Which medication class reduces mortality after myocardial infarction by limiting ventricular remodeling?',
 o:['Calcium channel blockers','ACE inhibitors','Loop diuretics','Nitrates'],a:1,
 why:'ACE inhibitors interrupt the renin angiotensin cascade that drives remodeling after infarction.'},

/* D4 Hypertension, 3 */
{id:'GA14',form:'A',d:'D4',c:'D4.C1',dok:2,q:'Using a blood pressure cuff that is too small produces what error?',
 o:['A falsely low reading','A falsely high reading','No consistent error','An unobtainable reading'],a:1,
 why:'An undersized cuff needs more pressure to occlude the artery, so it reads high. The bladder should encircle at least 80 percent of the arm.'},
{id:'GA15',form:'A',d:'D4',c:'D4.C5',dok:2,q:'What separates hypertensive urgency from hypertensive emergency?',
 o:['The absolute systolic pressure','The presence of acute end-organ damage','Whether the patient is symptomatic','The rate of rise'],a:1,
 why:'Emergency requires acute end-organ involvement. The number alone does not make the distinction.'},
{id:'GA16',form:'A',d:'D4',c:'D4.C3',dok:2,q:'A patient on lisinopril develops a persistent dry cough. What is the appropriate change?',
 o:['Add a cough suppressant','Switch to an ARB','Switch to a beta blocker','Reduce the dose by half'],a:1,
 why:'ACE inhibitor cough comes from bradykinin accumulation and does not resolve with dose reduction. An ARB gives the same blockade without it.'},

/* D5 Cardiomyopathy, 2 */
{id:'GA17',form:'A',d:'D5',c:'D5.C2',dok:2,q:'Which maneuver increases the murmur of hypertrophic obstructive cardiomyopathy?',
 o:['Squatting','Handgrip','Valsalva strain','Passive leg raise'],a:2,
 why:'Valsalva reduces venous return, which shrinks the cavity and worsens outflow obstruction, so the murmur intensifies.'},
{id:'GA18',form:'A',d:'D5',c:'D5.C1',dok:2,q:'Which cardiomyopathy produces diastolic rather than systolic dysfunction as its primary problem?',
 o:['Dilated','Restrictive','Takotsubo','Peripartum'],a:1,
 why:'Restrictive physiology impairs filling. Ejection fraction is often preserved while filling pressures climb.'},

/* D6 Heart Failure, 6 */
{id:'GA19',form:'A',d:'D6',c:'D6.C1',dok:2,q:'Which ejection fraction range defines heart failure with reduced ejection fraction?',
 o:['40 percent or less','41 to 49 percent','50 percent or more','Any value with symptoms'],a:0,
 why:'HFrEF is 40 percent or less. 41 to 49 is mildly reduced, 50 or above is preserved.'},
{id:'GA20',form:'A',d:'D6',c:'D6.C4',dok:2,q:'How long a washout is required when switching from an ACE inhibitor to sacubitril-valsartan?',
 o:['No washout','12 hours','36 hours','7 days'],a:2,
 why:'36 hours. Overlapping neprilysin and ACE inhibition raises bradykinin and causes angioedema. No washout is needed from an ARB.'},
{id:'GA21',form:'A',d:'D6',c:'D6.C2',dok:2,q:'Which finding would most support congestion rather than hypoperfusion?',
 o:['Narrow pulse pressure','Cool extremities','Jugular venous distension','Altered mental status'],a:2,
 why:'Jugular venous distension is a congestion sign. The other three are markers of low output.'},
{id:'GA22',form:'A',d:'D6',c:'D6.C4',dok:2,q:'Which guideline directed therapy pillar most often causes hyperkalemia?',
 o:['Beta blocker','SGLT2 inhibitor','Mineralocorticoid receptor antagonist','Loop diuretic'],a:2,
 why:'Mineralocorticoid receptor antagonists block aldosterone driven potassium excretion, so they are the usual cause.'},
{id:'GA23',form:'A',d:'D6',c:'D6.C6',dok:2,q:'What weight gain should prompt a heart failure patient to call?',
 o:['1 pound in a day','2 to 3 pounds in a day or 5 in a week','5 pounds in a day only','10 pounds in a week'],a:1,
 why:'2 to 3 pounds in 24 hours or 5 in a week is the standard threshold that converts a measurement into an action.'},
{id:'GA24',form:'A',d:'D6',c:'D6.C2',dok:2,q:'Which condition lowers natriuretic peptide levels and can mask congestion?',
 o:['Advanced age','Obesity','Renal impairment','Atrial fibrillation'],a:1,
 why:'Obesity lowers BNP. Age, renal impairment, and atrial fibrillation all raise it.'},

/* D7 Non-Invasive and Interventional, 3 */
{id:'GA25',form:'A',d:'D7',c:'D7.C3',dok:2,q:'A patient develops back pain and hypotension two hours after femoral cardiac catheterization, with an unremarkable groin. What should be suspected?',
 o:['Vasovagal response','Retroperitoneal hemorrhage','Contrast reaction','Normal post-procedure discomfort'],a:1,
 why:'A retroperitoneal bleed hides from the groin exam. Back or flank pain with unexplained hypotension after femoral access is the classic presentation.'},
{id:'GA26',form:'A',d:'D7',c:'D7.C4',dok:2,q:'Which intervention has the strongest evidence for preventing contrast associated acute kidney injury?',
 o:['N-acetylcysteine','Isotonic intravenous fluid','Sodium bicarbonate alone','Prophylactic dialysis'],a:1,
 why:'Volume expansion with isotonic fluid and limiting contrast volume are what hold up. N-acetylcysteine has repeatedly failed.'},
{id:'GA27',form:'A',d:'D7',c:'D7.C5',dok:2,q:'Which complication is monitored most closely in the first 24 hours after TAVR?',
 o:['New conduction block','Hypoglycemia','Ileus','Hyperthermia'],a:0,
 why:'The valve sits against the conduction system, so new left bundle branch block and high grade AV block are the expected complications.'},

/* D8 Heart Sounds and Valves, 2 */
{id:'GA28',form:'A',d:'D8',c:'D8.C2',dok:2,q:'An S3 in a 62 year old most likely indicates what?',
 o:['A normal variant','Volume overload with rapid early diastolic filling','Reduced ventricular compliance from hypertrophy','Aortic stenosis'],a:1,
 why:'After roughly age 40 an S3 suggests volume overload. The S4 is the stiff, hypertrophied ventricle.'},
{id:'GA29',form:'A',d:'D8',c:'D8.C6',dok:2,q:'Which anticoagulant is appropriate for a mechanical mitral valve?',
 o:['Apixaban','Rivaroxaban','Warfarin','Dabigatran'],a:2,
 why:'Direct oral anticoagulants are contraindicated with mechanical valves. Warfarin with an INR target of 2.5 to 3.5 for a mechanical mitral valve.'},

/* D9 12-Lead, 4 */
{id:'GA30',form:'A',d:'D9',c:'D9.C4',dok:2,q:'ST elevation in leads II, III, and aVF localizes the infarct to which wall?',
 o:['Anterior','Inferior','Lateral','Septal'],a:1,
 why:'II, III, and aVF view the inferior wall, most often supplied by the right coronary artery.'},
{id:'GA31',form:'A',d:'D9',c:'D9.C3',dok:2,q:'Which finding distinguishes right bundle branch block from left?',
 o:['QRS wider than 0.12 seconds','An rSR prime pattern in V1','ST depression in the lateral leads','Left axis deviation'],a:1,
 why:'Both widen the QRS. The rSR prime in V1 with a broad slurred S in I and V6 is right bundle branch block.'},
{id:'GA32',form:'A',d:'D9',c:'D9.C6',dok:2,q:'Tall, narrow-based, peaked T waves with flattened P waves suggest what?',
 o:['Hypokalemia','Hyperkalemia','Hypercalcemia','Digoxin effect'],a:1,
 why:'Peaked T waves come first in hyperkalemia, then P wave flattening and PR prolongation, then QRS widening toward a sine wave.'},
{id:'GA33',form:'A',d:'D9',c:'D9.C1',dok:2,q:'When are right-sided leads indicated?',
 o:['With any anterior STEMI','With an inferior STEMI','With a new left bundle branch block','With atrial fibrillation'],a:1,
 why:'An inferior STEMI raises the question of right ventricular involvement, which V4R answers and which changes management.'},

/* D10 Oxygenation, 2 */
{id:'GA34',form:'A',d:'D10',c:'D10.C3',dok:2,q:'A blood gas shows pH 7.28, PaCO2 30, HCO3 14. How is this classified?',
 o:['Respiratory acidosis','Metabolic acidosis with partial compensation','Metabolic alkalosis','Respiratory alkalosis'],a:1,
 why:'Low pH with low bicarbonate is metabolic acidosis. The low PaCO2 is respiratory compensation, partial because the pH is still abnormal.'},
{id:'GA35',form:'A',d:'D10',c:'D10.C2',dok:2,q:'Which condition shifts the oxyhemoglobin dissociation curve to the right?',
 o:['Alkalosis','Hypothermia','Fever','Decreased 2,3-DPG'],a:2,
 why:'Acidosis, hypercapnia, fever, and increased 2,3-DPG shift right, which unloads more oxygen at the tissue.'},

/* D11 Hemodynamics, 3 */
{id:'GA36',form:'A',d:'D11',c:'D11.C2',dok:2,q:'A square wave test shows a flattened return with no oscillations. What does this indicate?',
 o:['Optimal damping','Overdamping','Underdamping','A failed transducer'],a:1,
 why:'Overdamping from air, clot, or a kink blunts the systolic peak and underestimates systolic pressure.'},
{id:'GA37',form:'A',d:'D11',c:'D11.C5',dok:2,q:'Cardiac output is 4.2 L per minute at a heart rate of 84. What is the stroke volume?',
 o:['20 mL','35 mL','50 mL','84 mL'],a:2,
 why:'Stroke volume is cardiac output divided by heart rate. 4200 divided by 84 is 50 mL, which is below the normal 60 to 100.'},
{id:'GA38',form:'A',d:'D11',c:'D11.C6',dok:2,q:'Low cardiac index with high filling pressures and high systemic vascular resistance describes which shock state?',
 o:['Hypovolemic','Distributive','Cardiogenic','Obstructive'],a:2,
 why:'Cardiogenic shock. Hypovolemic has low filling pressures, distributive has low resistance.'},

/* D12 Assist Devices, 2 */
{id:'GA39',form:'A',d:'D12',c:'D12.C1',dok:2,q:'When should the intra-aortic balloon pump inflate?',
 o:['At the onset of the QRS','At the dicrotic notch','At peak systole','Just before the aortic valve opens'],a:1,
 why:'Inflation at the dicrotic notch, which marks aortic valve closure, augments diastolic coronary perfusion.'},
{id:'GA40',form:'A',d:'D12',c:'D12.C3',dok:2,q:'How is blood pressure most reliably obtained in a patient with a continuous flow LVAD?',
 o:['Standard automated cuff','Doppler with a manual cuff, giving a mean pressure','Palpated radial pulse','Pulse oximetry waveform'],a:1,
 why:'Continuous flow produces little pulsatility, so automated cuffs often fail. Doppler opening pressure approximates the mean arterial pressure.'},

/* D13 Pacemakers, 2 */
{id:'GA41',form:'A',d:'D13',c:'D13.C4',dok:2,q:'A pacing spike appears with no QRS following it. What is this?',
 o:['Failure to sense','Failure to capture','Oversensing','Normal fusion'],a:1,
 why:'A spike without a resulting complex is failure to capture, from lead dislodgement, a threshold rise, or a metabolic cause.'},
{id:'GA42',form:'A',d:'D13',c:'D13.C6',dok:2,q:'What does placing a magnet over a permanent pacemaker do?',
 o:['Disables the device','Causes asynchronous pacing at a fixed rate','Increases sensitivity','Delivers a shock'],a:1,
 why:'A magnet produces asynchronous pacing, which protects against inhibition by interference. Over an ICD it suspends tachytherapy instead.'},

/* D14 Pharmacology, 4 */
{id:'GA43',form:'A',d:'D14',c:'D14.C3',dok:2,q:'Which vasoactive agent is a pure alpha-1 agonist with no direct inotropic effect?',
 o:['Norepinephrine','Epinephrine','Phenylephrine','Dobutamine'],a:2,
 why:'Phenylephrine raises systemic vascular resistance without beta activity, so it can reduce cardiac output through reflex bradycardia and increased afterload.'},
{id:'GA44',form:'A',d:'D14',c:'D14.C5',dok:2,q:'Which electrolyte abnormality most increases digoxin toxicity risk?',
 o:['Hypernatremia','Hypokalemia','Hypochloremia','Hypermagnesemia'],a:1,
 why:'Digoxin and potassium compete for the same binding site, so low potassium increases binding and toxicity at otherwise therapeutic levels.'},
{id:'GA45',form:'A',d:'D14',c:'D14.C4',dok:2,q:'A patient took sildenafil 12 hours ago. Which order should be questioned?',
 o:['Aspirin','Sublingual nitroglycerin','Morphine','Supplemental oxygen'],a:1,
 why:'Nitrates with a phosphodiesterase-5 inhibitor cause refractory hypotension. At least 24 hours for sildenafil, 48 for tadalafil.'},

/* ================= FORM B ================= */

/* D1, 3 */
{id:'GB01',form:'B',d:'D1',c:'D1.C2',dok:2,q:'An apical impulse palpated at the sixth intercostal space, anterior axillary line, suggests what?',
 o:['Normal position','Left ventricular dilation','Right ventricular hypertrophy','Pericardial effusion'],a:1,
 why:'The normal point of maximal impulse is the fifth space near the midclavicular line. Lateral and inferior displacement reflects left ventricular enlargement.'},
{id:'GB02',form:'B',d:'D1',c:'D1.C4',dok:2,q:'An ankle systolic of 88 with a brachial systolic of 140 gives what ankle-brachial index and interpretation?',
 o:['1.59, normal','0.63, moderate peripheral arterial disease','0.63, venous insufficiency','0.88, borderline'],a:1,
 why:'88 divided by 140 is 0.63. Values from 0.41 to 0.90 indicate mild to moderate peripheral arterial disease.'},
{id:'GB03',form:'B',d:'D1',c:'D1.C1',dok:2,q:'Which presentation of acute coronary syndrome is most common in patients with diabetes?',
 o:['Crushing substernal chest pain','Dyspnea, fatigue, or nausea without chest pain','Sharp pleuritic pain','Pain radiating to the left arm only'],a:1,
 why:'Autonomic neuropathy blunts pain perception, so anginal equivalents replace classic chest pain.'},

/* D2, 4 */
{id:'GB04',form:'B',d:'D2',c:'D2.C2',dok:2,q:'On a regular rhythm, four large boxes separate consecutive R waves. What is the rate?',
 o:['60','75','100','150'],a:1,
 why:'300 divided by the number of large boxes. 300 divided by 4 is 75.'},
{id:'GB05',form:'B',d:'D2',c:'D2.C5',dok:2,q:'P waves and QRS complexes occur at independent rates with no fixed relationship. What is this?',
 o:['Mobitz type I','Mobitz type II','Third degree AV block','Atrial fibrillation'],a:2,
 why:'Atrioventricular dissociation is the defining finding of complete heart block. The slow rate is the consequence.'},
{id:'GB06',form:'B',d:'D2',c:'D2.C3',dok:2,q:'A regular ventricular rate of exactly 150 should prompt you to look for what?',
 o:['Sinus tachycardia','Atrial flutter with 2 to 1 conduction','Junctional rhythm','Ventricular fibrillation'],a:1,
 why:'Flutter at about 300 with 2 to 1 conduction lands at 150 almost every time.'},
{id:'GB07',form:'B',d:'D2',c:'D2.C4',dok:2,q:'A chaotic undulating baseline with no identifiable QRS complexes in a pulseless patient is what?',
 o:['Asystole','Ventricular fibrillation','Torsades de pointes','Artifact'],a:1,
 why:'Ventricular fibrillation. It is defibrillated, not synchronized, because there is no R wave to sense.'},

/* D3, 6 */
{id:'GB08',form:'B',d:'D3',c:'D3.C1',dok:2,q:'Approximately what fraction of delivered oxygen does myocardium extract at rest?',
 o:['25 percent','40 percent','55 percent','70 to 80 percent'],a:3,
 why:'Extraction is already near maximal, which is why increased demand must be met by increased coronary flow rather than more extraction.'},
{id:'GB09',form:'B',d:'D3',c:'D3.C1',dok:2,q:'During which phase of the cardiac cycle does the left ventricle receive most of its coronary perfusion?',
 o:['Systole','Diastole','Isovolumetric contraction','Equally throughout'],a:1,
 why:'Systolic compression of intramyocardial vessels means perfusion occurs in diastole, which is why tachycardia reduces it.'},
{id:'GB10',form:'B',d:'D3',c:'D3.C4',dok:2,q:'Transfer to a PCI center will take 180 minutes. What is the preferred strategy for a STEMI?',
 o:['Transfer for primary PCI regardless','Fibrinolysis if no contraindication, then transfer','Wait for serial troponins','Aspirin alone and admit'],a:1,
 why:'When first medical contact to device exceeds 120 minutes, fibrinolysis within 30 minutes of arrival comes first, then transfer.'},
{id:'GB11',form:'B',d:'D3',c:'D3.C4',dok:2,q:'A new holosystolic murmur with sudden hypotension on day three after an anterior MI suggests what?',
 o:['Reinfarction','Papillary muscle rupture','Pericarditis','Anxiety'],a:1,
 why:'Day two to seven with a new murmur and abrupt decompensation is a mechanical complication until proven otherwise.'},
{id:'GB12',form:'B',d:'D3',c:'D3.C2',dok:2,q:'Which ECG finding defines a STEMI rather than an NSTEMI?',
 o:['ST depression','T wave inversion','ST elevation or new left bundle branch block','A prolonged QT'],a:2,
 why:'ST elevation, or a new left bundle branch block, indicates complete occlusion and transmural injury.'},
{id:'GB13',form:'B',d:'D3',c:'D3.C5',dok:2,q:'What is phase II of cardiac rehabilitation?',
 o:['Inpatient mobilization','Monitored outpatient exercise and education','Unsupervised maintenance','Pre-procedure conditioning'],a:1,
 why:'Phase I is inpatient, phase II is monitored outpatient, phase III is maintenance.'},

/* D4, 3 */
{id:'GB14',form:'B',d:'D4',c:'D4.C5',dok:2,q:'In a hypertensive emergency, how much should the mean arterial pressure be reduced in the first hour?',
 o:['No more than 20 to 25 percent','To below 140 systolic','By half','To normal'],a:0,
 why:'Cerebral autoregulation has shifted, so rapid normalization causes hypoperfusion. About a quarter in the first hour is the accepted target.'},
{id:'GB15',form:'B',d:'D4',c:'D4.C2',dok:2,q:'Which finding most suggests a secondary cause of hypertension?',
 o:['Family history of hypertension','Onset before age 30 with resistant pressures','Gradual rise over a decade','A body mass index of 31'],a:1,
 why:'Early onset, abrupt onset, or resistance to three agents including a diuretic should trigger a secondary workup.'},
{id:'GB16',form:'B',d:'D4',c:'D4.C4',dok:2,q:'Which lifestyle change produces the largest single reduction in blood pressure for most patients?',
 o:['Weight loss','Reducing caffeine','Vitamin supplementation','Increasing dairy intake'],a:0,
 why:'Weight loss gives roughly 1 mmHg per kilogram lost, the largest single effect, followed by the DASH pattern and sodium restriction.'},

/* D5, 2 */
{id:'GB17',form:'B',d:'D5',c:'D5.C4',dok:2,q:'Which intervention is hazardous in symptomatic hypertrophic obstructive cardiomyopathy?',
 o:['Beta blockade','Verapamil','Aggressive diuresis','Disopyramide'],a:2,
 why:'Diuresis reduces preload, shrinks the cavity, and worsens the outflow gradient. Negative inotropes are used deliberately.'},
{id:'GB18',form:'B',d:'D5',c:'D5.C1',dok:2,q:'A postmenopausal woman develops chest pain and apical ballooning after acute emotional stress, with clean coronaries. What is this?',
 o:['Dilated cardiomyopathy','Takotsubo cardiomyopathy','Restrictive cardiomyopathy','Peripartum cardiomyopathy'],a:1,
 why:'Catecholamine mediated stress cardiomyopathy. It mimics anterior STEMI and is usually reversible over weeks.'},

/* D6, 6 */
{id:'GB19',form:'B',d:'D6',c:'D6.C1',dok:2,q:'What is the difference between ACC/AHA stages and NYHA classes?',
 o:['They are interchangeable','Stages do not move backward; NYHA class changes with current function','NYHA is structural, stages are functional','Stages apply only to HFrEF'],a:1,
 why:'Once a patient has had symptoms they remain Stage C. NYHA class tracks current function and can improve.'},
{id:'GB20',form:'B',d:'D6',c:'D6.C2',dok:2,q:'Why does sympathetic activation eventually harm the failing heart?',
 o:['It lowers blood pressure','It raises oxygen demand, shortens diastole, and raises afterload','It causes bradycardia','It reduces preload excessively'],a:1,
 why:'The reflex defends pressure acutely and then increases the work of a ventricle that cannot meet it, while shortening coronary perfusion time.'},
{id:'GB21',form:'B',d:'D6',c:'D6.C5',dok:2,q:'A patient on escalating intravenous furosemide has minimal urine output and persistent congestion. What is the next step?',
 o:['Switch to oral furosemide','Add a thiazide-type diuretic','Restrict fluid only','Stop diuretics'],a:1,
 why:'Sequential nephron blockade addresses distal tubular sodium reabsorption. Oral dosing is unreliable in a congested gut.'},
{id:'GB22',form:'B',d:'D6',c:'D6.C4',dok:2,q:'Which pillar should not be initiated during acute decompensation?',
 o:['ARNI','Beta blocker','SGLT2 inhibitor','Mineralocorticoid receptor antagonist'],a:1,
 why:'Beta blockade is started once the patient is euvolemic and stable, because its negative inotropy is poorly tolerated in low output.'},
{id:'GB23',form:'B',d:'D6',c:'D6.C3',dok:2,q:'Cool extremities, narrow pulse pressure, crackles, and jugular venous distension describe which profile?',
 o:['Warm and dry','Warm and wet','Cold and dry','Cold and wet'],a:3,
 why:'Congestion plus hypoperfusion is cold and wet, the highest risk of the four profiles.'},
{id:'GB24',form:'B',d:'D6',c:'D6.C6',dok:2,q:'Which contributes most dietary sodium for a typical patient?',
 o:['The salt shaker','Processed and restaurant food','Naturally occurring sodium in vegetables','Drinking water'],a:1,
 why:'Most sodium is already in the food before it reaches the table, which is why label reading beats removing the shaker.'},

/* D7, 3 */
{id:'GB25',form:'B',d:'D7',c:'D7.C1',dok:2,q:'A patient with a left bundle branch block cannot exercise. Which test is most appropriate for ischemia evaluation?',
 o:['Exercise treadmill ECG','Dobutamine stress echocardiography','Vasodilator nuclear perfusion imaging','Resting ECG alone'],a:2,
 why:'Left bundle branch block makes exercise ECG uninterpretable and dobutamine can create false septal defects. Vasodilator perfusion imaging avoids both.'},
{id:'GB26',form:'B',d:'D7',c:'D7.C2',dok:2,q:'What determines the duration of dual antiplatelet therapy after PCI?',
 o:['Patient age','Stent type and clinical setting','Access site','Contrast volume used'],a:1,
 why:'Stent type and whether the presentation was an acute coronary syndrome or stable disease set the duration.'},
{id:'GB27',form:'B',d:'D7',c:'D7.C2',dok:2,q:'Compared with femoral access, radial access offers what advantage?',
 o:['Shorter procedure time','Lower access site bleeding risk','Better catheter control','Less contrast use'],a:1,
 why:'Radial access reduces access site bleeding and vascular complications and allows earlier ambulation.'},

/* D8, 2 */
{id:'GB28',form:'B',d:'D8',c:'D8.C4',dok:2,q:'Which intervention carries the greatest risk in severe aortic stenosis with hypotension?',
 o:['Cautious isotonic fluid','Nitroglycerin infusion','Phenylephrine','Maintaining sinus rhythm'],a:1,
 why:'A fixed obstruction makes output preload dependent. Nitrates drop preload and can cause abrupt, hard to reverse hypotension.'},
{id:'GB29',form:'B',d:'D8',c:'D8.C5',dok:2,q:'Why does acute severe mitral regurgitation present with pulmonary edema when chronic regurgitation may be tolerated for years?',
 o:['The murmur is louder','The left atrium has not remodelled to become compliant','It always involves the coronaries','Chronic regurgitation spares the atrium'],a:1,
 why:'Without atrial compliance the regurgitant volume transmits straight to the pulmonary circulation. Acute severe regurgitation often has a soft murmur.'},

/* D9, 4 */
{id:'GB30',form:'B',d:'D9',c:'D9.C4',dok:2,q:'ST elevation greater in lead III than lead II, with depression in I and aVL, suggests which culprit vessel?',
 o:['Left anterior descending','Right coronary artery','Left circumflex','Left main'],a:1,
 why:'Elevation greater in III than II with reciprocal change in I and aVL points to the right coronary artery.'},
{id:'GB31',form:'B',d:'D9',c:'D9.C5',dok:2,q:'Which Sgarbossa criterion is most specific for ischemia in left bundle branch block?',
 o:['Any ST depression','Concordant ST elevation of 1 mm or more','QRS wider than 0.14','T wave inversion in V1'],a:1,
 why:'Concordant elevation of 1 mm or more carries the highest specificity. Discordant change is expected and does not indicate ischemia by itself.'},
{id:'GB32',form:'B',d:'D9',c:'D9.C5',dok:2,q:'Diffuse concave ST elevation across coronary territories with PR depression suggests what?',
 o:['Multivessel STEMI','Acute pericarditis','Early repolarization','Left ventricular aneurysm'],a:1,
 why:'Elevation that ignores vascular anatomy, with reciprocal change only in aVR, is pericardial rather than occlusive.'},
{id:'GB33',form:'B',d:'D9',c:'D9.C2',dok:2,q:'How is axis determined most quickly?',
 o:['Leads V1 and V6','Leads I and aVF','Leads II and III','Lead aVR alone'],a:1,
 why:'The net QRS direction in I and aVF places the axis in a quadrant in one step.'},

/* D10, 2 */
{id:'GB34',form:'B',d:'D10',c:'D10.C1',dok:2,q:'A central venous oxygen saturation of 48 percent in shock indicates what?',
 o:['Excessive oxygen delivery','Increased tissue extraction because delivery is inadequate','Impaired extraction','Sampling error'],a:1,
 why:'A low venous saturation means tissues are pulling more from each unit of blood. Early septic shock often shows the opposite.'},
{id:'GB35',form:'B',d:'D10',c:'D10.C5',dok:2,q:'Increasing PEEP in a hypovolemic patient produces what hemodynamic effect?',
 o:['Increased preload and output','Decreased venous return and falling cardiac output','No change','Increased systemic vascular resistance only'],a:1,
 why:'Positive intrathoracic pressure opposes venous return. The same change can help a congested patient by reducing preload and afterload.'},

/* D11, 3 */
{id:'GB36',form:'B',d:'D11',c:'D11.C2',dok:2,q:'A transducer positioned 5 cm below the phlebostatic axis will do what to the reading?',
 o:['Read falsely low','Read falsely high','Have no effect if zeroed','Lose the waveform'],a:1,
 why:'The added hydrostatic column raises the displayed pressure by roughly 3.7 mmHg per 5 cm. Zeroing corrects for atmosphere, not leveling.'},
{id:'GB37',form:'B',d:'D11',c:'D11.C4',dok:2,q:'A persistent wedge waveform with the balloon deflated requires what action?',
 o:['Inflate to confirm','Reposition or withdraw the catheter and notify the provider','Flush vigorously','Document and recheck in an hour'],a:1,
 why:'Spontaneous wedge means distal migration with risk of pulmonary infarction or arterial rupture. Inflating compounds it.'},
{id:'GB38',form:'B',d:'D11',c:'D11.C1',dok:2,q:'Which measurement best estimates left ventricular preload?',
 o:['Central venous pressure','Pulmonary artery occlusion pressure','Systemic vascular resistance','Mean arterial pressure'],a:1,
 why:'The occlusion, or wedge, pressure reflects left atrial and therefore left ventricular filling pressure.'},

/* D12, 2 */
{id:'GB39',form:'B',d:'D12',c:'D12.C3',dok:2,q:'Rising power with a low pulsatility index and dark urine in an LVAD patient suggests what?',
 o:['Pump thrombosis with hemolysis','Suction event','Driveline infection','Right ventricular failure'],a:0,
 why:'Rising power reflects the pump working against a clot, and hemolysis produces hemoglobinuria. A suction event shows low flow with a high pulsatility index.'},
{id:'GB40',form:'B',d:'D12',c:'D12.C4',dok:2,q:'What distinguishes venoarterial from venovenous ECMO?',
 o:['Cannula size','Venoarterial supports circulation as well as oxygenation','Venovenous requires anticoagulation','Only venoarterial uses a membrane'],a:1,
 why:'Venoarterial returns blood to the arterial system and supports cardiac output. Venovenous supports gas exchange only.'},

/* D13, 2 */
{id:'GB41',form:'B',d:'D13',c:'D13.C1',dok:2,q:'In the NBG pacemaker code, what does the second position indicate?',
 o:['Chamber paced','Chamber sensed','Response to sensing','Rate modulation'],a:1,
 why:'First position is chamber paced, second is chamber sensed, third is the response, fourth is rate modulation.'},
{id:'GB42',form:'B',d:'D13',c:'D13.C4',dok:2,q:'A pacing spike appears in the middle of an intrinsic QRS complex. What is this?',
 o:['Failure to capture','Failure to sense','Oversensing','Normal function'],a:1,
 why:'The device did not see the intrinsic beat and paced into it. The danger is a spike landing on a T wave.'},

/* D14, 4 */
{id:'GB43',form:'B',d:'D14',c:'D14.C2',dok:2,q:'Which agent worsens torsades de pointes?',
 o:['Magnesium','Amiodarone','Overdrive pacing','Potassium repletion'],a:1,
 why:'Amiodarone prolongs the QT, which is the substrate. The others shorten it or suppress the triggering pauses.'},
{id:'GB44',form:'B',d:'D14',c:'D14.C3',dok:2,q:'Why is dobutamine often preferred over milrinone in renal impairment?',
 o:['It is a stronger inotrope','Milrinone is renally cleared and accumulates','Dobutamine causes less tachycardia','Milrinone has no inotropic effect'],a:1,
 why:'Milrinone has a long half-life and renal clearance, so its effects including hypotension persist. Dobutamine is short acting and easier to titrate.'},
{id:'GB45',form:'B',d:'D14',c:'D14.C1',dok:2,q:'A platelet count falls from 240,000 to 85,000 on day six of heparin, with a new clot. What is the correct action?',
 o:['Continue heparin and transfuse platelets','Stop all heparin and start a non-heparin anticoagulant','Stop heparin and start warfarin alone','Halve the heparin dose'],a:1,
 why:'Heparin-induced thrombocytopenia is prothrombotic. All heparin stops and an alternative anticoagulant starts; warfarin alone early risks venous limb gangrene.'}

];
