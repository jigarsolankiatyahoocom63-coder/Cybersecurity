import { dataService, ensureDemoSeed } from './services/dataService.js';
import { injectLayout } from './components/layout.js';

import { initHomePage } from './pages/homePage.js';
import { initQuizPage } from './pages/quizPage.js';
import { initPasswordCheckerPage } from './pages/passwordCheckerPage.js';
import { initChecklistPage } from './pages/checklistPage.js';
import { initStatisticsPage } from './pages/statisticsPage.js';
import { initAuthPage } from './pages/authPage.js';

function determinePage() {
  const bodyPage = document.body.dataset.page || 'home';
  return bodyPage;
}

function recordVisit() {
  const currentUserId = dataService.getCurrentUserId();
  const page = window.location.pathname.split('/').pop() || 'index.html';
  dataService.addVisit(currentUserId, page);

  const moduleId = document.body.dataset.module;
  if (moduleId) {
    dataService.addModuleActivity(currentUserId, moduleId, 'viewed');
  }
}

function initPage() {
  ensureDemoSeed();
  dataService.init();
  injectLayout();
  recordVisit();

  const page = determinePage();

  switch (page) {
    case 'home':
      initHomePage();
      break;
    case 'quiz':
      initQuizPage();
      break;
    case 'password-checker':
      initPasswordCheckerPage();
      break;
    case 'checklist':
      initChecklistPage();
      break;
    case 'statistics':
      initStatisticsPage();
      break;
    case 'auth':
      initAuthPage();
      break;
    default:
      break;
  }
}

initPage();
