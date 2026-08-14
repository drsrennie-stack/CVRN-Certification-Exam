/* ============================================================
   ECG & CVRN Review Course
   PRACTICAL POOL  ·  the lab half of the gap finder

   These are not multiple choice items with a picture attached.
   Each one renders a live tracing from the ECG engine and asks
   the learner to do something to it:

     identify  name the rhythm from a generated strip
     measure   put calipers on the strip and enter a value,
               graded against a tolerance, not a lookup
     localize  read a generated 12-lead and name the territory
     decide    strip plus vitals, choose the action

   Knowledge and skill fail independently. A nurse can name every
   rhythm on a flashcard and still not measure a PR interval, so
   the two gap finders are scored and reported separately.

   Fields:
     id, form, kind, d (domain), c (competency), dok
     rhythm    a key from RHYTHMS in the ECG engine
     pattern   a key from PATTERNS, for 12-lead items
     rate      optional rate override for the generator
     q         the prompt
     o, a      options and answer index (identify, localize, decide)
     target, tol, unit                      (measure)
     why       what the item is testing
   ============================================================ */
window.CVRN_PRACTICAL_POOL = [

/* ================= FORM A ================= */

/* --- identify: is it the rhythm you think it is --- */
{id:'PA01',form:'A',kind:'identify',d:'D2',c:'D2.C3',dok:2,rhythm:'afib',
 q:'Name this rhythm.',
 o:['Atrial flutter','Atrial fibrillation','Multifocal atrial tachycardia','Sinus arrhythmia'],a:1,
 why:'Irregularly irregular with a fibrillatory baseline and no organized P waves. Sinus arrhythmia varies with respiration but keeps a P before every QRS.'},
{id:'PA02',form:'A',kind:'identify',d:'D2',c:'D2.C3',dok:2,rhythm:'aflut',
 q:'Name this rhythm.',
 o:['Sinus tachycardia','Atrial flutter with 2 to 1 conduction','Supraventricular tachycardia','Atrial fibrillation'],a:1,
 why:'A regular ventricular rate near 150 with sawtooth atrial activity at about 300. Look for flutter waves buried in the T wave before calling it sinus tach.'},
{id:'PA03',form:'A',kind:'identify',d:'D2',c:'D2.C5',dok:2,rhythm:'wenck',
 q:'Name this rhythm. Track the PR interval across several beats before answering.',
 o:['First degree AV block','Mobitz type I','Mobitz type II','Third degree AV block'],a:1,
 why:'The PR lengthens progressively and then a QRS drops. Reading one complex instead of the sequence is how this gets called Mobitz II.'},
{id:'PA04',form:'A',kind:'identify',d:'D2',c:'D2.C5',dok:2,rhythm:'chb',
 q:'Name this rhythm.',
 o:['Mobitz type II','Third degree AV block','Junctional escape','Sinus bradycardia'],a:1,
 why:'P waves and QRS complexes march at independent rates with no fixed relationship. The dissociation is the finding, not the slow rate.'},
{id:'PA05',form:'A',kind:'identify',d:'D2',c:'D2.C4',dok:2,rhythm:'bigem',
 q:'Name this rhythm.',
 o:['Ventricular trigeminy','Ventricular bigeminy','Atrial fibrillation','Sinus with couplets'],a:1,
 why:'Every second beat is a wide premature ventricular complex with a compensatory pause. Bigeminy is every second beat, trigeminy every third.'},
{id:'PA06',form:'A',kind:'identify',d:'D2',c:'D2.C4',dok:2,rhythm:'torsade',
 q:'Name this rhythm.',
 o:['Ventricular fibrillation','Monomorphic ventricular tachycardia','Torsades de pointes','Coarse atrial fibrillation'],a:2,
 why:'Polymorphic ventricular tachycardia with the axis twisting around the baseline. It sits on a long QT, so magnesium and stopping the offending drug enter the plan.'},
{id:'PA07',form:'A',kind:'identify',d:'D13',c:'D13.C3',dok:2,rhythm:'paced',
 q:'Name this rhythm.',
 o:['Left bundle branch block','Ventricular paced rhythm','Idioventricular rhythm','Third degree AV block'],a:1,
 why:'A sharp pacing spike precedes each wide QRS. Without the spike this reads as left bundle branch block, which is why both share the same ischemia problem.'},
{id:'PA08',form:'A',kind:'identify',d:'D2',c:'D2.C4',dok:2,rhythm:'junc',
 q:'Name this rhythm.',
 o:['Sinus bradycardia','Junctional rhythm','Idioventricular rhythm','First degree AV block'],a:1,
 why:'Narrow QRS at 40 to 60 with an inverted P close to the QRS. Narrow means it came from at or above the junction.'},

/* --- measure: can you actually work the calipers --- */
{id:'PA09',form:'A',kind:'measure',d:'D2',c:'D2.C1',dok:2,rhythm:'nsr',
 q:'Measure the PR interval.',target:160,tol:25,unit:'ms',
 why:'Onset of P to onset of QRS. Normal is 120 to 200 ms, three to five small boxes. Measure onset to onset, not peak to peak.'},
{id:'PA10',form:'A',kind:'measure',d:'D2',c:'D2.C1',dok:2,rhythm:'avb1',
 q:'Measure the PR interval.',target:300,tol:35,unit:'ms',
 why:'Over 200 ms with every P conducted is first degree AV block. A conduction delay, not a dropped beat.'},
{id:'PA11',form:'A',kind:'measure',d:'D2',c:'D2.C2',dok:2,rhythm:'nsr',
 q:'Measure the R to R interval and give the rate.',target:75,tol:9,unit:'bpm',
 why:'Rate is 60000 divided by the R to R in milliseconds. At 800 ms that is 75.'},
{id:'PA12',form:'A',kind:'measure',d:'D2',c:'D2.C2',dok:2,rhythm:'brady',
 q:'Give the rate.',target:45,tol:8,unit:'bpm',
 why:'Under 60 with an otherwise normal complex is sinus bradycardia. The number alone decides nothing; symptoms do.'},
{id:'PA13',form:'A',kind:'measure',d:'D2',c:'D2.C1',dok:2,rhythm:'hyperk',
 q:'Measure the QRS duration.',target:150,tol:30,unit:'ms',
 why:'First deflection off baseline to the return. Over 120 ms is wide. Here the widening is metabolic, so the fix is potassium, not a device.'},
{id:'PA14',form:'A',kind:'measure',d:'D2',c:'D2.C2',dok:2,rhythm:'tach',
 q:'Give the rate.',target:126,tol:15,unit:'bpm',
 why:'Sinus tachycardia is a response, not a diagnosis. Rate controlling a compensatory tachycardia removes the compensation.'},

/* --- localize: read the 12-lead --- */
{id:'PA15',form:'A',kind:'localize',d:'D9',c:'D9.C4',dok:3,pattern:'infstemi',
 q:'Which wall is infarcting, and which vessel is the likely culprit?',
 o:['Anterior, left anterior descending','Inferior, right coronary artery','Lateral, circumflex','Posterior, circumflex'],a:1,
 why:'Elevation in II, III, and aVF with reciprocal depression in I and aVL. Greater elevation in III than II points to the right coronary artery.'},
{id:'PA16',form:'A',kind:'localize',d:'D9',c:'D9.C4',dok:3,pattern:'antstemi',
 q:'Which territory is involved?',
 o:['Inferior','Anterior, V1 through V4','Lateral only','Posterior'],a:1,
 why:'ST elevation across V1 to V4 with inferior reciprocal change. Proximal to mid LAD until proven otherwise, so watch for pump failure and new block.'},
{id:'PA17',form:'A',kind:'localize',d:'D9',c:'D9.C3',dok:2,pattern:'lbbb',
 q:'What conduction abnormality is present?',
 o:['Right bundle branch block','Left bundle branch block','Left anterior fascicular block','Pre-excitation'],a:1,
 why:'Broad monophasic R in I, V5, and V6 with a deep QS in V1. ST and T changes are discordant and expected, so do not read ischemia off discordance alone.'},
{id:'PA18',form:'A',kind:'localize',d:'D9',c:'D9.C6',dok:2,pattern:'hyperk',
 q:'What metabolic abnormality does this tracing suggest?',
 o:['Hypokalemia','Hyperkalemia','Hypercalcemia','Hypomagnesemia'],a:1,
 why:'Peaked narrow-based T waves with flattened P waves and a widening QRS. Treat the ECG, not the lab turnaround time.'},
{id:'PA19',form:'A',kind:'localize',d:'D9',c:'D9.C5',dok:3,pattern:'pericard',
 q:'What explains this pattern?',
 o:['Multivessel STEMI','Acute pericarditis','Early repolarization','Left ventricular aneurysm'],a:1,
 why:'Diffuse concave elevation crossing coronary territories with reciprocal change only in aVR, plus PR depression. Elevation that ignores anatomy is pericardial.'},

/* --- decide: the tracing plus the patient --- */
{id:'PA20',form:'A',kind:'decide',d:'D2',c:'D2.C4',dok:3,rhythm:'vt',
 q:'A 68 year old with a prior anterior MI is awake and talking. Blood pressure 82 over 48, reports chest pressure. What is the next action?',
 o:['Defibrillate immediately','Synchronized cardioversion after sedation','Adenosine 6 mg rapid push','Observe and repeat the ECG in 15 minutes'],a:1,
 why:'Wide complex tachycardia with a pulse and instability is cardioverted, not defibrillated. Adenosine is for regular narrow complex tachycardia.'},

/* ================= FORM B ================= */

{id:'PB01',form:'B',kind:'identify',d:'D2',c:'D2.C5',dok:2,rhythm:'mobitz2',
 q:'Name this rhythm. Check whether the PR interval is constant.',
 o:['Mobitz type I','Mobitz type II','First degree AV block','Sinus with blocked PACs'],a:1,
 why:'Constant PR with a beat dropped without warning. The lesion is infranodal, so atropine often fails and pacing readiness comes at the same time.'},
{id:'PB02',form:'B',kind:'identify',d:'D2',c:'D2.C4',dok:2,rhythm:'vfib',
 q:'Name this rhythm. The patient is unresponsive with no pulse.',
 o:['Asystole','Ventricular fibrillation','Torsades de pointes','Artifact'],a:1,
 why:'Chaotic undulating baseline with no identifiable QRS. Defibrillate. Synchronization is impossible because there is no R wave to sense.'},
{id:'PB03',form:'B',kind:'identify',d:'D2',c:'D2.C3',dok:2,rhythm:'svt',
 q:'Name this rhythm.',
 o:['Sinus tachycardia','Supraventricular tachycardia','Atrial flutter','Ventricular tachycardia'],a:1,
 why:'Regular, narrow, and fast enough that P waves are buried. Narrow rules out a ventricular origin.'},
{id:'PB04',form:'B',kind:'identify',d:'D2',c:'D2.C4',dok:2,rhythm:'pvc',
 q:'What is the abnormality in this rhythm?',
 o:['Premature atrial contractions','Premature ventricular contractions','Junctional escape beats','Paced beats'],a:1,
 why:'Wide, early, no preceding P, followed by a compensatory pause. PACs are narrow and reset the sinus node.'},
{id:'PB05',form:'B',kind:'identify',d:'D2',c:'D2.C2',dok:2,rhythm:'arrhy',
 q:'Name this rhythm.',
 o:['Atrial fibrillation','Sinus arrhythmia','Wandering atrial pacemaker','Sinus with frequent PACs'],a:1,
 why:'The rate varies with respiration but every QRS has an upright P of consistent shape. Normal, especially in younger patients.'},
{id:'PB06',form:'B',kind:'identify',d:'D2',c:'D2.C4',dok:2,rhythm:'vt',
 q:'Name this rhythm.',
 o:['Supraventricular tachycardia with aberrancy','Monomorphic ventricular tachycardia','Atrial flutter','Accelerated idioventricular rhythm'],a:1,
 why:'Wide, regular, fast, and uniform. In structural heart disease this is ventricular tachycardia until proven otherwise.'},
{id:'PB07',form:'B',kind:'identify',d:'D2',c:'D2.C2',dok:2,rhythm:'asys',
 q:'Name this rhythm. Confirm in a second lead before acting.',
 o:['Fine ventricular fibrillation','Asystole','Lead disconnection','Pulseless electrical activity'],a:1,
 why:'A flat line. Confirming in a second lead is what separates true asystole from a disconnected lead, and it changes what you do next.'},
{id:'PB08',form:'B',kind:'identify',d:'D13',c:'D13.C3',dok:3,rhythm:'paced',
 q:'Each spike is followed by a wide QRS. What does that confirm?',
 o:['Failure to capture','Capture','Oversensing','Failure to sense'],a:1,
 why:'A spike followed by a resulting complex is capture. Electrical capture still has to be confirmed against a pulse for mechanical capture.'},

{id:'PB09',form:'B',kind:'measure',d:'D2',c:'D2.C1',dok:2,rhythm:'nsr',
 q:'Measure the QRS duration.',target:90,tol:25,unit:'ms',
 why:'Normal is under 120 ms. Anything wider means the ventricles were activated outside the rapid conduction system.'},
{id:'PB10',form:'B',kind:'measure',d:'D2',c:'D2.C2',dok:2,rhythm:'chb',
 q:'Give the ventricular rate.',target:38,tol:8,unit:'bpm',
 why:'A ventricular escape in the 20 to 40 range. This rhythm is the only thing perfusing the patient, so it is supported, never suppressed.'},
{id:'PB11',form:'B',kind:'measure',d:'D2',c:'D2.C2',dok:2,rhythm:'svt',
 q:'Give the rate.',target:186,tol:18,unit:'bpm',
 why:'Above about 150, count over a longer window or use calipers. Eyeballing at this rate is where errors start.'},
{id:'PB12',form:'B',kind:'measure',d:'D2',c:'D2.C1',dok:2,rhythm:'nsr',
 q:'Measure the QT interval.',target:400,tol:50,unit:'ms',
 why:'QRS onset to the end of the T wave. It shortens as rate rises, which is why it is corrected before it is judged.'},
{id:'PB13',form:'B',kind:'measure',d:'D2',c:'D2.C2',dok:2,rhythm:'afib',
 q:'Give the average ventricular rate. The rhythm is irregular, so the shortcuts do not apply.',target:110,tol:20,unit:'bpm',
 why:'On an irregular rhythm, count complexes over six seconds and multiply by ten, or average several R to R intervals with calipers.'},
{id:'PB14',form:'B',kind:'measure',d:'D2',c:'D2.C1',dok:2,rhythm:'wenck',
 q:'Measure the PR interval on the first conducted beat after a dropped QRS.',target:160,tol:30,unit:'ms',
 why:'The cycle resets after the dropped beat, so the first conducted PR is the shortest. Seeing that reset is what confirms Wenckebach.'},

{id:'PB15',form:'B',kind:'localize',d:'D9',c:'D9.C4',dok:3,pattern:'latstemi',
 q:'Which territory is involved?',
 o:['Inferior','Anterior','Lateral, I, aVL, V5, V6','Septal only'],a:2,
 why:'Elevation in I, aVL, V5, and V6 with inferior reciprocal change. Circumflex territory, and the one most often called non-diagnostic on first look.'},
{id:'PB16',form:'B',kind:'localize',d:'D9',c:'D9.C4',dok:3,pattern:'posterior',
 q:'Tall R waves with ST depression in V1 to V3 and upright T waves. What is this?',
 o:['Anterior ischemia','Posterior infarction','Right ventricular hypertrophy','Normal variant'],a:1,
 why:'This is a mirror image, not anterior ischemia. Place posterior leads V7 to V9; elevation there confirms it and makes this a reperfusion case.'},
{id:'PB17',form:'B',kind:'localize',d:'D9',c:'D9.C3',dok:2,pattern:'rbbb',
 q:'What conduction abnormality is present?',
 o:['Left bundle branch block','Right bundle branch block','Pre-excitation','Third degree block'],a:1,
 why:'rSR prime in V1 with a broad slurred S in I and V6. Unlike left bundle branch block, ST analysis elsewhere stays interpretable.'},
{id:'PB18',form:'B',kind:'localize',d:'D9',c:'D9.C2',dok:2,pattern:'lvh',
 q:'What does this tracing show?',
 o:['Acute lateral ischemia','Left ventricular hypertrophy with strain','Pericarditis','Hyperkalemia'],a:1,
 why:'Voltage criteria with downsloping ST depression and asymmetric T inversion laterally. Strain, not acute ischemia, but hypertrophy raises the false positive rate.'},
{id:'PB19',form:'B',kind:'localize',d:'D9',c:'D9.C3',dok:2,pattern:'wpw',
 q:'What is the abnormality?',
 o:['Left bundle branch block','Pre-excitation with a delta wave','First degree AV block','Junctional rhythm'],a:1,
 why:'Short PR with a slurred upstroke into a widened QRS. It matters most when atrial fibrillation arrives, because AV nodal blockers can accelerate the accessory pathway.'},

{id:'PB20',form:'B',kind:'decide',d:'D2',c:'D2.C5',dok:3,rhythm:'chb',
 q:'A 74 year old is dizzy and pale. Blood pressure 78 over 44, skin cool, no medication changes. What is the next action?',
 o:['Fluid bolus and reassess','Atropine while preparing transcutaneous pacing','Withhold treatment since she is awake','Dopamine infusion as the only intervention'],a:1,
 why:'Symptomatic complete block with hypoperfusion. Atropine often fails because the escape is below the node, so pacing is prepared at the same time, not after.'}

];
