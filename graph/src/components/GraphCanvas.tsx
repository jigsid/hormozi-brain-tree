"use client";

import { useEffect, useMemo, useRef } from "react";
import Sigma from "sigma";
import type { Attributes } from "graphology-types";
import type { EdgeDisplayData, NodeDisplayData } from "sigma/types";
import type { NodeProgramType } from "sigma/rendering";
import { NodeBorderProgram } from "@sigma/node-border";
import { GraphModel, type HarnessEdgeAttrs, type HarnessNodeAttrs } from "@/lib/model";
import { getBuiltGraph } from "@/lib/graphData";
import { useGraphStore } from "@/lib/store";
import { PALETTE, darken, wash, withAlpha } from "@/lib/theme";
import {
  centerOnNode,
  computeSearchHits,
  computeVisible,
  fitCameraToIds,
  neighborSet,
} from "@/lib/selectors";

const REVEAL_DURATION_MS = 2800;
const HOVER_TWEEN_MS = 180;
const DIM_ALPHA = 0.2;

interface LabelState {
  palette: typeof PALETTE;
  visible: boolean;
  textFade: number;
  zoomFit: number;
  active: Set<string>;
  hoveredId: string | null;
  searchActive: boolean;
  hits: Set<string>;
  ratio: () => number;
}

function drawObsidianLabel(
  context: CanvasRenderingContext2D,
  data: {
    x: number;
    y: number;
    size: number;
    label?: string | null;
    key?: string;
    color?: string;
    borderColor?: string;
  },
  settings: { labelSize: number; labelFont: string; labelWeight: string },
  state: LabelState,
): void {
  if (!data.label || !state.visible) return;
  const key = data.key ?? "";
  const isActive = state.active.has(key);
  let alpha = 1;
  if (state.searchActive && !state.hits.has(key)) {
    alpha = 0;
  } else if (!isActive) {
    const zoom = 1 / Math.max(state.ratio(), 0.001);
    const z = zoom / Math.max(state.zoomFit, 0.001);
    const start = 0.8 + (state.textFade - 0.5) * 0.8;
    alpha = Math.min(Math.max((z - start) / 0.6, 0), 1);
  }
  if (alpha <= 0.01) return;

  if (isActive) {
    const isHovered = key === state.hoveredId;
    const glowColor = isHovered ? state.palette.accent : state.palette.nodeColor;
    const radius = data.size * (isHovered ? 3.4 : 2.6);
    const gradient = context.createRadialGradient(
      data.x,
      data.y,
      data.size * 0.4,
      data.x,
      data.y,
      radius,
    );
    gradient.addColorStop(0, withAlpha(glowColor, isHovered ? 0.4 : 0.24));
    gradient.addColorStop(1, withAlpha(glowColor, 0));
    context.globalAlpha = 1;
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(data.x, data.y, radius, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(data.x, data.y, data.size, 0, Math.PI * 2);
    context.fillStyle = data.color ?? state.palette.nodeColor;
    context.fill();
    context.lineWidth = Math.max(1, data.size * 0.14);
    context.strokeStyle = data.borderColor ?? withAlpha(state.palette.nodeColor, 0.6);
    context.stroke();
  }

  context.globalAlpha = alpha;
  context.font = `${settings.labelWeight} ${settings.labelSize}px ${settings.labelFont}`;
  context.fillStyle = state.palette.label;
  context.shadowColor = state.palette.labelShadow;
  context.shadowBlur = 2.5;
  context.fillText(data.label, data.x + data.size + 3, data.y + settings.labelSize / 3);
  context.shadowBlur = 0;
  context.globalAlpha = 1;
}

function drawObsidianHover(
  context: CanvasRenderingContext2D,
  data: { x: number; y: number; size: number },
  palette: typeof PALETTE,
): void {
  context.beginPath();
  context.arc(data.x, data.y, data.size + 5, 0, Math.PI * 2);
  context.fillStyle = withAlpha(palette.accent, 0.18);
  context.fill();
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function GraphCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const built = useMemo(() => getBuiltGraph(), []);
  const allIds = useMemo(() => new Set(built.nodes.map((n) => n.id)), [built]);
  const distById = useMemo(() => {
    const map = new Map<string, number>();
    let max = 0;
    for (const n of built.nodes) {
      const d = Math.sqrt(n.x * n.x + n.y * n.y);
      map.set(n.id, d);
      max = Math.max(max, d);
    }
    return { map, max };
  }, [built]);
  const modelRef = useRef<GraphModel | null>(null);
  const rendererRef = useRef<Sigma<HarnessNodeAttrs, HarnessEdgeAttrs> | null>(null);

  const search = useGraphStore((s) => s.search);
  const selectedId = useGraphStore((s) => s.selectedId);
  const hoveredId = useGraphStore((s) => s.hoveredId);
  const hiddenModules = useGraphStore((s) => s.hiddenModules);
  const maxLevel = useGraphStore((s) => s.maxLevel);
  const typeVisibility = useGraphStore((s) => s.typeVisibility);
  const showCross = useGraphStore((s) => s.showCross);
  const localDepth = useGraphStore((s) => s.localDepth);
  const forces = useGraphStore((s) => s.forces);
  const display = useGraphStore((s) => s.display);
  const pendingFocus = useGraphStore((s) => s.pendingFocus);

  const visibleRef = useRef<Set<string>>(new Set());
  const hitsRef = useRef<Set<string>>(new Set());
  const neighborsRef = useRef<Set<string>>(new Set());
  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  const showCrossRef = useRef(true);
  const hoverTRef = useRef(0);
  const revealRef = useRef(0);
  const labelsOnRef = useRef(false);
  const zoomFitRef = useRef(1);
  const displayRef = useRef(display);
  const labelStateRef = useRef<LabelState>({
    palette: PALETTE,
    visible: false,
    textFade: display.textFade,
    zoomFit: 1,
    active: new Set<string>(),
    hoveredId: null,
    searchActive: false,
    hits: new Set<string>(),
    ratio: () => 1,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const model = new GraphModel(built, useGraphStore.getState().forces);
    modelRef.current = model;

    const nodeReducer = (
      node: string,
      data: HarnessNodeAttrs,
    ): Partial<NodeDisplayData> & Partial<HarnessNodeAttrs> => {
      if (!visibleRef.current.has(node)) return { ...data, hidden: true };
      if ((distById.map.get(node) ?? 0) > revealRef.current) return { ...data, hidden: true };

      const settings = displayRef.current;
      const dim = 1 - (1 - DIM_ALPHA) * hoverTRef.current;
      const res: Partial<NodeDisplayData> & Partial<HarnessNodeAttrs> = {
        color: PALETTE.nodeColor,
        size: data.size * settings.nodeScale,
        label: data.label,
        borderColor: withAlpha(PALETTE.nodeColor, 0.5),
        zIndex: 0,
      };

      const searchActive = hitsRef.current.size > 0;
      if (searchActive) {
        if (hitsRef.current.has(node)) {
          res.size = data.size * settings.nodeScale * 1.25;
          res.borderColor = PALETTE.accent;
          res.zIndex = 2;
        } else {
          res.color = withAlpha(PALETTE.nodeColor, DIM_ALPHA);
          res.borderColor = withAlpha(PALETTE.nodeColor, 0.1);
          res.label = "";
        }
      }

      const hovered = hoveredRef.current;
      if (hovered) {
        if (node === hovered) {
          res.color = PALETTE.accent;
          res.borderColor = PALETTE.accent;
          res.size = data.size * settings.nodeScale * 1.35;
          res.forceLabel = true;
          res.zIndex = 3;
        } else if (neighborsRef.current.has(node)) {
          res.color = darken(PALETTE.nodeColor, 0.18);
          res.borderColor = darken(PALETTE.nodeColor, 0.28);
          res.size = data.size * settings.nodeScale * 1.1;
          res.forceLabel = true;
          res.zIndex = 1;
        } else if (!searchActive) {
          res.color = withAlpha(wash(PALETTE.nodeColor, 0.45), dim);
          res.borderColor = withAlpha(wash(PALETTE.nodeColor, 0.45), 0.5 * dim);
          res.size = data.size * settings.nodeScale * 0.9;
          res.label = "";
        }
      }

      if (selectedRef.current === node) {
        res.borderColor = PALETTE.accent;
        res.zIndex = Math.max(res.zIndex ?? 0, 2);
      }
      return { ...data, ...res };
    };

    const edgeReducer = (
      edge: string,
      data: HarnessEdgeAttrs,
    ): Partial<EdgeDisplayData> => {
      const graph = model.graph;
      const [s, t] = graph.extremities(edge);
      if (!visibleRef.current.has(s) || !visibleRef.current.has(t)) {
        return { ...data, hidden: true };
      }
      if (
        (distById.map.get(s) ?? 0) > revealRef.current ||
        (distById.map.get(t) ?? 0) > revealRef.current
      ) {
        return { ...data, hidden: true };
      }
      if (data.kind === "cross" && !showCrossRef.current) {
        return { ...data, hidden: true };
      }
      const thickness = displayRef.current.linkThickness;
      const hovered = hoveredRef.current;
      const dim = 1 - (1 - DIM_ALPHA) * hoverTRef.current;
      if (hovered) {
        if (s === hovered || t === hovered) {
          return { ...data, color: PALETTE.edgeActive, size: 2.4 * thickness, zIndex: 2 };
        }
        return { ...data, color: withAlpha(PALETTE.edge, dim), size: 1 * thickness, zIndex: 0 };
      }
      return {
        ...data,
        color: data.kind === "cross" ? PALETTE.edgeCross : PALETTE.edge,
        size: (data.kind === "cross" ? 1 : 1.3) * thickness,
      };
    };

    const renderer = new Sigma<HarnessNodeAttrs, HarnessEdgeAttrs>(model.graph, container, {
      renderLabels: true,
      labelFont:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      labelSize: 11,
      labelWeight: "400",
      labelColor: { color: PALETTE.label },
      labelDensity: 0.5,
      labelGridCellSize: 80,
      labelRenderedSizeThreshold: 2.5,
      defaultDrawNodeLabel: (context, data, settings) =>
        drawObsidianLabel(
          context,
          data as Parameters<typeof drawObsidianLabel>[1],
          settings,
          labelStateRef.current,
        ),
      defaultDrawNodeHover: (context, data) =>
        drawObsidianHover(
          context,
          data as Parameters<typeof drawObsidianHover>[1],
          PALETTE,
        ),
      nodeProgramClasses: {
        border: NodeBorderProgram as unknown as NodeProgramType<
          HarnessNodeAttrs,
          HarnessEdgeAttrs,
          Attributes
        >,
      },
      defaultNodeType: "border",
      defaultEdgeType: "line",
      minEdgeThickness: 0.5,
      zIndex: true,
      hideEdgesOnMove: true,
      hideLabelsOnMove: true,
      enableEdgeEvents: false,
      minCameraRatio: 0.05,
      maxCameraRatio: 12,
      nodeReducer,
      edgeReducer,
    });
    rendererRef.current = renderer;
    model.onTick = () => renderer.refresh();
    labelStateRef.current.ratio = () => renderer.getCamera().getState().ratio;
    if (typeof window !== "undefined") {
      (window as unknown as { __graph?: unknown }).__graph = { model, renderer };
    }

    visibleRef.current = new Set(allIds);
    zoomFitRef.current = 1;
    labelStateRef.current.zoomFit = 1;

    let dragged: string | null = null;
    let downX = 0;
    let downY = 0;

    renderer.on("enterNode", ({ node }) => {
      useGraphStore.getState().hover(node);
      const tooltip = tooltipRef.current;
      if (tooltip) {
        tooltip.textContent = model.graph.getNodeAttribute(node, "label") as string;
        tooltip.style.opacity = "1";
      }
    });
    renderer.on("leaveNode", () => {
      useGraphStore.getState().hover(null);
      if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
    });
    renderer.on("clickNode", ({ node }) => {
      useGraphStore.getState().select(node);
      centerOnNode(renderer, model.graph, node, 400);
    });
    renderer.on("clickStage", () => {
      useGraphStore.getState().select(null);
    });
    renderer.on("doubleClickNode", ({ node }) => {
      useGraphStore.getState().select(node);
      useGraphStore.getState().setLocalDepth(1);
    });
    renderer.on("downNode", ({ node, event }) => {
      dragged = node;
      downX = event.x;
      downY = event.y;
      model.dragStart(node);
    });

    const captor = renderer.getMouseCaptor();
    captor.on("mousemovebody", (event) => {
      if (!dragged) return;
      if (Math.abs(event.x - downX) + Math.abs(event.y - downY) > 4) {
        const pos = renderer.viewportToGraph(event);
        model.dragMove(dragged, pos.x, pos.y);
        event.preventSigmaDefault();
        event.original.preventDefault();
        event.original.stopPropagation();
      }
    });
    captor.on("mouseup", () => {
      if (dragged) {
        model.dragEnd(dragged);
        dragged = null;
      }
    });

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      lastMouse.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const tooltip = tooltipRef.current;
      if (tooltip && tooltip.style.opacity === "1") {
        tooltip.style.transform = `translate(${lastMouse.current.x + 14}px, ${lastMouse.current.y + 14}px)`;
      }
    };
    container.addEventListener("mousemove", onMouseMove);

    let revealRaf: number | null = null;
    const revealStart = performance.now();
    const revealMax = distById.max + 120;
    const stepReveal = () => {
      revealRaf = null;
      const t = Math.min((performance.now() - revealStart) / REVEAL_DURATION_MS, 1);
      revealRef.current = easeInOutCubic(t) * revealMax;
      renderer.refresh();
      if (t < 1) {
        revealRaf = requestAnimationFrame(stepReveal);
      } else {
        labelsOnRef.current = true;
        labelStateRef.current.visible = true;
        renderer.refresh();
      }
    };
    revealRaf = requestAnimationFrame(stepReveal);

    return () => {
      if (revealRaf != null) cancelAnimationFrame(revealRaf);
      container.removeEventListener("mousemove", onMouseMove);
      renderer.kill();
      model.dispose();
      modelRef.current = null;
      rendererRef.current = null;
    };
  }, [built, allIds, distById]);

  useEffect(() => {
    const model = modelRef.current;
    const renderer = rendererRef.current;
    if (!model || !renderer) return;
    visibleRef.current = computeVisible(built, model.graph, {
      hiddenModules,
      maxLevel,
      typeVisibility,
      localDepth,
      selectedId,
    });
    hitsRef.current = computeSearchHits(built, search);
    neighborsRef.current = hoveredId ? neighborSet(model.graph, hoveredId) : new Set();
    hoveredRef.current = hoveredId;
    selectedRef.current = selectedId;
    showCrossRef.current = showCross;
    displayRef.current = display;
    labelStateRef.current.textFade = display.textFade;
    labelStateRef.current.searchActive = hitsRef.current.size > 0;
    labelStateRef.current.hits = hitsRef.current;
    labelStateRef.current.hoveredId = hoveredId;
    labelStateRef.current.active = new Set([
      ...(hoveredId ? [hoveredId] : []),
      ...neighborsRef.current,
    ]);
    containerRef.current?.classList.toggle("graph-hovering", Boolean(hoveredId));

    const target = hoveredId ? 1 : 0;
    if (Math.abs(hoverTRef.current - target) > 0.01) {
      const from = hoverTRef.current;
      const start = performance.now();
      const step = () => {
        const t = Math.min((performance.now() - start) / HOVER_TWEEN_MS, 1);
        hoverTRef.current = from + (target - from) * t;
        renderer.refresh();
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else {
      hoverTRef.current = target;
      renderer.refresh();
    }
  }, [
    built,
    search,
    selectedId,
    hoveredId,
    hiddenModules,
    maxLevel,
    typeVisibility,
    showCross,
    localDepth,
    display,
  ]);

  useEffect(() => {
    modelRef.current?.setForces(forces);
  }, [forces]);

  useEffect(() => {
    if (!pendingFocus) return;
    const renderer = rendererRef.current;
    const model = modelRef.current;
    if (!renderer || !model) return;
    centerOnNode(renderer, model.graph, pendingFocus, 500);
    useGraphStore.getState().setPendingFocus(null);
  }, [pendingFocus]);

  const zoom = (factor: number) => {
    rendererRef.current?.getCamera().animatedZoom({ factor, duration: 200 });
  };
  const fit = () => {
    const renderer = rendererRef.current;
    const model = modelRef.current;
    if (renderer && model) {
      fitCameraToIds(renderer, model.graph, visibleRef.current, 1.12, 600);
    }
  };

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full cursor-grab active:cursor-grabbing" />
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute left-0 top-0 z-30 max-w-[320px] rounded border px-2 py-1 text-xs opacity-0 transition-opacity duration-100"
        style={{
          background: "var(--panel)",
          borderColor: "var(--panel-border)",
          color: "var(--text)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div className="absolute bottom-4 right-4 z-20 flex flex-row gap-1 opacity-50 transition-opacity hover:opacity-100">
        <button className="graph-btn" onClick={() => zoom(1.5)} title="Zoom in">
          +
        </button>
        <button className="graph-btn" onClick={() => zoom(1 / 1.5)} title="Zoom out">
          −
        </button>
        <button className="graph-btn" onClick={fit} title="Fit visible graph">
          ⤢
        </button>
        <button
          className="graph-btn"
          onClick={() => modelRef.current?.reheat()}
          title="Re-heat layout"
        >
          ⟳
        </button>
      </div>
    </div>
  );
}
