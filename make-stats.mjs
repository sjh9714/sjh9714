/**
 * 활동 계기판·그래프 SVG 생성기 — GitHub Action이 매일 실행한다 (stats.yml).
 *
 * 기성 위젯을 쓰지 않는 이유: 이 프로필의 다른 자산(배너·필 버튼)과 같은
 * 디자인 언어(팔레트 · 타이포)를 지키기 위해서다.
 *
 * 그래프는 두 장면이 번갈아 나온다 — 텔레메트리 스윕(오실로스코프)이 라인을
 * 다 그리면 연속용지 플로터가 하루 한 줄씩 인쇄하고, 다시 스윕으로 돌아온다.
 * 34초 마스터 타임라인 하나에 모든 키프레임을 물려 위상이 어긋나지 않는다.
 * 애니메이션은 전부 CSS(SMIL 금지) — prefers-reduced-motion이면 완성된
 * 텔레메트리 정지 화면 하나만 보인다. 세로축은 √ 스케일이고 라벨에 명시한다
 * (피크가 수백이라 선형이면 평일 커밋이 바닥에 붙는다).
 *
 * 데이터 소스와 정직성 규칙
 * - GitHub: GraphQL contributionCalendar. **모양을 그리는 데만** 쓴다.
 *   기여 수·스트릭은 계기판에서 뺐다 — GitHub의 표면끼리도 값이 어긋나
 *   맞출 수가 없다(dashboard 주석에 실측 네 값을 남겨 뒀다).
 * - 백준: solved.ac API를 먼저 시도(티어 int까지 얻음). Cloudflare에 막히면
 *   mazassumnida 뱃지 SVG에서 rating·solved·진행표시를 파싱하고, 티어는
 *   solved.ac 공식 경계표(help.solved.ac/en/stats/ac-rating)로 환산하되
 *   뱃지의 진행표시 분모(다음 티어 경계)와 어긋나면 싣지 않는다 — 추정 금지.
 * - 프로그래머스: 공개 API가 없어 사용자가 직접 셋업한 programmers-badge
 *   저장소의 result.svg를 파싱한다. 없거나 못 읽으면 백준 solved 칩으로 폴백.
 *
 * 사용: GITHUB_TOKEN=... node make-stats.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const GITHUB_LOGIN = "sjh9714";
const BOJ_HANDLE = "jinhyuk9714";
const PROGRAMMERS_SVG_URL = `https://raw.githubusercontent.com/${GITHUB_LOGIN}/programmers-badge-v1/master/static/result.svg`;
const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) throw new Error("GITHUB_TOKEN이 필요하다");

const font = readFileSync("assets/stats-font.woff2").toString("base64");

/* ── 팔레트: sjh9714.vercel.app globals.css와 같은 값 ── */
const THEMES = {
  light: {
    bg: "#ffffff", fg: "#0a0b0d", muted: "#5a5f6e", line: "#0a0b0d", grid: "#dcdee8",
    accent: "#0016ec", paper: "#ffffff", paperEdge: "#dcdee8", band: "rgba(0,22,236,0.045)",
    glow: false,
  },
  dark: {
    bg: "#0d1117", fg: "#f0f1fa", muted: "#9aa1b4", line: "rgba(240,241,250,0.7)",
    grid: "rgba(240,241,250,0.13)", accent: "#c1ff00", paper: "#14171c",
    paperEdge: "rgba(240,241,250,0.18)", band: "rgba(193,255,0,0.05)",
    glow: true, // 라임 CRT — 라임은 어두운 화면 전용이라는 포트폴리오 규칙
  },
};

const fontFace = `@font-face{font-family:"P";src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:500}
text{font-family:"P",Helvetica,Arial,sans-serif}`;
const reduce = `@media (prefers-reduced-motion: reduce){*{animation:none !important}}`;
const fmt = (n) => n.toLocaleString("en-US");
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

/* ── GitHub 잔디 데이터 ── */
async function fetchCalendar() {
  const query = `{ user(login: "${GITHUB_LOGIN}") { contributionsCollection {
    contributionCalendar { totalContributions weeks { contributionDays {
      date contributionCount contributionLevel } } } } } }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.user.contributionsCollection.contributionCalendar;
}

/**
 * 같은 답이 두 번 나올 때까지 읽는다.
 *
 * GitHub의 기여 API는 같은 요청에 다른 답을 준다. 2026-08-09에 같은 토큰으로 4초 간격
 * 표본 4개를 뽑았더니 하나가 8월 4일을 1이 아닌 0으로 줬고, 그 날이 스트릭 경계라
 * 12일이 5일로 바뀌었다(총 기여도 4,362 ↔ 4,363으로 흔들렸다). 계기판은 이 값을 매일
 * 커밋하므로, 한 번 읽고 믿으면 흔들린 값이 그대로 화면에 박힌다.
 *
 * 끝내 합의가 안 되면 갱신하지 않고 실패한다 — 틀린 값을 조용히 싣는 것보다 낫다.
 */
async function fetchCalendarStable(tries = 6, gapMs = 3000) {
  const seen = new Map();
  for (let i = 0; i < tries; i += 1) {
    const cal = await fetchCalendar();
    const days = cal.weeks.flatMap((w) => w.contributionDays);
    // 스트릭이 걸리는 꼬리 3주와 총합이 같으면 같은 답으로 본다
    const key = `${cal.totalContributions}|${days.slice(-21).map((d) => d.contributionCount).join(",")}`;
    if (seen.has(key)) return seen.get(key);
    seen.set(key, cal);
    if (i < tries - 1) await new Promise((r) => setTimeout(r, gapMs));
  }
  throw new Error(
    `기여 API가 ${tries}번 모두 다른 값을 줬다 — 오늘은 계기판을 갱신하지 않는다`,
  );
}

/* ── 백준 ── */
const TIER_NAMES = ["Unrated"];
for (const t of ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"])
  for (const n of ["V", "IV", "III", "II", "I"]) TIER_NAMES.push(`${t} ${n}`);
TIER_NAMES.push("Master");
/* help.solved.ac/en/stats/ac-rating의 공식 경계 — TIER_NAMES[i]의 시작 레이팅 */
const TIER_FLOOR = [0, 30, 60, 90, 120, 150, 200, 300, 400, 500, 650, 800, 950, 1100, 1250, 1400,
  1600, 1750, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2850, 2900, 2950, 3000];

async function fetchBoj() {
  try {
    const res = await fetch(`https://solved.ac/api/v3/user/show?handle=${BOJ_HANDLE}`, {
      headers: { Accept: "application/json", "User-Agent": "profile-stats (github.com/sjh9714)" },
    });
    if (res.ok && (res.headers.get("content-type") ?? "").includes("json")) {
      const u = await res.json();
      return { solved: u.solvedCount, rating: u.rating, tier: TIER_NAMES[u.tier] ?? null };
    }
  } catch {
    /* 폴백으로 */
  }
  const svg = await (
    await fetch(`https://mazassumnida.wtf/api/v2/generate_badge?boj=${BOJ_HANDLE}`)
  ).text();
  const num = (re) => {
    const m = svg.match(re);
    return m ? Number(m[1].replaceAll(",", "")) : null;
  };
  const solved = num(/class="solved value">([\d,]+)</);
  const rating = num(/class="rate value">([\d,]+)</);
  if (solved == null || rating == null) throw new Error("백준 수치를 어느 소스에서도 못 읽었다");
  // 공식 경계표로 환산하고, 뱃지가 표시하는 다음 경계(진행표시 분모)와 대조한다
  let idx = 0;
  while (idx + 1 < TIER_FLOOR.length && rating >= TIER_FLOOR[idx + 1]) idx += 1;
  const nextShown = num(/class="progress"[^>]*>[\d,]+ \/ ([\d,]+)</);
  const nextFloor = TIER_FLOOR[idx + 1] ?? null;
  const tier = nextShown != null && nextShown === nextFloor ? TIER_NAMES[idx] : null;
  return { solved, rating, tier };
}

/* ── 프로그래머스 — 포크한 programmers-badge-v1이 로그인해 만든 result.svg를 파싱 ── */
async function fetchProgrammers() {
  try {
    const res = await fetch(PROGRAMMERS_SVG_URL);
    if (!res.ok) return null;
    const svg = await res.text();
    // 포크 직후에는 원작자(JH8459)의 낡은 결과가 남아 있다 — 주인이 바뀌기 전엔 쓰지 않는다
    if (/class="title_id"[^>]*>\s*JH8459\s*</.test(svg)) return null;
    const m = svg.match(/>Score<\/text>[\s\S]{0,400}?class="value"[^>]*>([\d,]+)</);
    return m ? Number(m[1].replaceAll(",", "")) : null;
  } catch {
    return null;
  }
}

/* ── 계기판 ── */
const style = (t) => `
  ${fontFace}
  text { fill: ${t.fg}; }
  .value { font-size: 44px; font-weight: 500; letter-spacing: -0.5px; }
  .label { font-size: 11.5px; letter-spacing: 2px; fill: ${t.muted}; }
  .note { font-size: 10px; letter-spacing: 1px; fill: ${t.muted}; }`;

/*
 * 계기판은 **GitHub 밖 출처만** 싣는다.
 *
 * 전에는 기여 수와 스트릭이 앞 두 칸이었는데, 그 숫자를 맞출 방법이 없었다.
 * 2026-08-09에 같은 순간을 네 군데서 재보니 전부 달랐다 —
 * 프로필 위젯 4,971 · GraphQL(개인 토큰) 4,959 · GraphQL(Actions 토큰) 4,926 ·
 * 계기판에 박혀 있던 값 4,202. GitHub의 두 공식 표면끼리도 어긋나고,
 * API는 한동안 크게 틀린 값을 주기도 한다(4,202가 그것이다. 그날 기여는 35건뿐이라
 * 시차로 설명되지 않는다). 「같은 답 두 번」 가드는 깜빡임은 잡아도 이건 못 잡는다.
 *
 * 게다가 기여 수는 GitHub이 이 계기판 바로 아래에서 더 정확하게 그린다. 그래서
 * 우리 숫자는 정보를 더하지 않고 모순만 만들었다. GitHub 이야기는 GitHub에 맡긴다.
 */
function dashboard(t, { boj, programmers, date }) {
  // 티어를 검증 못 하면 그 칸은 비운다. 레이팅을 두 칸에 겹쳐 적지 않는다.
  const chips = [
    ...(boj.tier ? [{ value: boj.tier.toUpperCase(), label: "SOLVED.AC TIER" }] : []),
    { value: fmt(boj.rating), label: "SOLVED.AC RATING" },
    { value: fmt(boj.solved), label: "BAEKJOON SOLVED" },
    ...(programmers != null ? [{ value: fmt(programmers), label: "PROGRAMMERS SCORE" }] : []),
  ];
  const W = 1200;
  const n = chips.length;
  const gap = 40;
  const colW = (W - gap * (n - 1)) / n;
  const cols = chips
    .map((c, i) => {
      const x = i * (colW + gap);
      return `<g transform="translate(${x},0)">
    <rect x="0" y="0" width="${colW}" height="2" fill="${t.line}"/>
    <text x="0" y="66" class="value">${c.value}</text>
    <text x="0" y="98" class="label">${c.label}</text>
  </g>`;
    })
    .join("\n  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 132" role="img"
  aria-label="solved.ac ${boj.tier ?? ""} 레이팅 ${fmt(boj.rating)}, 백준 ${fmt(boj.solved)}문제 해결${programmers != null ? `, 프로그래머스 점수 ${fmt(programmers)}` : ""}">
  <style>${style(t)}</style>
  ${cols}
  <text x="${W}" y="128" text-anchor="end" class="note">UPDATED DAILY BY GITHUB ACTIONS · ${date}</text>
</svg>
`;
}

/* ── 그래프: 텔레메트리 ↔ 플로터 장면 전환 (34s 마스터 타임라인) ── */
/*
 * 그래프는 **모양만** 말한다. 합계를 찍지 않는다 —
 * 바로 아래 GitHub이 같은 기간의 잔디를 직접 그리는데 숫자가 서로 맞지 않기 때문이다
 * (위 dashboard 주석 참조). 하루치가 틀려도 1년 곡선의 모양은 흔들리지 않으므로,
 * 숫자를 주장하지 않으면 어긋날 것도 없다.
 */
function activity(t, days) {
  const W = 1200, H = 260;

  /* 장면 A — 텔레메트리 스윕 */
  const ax0 = 24, ax1 = 1176, aTop = 58, aBase = 214;
  const avg = days.map((_, i) => {
    const s = days.slice(Math.max(0, i - 6), i + 1);
    return s.reduce((a, d) => a + d.contributionCount, 0) / s.length;
  });
  const maxA = Math.max(...avg);
  const AX = (i) => ax0 + (i / (days.length - 1)) * (ax1 - ax0);
  const AY = (v) => aBase - Math.sqrt(v / maxA) * (aBase - aTop);
  const pts = avg.map((v, i) => `${AX(i).toFixed(1)} ${AY(v).toFixed(1)}`);
  const linePath = `M ${pts.join(" L ")}`;
  const areaPath = `${linePath} L ${ax1} ${aBase} L ${ax0} ${aBase} Z`;
  const peakI = days.reduce((m, d, i) => (d.contributionCount > days[m].contributionCount ? i : m), 0);
  const pd = new Date(days[peakI].date + "T00:00:00");
  const peakX = Math.min(Math.max(AX(peakI), 150), 1020);
  const months = days
    .flatMap((d, i) => (d.date.slice(8) === "01" ? [{ x: AX(i), m: MONTHS[Number(d.date.slice(5, 7)) - 1] }] : []))
    .filter((m) => m.x > 50 && m.x < 1150);
  const vGrid = months.map((m) => `<line x1="${m.x.toFixed(1)}" y1="${aTop - 8}" x2="${m.x.toFixed(1)}" y2="${aBase}" stroke="${t.grid}" stroke-width="1"/>`).join("");
  const hGrid = [0.25, 0.5, 0.75].map((f) => `<line x1="${ax0}" y1="${(aBase - f * (aBase - aTop)).toFixed(1)}" x2="${ax1}" y2="${(aBase - f * (aBase - aTop)).toFixed(1)}" stroke="${t.grid}" stroke-width="1" stroke-dasharray="2 5"/>`).join("");
  const glowLine = t.glow ? `<path d="${linePath}" fill="none" stroke="${t.accent}" stroke-width="6" opacity="0.35" filter="url(#blur)" pathLength="1000" class="draw"/>` : "";

  /* 장면 B — 연속용지 플로터 */
  const bx0 = 34, bx1 = 1166, bTop = 64, bBase = 206;
  const maxD = Math.max(...days.map((d) => d.contributionCount));
  const bw = (bx1 - bx0) / days.length;
  const bars = days
    .map((d, i) => {
      if (!d.contributionCount) return "";
      const h = Math.max(2, Math.sqrt(d.contributionCount / maxD) * (bBase - bTop));
      return `<rect x="${(bx0 + i * bw).toFixed(2)}" y="${(bBase - h).toFixed(1)}" width="${(bw * 0.72).toFixed(2)}" height="${h.toFixed(1)}" fill="${t.accent}"/>`;
    })
    .join("");
  const holes = [];
  for (let x = 30; x <= 1170; x += 38)
    holes.push(`<circle cx="${x}" cy="30" r="4.5" fill="${t.bg}" stroke="${t.paperEdge}"/><circle cx="${x}" cy="230" r="4.5" fill="${t.bg}" stroke="${t.paperEdge}"/>`);
  const bands = [];
  for (let y = bTop; y < bBase; y += 44) bands.push(`<rect x="${bx0}" y="${y}" width="${bx1 - bx0}" height="22" fill="${t.band}"/>`);
  const carriageTravel = bx1 - bx0;

  /*
   * 타임라인 — 34s 하나에 전부 물린다. 기본 상태(reduced-motion)는 A 완성본:
   * draw는 dashoffset 기본 0(완성), head·장면B는 기본 opacity 0.
   */
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img"
  aria-label="최근 12개월 기여 그래프 — 7일 평균 라인과 일별 인쇄 장면이 번갈아 나온다">
<style>${fontFace}
text{fill:${t.fg}}
.lbl{font-size:11px;letter-spacing:2px;fill:${t.muted}}
/* 서로 겹치지 않게 빈 화면을 잠깐 스치며 전환한다 — 겹치면 두 장면의 라벨이 이중 노출된다 */
.sceneA{animation:sA 34s linear infinite}
@keyframes sA{0%,45%{opacity:1}47.5%,97.5%{opacity:0}100%{opacity:1}}
.sceneB{opacity:0;animation:sB 34s linear infinite}
@keyframes sB{0%,47.5%{opacity:0}50%,95%{opacity:1}97.5%,100%{opacity:0}}
.draw{stroke-dasharray:1000;animation:draw 34s linear infinite}
@keyframes draw{0%{stroke-dashoffset:1000}32%,100%{stroke-dashoffset:0}}
.area{animation:area 34s linear infinite;transform-origin:${ax0}px 0;transform-box:view-box}
@keyframes area{0%{transform:scaleX(0)}32%,100%{transform:scaleX(1)}}
.head{opacity:0}
/* offset-path를 모르는 브라우저에서는 헤드 점이 (0,0)에 찍히므로 지원할 때만 움직인다 */
@supports (offset-path: path("M 0 0 L 1 1")) {
.head{offset-path:path("${linePath}");animation:run 34s linear infinite}
@keyframes run{0%{offset-distance:0%;opacity:1}32%{offset-distance:100%;opacity:1}34%,100%{offset-distance:100%;opacity:0}}
}
.print{animation:pr 34s linear infinite;transform-origin:${bx0}px 0;transform-box:view-box}
@keyframes pr{0%,52%{transform:scaleX(0)}84%,100%{transform:scaleX(1)}}
.carriage{animation:cr 34s linear infinite}
@keyframes cr{0%,52%{transform:translateX(0)}84%{transform:translateX(${carriageTravel}px);opacity:1}87%,100%{transform:translateX(${carriageTravel}px);opacity:0}}
${reduce}</style>
<defs><filter id="blur"><feGaussianBlur stdDeviation="4"/></filter>
<clipPath id="clipA"><rect x="${ax0}" y="0" width="${ax1 - ax0}" height="${H}" class="area"/></clipPath>
<clipPath id="clipB"><rect x="${bx0}" y="0" width="${bx1 - bx0}" height="${H}" class="print"/></clipPath></defs>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<g class="sceneA">
  ${vGrid}${hGrid}
  <line x1="${ax0}" y1="${aBase}" x2="${ax1}" y2="${aBase}" stroke="${t.fg}" stroke-width="1.5"/>
  <g clip-path="url(#clipA)"><path d="${areaPath}" fill="${t.accent}" opacity="0.08"/></g>
  ${glowLine}
  <path d="${linePath}" fill="none" stroke="${t.accent}" stroke-width="2.2" pathLength="1000" class="draw"/>
  <circle r="4" fill="${t.accent}" class="head"/>${t.glow ? `<circle r="9" fill="${t.accent}" opacity="0.3" filter="url(#blur)" class="head"/>` : ""}
  <circle cx="${AX(peakI).toFixed(1)}" cy="${AY(avg[peakI]).toFixed(1)}" r="3.5" fill="none" stroke="${t.fg}" stroke-width="1.5"/>
  <text x="24" y="26" class="lbl">CONTRIBUTIONS · 7-DAY AVG · LAST 12 MONTHS · √ SCALE</text>
  <text x="${peakX.toFixed(1)}" y="${(aTop - 16).toFixed(1)}" class="lbl" text-anchor="middle">PEAK ${days[peakI].contributionCount} · ${MONTHS[pd.getMonth()]} ${pd.getDate()}</text>
  ${months.map((m) => `<text x="${m.x.toFixed(1)}" y="244" class="lbl" text-anchor="middle">${m.m}</text>`).join("")}
</g>
<g class="sceneB">
  <rect x="12" y="12" width="1176" height="236" fill="${t.paper}" stroke="${t.paperEdge}"/>
  <line x1="12" y1="46" x2="1188" y2="46" stroke="${t.paperEdge}" stroke-dasharray="4 4"/>
  <line x1="12" y1="214" x2="1188" y2="214" stroke="${t.paperEdge}" stroke-dasharray="4 4"/>
  ${holes.join("")}${bands.join("")}
  <g clip-path="url(#clipB)">${bars}</g>
  <line x1="${bx0}" y1="${bBase}" x2="${bx1}" y2="${bBase}" stroke="${t.fg}" stroke-width="1.4"/>
  <g class="carriage"><rect x="${bx0 - 9}" y="52" width="18" height="10" rx="2" fill="${t.fg}"/><line x1="${bx0}" y1="62" x2="${bx0}" y2="${bBase}" stroke="${t.fg}" stroke-width="1" opacity="0.45"/></g>
  <text x="${bx0}" y="40" class="lbl">CONTRIBUTIONS.LOG · LAST 12 MONTHS · 1 BAR = 1 DAY · √ SCALE</text>
</g>
</svg>
`;
}

/* ── 실행 ── */
const calendar = await fetchCalendarStable();
const days = calendar.weeks.flatMap((w) => w.contributionDays);
const boj = await fetchBoj();
const programmers = await fetchProgrammers();
const data = {
  boj,
  programmers,
  date: days.at(-1).date, // 달력의 마지막 날 — 로컬 시계가 아니라 데이터의 시점
};

for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(`assets/dashboard-${name}.svg`, dashboard(t, data));
  writeFileSync(`assets/activity-${name}.svg`, activity(t, days));
}
console.log(
  `갱신 — solved.ac ${boj.tier ?? "(티어 검증 불가)"} ${fmt(boj.rating)} · BOJ ${fmt(boj.solved)}문제 · ${
    programmers != null ? `programmers ${fmt(programmers)}` : "programmers 미설정"
  } · 그래프는 ${days.length}일치 모양만`,
);
