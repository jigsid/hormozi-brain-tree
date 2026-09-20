# Hormozi Graph

The earlier, circular view of the same brain: an interactive force-directed graph where modules, frameworks, tactics, and rules link to each other, including cross-links between modules.

Built with Next.js + TypeScript. The tree in the repo root (`index.html`) is a simpler, faster view of the same material; this one is the connected-web view.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Layout

- `src/data/` - the graph content: one file per module (offers, leads, moneyModels, sales, scaling, mindset, voice), built with a small DSL (`dsl.ts`), plus `crossLinks.ts` for edges between modules and `layout.ts` for precomputed positions.
- `src/components/` - GraphCanvas (the circle), ControlPanel, DetailsPanel, TopBar, GraphApp.
- `src/lib/` - store, selectors, force parameters, theme.
- `scripts/` - layout precompute, graph verification, UI checks, screenshots.
