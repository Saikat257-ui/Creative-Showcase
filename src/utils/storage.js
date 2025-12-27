// Utility functions for mock authentication and image storage using localStorage

const STORAGE_KEY = 'creativeShowcase';

function getStore() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { users: {} };
}

function setStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function signup({ username, email, password }) {
  const store = getStore();
  if (store.users[username]) {
    throw new Error('Username already exists');
  }
  // store username inside the user object for easier consumption
  store.users[username] = { username, email, password, images: [] };
  setStore(store);
  // Auto login after signup
  setCurrentUser({ username, email });
}

export function login({ username, password }) {
  const store = getStore();
  const user = store.users[username];
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }
  setCurrentUser({ username, email: user.email });
}

export function getCurrentUser() {
  const data = localStorage.getItem('currentUser');
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

export function addImageForCurrentUser(base64) {
  const user = getCurrentUser();
  if (!user) return;
  const store = getStore();
  const u = store.users[user.username];
  u.images.push(base64);
  setStore(store);
}

export function deleteImageForUser(username, index) {
  const store = getStore();
  const user = store.users[username];
  if (!user) return false;
  if (index < 0 || index >= user.images.length) return false;
  user.images.splice(index, 1);
  setStore(store);
  return true;
}

export function getImagesForUser(username) {
  const store = getStore();
  const user = store.users[username];
  return user ? user.images : [];
}

export function getAllImages() {
  const store = getStore();
  // Return an array of { src, username } so callers can show authors if desired
  const all = [];
  Object.entries(store.users).forEach(([username, u]) => {
    (u.images || []).forEach((img) => {
      all.push({ src: img, username });
    });
  });
  return all;
}
