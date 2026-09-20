"use client";

import { useMemo } from "react";
import { getBuiltGraph } from "@/lib/graphData";
import { TYPE_FILTERS, useGraphStore } from "@/lib/store";

function Section({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="border-t px-3 py-2.5" style={{ borderColor: "var(--panel-border)" }}>
      <div className="mb-1.5 flex items-center justify-between">
        <div
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-dim)" }}
        >
          {title}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="mb-1.5 block">
      <div className="flex items-center justify-between text-[11px]" style={{ color: "var(--text)" }}>
        <span>{label}</span>
        <span style={{ color: "var(--text-dim)" }}>{display}</span>
      </div>
      <input
        type="range"
        className="graph-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

export default function ControlPanel() {
  const built = useMemo(() => getBuiltGraph(), []);
  const controlsOpen = useGraphStore((s) => s.controlsOpen);
  const search = useGraphStore((s) => s.search);
  const setSearch = useGraphStore((s) => s.setSearch);
  const hiddenModules = useGraphStore((s) => s.hiddenModules);
  const toggleModule = useGraphStore((s) => s.toggleModule);
  const setAllModules = useGraphStore((s) => s.setAllModules);
  const maxLevel = useGraphStore((s) => s.maxLevel);
  const setMaxLevel = useGraphStore((s) => s.setMaxLevel);
  const typeVisibility = useGraphStore((s) => s.typeVisibility);
  const toggleType = useGraphStore((s) => s.toggleType);
  const showCross = useGraphStore((s) => s.showCross);
  const setShowCross = useGraphStore((s) => s.setShowCross);
  const display = useGraphStore((s) => s.display);
  const setDisplay = useGraphStore((s) => s.setDisplay);
  const forces = useGraphStore((s) => s.forces);
  const setForce = useGraphStore((s) => s.setForce);
  const resetForces = useGraphStore((s) => s.resetForces);
  const selectedId = useGraphStore((s) => s.selectedId);
  const localDepth = useGraphStore((s) => s.localDepth);
  const setLocalDepth = useGraphStore((s) => s.setLocalDepth);
  const select = useGraphStore((s) => s.select);

  const shown = useMemo(() => {
    return built.nodes.filter((n) => {
      if (hiddenModules.includes(n.module)) return false;
      if (n.level > maxLevel) return false;
      return true;
    }).length;
  }, [built, hiddenModules, maxLevel]);

  const searchHits = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return 0;
    return built.nodes.filter(
      (n) =>
        n.label.toLowerCase().includes(q) ||
        (n.summary ?? "").toLowerCase().includes(q) ||
        n.module.includes(q),
    ).length;
  }, [built, search]);

  if (!controlsOpen) return null;

  return (
    <div
      className="absolute bottom-4 left-4 top-[6.5rem] z-20 flex w-[286px] flex-col overflow-hidden rounded-lg border"
      style={{
        background: "var(--panel)",
        borderColor: "var(--panel-border)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="px-3 py-2.5">
        <input
          className="graph-input"
          placeholder="Search nodes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.trim() && (
          <div className="mt-1.5 text-[11px]" style={{ color: "var(--text-dim)" }}>
            {searchHits} match{searchHits === 1 ? "" : "es"} highlighted
          </div>
        )}
      </div>

      <div className="graph-scroll flex-1 overflow-y-auto">
        <Section
          title="Groups"
          right={
            <button
              className="text-[10px] underline-offset-2 hover:underline"
              style={{ color: "var(--text-dim)" }}
              onClick={() =>
                setAllModules(hiddenModules.length ? [] : built.modules.map((m) => m.id))
              }
            >
              {hiddenModules.length ? "all on" : "all off"}
            </button>
          }
        >
          {built.modules.map((module) => {
            const off = hiddenModules.includes(module.id);
            return (
              <button
                key={module.id}
                className="flex w-full items-center gap-2 rounded px-1 py-[3px] text-left text-[12px] hover:bg-white/5"
                style={{ color: off ? "var(--text-dim)" : "var(--text)" }}
                onClick={() => toggleModule(module.id)}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: module.color,
                    opacity: off ? 0.25 : 1,
                    boxShadow: off ? "none" : `0 0 6px ${module.color}55`,
                  }}
                />
                <span className="flex-1 truncate">{module.label}</span>
                <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>
                  {module.count}
                </span>
              </button>
            );
          })}
        </Section>

        <Section title="Levels" right={<span style={{ color: "var(--text-dim)" }}>depth {maxLevel}</span>}>
          <Slider
            label="Show levels up to"
            value={maxLevel}
            min={0}
            max={built.maxLevel}
            step={1}
            display={`≤ ${maxLevel}`}
            onChange={setMaxLevel}
          />
        </Section>

        <Section title="Node types">
          {TYPE_FILTERS.map((filter) => {
            const on = typeVisibility[filter.key] !== false;
            return (
              <label
                key={filter.key}
                className="flex cursor-pointer items-center gap-2 py-[3px] text-[12px]"
                style={{ color: on ? "var(--text)" : "var(--text-dim)" }}
              >
                <input
                  type="checkbox"
                  className="graph-check"
                  checked={on}
                  onChange={() => toggleType(filter.key)}
                />
                {filter.label}
              </label>
            );
          })}
        </Section>

        <Section title="Display">
          <Slider
            label="Node size"
            value={display.nodeScale}
            min={0.5}
            max={3}
            step={0.05}
            display={display.nodeScale.toFixed(2)}
            onChange={(v) => setDisplay("nodeScale", v)}
          />
          <Slider
            label="Link thickness"
            value={display.linkThickness}
            min={0.5}
            max={3}
            step={0.05}
            display={display.linkThickness.toFixed(2)}
            onChange={(v) => setDisplay("linkThickness", v)}
          />
          <Slider
            label="Text fade threshold"
            value={display.textFade}
            min={0}
            max={1}
            step={0.01}
            display={display.textFade.toFixed(2)}
            onChange={(v) => setDisplay("textFade", v)}
          />
          <label
            className="mt-1 flex cursor-pointer items-center gap-2 py-[3px] text-[12px]"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              className="graph-check"
              checked={showCross}
              onChange={(e) => setShowCross(e.target.checked)}
            />
            Cross-module links
          </label>
        </Section>

        <Section
          title="Forces"
          right={
            <button
              className="text-[10px] underline-offset-2 hover:underline"
              style={{ color: "var(--text-dim)" }}
              onClick={resetForces}
            >
              reset
            </button>
          }
        >
          <Slider
            label="Center force"
            value={forces.center}
            min={0}
            max={1}
            step={0.01}
            display={forces.center.toFixed(2)}
            onChange={(v) => setForce("center", v)}
          />
          <Slider
            label="Repel force"
            value={forces.repel}
            min={0}
            max={1}
            step={0.01}
            display={forces.repel.toFixed(2)}
            onChange={(v) => setForce("repel", v)}
          />
          <Slider
            label="Link force"
            value={forces.link}
            min={0}
            max={1}
            step={0.01}
            display={forces.link.toFixed(2)}
            onChange={(v) => setForce("link", v)}
          />
          <Slider
            label="Link distance"
            value={forces.distance}
            min={10}
            max={220}
            step={1}
            display={`${forces.distance}`}
            onChange={(v) => setForce("distance", v)}
          />
        </Section>

        {selectedId && (
          <Section
            title="Local graph"
            right={
              <button
                className="text-[10px] underline-offset-2 hover:underline"
                style={{ color: "var(--text-dim)" }}
                onClick={() => select(null)}
              >
                clear
              </button>
            }
          >
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((depth) => (
                <button
                  key={depth}
                  className="graph-chip"
                  data-active={localDepth === depth}
                  onClick={() => setLocalDepth(depth)}
                >
                  {depth === 0 ? "Global" : `Depth ${depth}`}
                </button>
              ))}
            </div>
          </Section>
        )}
      </div>

      <div
        className="border-t px-3 py-2 text-[10px]"
        style={{ borderColor: "var(--panel-border)", color: "var(--text-dim)" }}
      >
        showing {shown.toLocaleString()} / {built.nodes.length.toLocaleString()} nodes ·{" "}
        {built.stats.crossEdges} cross-links
      </div>
    </div>
  );
}
