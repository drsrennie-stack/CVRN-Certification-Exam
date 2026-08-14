const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport:{width:1280,height:720}, deviceScaleFactor:2 });
  await p.goto('http://127.0.0.1:8899/brand/card.html', { waitUntil:'networkidle' });
  await p.waitForTimeout(2500);
  const card = await p.$('.card');
  await card.screenshot({ path:'brand/CVRN-OS-card-1280x720.jpg', type:'jpeg', quality:92 });
  // social size
  await p.setViewportSize({width:1200,height:630});
  await p.evaluate(()=>{ const c=document.querySelector('.card');
    c.style.width='1200px'; c.style.height='630px'; c.style.padding='62px 76px';
    document.querySelector('h1').style.fontSize='86px';
    document.querySelector('.mk').style.width='94px';
    document.querySelector('.mk').style.height='94px';
    document.querySelector('.trace').style.height='128px'; });
  await p.waitForTimeout(600);
  await (await p.$('.card')).screenshot({ path:'brand/CVRN-OS-card-1200x630.jpg', type:'jpeg', quality:92 });
  await b.close();
})();
