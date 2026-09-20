import { chromium } from "playwright";

const url = process.env.GRAPH_URL ?? "http://localhost:3001";
const out = process.env.OUT ?? "/tmp/hormozi-graph.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
});
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(5000);

const canvasCount = await page.locator("canvas").count();
const statsText = await page.locator("text=nodes ·").first().textContent().catch(() => null);

await page.screenshot({ path: out });

console.log("canvases:", canvasCount);
console.log("stats:", statsText);
console.log("errors:", errors.length ? errors : "none");

await browser.close();
