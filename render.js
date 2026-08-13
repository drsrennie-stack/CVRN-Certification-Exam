const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  await p.goto('file:///root/cvrn/blueprint-pdf.html', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  await p.pdf({ path: 'CVRN-CVBC-Exam-Blueprint.pdf', format: 'Letter', printBackground: true,
    margin: { top: '0.7in', bottom: '0.75in', left: '0.7in', right: '0.7in' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;font-size:7.5pt;color:#5C6E78;font-family:sans-serif;letter-spacing:.06em;padding:0 0.7in;display:flex;justify-content:space-between;"><span>MedMasters Collaborative &middot; ECG &amp; CVRN Review Course</span><span class="pageNumber"></span></div>'
  });
  await b.close();
})();
