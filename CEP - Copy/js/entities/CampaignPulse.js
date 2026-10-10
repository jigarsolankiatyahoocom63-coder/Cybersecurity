import { createId } from '../utils/helpers.js';

export function createCampaignPulse({ quizAttempts = 0, averageScore = 0, awareness = {}, visits = 0, modulesViewed = 0 }) {
  return {
    id: createId('pulse'),
    quizAttempts: Number(quizAttempts) || 0,
    averageScore: Number(averageScore) || 0,
    awareness: awareness || {},
    visits: Number(visits) || 0,
    modulesViewed: Number(modulesViewed) || 0,
    createdAt: new Date().toISOString(),
  };
}
