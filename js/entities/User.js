import { createId, sanitizeText } from '../utils/helpers.js';

export function createUser({ name, email, passwordHash }) {
  const safeName = sanitizeText(name || 'Guest User');
  const safeEmail = sanitizeText(email || '');

  if (!safeName) {
    throw new Error('Name is required.');
  }

  if (!safeEmail) {
    throw new Error('Email is required.');
  }

  return {
    id: createId('user'),
    name: safeName,
    email: safeEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
}
