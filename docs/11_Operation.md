# Project Mars

**Document:** 05_Operations.md

**Version:** 1.0

**Status:** Approved

**Owner:** Pranav

**Purpose:** Define the Engineering Operations system, task structure, progression and implementation rules.

**Dependencies:**

* 01_Concept_Bible.md
* 03_Story_and_Lore.md
* 04_World_Rules.md

**Last Updated:** 19 July 2026

---

# 1. Purpose

Project Mars does not use a traditional "Quest System."

Instead, the game is built around **Engineering Operations**.

Operations represent real engineering objectives required to rebuild Mars.

Each Operation is divided into one or more Tasks.

Completing Tasks changes the world permanently.

---

# 2. Philosophy

Players should feel like engineers.

Not heroes.

Every completed Operation should solve a real problem.

Examples:

Restore water.

Restore power.

Repair communications.

Restart manufacturing.

Repair greenhouse.

Recover robots.

Build transportation.

Construct new habitats.

The world improves because of the player's work.

---

# 3. Structure

Every objective follows this hierarchy:

```text
Story Goal
    ↓
Operation
    ↓
Task
```

Example:

```text
Story Goal
Build a Permanent Colony

↓

Operation
Restore Water

↓

Tasks

Find Wrench

↓

Repair Pipe

↓

Restart Pump

↓

Water Restored
```

---

# 4. Discovering Operations

Operations are **not assigned** by the game.

Players discover them by:

* Exploring
* Finding damaged systems
* Reading engineering terminals
* Inspecting robots
* Observing failures
* Restoring station power

The world itself creates Operations.

---

# 5. AI Assistance

During **Era 0**, no Operations list is visible.

Players discover tasks naturally.

After restoring the Communications & Operations Center:

The AI Assistant becomes active.

The AI begins recording discovered Operations.

The AI never creates Operations.

It only tracks them.

---

# 6. Operation Lifecycle

Every Operation follows the same lifecycle.

```text
Unknown

↓

Discovered

↓

Investigating

↓

In Progress

↓

Completed

↓

Operational
```

Example:

Player notices leaking pipe.

↓

Operation Discovered

↓

Find repair tool.

↓

Repair completed.

↓

Water system operational.

---

# 7. Operation Template

Every Operation should follow this format.

---

Operation ID

OP_001

Operation Name

Restore Water Distribution

Category

Infrastructure

Priority

Critical

Location

Research Station Alpha

Required Tools

Engineering Wrench

Tasks

TASK_001

Find Wrench

TASK_002

Repair Pipe A

TASK_003

Restart Water Pump

Completion Result

Water restored

Future Unlocks

Greenhouse

Basic Agriculture

Printer Cooling

AI Notes

Display after AI becomes available.

---

# 8. Task Template

Task ID

TASK_001

Task Name

Find Engineering Wrench

Category

Exploration

Required Item

None

Completion

Player collects wrench.

Reward

Unlock next repair.

World Change

None

---

Task ID

TASK_002

Task Name

Repair Water Pipe

Category

Engineering

Required Item

Engineering Wrench

Completion

Repair completed.

World Change

Water leak stops.

---

# 9. Types of Operations

Infrastructure

Power

Water

Communications

Life Support

Manufacturing

Research

Robotics

Agriculture

Transportation

Construction

Exploration

Emergency

Each category may contain many Operations.

---

# 10. Era Progression

## Era 0 — Emergency

No AI

No mission list

No guidance

Players discover problems through exploration.

Operations are hidden.

---

## Era 1 — Recovery

AI online

Discovered Operations become visible.

AI records progress.

Basic planning tools unlocked.

---

## Era 2 — Industry

Multiple Operations can run simultaneously.

Printers upgraded.

Factories repaired.

Manufacturing expands.

---

## Era 3 — Expansion

Operations extend beyond the first station.

Players build new infrastructure.

Transport networks created.

---

## Era 4 — Civilization

Large-scale Operations become available.

Examples:

New settlements

Government buildings

Launch facilities

Orbital communications

Planet-wide logistics

---

# 11. Difficulty Philosophy

Operations should increase in complexity.

Never through larger numbers.

Instead through:

More planning.

Multiple locations.

Resource management.

Engineering choices.

Teamwork.

---

# 12. Rewards

Operations do not primarily reward money.

They reward:

New capabilities.

New areas.

New manufacturing.

New technologies.

New knowledge.

The world itself is the reward.

---

# 13. Co-op

All players contribute to Operations.

Example:

Player A

Repairs generator.

Player B

Collects replacement parts.

Player C

Repairs wiring.

Player D

Restarts system.

Operation completes together.

---

# 14. Failure

Failure is allowed.

Examples:

Missing tools.

Insufficient power.

Broken printer.

Damaged robot.

The game encourages players to solve problems rather than punishing them.

---

# 15. Design Rules

Operations should:

Solve one meaningful problem.

Take between 2 and 20 minutes.

Have visible impact.

Teach something.

Unlock future possibilities.

Avoid repetition.

---

# 16. Prototype Operation

Operation ID

OP_001

Name

Restore Water Distribution

Tasks

Find Wrench

Repair Pipe

Restart Pump

Result

Water restored.

Mission complete.

This Operation serves as the Concept Validation Prototype.

If players enjoy OP_001, the gameplay loop has been validated.

---

# 17. Future Operations

Examples:

Restore Solar Farm

Repair Greenhouse

Recover Rover

Restart Printer

Repair Airlock

Restore Laboratory

Recover Geological Samples

Repair Drone Hangar

Restart Fuel Plant

Construct Rocket Launch Pad

These should all follow the same specification.

---

# Developer Notes

Operations are the primary gameplay system of Project Mars.

Every interactive object should belong to an Operation.

Developers should avoid adding standalone tasks that do not contribute to a meaningful engineering objective.

---

# Revision History

| Version | Date         | Description                       |
| ------- | ------------ | --------------------------------- |
| 1.0     | 19 July 2026 | Initial Operations specification. |

---

# Related Documents

**Previous**

04_World_Rules.md

**Next**

06_Items_and_Equipment.md
