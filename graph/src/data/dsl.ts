export type NodeType =
  | "root"
  | "module"
  | "framework"
  | "component"
  | "tactic"
  | "rule"
  | "checklist"
  | "mistake"
  | "example"
  | "trigger"
  | "tool"
  | "artifact";

export interface RawNode {
  id: string;
  label: string;
  type?: NodeType;
  summary?: string;
  detail?: string;
  links?: string[];
  children?: RawNode[];
}

const MAX_LABEL = 46;

export function shorten(text: string): string {
  const t = text.trim();
  if (t.length <= MAX_LABEL) return t;
  const seps = [": ", " - ", " - ", " - ", "; ", ". ", ", "];
  for (const sep of seps) {
    const idx = t.indexOf(sep);
    if (idx >= 8 && idx <= MAX_LABEL) return t.slice(0, idx);
  }
  const cut = t.slice(0, MAX_LABEL);
  const sp = cut.lastIndexOf(" ");
  return (sp > 20 ? cut.slice(0, sp) : cut) + "…";
}

export function n(
  id: string,
  label: string,
  opts: Partial<Omit<RawNode, "id" | "label">> = {},
): RawNode {
  return { id, label, ...opts };
}

export function group(
  id: string,
  label: string,
  summary: string | undefined,
  children: RawNode[],
  opts: Partial<Omit<RawNode, "id" | "label" | "children">> = {},
): RawNode {
  return n(id, label, { type: "framework", summary, children, ...opts });
}

export type BulletItem = string | [string, string] | RawNode;

function toChild(id: string, index: number, item: BulletItem, fallback: NodeType): RawNode {
  const childId = String(index + 1);
  if (typeof item === "string") {
    return n(childId, shorten(item), { type: fallback, summary: item });
  }
  if (Array.isArray(item)) {
    return n(childId, shorten(item[0]), { type: fallback, summary: item[1] });
  }
  return item;
}

export function bullets(
  id: string,
  label: string,
  items: BulletItem[],
  opts: { type?: NodeType; summary?: string; parentType?: NodeType } = {},
): RawNode {
  const fallback = opts.type ?? "checklist";
  return n(id, label, {
    type: opts.parentType ?? "component",
    summary: opts.summary,
    children: items.map((item, i) => toChild(id, i, item, fallback)),
  });
}

export function rules(id: string, label: string, items: BulletItem[]): RawNode {
  return bullets(id, label, items, {
    type: "rule",
    summary: "Numbers and decision thresholds that govern this module.",
  });
}

export function checklist(id: string, label: string, items: BulletItem[]): RawNode {
  return bullets(id, label, items, {
    type: "checklist",
    summary: "Pass every line before scaling.",
  });
}

export function mistakes(id: string, label: string, items: BulletItem[]): RawNode {
  return bullets(id, label, items, {
    type: "mistake",
    summary: "Failure modes to audit against.",
  });
}

export function examples(id: string, label: string, items: [string, string][]): RawNode {
  return n(id, label, {
    type: "component",
    summary: "Worked examples with real numbers.",
    children: items.map(([title, text], i) =>
      n(`${i + 1}`, shorten(title), { type: "example", summary: text }),
    ),
  });
}

export function table(
  id: string,
  label: string,
  rows: [string, string][],
  opts: { summary?: string; type?: NodeType } = {},
): RawNode {
  return n(id, label, {
    type: opts.type ?? "component",
    summary: opts.summary,
    children: rows.map(([left, right], i) =>
      n(`${i + 1}`, shorten(left), { type: "tactic", summary: right }),
    ),
  });
}
