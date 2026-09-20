import type { Forces } from "./store";

export const NODE_SIZE_BASE = 2.4;

export function nodeRadius(degree: number): number {
  return (2 + Math.sqrt(Math.max(degree, 1))) * NODE_SIZE_BASE;
}

export function chargeStrength(repel: number): number {
  return -20 - repel * 320;
}

export function linkDistance(distance: number, kind: "tree" | "cross"): number {
  return kind === "cross" ? 220 : 30 + distance;
}

export function linkStrength(link: number, kind: "tree" | "cross"): number {
  return kind === "cross" ? 0.02 : 0.1 + link * 0.5;
}

export function centerStrength(center: number): number {
  return center * 0.5;
}

export function collideRadius(size: number): number {
  return size + 2;
}

export const RADIAL_RADIUS = 780;
export const RADIAL_STRENGTH = 0.07;
export const ALPHA_DECAY = 0.022;
export const VELOCITY_DECAY = 0.36;
export const ALPHA_MIN = 0.005;

export const DEFAULT_SIM_FORCES: Forces = {
  center: 0.2,
  repel: 0.5,
  link: 0.55,
  distance: 45,
};
