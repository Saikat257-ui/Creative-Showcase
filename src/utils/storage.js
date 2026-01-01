// Utility functions for mock authentication and image storage using localStorage

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

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
  u.images.push({ src: base64, uploadedAt: new Date().toISOString() });
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
  if (!user) return [];
  // Handle both old format (string) and new format (object)
  return user.images.map(img => 
    typeof img === 'string' ? { src: img, uploadedAt: new Date().toISOString() } : img
  );
}

export function getAllImages() {
  const store = getStore();
  const all = [];
  Object.entries(store.users).forEach(([username, u]) => {
    (u.images || []).forEach((img) => {
      const imgSrc = typeof img === 'string' ? img : img.src;
      all.push({ src: imgSrc, username });
    });
  });
  return all;
}

export function getUserBio(username) {
  const store = getStore();
  const user = store.users[username];
  return user?.bio || '';
}

export function updateUserBio(username, bio) {
  const store = getStore();
  const user = store.users[username];
  if (!user) return false;
  user.bio = bio;
  setStore(store);
  return true;
}
