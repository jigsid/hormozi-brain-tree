"use client";

import { useMemo } from "react";
import { getBuiltGraph } from "@/lib/graphData";
import { MODULE_COLORS, type ModuleId } from "@/data/build";
import { useGraphStore } from "@/lib/store";
import { MODULE_SOURCE, TYPE_LABELS } from "@/lib/theme";

export default function DetailsPanel() {
  const built = useMemo(() => getBuiltGraph(), []);
  const selectedId = useGraphStore((s) => s.selectedId);
  const select = useGraphStore((s) => s.select);
  const setPendingFocus = useGraphStore((s) => s.setPendingFocus);
  const setLocalDepth = useGraphStore((s) => s.setLocalDepth);

  if (!selectedId) return null;
  const node = built.byId.get(selectedId);
  if (!node) return null;

  const parent = node.parentId ? built.byId.get(node.parentId) : undefined;
  const children = node.childIds
    .map((id) => built.byId.get(id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));
  const cross = node.cross
    .map((c) => ({ ...c, node: built.byId.get(c.id) }))
    .filter((c): c is typeof c & { node: NonNullable<typeof c.node> } => Boolean(c.node));
  const moduleColor = MODULE_COLORS[node.module as ModuleId] ?? "#999";

  const jump = (id: string) => {
    select(id);
    setPendingFocus(id);
  };

  return (
    <div
      className="absolute bottom-16 right-4 top-20 z-20 flex w-[340px] flex-col overflow-hidden rounded-lg border"
      style={{
        background: "var(--panel)",
        borderColor: "var(--panel-border)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-start justify-between gap-2 px-3 pt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-medium"
            style={{ background: `${moduleColor}22`, color: moduleColor }}
          >
            {node.module === "root" ? "harness" : node.module}
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[10px]"
            style={{ background: "rgba(127,127,127,0.15)", color: "var(--text-dim)" }}
          >
            {TYPE_LABELS[node.type] ?? node.type}
          </span>
          <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>
            L{node.level}
          </span>
        </div>
        <button
          className="text-xs leading-none"
          style={{ color: "var(--text-dim)" }}
          onClick={() => select(null)}
          title="Close"
        >
          ✕
        </button>
      </div>

      <div className="px-3 pb-2 pt-1.5">
        <div className="text-[15px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
          {node.label}
        </div>
      </div>

      <div className="graph-scroll flex-1 overflow-y-auto px-3 pb-3">
        {node.summary && (
          <p className="mb-3 text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
            {node.summary}
          </p>
        )}

        {parent && (
          <div className="mb-3">
            <div
              className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-dim)" }}
            >
              Parent
            </div>
            <button className="graph-link" onClick={() => jump(parent.id)}>
              ↑ {parent.label}
            </button>
          </div>
        )}

        {children.length > 0 && (
          <div className="mb-3">
            <div
              className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-dim)" }}
            >
              Contains · {children.length}
            </div>
            <div className="flex flex-col gap-0.5">
              {children.slice(0, 40).map((child) => (
                <button key={child.id} className="graph-link" onClick={() => jump(child.id)}>
                  <span
                    className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                    style={{ background: child.color }}
                  />
                  {child.label}
                </button>
              ))}
              {children.length > 40 && (
                <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                  +{children.length - 40} more
                </span>
              )}
            </div>
          </div>
        )}

        {cross.length > 0 && (
          <div className="mb-3">
            <div
              className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-dim)" }}
            >
              Cross-module links · {cross.length}
            </div>
            <div className="flex flex-col gap-0.5">
              {cross.map((link) => (
                <button
                  key={`${link.id}-${link.label}`}
                  className="graph-link"
                  onClick={() => jump(link.id)}
                >
                  <span style={{ color: "var(--accent)" }}>
                    {link.direction === "out" ? "→" : "←"}
                  </span>{" "}
                  {link.node.label}{" "}
                  <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>
                    ({link.label})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <button
            className="graph-chip"
            onClick={() => {
              setLocalDepth(1);
            }}
          >
            Focus depth 1
          </button>
          <button className="graph-chip" onClick={() => setPendingFocus(node.id)}>
            Center
          </button>
        </div>
      </div>

      <div
        className="border-t px-3 py-2 text-[10px]"
        style={{ borderColor: "var(--panel-border)", color: "var(--text-dim)" }}
      >
        source: {MODULE_SOURCE[node.module] ?? "skill/SKILL.md"}
        {" · "}
        {node.degree} connections
      </div>
    </div>
  );
}
