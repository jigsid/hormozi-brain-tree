"use client";

import { useGraphStore } from "@/lib/store";

export default function TopBar() {
  const controlsOpen = useGraphStore((s) => s.controlsOpen);
  const setControlsOpen = useGraphStore((s) => s.setControlsOpen);

  return (
    <div className="pointer-events-none absolute left-4 top-4 z-20 flex flex-col items-start gap-2">
      <div
        className="pointer-events-auto rounded-lg border px-3 py-2 text-[13px] font-semibold tracking-tight"
        style={{
          background: "var(--panel)",
          borderColor: "var(--panel-border)",
          color: "var(--text)",
          backdropFilter: "blur(8px)",
        }}
      >
        Hormozi Growth Engine
      </div>

      <button
        className="graph-btn pointer-events-auto"
        onClick={() => setControlsOpen(!controlsOpen)}
        title={controlsOpen ? "Hide controls" : "Show controls"}
      >
        {controlsOpen ? "⟨" : "⟩"}
      </button>
    </div>
  );
}
