# Project Mars

# 10_AI_DEVELOPMENT_GUIDE.md

**Version:** 1.0

**Status:** Approved

**Owner:** Pranav

**Purpose:** Define the workflow, coding standards, documentation process and development rules for any AI assistant or human developer contributing to Project Mars.

---

# 1. Purpose

This document explains how Project Mars should be developed.

It applies to:

* Human developers
* AI coding assistants
* Future contributors

Every contributor should follow this document before writing code.

---

# 2. Development Philosophy

Project Mars is a long-term engineering project.

The goal is not to write code quickly.

The goal is to build a maintainable game with a stable architecture.

Every decision should prioritize:

* Simplicity
* Readability
* Maintainability
* Modularity
* Performance
* Expandability

---

# 3. Before Writing Code

Every development session must begin with the following steps.

### Step 1

Read every file inside the `/docs` directory.

These files define the project.

Code must follow the documentation.

---

### Step 2

Read:

`09_CVP_Roadmap.md`

Determine the active phase.

Only implement that phase.

---

### Step 3

Understand the requested feature.

If requirements are unclear:

Ask questions.

Never guess.

---

# 4. Source of Truth

The documentation is always correct.

If code conflicts with documentation:

Update the code.

Do not silently change the design.

---

# 5. Scope Control

Implement only the requested feature.

Never add:

* Future gameplay systems
* Experimental mechanics
* Personal improvements
* Unrequested UI changes

Project Mars grows one phase at a time.

---

# 6. Code Quality

Code should be:

* Simple
* Modular
* Reusable
* Easy to understand

Avoid:

* Overengineering
* Premature optimization
* Unnecessary abstraction

Write code that a beginner can understand.

---

# 7. Comments

Explain why something exists.

Do not explain obvious syntax.

Example:

Good:

```cpp
// Water pipes require pressure before repairs become available.
```

Bad:

```cpp
// Add 1 to x.
```

---

# 8. Folder Structure

Respect the existing project structure.

Do not move files without approval.

Do not rename documents.

Do not reorganize folders unless requested.

---

# 9. Assets

Placeholder assets are acceptable.

Gameplay is always more important than graphics.

Never delay implementation because the perfect asset is unavailable.

---

# 10. Documentation

Whenever a significant feature is implemented:

Update:

* README
* Relevant documentation
* Changelog (if applicable)

Documentation should always reflect the current project state.

---

# 11. Git

Make small commits.

Each commit should represent one logical feature.

Examples:

✅ Add player movement

✅ Implement repair interaction

✅ Add inventory system

Avoid massive commits containing unrelated changes.

---

# 12. Testing

Every completed feature should be tested.

Check:

* Functionality
* Performance
* Console errors
* Edge cases

A feature is not complete until it has been tested.

---

# 13. Performance

The browser prototype should remain lightweight.

Prefer efficient solutions.

Avoid unnecessary libraries.

Optimize only after functionality is complete.

---

# 14. Problem Solving

When encountering a bug:

1. Identify the cause.
2. Explain the cause.
3. Implement the simplest fix.
4. Verify the fix.

Do not hide problems with workarounds unless absolutely necessary.

---

# 15. Communication

When responding to the project owner:

Explain:

* What was built.
* Why it was built.
* Files modified.
* Remaining work.
* Possible improvements.

Keep explanations concise and technical.

---

# 16. Design Authority

The documentation defines the game.

Developers implement the design.

Developers do not redesign the game unless specifically requested.

Suggestions are welcome.

Design changes require approval.

---

# 17. Browser Prototype

Remember:

This is a Concept Validation Prototype.

The objective is to validate gameplay.

Not visual quality.

Not optimization.

Not AAA graphics.

If gameplay is enjoyable, the prototype is successful.

---

# 18. Unreal Engine

The browser prototype is temporary.

The design documents are permanent.

Everything learned from the prototype should improve the Unreal Engine version.

---

# 19. If Unsure

Stop.

Ask questions.

Never invent gameplay mechanics.

Never assume missing requirements.

---

# 20. Success

A successful contribution is one that:

* Follows the documentation.
* Completes the requested phase.
* Introduces no unnecessary complexity.
* Leaves the project in a better state than before.

---

# Final Instruction

Read.

Understand.

Implement.

Test.

Document.

Commit.

Repeat.

---

# Revision History

| Version | Date         | Description                                    |
| ------- | ------------ | ---------------------------------------------- |
| 1.0     | 19 July 2026 | Initial AI Development Guide for Project Mars. |
