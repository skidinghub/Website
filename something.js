(function () {
  'use strict';

  const RANDOM_SITES = [
    'https://www.youtube.com/watch?v=LcCPzxAQplU',
    'https://duckduckgo.com',
    'https://mozilla.org',
    'https://github.com',
    'https://itch.io'
  ];

  const INTERVAL_MS = 2000; // 2 seconds
  let index = 0;
  let intervalId = null;

  function setDisplayedUrl(rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      const newPath = parsed.pathname + parsed.search + parsed.hash;
      history.replaceState(null, '', newPath);
      console.debug('Displayed URL changed to', parsed.origin + newPath);
    } catch (e) {
      console.error('Invalid URL:', rawUrl);
    }
  }

  function startLoop() {
    if (!RANDOM_SITES.length) return;
    setDisplayedUrl(RANDOM_SITES[index]);
    intervalId = setInterval(() => {
      index = (index + 1) % RANDOM_SITES.length;
      setDisplayedUrl(RANDOM_SITES[index]);
    }, INTERVAL_MS);
  }

  function stopLoop() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  if (document.readyState === 'complete') {
    startLoop();
  } else {
    window.addEventListener('load', startLoop, { once: true });
  }
  
  window.__randomUrlLooper = { start: startLoop, stop: stopLoop };
})();
