export interface Palette {
  bg: string;
  bgImage: string;
  panel: string;
  panelBorder: string;
  text: string;
  textDim: string;
  accent: string;
  nodeColor: string;
  label: string;
  labelShadow: string;
  edge: string;
  edgeCross: string;
  edgeActive: string;
  edgeDim: string;
  halo: string;
  selection: string;
  hoverCard: string;
}

export const PALETTE: Palette = {
  bg: "#ffffff",
  bgImage: "radial-gradient(1200px 800px at 50% 40%, #fdfdfd 0%, #f4f4f4 100%)",
  panel: "rgba(252, 252, 252, 0.94)",
  panelBorder: "rgba(0, 0, 0, 0.09)",
  text: "#2e3338",
  textDim: "#6b7280",
  accent: "#7c3aed",
  nodeColor: "#565f6d",
  label: "#3b3f46",
  labelShadow: "rgba(255, 255, 255, 0.9)",
  edge: "rgba(0, 0, 0, 0.14)",
  edgeCross: "rgba(124, 58, 237, 0.3)",
  edgeActive: "rgba(124, 58, 237, 0.95)",
  edgeDim: "rgba(0, 0, 0, 0.04)",
  halo: "rgba(124, 58, 237, 0.18)",
  selection: "#7c3aed",
  hoverCard: "rgba(255, 255, 255, 0.98)",
};

export function mix(hexA: string, hexB: string, t: number): string {
  const a = hexA.replace("#", "");
  const b = hexB.replace("#", "");
  const pa = [0, 2, 4].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [0, 2, 4].map((i) => parseInt(b.slice(i, i + 2), 16));
  const out = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
}

export function darken(hex: string, amount: number): string {
  return mix(hex, "#000000", amount);
}

export function wash(hex: string, amount: number): string {
  return mix(hex, "#ffffff", amount);
}

export function withAlpha(color: string, alpha: number): string {
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((p) => parseFloat(p.trim()));
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
  }
  const clean = color.replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function lighten(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const r = Math.min(255, Math.round(parseInt(value.slice(0, 2), 16) + 255 * amount));
  const g = Math.min(255, Math.round(parseInt(value.slice(2, 4), 16) + 255 * amount));
  const b = Math.min(255, Math.round(parseInt(value.slice(4, 6), 16) + 255 * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

export const MODULE_SOURCE: Record<string, string> = {
  harness: "skill/SKILL.md",
  offers: "skill/references/offers.md",
  leads: "skill/references/leads.md",
  money: "skill/references/money-models.md",
  sales: "skill/references/sales.md",
  scaling: "skill/references/scaling-retention.md",
  mindset: "skill/references/mindset-operator.md",
  voice: "skill/references/voice.md",
};

export const TYPE_LABELS: Record<string, string> = {
  root: "Root",
  module: "Module",
  framework: "Framework",
  component: "Component",
  tactic: "Tactic",
  rule: "Rule / threshold",
  checklist: "Checklist",
  mistake: "Failure mode",
  example: "Example",
  trigger: "Trigger",
  tool: "MCP tool",
  artifact: "Artifact",
};
