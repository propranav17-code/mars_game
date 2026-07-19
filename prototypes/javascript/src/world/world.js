// world.js — builds the Mars scene from Three.js primitives (spec §13: low-poly,
// clean, functional, gameplay over graphics). Exposes interactable objects and
// simple box colliders for the player.

import * as THREE from "three";

export class World {
  constructor(scene) {
    this.scene = scene;
    this.colliders = []; // array of THREE.Box3 for wall/prop collision
    this.interactables = []; // objects the player can look at + press E

    this._buildLighting();
    this._buildSky();
    this._buildGround();
    this._buildStation();
    this.wrench = this._buildWrench();
    this.pipe = this._buildPipe();
  }

  _buildLighting() {
    // Warm Martian sun + soft ambient fill.
    const sun = new THREE.DirectionalLight(0xffd9b3, 1.4);
    sun.position.set(30, 50, 20);
    this.scene.add(sun);

    const ambient = new THREE.HemisphereLight(0xffb48a, 0x3a2418, 0.7);
    this.scene.add(ambient);
  }

  _buildSky() {
    // Dusty pink-orange Mars sky via scene background + fog for depth.
    this.scene.background = new THREE.Color(0xd8a07a);
    this.scene.fog = new THREE.Fog(0xd8a07a, 40, 160);
  }

  _buildGround() {
    const geo = new THREE.PlaneGeometry(400, 400, 40, 40);
    // Nudge vertices for gentle rolling terrain (kept flat near play area).
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const bump = dist > 30 ? Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2 : 0;
      pos.setZ(i, bump);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({ color: 0xa8552e, flatShading: true });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // Scatter a few low-poly rocks for a sense of place.
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x7a3d22, flatShading: true });
    for (let i = 0; i < 24; i++) {
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + Math.random() * 1.2, 0), rockMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 18 + Math.random() * 90;
      r.position.set(Math.cos(angle) * radius, 0.2, Math.sin(angle) * radius);
      r.rotation.set(Math.random(), Math.random(), Math.random());
      this.scene.add(r);
    }
  }

  // Research station: a floor slab with four walls and a doorway gap. The player
  // walks in through the -Z side to find the wrench.
  _buildStation() {
    const group = new THREE.Group();
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xcfd3d8, flatShading: true });
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x8a8f96, flatShading: true });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xe0673b });

    const W = 12; // station footprint width (x)
    const D = 12; // depth (z)
    const H = 4;  // wall height
    const T = 0.3; // wall thickness
    const cx = 0, cz = -20; // station center

    // Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(W, 0.2, D), floorMat);
    floor.position.set(cx, 0.1, cz);
    group.add(floor);

    // Ceiling
    const ceil = new THREE.Mesh(new THREE.BoxGeometry(W, 0.2, D), wallMat);
    ceil.position.set(cx, H, cz);
    group.add(ceil);

    // Helper to add a wall segment + its collider.
    const addWall = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      m.position.set(x, y, z);
      group.add(m);
      this.colliders.push(new THREE.Box3().setFromObject(m));
    };

    const half = H / 2;
    // Far wall (-Z, away from the player) is solid.
    addWall(W, H, T, cx, half, cz - D / 2);
    // Left wall (-X)
    addWall(T, H, D, cx - W / 2, half, cz);
    // Right wall (+X)
    addWall(T, H, D, cx + W / 2, half, cz);
    // Near wall (+Z, facing the player's spawn) is split to leave a doorway so
    // the player can walk straight in.
    const doorW = 3;
    const sideW = (W - doorW) / 2;
    const frontZ = cz + D / 2;
    addWall(sideW, H, T, cx - (doorW / 2 + sideW / 2), half, frontZ);
    addWall(sideW, H, T, cx + (doorW / 2 + sideW / 2), half, frontZ);
    // Lintel above the doorway so the gap reads as a door.
    addWall(doorW, 1, T, cx, H - 0.5, frontZ);

    // Orange accent stripe over the door (NASA-ish signage).
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(doorW, 0.3, 0.05), accentMat);
    stripe.position.set(cx, H - 1.2, frontZ + T / 2);
    group.add(stripe);

    // A workbench inside where the wrench rests.
    const bench = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 1.2), floorMat);
    bench.position.set(cx + 3, 0.7, cz + 3);
    group.add(bench);
    this.colliders.push(new THREE.Box3().setFromObject(bench));
    this._benchTop = bench.position.clone();
    this._benchTop.y = 1.25;

    this.scene.add(group);
    this._stationCenter = new THREE.Vector3(cx, 0, cz);
  }

  // The engineering wrench — the key pickup. Sits on the bench inside the station.
  _buildWrench() {
    const group = new THREE.Group();
    const steel = new THREE.MeshStandardMaterial({ color: 0xb0b6bd, metalness: 0.6, roughness: 0.4 });
    const grip = new THREE.MeshStandardMaterial({ color: 0xe0673b });

    // Handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.0), grip);
    group.add(handle);
    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.35), steel);
    head.position.z = 0.55;
    group.add(head);
    // Jaw notch
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.2), steel);
    jaw.position.set(0, 0, 0.72);
    group.add(jaw);

    group.position.copy(this._benchTop);
    group.rotation.y = Math.PI / 4;
    group.userData = {
      type: "wrench",
      radius: 2.2, // how close the player must be to interact
      prompt: "Press <b>E</b> to pick up the Wrench",
    };
    this.scene.add(group);
    this.interactables.push(group);

    // Gentle idle spin handle stored for animation.
    this._wrenchSpin = group;
    return group;
  }

  // The damaged water pipe outside the station, with a leaking particle jet.
  _buildPipe() {
    const group = new THREE.Group();
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x9aa0a6, metalness: 0.5, roughness: 0.5 });
    const damageMat = new THREE.MeshStandardMaterial({ color: 0x5a3320 });

    // Horizontal pipe run on short supports, placed in the open near spawn.
    const px = 8, pz = -4;
    const main = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 6, 12), pipeMat);
    main.rotation.z = Math.PI / 2;
    main.position.set(px, 1.2, pz);
    group.add(main);

    // Two supports
    [-2.2, 2.2].forEach((dx) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8), pipeMat);
      leg.position.set(px + dx, 0.6, pz);
      group.add(leg);
    });

    // A scorched damaged band at the break point.
    const damage = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.6, 12), damageMat);
    damage.rotation.z = Math.PI / 2;
    damage.position.set(px, 1.2, pz);
    group.add(damage);

    // Leaking water: a small particle fountain we can toggle off on repair.
    const leak = this._buildLeak(new THREE.Vector3(px, 1.5, pz));
    group.add(leak.points);
    this._leak = leak;

    // Water puddle (grows while leaking — simple scale animation).
    const puddle = new THREE.Mesh(
      new THREE.CircleGeometry(1.5, 20),
      new THREE.MeshStandardMaterial({ color: 0x3a6ea5, transparent: true, opacity: 0.6 })
    );
    puddle.rotation.x = -Math.PI / 2;
    puddle.position.set(px, 0.02, pz);
    group.add(puddle);
    this._puddle = puddle;

    group.position.set(0, 0, 0);
    group.userData = {
      type: "pipe",
      radius: 3.0,
      // The pipe's meshes live at a local offset while the group sits at the
      // origin, so give the interaction system an explicit world anchor.
      interactPos: new THREE.Vector3(px, 1.2, pz),
      // Prompt text is chosen at runtime depending on whether we hold the wrench.
      prompt: "Press <b>E</b> to Repair the Pipe",
      lockedPrompt: "You need the <b>Wrench</b> to repair this",
    };
    this.scene.add(group);
    this.interactables.push(group);
    this._pipePos = new THREE.Vector3(px, 1.2, pz);
    return group;
  }

  // Small GPU-cheap particle jet using THREE.Points.
  _buildLeak(origin) {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = origin.x;
      positions[i * 3 + 1] = origin.y;
      positions[i * 3 + 2] = origin.z;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 3 + 2,
        (Math.random() - 0.5) * 2
      ));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x8ec5ff, size: 0.12, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(geo, mat);
    return { points, geo, velocities, origin, active: true };
  }

  // Called once the pipe is repaired: stop the leak, hide the puddle.
  stopLeak() {
    if (this._leak) {
      this._leak.active = false;
      this._leak.points.visible = false;
    }
    if (this._puddle) this._puddle.visible = false;
  }

  isInsideStation(pos) {
    // Simple footprint test around the station center (§8 "enter the station").
    const c = this._stationCenter;
    return Math.abs(pos.x - c.x) < 6 && Math.abs(pos.z - c.z) < 6;
  }

  // Per-frame world animation (leak particles, wrench idle spin, puddle pulse).
  update(dt, elapsed) {
    if (this._wrenchSpin && this._wrenchSpin.visible) {
      this._wrenchSpin.rotation.y += dt * 0.8;
      this._wrenchSpin.position.y = this._benchTop.y + Math.sin(elapsed * 2) * 0.06;
    }

    const leak = this._leak;
    if (leak && leak.active) {
      const pos = leak.geo.attributes.position;
      for (let i = 0; i < leak.velocities.length; i++) {
        const v = leak.velocities[i];
        let x = pos.getX(i) + v.x * dt;
        let y = pos.getY(i) + (v.y - 9.8 * 0.15) * dt; // light gravity
        let z = pos.getZ(i) + v.z * dt;
        v.y -= 9.8 * dt;
        if (y < 0.05) {
          // respawn at the leak origin
          x = leak.origin.x;
          y = leak.origin.y;
          z = leak.origin.z;
          v.set((Math.random() - 0.5) * 2, Math.random() * 3 + 2, (Math.random() - 0.5) * 2);
        }
        pos.setXYZ(i, x, y, z);
      }
      pos.needsUpdate = true;
    }
  }
}
