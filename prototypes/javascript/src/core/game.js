// game.js — entry point. Sets up Three.js, wires the modular systems together,
// runs the main loop, and drives the Mission 001 objective flow (spec §6, §8).

import * as THREE from "three";
import { World } from "../world/world.js";
import { Player } from "../player/player.js";
import { Interactions } from "../interactions/interactions.js";
import { Mission } from "../missions/mission.js";
import { UI } from "../ui/ui.js";

class Game {
  constructor() {
    this._initRenderer();
    this._initScene();

    this.ui = new UI();
    this.world = new World(this.scene);
    this.player = new Player(this.camera, this.renderer.domElement, this.world.colliders);
    this.interactions = new Interactions(this.player, this.world.interactables, this.ui);
    this.mission = new Mission(this.ui);

    this.hasWrench = false;
    this.wrenchViewmodel = null;

    this._wireInteractions();
    this._wirePointerLock();

    this.clock = new THREE.Clock();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById("game").appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  }

  _wireInteractions() {
    // Show the correct pipe prompt depending on whether we hold the wrench.
    this.interactions.promptResolver = (obj) => {
      if (obj.userData.type === "pipe" && !this.hasWrench) {
        return obj.userData.lockedPrompt;
      }
      return null;
    };

    this.interactions.onInteract = (obj) => {
      const type = obj.userData.type;
      if (type === "wrench") {
        this._pickUpWrench(obj);
      } else if (type === "pipe") {
        this._repairPipe(obj);
      }
    };
  }

  _pickUpWrench(obj) {
    if (this.hasWrench) return;
    this.hasWrench = true;
    obj.visible = false; // remove from world
    this.mission.markDone("wrench");
    this._attachWrenchViewmodel();
  }

  // Attach a small wrench model to the camera so the player sees they hold it.
  _attachWrenchViewmodel() {
    const steel = new THREE.MeshStandardMaterial({ color: 0xb0b6bd, metalness: 0.6, roughness: 0.4 });
    const grip = new THREE.MeshStandardMaterial({ color: 0xe0673b });
    const vm = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.5), grip);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.06, 0.18), steel);
    head.position.z = 0.28;
    vm.add(handle, head);
    vm.position.set(0.35, -0.3, -0.7); // bottom-right of view
    vm.rotation.set(0.2, -0.4, 0.3);
    this.camera.add(vm);
    this.scene.add(this.camera); // ensure camera (with viewmodel) is in the scene graph
    this.wrenchViewmodel = vm;
  }

  _repairPipe(obj) {
    if (!this.hasWrench) return;        // gated on the wrench
    if (this.mission.isDone("repair")) return;
    this.world.stopLeak();
    this.mission.markDone("repair");    // "Repair the damaged pipe"
    this.mission.markDone("water");     // "Restore water flow" -> completes mission
    // Optional: drop the viewmodel now that the job is done.
    if (this.wrenchViewmodel) this.wrenchViewmodel.visible = false;
  }

  _wirePointerLock() {
    const startScreen = document.getElementById("start-screen");
    const startBtn = document.getElementById("start-btn");
    const canvas = this.renderer.domElement;

    const requestLock = () => canvas.requestPointerLock();
    startBtn.addEventListener("click", requestLock);

    document.addEventListener("pointerlockchange", () => {
      const locked = document.pointerLockElement === canvas;
      this.player.setEnabled(locked);
      startScreen.classList.toggle("hidden", locked);
      if (!locked) {
        // Esc / lost lock => paused (spec §10). Re-show overlay to resume.
        startScreen.classList.add("paused");
        startBtn.textContent = "CLICK TO RESUME";
      }
    });

    // Allow clicking the paused overlay body to resume too.
    startScreen.addEventListener("click", (e) => {
      if (e.target === startBtn) return;
      if (startScreen.classList.contains("paused")) requestLock();
    });
  }

  // Track entering/exiting the station for the mission objectives (§8).
  _updateStationObjectives() {
    const inside = this.world.isInsideStation(this.player.position);
    if (inside && !this.mission.isDone("enter")) {
      this.mission.markDone("enter");
    }
    // "Exit the station" only counts once we have the wrench and step back out.
    if (!inside && this.hasWrench && this.mission.isDone("wrench") && !this.mission.isDone("exit")) {
      this.mission.markDone("exit");
    }
  }

  _loop() {
    requestAnimationFrame(this._loop);
    const dt = Math.min(this.clock.getDelta(), 0.05); // clamp to avoid big jumps
    const elapsed = this.clock.elapsedTime;

    this.player.update(dt);
    this.world.update(dt, elapsed);
    this.interactions.update();
    this._updateStationObjectives();

    this.renderer.render(this.scene, this.camera);
  }
}

// Boot once the DOM is ready. Exposed as window.game for debugging.
window.addEventListener("DOMContentLoaded", () => {
  window.game = new Game();
});
