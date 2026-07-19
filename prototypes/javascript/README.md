# Project Mars — Concept Validation Prototype (CVP)

A lightweight, browser-based prototype built with **Three.js** to answer one
question: *Is rebuilding and repairing a damaged Mars research station fun?*

This is a **validation tool**, not the final game. Gameplay over graphics.

## Mission 001 — Repair the Water Pipe

1. Enter the research station
2. Locate the engineering wrench
3. Exit the station
4. Repair the damaged pipe
5. Restore water flow → **Mission Complete**

Target session length: 3–5 minutes.

## Controls

| Key       | Action        |
|-----------|---------------|
| `W A S D` | Move          |
| `Mouse`   | Look around   |
| `Shift`   | Sprint        |
| `Space`   | Jump          |
| `E`       | Interact      |
| `Esc`     | Pause         |

## Run it locally

No build step. It's plain HTML + JS with Three.js loaded from a CDN. You just
need to serve the folder over HTTP (ES modules don't load from `file://`):

```bash
# Option A — Node
npx serve .

# Option B — Python
python -m http.server 8000
```

Then open the printed URL (e.g. http://localhost:8000) and click **Begin**.

## Project structure

```
project-mars-cvp/
├── assets/            # (models, textures, audio — added later if needed)
├── src/
│   ├── core/          # game.js  — bootstrap + main loop
│   ├── player/        # player.js — FPS controller
│   ├── missions/      # mission.js — Mission 001 objectives
│   ├── interactions/  # interactions.js — E-key interaction system
│   ├── world/         # world.js — Mars scene, station, wrench, pipe
│   └── ui/            # ui.js + ui.css — minimal HUD
├── index.html
├── package.json
└── README.md
```

## Status

Version 1 — playable core loop, built from Three.js primitives (no external
assets yet). Real low-poly models are only swapped in later, and only if the
concept validates.
