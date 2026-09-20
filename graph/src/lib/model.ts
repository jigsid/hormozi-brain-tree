import Graph from "graphology";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import type { BuiltGraph } from "@/data/build";
import type { Forces } from "./store";
import {
  ALPHA_DECAY,
  ALPHA_MIN,
  RADIAL_RADIUS,
  RADIAL_STRENGTH,
  VELOCITY_DECAY,
  chargeStrength,
  centerStrength,
  collideRadius,
  linkDistance,
  linkStrength,
} from "./forceParams";

interface SimNode extends SimulationNodeDatum {
  id: string;
  size: number;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  kind: "tree" | "cross";
}

export interface HarnessNodeAttrs {
  x: number;
  y: number;
  size: number;
  color: string;
  label: string;
  nodeType: string;
  module: string;
  level: number;
  summary: string;
  borderColor?: string;
}

export interface HarnessEdgeAttrs {
  kind: "tree" | "cross";
  label: string;
}

export class GraphModel {
  readonly graph: Graph<HarnessNodeAttrs, HarnessEdgeAttrs>;
  readonly built: BuiltGraph;
  onTick: (() => void) | null = null;

  private sim: Simulation<SimNode, SimLink>;
  private simById = new Map<string, SimNode>();
  private forces: Forces;
  private rafId: number | null = null;

  constructor(built: BuiltGraph, forces: Forces) {
    this.forces = forces;
    this.built = built;
    this.graph = new Graph<HarnessNodeAttrs, HarnessEdgeAttrs>({
      multi: false,
      type: "directed",
    });

    for (const n of built.nodes) {
      this.graph.addNode(n.id, {
        x: n.x,
        y: n.y,
        size: n.size,
        color: n.color,
        label: n.label,
        nodeType: n.type,
        module: n.module,
        level: n.level,
        summary: n.summary ?? "",
      });
    }
    for (const e of built.edges) {
      this.graph.addEdgeWithKey(e.id, e.source, e.target, {
        kind: e.kind,
        label: e.label ?? "",
      });
    }

    const simNodes: SimNode[] = built.nodes.map((n) => ({
      id: n.id,
      size: n.size,
      x: n.x,
      y: n.y,
    }));
    for (const sn of simNodes) this.simById.set(sn.id, sn);

    const links: SimLink[] = built.edges.map((e) => ({
      source: e.source,
      target: e.target,
      kind: e.kind,
    }));

    this.sim = forceSimulation<SimNode>(simNodes)
      .force("link", forceLink<SimNode, SimLink>(links).id((d) => d.id))
      .force("charge", forceManyBody<SimNode>())
      .force("center", forceCenter(0, 0))
      .force("x", forceX<SimNode>(0))
      .force("y", forceY<SimNode>(0))
      .force("radial", forceRadial<SimNode>(RADIAL_RADIUS, 0, 0).strength(RADIAL_STRENGTH))
      .force("collide", forceCollide<SimNode>((d) => collideRadius(d.size)).iterations(2))
      .alphaDecay(ALPHA_DECAY)
      .velocityDecay(VELOCITY_DECAY)
      .alpha(0)
      .stop();

    this.sim.on("tick", () => {
      const g = this.graph;
      for (const sn of simNodes) {
        if (sn.x == null || sn.y == null) continue;
        g.setNodeAttribute(sn.id, "x", sn.x);
        g.setNodeAttribute(sn.id, "y", sn.y);
      }
    });

    this.applyForceParams();
  }

  private applyForceParams(): void {
    const forces = this.forces;
    const link = this.sim.force("link") as ReturnType<typeof forceLink<SimNode, SimLink>>;
    link
      .distance((l) => linkDistance(forces.distance, l.kind))
      .strength((l) => linkStrength(forces.link, l.kind));
    const charge = this.sim.force("charge") as ReturnType<typeof forceManyBody<SimNode>>;
    charge.strength(chargeStrength(forces.repel)).distanceMax(700);
    (this.sim.force("x") as ReturnType<typeof forceX<SimNode>>).strength(
      centerStrength(forces.center),
    );
    (this.sim.force("y") as ReturnType<typeof forceY<SimNode>>).strength(
      centerStrength(forces.center),
    );
  }

  private isHot(): boolean {
    return this.sim.alpha() > ALPHA_MIN || this.sim.alphaTarget() > ALPHA_MIN;
  }

  private ensureLoop(): void {
    if (this.rafId != null) return;
    const step = () => {
      this.rafId = null;
      if (!this.isHot()) return;
      this.sim.tick();
      this.onTick?.();
      this.rafId = requestAnimationFrame(step);
    };
    this.rafId = requestAnimationFrame(step);
  }

  setForces(forces: Forces): void {
    this.forces = forces;
    this.applyForceParams();
    this.sim.alpha(0.35).restart();
    this.sim.stop();
    this.ensureLoop();
  }

  reheat(): void {
    this.sim.alpha(0.6).restart();
    this.sim.stop();
    this.ensureLoop();
  }

  dragStart(id: string): void {
    const sn = this.simById.get(id);
    if (!sn) return;
    sn.fx = sn.x;
    sn.fy = sn.y;
    this.sim.alphaTarget(0.3).restart();
    this.sim.stop();
    this.ensureLoop();
  }

  dragMove(id: string, x: number, y: number): void {
    const sn = this.simById.get(id);
    if (!sn) return;
    sn.fx = x;
    sn.fy = y;
    this.graph.setNodeAttribute(id, "x", x);
    this.graph.setNodeAttribute(id, "y", y);
  }

  dragEnd(id: string): void {
    const sn = this.simById.get(id);
    if (!sn) return;
    sn.fx = null;
    sn.fy = null;
    this.sim.alphaTarget(0);
    this.ensureLoop();
  }

  dispose(): void {
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.sim.stop();
  }
}
