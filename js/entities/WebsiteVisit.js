import { createId } from '../utils/helpers.js';

export function createWebsiteVisit({ userId, page }) {
  return {
    id: createId('visit'),
    userId: userId || 'anonymous',
    page: String(page || 'unknown-page'),
    createdAt: new Date().toISOString(),
  };
}
