// sw.js - Basic service worker for offline caching

const CACHE_NAME = 'dox-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/Speculate-assets/baby.png',
  '/Speculate-assets/fa.css',
  'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap',
  'https://fonts.cdnfonts.com/css/terror-pro',
  'https://cdn.jsdelivr.net/npm/typed.js@2.0.12',
  'https://files.catbox.moe/vnfhyw.mp4',
  'https://files.catbox.moe/73bpsa.mp3',
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  'Speculate-assets/dsc.png'
];

// Install event - caching assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event - serve cached assets if available, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Optional: return a fallback page/image if offline and resource not cached
        // return caches.match('/offline.html');
      });
    })
  );
});