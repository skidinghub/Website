(function () {
  'use strict';

  const RANDOM_SITES = [
    '/watch?v=LcCPzxAQplU',
    '/kys',
    '/long_live_skel',
    '/idk',
    '/IHATEMYSELF',
    '/HELLO',
    '/LOLLLL',
    '/BECOOL',
    '/BEHAPPY',
    '/HELP',
    '/#SKID',
    '/LOLOLOL',
    '/LEMA',
    '/Fkilovedher@proton.me',
    '/LOLLLL'
  ];

  const INTERVAL_MS = 150;
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
      const newPath = parsed.pathname.replace(/\/$/, '') + parsed.search + parsed.hash; // Remove trailing slash
      history.replaceState(null, '', newPath);
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
