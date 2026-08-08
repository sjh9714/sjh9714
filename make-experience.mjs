/**
 * 경험 로그 SVG — 소개글의 경험 목록을 계기판과 같은 디자인 언어로 그린다.
 * 마크다운 목록은 GitHub 기본 타이포라 프로필의 다른 자산과 결이 달랐다.
 *
 * 내용의 각 주장(단독 구현·커밋 91%)은 포트폴리오 claim boundary와 같은 값만 쓴다.
 * 한글이 들어가므로 전용 서브셋(assets/experience-font.woff2)을 쓴다 —
 * 여기 문구를 바꾸면 서브셋도 다시 만들 것: node make-experience.mjs --subset
 *
 * 사용: node make-experience.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

/*
 * 한 열은 한 가지만 말한다.
 *
 * title  — 프로그램·행사. 전부 같은 종류여야 훑을 때 눈이 걸리지 않는다.
 *          전에는 제품명(FINMATE)과 행사명(GGUM HACKATHON)이 섞여 있었다.
 * badges — 주최·소속과 규모. 제목에 욱여넣던 것을 칩으로 뺐다(ASCII만 — 폭을
 *          assets/advances-ascii.json의 어드밴스로 계산하므로).
 * desc   — 거기서 만든 것과 내 몫. 제품명은 여기 앞에 온다.
 */
const ROWS = [
  {
    year: "NOW",
    title: "BACKEND PORTFOLIO · AGENT TOOLS",
    badges: [],
    desc: "모든 수치가 부하 테스트 근거로 연결되는 Java·Spring 포트폴리오, AI 코딩 에이전트를 감시하는 도구들",
  },
  {
    year: "2026",
    title: "YOUTH FINANCE TALENT PROGRAM",
    badges: ["HANA FINANCIAL GROUP", "FSS"],
    desc: "FinMate — 청년 금융 온보딩 앱과 Spring Boot 백엔드 단독 구현, 화면의 모든 수치는 거래 원장에서 파생",
  },
  {
    year: "2026",
    title: "TECH4GOOD HACKATHON",
    badges: ["HANA", "SK TELECOM", "24H"],
    desc: "My ETA — 표준 보행속도가 틀리는 사람들을 위한 길찾기, 저장소 커밋의 91%",
  },
  {
    year: "2024",
    // 제품(BorrowMe)은 지금 이어지지 않는다. 이 줄이 말하는 것은 그때의 경험이다.
    title: "GGUM HACKATHON",
    badges: ["11-PERSON TEAM", "2 DAYS"],
    desc: "첫 백엔드 팀 프로젝트(교내 물품 대여) — 댓글·답글 알림과 REST 전환, 프론트 연동·시연",
  },
  {
    year: "2024",
    title: "LIKELION 12TH",
    badges: ["CUK", "BACKEND"],
    desc: "아이디어톤 · 중앙해커톤 참가 — 편지 서비스 백엔드 커밋 최다",
  },
];

/* --subset: 위 문구의 글자만 담은 서브셋을 다시 만든다 (uv 필요) */
if (process.argv.includes("--subset")) {
  const chars = new Set();
  for (let c = 0x20; c <= 0x7e; c += 1) chars.add(String.fromCodePoint(c));
  for (const r of ROWS) for (const ch of r.year + r.title + r.desc + r.badges.join("")) chars.add(ch);
  chars.add("·");
  execFileSync("uvx", [
    "--from", "fonttools", "--with", "brotli", "pyftsubset",
    "../pretendard-500.woff2",
    `--text=${[...chars].join("")}`,
    "--flavor=woff2", "--layout-features=*",
    "--output-file=assets/experience-font.woff2",
  ]);
  console.log("experience-font.woff2 재생성");
}

const font = readFileSync("assets/experience-font.woff2").toString("base64");

/*
 * 뱃지 칩은 라벨 폭을 알아야 그린다. textLength는 쓰지 않는다 — 배너에서 사파리가
 * 글리프를 겹쳐 찍은 원인이 그것이었다. 대신 어드밴스 표로 직접 잰다.
 * 표는 extract-glyphs.py가 뽑는다: python extract-glyphs.py advances <폰트> assets/advances-ascii.json
 */
const { unitsPerEm, glyphs } = JSON.parse(readFileSync("assets/advances-ascii.json", "utf8"));
const BADGE = { fs: 11, ls: 1.6, pad: 11, h: 22, gap: 7 };
const textW = (s, fs, ls) =>
  [...s].reduce((a, c) => a + (glyphs[c]?.adv ?? 0), 0) * (fs / unitsPerEm) +
  Math.max(0, s.length - 1) * ls;
const badgeW = (label) => textW(label, BADGE.fs, BADGE.ls) + BADGE.pad * 2;

const THEMES = {
  light: { fg: "#0a0b0d", muted: "#5a5f6e", line: "#0a0b0d", sep: "#dcdee8", accent: "#0016ec", chip: "rgba(10,11,13,0.45)" },
  dark: { fg: "#f0f1fa", muted: "#9aa1b4", line: "rgba(240,241,250,0.7)", sep: "rgba(240,241,250,0.14)", accent: "#c1ff00", chip: "rgba(240,241,250,0.38)" },
};

const W = 1200;
const ROW_H = 82;
const TOP = 46;
const H = TOP + ROWS.length * ROW_H + 6;

/** 제목 오른쪽에 뱃지를 늘어놓는다 */
function badgeRow(labels, x, cy, t) {
  let cursor = x;
  return labels
    .map((label) => {
      const w = badgeW(label);
      const g = `<g><rect x="${cursor.toFixed(1)}" y="${(cy - BADGE.h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${BADGE.h}" rx="${BADGE.h / 2}" fill="none" stroke="${t.chip}" stroke-width="1"/><text x="${(cursor + BADGE.pad).toFixed(1)}" y="${(cy + 4).toFixed(1)}" class="badge">${label}</text></g>`;
      cursor += w + BADGE.gap;
      return g;
    })
    .join("");
}

function svg(t) {
  const rows = ROWS.map((r, i) => {
    const y = TOP + i * ROW_H;
    const badges = r.badges.length
      ? badgeRow(r.badges, 128 + textW(r.title, 15.5, 0.8) + 16, y + 29, t)
      : "";
    return `<g>
    ${i > 0 ? `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${t.sep}" stroke-width="1"/>` : ""}
    <text x="0" y="${y + 40}" class="year">${r.year}</text>
    <text x="128" y="${y + 34}" class="title">${r.title}</text>${badges}
    <text x="128" y="${y + 62}" class="desc">${r.desc}</text>
  </g>`;
  }).join("\n  ");
  // 라벨은 ROWS에서 만든다 — 손으로 적으면 행을 고칠 때마다 조용히 어긋난다
  const label = ROWS.map(
    (r) => `${r.year} ${r.title}${r.badges.length ? ` (${r.badges.join(", ")})` : ""}: ${r.desc}`,
  ).join(" / ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img"
  aria-label="경험 — ${label}">
<style>
@font-face{font-family:"P";src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:500}
text{font-family:"P","Pretendard",-apple-system,"Apple SD Gothic Neo","Malgun Gothic",Helvetica,Arial,sans-serif}
.lbl{font-size:11.5px;letter-spacing:2px;fill:${t.muted}}
.year{font-size:24px;font-weight:500;letter-spacing:-0.3px;fill:${t.accent}}
.title{font-size:15.5px;font-weight:500;letter-spacing:0.8px;fill:${t.fg}}
.desc{font-size:13.5px;letter-spacing:0.1px;fill:${t.muted}}
.badge{font-size:${BADGE.fs}px;font-weight:500;letter-spacing:${BADGE.ls}px;fill:${t.muted}}
</style>
<rect x="0" y="0" width="${W}" height="2" fill="${t.line}"/>
<text x="0" y="28" class="lbl">EXPERIENCE · SHIPPED WITH TEAMS</text>
${rows}
</svg>
`;
}

for (const [name, t] of Object.entries(THEMES)) writeFileSync(`assets/experience-${name}.svg`, svg(t));

// 뱃지가 캔버스를 넘으면 잘려 나간다. 조용히 잘리지 않게 여기서 잡는다.
for (const r of ROWS) {
  if (!r.badges.length) continue;
  const end =
    128 + textW(r.title, 15.5, 0.8) + 16 + r.badges.reduce((a, b) => a + badgeW(b) + BADGE.gap, 0);
  if (end > W) throw new Error(`뱃지가 캔버스(${W})를 넘는다 — ${r.title} 끝 x=${end.toFixed(0)}`);
}
console.log(`experience 생성 — ${ROWS.length}행, 뱃지 ${ROWS.reduce((a, r) => a + r.badges.length, 0)}개`);
