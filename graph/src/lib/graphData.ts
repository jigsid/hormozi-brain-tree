import { buildGraph, type BuiltGraph } from "@/data/build";

let cached: BuiltGraph | null = null;

export function getBuiltGraph(): BuiltGraph {
  if (!cached) cached = buildGraph();
  return cached;
}
