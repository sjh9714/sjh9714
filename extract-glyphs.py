"""배너 글자를 SVG 패스로 추출 — textLength의 사파리 버그를 피해 외곽선을 직접 그린다."""
import json, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

font = TTFont(sys.argv[1])
upm = font["head"].unitsPerEm
glyphset = font.getGlyphSet()
cmap = font.getBestCmap()

out = {"unitsPerEm": upm, "glyphs": {}}
for ch in "SUNGJIHYK— ":
    gname = cmap.get(ord(ch))
    if gname is None:
        print(f"글리프 없음: {ch!r}", file=sys.stderr); continue
    glyph = glyphset[gname]
    pen = SVGPathPen(glyphset)
    glyph.draw(pen)
    out["glyphs"][ch] = {"path": pen.getCommands(), "adv": glyph.width}

json.dump(out, open(sys.argv[2], "w"))
print(f"unitsPerEm={upm}, glyphs={list(out['glyphs'].keys())}")
