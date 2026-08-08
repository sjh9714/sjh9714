"""폰트에서 글리프 정보를 뽑는다.

두 가지 용도가 있다.

  paths     배너 글자를 SVG 패스로 — textLength의 사파리 버그를 피해 외곽선을 직접 그린다
  advances  ASCII 어드밴스 표만 — 뱃지 칩의 폭을 순수 JS로 계산하려고 쓴다
            (라벨 폭을 모르면 칩을 못 그리는데, 여기서도 textLength는 쓰지 않는다)

사용:
  python extract-glyphs.py paths    <font.woff2> assets/banner-glyphs.json
  python extract-glyphs.py advances <font.woff2> assets/advances-ascii.json
"""
import json
import sys

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

mode, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]

font = TTFont(src)
upm = font["head"].unitsPerEm
glyphset = font.getGlyphSet()
cmap = font.getBestCmap()

if mode == "paths":
    chars = "".join(chr(c) for c in range(0x41, 0x5B)) + " —·"
elif mode == "advances":
    chars = "".join(chr(c) for c in range(0x20, 0x7F))
else:
    raise SystemExit(f"모르는 모드: {mode}")

out = {"unitsPerEm": upm, "glyphs": {}}
missing = []
for ch in chars:
    gname = cmap.get(ord(ch))
    if gname is None:
        missing.append(ch)
        continue
    glyph = glyphset[gname]
    entry = {"adv": glyph.width}
    if mode == "paths":
        pen = SVGPathPen(glyphset)
        glyph.draw(pen)
        entry["path"] = pen.getCommands()
    out["glyphs"][ch] = entry

json.dump(out, open(dst, "w"))
print(f"{mode}: unitsPerEm={upm}, 글리프 {len(out['glyphs'])}개" + (f", 없음 {missing}" if missing else ""))
