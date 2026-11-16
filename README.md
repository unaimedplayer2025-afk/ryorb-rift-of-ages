# RyOrb: Rift of Ages (1985 // 2098)

A Rygar-style vertical climbing action game in a single self-contained HTML file (canvas, procedural pixel art, WebAudio SFX, no dependencies).

**Play:** https://unaimedplayer2025-afk.github.io/ryorb-rift-of-ages/ · **Attract mode:** add `?demo`

RyOrb, a scarred cyborg warrior with a red mechanical arm and leg, climbs a tower that tears between a neon synthwave 1985 arcade city and a ruined, burning machine war zone in 2098. Hunt the 5 time portals, smash hunter drones and chrome sentinel units with your spinning spiked disc-shield on a chain, and destroy the OMEGA SENTINEL at the summit.

## Controls
- Arrows / WASD: move, Up/Down climb chains and cables
- Z / J: throw the disc (hold Up for a high shot)
- X / K / Space: jump
- M: mute, P: pause
- On-screen touch buttons on phones and tablets

## Soundtrack hook
No music ships. Set `window.SOUNDTRACK_URL` (and optionally `window.SOUNDTRACK_FALLBACK_URL`) before the game script, or drop `soundtrack.ogg`/`soundtrack.mp3` next to the page and run `python3 src/build.py --embed-music`.

## Dev
`src/game.html` is the source; `python3 src/build.py` writes `index.html`. `src/*.js` are Playwright smoke tests and the demo recorder.

All characters, names and art are original.
