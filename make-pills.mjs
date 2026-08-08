/**
 * 링크 필 버튼 SVG — sjh9714.vercel.app 푸터의 pill-fill 모양을 정적으로 옮긴다.
 * (README의 <img>에는 호버가 없으므로 채움 애니메이션은 없다 — 모양과 타이포만)
 *
 * 사용: node make-pills.mjs  (정적 자산 — 라벨을 바꿀 때만 다시 실행)
 */
import { readFileSync, writeFileSync } from "node:fs";

const font = readFileSync("assets/stats-font.woff2").toString("base64");

const PILLS = [
  { name: "portfolio", label: "PORTFOLIO", width: 200 },
  { name: "blog", label: "BLOG", width: 132 },
  { name: "email", label: "EMAIL", width: 140 },
];

const THEMES = {
  light: { fg: "#0a0b0d", border: "rgba(10,11,13,0.55)" },
  dark: { fg: "#f0f1fa", border: "rgba(240,241,250,0.45)" },
};

const svg = ({ label, width }, t) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 56" role="img" aria-label="${label}">
  <style>
    @font-face { font-family: "P"; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 500; }
    text { font-family: "P", Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 3px; fill: ${t.fg}; }
  </style>
  <rect x="1" y="1" width="${width - 2}" height="54" rx="27" fill="none" stroke="${t.border}" stroke-width="1.5"/>
  <text x="${width / 2 + 1.5}" y="33.5" text-anchor="middle">${label}</text>
</svg>
`;

for (const pill of PILLS)
  for (const [name, t] of Object.entries(THEMES))
    writeFileSync(`assets/pill-${pill.name}-${name}.svg`, svg(pill, t));
console.log("필 버튼 6종 생성");
