import { navItems, SLOGAN } from '../config/constants.js';
import { dataService } from '../services/dataService.js';
import { escapeHtml } from '../utils/helpers.js';

function getRootPrefix() {
  const pathname = window.location.pathname;
  return pathname.includes('/pages/') ? '../' : '';
}

function resolveHref(path) {
  const rootPrefix = getRootPrefix();
  return `${rootPrefix}${path}`;
}

function getCurrentPage() {
  const bodyPage = document.body.dataset.page;
  if (bodyPage) return bodyPage;
  const pathname = window.location.pathname.split('/').pop() || 'index.html';
  if (pathname === 'index.html' || pathname === '') return 'home';
  const pages = navItems.map((item) => item.href.split('/').pop());
  const match = pages.find((page) => page === pathname);
  return match ? 'page' : 'home';
}

function renderAuthControls() {
  const container = document.querySelector('[data-auth-slot]');
  if (!container) return;

  if (!dataService.isSignedIn()) {
    container.innerHTML = `
      <a class="ghost-btn focus-ring" href="${resolveHref('pages/auth.html')}">Sign In</a>
      <a class="primary-btn focus-ring" href="${resolveHref('pages/auth.html#signup')}">Sign Up</a>
    `;
    return;
  }

  const currentUserId = localStorage.getItem('cybersafe-current-user-id');
  const users = dataService.getUsers();
  const user = users.find((item) => item.id === currentUserId);
  const label = user ? user.name : 'Guest';

  container.innerHTML = `
    <span class="badge">${escapeHtml(label)}</span>
    <button class="secondary-btn focus-ring" type="button" data-signout>Sign Out</button>
  `;

  const signoutButton = container.querySelector('[data-signout]');
  signoutButton?.addEventListener('click', () => {
    dataService.clearCurrentUser();
    window.location.href = resolveHref('index.html');
  });
}

export function injectLayout() {
  const headerTarget = document.querySelector('[data-header]');
  const footerTarget = document.querySelector('[data-footer]');

  if (headerTarget) {
    const current = getCurrentPage();
    const navHtml = navItems.map((item) => `
      <a class="focus-ring ${current === item.page ? 'active' : ''}" href="${resolveHref(item.href)}">${item.label}</a>
    `).join('');

    headerTarget.innerHTML = `
      <div class="container header-inner">
        <a href="${resolveHref('index.html')}" class="brand focus-ring" aria-label="CyberSafe home">
          <span class="brand-mark">C</span>
          <span>CyberSafe</span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          ${navHtml}
        </nav>
        <div class="auth-row" data-auth-slot></div>
        <button class="menu-toggle focus-ring" type="button" aria-label="Toggle navigation" aria-expanded="false">Menu</button>
      </div>
    `;

    const menuToggle = headerTarget.querySelector('.menu-toggle');
    const nav = headerTarget.querySelector('.main-nav');
    menuToggle?.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    renderAuthControls();
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>CyberSafe</h3>
            <p>Protect your digital habits before they become a vulnerability.</p>
          </div>
          <div>
            <h4>Quick links</h4>
            <div class="footer-links">
              <a href="${resolveHref('index.html')}">Homepage</a>
              <a href="${resolveHref('pages/learning.html')}">Learning</a>
              <a href="${resolveHref('pages/statistics.html')}">Statistics</a>
            </div>
          </div>
          <div>
            <h4>Campaign</h4>
            <div class="footer-links">
              <a href="${resolveHref('pages/campaign.html')}">Campaign</a>
              <a href="${resolveHref('pages/tools.html')}">Interactive tools</a>
              <a href="${resolveHref('pages/about.html')}">About us</a>
            </div>
          </div>
        </div>
        <div class="footer-tagline">${escapeHtml(SLOGAN)}</div>
      </div>
    `;
  }
}
