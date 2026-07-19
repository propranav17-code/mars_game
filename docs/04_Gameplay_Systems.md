# 04 - Gameplay Systems

# Project Mars

**Document:** 04_Gameplay_Systems
**Version:** 1.0
**Status:** Approved (PoC Scope)
**Last Updated:** 19 July 2026

---

# Purpose

This document defines the gameplay systems required for the Proof of Concept.

Only systems needed to validate the core repair loop are included.

---

# Included Systems

## 1. Player Controller

The player can:

* Walk
* Sprint
* Crouch
* Jump
* Interact with objects

---

## 2. Interaction System

The player can interact with repairable objects, containers, doors, and printers.

Interaction should be context-sensitive and straightforward.

---

## 3. Inventory System

A simple inventory stores:

* Components
* Tools
* Printed items
* Mission objects

The inventory should remain intentionally small for the PoC.

---

## 4. Repair System

Repairing an object requires:

* The correct components
* Time
* Player interaction

Successful repairs permanently restore functionality.

---

## 5. Power System

Power controls:

* Lights
* Doors
* Water pumps
* 3D printers

If power is offline, dependent systems stop functioning.

---

## 6. Water System

Water becomes available only after restoring the pump.

Future systems (such as farming) are outside the PoC scope.

---

## 7. Standard 3D Printer

The player can manufacture a limited set of items:

* Wrench
* Pipe connector
* Repair kit

Additional manufacturing is reserved for later development.

---

## 8. AI Assistant

The HUD AI provides:

* Current objective
* Required repair parts
* Health status
* Oxygen level
* Basic guidance

The AI never performs tasks automatically.

---

## 9. Rover

A small repairable rover allows exploration of nearby areas.

The rover is intentionally simple in the PoC.

---

## 10. Mission System

Tasks are sequential:

1. Restore Power
2. Restore Water
3. Repair Printer
4. Print Tool
5. Repair Rover

Each completed task unlocks the next.

---

# Systems Excluded from the PoC

The following are intentionally postponed:

* Multiplayer
* Colony management
* Farming
* Rocket construction
* Advanced robots
* Combat
* Governance
* Research tree
* Industrial printers
* Base expansion
* Large maps

These systems will be introduced only after the core gameplay loop has been validated.

---

# PoC Goal

The Proof of Concept should answer one question:

> "Is repairing and rebuilding a Mars station enjoyable enough to support a full game?"

Every system included in the prototype exists solely to answer that question.
