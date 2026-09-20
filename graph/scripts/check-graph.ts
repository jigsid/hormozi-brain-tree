import { buildGraph } from "../src/data/build";

const g = buildGraph();

console.log("nodes:", g.stats.nodes);
console.log("edges:", g.stats.edges, `(tree ${g.stats.treeEdges}, cross ${g.stats.crossEdges})`);
console.log("max level:", g.maxLevel);
console.log("by level:", g.stats.byLevel);
console.log("by module:", g.stats.byModule);
console.log("by type:", g.stats.byType);

const degrees = g.nodes.map((n) => n.degree).sort((a, b) => b - a);
console.log("top degree:", degrees.slice(0, 8).join(", "));

const orphans = g.nodes.filter((n) => !n.parentId && n.type !== "root" && n.cross.length === 0);
if (orphans.length) {
  console.log("orphans:", orphans.map((o) => o.id));
}

const crossTargets = new Set(g.edges.filter((e) => e.kind === "cross").flatMap((e) => [e.source, e.target]));
const modules = ["offers", "leads", "money", "sales", "scaling", "mindset", "voice"];
for (const m of modules) {
  const modNodes = g.nodes.filter((n) => n.module === m);
  const modCross = modNodes.filter((n) => crossTargets.has(n.id)).length;
  console.log(`${m}: ${modNodes.length} nodes, ${modCross} with cross-links`);
}
