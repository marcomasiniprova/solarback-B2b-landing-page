// Screenshot Playwright di ogni pagina. Uso: BASE_URL=http://localhost:3000 node scripts/shot.mjs
import { chromium } from "playwright";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
const BASE = process.env.BASE_URL || "http://localhost:3000";
const pages = ["/", "/agenti/solar-linkedin", "/agenti/solar-video", "/approvazioni", "/contenuti", "/outreach", "/scout", "/analisi"];
function findChromium() {
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (!existsSync(root)) return undefined;
  for (const d of readdirSync(root)) for (const c of [`${root}/${d}/chrome-linux/chrome`, `${root}/${d}/chrome-linux64/chrome`]) if (existsSync(c)) return c;
  return existsSync(`${root}/chromium`) ? `${root}/chromium` : undefined;
}
mkdirSync("shots", { recursive: true });
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const launchOpts = proxy ? { proxy: { server: proxy, bypass: "localhost,127.0.0.1" } } : {};
let browser;
try { browser = await chromium.launch(launchOpts); } catch { browser = await chromium.launch({ ...launchOpts, executablePath: findChromium() }); }
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true, locale: "it-IT", timezoneId: "Europe/Rome" });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`${page.url()}: ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") errors.push(`${page.url()}: ${m.text().slice(0, 200)}`); });
for (const p of pages) {
  await page.goto(BASE + p, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3500);
  const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_");
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
  console.log("shot", name);
}
await browser.close();
if (errors.length) { console.log("ERRORI CONSOLE/PAGINA:"); for (const e of errors.slice(0, 12)) console.log(" -", e); } else console.log("nessun errore di pagina");
