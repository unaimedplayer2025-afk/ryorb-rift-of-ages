// Steps the ?demo autopilot deterministically-ish and saves frames at chosen step counts.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const d = await b.newPage({ viewport: { width: 960, height: 540 } }); const errs = [];
  d.on('pageerror', e => errs.push(String(e)));
  await d.goto('file:///workspace/time-portal/index.html?demo'); await d.waitForTimeout(300);
  const at = (process.argv[2] || '600,1000,1500,2000').split(',').map(Number); let done = 0;
  for (const n of at) { await d.evaluate(k => { for (let i = 0; i < k; i++) __game.step(); }, n - done); done = n; await d.waitForTimeout(80);
    const st = await d.evaluate(() => ({ era: __game.G.era, y: Math.round(__game.P.y), en: __game.G.enemies.length })); await d.screenshot({ path: `/tmp/f_${n}.png` }); console.log(n, JSON.stringify(st)); }
  console.log('ERR', errs); await b.close();
})();
