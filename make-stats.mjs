/**
 * 활동 계기판·잔디 SVG 생성기 — GitHub Action이 매일 실행한다 (stats.yml).
 *
 * 기성 위젯을 쓰지 않는 이유: 이 프로필의 다른 자산(배너·필 버튼)과 같은
 * 디자인 언어(Pretendard 서브셋 · #0016ec / #c1ff00)를 지키기 위해서다.
 *
 * 데이터 소스와 정직성 규칙
 * - GitHub: GraphQL contributionCalendar. GITHUB_TOKEN은 공개 기여만 세므로
 *   프로필 화면의 수치와 다를 수 있다 — 그래서 계기판에 갱신 날짜를 박는다.
 * - 백준: solved.ac API를 먼저 시도(티어명까지 얻음). Cloudflare에 막히면
 *   mazassumnida 뱃지 SVG를 파싱해 solved·rating 숫자만 쓴다 — 티어명 추정 금지.
 *
 * 사용: GITHUB_TOKEN=... node make-stats.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const GITHUB_LOGIN = "sjh9714";
const BOJ_HANDLE = "jinhyuk9714";
const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) throw new Error("GITHUB_TOKEN이 필요하다");

const font = readFileSync("assets/stats-font.woff2").toString("base64");

/* ── 팔레트: sjh9714.vercel.app globals.css와 같은 값 ── */
const THEMES = {
  light: {
    fg: "#0a0b0d",
    muted: "#5a5f6e",
    line: "#0a0b0d",
    cell0: "#eef0f6",
    accent: "#0016ec",
    levels: [0.22, 0.45, 0.7, 1],
  },
  dark: {
    fg: "#f0f1fa",
    muted: "#9aa1b4",
    line: "rgba(240,241,250,0.7)",
    cell0: "#1b1f24",
    accent: "#c1ff00", // 라임은 반전(어두운) 화면에서만 — 포트폴리오 규칙
    levels: [0.2, 0.42, 0.66, 0.95],
  },
};

/* ── GitHub 잔디 ── */
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

/* 오늘 기여가 아직 없어도 어제까지 이어졌으면 스트릭은 살아 있다 */
function currentStreak(days) {
  let streak = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].contributionCount === 0) i -= 1;
  for (; i >= 0 && days[i].contributionCount > 0; i -= 1) streak += 1;
  return streak;
}

/* ── 백준 ── */
const TIER_NAMES = ["Unrated"];
for (const t of ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"])
  for (const n of ["V", "IV", "III", "II", "I"]) TIER_NAMES.push(`${t} ${n}`);

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
  const num = (cls) => {
    const m = svg.match(new RegExp(`class="${cls} value">([\\d,]+)<`));
    return m ? Number(m[1].replaceAll(",", "")) : null;
  };
  const solved = num("solved");
  const rating = num("rate");
  if (solved == null || rating == null) throw new Error("백준 수치를 어느 소스에서도 못 읽었다");
  return { solved, rating, tier: null };
}

/* ── 렌더 ── */
const fmt = (n) => n.toLocaleString("en-US");
const style = (t) => `
  @font-face { font-family: "P"; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 500; }
  text { font-family: "P", Helvetica, Arial, sans-serif; fill: ${t.fg}; }
  .value { font-size: 44px; font-weight: 500; letter-spacing: -0.5px; }
  .label { font-size: 11.5px; letter-spacing: 2px; fill: ${t.muted}; }
  .note { font-size: 10px; letter-spacing: 1px; fill: ${t.muted}; }`;

function dashboard(t, { total, streak, boj, date }) {
  const chips = [
    { value: fmt(total), label: "CONTRIBUTIONS · LAST 12 MONTHS" },
    { value: `${streak}d`, label: "CURRENT STREAK" },
    { value: fmt(boj.solved), label: "BAEKJOON SOLVED" },
    { value: fmt(boj.rating), label: boj.tier ? `SOLVED.AC RATING · ${boj.tier.toUpperCase()}` : "SOLVED.AC RATING" },
  ];
  const W = 1200;
  const colW = 288;
  const gap = (W - colW * 4) / 3;
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
  aria-label="GitHub ${fmt(total)} contributions in the last 12 months, ${streak} day streak. Baekjoon ${fmt(boj.solved)} solved, solved.ac rating ${fmt(boj.rating)}">
  <style>${style(t)}</style>
  ${cols}
  <text x="${W}" y="128" text-anchor="end" class="note">UPDATED DAILY BY GITHUB ACTIONS · ${date}</text>
</svg>
`;
}

const LEVEL_INDEX = { NONE: -1, FIRST_QUARTILE: 0, SECOND_QUARTILE: 1, THIRD_QUARTILE: 2, FOURTH_QUARTILE: 3 };

function graph(t, weeks) {
  const CELL = 14;
  const GAP = 3;
  const W = weeks.length * (CELL + GAP) - GAP;
  const H = 7 * (CELL + GAP) - GAP;
  const cells = weeks
    .flatMap((w, x) =>
      w.contributionDays.map((d, y) => {
        const lv = LEVEL_INDEX[d.contributionLevel] ?? -1;
        const fill = lv < 0 ? t.cell0 : t.accent;
        const op = lv < 0 ? 1 : t.levels[lv];
        return `<rect x="${x * (CELL + GAP)}" y="${y * (CELL + GAP)}" width="${CELL}" height="${CELL}" rx="3" fill="${fill}" fill-opacity="${op}"/>`;
      }),
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="지난 1년의 GitHub 기여 그래프">${cells}</svg>
`;
}

/* ── 실행 ── */
const calendar = await fetchCalendar();
const days = calendar.weeks.flatMap((w) => w.contributionDays);
const boj = await fetchBoj();
const data = {
  total: calendar.totalContributions,
  streak: currentStreak(days),
  boj,
  date: days.at(-1).date, // 달력의 마지막 날 — 로컬 시계가 아니라 데이터의 시점
};

for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(`assets/dashboard-${name}.svg`, dashboard(t, data));
  writeFileSync(`assets/graph-${name}.svg`, graph(t, calendar.weeks));
}
console.log(
  `계기판 갱신 — contributions ${fmt(data.total)} · streak ${data.streak}d · BOJ ${fmt(boj.solved)} solved / ${fmt(boj.rating)} rating${boj.tier ? ` (${boj.tier})` : " (티어명은 폴백이라 생략)"}`,
);
