(function () {
  'use strict';

  const RANDOM_SITES = [
    'https://www.youtube.com/watch?v=LcCPzxAQplU',
    'https://duckduckgo.com',
    'https://mozilla.org',
    'https://github.com',
    'https://itch.io'
  ];

  function goRandomOnLoad() {
    if (!RANDOM_SITES.length) return;
    const url = RANDOM_SITES[Math.floor(Math.random() * RANDOM_SITES.length)];
    // Replace location to avoid adding a history entry
    window.location.replace(url);
  }

  if (document.readyState === 'complete') {
    goRandomOnLoad();
  } else {
    window.addEventListener('load', goRandomOnLoad, { once: true });
  }
