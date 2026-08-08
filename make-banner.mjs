/**
 * 프로필 배너 SVG 생성기 — sjh9714.vercel.app 히어로의 마키 문법을 프로필로 가져온다.
 *
 * 글자는 <text>가 아니라 **패스(외곽선)**다. 처음엔 폰트를 data URI로 심고
 * textLength로 폭을 고정했는데, 사파리가 textLength를 다르게 구현해 글리프가
 * 슬롯에 겹쳐 찍혔다(2026-08-08 실사용 제보). 외곽선은 폰트 로딩도 textLength도
 * 필요 없어 어느 브라우저에서든 같은 픽셀이 나오고, 문구 폭이 정확히 계산되므로
 * 마키 루프의 이음새도 수학으로 보장된다.
 *
 * 글리프 데이터: assets/banner-glyphs.json — Pretendard wght=500에서
 * fontTools SVGPathPen으로 추출 (extract-glyphs.py, 문구를 바꿀 때만 재추출).
 *
 * 색은 포트폴리오 규칙 그대로 — 라이트의 대시는 accent(#0016ec),
 * 다크의 대시는 반전 섹션에서만 쓰는 라임(#c1ff00).
 *
 * 사용: node make-banner.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const { unitsPerEm, glyphs } = JSON.parse(readFileSync("assets/banner-glyphs.json", "utf8"));

const PHRASE = "SUNG JINHYUK — ";
const FONT_SIZE = 150;
const BASELINE = 172;
const SPEED = 50; // px/s — 포트폴리오 마키와 같은 속도
const COPIES = 6; // 3벌 밀면 제자리 — 넓은 화면도 절반(3벌)이 덮는다

const s = FONT_SIZE / unitsPerEm;

/* 문구 한 벌을 패스 그룹으로 — 폭은 어드밴스 합이라 정확하다 */
function phraseGroup() {
  let x = 0;
  const parts = [];
  for (const ch of PHRASE) {
    const g = glyphs[ch];
    if (!g) throw new Error(`글리프 없음: ${ch}`);
    if (g.path) {
      // 폰트 좌표는 y가 위로 자라므로 scale(s,-s)로 뒤집어 베이스라인에 얹는다
      const cls = ch === "—" ? ` class="dash"` : "";
      parts.push(
        `<path${cls} transform="translate(${x.toFixed(1)} ${BASELINE}) scale(${s.toFixed(5)} ${-s.toFixed(5)})" d="${g.path}"/>`,
      );
    }
    x += g.adv * s;
  }
  return { markup: parts.join(""), width: x };
}

const { markup, width } = phraseGroup();
const shift = width * (COPIES / 2); // 절반만큼 밀면 같은 그림
const dur = (shift / SPEED).toFixed(1);

const svg = ({ fg, dash }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230" role="img" aria-label="Sung Jinhyuk">
  <style>
    .track { animation: slide ${dur}s linear infinite; }
    @keyframes slide { to { transform: translateX(-${shift.toFixed(1)}px); } }
    @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
    .dash { fill: ${dash}; }
  </style>
  <defs><g id="ph" fill="${fg}">${markup}</g></defs>
  <g class="track">
    ${Array.from({ length: COPIES }, (_, i) => `<use href="#ph" x="${(i * width).toFixed(1)}"/>`).join("\n    ")}
  </g>
</svg>
`;

writeFileSync("assets/banner-light.svg", svg({ fg: "#0a0b0d", dash: "#0016ec" }));
writeFileSync("assets/banner-dark.svg", svg({ fg: "#f0f1fa", dash: "#c1ff00" }));
console.log(`banner 생성 — 문구 폭 ${width.toFixed(1)}px · 루프 ${shift.toFixed(0)}px/${dur}s`);
