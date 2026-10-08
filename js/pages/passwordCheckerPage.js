import { calculatePasswordStrength } from '../utils/helpers.js';

export function initPasswordCheckerPage() {
  const input = document.querySelector('[data-password-input]');
  const result = document.querySelector('[data-password-result]');
  if (!input || !result) return;

  input.addEventListener('input', (event) => {
    const strength = calculatePasswordStrength(event.target.value);
    result.innerHTML = `
      <div class="card">
        <p><strong>Strength:</strong> ${strength.label}</p>
        <div class="strength-meter"><span style="width:${strength.meter}%"></span></div>
        <p><strong>Score:</strong> ${strength.score}/100</p>
        <ul>
          ${strength.suggestions.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  });
}
