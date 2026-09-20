import type { NodeType, RawNode } from "./dsl";
import { root } from "./modules/root";
import { crossLinks, type CrossLink } from "./crossLinks";
import { LAYOUT } from "./layout";
import { nodeRadius } from "@/lib/forceParams";

export type ModuleId =
  | "root"
  | "harness"
  | "offers"
  | "leads"
  | "money"
  | "sales"
  | "scaling"
  | "mindset"
  | "voice";

export interface GraphNodeData {
  id: string;
  label: string;
  type: NodeType;
  module: ModuleId;
  level: number;
  summary?: string;
  detail?: string;
  parentId?: string;
  childIds: string[];
  cross: { id: string; label: string; direction: "out" | "in" }[];
  degree: number;
  size: number;
  color: string;
  x: number;
  y: number;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  kind: "tree" | "cross";
  label?: string;
}

export interface ModuleMeta {
  id: ModuleId;
  label: string;
  color: string;
  count: number;
}

export const MODULE_COLORS: Record<ModuleId, string> = {
  root: "#e8e8e8",
  harness: "#94a3b8",
  offers: "#ffa94d",
  leads: "#4dabf7",
  money: "#51cf66",
  sales: "#cc5de8",
  scaling: "#ffd43b",
  mindset: "#ff6b9d",
  voice: "#66d9e8",
};

const TYPE_COLORS: Partial<Record<NodeType, string>> = {
  tool: "#38d9a9",
  artifact: "#b197fc",
  mistake: "#ff8787",
};

function hash01(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export interface BuiltGraph {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  byId: Map<string, GraphNodeData>;
  modules: ModuleMeta[];
  maxLevel: number;
  stats: {
    nodes: number;
    edges: number;
    treeEdges: number;
    crossEdges: number;
    byModule: Record<string, number>;
    byLevel: Record<number, number>;
    byType: Record<string, number>;
  };
}

export function buildGraph(): BuiltGraph {
  const nodes: GraphNodeData[] = [];
  const edges: GraphEdgeData[] = [];
  const byId = new Map<string, GraphNodeData>();

  const moduleOrder: ModuleId[] = [
    "harness",
    "offers",
    "leads",
    "money",
    "sales",
    "scaling",
    "mindset",
    "voice",
  ];

  function walk(
    raw: RawNode,
    parentId: string | undefined,
    level: number,
    module: ModuleId,
    fullId: string,
  ): void {
    if (byId.has(fullId)) {
      throw new Error(`Duplicate node id: ${fullId}`);
    }
    const childIds = (raw.children ?? []).map((c) => `${fullId}.${c.id}`);
    const node: GraphNodeData = {
      id: fullId,
      label: raw.label,
      type: raw.type ?? "component",
      module,
      level,
      summary: raw.summary,
      detail: raw.detail,
      parentId,
      childIds,
      cross: [],
      degree: 0,
      size: 0,
      color: TYPE_COLORS[raw.type ?? "component"] ?? MODULE_COLORS[module],
      x: 0,
      y: 0,
    };
    nodes.push(node);
    byId.set(node.id, node);
    if (parentId) {
      edges.push({
        id: `${parentId}~${fullId}`,
        source: parentId,
        target: fullId,
        kind: "tree",
      });
    }
    for (const child of raw.children ?? []) {
      walk(child, fullId, level + 1, module, `${fullId}.${child.id}`);
    }
  }

  const rootNode: GraphNodeData = {
    id: root.id,
    label: root.label,
    type: "root",
    module: "root",
    level: 0,
    summary: root.summary,
    parentId: undefined,
    childIds: (root.children ?? []).map((c) => c.id),
    cross: [],
    degree: 0,
    size: 0,
    color: MODULE_COLORS.root,
    x: 0,
    y: 0,
  };
  nodes.push(rootNode);
  byId.set(rootNode.id, rootNode);

  for (const child of root.children ?? []) {
    walk(child, root.id, 1, child.id as ModuleId, child.id);
  }

  const validCross: CrossLink[] = [];
  for (const link of crossLinks) {
    if (!byId.has(link.from) || !byId.has(link.to)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[graph] skipping cross-link with unknown node: ${link.from} → ${link.to}`,
        );
      }
      continue;
    }
    validCross.push(link);
    edges.push({
      id: `x~${link.from}~${link.to}`,
      source: link.from,
      target: link.to,
      kind: "cross",
      label: link.label,
    });
    byId.get(link.from)!.cross.push({ id: link.to, label: link.label, direction: "out" });
    byId.get(link.to)!.cross.push({ id: link.from, label: link.label, direction: "in" });
  }

  let maxLevel = 0;
  const byLevel: Record<number, number> = {};
  const byModule: Record<string, number> = {};
  const byType: Record<string, number> = {};

  const moduleSectors = new Map<ModuleId, { start: number; width: number }>();
  const sectorSpan = (Math.PI * 2) / moduleOrder.length;
  moduleOrder.forEach((m, i) => {
    moduleSectors.set(m, { start: i * sectorSpan, width: sectorSpan });
  });

  for (const node of nodes) {
    const degree = node.childIds.length + (node.parentId ? 1 : 0) + node.cross.length;
    node.degree = degree;
    node.size = nodeRadius(degree);
    maxLevel = Math.max(maxLevel, node.level);
    byLevel[node.level] = (byLevel[node.level] ?? 0) + 1;
    byModule[node.module] = (byModule[node.module] ?? 0) + 1;
    byType[node.type] = (byType[node.type] ?? 0) + 1;

    if (node.type === "root") {
      const bakedRoot = LAYOUT[node.id];
      node.x = bakedRoot ? bakedRoot[0] : 0;
      node.y = bakedRoot ? bakedRoot[1] : 0;
    } else {
      const baked = LAYOUT[node.id];
      if (baked) {
        node.x = baked[0];
        node.y = baked[1];
      } else {
        const sector = moduleSectors.get(node.module)!;
        const jitter = hash01(node.id);
        const angle = sector.start + sector.width * (0.08 + 0.84 * jitter);
        const radius = node.level * 150 + hash01(node.id + "r") * 50;
        node.x = Math.cos(angle) * radius;
        node.y = Math.sin(angle) * radius;
      }
    }
  }

  const modules: ModuleMeta[] = moduleOrder.map((id) => {
    const first = nodes.find((nd) => nd.id === id);
    return {
      id,
      label: first?.label ?? id,
      color: MODULE_COLORS[id],
      count: byModule[id] ?? 0,
    };
  });

  return {
    nodes,
    edges,
    byId,
    modules,
    maxLevel,
    stats: {
      nodes: nodes.length,
      edges: edges.length,
      treeEdges: edges.filter((e) => e.kind === "tree").length,
      crossEdges: edges.filter((e) => e.kind === "cross").length,
      byModule,
      byLevel,
      byType,
    },
  };
}
