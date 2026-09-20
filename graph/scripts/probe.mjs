import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
for (const t of [500, 2000, 4000, 8000, 14000]) {
  await page.waitForTimeout(t === 500 ? 500 : t - (t === 2000 ? 500 : t === 4000 ? 2000 : t === 8000 ? 4000 : 8000));
  const r = await page.evaluate(() => {
    const { model } = window.__graph;
    const g = model.graph;
    const rootAttr = g.getNodeAttributes("root");
    let maxAbs = 0, far = null;
    g.forEachNode((id, a) => {
      const m = Math.max(Math.abs(a.x), Math.abs(a.y));
      if (m > maxAbs) { maxAbs = m; far = id; }
    });
    return { rootX: Math.round(rootAttr.x), rootY: Math.round(rootAttr.y), maxAbs: Math.round(maxAbs), far };
  });
  console.log(`t=${t}ms`, JSON.stringify(r));
}
await browser.close();
