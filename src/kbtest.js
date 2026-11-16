// Smoke test without autopilot: keyboard start/climb/attack/jump/mute, a portal warp, and the touch buttons.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const errs = [];
  const p = await b.newPage({ viewport: { width: 960, height: 540 } });
  p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file:///workspace/time-portal/index.html'); await p.waitForTimeout(500);
  await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  const r = await p.evaluate(() => { const rp = __game.LEVEL.ropes[0], P = __game.P; P.x = rp.x; P.y = rp.y2 + 3; P.vy = 0; __game.G.enemies.length = 0; return { x: rp.x, y1: rp.y1, y2: rp.y2 }; });
  await p.waitForTimeout(200); await p.keyboard.down('ArrowUp'); await p.waitForTimeout(2300); await p.keyboard.up('ArrowUp'); await p.waitForTimeout(300);
  const climbed = await p.evaluate(() => ({ y: __game.P.y, onGround: __game.P.onGround }));
  for (let i = 0; i < 3; i++) { await p.keyboard.press('KeyZ'); await p.waitForTimeout(250); await p.keyboard.down('Space'); await p.waitForTimeout(250); await p.keyboard.up('Space'); }
  const era0 = await p.evaluate(() => __game.G.era);
  await p.evaluate(() => { const pt = __game.LEVEL.portals.find(q => !q.used); __game.P.x = pt.x; __game.P.y = pt.plat.y; __game.P.vy = 0; });
  await p.waitForTimeout(300); const era1 = await p.evaluate(() => ({ era: __game.G.era, portals: __game.G.portals }));
  await p.keyboard.press('KeyM'); await p.waitForTimeout(100); const muted = await p.evaluate(() => Snd.muted);
  // touch
  const t = await b.newPage({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true });
  t.on('pageerror', e => errs.push(String(e)));
  await t.goto('file:///workspace/time-portal/index.html'); await t.waitForTimeout(400);
  await t.tap('.tb[data-a="jump"]'); await t.waitForTimeout(300);
  const tm = await t.evaluate(() => __game.mode);
  const x0 = await t.evaluate(() => __game.P.x);
  await t.dispatchEvent('.tb[data-a="right"]', 'pointerdown'); await t.waitForTimeout(700); await t.dispatchEvent('.tb[data-a="right"]', 'pointerup');
  const x1 = await t.evaluate(() => __game.P.x); await t.screenshot({ path: '/tmp/touch.png' });
  console.log(JSON.stringify({ rope: r, climbed, era0, era1, muted, touchMode: tm, touchMoved: Math.round(x1 - x0), touchUI: await t.evaluate(() => document.body.classList.contains('touch')) }));
  console.log('ERR', errs); await b.close();
})();
