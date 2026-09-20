import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);

// open controls (toggle button on the left, below the title)
await page.click("button[title='Show controls']");
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/graph-controls.png" });

// close controls, click the root node to open the details panel
await page.click("button[title='Hide controls']");
await page.waitForTimeout(300);
const pos = await page.evaluate(() => {
  const { model, renderer } = window.__graph;
  const root = model.graph.getNodeAttributes("root");
  return renderer.graphToViewport({ x: root.x, y: root.y });
});
const rect = await page.locator("canvas").first().boundingBox();
await page.mouse.click(rect.x + pos.x, rect.y + pos.y);
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/graph-details.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
