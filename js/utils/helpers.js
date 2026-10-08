export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function sanitizeText(value = '') {
  return String(value).trim();
}

export function createId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
}

export function getAnonymousId(prefix = 'guest') {
  const key = 'cybersafe-anonymous-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function scoreAwareness(score, total = 100) {
  const percentage = total === 0 ? 0 : (score / total) * 100;
  if (percentage >= 80) return 'Highly Aware';
  if (percentage >= 60) return 'Moderately Aware';
  if (percentage >= 40) return 'Needs Improvement';
  return 'Beginner Awareness';
}

export function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function buildCsv(rows) {
  if (!rows || !rows.length) return '';
  const headers = Object.keys(rows[0]);
  const csvRows = [headers.join(',')];
  for (const row of rows) {
    const values = headers.map((header) => {
      const value = row[header] ?? '';
      const safe = String(value).replace(/"/g, '""');
      return `"${safe}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}

export function calculatePasswordStrength(password) {
  const trimmed = String(password || '');
  if (!trimmed) {
    return { score: 0, label: 'Empty', meter: 0, suggestions: ['Enter a password to test it.'] };
  }

  let score = 0;
  const issues = [];

  if (trimmed.length >= 12) score += 30;
  else if (trimmed.length >= 8) score += 18;
  else issues.push('Use at least 12 characters when possible.');

  if (/[A-Z]/.test(trimmed) && /[a-z]/.test(trimmed)) score += 20;
  else issues.push('Use a mix of upper and lower-case letters.');

  if (/[0-9]/.test(trimmed)) score += 20;
  else issues.push('Include at least one number.');

  if (/[^A-Za-z0-9]/.test(trimmed)) score += 20;
  else issues.push('Add a symbol for more variety.');

  if (/(.)\1{2,}/.test(trimmed)) issues.push('Avoid repeated characters in a row.');
  if (/(password|qwerty|welcome|admin|letmein|cybersafe|dragon)/i.test(trimmed)) {
    issues.push('Avoid common dictionary words and predictable patterns.');
  }
  if (trimmed.length > 18) score += 10;

  const maxScore = 100;
  const effectiveScore = clampNumber(score, 0, maxScore);

  let label = 'Weak';
  if (effectiveScore >= 80) label = 'Strong';
  else if (effectiveScore >= 60) label = 'Good';
  else if (effectiveScore >= 35) label = 'Fair';

  const meter = clampNumber((effectiveScore / maxScore) * 100, 0, 100);
  const suggestions = issues.length ? issues.slice(0, 3) : ['This password looks strong and unique. Keep it unique to each account.'];

  return { score: effectiveScore, label, meter, suggestions };
}

export function checklistScore(items) {
  const total = items.length || 1;
  const completed = items.filter(Boolean).length;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
  };
}

export function mapToAwarenessCategory(score) {
  if (score >= 80) return 'Highly Aware';
  if (score >= 60) return 'Moderately Aware';
  if (score >= 40) return 'Needs Improvement';
  return 'Beginner Awareness';
}
