/* ============================================================
   CVRN embed resizer, parent side.

   Drop this once per site, in the Kajabi site-wide footer code
   block or before </body> on any page that embeds a CVRN tool.
   It auto-sizes every iframe marked data-cvrn-embed so the tool
   never scrolls inside its own box.

   The tools post: {type:'cvrn:height', id:'...', height:1234}
   Nothing else is accepted, and only from ALLOWED_ORIGINS.
   ============================================================ */
(function () {
  "use strict";

  /* Add your published origin here. Keep the list tight: this is
     what stops any other page from resizing your iframes. */
  var ALLOWED_ORIGINS = [
    "https://drsrennie-stack.github.io",
    window.location.origin
  ];

  var MIN = 420;      /* never collapse smaller than this */
  var MAX = 20000;    /* sanity ceiling */
  var PAD = 8;        /* a little breathing room so nothing clips */

  function frames() {
    return Array.prototype.slice.call(
      document.querySelectorAll("iframe[data-cvrn-embed]")
    );
  }

  function allowed(origin) {
    return ALLOWED_ORIGINS.indexOf(origin) > -1;
  }

  window.addEventListener("message", function (e) {
    if (!allowed(e.origin)) return;
    var d = e.data;
    if (!d || d.type !== "cvrn:height") return;

    var h = parseInt(d.height, 10);
    if (isNaN(h)) return;
    h = Math.max(MIN, Math.min(MAX, h + PAD));

    frames().forEach(function (f) {
      /* match by the source window, so several tools can share a page */
      if (f.contentWindow === e.source) {
        f.style.height = h + "px";
      }
    });
  }, false);

  /* Nudge each frame on load and on parent resize, in case the child
     rendered before this script attached. */
  function poke() {
    frames().forEach(function (f) {
      try { f.contentWindow.postMessage({ type: "cvrn:ping" }, "*"); } catch (err) {}
    });
  }
  window.addEventListener("load", function () { setTimeout(poke, 300); });
  window.addEventListener("resize", function () { setTimeout(poke, 200); });
})();
