"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { PALETTE } from "@/lib/theme";
import TopBar from "./TopBar";
import ControlPanel from "./ControlPanel";
import DetailsPanel from "./DetailsPanel";

const GraphCanvas = dynamic(() => import("./GraphCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="text-sm" style={{ color: "var(--text-dim)" }}>
        Building graph…
      </div>
    </div>
  ),
});

export default function GraphApp() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", PALETTE.bg);
    root.style.setProperty("--bg-image", PALETTE.bgImage);
    root.style.setProperty("--panel", PALETTE.panel);
    root.style.setProperty("--panel-border", PALETTE.panelBorder);
    root.style.setProperty("--text", PALETTE.text);
    root.style.setProperty("--text-dim", PALETTE.textDim);
    root.style.setProperty("--accent", PALETTE.accent);
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden" style={{ background: "var(--bg-image)" }}>
      <GraphCanvas />
      <TopBar />
      <ControlPanel />
      <DetailsPanel />
    </div>
  );
}
