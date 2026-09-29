#!/usr/bin/env python3
"""Merge the three CVRN tools into one self-contained index.html with a card selector."""
import re, os

TOOLS = [
    dict(key="os",    file="cvrn-mastery-os.html", title="Mastery OS",
         desc="Your plan, your weak spots, today&rsquo;s work.", color="gold"),
    dict(key="ecg",   file="ecg-lab.html",         title="ECG Lab",
         desc="Live monitor, 12-leads, freeze and measure.", color="terra"),
    dict(key="notes", file="study-notes.html",     title="Study Notes",
         desc="Physiology to bedside, with sources.", color="navy"),
    dict(key="dash",  file="cvrn-dashboard.html",   title="Weakness Dashboard",
         desc="Where the exam will cost you points.", color="deep"),
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
            # "@media(max-width:700px)" has no space before the condition, so
            # splitting on whitespace returned the whole query as the at-rule
            # name and nothing inside ever got scoped. Every responsive rule in
            # every tool was therefore emitted unscoped, at lower specificity
            # than its own scoped base rule, so no layout ever collapsed on a
            # phone. Match the at-rule name properly instead.
            m_at = re.match(r"@[-a-zA-Z]+", selt)
            at = m_at.group(0).lower() if m_at else ""
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
    # Each tool shipped its own <main>. Merged into one page that produced several
    # main landmarks nested inside the shell's, which is invalid and makes a screen
    # reader's landmark list useless. The shell keeps the only <main>.
    body = body.replace('id="main"', 'id="main-%s"' % tool["key"])
    body = re.sub(r'<main(\s[^>]*)?>', lambda m: '<div' + (m.group(1) or '') + '>', body)
    body = body.replace('</main>', '</div>')

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
 dict(route="dash",     color="deep",  icon="deep",  title="Weakness Dashboard",
      desc="Readiness by blueprint weight, the mastery mix, and the queue.", meta="Where you stand"),
 dict(route="os",       color="gold",  icon="gold",  title="Mastery OS",
      desc="Set your exam date. Get a pace, a plan, and today&rsquo;s work.", meta="Plan &middot; Dashboard"),
 dict(route="ecg",      color="terra", icon="terra", title="ECG Lab",
      desc="Live monitor with freeze and calipers, plus twelve 12-lead patterns.", meta="Practice &middot; DOK 1 to 4"),
 dict(route="notes",    color="navy",  icon="navy",  title="Study Notes",
      desc="Physiology through bedside management, referenced and printable.", meta="Read &middot; 50 min"),
 dict(route="os/gap",   color="slate", icon="deep2", title="Written Gap Finder",
      desc="Multiple choice across all fourteen domains, weighted the way the exam is.", meta="Start here"),
 dict(route="ecg/gap",  color="slate", icon="terra", title="Practical Gap Finder",
      desc="Worked off live tracings. Name it, measure it, localize it, decide.", meta="Start here"),
 dict(route="os/exams", color="slate", icon="slate", title="Practice Exams",
      desc="Ten scored forms drawn from a reserved item pool.", meta="Score estimate"),
]

def card(c):
    return f'''      <a class="tcard" data-c="{c['color']}" href="#/{c['route']}" data-route="{c['route']}">
        <span class="ic">{ICONS[c['icon']]}</span>
        <h2>{c['title']}</h2>
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
  --s-ink:#141C2D; --s-mute:#55607A; --s-soft:#B4C0D8; --s-line:#DCE2EA;
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
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
main#main:focus{outline:none}
main#main:focus-visible{outline:3px solid var(--s-acc);outline-offset:-3px}
html{scroll-padding-top:var(--hdr-h,78px)}
[id]{scroll-margin-top:var(--hdr-h,78px)}
.skip{position:absolute;left:-9999px;background:var(--s-acc);color:var(--s-onacc);padding:12px 18px;font-weight:700;z-index:999}
.skip:focus{left:0;top:0}
:focus-visible{outline:3px solid var(--s-acc);outline-offset:3px;border-radius:6px}

/* app bar */
header.appbar{position:sticky;top:0;z-index:60;background:var(--s-panel);border-bottom:1px solid var(--s-line)}
header.appbar .in{max-width:1180px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;gap:12px}
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
  background:var(--s-panel2);border:1px solid var(--s-line);color:var(--s-ink)}
.themebtn:hover{color:var(--s-ink);border-color:var(--s-acc)}
@media(max-width:820px){.navlinks a{padding:8px 9px;font-size:11px}}
/* On a phone the nav used to wrap one link per line and push the tool a
   full screen down. It now scrolls sideways on one row instead. */
@media(max-width:560px){
  header.appbar .in{flex-wrap:wrap;row-gap:8px}
  .navlinks{order:3;width:100%;margin-left:0}
  .brand{margin-right:auto}
}
@media(max-width:700px){
  .appbar{flex-wrap:nowrap;gap:8px}
  .navlinks{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;
    scrollbar-width:none;margin-left:0;padding-bottom:2px;min-width:0}
  .navlinks::-webkit-scrollbar{display:none}
  .navlinks a{white-space:nowrap;flex:0 0 auto;padding:8px 10px;font-size:11px}
  .brand{flex:0 0 auto}
  .themebtn{flex:0 0 auto}
}

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
.tcard h2{font-size:18px;font-weight:800;margin:0;letter-spacing:-.015em}
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
footer.appfoot{max-width:1180px;margin:30px auto 0;padding:22px 20px 40px;color:var(--s-mute);font-size:12.5px;
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

A11Y_CSS = """
/* ============================================================
   ACCESSIBILITY LAYER
   Five user controls, stored in this browser and applied to the
   document element before first paint so nothing flashes:
     data-uiscale   text size, drives --ui-scale
     data-uifont    typeface, default or Atkinson Hyperlegible
     data-contrast  normal or high
     data-motion    system or always reduce
     data-underline link underlines always on
   Every font-size in the merged stylesheet is multiplied by
   --ui-scale at build time, so text grows without the layout
   being scaled with it.
   ============================================================ */
:root{--ui-scale:1}
html[data-uiscale="115"]{--ui-scale:1.15}
html[data-uiscale="130"]{--ui-scale:1.30}
html[data-uiscale="150"]{--ui-scale:1.50}

/* Atkinson Hyperlegible is drawn so that characters people confuse most,
   such as capital I, lowercase l and the digit 1, stay distinct. */
html[data-uifont="hyper"], html[data-uifont="hyper"] body,
html[data-uifont="hyper"] button, html[data-uifont="hyper"] input,
html[data-uifont="hyper"] select, html[data-uifont="hyper"] textarea,
html[data-uifont="hyper"] h1, html[data-uifont="hyper"] h2,
html[data-uifont="hyper"] h3, html[data-uifont="hyper"] h4,
html[data-uifont="hyper"] .eyebrow, html[data-uifont="hyper"] .tab,
html[data-uifont="hyper"] .brand b{
  font-family:'Atkinson Hyperlegible','Plus Jakarta Sans',system-ui,sans-serif !important;
}
html[data-uifont="hyper"]{letter-spacing:.006em}

html[data-underline="on"] a:not(.tcard):not(.brand):not(.skip):not(.act){text-decoration:underline}
html[data-underline="on"] a:not(.tcard):not(.brand):not(.skip):not(.act):hover{text-decoration-thickness:2px}

/* Motion. The system setting is honoured on its own; this is for people whose
   operating system does not expose the preference or who want it only here. */
html[data-motion="reduce"] *,
html[data-motion="reduce"] *::before,
html[data-motion="reduce"] *::after{
  animation-duration:.001ms !important;animation-iteration-count:1 !important;
  transition-duration:.001ms !important;scroll-behavior:auto !important;
}

/* Windows and macOS forced colours strip backgrounds, so anything that carried
   meaning through a background needs a border to survive. */
@media (forced-colors: active){
  .tcard,.card,.kpi,.stat,.dTile,.opt,.fb,.gapRow,.sec,.q,.screen,.panel{border:1px solid CanvasText}
  .tab[aria-selected="true"]{border:2px solid Highlight;forced-color-adjust:none}
  .pill,.chip,.readpill,.badge{border:1px solid CanvasText}
  :focus-visible{outline:3px solid Highlight;outline-offset:2px}
}

/* ---- the control itself ---- */
.a11yWrap{position:relative;flex:0 0 auto}
.a11yBtn{display:inline-flex;align-items:center;gap:7px;background:transparent;color:var(--s-ink);
  border:1px solid var(--s-line);border-radius:999px;padding:8px 14px;font-family:inherit;
  font-size:calc(12px*var(--ui-scale,1));font-weight:800;letter-spacing:.06em;text-transform:uppercase;
  cursor:pointer;min-height:40px}
.a11yBtn:hover{border-color:var(--s-acc);color:var(--s-ink)}
.a11yBtn svg{width:17px;height:17px;flex:0 0 auto}
.a11yPanel{position:absolute;right:0;top:calc(100% + 10px);z-index:200;width:310px;max-width:88vw;
  background:var(--s-panel);border:1px solid var(--s-line);border-radius:14px;padding:16px 18px 18px;
  box-shadow:0 18px 46px rgba(0,0,0,.42);text-align:left}
.a11yPanel[hidden]{display:none}
.a11yPanel h2{font-size:calc(14px*var(--ui-scale,1));margin:0 0 4px;color:var(--s-ink);font-weight:800}
.a11yPanel .hint{font-size:calc(12px*var(--ui-scale,1));color:var(--s-mute);margin:0 0 14px;line-height:1.5}
.a11yPanel fieldset{border:0;padding:0;margin:0 0 15px}
.a11yPanel legend{font-size:calc(11px*var(--ui-scale,1));font-weight:800;letter-spacing:.09em;
  text-transform:uppercase;color:var(--s-mute);padding:0;margin-bottom:7px}
.a11yOpts{display:flex;gap:6px;flex-wrap:wrap}
.a11yOpts label{position:relative;display:inline-flex;align-items:center;justify-content:center;
  border:1px solid var(--s-line);border-radius:9px;padding:9px 12px;min-height:40px;min-width:44px;
  font-size:calc(13px*var(--ui-scale,1));font-weight:700;color:var(--s-ink);cursor:pointer;background:transparent}
.a11yOpts input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}
.a11yOpts label:has(input:checked){background:var(--s-acc);border-color:var(--s-acc);color:var(--s-onacc)}
.a11yOpts label:has(input:focus-visible){outline:3px solid var(--s-acc);outline-offset:2px}
.a11yRow{display:flex;align-items:flex-start;gap:10px;margin-bottom:11px}
.a11yRow input{width:20px;height:20px;margin:1px 0 0;flex:0 0 auto;accent-color:var(--s-acc)}
.a11yRow span{font-size:calc(13.5px*var(--ui-scale,1));color:var(--s-ink);line-height:1.45}
.a11yReset{background:transparent;border:1px solid var(--s-line);color:var(--s-ink);border-radius:9px;
  padding:9px 14px;font-family:inherit;font-size:calc(13px*var(--ui-scale,1));font-weight:700;
  cursor:pointer;min-height:40px;width:100%}
.a11yReset:hover{border-color:var(--s-acc)}
@media(max-width:700px){ .a11yBtn span{display:none} .a11yBtn{padding:8px 10px} .a11yPanel{width:290px} }
@media print{ .a11yWrap{display:none !important} }
"""

# ---- high contrast tokens, emitted for the shell and for every scoped view ----
HC_DARK = {
  "--bg":"#000000", "--panel":"#000000", "--panel-2":"#0B0B0B", "--paper":"#FFFFFF",
  "--ink":"#FFFFFF", "--ink-soft":"#F2F4F8", "--ink-mute":"#DCE2EC",
  "--line":"#FFFFFF", "--acc":"#7DF7A6", "--acc2":"#A9FFC6", "--onacc":"#000000",
  "--gold":"#FFD98A", "--gold-hi":"#FFE9B8", "--terra":"#FFB39E", "--terra-hi":"#FFC9B8",
  "--pulse":"#FF9E8A", "--alert":"#FFE873", "--ok":"#7DF7A6", "--mute":"#DCE2EC",
  "--soft":"#DCE2EC", "--grid":"#FFFFFF", "--red":"#FF9E8A", "--amber":"#FFE873",
  "--trace":"#000000", "--tracew":"3",
}
HC_LIGHT = {
  "--bg":"#FFFFFF", "--panel":"#FFFFFF", "--panel-2":"#FFFFFF", "--paper":"#FFFFFF",
  "--ink":"#000000", "--ink-soft":"#151515", "--ink-mute":"#2B2B2B",
  "--line":"#000000", "--acc":"#0A4D20", "--acc2":"#063614", "--onacc":"#FFFFFF",
  "--gold":"#5A4310", "--gold-hi":"#3F2F0A", "--terra":"#7A2418", "--terra-hi":"#7A2418",
  "--pulse":"#7A2418", "--alert":"#6B2A0C", "--ok":"#0A4D20", "--mute":"#2B2B2B",
  "--soft":"#2B2B2B", "--grid":"#000000", "--red":"#7A2418", "--amber":"#6B2A0C",
  "--trace":"#000000", "--tracew":"3",
}
SHELL_HC_DARK = {"--s-bg":"#000000","--s-panel":"#000000","--s-ink":"#FFFFFF","--s-mute":"#DCE2EC",
                 "--s-line":"#FFFFFF","--s-acc":"#7DF7A6","--s-onacc":"#000000"}
SHELL_HC_LIGHT = {"--s-bg":"#FFFFFF","--s-panel":"#FFFFFF","--s-ink":"#000000","--s-mute":"#2B2B2B",
                  "--s-line":"#000000","--s-acc":"#0A4D20","--s-onacc":"#FFFFFF"}

def _decl(d):
    return "".join("%s:%s;" % (k, v) for k, v in d.items())

HC_NOTES = {
  "--navy":"#000000", "--navy-tint":"#FFFFFF", "--ink":"#000000", "--ink-soft":"#000000",
  "--ink-muted":"#1F1F1F", "--gold":"#5A4310", "--gold-text":"#4A3608", "--terra":"#7A2418",
  "--terra-text":"#6B1F14", "--teal-text":"#123E44", "--rule":"#000000", "--rule-soft":"#4A4A4A",
  "--white":"#FFFFFF", "--off-white":"#FFFFFF", "--paper":"#FFFFFF",
  "--t-physio":"#123E44", "--t-patho":"#6B1F14", "--t-practice":"#000000", "--t-questions":"#4A3608",
  "--t-physio-soft":"#FFFFFF", "--t-patho-soft":"#FFFFFF", "--t-practice-soft":"#FFFFFF",
  "--t-questions-soft":"#FFFFFF",
  "--card":"none", "--lift":"none",
}

def high_contrast_css(view_keys):
    out = ["\n/* ---- high contrast, applied over whichever theme is active ---- */"]
    out.append('html[data-contrast="high"][data-dark="on"]{%s}' % _decl(SHELL_HC_DARK))
    out.append('html[data-contrast="high"][data-dark="off"]{%s}' % _decl(SHELL_HC_LIGHT))
    for k in view_keys:
        if k == "notes":
            # a printed page is black on white whichever theme the app is in
            out.append('html[data-contrast="high"] #view-notes{%s}' % _decl(HC_NOTES))
            continue
        out.append('html[data-contrast="high"][data-dark="on"] #view-%s{%s}' % (k, _decl(HC_DARK)))
        out.append('html[data-contrast="high"][data-dark="off"] #view-%s{%s}' % (k, _decl(HC_LIGHT)))
    out.append('html[data-contrast="high"] .card,html[data-contrast="high"] .kpi,'
               'html[data-contrast="high"] .stat,html[data-contrast="high"] .dTile,'
               'html[data-contrast="high"] .tcard,html[data-contrast="high"] .opt,'
               'html[data-contrast="high"] .gapRow,html[data-contrast="high"] .q,'
               'html[data-contrast="high"] .sec,html[data-contrast="high"] .fb'
               '{border-width:2px !important;box-shadow:none !important}')
    out.append('html[data-contrast="high"] :focus-visible{outline:4px solid var(--s-acc) !important;outline-offset:3px}')
    out.append('html[data-contrast="high"] .pill,html[data-contrast="high"] .chip,'
               'html[data-contrast="high"] .readpill,html[data-contrast="high"] .badge'
               '{border-width:2px !important;font-weight:800}')
    return "\n".join(out)

# ---- scale every CSS font-size so the text control actually does something ----
def scale_font_sizes(css):
    """Multiply each font-size in px by --ui-scale.

    Print blocks are skipped: paper output should not inherit a screen
    preference. Values already using calc or a variable are left alone.
    """
    out, i, n, depth_print = [], 0, len(css), None
    # find @media print blocks and protect them
    spans = []
    for m in re.finditer(r'@media[^{]*\bprint\b[^{]*\{', css):
        j, d = m.end(), 1
        while j < n and d:
            if css[j] == '{': d += 1
            elif css[j] == '}': d -= 1
            j += 1
        spans.append((m.start(), j))
    def protected(pos):
        return any(a <= pos < b for a, b in spans)
    def repl(m):
        if protected(m.start()):
            return m.group(0)
        return 'font-size:calc(%s*var(--ui-scale,1))' % m.group(1)
    css = re.sub(r'font-size:\s*(\d*\.?\d+px)', repl, css)

    # fluid headings use clamp(min, preferred, max); each of the three parts
    # has to be scaled or the heading stays pinned at its ceiling
    def repl_clamp(m):
        if protected(m.start()):
            return m.group(0)
        parts = [x.strip() for x in m.group(1).split(',')]
        if len(parts) != 3:
            return m.group(0)
        return 'font-size:clamp(%s)' % ','.join(
            'calc(%s*var(--ui-scale,1))' % x for x in parts)
    css = re.sub(r'font-size:\s*clamp\(([^()]*)\)', repl_clamp, css)
    return css


all_css = SHELL_CSS + "\n" + "\n".join(parts[t["key"]]["css"] for t in TOOLS)
all_css = scale_font_sizes(all_css)
all_css = all_css + "\n" + A11Y_CSS + "\n" + high_contrast_css([t["key"] for t in TOOLS])
tool_js = "\n".join("/* ---- %s ---- */\n%s" % (t["file"], "\n".join(parts[t["key"]]["scripts"])) for t in TOOLS)

HTML = f"""<!DOCTYPE html>
<html lang="en" data-dark="on">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CVRN Review Course | MedMasters Collaborative</title>
<meta name="description" content="One app for the ECG and CVRN-BC review course: exam pacing, gap finder, weakness dashboard, live ECG lab, referenced study notes, and ten scored practice exams.">
<script>
/* Runs before the stylesheet is applied so a saved text size, typeface or
   contrast setting is already on the document element at first paint. */
(function(){{
  try{{
    var a = JSON.parse(localStorage.getItem('cvrn-a11y') || '{{}}');
    var d = document.documentElement;
    if(a.uiscale && a.uiscale !== '100') d.setAttribute('data-uiscale', a.uiscale);
    if(a.uifont === 'hyper') d.setAttribute('data-uifont', 'hyper');
    if(a.contrast === 'high') d.setAttribute('data-contrast', 'high');
    if(a.motion) d.setAttribute('data-motion', 'reduce');
    if(a.underline) d.setAttribute('data-underline', 'on');
    var th = localStorage.getItem('cvrn-theme');
    if(th === 'off') d.setAttribute('data-dark', 'off');
  }}catch(e){{}}
}})();
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Sans:wght@400;500;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<style>
{all_css}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>

<header class="appbar">
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

    <div class="a11yWrap">
      <button class="a11yBtn" id="a11yBtn" type="button" aria-expanded="false" aria-controls="a11yPanel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="7.4" r="1.5" fill="currentColor" stroke="none"/><path d="M7.4 10.2h9.2M12 10.6v6.4M12 13.4l-2.6 3.6M12 13.4l2.6 3.6"/></svg>
        <span>Accessibility</span>
      </button>
      <div class="a11yPanel" id="a11yPanel" role="group" aria-labelledby="a11yHd" hidden>
        <h2 id="a11yHd">Display and reading</h2>
        <p class="hint">Saved in this browser only, and applied to every screen in the course.</p>

        <fieldset>
          <legend id="lgSize">Text size</legend>
          <div class="a11yOpts" role="none">
            <label><input type="radio" name="uiscale" value="100" checked><span>100%</span></label>
            <label><input type="radio" name="uiscale" value="115"><span>115%</span></label>
            <label><input type="radio" name="uiscale" value="130"><span>130%</span></label>
            <label><input type="radio" name="uiscale" value="150"><span>150%</span></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Typeface</legend>
          <div class="a11yOpts">
            <label><input type="radio" name="uifont" value="system" checked><span>Default</span></label>
            <label><input type="radio" name="uifont" value="hyper"><span>Hyperlegible</span></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contrast</legend>
          <div class="a11yOpts">
            <label><input type="radio" name="contrast" value="normal" checked><span>Standard</span></label>
            <label><input type="radio" name="contrast" value="high"><span>High</span></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Other</legend>
          <label class="a11yRow"><input type="checkbox" id="optMotion"><span>Reduce motion, including the monitor sweep</span></label>
          <label class="a11yRow"><input type="checkbox" id="optUnderline"><span>Underline every link</span></label>
        </fieldset>

        <button class="a11yReset" id="a11yReset" type="button">Reset to defaults</button>
      </div>
    </div>
  </div>
</header>

<p class="sr-only" id="routeLive" role="status" aria-live="polite"></p>

<main id="main" tabindex="-1">

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

<footer class="appfoot">
  <p>ECG &amp; CVRN Review Course. Prepared by Dr. Sharilyn Rennie for MedMasters Collaborative. Progress is stored in this browser only. No names, identifiers, or scores leave this device. Teaching material for certification preparation, not a clinical protocol.</p>
</footer>

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
  var routed = false;
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
    /* A hash route swap changes everything on screen but leaves focus where it
       was and says nothing. Focus moves to the main region and the view name
       goes to a polite live region, so the change is both heard and reachable. */
    var TITLES = {{home:'Today', dash:'Weakness dashboard', os:'Mastery OS',
                   ecg:'ECG lab', notes:'Study notes'}};
    var live = el('routeLive');
    if(live) live.textContent = (TITLES[name] || name) + ' view loaded';
    var mainEl = el('main');
    if(mainEl && routed) {{ mainEl.focus({{preventScroll:true}}); }}
    routed = true;
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

  /* ---------- accessibility settings ---------- */
  var A11Y_KEY = 'cvrn-a11y';
  var a11yDefaults = {{uiscale:'100', uifont:'system', contrast:'normal', motion:false, underline:false}};
  function a11yLoad(){{
    try{{ return Object.assign({{}}, a11yDefaults, JSON.parse(localStorage.getItem(A11Y_KEY) || '{{}}')); }}
    catch(e){{ return Object.assign({{}}, a11yDefaults); }}
  }}
  function a11ySave(s){{ try{{ localStorage.setItem(A11Y_KEY, JSON.stringify(s)); }}catch(e){{}} }}
  function a11yApply(s, announce){{
    var d = document.documentElement;
    if(s.uiscale === '100') d.removeAttribute('data-uiscale'); else d.setAttribute('data-uiscale', s.uiscale);
    if(s.uifont === 'hyper') d.setAttribute('data-uifont','hyper'); else d.removeAttribute('data-uifont');
    if(s.contrast === 'high') d.setAttribute('data-contrast','high'); else d.removeAttribute('data-contrast');
    if(s.motion) d.setAttribute('data-motion','reduce'); else d.removeAttribute('data-motion');
    if(s.underline) d.setAttribute('data-underline','on'); else d.removeAttribute('data-underline');
    /* the ECG engines read their own colours and motion state from the document */
    window.dispatchEvent(new CustomEvent('cvrn:a11y', {{detail:s}}));
    if(announce){{
      var live = el('routeLive');
      if(live) live.textContent = announce;
    }}
  }}
  function a11ySync(s){{
    document.querySelectorAll('input[name="uiscale"]').forEach(function(i){{ i.checked = (i.value === s.uiscale); }});
    document.querySelectorAll('input[name="uifont"]').forEach(function(i){{ i.checked = (i.value === s.uifont); }});
    document.querySelectorAll('input[name="contrast"]').forEach(function(i){{ i.checked = (i.value === s.contrast); }});
    var m = el('optMotion'), u = el('optUnderline');
    if(m) m.checked = !!s.motion;
    if(u) u.checked = !!s.underline;
  }}
  var a11yState = a11yLoad();
  a11yApply(a11yState);
  a11ySync(a11yState);

  var a11yBtn = el('a11yBtn'), a11yPanel = el('a11yPanel');
  function a11yOpen(v){{
    a11yPanel.hidden = !v;
    a11yBtn.setAttribute('aria-expanded', v ? 'true' : 'false');
    if(v){{ var f = a11yPanel.querySelector('input'); if(f) f.focus(); }}
  }}
  a11yBtn.addEventListener('click', function(){{ a11yOpen(a11yPanel.hidden); }});
  document.addEventListener('keydown', function(e){{
    if(e.key === 'Escape' && !a11yPanel.hidden){{ a11yOpen(false); a11yBtn.focus(); }}
  }});
  document.addEventListener('click', function(e){{
    if(a11yPanel.hidden) return;
    if(!a11yPanel.contains(e.target) && e.target !== a11yBtn && !a11yBtn.contains(e.target)) a11yOpen(false);
  }});
  a11yPanel.addEventListener('focusout', function(e){{
    if(!a11yPanel.contains(e.relatedTarget) && e.relatedTarget !== a11yBtn) a11yOpen(false);
  }});
  var LBL = {{uiscale:'Text size', uifont:'Typeface', contrast:'Contrast'}};
  ['uiscale','uifont','contrast'].forEach(function(name){{
    document.querySelectorAll('input[name="' + name + '"]').forEach(function(i){{
      i.addEventListener('change', function(){{
        a11yState[name] = i.value;
        a11ySave(a11yState);
        a11yApply(a11yState, LBL[name] + ' set to ' + i.parentNode.textContent.trim());
      }});
    }});
  }});
  el('optMotion').addEventListener('change', function(){{
    a11yState.motion = this.checked; a11ySave(a11yState);
    a11yApply(a11yState, this.checked ? 'Motion reduced' : 'Motion follows your system setting');
  }});
  el('optUnderline').addEventListener('change', function(){{
    a11yState.underline = this.checked; a11ySave(a11yState);
    a11yApply(a11yState, this.checked ? 'Links underlined' : 'Link underlines off');
  }});
  el('a11yReset').addEventListener('click', function(){{
    a11yState = Object.assign({{}}, a11yDefaults);
    a11ySave(a11yState); a11ySync(a11yState);
    a11yApply(a11yState, 'Display settings reset to defaults');
  }});

  /* keep scroll-padding in step with the sticky header, which changes height
     when the nav wraps or the text size is raised */
  function syncHeaderHeight(){{
    var h = document.querySelector('header.appbar');
    if(h) document.documentElement.style.setProperty('--hdr-h', Math.ceil(h.getBoundingClientRect().height + 10) + 'px');
  }}
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('cvrn:a11y', function(){{ setTimeout(syncHeaderHeight, 40); }});

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
