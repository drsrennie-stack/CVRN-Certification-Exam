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

CH = []

# ================= CHAPTER 1 =================
CH.append(dict(id="D2", num="1", title="Conduction and the Basic ECG",
  weight="L1 14% · L2 8%", sub="From ion channel to rhythm strip",
  body=f"""
<h3>Start with the physiology</h3>
<p>Every rhythm you will ever name is a story about three things: where the impulse started, how it travelled, and how long each step took. Get those three questions in your head and rhythm interpretation stops being pattern matching and becomes reasoning.</p>

<p><strong>Automaticity.</strong> Some cardiac cells leak sodium and calcium inward during diastole, so their membrane potential drifts upward on its own until it reaches threshold and fires. That drift is the funny current, and it is why the heart does not need a nerve to beat. The cells that drift fastest set the rate, which is why the sinoatrial node normally wins.</p>

<div class="rates">
  <table>
    <caption>Intrinsic rates, fastest wins</caption>
    <thead><tr><th>Pacemaker</th><th>Intrinsic rate</th><th>What you see if it takes over</th></tr></thead>
    <tbody>
      <tr><td>SA node</td><td>60 to 100</td><td>Normal sinus rhythm, upright P before every QRS</td></tr>
      <tr><td>Atrial foci</td><td>60 to 80</td><td>Odd-looking or inverted P waves, narrow QRS</td></tr>
      <tr><td>AV junction</td><td>40 to 60</td><td>Narrow QRS, P absent, inverted, or after the QRS</td></tr>
      <tr><td>Purkinje / ventricle</td><td>20 to 40</td><td>Wide QRS, no related P, slow and unreliable</td></tr>
    </tbody>
  </table>
</div>

<p><strong>Conduction and delay.</strong> The impulse leaves the SA node, crosses the atria, and hits the AV node, which deliberately slows it down. That delay is the whole point: it lets the atria finish emptying before the ventricles contract. It is also what the PR interval measures. Below the AV node, the His bundle, bundle branches, and Purkinje fibres are built for speed, which is why a normal QRS is narrow. Anything that forces the impulse to travel muscle-to-muscle instead of through that highway makes the QRS wide, and a wide QRS is always telling you the ventricles were activated abnormally.</p>

<h3>What each part of the tracing represents</h3>
<ul class="def">
  <li><strong>P wave.</strong> Atrial depolarisation. Present and upright in lead II means the impulse started at or near the SA node and travelled downward.</li>
  <li><strong>PR interval.</strong> Onset of P to onset of QRS. Mostly AV nodal delay. Normal 120 to 200 ms, which is three to five small boxes.</li>
  <li><strong>QRS complex.</strong> Ventricular depolarisation. Normal is under 120 ms. Wide means the ventricles were activated outside the normal conduction system, by a bundle branch block, a ventricular focus, a pacemaker, or a metabolic insult.</li>
  <li><strong>ST segment.</strong> The plateau. Should sit level with the baseline. Elevation or depression here is the ischaemia question.</li>
  <li><strong>T wave.</strong> Ventricular repolarisation. Tall and peaked suggests potassium; inverted suggests ischaemia, strain, or a bundle branch block doing what it is supposed to do.</li>
  <li><strong>QT interval.</strong> Total ventricular electrical activity. It shortens as the rate rises, which is why it is corrected. A long QTc is the substrate for torsades.</li>
</ul>

<div class="mem"><strong>Memory tool: the five questions, in order</strong>
<p><strong>Rate. Regularity. P waves. PR. QRS width.</strong> Ask them in that order on every strip, every time, and never jump to the name first. Most misreads happen because someone recognised a shape and stopped asking. A phrase like Really Rotten Patients Puke Quietly helps some people, but the order matters far more than the mnemonic.</p></div>

<h3>Measurement that holds up</h3>
<p>At 25 mm per second, one small box is 40 ms and one large box is 200 ms. Rate on a regular rhythm is 300 divided by the number of large boxes between R waves, or 1500 divided by small boxes. On an irregular rhythm neither shortcut works: count the complexes in a six second strip and multiply by ten, or use calipers over several cycles and take the mean. QTc by Bazett is QT divided by the square root of the R to R interval in seconds; over about 500 ms is where torsades risk climbs steeply.</p>

<h3>AV block, reasoned rather than memorised</h3>
<p>All three degrees are answering one question: is every atrial impulse getting through, and is the delay fixed?</p>
<ul class="def">
  <li><strong>First degree.</strong> Every P conducts, but slowly. PR over 200 ms and constant. A delay, not a block, despite the name.</li>
  <li><strong>Second degree, Mobitz I.</strong> The AV node fatigues progressively. PR lengthens beat to beat until one P fails to conduct, then the cycle resets. Usually nodal, usually benign, usually responds to atropine.</li>
  <li><strong>Second degree, Mobitz II.</strong> PR is constant and then a beat simply drops with no warning. The lesion is below the node, so the escape beneath it is unreliable. This is the one that progresses to complete block, and it is the one that needs pacing readiness rather than observation.</li>
  <li><strong>Third degree.</strong> Nothing conducts. P waves march at their own rate, QRS complexes march at a slower rate, and the two have no relationship. That dissociation is the finding. The slow rate is the consequence.</li>
</ul>

<div class="mem"><strong>Memory tool: block by behaviour</strong>
<p><strong>Long, longer, longer, drop, now you have a Wenckebach.</strong> <strong>If some Ps do not get through, then you have Mobitz II.</strong> <strong>If Ps and Qs do not agree, then you have third degree.</strong> The rhyme is doing one job: forcing you to look at the PR interval across several beats instead of at a single complex.</p></div>

<div class="clin"><strong>At the bedside</strong>
<p>Treat the patient, not the tracing. A rate of 38 in a conditioned athlete who is asymptomatic is a finding. A rate of 52 in a patient who is grey, hypotensive, and confused is an emergency. The decision hinge for every bradycardia is the same: is there evidence of poor perfusion, and if so, atropine while transcutaneous pacing is being set up, not atropine and then wait to be disappointed. In high grade block the escape is below the AV node and atropine often does nothing, which is exactly why the pads go on at the same time.</p></div>

<h3>Test yourself</h3>
""" + mcq("d2q1",
  "A monitored patient has a heart rate of 44. The PR interval measures 0.16 seconds and is identical on every conducted beat, and every third P wave is not followed by a QRS. The patient is diaphoretic with a blood pressure of 78 over 44. What is the priority action?",
  [("Continue observation and recheck the rhythm in 15 minutes",
    "This is the trap answer for anyone who anchored on the heart rate alone. The patient is diaphoretic and hypotensive, which is symptomatic bradycardia by definition. Observation is only defensible when perfusion is intact."),
   ("Give atropine and prepare for transcutaneous pacing simultaneously",
    "Correct. A constant PR with intermittently dropped beats is Mobitz II, an infranodal block. Atropine is reasonable to try, but because the lesion sits below the AV node it frequently fails, so pacing readiness happens at the same time rather than after atropine disappoints. The patient's perfusion is the reason this cannot wait."),
   ("Administer adenosine to slow conduction and reveal the underlying rhythm",
    "Adenosine blocks the AV node. In a patient who is already failing to conduct through the AV node and is hypotensive, this can produce prolonged asystole. Adenosine is a tool for regular narrow complex tachycardia, not for bradycardia."),
   ("Give a 500 mL fluid bolus and reassess",
    "Volume is a reasonable reflex for hypotension, but this hypotension is rate related, not volume related. Fluid alone will not correct a ventricular rate of 44, and it delays the intervention that will.")],
  1,
  "Two things are being tested at once: recognising Mobitz II by the constant PR with dropped beats, and knowing that the level of the block determines whether atropine can be relied on. Candidates who recognise the rhythm but treat it like Mobitz I still lose the point.",
  "Constant PR plus a dropped beat equals <strong>M</strong>obitz II equals <strong>M</strong>ake ready to pace. Both start with M.")
  + mcq("d2q2",
  "A patient's rhythm strip shows a QRS duration of 0.16 seconds with no identifiable P waves and a regular rate of 38. Which conclusion is best supported?",
  [("The impulse is arising from the SA node with a conduction delay",
    "A sinus origin produces P waves. Their complete absence rules out an SA origin here, and a sinus mechanism at 38 with a wide QRS would still show P activity somewhere on the strip."),
   ("The impulse is arising from a junctional focus",
    "A junctional focus sits above the ventricles, so it uses the normal His-Purkinje highway and produces a narrow QRS at 40 to 60. The 0.16 second width is the finding that excludes it."),
   ("The impulse is arising from a ventricular focus below the bundle branches",
    "Correct. A wide QRS means the ventricles were activated outside the fast conduction system, and a rate in the 20 to 40 range matches the intrinsic ventricular escape rate. Together they place the pacemaker in the Purkinje network or ventricular myocardium. This is an escape rhythm, so the treatment thought is to support it, never to suppress it."),
   ("This represents atrial flutter with variable conduction",
    "Flutter produces sawtooth atrial activity at roughly 300 per minute and a ventricular response that is a division of that rate. Neither the atrial activity nor the rate relationship is present.")],
  2,
  "Width tells you where, rate tells you which backup. Reading them together locates the pacemaker without needing to memorise a list of rhythm names. The clinical consequence matters more than the label: an escape rhythm is the only thing keeping this patient perfused, so suppressing the ectopy would be fatal.",
  "<strong>Wide equals below.</strong> Narrow means the impulse used the highway, so it came from at or above the junction. Wide means it went cross country, so it started in the ventricle or the highway is blocked.")
))

# ================= CHAPTER 2 =================
CH.append(dict(id="D3", num="2", title="Coronary Artery Disease and Acute Coronary Syndrome",
  weight="L1 22% · L2 14%", sub="Supply, demand, and the moment the plaque breaks",
  body=f"""
<h3>Start with the physiology</h3>
<p>Myocardium is an obligate aerobic tissue. It extracts roughly 70 to 80 percent of the oxygen delivered to it at rest, which is far more than any other tissue and leaves almost no extraction reserve. When demand rises, the heart cannot simply pull more oxygen out of the blood it already has. It has to get more blood. That is why coronary flow, not oxygen extraction, is the whole ballgame in cardiac ischaemia.</p>

<p><strong>When does the heart actually perfuse?</strong> During diastole. Systolic contraction compresses the intramyocardial vessels, especially in the subendocardium of the left ventricle. Two consequences fall directly out of that fact and both are tested. Tachycardia shortens diastole more than systole, so it cuts perfusion time exactly when demand is highest. And the subendocardium is the last layer to be perfused and the first to be injured, which is why ischaemia without full thickness injury produces ST depression rather than elevation.</p>

<div class="mem"><strong>Memory tool: the demand side</strong>
<p>Myocardial oxygen demand is set by <strong>heart rate, contractility, and wall tension</strong>. Wall tension is preload and afterload. Every antianginal drug you will ever be asked about lowers at least one of those three. Beta blockers lower rate and contractility. Nitrates lower preload. Antihypertensives lower afterload. If you can name which of the three a drug touches, you can reason out its role without memorising indications.</p></div>

<h3>From stable plaque to acute event</h3>
<p>A stable plaque narrows the lumen. Flow is adequate at rest and inadequate on exertion, which produces predictable, exertional, reproducible angina relieved by rest. Nothing about that is acute.</p>
<p>The acute syndromes begin when a plaque ruptures or erodes and exposes thrombogenic material to flowing blood. Platelets adhere, aggregate, and a thrombus forms. What happens next depends entirely on whether the thrombus occludes the vessel completely.</p>

<table class="cmp">
  <caption>The acute coronary syndrome spectrum</caption>
  <thead><tr><th></th><th>Unstable angina</th><th>NSTEMI</th><th>STEMI</th></tr></thead>
  <tbody>
    <tr><th>Occlusion</th><td>Partial</td><td>Partial or transient</td><td>Complete</td></tr>
    <tr><th>ECG</th><td>Normal, or ST depression, or T inversion</td><td>Normal, or ST depression, or T inversion</td><td>ST elevation or new LBBB</td></tr>
    <tr><th>Troponin</th><td>Not elevated</td><td>Elevated</td><td>Elevated</td></tr>
    <tr><th>Necrosis</th><td>None yet</td><td>Subendocardial</td><td>Transmural</td></tr>
    <tr><th>Priority</th><td>Antithrombotic, risk stratify</td><td>Antithrombotic, early invasive strategy</td><td>Reperfusion now</td></tr>
  </tbody>
</table>

<p>Notice what separates unstable angina from NSTEMI: nothing except the troponin. They can present identically. That is why the biomarker is drawn rather than guessed at, and why a single value at presentation is rarely enough.</p>

<h3>Biomarkers, read as a trend</h3>
<p>High sensitivity troponin detects very small amounts of myocardial injury, which makes it excellent at ruling out and poor at ruling in. Plenty of things injure myocardium without an occluded coronary: sepsis, pulmonary embolism, myocarditis, renal failure, tachyarrhythmia, heart failure. What distinguishes acute coronary occlusion is the <strong>delta</strong>, the rise or fall across serial draws. A stably elevated troponin in a patient with chronic kidney disease is chronic myocardial injury. A value that climbs meaningfully over one to three hours is acute.</p>

<div class="clin"><strong>The guideline pathway, stated explicitly</strong>
<p>This is the part working nurses apply daily without ever having studied it as a pathway, and it is heavily tested. For STEMI, the target is first medical contact to device within 90 minutes at a PCI capable centre, or within 120 minutes if transfer is required. If the anticipated time exceeds 120 minutes, fibrinolysis is given within 30 minutes of arrival provided there is no contraindication, and the patient is transferred afterward. The decision is made on anticipated time, not on preference for a route.</p>
<p>Absolute contraindications to fibrinolysis worth knowing cold: any prior intracranial haemorrhage, known cerebral vascular lesion or malignant intracranial neoplasm, ischaemic stroke within three months, suspected aortic dissection, active bleeding or bleeding diathesis, and significant closed head trauma within three months.</p></div>

<h3>The complications that kill after the infarct</h3>
<p>Reperfusion is not the end of the story. Days two through seven after a large infarct are when mechanical complications appear, and they present as sudden decompensation in a patient who was stable.</p>
<ul class="def">
  <li><strong>Papillary muscle rupture.</strong> Sudden dyspnoea, a new loud holosystolic murmur, flash pulmonary oedema. Acute mitral regurgitation with no time for the atrium to adapt.</li>
  <li><strong>Ventricular septal rupture.</strong> New harsh holosystolic murmur with a thrill, biventricular failure, an oxygen step up on right heart catheterisation.</li>
  <li><strong>Free wall rupture.</strong> Sudden pulseless electrical activity from tamponade. Usually catastrophic.</li>
  <li><strong>Cardiogenic shock.</strong> Most often from a large anterior infarct. Low output with high filling pressures.</li>
</ul>

<div class="mem"><strong>Memory tool: new murmur after MI is never nothing</strong>
<p>A murmur that was not there yesterday, in a patient who infarcted two to five days ago, is a mechanical complication until proven otherwise. Do not attribute it to anxiety, position, or a better listening environment.</p></div>

<h3>Test yourself</h3>
""" + mcq("d3q1",
  "A patient with a large anterior STEMI is on day three of admission. He suddenly develops severe dyspnoea, a new loud holosystolic murmur at the apex, and a blood pressure of 82 over 50. Which explanation best fits?",
  [("Reinfarction of the anterior wall",
    "Reinfarction would present with recurrent chest pain and new ECG changes, and it does not by itself generate a new holosystolic murmur. The murmur is the finding that redirects you away from this answer."),
   ("Papillary muscle rupture causing acute mitral regurgitation",
    "Correct. The timing is classic, day two to seven post infarct, and the combination of a new holosystolic murmur with abrupt haemodynamic collapse is the signature. Because the left atrium has had no time to dilate and become compliant, the regurgitant volume transmits straight back into the pulmonary circulation, which is why this presents as flash pulmonary oedema and shock rather than gradual failure."),
   ("Acute pericarditis",
    "Pericarditis after infarct is real and does occur in this window, but it produces a friction rub rather than a holosystolic murmur, and it causes positional chest pain rather than sudden hypotension and pulmonary oedema."),
   ("Anxiety related hyperventilation",
    "This attributes objective findings, a new murmur and hypotension, to a subjective cause. Hyperventilation does not create a murmur or drop the blood pressure to 82 systolic.")],
  1,
  "Timing plus a new murmur plus haemodynamic collapse is the pattern. The reason acute regurgitation behaves so differently from chronic regurgitation is compliance: the chronic atrium has remodelled and can accommodate the volume at low pressure, and the acute atrium has not.",
  "<strong>Day two to seven, new murmur, sudden crash.</strong> Think mechanical, not medical.")
))

# ================= CHAPTER 3 =================
CH.append(dict(id="D6", num="3", title="Heart Failure",
  weight="L1 20% · L2 13%", sub="Compensation that becomes the disease",
  body=f"""
<h3>Start with the physiology</h3>
<p>Cardiac output is stroke volume times heart rate, and stroke volume is set by preload, afterload, and contractility. Heart failure is what happens when the heart cannot deliver an output adequate to metabolic demand at normal filling pressures. Read that definition carefully: it contains both halves of the syndrome. A patient can be in failure because output is low, or because output is only maintained by filling pressures high enough to congest the lungs, or both.</p>

<p><strong>The Frank-Starling relationship.</strong> Stretching a healthy sarcomere improves the overlap of actin and myosin and increases the force of the next contraction, up to a point. In the failing ventricle that curve is flattened and shifted right, so a given increase in filling volume yields far less extra output and a great deal more pressure. This single fact explains why volume loading a failing heart congests it rather than helping it.</p>

<h3>The compensations, and why they turn on the patient</h3>
<p>When output falls, the body responds as though the problem is blood loss, because those are the only reflexes it has.</p>
<ul class="def">
  <li><strong>Sympathetic activation.</strong> Raises rate and contractility, and constricts arterioles. Short term this defends blood pressure. Long term it raises myocardial oxygen demand, shortens diastolic filling, raises afterload against a ventricle that cannot overcome it, and is directly toxic to myocytes.</li>
  <li><strong>Renin angiotensin aldosterone activation.</strong> Reduced renal perfusion triggers renin. Angiotensin II constricts and aldosterone retains sodium and water. Short term this restores volume and pressure. Long term it adds preload and afterload to a failing pump and drives fibrosis.</li>
  <li><strong>Remodelling.</strong> Under sustained neurohormonal stimulation the ventricle dilates and hypertrophies into a shape that is mechanically worse. This is the process that turns an injury into a progressive disease.</li>
</ul>

<div class="mem"><strong>Memory tool: why the drugs look counterintuitive</strong>
<p>The four pillars of therapy all <em>oppose</em> compensation. That is why we give a beta blocker to a heart that is failing and an afterload reducer to a patient whose pressure is already soft. You are not supporting the pump, you are interrupting the neurohormonal cascade that is destroying it. Once that clicks, the whole pharmacology chapter stops feeling arbitrary.</p></div>

<h3>The four pillars</h3>
<table class="cmp">
  <caption>Guideline directed medical therapy for reduced ejection fraction</caption>
  <thead><tr><th>Pillar</th><th>What it interrupts</th><th>Watch</th></tr></thead>
  <tbody>
    <tr><th>ARNI, or ACE inhibitor or ARB</th><td>RAAS, plus preserved natriuretic peptides</td><td>Potassium, creatinine, blood pressure, angioedema. 36 hour washout from an ACE inhibitor before an ARNI.</td></tr>
    <tr><th>Beta blocker</th><td>Sympathetic activation and remodelling</td><td>Start low, go slow, never start during acute decompensation. Rate, blood pressure.</td></tr>
    <tr><th>Mineralocorticoid receptor antagonist</th><td>Aldosterone driven fibrosis and sodium retention</td><td>Potassium and renal function. This is the pillar most often responsible for hyperkalaemia.</td></tr>
    <tr><th>SGLT2 inhibitor</th><td>Multiple, including natriuresis and metabolic effects</td><td>Volume status, genital mycotic infection, euglycaemic ketoacidosis. Benefit is independent of diabetes.</td></tr>
  </tbody>
</table>

<p>A modest rise in creatinine after starting an ACE inhibitor, ARNI, or MRA is expected haemodynamics, not injury, and is not by itself a reason to abandon therapy. The instinct to stop everything when a number moves is the most common way patients lose the drugs that would have kept them alive.</p>

<h3>Reading volume and perfusion at the bedside</h3>
<p>Two questions, four answers, and the four answers each have a different treatment. Is the patient congested, wet or dry? Is the patient perfusing, warm or cold?</p>

<table class="cmp">
  <caption>The four profiles</caption>
  <thead><tr><th></th><th>Dry</th><th>Wet</th></tr></thead>
  <tbody>
    <tr><th>Warm</th><td>Compensated. Continue therapy.</td><td>Congested but perfusing. Diurese.</td></tr>
    <tr><th>Cold</th><td>Underfilled or overdiuresed. Cautious volume.</td><td>Congested and hypoperfusing. Highest risk. Decongest and consider inotropic support.</td></tr>
  </tbody>
</table>

<div class="clin"><strong>At the bedside</strong>
<p>Cold and wet is the profile that punishes reflexes. The crackles pull you toward aggressive diuresis, and the low output means aggressive diuresis may drop perfusion further. Narrow pulse pressure, cool extremities, mental status change, and a rising creatinine are the findings that tell you the patient is cold, not simply wet.</p></div>

<h3>Self care, and why it is a clinical intervention</h3>
<p>Readmission after a heart failure admission is driven less by the pathophysiology than by what happens in the first fourteen days at home. The teaching that works is specific and actionable rather than general.</p>
<ul class="def">
  <li>Weigh daily, on waking, after voiding, in similar clothing. The trend matters more than the number, which is why the conditions have to be constant.</li>
  <li>Call for a gain of two to three pounds in a day or five in a week. A threshold turns a measurement into an action.</li>
  <li>Sodium guidance the patient can act on: read labels, cook without the shaker, and know that restaurant and packaged food, not the salt shaker, carries most of the load.</li>
  <li>Know which symptoms mean call today and which mean go now.</li>
</ul>

<h3>Test yourself</h3>
""" + mcq("d6q1",
  "A patient admitted with decompensated heart failure has crackles to the mid lung fields, jugular venous distension, cool extremities, a narrow pulse pressure, and a creatinine that has risen from 1.1 to 1.7. Which management approach is most appropriate?",
  [("Aggressive intravenous diuresis alone",
    "This treats the congestion and ignores the perfusion. The cool extremities, narrow pulse pressure, and rising creatinine say this patient is hypoperfusing, and diuresis alone in a cold and wet profile can drop output further and worsen renal function."),
   ("Decongestion together with consideration of inotropic support",
    "Correct. This is the cold and wet profile, the highest risk of the four. Congestion has to be addressed, but perfusion must be supported at the same time, which is why inotropic support enters the conversation here and not in the warm and wet patient."),
   ("Intravenous fluid resuscitation to improve renal perfusion",
    "The rising creatinine invites this, but the patient has crackles and jugular venous distension. The kidneys are underperfused because of low forward output and venous congestion, not because of hypovolaemia. Volume would worsen both."),
   ("Hold all guideline directed therapy and observe",
    "Withdrawing therapy is sometimes necessary in acute decompensation, particularly beta blockade in the setting of low output, but doing nothing while the patient is congested and hypoperfusing is not a management plan.")],
  1,
  "The four profile framework exists precisely to prevent the reflex in option A. Two independent questions, congestion and perfusion, must both be answered before the plan is made. Renal function that worsens during decongestion is often venous congestion rather than volume depletion, which is the opposite of what the number suggests.",
  "<strong>Warm and wet, dry them out. Cold and wet, dry them out and push them along.</strong> Cold means the forward flow is the problem, and forward flow needs support, not just fluid removal.")
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
  <ul>{''.join(toc)}</ul>
</nav>

<main id="main">
{''.join(chapters_html)}
</main>

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
