import { chromium } from "playwright";

const url = process.env.GRAPH_URL ?? "http://localhost:3001";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
});

await page.goto(url, { waitUntil: "networkidle" });

const shots = [1000, 3000, 6000, 12000];
let prev = 0;
for (const t of shots) {
  await page.waitForTimeout(t - prev);
  prev = t;
  await page.screenshot({ path: `/tmp/graph-t${t}.png` });
}

const info = await page.evaluate(() => {
  const { model, renderer } = window.__graph;
  const cam = renderer.getCamera().getState();
  const dims = renderer.getDimensions();
  const root = model.graph.getNodeAttributes("root");
  const pos = renderer.graphToViewport({ x: root.x, y: root.y });
  return { camera: cam, rootViewport: pos, nodes: model.graph.order, dims };
});
console.log(JSON.stringify(info, null, 2));

const rect = await page.locator("canvas").first().boundingBox();
await page.mouse.move(rect.x + info.rootViewport.x, rect.y + info.rootViewport.y);
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/graph-hover.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
