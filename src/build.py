# Builds ../index.html from game.html. The title theme (title-theme.ogg/.mp3) loads as separate files next to index.html.
# No in-game music ships; to embed one, drop soundtrack.ogg (+ optional soundtrack.mp3) next to index.html
# and run:  python3 build.py --embed-music
import base64, pathlib, sys
d = pathlib.Path(__file__).resolve().parent.parent
src = (d / 'src/game.html').read_text()
tag = ''
if '--embed-music' in sys.argv:
    def uri(p, mime): return 'data:%s;base64,%s' % (mime, base64.b64encode(p.read_bytes()).decode())
    ogg, mp3 = d / 'soundtrack.ogg', d / 'soundtrack.mp3'
    tag = '<script>window.SOUNDTRACK_URL=%r;%s</script>' % (uri(ogg, 'audio/ogg'), ('window.SOUNDTRACK_FALLBACK_URL=%r;' % uri(mp3, 'audio/mpeg')) if mp3.exists() else '')
(d / 'index.html').write_text(src.replace('<!--MUSIC-->', tag))
print('built', (d / 'index.html').stat().st_size, 'bytes')
