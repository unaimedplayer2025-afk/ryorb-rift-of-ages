const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const d = await b.newPage(); const errs = [];
  d.on('pageerror', e => errs.push(String(e))); d.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await d.goto('file:///workspace/time-portal/index.html?demo'); await d.waitForTimeout(500);
  for (let s = 0; s < 40; s++) {
    const st = await d.evaluate(() => { for (let i = 0; i < 180; i++) __game.step(); const g = __game.G; return g && g.enemies && { mode: __game.mode, x: Math.round(__game.P.x), y: Math.round(__game.P.y), climb: !!__game.P.climb, hp: __game.P.hp, era: g.era, portals: g.portals, boss: g.boss && g.boss.hp, sc: g.score, en: g.enemies.length }; });
    console.log(s * 3 + 's', JSON.stringify(st));
    if (st && st.mode && st.mode !== 'play' && s > 2) break;
  }
  console.log('ERR', errs); await b.close();
})();
