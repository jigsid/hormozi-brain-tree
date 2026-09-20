import type Graph from "graphology";
import type Sigma from "sigma";
import type { BuiltGraph } from "@/data/build";
import type { HarnessEdgeAttrs, HarnessNodeAttrs } from "./model";

export interface VisibilityInput {
  hiddenModules: string[];
  maxLevel: number;
  typeVisibility: Record<string, boolean>;
  localDepth: number;
  selectedId: string | null;
}

const TYPE_GROUPS: Record<string, string> = {
  rule: "rules",
  checklist: "checklists",
  mistake: "mistakes",
  example: "examples",
  trigger: "triggers",
  tool: "tools",
  artifact: "tools",
};

export function bfs(
  graph: Graph<HarnessNodeAttrs, HarnessEdgeAttrs>,
  start: string,
  depth: number,
): Set<string> {
  const seen = new Set<string>([start]);
  let frontier: string[] = [start];
  for (let d = 0; d < depth; d++) {
    const next: string[] = [];
    for (const id of frontier) {
      graph.forEachNeighbor(id, (neighbor) => {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          next.push(neighbor);
        }
      });
    }
    frontier = next;
  }
  return seen;
}

export function computeVisible(
  built: BuiltGraph,
  graph: Graph<HarnessNodeAttrs, HarnessEdgeAttrs>,
  input: VisibilityInput,
): Set<string> {
  const visible = new Set<string>();
  const localSet =
    input.localDepth > 0 && input.selectedId
      ? bfs(graph, input.selectedId, input.localDepth)
      : null;

  for (const node of built.nodes) {
    if (input.hiddenModules.includes(node.module)) continue;
    if (node.level > input.maxLevel) continue;
    const group = TYPE_GROUPS[node.type];
    if (group && input.typeVisibility[group] === false) continue;
    if (localSet && !localSet.has(node.id)) continue;
    visible.add(node.id);
  }
  return visible;
}

export function computeSearchHits(built: BuiltGraph, query: string): Set<string> {
  const q = query.trim().toLowerCase();
  const hits = new Set<string>();
  if (!q) return hits;
  for (const node of built.nodes) {
    if (
      node.label.toLowerCase().includes(q) ||
      (node.summary ?? "").toLowerCase().includes(q) ||
      node.module.includes(q)
    ) {
      hits.add(node.id);
    }
  }
  return hits;
}

export function neighborSet(
  graph: Graph<HarnessNodeAttrs, HarnessEdgeAttrs>,
  id: string,
): Set<string> {
  const set = new Set<string>();
  graph.forEachNeighbor(id, (neighbor) => set.add(neighbor));
  return set;
}

export function fitCameraToIds(
  renderer: Sigma<HarnessNodeAttrs, HarnessEdgeAttrs>,
  graph: Graph<HarnessNodeAttrs, HarnessEdgeAttrs>,
  ids: Set<string>,
  padding = 1.3,
  duration = 600,
): void {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const id of ids) {
    if (!graph.hasNode(id)) continue;
    const display = renderer.getNodeDisplayData(id);
    if (!display) continue;
    const { x, y } = display;
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  if (!Number.isFinite(minX)) {
    renderer.getCamera().animatedReset({ duration });
    return;
  }
  const width = Math.max(maxX - minX, 0.001);
  const height = Math.max(maxY - minY, 0.001);
  const ratio = Math.max(width, height) * padding;
  renderer.getCamera().animate(
    {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      ratio: Math.max(ratio, 0.01),
    },
    { duration },
  );
}

export function centerOnNode(
  renderer: Sigma<HarnessNodeAttrs, HarnessEdgeAttrs>,
  graph: Graph<HarnessNodeAttrs, HarnessEdgeAttrs>,
  id: string,
  duration = 500,
): void {
  if (!graph.hasNode(id)) return;
  const display = renderer.getNodeDisplayData(id);
  if (!display) return;
  const camera = renderer.getCamera();
  const state = camera.getState();
  camera.animate(
    { x: display.x, y: display.y, ratio: Math.min(state.ratio, 0.8) },
    { duration },
  );
}
