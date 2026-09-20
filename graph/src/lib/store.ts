"use client";

import { create } from "zustand";

export interface Forces {
  center: number;
  repel: number;
  link: number;
  distance: number;
}

export interface TypeFilter {
  key: string;
  label: string;
  types: string[];
}

export const TYPE_FILTERS: TypeFilter[] = [
  { key: "rules", label: "Rules & thresholds", types: ["rule"] },
  { key: "checklists", label: "Checklists", types: ["checklist"] },
  { key: "mistakes", label: "Failure modes", types: ["mistake"] },
  { key: "examples", label: "Examples", types: ["example"] },
  { key: "triggers", label: "Triggers", types: ["trigger"] },
  { key: "tools", label: "Tools & artifacts", types: ["tool", "artifact"] },
];

export const DEFAULT_FORCES: Forces = {
  center: 0.2,
  repel: 0.5,
  link: 0.55,
  distance: 45,
};

export const DEFAULT_DISPLAY = {
  nodeScale: 0.5,
  linkThickness: 1,
  textFade: 0.5,
};

interface GraphState {
  search: string;
  selectedId: string | null;
  hoveredId: string | null;
  hiddenModules: string[];
  maxLevel: number;
  typeVisibility: Record<string, boolean>;
  showCross: boolean;
  localDepth: number;
  forces: Forces;
  display: typeof DEFAULT_DISPLAY;
  controlsOpen: boolean;
  pendingFocus: string | null;
  setSearch: (search: string) => void;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  toggleModule: (id: string) => void;
  setAllModules: (hidden: string[]) => void;
  setMaxLevel: (level: number) => void;
  toggleType: (key: string) => void;
  setShowCross: (value: boolean) => void;
  setLocalDepth: (depth: number) => void;
  setForce: (key: keyof Forces, value: number) => void;
  resetForces: () => void;
  setDisplay: (key: keyof typeof DEFAULT_DISPLAY, value: number) => void;
  setControlsOpen: (open: boolean) => void;
  setPendingFocus: (id: string | null) => void;
}

export const useGraphStore = create<GraphState>((set, get) => ({
  search: "",
  selectedId: null,
  hoveredId: null,
  hiddenModules: [],
  maxLevel: 6,
  typeVisibility: Object.fromEntries(TYPE_FILTERS.map((f) => [f.key, true])),
  showCross: true,
  localDepth: 0,
  forces: DEFAULT_FORCES,
  display: DEFAULT_DISPLAY,
  controlsOpen: false,
  pendingFocus: null,
  setSearch: (search) => set({ search }),
  select: (id) => set({ selectedId: id, localDepth: id ? get().localDepth : 0 }),
  hover: (id) => set({ hoveredId: id }),
  toggleModule: (id) =>
    set((s) => ({
      hiddenModules: s.hiddenModules.includes(id)
        ? s.hiddenModules.filter((m) => m !== id)
        : [...s.hiddenModules, id],
    })),
  setAllModules: (hidden) => set({ hiddenModules: hidden }),
  setMaxLevel: (maxLevel) => set({ maxLevel }),
  toggleType: (key) =>
    set((s) => ({
      typeVisibility: { ...s.typeVisibility, [key]: !s.typeVisibility[key] },
    })),
  setShowCross: (showCross) => set({ showCross }),
  setLocalDepth: (localDepth) => set({ localDepth }),
  setForce: (key, value) =>
    set((s) => ({ forces: { ...s.forces, [key]: value } })),
  resetForces: () => set({ forces: DEFAULT_FORCES }),
  setDisplay: (key, value) =>
    set((s) => ({ display: { ...s.display, [key]: value } })),
  setControlsOpen: (controlsOpen) => set({ controlsOpen }),
  setPendingFocus: (pendingFocus) => set({ pendingFocus }),
}));
