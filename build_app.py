#!/usr/bin/env python3
"""Merge the three CVRN tools into one self-contained index.html with a card selector."""
import re, os

TOOLS = [
    dict(key="os",    file="cvrn-mastery-os.html", title="Mastery OS",
         desc="Your plan, your weak spots, today&rsquo;s work.", colour="gold"),
    dict(key="ecg",   file="ecg-lab.html",         title="ECG Lab",
         desc="Live monitor, 12-leads, freeze and measure.", colour="terra"),
    dict(key="notes", file="study-notes.html",     title="Study Notes",
         desc="Physiology to bedside, with sources.", colour="navy"),
    dict(key="dash",  file="cvrn-dashboard.html",   title="Weakness Dashboard",
         desc="Where the exam will cost you points.", colour="deep"),
]

# ---------------------------------------------------------------- CSS scoping
def prefix_selector(sel, sc):
    out = []
    for p in [x.strip() for x in sel.split(",")]:
        if not p:
            continue
        if p in (":root", "html", "body", "*"):
            out.append(sc if p != "*" else sc + " *")
            continue
        m = re.match(r'^(html|body)(?![\w-])(.*)$', p, re.S)
        if m:
            root, rest = m.group(1) + "", m.group(2)
            # keep any attribute/pseudo qualifiers attached to html/body
            q = re.match(r'^((?:\[[^\]]*\]|:[\w-]+(?:\([^)]*\))?)*)\s*(.*)$', rest, re.S)
            quals, tail = q.group(1), q.group(2).strip()
            head = root + quals
            out.append(f"{head} {sc}" + (f" {tail}" if tail else ""))
            continue
        out.append(f"{sc} {p}")
    return ",".join(out)

def scope_css(css, sc):
    res, i, n = "", 0, len(css)
    while i < n:
        b = css.find("{", i)
        c = css.find("/*", i)
        # a comment that sits before the next selector is emitted verbatim,
        # otherwise its commas get treated as selector separators
        if c != -1 and (b == -1 or c < b):
            j = css.find("*/", c + 2)
            j = n if j < 0 else j + 2
            res += css[i:j]; i = j; continue
        if b < 0:
            res += css[i:]; break
        sel = css[i:b]
        depth, j = 1, b + 1
        while j < n and depth:
            if css[j] == "{": depth += 1
            elif css[j] == "}": depth -= 1
            j += 1
        body = css[b + 1:j - 1]
        selt = sel.strip()
        if selt.startswith("@"):
            at = selt.split("{")[0].split()[0].lower()
            if at in ("@media", "@supports", "@layer", "@container"):
                res += sel + "{" + scope_css(body, sc) + "}"
            else:                                  # keyframes, page, font-face
                res += sel + "{" + body + "}"
        else:
            res += prefix_selector(selt, sc) + "{" + body + "}"
        i = j
    return res

# ---------------------------------------------------------------- extraction
def extract(tool):
    s = open(tool["file"]).read()
    css = "\n".join(re.findall(r"<style>(.*?)</style>", s, re.S))
    body = re.search(r"<body[^>]*>(.*)</body>", s, re.S).group(1)

    # external scripts get hoisted and inlined once
    ext = re.findall(r'<script src="([^"]+)"[^>]*>\s*</script>', body)
    body = re.sub(r'<script src="[^"]+"[^>]*>\s*</script>', "", body)

    scripts = re.findall(r"<script>(.*?)</script>", body, re.S)
    body = re.sub(r"<script>.*?</script>", "", body, flags=re.S)

    # strip the pieces the shell now owns
    body = re.sub(r'<a class="skip"[^>]*>.*?</a>', "", body, flags=re.S)
    body = re.sub(r'<section class="tools".*?</section>', "", body, flags=re.S)
    # cross-tool links inside a merged body have to become hash routes
    for src, dst in (
        ('ecg-lab.html#p-pg',     '#/ecg/gap'),
        ('ecg-lab.html',          '#/ecg'),
        ('cvrn-mastery-os.html#p-gap', '#/os/gap'),
        ('cvrn-mastery-os.html',  '#/os'),
        ('study-notes.html',      '#/notes'),
        ('cvrn-dashboard.html',   '#/dash'),
    ):
        body = body.replace('href="%s"' % src, 'href="%s"' % dst)
    body = re.sub(r"<footer>.*?</footer>", "", body, flags=re.S)

    # unique the one colliding id
    body = body.replace('id="main"', 'id="main-%s"' % tool["key"])

    return dict(css=scope_css(css, "#view-" + tool["key"]), body=body.strip(),
                scripts=scripts, ext=ext)

parts = {t["key"]: extract(t) for t in TOOLS}

# shared data files, inlined once
shared = []
seen = set()
for t in TOOLS:
    for e in parts[t["key"]]["ext"]:
        if e not in seen and os.path.exists(e):
            seen.add(e)
            shared.append(open(e).read())

# ---------------------------------------------------------------- shell
ICONS = {
 "gold":  '<svg viewBox="0 0 24 24" fill="none" stroke="#101820" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5v15"/><path d="M12 6.5A3 3 0 0 0 6.6 8 2.7 2.7 0 0 0 5 12a2.7 2.7 0 0 0 1.6 4A3 3 0 0 0 12 17.5"/><path d="M12 6.5A3 3 0 0 1 17.4 8 2.7 2.7 0 0 1 19 12a2.7 2.7 0 0 1-1.6 4A3 3 0 0 1 12 17.5"/></svg>',
 "terra": '<svg viewBox="0 0 24 24" fill="none" stroke="#101820" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12h3l1.6-4 2.6 8.5L12.6 8l1.5 4h7.4"/></svg>',
 "navy":  '<svg viewBox="0 0 24 24" fill="none" stroke="#101820" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4.5h11.5L19 7v12.5H5z"/><path d="M8.5 9.5h7M8.5 13h7M8.5 16.5h4.5"/></svg>',
 "deep":  '<svg viewBox="0 0 24 24" fill="none" stroke="#04200E" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3"/></svg>',
 "deep2": '<svg viewBox="0 0 24 24" fill="none" stroke="#04200E" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3"/></svg>',
 "slate": '<svg viewBox="0 0 24 24" fill="none" stroke="#101820" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4.5h6a1 1 0 0 1 1 1V7H8V5.5a1 1 0 0 1 1-1z"/><path d="M8.8 12.4l1.9 1.9 3.9-3.9"/><path d="M9 17.5h6"/></svg>',
}

CARDS = [
 dict(route="dash",     colour="deep",  icon="deep",  title="Weakness Dashboard",
      desc="Readiness by blueprint weight, the mastery mix, and the queue.", meta="Where you stand"),
 dict(route="os",       colour="gold",  icon="gold",  title="Mastery OS",
      desc="Set your exam date. Get a pace, a plan, and today&rsquo;s work.", meta="Plan &middot; Dashboard"),
 dict(route="ecg",      colour="terra", icon="terra", title="ECG Lab",
      desc="Live monitor with freeze and calipers, plus twelve 12-lead patterns.", meta="Practice &middot; DOK 1 to 4"),
 dict(route="notes",    colour="navy",  icon="navy",  title="Study Notes",
      desc="Physiology through bedside management, referenced and printable.", meta="Read &middot; 50 min"),
 dict(route="os/gap",   colour="slate", icon="deep2", title="Written Gap Finder",
      desc="Multiple choice across all fourteen domains, weighted the way the exam is.", meta="Start here"),
 dict(route="ecg/gap",  colour="slate", icon="terra", title="Practical Gap Finder",
      desc="Worked off live tracings. Name it, measure it, localize it, decide.", meta="Start here"),
 dict(route="os/exams", colour="slate", icon="slate", title="Practice Exams",
      desc="Ten scored forms drawn from a reserved item pool.", meta="Score estimate"),
]

def card(c):
    return f'''      <a class="tcard" data-c="{c['colour']}" href="#/{c['route']}" data-route="{c['route']}">
        <span class="ic">{ICONS[c['icon']]}</span>
        <h3>{c['title']}</h3>
        <p>{c['desc']}</p>
        <span class="go">{c['meta']}</span>
      </a>'''

SHELL_CSS = """
/* ============================================================
   CVRN/OS shell. Dark by default; light mode uses a dark green
   accent (#166534, 7.13:1 on white) because the mid green was
   unreadable. Everything below the shell is scoped per view.
   ============================================================ */
:root{
  --s-bg:#F5F7F9; --s-panel:#FFFFFF; --s-panel2:#EDF1F4;
  --s-ink:#141C2D; --s-mute:#64708A; --s-soft:#B4C0D8; --s-line:#DCE2EA;
  --s-acc:#166534; --s-acc2:#15803D; --s-onacc:#FFFFFF;
  --s-blue:#0284C7; --s-amber:#B45309; --s-red:#B91C1C; --s-violet:#6D28D9;
  --s-card:0 1px 3px rgba(10,19,34,.08), 0 1px 2px rgba(10,19,34,.05);
  --s-lift:0 6px 16px rgba(10,19,34,.10), 0 3px 6px rgba(10,19,34,.06);
}
html[data-dark="on"]{
  --s-bg:#070B14; --s-panel:#0C1322; --s-panel2:#111A2E;
  --s-ink:#E8EDF8; --s-mute:#7E8BA8; --s-soft:#414E66; --s-line:#1D2942;
  --s-acc:#4ADE80; --s-acc2:#86EFAC; --s-onacc:#04200E;
  --s-blue:#60A5FA; --s-amber:#FBBF24; --s-red:#F87171; --s-violet:#A78BFA;
  --s-card:0 1px 3px rgba(0,0,0,.5); --s-lift:0 8px 22px rgba(0,0,0,.55);
}
*{box-sizing:border-box}
em,i,cite,dfn,var{font-style:normal}
html,body{margin:0;padding:0}
body{background:var(--s-bg);color:var(--s-ink);
  font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.skip{position:absolute;left:-9999px;background:var(--s-acc);color:var(--s-onacc);padding:12px 18px;font-weight:700;z-index:999}
.skip:focus{left:0;top:0}
:focus-visible{outline:3px solid var(--s-acc);outline-offset:3px;border-radius:6px}

/* app bar */
.appbar{position:sticky;top:0;z-index:60;background:var(--s-panel);border-bottom:1px solid var(--s-line)}
.appbar .in{max-width:1180px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;gap:12px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--s-ink);flex:0 0 auto}
.brand .mk{width:30px;height:30px;border-radius:8px;background:var(--s-panel2);border:1px solid var(--s-line);
  display:flex;align-items:center;justify-content:center}
.brand .mk svg{width:18px;height:18px}
.brand b{font-size:15.5px;font-weight:800;letter-spacing:-.02em}
.brand b i{color:var(--s-acc);font-style:normal}
.navlinks{display:flex;gap:3px;margin-left:auto;flex-wrap:wrap}
.navlinks a{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--s-mute);
  text-decoration:none;padding:9px 13px;border-radius:99px;min-height:40px;display:flex;align-items:center;
  border:1px solid transparent;transition:color 160ms,border-color 160ms}
.navlinks a:hover{color:var(--s-ink);border-color:var(--s-line)}
.navlinks a[aria-current="page"]{background:var(--s-acc);color:var(--s-onacc)}
.themebtn{font-family:inherit;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  padding:9px 14px;min-height:40px;border-radius:99px;cursor:pointer;
  background:var(--s-panel2);border:1px solid var(--s-line);color:var(--s-mute)}
.themebtn:hover{color:var(--s-ink);border-color:var(--s-acc)}
@media(max-width:820px){.navlinks a{padding:8px 9px;font-size:11px}}

/* home */
.home{max-width:1180px;margin:0 auto;padding:34px 20px 80px}
.eyebrow{font-size:11.5px;letter-spacing:.15em;text-transform:uppercase;color:var(--s-acc2);font-weight:700;margin:0 0 10px;
  display:flex;align-items:center;gap:8px}
.eyebrow::before{content:"";width:7px;height:7px;border-radius:99px;background:var(--s-acc);display:block}
.home h1{font-size:clamp(30px,5vw,44px);font-weight:800;letter-spacing:-.03em;line-height:1.08;margin:0 0 10px}
.home .sub{font-size:18px;font-weight:600;color:var(--s-mute);margin:0 0 10px;max-width:62ch}
.home .lede{color:var(--s-mute);font-size:15.5px;max-width:66ch;margin:0 0 8px}
.toolgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:28px}
.tcard{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:9px;
  background:var(--s-panel);border:1px solid var(--s-line);border-radius:16px;padding:20px 18px 18px;
  text-decoration:none;color:var(--s-ink);box-shadow:var(--s-card);
  transition:transform 200ms ease,box-shadow 200ms ease,border-color 200ms ease}
.tcard:hover{transform:translateY(-2px);box-shadow:var(--s-lift);border-color:var(--s-acc)}
.tcard .ic{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center}
.tcard .ic svg{width:24px;height:24px;display:block}
.tcard[data-c="gold"]  .ic{background:linear-gradient(150deg,#E8D4A8,#C9A14A)}
.tcard[data-c="terra"] .ic{background:linear-gradient(150deg,#D98A72,#8B3A2E)}
.tcard[data-c="navy"]  .ic{background:linear-gradient(150deg,#7FD1F7,#0284C7)}
.tcard[data-c="deep"]  .ic{background:linear-gradient(150deg,#86EFAC,#16A34A)}
.tcard[data-c="slate"] .ic{background:linear-gradient(150deg,#C4B5FD,#6D28D9)}
.tcard h3{font-size:18px;font-weight:800;margin:0;letter-spacing:-.015em}
.tcard p{margin:0;font-size:13.5px;line-height:1.5;color:var(--s-mute)}
.tcard .go{margin-top:auto;padding-top:6px;font-size:11px;font-weight:800;letter-spacing:.11em;
  text-transform:uppercase;color:var(--s-acc)}

.startrow{margin-top:30px;background:var(--s-panel);border:1px solid var(--s-line);border-radius:14px;padding:20px 22px;box-shadow:var(--s-card)}
.startrow h2{font-size:16px;font-weight:800;margin:0 0 5px}
.startrow p{margin:0;color:var(--s-mute);font-size:14.5px}
.startrow ol{margin:12px 0 0;padding-left:0;list-style:none;counter-reset:sr}
.startrow li{counter-increment:sr;position:relative;padding:7px 0 7px 36px;font-size:14.5px}
.startrow li::before{content:counter(sr);position:absolute;left:0;top:8px;width:23px;height:23px;border-radius:99px;
  background:var(--s-acc);color:var(--s-onacc);font-size:11.5px;font-weight:800;display:flex;align-items:center;justify-content:center}

/* views */
.view{display:block}
.view[hidden]{display:none}
.viewhd{max-width:1180px;margin:0 auto;padding:14px 20px 0}
.backlink{display:inline-flex;align-items:center;gap:7px;font-size:11.5px;font-weight:800;letter-spacing:.09em;
  text-transform:uppercase;color:var(--s-mute);text-decoration:none;padding:9px 13px;border:1px solid var(--s-line);
  border-radius:99px;min-height:38px;background:var(--s-panel)}
.backlink:hover{border-color:var(--s-acc);color:var(--s-ink)}
.appfoot{max-width:1180px;margin:30px auto 0;padding:22px 20px 40px;color:var(--s-mute);font-size:12.5px;
  border-top:1px solid var(--s-line)}

@media print{
  .appbar,.navlinks,.viewhd,.appfoot,.home,.themebtn{display:none !important}
  .view[hidden]{display:none !important}
}
@media(prefers-reduced-motion:reduce){*{transition-duration:1ms !important;animation-duration:1ms !important}}
"""

MARK = '<svg viewBox="0 0 24 24" fill="none" stroke="#E8D4A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3.2l1.7-4.2 2.8 9 2.2-6.4 1.6 3.4H21"/></svg>'

views = "\n".join(
    f'<section class="view" id="view-{t["key"]}" hidden aria-label="{t["title"]}">\n'
    f'  <div class="viewhd"><a class="backlink" href="#/home">&larr; All tools</a></div>\n'
    f'{parts[t["key"]]["body"]}\n</section>'
    for t in TOOLS)

all_css = SHELL_CSS + "\n" + "\n".join(parts[t["key"]]["css"] for t in TOOLS)
tool_js = "\n".join("/* ---- %s ---- */\n%s" % (t["file"], "\n".join(parts[t["key"]]["scripts"])) for t in TOOLS)

HTML = f"""<!DOCTYPE html>
<html lang="en" data-dark="on">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CVRN Review Course | MedMasters Collaborative</title>
<meta name="description" content="One app for the ECG and CVRN-BC review course: exam pacing, gap finder, weakness dashboard, live ECG lab, referenced study notes, and ten scored practice exams.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Sans:wght@400;500;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<style>
{all_css}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>

<div class="appbar">
  <div class="in">
    <a class="brand" href="#/home">
      <span class="mk">{MARK}</span>
      <b>CVRN<i>/OS</i></b>
    </a>
    <nav class="navlinks" aria-label="Tools">
      <a href="#/home"  data-route="home">Today</a>
      <a href="#/dash"  data-route="dash">Dashboard</a>
      <a href="#/os"    data-route="os">Plan</a>
      <a href="#/ecg"   data-route="ecg">ECG Lab</a>
      <a href="#/notes" data-route="notes">Notes</a>
      <a href="#/os/gap" data-route="os/gap">Gap finders</a>
      <a href="#/os/exams" data-route="exams">Exams</a>
    </nav>
    <button class="themebtn" id="themeBtn" type="button" aria-pressed="true">Light</button>
    <nav style="display:none" aria-hidden="true">
    </nav>
  </div>
</div>

<main id="main">

<section class="view home" id="view-home" aria-label="Home">
  <div class="hero">
    <p class="eyebrow">ABCM CVRN-BC &middot; Levels I and II</p>
    <h1>You choose the destination.<br>The system chooses the route.</h1>
    <p class="sub">Set the exam date, find the holes, then work the queue in the order the blueprint says matters.</p>
    <p class="lede">Tell it when your exam is and how much time you actually have. It works out the pace, finds what you do not know, then routes your study toward what is weakest and most heavily weighted. Everything below shares one set of progress.</p>
  </div>

  <div class="toolgrid">
{chr(10).join(card(c) for c in CARDS)}
  </div>

  <div class="startrow">
    <h2>First time here</h2>
    <p>Four steps, in this order.</p>
    <ol>
      <li>Open <strong>Mastery OS</strong> and set your exam date, days per week, and minutes per day. You get a pace and an honest verdict on whether it fits.</li>
      <li>Run the <strong>Gap Finder</strong>. Rate yourself by domain, then answer the diagnostic. It does not take your self-rating at face value.</li>
      <li>Work the <strong>Right now</strong> queue. It is ranked by blueprint weight, how badly a thing is missed, and how long since you touched it.</li>
      <li>Sit a <strong>Practice Exam</strong> every second week. Read the domain breakdown, not just the score.</li>
    </ol>
  </div>
</section>

{views}

</main>

<div class="appfoot">
  <p>ECG &amp; CVRN Review Course. Prepared by Dr. Sharilyn Rennie for MedMasters Collaborative. Progress is stored in this browser only. No names, identifiers, or scores leave this device. Teaching material for certification preparation, not a clinical protocol.</p>
</div>

<script>
/* ---- shared data ---- */
{chr(10).join(shared)}
</script>

<script>
{tool_js}
</script>

<script>
/* ============================================================
   Router. Hash based so it survives an iframe and a static host.
   ============================================================ */
(function(){{
  "use strict";
  var VIEWS = ['home','dash','os','ecg','notes'];
  var ecgWasRunning = false;

  function el(id){{ return document.getElementById(id); }}

  function pauseEcg(){{
    var b = document.querySelector('#view-ecg #runBtn');
    if(b && b.getAttribute('aria-pressed')==='true'){{ ecgWasRunning = true; b.click(); }}
  }}
  function resumeEcg(){{
    var b = document.querySelector('#view-ecg #runBtn');
    if(b && ecgWasRunning && b.getAttribute('aria-pressed')!=='true'){{ b.click(); }}
    ecgWasRunning = false;
    /* re-seed the sweep and the numerics so the monitor is live on arrival
       rather than showing dashes until the next one second tick */
    var sel = document.querySelector('#view-ecg #rhySel');
    if(sel) sel.dispatchEvent(new Event('change'));
  }}

  var booted = false;
  function show(name, sub){{
    if(VIEWS.indexOf(name) < 0) name = 'home';
    VIEWS.forEach(function(v){{
      var node = el('view-' + v);
      if(node) node.hidden = (v !== name);
    }});
    document.querySelectorAll('.navlinks a').forEach(function(a){{
      if(a.getAttribute('data-route') === name) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    }});
    if(name === 'dash') window.dispatchEvent(new Event('cvrn:refresh'));
    if(name === 'ecg') {{ if(booted) resumeEcg(); }}
    else if(booted) pauseEcg();
    else {{ ecgWasRunning = true; pauseEcg(); }}
    booted = true;

    /* sub route: open a specific tab inside the Mastery OS */
    if(name === 'os' && sub){{
      var map = {{ gap:'t-gap', now:'t-now', dash:'t-dash', exams:'t-ex', setup:'t-set' }};
      var t = map[sub] && document.querySelector('#view-os #' + map[sub]);
      if(t) t.click();
    }}
    /* sub route: open a specific tab inside the ECG lab */
    if(name === 'ecg' && sub){{
      var emap = {{ gap:'tab-pg', monitor:'tab-mon', twelve:'tab-12', practice:'tab-pr', mastery:'tab-ms' }};
      var et = emap[sub] && document.querySelector('#view-ecg #' + emap[sub]);
      if(et) et.click();
    }}
    window.scrollTo(0,0);
    sendHeight();
  }}

  function route(){{
    var h = (location.hash || '#/home').replace(/^#\\/?/, '');
    var bits = h.split('/');
    show(bits[0] || 'home', bits[1]);
  }}
  window.addEventListener('hashchange', route);

  /* deep link from the study-notes QR codes: ?topic=D6 */
  var tp = /[?&]topic=(D\\d+)/.exec(location.search);
  if(tp && !location.hash) location.hash = '#/os/exams';

  var tb = el('themeBtn');
  function applyTheme(dark){{
    document.documentElement.setAttribute('data-dark', dark?'on':'off');
    tb.setAttribute('aria-pressed', dark?'true':'false');
    tb.textContent = dark ? 'Light' : 'Dark';
    try{{ localStorage.setItem('cvrn-theme', dark?'on':'off'); }}catch(e){{}}
    window.dispatchEvent(new Event('cvrn:refresh'));
  }}
  var saved = 'on';
  try{{ saved = localStorage.getItem('cvrn-theme') || 'on'; }}catch(e){{}}
  applyTheme(saved !== 'off');
  tb.addEventListener('click', function(){{
    applyTheme(document.documentElement.getAttribute('data-dark') !== 'on');
  }});

  route();

  /* ---- iframe height, one channel for the whole app ---- */
  function sendHeight(){{
    try{{
      window.parent.postMessage({{type:'cvrn:height', id:'cvrn-app',
        height:document.documentElement.scrollHeight}}, '*');
    }}catch(e){{}}
  }}
  if(window.ResizeObserver) new ResizeObserver(sendHeight).observe(document.body);
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  document.addEventListener('click', function(){{ setTimeout(sendHeight, 80); }});
  window.addEventListener('message', function(e){{
    if(e.data && e.data.type === 'cvrn:ping') sendHeight();
  }});
}})();
</script>
</body>
</html>"""

open("index.html", "w").write(HTML)
print("index.html written:", len(HTML), "bytes")
for t in TOOLS:
    print("  ", t["file"], "css", len(parts[t["key"]]["css"]), "body", len(parts[t["key"]]["body"]),
          "scripts", len(parts[t["key"]]["scripts"]))
