import { checklistScore } from '../utils/helpers.js';
import { dataService } from '../services/dataService.js';

export function initChecklistPage() {
  const boxes = [...document.querySelectorAll('[data-check-item]')];
  const result = document.querySelector('[data-checklist-result]');
  const progressFill = document.querySelector('[data-check-progress-fill]');
  const saveKey = 'cybersafe-personal-data-checklist';

  function renderScore() {
    const states = boxes.map((box) => box.checked);
    const score = checklistScore(states);
    result.textContent = `Protection score: ${score.percent}% (${score.completed}/${score.total} items completed)`;
    progressFill.style.width = `${score.percent}%`;
    dataService.saveChecklistProgress?.(saveKey, states);
  }

  const savedState = dataService.getChecklistProgress?.(saveKey) || [];
  boxes.forEach((box, index) => {
    box.checked = Boolean(savedState[index]);
    box.addEventListener('change', renderScore);
  });
  renderScore();
}
