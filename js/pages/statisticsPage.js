import { dataService } from '../services/dataService.js';

const awarenessSequence = [
  'Highly Aware',
  'Moderately Aware',
  'Needs Improvement',
  'Beginner Awareness',
];

const awarenessColors = ['#2ec4b6', '#48a6ff', '#f4b740', '#ff6b6b'];

function drawPieChart(canvas, data, labels) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const total = data.reduce((sum, value) => sum + value, 0);
  if (!total) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 90, 0, Math.PI * 2);
    ctx.strokeStyle = '#4b5d73';
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.fillStyle = '#dfe7f3';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No quiz attempts yet', canvas.width / 2, canvas.height / 2 + 6);
    return;
  }

  let start = -Math.PI / 2;
  data.forEach((value, index) => {
    const slice = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, 110, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = awarenessColors[index % awarenessColors.length];
    ctx.fill();
    start += slice;
  });

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 48, 0, Math.PI * 2);
  ctx.fillStyle = '#0b1728';
  ctx.fill();

  labels.forEach((label, index) => {
    const angle = (data[index] / total) * Math.PI * 2;
    const x = canvas.width / 2 + Math.cos(angle / 2 - Math.PI / 2) * 170;
    const y = canvas.height / 2 + Math.sin(angle / 2 - Math.PI / 2) * 170;
    ctx.fillStyle = '#eaf3ff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y);
  });
}

function drawBarChart(canvas, values, labels) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!values.length) {
    ctx.fillStyle = '#dfe7f3';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No module activity yet', canvas.width / 2, canvas.height / 2);
    return;
  }

  const max = Math.max(...values, 1);
  const width = canvas.width;
  const height = canvas.height;
  const padding = 30;
  const barWidth = (width - padding * 2) / values.length - 20;

  ctx.strokeStyle = '#dfe7f3';
  for (let i = 0; i <= 5; i += 1) {
    const y = padding + ((height - padding * 2) / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  values.forEach((value, index) => {
    const x = padding + index * (barWidth + 20) + 10;
    const barHeight = (value / max) * (height - padding * 2);
    const y = height - padding - barHeight;
    ctx.fillStyle = '#123d8c';
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = '#eaf3ff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(labels[index], x + barWidth / 2, height - 10);
  });
}

function drawActivityChart(canvas, values) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!values.length || values.every((value) => value === 0)) {
    ctx.fillStyle = '#dfe7f3';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No activity yet', canvas.width / 2, canvas.height / 2);
    return;
  }

  const width = canvas.width;
  const height = canvas.height;
  const padding = 30;
  const max = Math.max(...values, 1);
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);

  values.forEach((value, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(values.length - 1, 1);
    const y = height - padding - (value / max) * (height - padding * 2);
    ctx.lineTo(x, y);
  });

  ctx.strokeStyle = '#20a39e';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function setEmptyCardState(element, message) {
  if (!element) return;
  element.innerHTML = `<div class="row-line"><span>${message}</span><strong>0</strong></div>`;
}

function renderPublicStats() {
  const stats = dataService.getPublicStats();
  const attemptsTotal = document.querySelector('[data-total-attempts]');
  const averageTotal = document.querySelector('[data-average-score]');
  const activityTotal = document.querySelector('[data-total-visits]');
  const moduleTotal = document.querySelector('[data-total-module-activity]');
  const distributionList = document.querySelector('[data-awareness-distribution]');
  const exportJsonButton = document.querySelector('[data-export-json]');
  const exportCsvButton = document.querySelector('[data-export-csv]');
  const importButton = document.querySelector('[data-import-data]');
  const fileInput = document.querySelector('[data-import-file]');
  const feedbackForm = document.querySelector('[data-feedback-form]');
  const feedbackStatus = document.querySelector('[data-feedback-status]');

  if (attemptsTotal) {
    attemptsTotal.textContent = stats.totalAttempts ? String(stats.totalAttempts) : '0 Quiz Attempts';
  }
  if (averageTotal) averageTotal.textContent = `${stats.averageScore}%`;
  if (activityTotal) activityTotal.textContent = String(stats.totalVisits);
  if (moduleTotal) moduleTotal.textContent = String(stats.totalModuleActivities);

  const awarenessEntries = awarenessSequence.map((label) => [label, stats.awarenessDistribution[label] || 0]);

  if (distributionList) {
    if (!stats.totalAttempts) {
      setEmptyCardState(distributionList, 'No public quiz attempts yet');
    } else {
      distributionList.innerHTML = awarenessEntries.map(([label, value]) => `
        <div class="row-line"><span>${label}</span><strong>${value}</strong></div>
      `).join('');
    }
  }

  const pieCanvas = document.getElementById('awareness-chart');
  if (pieCanvas) {
    drawPieChart(pieCanvas, awarenessEntries.map((entry) => entry[1]), awarenessEntries.map((entry) => entry[0]));
  }

  const moduleLabels = Object.keys(stats.moduleCounts).slice(0, 5);
  const moduleValues = moduleLabels.map((key) => stats.moduleCounts[key]);
  const barCanvas = document.getElementById('engagement-chart');
  if (barCanvas) {
    drawBarChart(barCanvas, moduleValues, moduleLabels);
  }

  const visits = dataService.getVisits();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  });
  const visitCounts = days.map((dayLabel) => visits.filter((visit) => {
    const rawDate = visit.createdAt || visit.created_at;
    if (!rawDate) return false;
    return new Date(rawDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) === dayLabel;
  }).length);

  const lineCanvas = document.getElementById('activity-chart');
  if (lineCanvas) {
    drawActivityChart(lineCanvas, visitCounts);
  }

  exportJsonButton?.addEventListener('click', () => {
    const json = dataService.exportAnonymisedJson();
    downloadBlob(json, 'cybersafe-anonymous-data.json', 'application/json');
  });

  exportCsvButton?.addEventListener('click', () => {
    const csv = dataService.exportAnonymisedCsv();
    downloadBlob(csv, 'cybersafe-anonymous-data.csv', 'text/csv');
  });

  importButton?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const rawText = await file.text();
    const result = dataService.importAndMergeData(rawText);
    alert(`Merged ${result.attempts} attempts, ${result.visits} visits, and ${result.activities} module activities.`);
    window.location.reload();
  });

  feedbackForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(feedbackForm);
    dataService.addFeedbackEntry({
      topic: formData.get('topic'),
      sentiment: formData.get('sentiment'),
      comment: formData.get('comment') || '',
    });
    if (feedbackStatus) feedbackStatus.textContent = 'Anonymous feedback saved.';
    feedbackForm.reset();
  });
}

export function initStatisticsPage() {
  renderPublicStats();
  window.addEventListener('cybersafe:stats-refresh', renderPublicStats);
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
