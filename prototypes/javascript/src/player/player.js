// player.js — first-person controller: pointer-lock mouse look, WASD movement,
// sprint, jump, Martian-ish gravity, and axis-separated box collision (spec §10).

import * as THREE from "three";

const EYE_HEIGHT = 1.7;
const WALK_SPEED = 5.0;
const SPRINT_SPEED = 8.5;
const GRAVITY = 14.0;      // tuned for feel, not realism
const JUMP_VELOCITY = 6.0;
const PLAYER_RADIUS = 0.4;

export class Player {
  constructor(camera, domElement, colliders) {
    this.camera = camera;
    this.dom = domElement;
    this.colliders = colliders;

    this.position = new THREE.Vector3(0, EYE_HEIGHT, 6); // spawn outside, facing station
    this.velocityY = 0;
    this.onGround = true;

    this.yaw = Math.PI;   // face -Z (toward the station)
    this.pitch = 0;

    this.keys = Object.create(null);
    this.enabled = false;

    this._bindInput();
    this._syncCamera();
  }

  _bindInput() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });
    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });

    // Mouse look only while pointer is locked.
    document.addEventListener("mousemove", (e) => {
      if (!this.enabled) return;
      const s = 0.0022;
      this.yaw -= e.movementX * s;
      this.pitch -= e.movementY * s;
      const limit = Math.PI / 2 - 0.05;
      this.pitch = Math.max(-limit, Math.min(limit, this.pitch));
    });
  }

  setEnabled(v) {
    this.enabled = v;
  }

  _syncCamera() {
    this.camera.position.copy(this.position);
    const dir = this.getLookDirection();
    this.camera.lookAt(
      this.position.x + dir.x,
      this.position.y + dir.y,
      this.position.z + dir.z
    );
  }

  getLookDirection() {
    return new THREE.Vector3(
      Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      Math.cos(this.yaw) * Math.cos(this.pitch)
    );
  }

  update(dt) {
    if (!this.enabled) return;

    // --- Horizontal movement relative to yaw ---
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    // Right is forward rotated -90° about Y. (Facing -Z, this gives +X = screen-right.)
    const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw));

    const move = new THREE.Vector3();
    if (this.keys["KeyW"]) move.add(forward);
    if (this.keys["KeyS"]) move.sub(forward);
    if (this.keys["KeyD"]) move.add(right);
    if (this.keys["KeyA"]) move.sub(right);

    const speed = this.keys["ShiftLeft"] || this.keys["ShiftRight"] ? SPRINT_SPEED : WALK_SPEED;
    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed * dt);
      this._moveWithCollision(move);
    }

    // --- Jump + gravity ---
    if (this.keys["Space"] && this.onGround) {
      this.velocityY = JUMP_VELOCITY;
      this.onGround = false;
    }
    this.velocityY -= GRAVITY * dt;
    this.position.y += this.velocityY * dt;
    if (this.position.y <= EYE_HEIGHT) {
      this.position.y = EYE_HEIGHT;
      this.velocityY = 0;
      this.onGround = true;
    }

    this._syncCamera();
  }

  // Move on X and Z separately so we slide along walls instead of sticking.
  _moveWithCollision(delta) {
    const tryAxis = (dx, dz) => {
      const next = this.position.clone();
      next.x += dx;
      next.z += dz;
      const box = new THREE.Box3(
        new THREE.Vector3(next.x - PLAYER_RADIUS, 0, next.z - PLAYER_RADIUS),
        new THREE.Vector3(next.x + PLAYER_RADIUS, EYE_HEIGHT + 0.3, next.z + PLAYER_RADIUS)
      );
      for (const c of this.colliders) {
        if (c.intersectsBox(box)) return false;
      }
      this.position.x = next.x;
      this.position.z = next.z;
      return true;
    };
    tryAxis(delta.x, 0);
    tryAxis(0, delta.z);
  }
}
