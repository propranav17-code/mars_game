// mission.js — Mission 001: Repair the Water Pipe (spec §8).
// Ordered objectives. Only one is "active" at a time; completing it activates
// the next. When all are done, the mission is complete.

export class Mission {
  constructor(ui) {
    this.ui = ui;
    this.title = "Repair the Water Pipe";
    this.complete = false;

    // Ordered list. `active` marks the current step for the HUD.
    this.objectives = [
      { id: "enter", label: "Enter the research station", done: false, active: true },
      { id: "wrench", label: "Locate the engineering wrench", done: false, active: false },
      { id: "exit", label: "Exit the station", done: false, active: false },
      { id: "repair", label: "Repair the damaged pipe", done: false, active: false },
      { id: "water", label: "Restore water flow", done: false, active: false },
    ];

    this.onComplete = null; // callback set by the game
    this.render();
  }

  // Mark an objective done and advance the active marker to the next unfinished one.
  markDone(id) {
    const obj = this.objectives.find((o) => o.id === id);
    if (!obj || obj.done) return;
    obj.done = true;
    obj.active = false;

    const next = this.objectives.find((o) => !o.done);
    if (next) {
      next.active = true;
    } else {
      this.complete = true;
      this.ui.showMissionComplete();
      if (this.onComplete) this.onComplete();
    }
    this.render();
  }

  isDone(id) {
    const obj = this.objectives.find((o) => o.id === id);
    return obj ? obj.done : false;
  }

  render() {
    this.ui.renderObjectives(this.title, this.objectives);
  }
}
