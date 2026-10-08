import { createId, scoreAwareness } from '../utils/helpers.js';

export function createQuizAttempt({
  attemptId,
  userId,
  anonymousSessionId,
  score,
  totalQuestions,
  percentage,
  answers = [],
  mode = 'standard',
  attemptedAt,
}) {
  const safeScore = Number(score) || 0;
  const safeTotal = Number(totalQuestions) || 0;
  const derivedPercentage = Number(percentage ?? (safeTotal ? (safeScore / safeTotal) * 100 : 0)) || 0;
  const safeAttemptedAt = attemptedAt || new Date().toISOString();

  const awarenessCategory = scoreAwareness(safeScore, safeTotal);

  return {
    id: attemptId || createId('quiz_attempt'),
    attempt_id: attemptId || createId('quiz_attempt'),
    userId: userId || null,
    user_id: userId || null,
    anonymousSessionId: anonymousSessionId || null,
    anonymous_session_id: anonymousSessionId || null,
    score: safeScore,
    totalQuestions: safeTotal,
    total_questions: safeTotal,
    percentage: derivedPercentage,
    awarenessCategory,
    awareness_category: awarenessCategory,
    answers: Array.isArray(answers) ? answers : [],
    mode,
    attemptedAt: safeAttemptedAt,
    attempted_at: safeAttemptedAt,
    createdAt: safeAttemptedAt,
  };
}
