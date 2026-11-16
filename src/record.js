// Records the ?demo autopilot run to /tmp/vid/*.webm and grabs screenshots along the way.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 960, height: 540 }, recordVideo: { dir: '/tmp/vid', size: { width: 960, height: 540 } } });
  const d = await ctx.newPage(); const errs = [];
  d.on('pageerror', e => errs.push(String(e))); d.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const t0 = Date.now();
  await d.goto('file:///workspace/time-portal/index.html?demo');
  const shots = {}; let endAt = 0;
  while (Date.now() - t0 < 100000) {
    await d.waitForTimeout(200);
    const st = await d.evaluate(() => { const g = __game.G, p = __game.P; return { mode: __game.mode, parts: g && g.parts ? g.parts.length : 0, en: g && g.enemies ? g.enemies.length : 0, era: g && g.era, portals: g && g.portals, boss: g && g.boss ? g.boss.hp : null, y: p ? p.y : 0, climb: p && !!p.climb }; });
    const el = ((Date.now() - t0) / 1000).toFixed(1);
    if (!shots.title && st.mode === 'title' && Date.now() - t0 > 1200) { await d.screenshot({ path: '/tmp/s_title.png' }); shots.title = el; }
    if (!shots.game && st.mode === 'play' && st.parts > 30 && st.en >= 1 && st.y < 1300) { await d.screenshot({ path: '/tmp/s_game.png' }); shots.game = el; }
    if (!shots.climb && st.climb && st.y < 1250) { await d.screenshot({ path: '/tmp/s_climb.png' }); shots.climb = el; }
    if (!shots.fut && st.era === 2098 && st.en >= 1 && st.parts > 20) { await d.screenshot({ path: '/tmp/s_fut.png' }); shots.fut = el; }
    if (!shots.e85 && st.era === 1985 && st.portals >= 2 && st.en >= 1) { await d.screenshot({ path: '/tmp/s_85.png' }); shots.e85 = el; }
    if (!shots.boss && st.boss != null && st.boss < 20) { await d.screenshot({ path: '/tmp/s_boss.png' }); shots.boss = el; }
    if (st.mode === 'clear' && !endAt) endAt = Date.now();
    if (endAt && Date.now() - endAt > 3500) { await d.screenshot({ path: '/tmp/s_clear.png' }); shots.clear = el; break; }
  }
  console.log('elapsed', (Date.now() - t0) / 1000, JSON.stringify(shots), 'errors', errs);
  const v = d.video(); await ctx.close(); console.log('video', await v.path()); await b.close();
})();
