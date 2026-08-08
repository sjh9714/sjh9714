/**
 * 프로필 배너 SVG 생성기 — sjh9714.vercel.app 히어로의 마키 문법을 프로필로 가져온다.
 *
 * 외부 요청 없음: 폰트는 Pretendard를 wght=500으로 고정해 배너 글자만 남긴
 * 2.3KB 서브셋(assets/banner-font.woff2)을 data URI로 심는다.
 * GitHub는 SVG를 <img>로 서빙하므로 외부 폰트·스크립트는 어차피 로드되지 않는다.
 *
 * 이음새 없는 루프: textLength로 절반 폭을 2,500으로 강제하고 같은 텍스트를
 * 두 벌 이어 -2,500px까지 민다 — 시스템 폰트로 폴백돼도 폭이 고정이라 루프가 안 끊긴다.
 * prefers-reduced-motion이면 SVG 안에서 멈춘다.
 *
 * 색은 포트폴리오 규칙 그대로 — 라이트의 대시는 accent(#0016ec),
 * 다크의 대시는 반전 섹션에서만 쓰는 라임(#c1ff00).
 *
 * 사용: node make-banner.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const font = readFileSync("assets/banner-font.woff2").toString("base64");

const HALF = 2500; // 문구 두 번의 강제 폭 — 어떤 화면 폭도 덮는다
const SPEED = 50; // px/s, 포트폴리오 마키와 같은 속도

const phrase = (dash) =>
  `SUNG JINHYUK<tspan fill="${dash}"> — </tspan>SUNG JINHYUK<tspan fill="${dash}"> — </tspan>`;

const svg = ({ fg, dash }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230" role="img" aria-label="Sung Jinhyuk">
  <style>
    @font-face {
      font-family: "PretendardBanner";
      src: url(data:font/woff2;base64,${font}) format("woff2");
      font-weight: 500;
    }
    text {
      font-family: "PretendardBanner", Helvetica, Arial, sans-serif;
      font-size: 150px;
      font-weight: 500;
      fill: ${fg};
    }
    .track { animation: slide ${HALF / SPEED}s linear infinite; }
    @keyframes slide { to { transform: translateX(-${HALF}px); } }
    @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
  </style>
  <g class="track">
    <text x="0" y="172" textLength="${HALF}" lengthAdjust="spacing">${phrase(dash)}</text>
    <text x="${HALF}" y="172" textLength="${HALF}" lengthAdjust="spacing">${phrase(dash)}</text>
  </g>
</svg>
`;

writeFileSync("assets/banner-light.svg", svg({ fg: "#0a0b0d", dash: "#0016ec" }));
writeFileSync("assets/banner-dark.svg", svg({ fg: "#f0f1fa", dash: "#c1ff00" }));
console.log("banner-light.svg / banner-dark.svg 생성");
