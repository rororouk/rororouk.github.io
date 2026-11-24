/*
 * Generates the small looping GIF animations used in the «Корисна стаття» block
 * on calculator pages, plus a static PNG frame for users with reduced motion.
 *
 * Each frame is drawn as SVG (vector, anti-aliased), rasterized with sharp and
 * joined into an animated GIF. Run from the project root:
 *
 *   node scripts/generate-gifs.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SIZE = 176; // rendered at 2x for a ~88px tile
const OUT_DIR = path.join(process.cwd(), "public", "images", "gifs");

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeInQuad = (x) => x * x;
const easeInCubic = (x) => x * x * x;
const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;
const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const f = (n) => Number(n.toFixed(2));

const svg = (bg, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 100 100">` +
  (defs ? `<defs>${defs}</defs>` : "") +
  `<rect width="100" height="100" fill="${bg}"/>${body}</svg>`;

/* ---------- Fuel: a car on the road (amber) ---------- */
function fuelFrame(t) {
  const C = {
    bg: "#fef3c7",
    road: "#fde68a",
    edge: "#fcd34d",
    dash: "#fffbeb",
    body: "#f59e0b",
    trim: "#d97706",
    win: "#fffbeb",
    tire: "#78350f",
    rim: "#fcd34d",
    tail: "#b45309",
  };
  const bob = Math.sin(t * Math.PI * 4) * 0.7;
  let s = "";

  s += `<circle cx="80" cy="22" r="9" fill="#fde68a"/>`;
  s += `<rect x="0" y="73" width="100" height="27" fill="${C.road}"/>`;
  s += `<rect x="0" y="73" width="100" height="1.6" fill="${C.edge}"/>`;

  // Lane dashes: period 20, moved by two periods per loop -> seamless.
  const shift = (t * 40) % 20;
  for (let x = -20; x <= 120; x += 20) {
    s += `<rect x="${f(x - shift)}" y="84" width="10" height="2.4" rx="1.2" fill="${C.dash}"/>`;
  }

  // Speed lines behind the car.
  [
    [45, 0],
    [52, 0.45],
  ].forEach(([y, offset]) => {
    const p = (t * 2 + offset) % 1;
    const x2 = 17 - p * 12;
    const len = 9 * (1 - p) + 2;
    s += `<line x1="${f(x2 - len)}" y1="${y}" x2="${f(x2)}" y2="${y}" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-opacity="${f(0.9 * (1 - p))}"/>`;
  });

  // Exhaust puffs.
  for (let i = 0; i < 3; i++) {
    const p = (t * 2 + i / 3) % 1;
    s += `<circle cx="${f(19 - p * 15)}" cy="${f(63 - p * 6 + bob * 0.5)}" r="${f(1.3 + p * 3.4)}" fill="#ffffff" fill-opacity="${f(0.85 * (1 - p))}"/>`;
  }

  // Body on "suspension".
  s += `<g transform="translate(0 ${f(bob)})">`;
  s += `<path d="M82 53 L97 49 L97 61 L82 56.4 Z" fill="#fffbeb" fill-opacity="${f(0.45 + 0.1 * Math.sin(t * Math.PI * 2))}"/>`;
  s += `<path d="M33 51 L40.4 38.6 Q41.4 37 43.4 37 L60.4 37 Q62.4 37 63.8 38.6 L72 51 Z" fill="${C.body}"/>`;
  s += `<path d="M38.6 50 L43.5 41.4 Q44.1 40.3 45.4 40.3 L50.4 40.3 L50.4 50 Z" fill="${C.win}"/>`;
  s += `<path d="M53.2 40.3 L59.6 40.3 Q60.7 40.3 61.4 41.2 L67.6 50 L53.2 50 Z" fill="${C.win}"/>`;
  s += `<rect x="20" y="49" width="62" height="17" rx="6" fill="${C.body}"/>`;
  s += `<rect x="20" y="60.5" width="62" height="5.5" rx="2.75" fill="${C.trim}"/>`;
  s += `<rect x="51.4" y="51" width="1.2" height="9" rx="0.6" fill="${C.trim}"/>`;
  s += `<rect x="56" y="54" width="4" height="1.3" rx="0.65" fill="${C.trim}"/>`;
  s += `<rect x="77" y="52.8" width="5" height="3.4" rx="1.7" fill="#fffbeb"/>`;
  s += `<rect x="20" y="53" width="2.8" height="3.4" rx="1.2" fill="${C.tail}"/>`;
  s += `</g>`;

  // Wheels: one clockwise turn per loop (3-fold spokes -> seamless).
  const angle = t * 360;
  for (const cx of [35, 67]) {
    s += `<circle cx="${cx}" cy="66" r="7.4" fill="${C.tire}"/>`;
    s += `<circle cx="${cx}" cy="66" r="4.4" fill="${C.rim}"/>`;
    s += `<g transform="rotate(${f(angle)} ${cx} 66)">`;
    for (let k = 0; k < 3; k++) {
      s += `<rect x="${f(cx - 0.6)}" y="62" width="1.2" height="4" rx="0.6" fill="${C.tire}" transform="rotate(${k * 120} ${cx} 66)"/>`;
    }
    s += `</g>`;
    s += `<circle cx="${cx}" cy="66" r="1.3" fill="${C.tire}"/>`;
  }

  return svg(C.bg, s);
}

/* ---------- Heating: radiator with rising heat (rose) ---------- */
function heatingFrame(t) {
  const C = {
    bg: "#ffe4e6",
    fin: "#f43f5e",
    pipe: "#e11d48",
    dark: "#be123c",
    shine: "#fda4af",
    wave: "#fb7185",
  };
  const defs =
    `<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="0" y1="46" x2="0" y2="8">` +
    `<stop offset="0" stop-color="${C.wave}" stop-opacity="1"/><stop offset="1" stop-color="${C.wave}" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="50" cy="66" r="44">` +
    `<stop offset="0" stop-color="${C.wave}" stop-opacity="0.55"/><stop offset="1" stop-color="${C.wave}" stop-opacity="0"/></radialGradient>`;
  let s = "";

  // Static warm glow (a pulsing gradient would change every pixel and bloat the GIF).
  s += `<circle cx="50" cy="66" r="44" fill="url(#glow)" opacity="0.7"/>`;

  // Heat waves: the pattern shifts up by two wavelengths per loop -> seamless.
  [30, 50, 70].forEach((cx, i) => {
    let d = "";
    for (let y = 45; y >= 9; y -= 1) {
      const amp = 1.4 + (2.4 * (45 - y)) / 36;
      const x = cx + amp * Math.sin(2 * Math.PI * ((y + t * 32) / 16 + i * 0.33));
      d += `${y === 45 ? "M" : "L"}${f(x)} ${y} `;
    }
    s += `<path d="${d.trim()}" fill="none" stroke="url(#fade)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;
  });

  s += `<rect x="18.5" y="55" width="63" height="5" rx="2.5" fill="${C.pipe}"/>`;
  s += `<rect x="18.5" y="76" width="63" height="5" rx="2.5" fill="${C.pipe}"/>`;
  for (let i = 0; i < 5; i++) {
    const x = 21.5 + i * 12;
    s += `<rect x="${x}" y="48" width="9" height="38" rx="4.5" fill="${C.fin}"/>`;
    s += `<rect x="${f(x + 2)}" y="52" width="1.7" height="30" rx="0.85" fill="${C.shine}" fill-opacity="0.85"/>`;
  }
  s += `<rect x="24" y="85" width="4.5" height="5" rx="1.2" fill="${C.dark}"/>`;
  s += `<rect x="71.5" y="85" width="4.5" height="5" rx="1.2" fill="${C.dark}"/>`;
  s += `<rect x="80" y="76.8" width="6" height="3.4" rx="1.2" fill="${C.dark}"/>`;
  s += `<circle cx="87" cy="78.5" r="2.4" fill="${C.dark}"/>`;

  return svg(C.bg, s, defs);
}

/* ---------- Compound interest: growing chart (emerald) ---------- */
function compoundFrame(t) {
  const C = { bg: "#d1fae5", grid: "#a7f3d0", base: "#6ee7b7", line: "#047857", coin: "#10b981" };
  const colors = ["#6ee7b7", "#34d399", "#10b981", "#059669", "#047857"];
  const heights = [10, 16, 24, 35, 50];
  const baseY = 80;
  const width = 10;
  const x0 = 17;
  const step = 13.5;
  const keep = 1 - easeInCubic(clamp01((t - 0.86) / 0.11));
  let s = "";

  [35, 50, 65].forEach((y) => {
    s += `<rect x="12" y="${y}" width="76" height="0.8" fill="${C.grid}"/>`;
  });

  const tops = [];
  heights.forEach((h, i) => {
    const grow = easeOutBack(clamp01((t - 0.03 - i * 0.07) / 0.18));
    const hh = Math.max(0, h * grow * keep);
    const x = x0 + i * step;
    tops.push([x + width / 2, baseY - h - 6]);
    if (hh > 0.3) {
      const rx = Math.min(2.4, hh / 2);
      s += `<rect x="${f(x)}" y="${f(baseY - hh)}" width="${width}" height="${f(hh)}" rx="${f(rx)}" fill="${colors[i]}"/>`;
    }
  });
  s += `<rect x="12" y="${baseY}" width="76" height="1.8" rx="0.9" fill="${C.base}"/>`;

  const draw = easeInOutSine(clamp01((t - 0.36) / 0.24));
  if (draw > 0 && keep > 0) {
    let len = 0;
    for (let i = 1; i < tops.length; i++) {
      len += Math.hypot(tops[i][0] - tops[i - 1][0], tops[i][1] - tops[i - 1][1]);
    }
    const d = tops.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join(" ");
    s += `<path d="${d}" fill="none" stroke="${C.line}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f(len)} ${f(len)}" stroke-dashoffset="${f(len * (1 - draw))}" opacity="${f(keep)}"/>`;

    const head = clamp01((draw - 0.85) / 0.15);
    if (head > 0) {
      const [x1, y1] = tops[tops.length - 2];
      const [x2, y2] = tops[tops.length - 1];
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const tx = x2 + 1.2 * Math.cos(angle);
      const ty = y2 + 1.2 * Math.sin(angle);
      s += `<path d="M0 0 L-5 -3.2 L-5 3.2 Z" fill="${C.line}" opacity="${f(head * keep)}" transform="translate(${f(tx)} ${f(ty)}) rotate(${f((angle * 180) / Math.PI)})"/>`;
    }
  }

  const coin = easeOutBack(clamp01((t - 0.52) / 0.12)) * keep;
  if (coin > 0.01) {
    s += `<g transform="translate(25 24) scale(${f(coin)})">`;
    s += `<circle r="10" fill="${C.coin}"/><circle r="7.6" fill="none" stroke="${C.grid}" stroke-width="1"/>`;
    s += `<circle cx="-2.6" cy="-2.6" r="1.7" fill="#ffffff"/><circle cx="2.6" cy="2.6" r="1.7" fill="#ffffff"/>`;
    s += `<line x1="3.2" y1="-3.6" x2="-3.2" y2="3.6" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>`;
    s += `</g>`;
  }

  return svg(C.bg, s);
}

/* ---------- Salary: coins dropping into a wallet (indigo) ---------- */
function salaryFrame(t) {
  const C = {
    bg: "#e0e7ff",
    body: "#4f46e5",
    top: "#4338ca",
    pocket: "#6366f1",
    note1: "#a5b4fc",
    note2: "#c7d2fe",
    stitch: "#818cf8",
    coin: "#fbbf24",
    ring: "#f59e0b",
    mark: "#d97706",
  };
  const coins = [
    { x: 44, offset: 0 },
    { x: 56, offset: 0.5 },
  ];

  let bounce = 0;
  const states = coins.map((coin) => {
    const p = (t * 2 + coin.offset) % 1;
    if (p >= 0.5 && p <= 0.72) {
      bounce = Math.max(bounce, Math.sin(Math.PI * ((p - 0.5) / 0.22)));
    }
    return { ...coin, p };
  });
  const dy = bounce * 1.8;
  let s = "";

  s += `<g transform="translate(0 ${f(dy)})">`;
  s += `<rect x="28" y="33" width="36" height="22" rx="2.5" fill="${C.note1}" transform="rotate(-9 46 44)"/>`;
  s += `<rect x="38" y="35" width="36" height="22" rx="2.5" fill="${C.note2}" transform="rotate(7 56 46)"/>`;
  s += `<circle cx="56" cy="43" r="3.2" fill="none" stroke="${C.note1}" stroke-width="1.2" transform="rotate(7 56 46)"/>`;
  s += `</g>`;

  // Coins fall behind the wallet front and disappear inside it.
  states.forEach((coin) => {
    if (coin.p >= 0.5) return;
    const y = -10 + 66 * easeInQuad(coin.p / 0.5);
    const spin = Math.max(0.18, Math.abs(Math.cos(Math.PI * 2 * coin.p * 1.6)));
    s += `<g transform="translate(${coin.x} ${f(y)}) scale(${f(spin)} 1)">`;
    s += `<circle r="7" fill="${C.coin}"/><circle r="4.6" fill="none" stroke="${C.ring}" stroke-width="1.3"/>`;
    s += `<rect x="-0.7" y="-2.6" width="1.4" height="5.2" rx="0.7" fill="${C.mark}"/>`;
    s += `</g>`;
  });

  s += `<g transform="translate(0 ${f(dy)})">`;
  s += `<rect x="16" y="46" width="66" height="38" rx="8" fill="${C.body}"/>`;
  s += `<rect x="16" y="46" width="66" height="7" rx="3.5" fill="${C.top}"/>`;
  s += `<line x1="23" y1="78" x2="52" y2="78" stroke="${C.stitch}" stroke-width="1" stroke-dasharray="2 2"/>`;
  s += `<rect x="58" y="58" width="28" height="16" rx="6" fill="${C.pocket}"/>`;
  s += `<circle cx="67" cy="66" r="2.8" fill="${C.bg}"/>`;
  s += `</g>`;

  // A small "+" pops up after each landing.
  states.forEach((coin) => {
    if (coin.p < 0.5 || coin.p > 0.8) return;
    const q = (coin.p - 0.5) / 0.3;
    const x = coin.x + (coin.offset ? 9 : -9);
    s += `<g transform="translate(${x} ${f(40 - q * 10)})" opacity="${f(1 - q)}">`;
    s += `<rect x="-0.7" y="-2.6" width="1.4" height="5.2" rx="0.7" fill="${C.body}"/>`;
    s += `<rect x="-2.6" y="-0.7" width="5.2" height="1.4" rx="0.7" fill="${C.body}"/>`;
    s += `</g>`;
  });

  return svg(C.bg, s);
}

const ANIMATIONS = [
  { name: "fuel", frame: fuelFrame, frames: 32, delay: 50, still: 0.1 },
  { name: "heating", frame: heatingFrame, frames: 36, delay: 60, still: 0.25 },
  { name: "compound-interest", frame: compoundFrame, frames: 72, delay: 50, still: 0.75 },
  { name: "salary", frame: salaryFrame, frames: 40, delay: 50, still: 0.15 },
];

async function render(svgText) {
  return sharp(Buffer.from(svgText)).png().toBuffer();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const anim of ANIMATIONS) {
    const frames = [];
    for (let i = 0; i < anim.frames; i++) {
      frames.push(await render(anim.frame(i / anim.frames)));
    }

    const gifPath = path.join(OUT_DIR, `${anim.name}.gif`);
    await sharp(frames, { join: { animated: true } })
      .gif({ loop: 0, delay: Array(anim.frames).fill(anim.delay), effort: 10, dither: 0 })
      .toFile(gifPath);

    const stillPath = path.join(OUT_DIR, `${anim.name}-still.png`);
    await sharp(Buffer.from(anim.frame(anim.still))).png({ compressionLevel: 9 }).toFile(stillPath);

    const meta = await sharp(gifPath, { animated: true }).metadata();
    console.log(
      `${anim.name}.gif: ${fs.statSync(gifPath).size} bytes, ${meta.pages} frames, ${meta.width}x${meta.pageHeight}, delay ${meta.delay?.[0]}ms/${meta.delay?.[meta.delay.length - 1]}ms`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
