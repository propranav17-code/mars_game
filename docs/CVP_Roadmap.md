# Project Mars

# 09_CVP_Roadmap.md

**Version:** 1.0

**Status:** Approved

**Owner:** Pranav

**Purpose:** Define the implementation roadmap for the Concept Validation Prototype (CVP). This document is the primary development guide for AI coding assistants and developers building the browser prototype.

---

# 1. Purpose

The Concept Validation Prototype (CVP) is **not the final game**.

Its purpose is to answer one question:

> **Is Project Mars fun enough to justify building the full Unreal Engine version?**

Every phase introduces one or more gameplay systems that can be tested independently.

Only validated systems move into the production game.

---

# 2. Development Philosophy

The CVP should:

* Build fast.
* Validate gameplay.
* Ignore visual perfection.
* Use placeholder assets when needed.
* Be playable in a web browser.
* Be easy to deploy and test.

Gameplay is always more important than graphics.

---

# 3. Technology Stack

Frontend

* HTML5
* CSS3
* JavaScript (TypeScript optional)
* Three.js

Backend (when required)

* Python
* FastAPI

Deployment

* Vercel (Preferred)
* GitHub Pages (Static Builds)

Version Control

* GitHub

---

# 4. AI Development Rules

Before implementing any phase:

1. Read every document inside the `/docs` folder.
2. Treat those documents as the source of truth.
3. Implement only the current phase.
4. Never add future systems early.
5. Never change gameplay design without updating the documentation.
6. Keep code modular and documented.
7. Prefer simple, maintainable solutions over complex ones.

---

# 5. Phase Overview

| Phase | Name               | Goal                                          |
| ----- | ------------------ | --------------------------------------------- |
| 1     | Core Gameplay      | Validate the repair loop                      |
| 2     | Survival Systems   | Validate survival mechanics                   |
| 3     | Engineering        | Validate crafting and manufacturing           |
| 4     | Exploration        | Validate open-world gameplay                  |
| 5     | AI & Robots        | Validate assistance and automation            |
| 6     | Colony Systems     | Validate long-term progression                |
| 7     | Multiplayer        | Validate cooperative gameplay                 |
| 8     | Prototype Complete | Gather feedback and prepare for Unreal Engine |

---

# Phase 1 — Core Gameplay

### Objective

Answer:

**Is repairing Mars enjoyable?**

### Features

* First-person movement
* Mouse look
* Mars terrain
* Research Station Alpha
* One engineering wrench
* One leaking pipe
* One repair interaction
* Mission completion
* Save basic progress

### Excluded

* Hunger
* Thirst
* AI
* Robots
* Inventory
* Crafting
* Multiplayer

### Success Criteria

A new player can:

* Spawn
* Explore
* Find the wrench
* Repair the pipe
* Complete Operation OP_001

If players enjoy this loop, continue to Phase 2.

---

# Phase 2 — Survival Systems

### Objective

Determine whether survival mechanics improve the gameplay.

### New Features

* Health
* Oxygen
* Hunger
* Thirst
* Basic inventory
* Multiple repair operations
* Simple save/load
* Day/Night cycle

### Validation Questions

* Does survival create meaningful decisions?
* Does it slow the game too much?
* Is exploration still enjoyable?

---

# Phase 3 — Engineering

### Objective

Test rebuilding and manufacturing.

### New Features

* Standard 3D Printer
* Resource collection
* Crafting
* Printed replacement parts
* Tool upgrades
* Manufacturing station
* Expanded inventory

### Validation Questions

* Is building tools satisfying?
* Do players understand manufacturing?
* Does crafting support the gameplay loop?

---

# Phase 4 — Exploration

### Objective

Validate open-world exploration.

### New Features

* Larger Mars region
* Multiple research stations
* Hidden engineering operations
* Supply caches
* New terrain types
* Environmental storytelling
* Additional Operations

### Validation Questions

* Do players enjoy discovering new locations?
* Does exploration naturally lead to engineering tasks?

---

# Phase 5 — AI & Robots

### Objective

Validate AI assistance and automation.

### New Features

* AI Assistant unlocked after restoring Communications & Operations Center
* HUD
* Engineering database
* Robot repair
* Friendly robots
* Corrupted robots
* Robot maintenance tasks

### Validation Questions

* Does the AI assist without removing exploration?
* Do robots make the world feel more alive?

---

# Phase 6 — Colony Systems

### Objective

Validate long-term progression.

### New Features

* Base upgrades
* Printer upgrades
* Greenhouse
* Water network
* Power network
* Research unlocks
* Basic colony statistics
* First governance concepts

### Validation Questions

* Do players enjoy rebuilding over long sessions?
* Does the colony feel like it is growing?

---

# Phase 7 — Multiplayer

### Objective

Validate cooperative gameplay.

### New Features

* 1–4 player co-op
* Shared operations
* Shared resources
* Shared manufacturing
* Shared colony progression

### Validation Questions

* Is the game more enjoyable with friends?
* Are Operations naturally cooperative?

---

# Phase 8 — Prototype Complete

### Objective

Evaluate the Concept Validation Prototype.

### Tasks

* Collect player feedback.
* Measure completion rates.
* Identify enjoyable systems.
* Remove unnecessary mechanics.
* Prepare Unreal Engine production roadmap.

### Deliverable

A validated game design ready for implementation in Unreal Engine.

---

# Definition of Done

The CVP is complete when:

* Every phase has been implemented.
* Every phase has been tested.
* Feedback has been collected.
* Gameplay systems have been evaluated.
* A final decision is made regarding Unreal Engine development.

---

# Claude Implementation Checklist

Before each coding session:

* Read every file inside `/docs`.
* Read this roadmap.
* Build only the requested phase.
* Write clean, modular code.
* Update project documentation if necessary.
* Do not invent gameplay systems.
* Stop after completing the assigned phase.

---

# Long-Term Goal

The browser prototype is a validation platform.

Once the gameplay has been proven, Project Mars will be rebuilt in Unreal Engine using the same design documents as the foundation.

The browser prototype is not discarded.

It becomes the reference implementation that proved the gameplay was worth building.

---

# Revision History

| Version | Date         | Description                                   |
| ------- | ------------ | --------------------------------------------- |
| 1.0     | 19 July 2026 | Initial CVP roadmap and implementation guide. |
