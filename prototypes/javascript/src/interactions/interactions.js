// interactions.js — finds the nearest interactable the player is near and roughly
// facing, shows its prompt, and fires a callback when E is pressed (spec §9).

import * as THREE from "three";

export class Interactions {
  constructor(player, interactables, ui) {
    this.player = player;
    this.interactables = interactables;
    this.ui = ui;
    this.current = null;      // interactable currently in focus
    this.onInteract = null;   // callback(object) set by the game

    // Optional per-object override for the prompt text (e.g. locked pipe).
    this.promptResolver = null;

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyE" && this.current && this.player.enabled) {
        if (this.onInteract) this.onInteract(this.current);
      }
    });
  }

  update() {
    if (!this.player.enabled) {
      this.ui.hidePrompt();
      this.current = null;
      return;
    }

    const eye = this.player.position;
    const look = this.player.getLookDirection();
    let best = null;
    let bestScore = -Infinity;

    for (const obj of this.interactables) {
      if (!obj.visible) continue;
      // Some objects (e.g. the pipe) supply an explicit world anchor because
      // their group origin isn't where the mesh actually is.
      const objPos = obj.userData.interactPos || obj.position;
      const toObj = new THREE.Vector3().subVectors(objPos, eye);
      const dist = toObj.length();
      const radius = obj.userData.radius || 2.5;
      if (dist > radius) continue;

      // Prefer objects the player is looking toward (forgiving threshold).
      const facing = toObj.normalize().dot(look);
      if (facing < 0.3) continue;

      const score = facing - dist * 0.1;
      if (score > bestScore) {
        bestScore = score;
        best = obj;
      }
    }

    this.current = best;
    if (best) {
      let prompt = best.userData.prompt;
      if (this.promptResolver) {
        const override = this.promptResolver(best);
        if (override) prompt = override;
      }
      this.ui.showPrompt(prompt);
    } else {
      this.ui.hidePrompt();
    }
  }
}
