#!/usr/bin/env python3
"""Build study-notes.html: one file, reads on screen, prints clean, QR per topic."""
import qrcode, base64, io, json, re

BASE = "https://drsrennie-stack.github.io/cvrn/"   # swap once when the repo is live

def qr_svg(url):
    q = qrcode.QRCode(box_size=1, border=1, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(url); q.make(fit=True)
    m = q.get_matrix(); n = len(m)
    rects = []
    for y in range(n):
        x = 0
        while x < n:
            if m[y][x]:
                run = 1
                while x+run < n and m[y][x+run]: run += 1
                rects.append(f'<rect x="{x}" y="{y}" width="{run}" height="1"/>')
                x += run
            else:
                x += 1
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges">'
           f'<rect width="{n}" height="{n}" fill="#fff"/><g fill="#0B1530">{"".join(rects)}</g></svg>')
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()

def topic_qr(domain, label):
    url = f"{BASE}cvrn-mastery-os.html?topic={domain}"
    return (f'<figure class="qr"><img src="{qr_svg(url)}" alt="QR code linking to the {label} question bank">'
            f'<figcaption>Scan for the<br><strong>{label}</strong><br>question bank</figcaption></figure>')

# ---------------------------------------------------------------- content
def mcq(qid, stem, opts, correct, why, memory=None):
    """opts: list of (text, justification). Every option carries a justification, right and wrong."""
    lis = []
    for i, (text, just) in enumerate(opts):
        k = "right" if i == correct else "wrong"
        lis.append(
            f'<li class="opt" data-k="{k}"><button class="optbtn" type="button" aria-expanded="false">'
            f'<span class="ltr">{"ABCD"[i]}</span><span class="otxt">{text}</span>'
            f'<span class="mark" aria-hidden="true"></span></button>'
            f'<div class="just"><p>{just}</p></div></li>')
    mem = f'<div class="mem"><h4>Memory tool</h4><p>{memory}</p></div>' if memory else ""
    return (f'<div class="q" id="{qid}"><p class="stem">{stem}</p><ul class="opts">{"".join(lis)}</ul>'
            f'<div class="teach"><h4>Why this matters</h4><p>{why}</p></div>{mem}</div>')

TYPES = [
    ("questions", "Questions",       ["test yourself"]),
    ("physio",    "Physiology",      ["physiolog", "compensation"]),
    ("patho",     "Pathophysiology", ["plaque", "block", "complication", "biomarker", "tracing", "represent"]),
    ("practice",  "Practice",        ["bedside", "pillar", "measurement", "self care", "volume", "perfusion"]),
]
def sect_type(title):
    t = title.lower()
    for key, label, words in TYPES:
        if any(w in t for w in words):
            return key, label
    return "practice", "Practice"

def split_sections(body):
    """Chapter bodies are written as a run of h3 blocks. Turn each into a section
       with a type and a time estimate so the chapter opens as an outline, not a wall."""
    parts = re.split(r'<h3>(.*?)</h3>', body)
    out = []
    for i in range(1, len(parts), 2):
        title, html = parts[i], parts[i+1]
        words = len(re.sub(r'<[^>]+>', ' ', html).split())
        mins = max(2, round(words/170) + html.count('class="q"')*3)
        key, label = sect_type(title)
        out.append((title, mins, html, key, label))
    return out

REFS = [
 ("Hall JE, Hall ME. <span class='ti'>Guyton and Hall Textbook of Medical Physiology</span>. 14th ed. Elsevier; 2021.", ""),
 ("Tortora GJ, Derrickson B. <span class='ti'>Principles of Anatomy and Physiology</span>. 16th ed. Wiley; 2020.", ""),
 ("Marieb EN, Hoehn K. <span class='ti'>Human Anatomy &amp; Physiology</span>. 12th ed. Pearson; 2022.", ""),
 ("Libby P, Bonow RO, Mann DL, et al, eds. <span class='ti'>Braunwald&rsquo;s Heart Disease: A Textbook of Cardiovascular Medicine</span>. 12th ed. Elsevier; 2022.", ""),
 ("Urden LD, Stacy KM, Lough ME. <span class='ti'>Critical Care Nursing: Diagnosis and Management</span>. 9th ed. Elsevier; 2022.", ""),
 ("Sole ML, Klein DG, Moseley MJ. <span class='ti'>Introduction to Critical Care Nursing</span>. 8th ed. Elsevier; 2021.", ""),
 ("Wagner GS, Strauss DG. <span class='ti'>Marriott&rsquo;s Practical Electrocardiography</span>. 13th ed. Wolters Kluwer; 2021.", ""),
 ("Kusumoto FM, Schoenfeld MH, Barrett C, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay. <span class='ti'>Circulation</span>. 2019.", ""),
 ("Sandau KE, Funk M, Auerbach A, et al. Update to Practice Standards for Electrocardiographic Monitoring in Hospital Settings: A Scientific Statement From the American Heart Association. <span class='ti'>Circulation</span>. 2017.", ""),
 ("Rao SV, O&rsquo;Donoghue ML, Ruel M, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. <span class='ti'>Circulation</span>. 2025.", "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001309"),
 ("Thygesen K, Alpert JS, Jaffe AS, et al. Fourth Universal Definition of Myocardial Infarction (2018). <span class='ti'>Circulation</span>. 2018.", ""),
 ("Virani SS, Newby LK, Arnold SV, et al. 2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for the Management of Patients With Chronic Coronary Disease. <span class='ti'>Circulation</span>. 2023.", ""),
 ("Heidenreich PA, Bozkurt B, Aguilar D, et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. <span class='ti'>Circulation</span>. 2022.", "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063"),
 ("Nohria A, Tsang SW, Fang JC, et al. Clinical assessment identifies hemodynamic profiles that predict outcomes in patients admitted with heart failure. <span class='ti'>J Am Coll Cardiol</span>. 2003.", ""),
 ("Whelton PK, Carey RM, Aronow WS, et al. 2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. <span class='ti'>Hypertension</span>. 2018.", ""),
]
def cite(*ns):
    return '<sup class="cite">' + ",".join(f'<a href="#ref{n}">{n}</a>' for n in ns) + '</sup>'

def sources(ns):
    lis = "".join(f'<li><a href="#ref{n}">{n}. {REFS[n-1][0]}</a></li>' for n in ns)
    return f'<h3>Sources for this chapter</h3>\n<ol class="srclist">{lis}</ol>'

CH = []

# ================= CHAPTER 1 =================
CH.append(dict(id="D2", num="1", title="Conduction and the Basic ECG",
  weight="L1 14% \u00b7 L2 8%", sub="From pacemaker cell to rhythm strip",
  body=f"""
<h3>Start with the physiology</h3>
<p>Rhythm interpretation answers three questions, in this order:</p>
<ol class="steps">
  <li><strong>Origin.</strong> Where did the impulse begin?</li>
  <li><strong>Conduction.</strong> What path did it take to the ventricles?</li>
  <li><strong>Timing.</strong> How long did each step take?</li>
</ol>
<p>These three answers determine the rhythm. Naming it is the last step, not the first.</p>

<p><strong>Automaticity.</strong> Pacemaker cells have no stable resting membrane potential. During phase 4, inward sodium and calcium current exceeds outward potassium current, so the membrane depolarises spontaneously until it reaches threshold and fires. This is the funny current. The cell group with the steepest phase 4 slope reaches threshold first and sets the heart rate, which under normal conditions is the sinoatrial node.{cite(1,2)}</p>

<div class="rates">
  <table>
    <caption>Intrinsic pacemaker rates</caption>
    <thead><tr><th>Site</th><th>Intrinsic rate (per minute)</th><th>ECG appearance if it takes over</th></tr></thead>
    <tbody>
      <tr><td>Sinoatrial node</td><td>60 to 100</td><td>Upright P wave preceding every QRS in lead II</td></tr>
      <tr><td>Atrial focus</td><td>60 to 80</td><td>Abnormally shaped or inverted P wave, narrow QRS</td></tr>
      <tr><td>Atrioventricular junction</td><td>40 to 60</td><td>Narrow QRS, P wave absent, inverted, or following the QRS</td></tr>
      <tr><td>Purkinje system or ventricular myocardium</td><td>20 to 40</td><td>Wide QRS, no associated P wave</td></tr>
    </tbody>
  </table>
</div>
<p>The faster site suppresses the slower ones. A junctional or ventricular rhythm therefore means the sinoatrial node has failed, or conduction from it has been blocked.{cite(1,7)}</p>

<p><strong>The conduction pathway, in sequence:</strong></p>
<ol class="steps">
  <li>The sinoatrial node depolarises.</li>
  <li>The impulse spreads across both atria, producing the <strong>P wave</strong>.</li>
  <li>The atrioventricular node delays conduction. This delay allows atrial emptying to complete before ventricular systole, and it accounts for most of the <strong>PR interval</strong>.</li>
  <li>The bundle of His, the right and left bundle branches, and the Purkinje fibres conduct rapidly through both ventricles, producing a narrow <strong>QRS complex</strong>.</li>
</ol>
<p>Clinical consequence: an impulse that does not use this rapid pathway must travel myocyte to myocyte, which is slower. A QRS of 0.12 seconds or more therefore indicates abnormal ventricular activation, from bundle branch block, a ventricular focus, ventricular pacing, or a metabolic cause such as hyperkalaemia.{cite(1,7,8)}</p>

<h3>What each part of the tracing represents</h3>
<ul class="def">
  <li><strong>P wave.</strong> Atrial depolarisation. Upright in lead II indicates a sinus or high atrial origin conducting downward.</li>
  <li><strong>PR interval.</strong> Onset of P to onset of QRS. Normal 0.12 to 0.20 seconds, which is three to five small boxes.</li>
  <li><strong>QRS complex.</strong> Ventricular depolarisation. Normal under 0.12 seconds.</li>
  <li><strong>ST segment.</strong> The plateau phase of the ventricular action potential. Normally isoelectric with the baseline.</li>
  <li><strong>T wave.</strong> Ventricular repolarisation.</li>
  <li><strong>QT interval.</strong> Total duration of ventricular depolarisation and repolarisation. Shortens as rate increases, which is why it is rate corrected.</li>
</ul>
<p>Atrial repolarisation occurs during the QRS complex and is not normally visible.{cite(2,3)}</p>

<div class="mem"><h4>Memory tool</h4>
<p><strong>Five questions, same order, every strip:</strong></p>
<ol class="steps tight">
  <li>Rate</li><li>Regularity</li><li>P waves present and related to the QRS</li><li>PR interval</li><li>QRS width</li>
</ol>
<p>Naming the rhythm before completing all five is the most common source of misinterpretation.</p></div>

<h3>Measurement</h3>
<p>Standard recording is 25 mm per second at a calibration of 10 mm per millivolt. One small box is 0.04 seconds, one large box is 0.20 seconds.</p>
<ol class="steps">
  <li><strong>Regular rhythm.</strong> Rate equals 300 divided by the number of large boxes between two R waves, or 1500 divided by the number of small boxes.</li>
  <li><strong>Irregular rhythm.</strong> Neither shortcut applies. Count QRS complexes in a six second strip and multiply by ten.</li>
  <li><strong>QT correction.</strong> Bazett formula: QTc equals QT divided by the square root of the R to R interval in seconds. A QTc above approximately 500 ms is associated with markedly increased risk of torsades de pointes.</li>
</ol>
<p>Measure from the earliest onset to the latest offset across several leads, since a single lead may not show the full duration.{cite(7,9)}</p>

<h3>Atrioventricular block</h3>
<p>All three degrees answer two questions: does every atrial impulse reach the ventricles, and is the PR interval constant?</p>
<ol class="steps">
  <li><strong>First degree.</strong> PR interval greater than 0.20 seconds, constant, with every P wave conducted. A conduction delay rather than a true block.</li>
  <li><strong>Second degree, Mobitz type I (Wenckebach).</strong> PR interval lengthens progressively until one P wave is not conducted, then the sequence resets. The lesion is usually within the atrioventricular node. Often responds to atropine.</li>
  <li><strong>Second degree, Mobitz type II.</strong> PR interval constant, then a P wave fails to conduct without warning. The lesion is usually infranodal. Carries a risk of progression to complete block, and the escape rhythm below the lesion is slow and unreliable.</li>
  <li><strong>Third degree (complete).</strong> No atrial impulses conduct. P waves and QRS complexes occur at independent rates with no fixed relationship. This atrioventricular dissociation is the diagnostic finding.</li>
</ol>
<p>Because the lesion in Mobitz type II and complete block usually sits below the atrioventricular node, atropine frequently fails, and temporary pacing capability is prepared at the same time it is given.{cite(8,5)}</p>

<div class="mem"><h4>Memory tool</h4>
<p><strong>Longer, longer, longer, drop, then you have a Wenckebach.</strong> Constant PR with a dropped beat is Mobitz II. P waves and QRS complexes marching independently is third degree. The distinguishing step in all three is measuring the PR interval across several consecutive beats rather than looking at one complex.</p></div>

<div class="clin"><h4>At the bedside</h4>
<p>Treatment follows symptoms, not the number. A rate of 40 in a well perfused, asymptomatic patient is a finding. A rate of 52 with hypotension, altered mental status, ischaemic chest discomfort, or acute heart failure meets the definition of symptomatic bradycardia and is treated.</p>
<p>Sequence for symptomatic bradycardia: atropine 1 mg intravenous, repeated every three to five minutes to a maximum of 3 mg, while preparing transcutaneous pacing. If atropine is ineffective, proceed to transcutaneous pacing or a dopamine or epinephrine infusion.{cite(8)}</p></div>

<h3>Test yourself</h3>
""" + mcq("d2q1",
  "A monitored patient has a ventricular rate of 44. The PR interval measures 0.16 seconds and is identical on every conducted beat, and every third P wave is not followed by a QRS complex. The patient is diaphoretic with a blood pressure of 78 over 44. What is the priority action?",
  [("Continue observation and reassess the rhythm in 15 minutes",
    "Observation is appropriate only when perfusion is adequate. Diaphoresis and a systolic pressure of 78 meet the criteria for symptomatic bradycardia, which requires treatment."),
   ("Administer atropine and prepare for transcutaneous pacing at the same time",
    "Correct. A constant PR interval with intermittently non-conducted P waves is Mobitz type II second degree block, which is usually infranodal. Atropine acts on the atrioventricular node and often fails when the lesion is below it, so pacing capability is prepared concurrently rather than after atropine fails."),
   ("Administer adenosine to slow conduction and expose the underlying rhythm",
    "Adenosine blocks conduction through the atrioventricular node. In a patient already failing to conduct through that node and who is hypotensive, this risks prolonged asystole. Adenosine is indicated for regular narrow complex tachycardia."),
   ("Administer a 500 mL isotonic fluid bolus and reassess",
    "The hypotension here results from an inadequate ventricular rate rather than from hypovolaemia. Fluid will not raise a rate of 44, and giving it first delays the indicated treatment.")],
  1,
  "Two things are tested together: identifying Mobitz type II by a constant PR interval with dropped beats, and knowing that the anatomic level of the block determines whether atropine can be relied upon. Recognising the rhythm but managing it as Mobitz type I still produces the wrong action.",
  "Constant PR with a dropped beat is <strong>M</strong>obitz II, so <strong>M</strong>ake ready to pace.")
  + mcq("d2q2",
  "A rhythm strip shows a QRS duration of 0.16 seconds, no identifiable P waves, and a regular rate of 38. Which conclusion is best supported?",
  [("The impulse originates in the sinoatrial node with delayed conduction",
    "A sinus origin produces visible P waves. Their complete absence excludes it."),
   ("The impulse originates in the atrioventricular junction",
    "A junctional focus lies above the ventricles and conducts through the intact His-Purkinje system, producing a narrow QRS at 40 to 60 per minute. The QRS duration of 0.16 seconds excludes this."),
   ("The impulse originates below the bundle branches, in the Purkinje system or ventricular myocardium",
    "Correct. A QRS of 0.16 seconds indicates activation outside the rapid conduction system, and a rate of 38 falls within the intrinsic ventricular escape range of 20 to 40. This is an escape rhythm maintaining cardiac output, so suppressing it with an antiarrhythmic would remove the only functioning pacemaker."),
   ("This is atrial flutter with variable atrioventricular conduction",
    "Atrial flutter produces organised atrial activity at approximately 250 to 350 per minute with a ventricular rate that is a fraction of it. Neither finding is present.")],
  2,
  "QRS width localises the origin and rate identifies which escape pacemaker is active. Reading them together locates the focus without memorising rhythm names, and it establishes the management principle: an escape rhythm is supported, never suppressed.",
  "<strong>Wide means below.</strong> A narrow QRS used the conduction system, so the origin is at or above the junction. A wide QRS did not.")
  + sources([1,2,3,5,7,8,9])
))

# ================= CHAPTER 2 =================
CH.append(dict(id="D3", num="2", title="Coronary Artery Disease and Acute Coronary Syndrome",
  weight="L1 22% \u00b7 L2 14%", sub="Oxygen supply, oxygen demand, and plaque rupture",
  body=f"""
<h3>Start with the physiology</h3>
<p>Myocardium is obligately aerobic and extracts approximately 70 to 80 percent of delivered oxygen at rest, compared with about 25 percent in most other tissues. Because extraction is already near maximal, the myocardium cannot meet increased demand by extracting more oxygen. It must increase coronary blood flow.{cite(1,4)}</p>

<p><strong>Coronary perfusion occurs during diastole.</strong> Systolic contraction compresses the intramyocardial vessels, particularly in the left ventricular subendocardium. Two clinical consequences follow directly:</p>
<ol class="steps">
  <li><strong>Tachycardia reduces perfusion.</strong> Increasing heart rate shortens diastole proportionally more than systole, so perfusion time falls at the moment demand is highest.</li>
  <li><strong>The subendocardium is affected first.</strong> It is the last layer perfused and the most vulnerable to ischaemia, which is why subendocardial ischaemia produces ST depression rather than ST elevation.</li>
</ol>

<div class="mem"><h4>Memory tool</h4>
<p>Myocardial oxygen demand has three determinants: <strong>heart rate, contractility, and wall tension</strong> (preload and afterload). Every antianginal agent reduces at least one of them. Beta blockers reduce rate and contractility. Nitrates reduce preload. Afterload reducers reduce wall tension. Identifying which determinant a drug acts on gives you its indication without memorising a list.{cite(4)}</p></div>

<h3>From stable plaque to acute event</h3>
<p><strong>Stable angina.</strong> A fixed stenosis limits flow reserve. Perfusion is adequate at rest and inadequate on exertion, producing predictable, reproducible, exertional chest discomfort relieved by rest or nitroglycerin.{cite(12)}</p>
<p><strong>Acute coronary syndrome.</strong> Plaque rupture or erosion exposes thrombogenic material to circulating blood. Platelets adhere and aggregate and a thrombus forms. What follows depends on whether the thrombus occludes the vessel completely.{cite(10,11)}</p>

<table class="cmp">
  <caption>The acute coronary syndrome spectrum</caption>
  <thead><tr><th></th><th>Unstable angina</th><th>NSTEMI</th><th>STEMI</th></tr></thead>
  <tbody>
    <tr><th>Occlusion</th><td>Partial</td><td>Partial or transient</td><td>Complete</td></tr>
    <tr><th>ECG</th><td>Normal, ST depression, or T wave inversion</td><td>Normal, ST depression, or T wave inversion</td><td>ST elevation, or new left bundle branch block</td></tr>
    <tr><th>Troponin</th><td>Not elevated</td><td>Elevated</td><td>Elevated</td></tr>
    <tr><th>Necrosis</th><td>None</td><td>Subendocardial</td><td>Transmural</td></tr>
    <tr><th>Priority</th><td>Antithrombotic therapy, risk stratification</td><td>Antithrombotic therapy, early invasive strategy</td><td>Immediate reperfusion</td></tr>
  </tbody>
</table>
<p>Unstable angina and NSTEMI are distinguished only by troponin. They can present identically, which is why serial biomarkers are obtained rather than the diagnosis being made on presentation alone.{cite(10,11)}</p>

<h3>Biomarkers</h3>
<p>High sensitivity cardiac troponin detects very small quantities of myocardial injury. It has high sensitivity and lower specificity, so it excludes myocardial infarction well and confirms it less well. Troponin elevation occurs in sepsis, pulmonary embolism, myocarditis, renal impairment, tachyarrhythmia, and decompensated heart failure, none of which are coronary occlusion.{cite(11)}</p>
<ol class="steps">
  <li><strong>Myocardial injury</strong> is any troponin elevation above the 99th percentile upper reference limit.</li>
  <li><strong>Acute injury</strong> requires a rise or fall across serial measurements, the delta.</li>
  <li><strong>Myocardial infarction</strong> requires acute injury plus clinical evidence of ischaemia: symptoms, ECG changes, imaging evidence, or angiographic findings.</li>
</ol>
<p>A stably elevated troponin in chronic kidney disease is chronic myocardial injury. A value that rises significantly over one to three hours is acute.{cite(11)}</p>

<div class="clin"><h4>The guideline pathway</h4>
<p>Reperfusion timing for STEMI, per the 2025 ACC/AHA acute coronary syndrome guideline:{cite(10)}</p>
<ol class="steps">
  <li>At a PCI capable facility, target first medical contact to device within <strong>90 minutes</strong>.</li>
  <li>Requiring transfer, target first medical contact to device within <strong>120 minutes</strong>.</li>
  <li>If 120 minutes cannot be met, give fibrinolytic therapy within <strong>30 minutes</strong> of arrival provided there is no contraindication, then transfer.</li>
</ol>
<p>The decision rests on anticipated time to reperfusion, not on institutional preference.</p>
<p><strong>Absolute contraindications to fibrinolysis:</strong> any prior intracranial haemorrhage, known structural cerebral vascular lesion or malignant intracranial neoplasm, ischaemic stroke within three months, suspected aortic dissection, active bleeding or bleeding diathesis, and significant closed head or facial trauma within three months.{cite(10)}</p></div>

<h3>Mechanical complications after infarction</h3>
<p>These typically occur between day two and day seven after a large infarct and present as abrupt decompensation in a previously stable patient.{cite(4,5)}</p>
<ul class="def">
  <li><strong>Papillary muscle rupture.</strong> Acute severe mitral regurgitation. Sudden dyspnoea, new holosystolic murmur, pulmonary oedema, hypotension.</li>
  <li><strong>Ventricular septal rupture.</strong> New harsh holosystolic murmur with a palpable thrill, biventricular failure, oxygen saturation step up between right atrium and right ventricle.</li>
  <li><strong>Free wall rupture.</strong> Tamponade producing pulseless electrical activity.</li>
  <li><strong>Cardiogenic shock.</strong> Most often after a large anterior infarct. Low cardiac output with elevated filling pressures.</li>
</ul>

<div class="mem"><h4>Memory tool</h4>
<p>A murmur that was not present the day before, in a patient who infarcted two to seven days ago, is a mechanical complication until proven otherwise.</p></div>

<h3>Test yourself</h3>
""" + mcq("d3q1",
  "A patient with a large anterior STEMI is on hospital day three. He develops sudden severe dyspnoea, a new loud holosystolic murmur at the apex, and a blood pressure of 82 over 50. Which explanation best fits?",
  [("Reinfarction of the anterior wall",
    "Reinfarction presents with recurrent ischaemic chest discomfort and new ECG changes. It does not produce a new holosystolic murmur, which is the finding that directs the diagnosis elsewhere."),
   ("Papillary muscle rupture producing acute mitral regurgitation",
    "Correct. The timing, day two to seven after infarction, and the combination of a new holosystolic murmur with abrupt haemodynamic decompensation are characteristic. The left atrium has not dilated or become compliant, so the regurgitant volume transmits directly to the pulmonary circulation, producing pulmonary oedema and shock rather than gradual decline."),
   ("Acute pericarditis",
    "Post-infarction pericarditis occurs in this window but produces a pericardial friction rub and positional pleuritic chest pain, not a holosystolic murmur with hypotension and pulmonary oedema."),
   ("Anxiety related hyperventilation",
    "This attributes objective findings, a new murmur and a systolic pressure of 82, to a subjective cause. Hyperventilation produces neither.")],
  1,
  "Timing plus a new murmur plus haemodynamic collapse is the pattern. Acute and chronic mitral regurgitation behave differently because of atrial compliance: the chronically volume loaded atrium has remodelled and accommodates the regurgitant volume at lower pressure, while the acutely affected atrium has not.",
  "<strong>Day two to seven, new murmur, sudden decompensation.</strong> Consider a mechanical complication before a medical one.")
  + sources([1,4,5,10,11,12])
))

# ================= CHAPTER 3 =================
CH.append(dict(id="D6", num="3", title="Heart Failure",
  weight="L1 20% \u00b7 L2 13%", sub="Neurohormonal compensation and its consequences",
  body=f"""
<h3>Start with the physiology</h3>
<p>Cardiac output equals stroke volume multiplied by heart rate. Stroke volume is determined by three factors:</p>
<ol class="steps">
  <li><strong>Preload.</strong> Ventricular end-diastolic volume, the degree of myocardial fibre stretch before contraction.</li>
  <li><strong>Afterload.</strong> The resistance the ventricle must overcome to eject.</li>
  <li><strong>Contractility.</strong> The intrinsic force of contraction, independent of loading conditions.</li>
</ol>
<p>Heart failure is the clinical syndrome in which cardiac structural or functional impairment prevents the ventricle from delivering an output adequate to metabolic demand, or does so only at elevated filling pressures.{cite(13)} Both presentations follow from that definition: reduced forward output, and congestion from elevated filling pressures. Most patients have some of each.</p>

<p><strong>The Frank-Starling relationship.</strong> Increasing sarcomere stretch improves actin and myosin overlap and increases the force of the subsequent contraction, up to an optimum. In the failing ventricle the curve is flattened and shifted rightward, so a given increase in filling volume produces less additional stroke volume and a substantially greater rise in filling pressure. This is why volume loading a failing ventricle produces congestion rather than improved output.{cite(1,4)}</p>

<h3>Compensatory mechanisms</h3>
<p>When cardiac output falls, the body activates the same reflexes it uses for hypovolaemia. Each is beneficial acutely and harmful when sustained.{cite(4,13)}</p>
<ol class="steps">
  <li><strong>Sympathetic activation.</strong> Increases heart rate and contractility and causes arteriolar vasoconstriction. Sustained, it increases myocardial oxygen demand, shortens diastolic filling and coronary perfusion time, raises afterload, and is directly cytotoxic to myocytes.</li>
  <li><strong>Renin angiotensin aldosterone activation.</strong> Reduced renal perfusion triggers renin release. Angiotensin II causes vasoconstriction and aldosterone causes sodium and water retention. Sustained, it adds both preload and afterload and promotes myocardial fibrosis.</li>
  <li><strong>Ventricular remodelling.</strong> Under sustained neurohormonal stimulation the ventricle dilates and hypertrophies into a geometry that is mechanically less efficient, converting an initial injury into a progressive disease.</li>
</ol>

<div class="mem"><h4>Memory tool</h4>
<p>Each of the four pillars of therapy <strong>opposes</strong> one of these compensations. That is why a beta blocker is given to a failing heart and an afterload reducer to a patient whose blood pressure is already low. The target is the neurohormonal cascade driving remodelling, not the pump itself.{cite(13)}</p></div>

<h3>The four pillars</h3>
<table class="cmp">
  <caption>Guideline directed medical therapy for heart failure with reduced ejection fraction</caption>
  <thead><tr><th>Pillar</th><th>Mechanism opposed</th><th>Monitoring</th></tr></thead>
  <tbody>
    <tr><th>ARNI, or ACE inhibitor or ARB</th><td>Renin angiotensin aldosterone system; ARNI additionally preserves natriuretic peptides</td><td>Potassium, creatinine, blood pressure, angioedema. A 36 hour washout is required when switching from an ACE inhibitor to an ARNI.</td></tr>
    <tr><th>Beta blocker</th><td>Sympathetic activation and remodelling</td><td>Heart rate, blood pressure. Initiate at low dose and titrate slowly. Do not initiate during acute decompensation.</td></tr>
    <tr><th>Mineralocorticoid receptor antagonist</th><td>Aldosterone mediated sodium retention and fibrosis</td><td>Potassium and renal function. The pillar most often responsible for hyperkalaemia.</td></tr>
    <tr><th>SGLT2 inhibitor</th><td>Multiple, including natriuresis and altered myocardial substrate use</td><td>Volume status, genital mycotic infection, euglycaemic ketoacidosis. Benefit is independent of diabetes status.</td></tr>
  </tbody>
</table>
<p>A modest rise in creatinine after initiating an ACE inhibitor, ARNI, or mineralocorticoid receptor antagonist reflects expected haemodynamic change rather than renal injury, and is not by itself an indication to discontinue therapy.{cite(13)}</p>

<h3>Assessing congestion and perfusion</h3>
<p>Two independent questions determine management. The resulting four profiles were described by Stevenson and validated by Nohria and colleagues.{cite(14)}</p>
<ol class="steps">
  <li><strong>Is the patient congested?</strong> Wet or dry. Assessed by jugular venous pressure, orthopnoea, crackles, peripheral oedema, and hepatomegaly.</li>
  <li><strong>Is the patient adequately perfused?</strong> Warm or cold. Assessed by pulse pressure, extremity temperature, mental status, and renal function.</li>
</ol>

<table class="cmp">
  <caption>Haemodynamic profiles and management priority</caption>
  <thead><tr><th></th><th>Dry (no congestion)</th><th>Wet (congested)</th></tr></thead>
  <tbody>
    <tr><th>Warm (perfused)</th><td>Profile A. Compensated. Continue therapy.</td><td>Profile B. Diuresis.</td></tr>
    <tr><th>Cold (hypoperfused)</th><td>Profile L. Underfilled or over-diuresed. Cautious volume.</td><td>Profile C. Highest mortality. Decongestion with consideration of inotropic support.</td></tr>
  </tbody>
</table>
<p>Profile C is the most frequently mismanaged. Crackles suggest aggressive diuresis, but low output means aggressive diuresis alone may further reduce perfusion. A narrow pulse pressure, cool extremities, altered mental status, and rising creatinine identify the cold patient.{cite(14,5)}</p>

<h3>Self care and transition of care</h3>
<p>Readmission within 30 days is driven substantially by what occurs in the first two weeks after discharge. Effective teaching is specific and gives the patient an action threshold rather than general advice.{cite(13,6)}</p>
<ol class="steps">
  <li><strong>Daily weight.</strong> On waking, after voiding, in similar clothing, on the same scale. Consistency matters because the trend is the signal.</li>
  <li><strong>Call threshold.</strong> A gain of two to three pounds in 24 hours, or five pounds in one week.</li>
  <li><strong>Sodium.</strong> Guidance the patient can act on: read labels, avoid processed and restaurant foods, which contribute most dietary sodium.</li>
  <li><strong>Symptom escalation.</strong> Distinguish what warrants a call today from what warrants emergency evaluation.</li>
</ol>

<h3>Test yourself</h3>
""" + mcq("d6q1",
  "A patient admitted with decompensated heart failure has crackles to the mid lung fields, jugular venous distension, cool extremities, a narrow pulse pressure, and a creatinine that has risen from 1.1 to 1.7 mg/dL. Which management approach is most appropriate?",
  [("Aggressive intravenous diuresis as the sole intervention",
    "This addresses congestion and ignores perfusion. Cool extremities, narrow pulse pressure, and rising creatinine indicate hypoperfusion. Diuresis alone in profile C can further reduce cardiac output and worsen renal function."),
   ("Decongestion with consideration of inotropic support",
    "Correct. Congestion with hypoperfusion is profile C, which carries the highest mortality of the four profiles. Congestion must be treated, but perfusion requires simultaneous support, which is why inotropic therapy is considered here and not in the warm and wet patient."),
   ("Intravenous fluid resuscitation to improve renal perfusion",
    "The rising creatinine suggests this, but crackles and jugular venous distension indicate volume overload. The renal impairment reflects low forward output and venous congestion, not hypovolaemia. Volume would worsen both."),
   ("Withhold all guideline directed therapy and observe",
    "Temporarily withholding beta blockade may be appropriate in low output states, but withholding all therapy while the patient is both congested and hypoperfused is not a management plan.")],
  1,
  "The profile framework exists to prevent the first option. Congestion and perfusion are assessed independently and both answers are required before a plan is made. Renal function that worsens during decongestion often reflects venous congestion rather than volume depletion, which is the opposite of what the creatinine alone suggests.",
  "<strong>Wet means decongest. Cold means support forward flow.</strong> A cold and wet patient needs both, not one.")
  + sources([1,4,5,6,13,14])
))

# ---------------------------------------------------------------- assemble
chapters_html, toc, total_min = [], [], 0
for c in CH:
    secs = split_sections(c['body'])
    cmin = sum(x[1] for x in secs); total_min += cmin
    toc.append(f'''<li><a href="#{c["id"]}"><span class="n">{c["num"]}</span>
      <span class="t">{c["title"]}<span class="sub">{c["sub"]}</span></span>
      <span class="meta"><span class="badge">{c["weight"]}</span><span class="mins">{cmin} min</span></span></a></li>''')
    sec_html, sec_toc = [], []
    for j,(title, mins, html, key, label) in enumerate(secs):
        sid = f'{c["id"]}-s{j+1}'
        sec_toc.append(f'<li data-t="{key}"><a href="#{sid}">{title}</a>'
                       f'<span class="tmeta"><span class="chip" data-t="{key}">{label}</span>'
                       f'<span class="mins">{mins} min</span></span></li>')
        sec_html.append(f'''
    <section class="sec" id="{sid}" data-state="pending" data-t="{key}">
      <h3 class="sech">
        <button class="sectog" type="button" aria-expanded="false" aria-controls="{sid}-b">
          <span class="chev" aria-hidden="true"></span>
          <span class="sectitle">{title}</span>
          <span class="chip" data-t="{key}">{label}</span>
          <span class="mins">{mins} min</span>
        </button>
      </h3>
      <div class="secbody" id="{sid}-b">
        {html}
        <p class="donerow"><button class="donebtn" type="button" aria-pressed="false">Mark this section read</button></p>
      </div>
    </section>''')
    chapters_html.append(f'''
<section class="chapter" id="{c['id']}">
  <div class="chd">
    <div class="chdmain">
      <p class="ceyebrow">Chapter {c['num']} &middot; {c["weight"]} of the exam</p>
      <h2>{c['title']}</h2>
      <p class="csub">{c['sub']}</p>
      <p class="chmeta"><span class="badge">{c['weight']}</span><span class="badge alt">{cmin} min</span><span class="badge alt">{len(secs)} sections</span></p>
      <div class="prog" data-for="{c['id']}"><div class="progbar"><i style="width:0%"></i></div><span class="progtxt">0 of {len(secs)} sections read</span></div>
    </div>
    {topic_qr(c['id'], c['title'])}
  </div>
  <nav class="secnav" aria-label="Sections in {c['title']}">
    <p class="secnavh">In this chapter</p>
    <ol>{"".join(sec_toc)}</ol>
  </nav>
  {"".join(sec_html)}
</section>''')

refs_html = "".join(
    f'<li id="ref{i+1}">{txt}' + (f'<a class="doi" href="{url}">{url}</a>' if url else '') + '</li>'
    for i,(txt,url) in enumerate(REFS))

HTML = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CVRN Study Notes | MedMasters Collaborative</title>
<meta name="description" content="Basic science to advanced clinical study notes for the CVRN-BC review course. Opens as an outline, expands section by section, prints complete.">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{{
  --navy:#0A1322; --navy-tint:#EDF1F3; --ink:#0A1322; --ink-soft:#14202F; --ink-muted:#3D4860;
  --gold:#D4A24C; --gold-text:#6E5018; --terra:#C25A3E; --terra-text:#7A2F18; --teal-text:#2C5F66;
  --rule:#B8BEC8; --rule-soft:#DCE0E6; --white:#fff; --off-white:#fafaf9;
  /* semantic section colours, screen only */
  --t-physio:#2C5F66; --t-patho:#7A2F18; --t-practice:#0A1322; --t-questions:#6E5018;
  --t-physio-soft:#EDF4F5; --t-patho-soft:#FAF1EE; --t-practice-soft:#EDF1F3; --t-questions-soft:#FAF5EA;
  --card:0 1px 3px rgba(10,19,34,.08), 0 1px 2px rgba(10,19,34,.05);
  --lift:0 6px 16px rgba(10,19,34,.10), 0 3px 6px rgba(10,19,34,.06);
  --r:4px;
}}
*{{box-sizing:border-box;margin:0;padding:0}}
em,i,cite,dfn,var,address{{font-style:normal}}
html{{scroll-behavior:smooth}}
body{{font-family:'Atkinson Hyperlegible',system-ui,sans-serif;background:var(--white);color:var(--ink);
  font-size:16.5px;line-height:1.72;-webkit-font-smoothing:antialiased}}
h1,h2,h3,h4,.eyebrow,.badge,.mins,.sectitle,button{{font-family:'Plus Jakarta Sans',system-ui,sans-serif}}
.skip{{position:absolute;left:-9999px;background:var(--navy);color:#fff;padding:12px 18px;font-weight:700;z-index:99;border-radius:0 0 var(--r) 0}}
.skip:focus{{left:0;top:0}}
:focus-visible{{outline:3px solid var(--terra-text);outline-offset:3px;border-radius:var(--r)}}
.wrap{{max-width:880px;margin:0 auto;padding:34px 24px 90px}}

.eyebrow{{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--terra-text);font-weight:700;margin-bottom:10px}}
h1{{font-size:clamp(30px,5vw,42px);font-weight:800;letter-spacing:-.02em;line-height:1.12;margin-bottom:10px}}
.lede{{color:var(--ink-muted);font-size:17px;max-width:64ch;margin-bottom:12px}}
.byline{{font-size:14px;color:var(--ink-muted);margin-top:20px}}
.badge{{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
  padding:4px 11px;border-radius:99px;background:var(--navy);color:#fff}}
.badge.alt{{background:var(--white);color:var(--ink-muted);border:1px solid var(--rule-soft)}}
.mins{{font-size:12px;font-weight:700;color:var(--ink-muted);letter-spacing:.04em;white-space:nowrap}}

/* reading controls */
.controls{{background:var(--white);border:1px solid var(--rule-soft);border-radius:var(--r);box-shadow:var(--card);
  padding:16px 18px;margin:26px 0 8px;display:flex;gap:12px;flex-wrap:wrap;align-items:center}}
.controls label{{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);font-weight:700;font-family:'Plus Jakarta Sans',sans-serif}}
.controls input[type=search]{{flex:1;min-width:190px;font-family:inherit;font-size:15px;padding:10px 12px;min-height:44px;
  border:1px solid var(--rule);border-radius:var(--r);background:var(--white);color:var(--ink)}}
.btn{{font-size:13.5px;font-weight:700;padding:11px 16px;min-height:44px;border-radius:var(--r);cursor:pointer;
  border:1px solid var(--rule);background:var(--white);color:var(--ink);
  transition:box-shadow 180ms ease,transform 180ms ease,border-color 180ms ease}}
.btn:hover{{box-shadow:var(--lift);transform:translateY(-1px);border-color:var(--navy)}}
.btn.solid{{background:var(--navy);border-color:var(--navy);color:#fff}}
.searchnote{{font-size:13px;color:var(--ink-muted);margin-top:8px}}

/* contents */
.toc{{background:var(--white);border:1px solid var(--rule-soft);border-radius:var(--r);box-shadow:var(--card);padding:20px 22px;margin:14px 0 8px}}
.toc h2{{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--terra-text);margin-bottom:6px}}
.toc ul{{list-style:none}}
.toc li a{{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:16px;align-items:start;padding:13px 0;
  text-decoration:none;color:var(--ink);border-bottom:1px solid var(--rule-soft)}}
.toc li:last-child a{{border-bottom:0}}
.toc li a:hover .t{{color:var(--terra-text)}}
.toc .n{{font-weight:800;color:var(--gold-text);font-size:19px;line-height:1.3}}
.toc .t{{font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;line-height:1.35}}
.toc .t .sub{{display:block;font-weight:400;font-size:14px;color:var(--ink-muted);font-family:'Atkinson Hyperlegible',sans-serif;margin-top:2px}}
.toc .meta{{display:flex;flex-direction:column;align-items:flex-end;gap:6px}}

/* chapter */
.chapter{{margin-top:56px}}
.chd{{display:flex;gap:24px;align-items:flex-start;justify-content:space-between;margin-bottom:18px}}
.ceyebrow{{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--terra-text);font-weight:700;margin-bottom:6px}}
.chd h2{{font-size:29px;font-weight:800;letter-spacing:-.02em;line-height:1.16}}
.csub{{color:var(--ink-muted);font-size:15.5px;margin-top:4px}}
.chmeta{{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}}
.qr{{flex:0 0 108px;text-align:center}}
.qr img{{width:108px;height:108px;display:block;border:1px solid var(--rule-soft);border-radius:var(--r);background:#fff;padding:5px}}
.qr figcaption{{font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;line-height:1.4;color:var(--ink-muted);margin-top:6px}}

.secnav{{background:var(--off-white);border:1px solid var(--rule-soft);border-radius:var(--r);padding:15px 18px;margin-bottom:20px}}
.secnavh{{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-muted);font-weight:700;margin-bottom:8px}}
.secnav ol{{list-style:none;counter-reset:sn}}
.secnav li{{counter-increment:sn;display:flex;justify-content:space-between;gap:14px;padding:6px 0}}
.secnav li a{{color:var(--ink);text-decoration:none;font-size:15px}}
.secnav li a::before{{content:counter(sn) ".";color:var(--gold-text);font-weight:700;margin-right:8px;font-family:'Plus Jakarta Sans',sans-serif}}
.secnav li a:hover{{color:var(--terra-text)}}

/* collapsible section */
.sec{{background:var(--white);border:1px solid var(--rule-soft);border-radius:var(--r);box-shadow:var(--card);margin-bottom:12px;overflow:hidden}}
.sec[data-state="now"]{{border-color:var(--gold)}}
.sec[data-state="done"]{{border-color:var(--navy);background:var(--navy-tint)}}
.sech{{margin:0}}
.sectog{{width:100%;display:grid;grid-template-columns:22px minmax(0,1fr) auto auto;gap:12px;align-items:center;text-align:left;
  background:transparent;border:0;padding:17px 20px;cursor:pointer;min-height:44px;color:var(--ink)}}
.sectog:hover .sectitle{{color:var(--terra-text)}}
.sectitle{{font-size:18px;font-weight:700;letter-spacing:-.01em;line-height:1.35}}
.chev{{width:11px;height:11px;border-right:2px solid var(--ink-muted);border-bottom:2px solid var(--ink-muted);
  transform:rotate(-45deg);transition:transform 200ms ease;margin-left:4px}}
.sectog[aria-expanded="true"] .chev{{transform:rotate(45deg)}}
.secbody{{display:none;padding:0 20px 22px}}
.sec[data-open="1"] .secbody{{display:block}}
.donerow{{margin:22px 0 0}}
.donebtn{{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;padding:10px 15px;min-height:44px;
  border:1px solid var(--rule);border-radius:var(--r);background:var(--white);cursor:pointer;color:var(--ink)}}
.donebtn:hover{{border-color:var(--navy);box-shadow:var(--lift)}}
.donebtn[aria-pressed="true"]{{background:var(--navy);border-color:var(--navy);color:#fff}}

/* prose */
h4{{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);font-weight:700;margin-bottom:6px}}
p{{margin-bottom:14px}}
.secbody > p:first-child{{margin-top:2px}}
ul.def{{list-style:none;margin:0 0 18px}}
ul.def li{{background:var(--off-white);border:1px solid var(--rule-soft);border-radius:var(--r);padding:12px 15px;margin-bottom:9px}}
table{{width:100%;border-collapse:collapse;font-size:15px;margin:8px 0 20px;background:var(--white)}}
caption{{caption-side:top;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink-muted);font-weight:700;padding-bottom:8px}}
th{{background:var(--navy);color:#fff;text-align:left;padding:10px 12px;font-size:11.5px;letter-spacing:.07em;
  text-transform:uppercase;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700}}
tbody th{{background:var(--off-white);color:var(--ink);text-transform:none;font-size:14.5px;letter-spacing:0;width:26%;font-family:'Plus Jakarta Sans',sans-serif}}
td{{padding:10px 12px;border-bottom:1px solid var(--rule-soft);vertical-align:top}}
tbody tr:last-child td{{border-bottom:0}}
.mem,.clin{{background:var(--white);border:1px solid var(--rule-soft);border-radius:var(--r);box-shadow:var(--card);padding:16px 18px;margin:18px 0}}
.mem h4{{color:var(--gold-text)}} .clin h4{{color:var(--terra-text)}}
.mem p:last-child,.clin p:last-child{{margin-bottom:0}}

/* questions */
.q{{background:var(--white);border:1px solid var(--rule-soft);border-radius:var(--r);box-shadow:var(--card);padding:20px 22px;margin:20px 0}}
.stem{{font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:15px;line-height:1.55}}
.opts{{list-style:none}}
.opt{{margin-bottom:9px}}
.optbtn{{width:100%;display:grid;grid-template-columns:24px 1fr 20px;gap:11px;align-items:start;text-align:left;
  background:var(--white);border:1px solid var(--rule);border-radius:var(--r);padding:13px 15px;cursor:pointer;
  font-family:'Atkinson Hyperlegible',sans-serif;font-size:15.5px;color:var(--ink);line-height:1.55;min-height:44px;
  transition:box-shadow 180ms ease,transform 180ms ease,border-color 180ms ease}}
.optbtn:hover{{border-color:var(--navy);transform:translateY(-1px);box-shadow:var(--lift)}}
.ltr{{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;color:var(--gold-text)}}
.mark{{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:15px;text-align:right}}
.opt[data-k="right"] .optbtn[aria-expanded="true"]{{border-color:var(--navy);background:var(--navy-tint)}}
.opt[data-k="wrong"] .optbtn[aria-expanded="true"]{{border-color:var(--terra)}}
.opt[data-k="right"] .optbtn[aria-expanded="true"] .mark::after{{content:"\\2713";color:var(--navy)}}
.opt[data-k="wrong"] .optbtn[aria-expanded="true"] .mark::after{{content:"\\2715";color:var(--terra-text)}}
.just{{display:none;padding:12px 15px 2px 48px;font-size:15px;color:var(--ink-soft)}}
.optbtn[aria-expanded="true"] + .just{{display:block}}
.teach{{margin-top:16px;padding-top:14px;border-top:1px solid var(--rule-soft)}}
.teach p{{margin:0;font-size:15px;color:var(--ink-soft)}}
.q .mem{{margin-bottom:0}}

/* ---- semantic colour, screen only ---- */
.chip{{display:inline-block;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:99px;white-space:nowrap;
  border:1px solid currentColor}}
.chip[data-t="physio"]{{color:var(--t-physio)}}
.chip[data-t="patho"]{{color:var(--t-patho)}}
.chip[data-t="practice"]{{color:var(--t-practice)}}
.chip[data-t="questions"]{{color:var(--t-questions)}}
.sec .chev{{border-color:currentColor}}
.sec[data-t="physio"] .sectog{{color:var(--t-physio)}}
.sec[data-t="patho"] .sectog{{color:var(--t-patho)}}
.sec[data-t="practice"] .sectog{{color:var(--t-practice)}}
.sec[data-t="questions"] .sectog{{color:var(--t-questions)}}
.sec .sectitle{{color:var(--ink)}}
.sec .secbody{{color:var(--ink)}}
.sectog:hover .sectitle{{color:inherit}}
.sec[data-t="physio"][data-state="now"]{{border-color:var(--t-physio)}}
.sec[data-t="patho"][data-state="now"]{{border-color:var(--t-patho)}}
.sec[data-t="practice"][data-state="now"]{{border-color:var(--t-practice)}}
.sec[data-t="questions"][data-state="now"]{{border-color:var(--t-questions)}}
.sec[data-state="done"]{{border-color:var(--navy);background:var(--navy-tint)}}
.secnav li{{align-items:center}}
.tmeta{{display:flex;gap:9px;align-items:center;flex:0 0 auto}}
.secnav li[data-t="physio"] a::before{{color:var(--t-physio)}}
.secnav li[data-t="patho"] a::before{{color:var(--t-patho)}}
.secnav li[data-t="practice"] a::before{{color:var(--t-practice)}}
.secnav li[data-t="questions"] a::before{{color:var(--t-questions)}}

/* chapter progress */
.prog{{display:flex;align-items:center;gap:11px;margin-top:14px;max-width:340px}}
.progbar{{flex:1;height:7px;border-radius:99px;background:var(--rule-soft);overflow:hidden}}
.progbar i{{display:block;height:100%;background:var(--navy);border-radius:99px;transition:width 320ms ease}}
.progtxt{{font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:700;color:var(--ink-muted);white-space:nowrap}}

/* tables get a quiet zebra and a coloured caption on screen */
tbody tr:nth-child(even) td{{background:var(--off-white)}}
.sec[data-t="physio"] caption{{color:var(--t-physio)}}
.sec[data-t="patho"] caption{{color:var(--t-patho)}}
.sec[data-t="questions"] caption{{color:var(--t-questions)}}
ul.def li strong:first-child{{color:var(--t-patho)}}
.sec[data-t="physio"] ul.def li strong:first-child{{color:var(--t-physio)}}
.sec[data-t="practice"] ul.def li strong:first-child{{color:var(--t-practice)}}
.mem{{background:var(--t-questions-soft)}}
.clin{{background:var(--t-patho-soft)}}
.q .mem{{background:var(--t-questions-soft)}}

/* ---- numbered steps, citations, references ---- */
ol.steps{{list-style:none;counter-reset:st;margin:0 0 18px}}
ol.steps li{{counter-increment:st;position:relative;padding:9px 0 9px 40px;margin-bottom:4px}}
ol.steps li::before{{content:counter(st);position:absolute;left:0;top:9px;width:25px;height:25px;border-radius:99px;
  background:var(--navy);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:800;
  display:flex;align-items:center;justify-content:center;line-height:1}}
.sec[data-t="physio"] ol.steps li::before{{background:var(--t-physio)}}
.sec[data-t="patho"] ol.steps li::before{{background:var(--t-patho)}}
.sec[data-t="questions"] ol.steps li::before{{background:var(--t-questions)}}
ol.steps.tight li{{padding:4px 0 4px 40px;margin-bottom:0}}
ol.steps.tight li::before{{top:4px}}
.ti{{font-style:normal;font-weight:600}}
sup.cite{{font-size:10.5px;font-weight:700;vertical-align:super;line-height:0;margin-left:2px}}
sup.cite a{{color:var(--t-physio);text-decoration:none;padding:0 1px}}
sup.cite a:hover{{text-decoration:underline}}
.srclist{{list-style:none;counter-reset:none;font-size:14.5px;color:var(--ink-soft)}}
.srclist li{{padding:7px 0;border-bottom:1px solid var(--rule-soft)}}
.srclist li:last-child{{border-bottom:0}}
.srclist a{{color:var(--ink-soft);text-decoration:none}}
.srclist a:hover{{color:var(--t-physio)}}
.refs{{margin-top:56px}}
.refs ol{{list-style:none;counter-reset:rf}}
.refs li{{counter-increment:rf;position:relative;padding:11px 0 11px 34px;border-bottom:1px solid var(--rule-soft);font-size:15px}}
.refs li:last-child{{border-bottom:0}}
.refs li::before{{content:counter(rf) ".";position:absolute;left:0;top:11px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;color:var(--t-physio)}}
.refs li a.doi{{display:block;font-size:13px;color:var(--t-physio);word-break:break-all;margin-top:3px}}
.refs li:target{{background:var(--navy-tint)}}

.hit{{display:none}}
body[data-filter="on"] .sec:not(.hit){{display:none}}
body[data-filter="on"] .secnav,body[data-filter="on"] .chd .qr{{display:none}}
footer{{margin-top:60px;padding-top:20px;font-size:13.5px;color:var(--ink-muted)}}
@media(prefers-reduced-motion:reduce){{*{{transition-duration:1ms !important;animation-duration:1ms !important}}}}
@media(max-width:640px){{.chd{{flex-direction:column}} .qr{{align-self:flex-start}}}}

@media print{{
  @page{{size:letter;margin:0.62in}}
  /* printer friendly: no filled blocks, no zebra, hairline rules, black text */
  *{{color:#111 !important;background:#fff !important;box-shadow:none !important}}
  body{{font-size:10.5pt;line-height:1.48}}
  th{{color:#111 !important;border-bottom:1.2pt solid #111;font-size:8.5pt}}
  tbody th{{border-bottom:0.5pt solid #999}}
  td{{border-bottom:0.5pt solid #BBB}}
  tbody tr:nth-child(even) td{{background:#fff !important}}
  caption{{color:#444 !important}}
  .chip{{border:0;padding:0;font-size:8pt;letter-spacing:.1em;color:#555 !important}}
  .chip::before{{content:"["}} .chip::after{{content:"]"}}
  .mem,.clin{{border:0.7pt solid #999;border-radius:0;padding:9pt 11pt}}
  .q{{border:0.7pt solid #999;border-radius:0}}
  .optbtn{{border:0.6pt solid #AAA;border-radius:0}}
  .opt[data-k="right"] .optbtn{{border:1.4pt solid #111}}
  ul.def li{{border:0;border-radius:0;padding:4pt 0 4pt 0}}
  .prog,.progbar{{display:none}}
  ol.steps li::before{{background:#fff !important;color:#111 !important;border:0.8pt solid #111;
    width:15pt;height:15pt;font-size:8pt;top:7pt}}
  ol.steps li{{padding-left:24pt}}
  sup.cite a{{color:#111 !important}}
  .refs li::before{{color:#111 !important}}
  .refs li a.doi{{color:#444 !important;font-size:8pt}}
  .refs{{page-break-before:always}}
  .qr img{{border:0.5pt solid #999}}
  .wrap{{max-width:none;padding:0}}
  .skip,.controls,.searchnote,.donerow,.chev,.secnav{{display:none !important}}
  .sec .secbody{{display:block !important;padding:0}}
  .sectog{{display:block !important;padding:13pt 0 3pt;pointer-events:none}}
  .sectog .chev,.sectog .mins{{display:none !important}}
  .sectitle{{display:inline;font-size:13pt;font-weight:800}}
  .sectog .chip{{display:inline;margin-left:9pt;vertical-align:1.5pt}}
  .sech{{page-break-after:avoid}}
  .sec{{border:0;box-shadow:none;background:#fff;margin-bottom:6px;border-radius:0}}
  .sec[data-state="done"]{{background:#fff}}
  .sectitle{{font-size:14pt}}
  .mins{{display:none}}
  .chapter{{page-break-before:always}}
  .chapter:first-of-type{{page-break-before:avoid}}
  .q,.mem,.clin,table,.chd,ul.def li{{page-break-inside:avoid}}
  .just{{display:block !important;padding:10px 12px 2px 46px}}
  .opt[data-k="right"] .mark::after{{content:"\\2713  correct";font-size:8pt}}
  .opt[data-k="wrong"] .mark::after{{content:"\\2715";font-size:9pt}}
  .mark{{width:auto;white-space:nowrap}}
  .optbtn{{grid-template-columns:24px 1fr auto}}
  a{{text-decoration:none;color:var(--ink)}}
  .qr img{{width:84px;height:84px}}
}}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
<div class="wrap">
<header>
  <p class="eyebrow">ECG &amp; CVRN Review Course &middot; MedMasters Collaborative</p>
  <h1>CVRN Study Notes</h1>
  <p class="lede">Basic science through advanced clinical practice. Every chapter runs the same route: the physiology first, then what changes in disease, then what it looks like at the bedside, then the guideline pathway stated explicitly, then questions where every option is explained, the wrong ones included.</p>
  <p class="lede">The page opens as an outline. Nothing is hidden or locked, every section is one click away and Open everything is always available. Sections carry a time estimate so you can pick what fits the time you actually have.</p>
  <p class="byline">Prepared by Dr. Sharilyn Rennie &middot; Volume 1 &middot; {total_min} minutes of reading &middot; August 2026</p>
</header>

<div class="controls">
  <label for="find">Find</label>
  <input type="search" id="find" placeholder="Search every section" aria-describedby="findnote">
  <button class="btn solid" id="openAll" type="button">Open everything</button>
  <button class="btn" id="closeAll" type="button">Close everything</button>
  <button class="btn" id="printBtn" type="button">Printable version</button>
</div>
<p class="searchnote" id="findnote" aria-live="polite">Search filters sections by their text. Printing gives the complete document with every section open and every rationale shown.</p>

<nav class="toc" aria-label="Contents">
  <h2>Contents</h2>
  <ul>{''.join(toc)}
    <li><a href="#references"><span class="n">R</span><span class="t">References<span class="sub">Textbooks and current clinical practice guidelines</span></span><span class="meta"><span class="badge alt">{len(REFS)} sources</span></span></a></li>
  </ul>
</nav>

<main id="main">
{''.join(chapters_html)}
</main>

<section class="refs" id="references">
  <h2 style="font-size:26px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px">References</h2>
  <p class="lede" style="margin-bottom:18px">Physiology and anatomy from current standard texts; clinical management from the most recent published guideline in each area. Guideline year is stated so a superseded version is obvious at a glance.</p>
  <ol>{refs_html}</ol>
</section>

<footer>
  <p>CVRN Study Notes, Volume 1. Prepared by Dr. Sharilyn Rennie for the ECG &amp; CVRN Review Course, MedMasters Collaborative. Teaching material for certification preparation, not a clinical protocol.</p>
</footer>
</div>
<script>
(function(){{
  var KEY='cvrn-notes-read';
  function load(){{ try{{ return JSON.parse(localStorage.getItem(KEY)||'{{}}'); }}catch(e){{ return {{}}; }} }}
  function save(v){{ try{{ localStorage.setItem(KEY, JSON.stringify(v)); }}catch(e){{}} }}
  var read = load();

  function setState(sec){{
    var open = sec.querySelector('.sectog').getAttribute('aria-expanded')==='true';
    sec.setAttribute('data-state', read[sec.id] ? 'done' : (open ? 'now' : 'pending'));
  }}
  function updateProgress(){{
    document.querySelectorAll('.prog').forEach(function(p){{
      var ch = document.getElementById(p.getAttribute('data-for'));
      if(!ch) return;
      var secs = ch.querySelectorAll('.sec'), done = ch.querySelectorAll('.sec[data-state="done"]');
      var pct = secs.length ? Math.round(done.length/secs.length*100) : 0;
      p.querySelector('.progbar i').style.width = pct+'%';
      p.querySelector('.progtxt').textContent = done.length+' of '+secs.length+' sections read';
    }});
  }}
  document.querySelectorAll('.sec').forEach(function(sec){{
    var tog = sec.querySelector('.sectog');
    var done = sec.querySelector('.donebtn');
    if(read[sec.id]) done.setAttribute('aria-pressed','true');
    setState(sec);
    tog.addEventListener('click', function(){{
      var open = tog.getAttribute('aria-expanded')==='true';
      tog.setAttribute('aria-expanded', open?'false':'true');
      sec.setAttribute('data-open', open?'0':'1');
      setState(sec);
    }});
    done.addEventListener('click', function(){{
      var was = done.getAttribute('aria-pressed')==='true';
      done.setAttribute('aria-pressed', was?'false':'true');
      done.textContent = was ? 'Mark this section read' : 'Read';
      if(was) delete read[sec.id]; else read[sec.id]=1;
      save(read); setState(sec); updateProgress();
    }});
    if(read[sec.id]) done.textContent='Read';
  }});

  updateProgress();

  document.querySelectorAll('.optbtn').forEach(function(b){{
    b.addEventListener('click', function(){{
      b.setAttribute('aria-expanded', b.getAttribute('aria-expanded')==='true'?'false':'true');
    }});
  }});

  function allTogs(v){{
    document.querySelectorAll('.sec').forEach(function(sec){{
      sec.querySelector('.sectog').setAttribute('aria-expanded', v?'true':'false');
      sec.setAttribute('data-open', v?'1':'0');
      setState(sec);
    }});
  }}
  document.getElementById('openAll').addEventListener('click', function(){{ allTogs(true); }});
  document.getElementById('closeAll').addEventListener('click', function(){{ allTogs(false); }});
  document.getElementById('printBtn').addEventListener('click', function(){{ window.print(); }});

  var find=document.getElementById('find'), note=document.getElementById('findnote');
  find.addEventListener('input', function(){{
    var q=find.value.trim().toLowerCase();
    if(!q){{ document.body.removeAttribute('data-filter');
      document.querySelectorAll('.sec').forEach(function(s){{ s.classList.remove('hit'); }});
      note.textContent='Search filters sections by their text. Printing gives the complete document with every section open and every rationale shown.'; return; }}
    var n=0;
    document.querySelectorAll('.sec').forEach(function(sec){{
      var hit = sec.textContent.toLowerCase().indexOf(q)>-1;
      sec.classList.toggle('hit', hit);
      if(hit){{ n++; sec.querySelector('.sectog').setAttribute('aria-expanded','true'); sec.setAttribute('data-open','1'); setState(sec); }}
    }});
    document.body.setAttribute('data-filter','on');
    note.textContent = n + (n===1?' section matches ':' sections match ') + '"' + find.value.trim() + '". Clear the box to see everything again.';
  }});

  function sendHeight(){{ try{{ window.parent.postMessage({{id:'cvrn-study-notes',height:document.documentElement.scrollHeight}},'*'); }}catch(e){{}} }}
  if(window.ResizeObserver) new ResizeObserver(sendHeight).observe(document.body);
  window.addEventListener('load',sendHeight); window.addEventListener('resize',sendHeight);
}})();
</script>
</body>
</html>"""

open("study-notes.html","w").write(HTML)
print("study-notes.html written,", len(HTML), "bytes,", len(CH), "chapters,", total_min, "min")
