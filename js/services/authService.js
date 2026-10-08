import { createUser } from '../entities/User.js';
import { dataService } from './dataService.js';

const encoder = new TextEncoder();

function toHex(bytes) {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function fromHex(value) {
  const bytes = [];
  for (let index = 0; index < value.length; index += 2) {
    bytes.push(parseInt(value.slice(index, index + 2), 16));
  }
  return Uint8Array.from(bytes);
}

async function getKeyMaterial(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 200000, hash: 'SHA-256' },
    keyMaterial,
    256
  );

  return new Uint8Array(bits);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await getKeyMaterial(password, salt);
  return {
    salt: toHex(salt),
    hash: toHex(hash),
  };
}

export async function verifyPassword(password, storedSalt, storedHash) {
  const salt = fromHex(storedSalt);
  const hash = await getKeyMaterial(password, salt);
  return toHex(hash) === storedHash;
}

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required.');
  }

  const existingUsers = dataService.getUsers();
  if (existingUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('This email is already registered in this browser demo.');
  }

  const passwordHash = await hashPassword(password);
  const user = createUser({
    name,
    email,
    passwordHash: JSON.stringify(passwordHash),
  });

  existingUsers.push(user);
  dataService.saveUsers(existingUsers);
  return user;
}

export async function loginUser({ email, password }) {
  const users = dataService.getUsers();
  const target = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (!target) {
    throw new Error('No account matches that email.');
  }

  const stored = JSON.parse(target.passwordHash);
  const valid = await verifyPassword(password, stored.salt, stored.hash);
  if (!valid) {
    throw new Error('Incorrect password.');
  }

  dataService.setCurrentUser(target.id);
  return target;
}

export function signOutUser() {
  dataService.clearCurrentUser();
}
