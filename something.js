(function () {
  'use strict';

  const RANDOM_SITES = [
    'https://www.youtube.com/watch?v=LcCPzxAQplU',
    'https://ddddddd.com/kys',
    'https://mozilla.org/long_live_skel',
    'https://github.com/idk',
    'https://itch.io/IHATEMYSELF'
  ];

  const INTERVAL_MS = 2000;
  let index = 0;
  let intervalId = null;
  let bannerEl = null;

  function ensureBanner() {
    if (bannerEl) return;
    bannerEl = document.createElement('div');
    Object.assign(bannerEl.style, {
      position: 'fixed',
      bottom: '8px',
      left: '8px',
      padding: '6px 10px',
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '12px',
      borderRadius: '6px',
      zIndex: 2147483647,
      maxWidth: 'calc(100% - 32px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    });
    document.body.appendChild(bannerEl);
  }

  function setDisplayedUrl(rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      // show path/query/hash in address bar (same-origin only)
      const newPath = parsed.pathname + parsed.search + parsed.hash;
      history.replaceState(null, '', newPath);
      // also update title and banner with full external URL for visible variety
      document.title = parsed.hostname + parsed.pathname + (parsed.search || '') + (parsed.hash || ' — ' + location.hostname);
      ensureBanner();
      bannerEl.textContent = parsed.href;
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
    if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
  }

  if (document.readyState === 'complete') {
    startLoop();
  } else {
    window.addEventListener('load', startLoop, { once: true });
  }

  window.__randomUrlLooper = { start: startLoop, stop: stopLoop };
})();
