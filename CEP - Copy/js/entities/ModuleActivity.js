import { createId } from '../utils/helpers.js';

export function createModuleActivity({ userId, moduleId, action = 'viewed' }) {
  return {
    id: createId('module_activity'),
    userId: userId || 'anonymous',
    moduleId: String(moduleId || 'unknown-module'),
    action: String(action || 'viewed'),
    createdAt: new Date().toISOString(),
  };
}
