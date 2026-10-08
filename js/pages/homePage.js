export function initHomePage() {
  const chips = document.querySelectorAll('[data-challenge]');
  chips.forEach((item) => {
    item.addEventListener('click', () => {
      const target = item.dataset.challenge;
      const panel = document.querySelector(`#${target}`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
