/**
 * 프로필 배너 SVG 생성기 — sjh9714.vercel.app 히어로의 마키 문법을 프로필로 가져온다.
 *
 * 두 줄이다. 작은 역할 라벨이 먼저 오고, 그 아래로 이름이 무한히 흐른다.
 * 라벨은 원래 리드미의 맨텍스트 소개 두 줄이 하던 일을 대신한다 — 위아래가 전부
 * 설계된 SVG인데 거기만 GitHub 기본 타이포라 유일하게 튀는 블록이었다.
 * 문구는 포트폴리오 사이트 히어로의 라벨과 같은 사실이라 두 화면이 같은 말을 한다.
 *
 * 글자는 <text>가 아니라 **패스(외곽선)**다. 처음엔 폰트를 data URI로 심고
 * textLength로 폭을 고정했는데, 사파리가 textLength를 다르게 구현해 글리프가
 * 슬롯에 겹쳐 찍혔다(2026-08-08 실사용 제보). 외곽선은 폰트 로딩도 textLength도
 * 필요 없어 어느 브라우저에서든 같은 픽셀이 나오고, 문구 폭이 정확히 계산되므로
 * 마키 루프의 이음새도 수학으로 보장된다.
 *
 * 글리프 데이터: assets/banner-glyphs.json — Pretendard wght=500에서
 * fontTools로 추출한다. 문구에 새 글자를 쓰면 다시 뽑을 것:
 *   uvx --from fonttools --with brotli python extract-glyphs.py paths <폰트> assets/banner-glyphs.json
 *
 * 색은 포트폴리오 규칙 그대로 — 라이트의 대시는 accent(#0016ec),
 * 다크의 대시는 반전 섹션에서만 쓰는 라임(#c1ff00).
 *
 * 사용: node make-banner.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const { unitsPerEm, glyphs } = JSON.parse(readFileSync("assets/banner-glyphs.json", "utf8"));

const PHRASE = "SUNG JINHYUK — ";
const SUB = "BACKEND ENGINEER · JAVA · SPRING";
const NAME_SIZE = 150;
const SUB_SIZE = 24;
const SUB_LS = 4.4;
const SPEED = 50; // px/s — 포트폴리오 마키와 같은 속도
const COPIES = 6; // 3벌 밀면 제자리 — 넓은 화면도 절반(3벌)이 덮는다

/*
 * 세로 배치. 대문자만 쓰므로 디센더가 없어 아래를 바짝 붙일 수 있다.
 * 처음엔 이름 위아래로 60px씩 뒀는데 빈 공간이 너무 컸다.
 *
 * 라벨 크기는 캔버스 폭 기준으로 잡을 것. 1200px 캔버스를 GitHub이 830px로 줄여
 * 그리므로 여기 15px는 화면에서 10px가 되고, 창이 좁으면 7px까지 떨어져 안 보인다.
 * 24px는 830px 지면에서 약 17px로 본문과 같은 급이 된다.
 */
const SUB_BASELINE = 38;
const NAME_BASELINE = 186;
const HEIGHT = 214;
const WIDTH = 1200;

/** 글자열을 패스 그룹으로 굽는다. 폭은 어드밴스 합이라 정확하다 */
function run(text, size, ls, baseline, dashColor) {
  const k = size / unitsPerEm;
  let x = 0;
  const parts = [];
  for (const ch of text) {
    const g = glyphs[ch];
    if (!g) throw new Error(`글리프 없음: ${JSON.stringify(ch)} — extract-glyphs.py의 charset을 넓힐 것`);
    if (g.path) {
      // 폰트 좌표는 y가 위로 자라므로 scale(k,-k)로 뒤집어 베이스라인에 얹는다
      const fill = ch === "—" && dashColor ? ` fill="${dashColor}"` : "";
      parts.push(
        `<path${fill} transform="translate(${x.toFixed(1)} ${baseline}) scale(${k.toFixed(5)} ${(-k).toFixed(5)})" d="${g.path}"/>`,
      );
    }
    x += g.adv * k + ls;
  }
  return { markup: parts.join(""), width: x };
}

const svg = ({ bg, fg, dash, sub }) => {
  const name = run(PHRASE, NAME_SIZE, 0, NAME_BASELINE, dash);
  const label = run(SUB, SUB_SIZE, SUB_LS, SUB_BASELINE, null);
  const shift = name.width * (COPIES / 2); // 절반만큼 밀면 같은 그림
  const dur = (shift / SPEED).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Sung Jinhyuk — ${SUB}">
  <style>
    .track { animation: slide ${dur}s linear infinite; }
    @keyframes slide { to { transform: translateX(-${shift.toFixed(1)}px); } }
    @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
  </style>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${bg}"/>
  <defs><g id="ph" fill="${fg}">${name.markup}</g></defs>
  <g fill="${sub}">${label.markup}</g>
  <g class="track">
    ${Array.from({ length: COPIES }, (_, i) => `<use href="#ph" x="${(i * name.width).toFixed(1)}"/>`).join("\n    ")}
  </g>
</svg>
`;
};

writeFileSync("assets/banner-light.svg", svg({ bg: "#ffffff", fg: "#0a0b0d", dash: "#0016ec", sub: "#5a5f6e" }));
writeFileSync("assets/banner-dark.svg", svg({ bg: "#0d1117", fg: "#f0f1fa", dash: "#c1ff00", sub: "#9aa1b4" }));
console.log(`banner 생성 — ${WIDTH}×${HEIGHT} · 라벨 "${SUB}"`);
