// ui.js — thin wrapper over the DOM overlay. No game logic lives here.

export class UI {
  constructor() {
    this.objectiveList = document.getElementById("objective-list");
    this.promptEl = document.getElementById("prompt");
    this.missionCompleteEl = document.getElementById("mission-complete");
    this.missionTitleEl = document.getElementById("mission-title");
  }

  // Render the objective list from the mission's objective array.
  renderObjectives(title, objectives) {
    this.missionTitleEl.textContent = title;
    this.objectiveList.innerHTML = "";
    objectives.forEach((obj) => {
      const li = document.createElement("li");
      li.textContent = obj.label;
      if (obj.done) li.className = "done";
      else if (obj.active) li.className = "active";
      this.objectiveList.appendChild(li);
    });
  }

  // Show/hide the "Press E to ..." prompt.
  showPrompt(html) {
    this.promptEl.innerHTML = html;
    this.promptEl.classList.add("show");
  }

  hidePrompt() {
    this.promptEl.classList.remove("show");
  }

  showMissionComplete() {
    this.missionCompleteEl.classList.remove("hidden");
  }
}
