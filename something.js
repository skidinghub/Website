(function () {
    'use strict';

    const BASE_URL = 'https://example.net'; // Base URL to retain
    const RANDOM_PATHS = [
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

    const INTERVAL_MS 100; // Interval for changing paths
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

    function setDisplayedUrl(path) {
        const newUrl = BASE_URL + path; // Construct new URL
        try {
            history.replaceState(null, '', newUrl); // Change only the URL path
            ensureBanner();
            bannerEl.textContent = newUrl; // Display the new URL
            console.log('Displayed URL changed to', newUrl);
        } catch (e) {
            console.error('Invalid URL:', path);
        }
    }

    function startLoop() {
        if (!RANDOM_PATHS.length) return;
        setDisplayedUrl(RANDOM_PATHS[index]);
        intervalId = setInterval(() => {
            index = (index + 1) % RANDOM_PATHS.length;
            setDisplayedUrl(RANDOM_PATHS[index]);
        }, INTERVAL_MS);
    }

    function stopLoop() {
        clearInterval(intervalId);
        if (bannerEl && bannerEl.parentNode) {
            bannerEl.parentNode.removeChild(bannerEl);
        }
    }

    window.addEventListener('load', startLoop);
    window.__randomUrlLooper = { start: startLoop, stop: stopLoop };
})();
