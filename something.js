(function () {
    'use strict';

    const BASE_URL = 'https://example.net', RANDOM_PATHS = [
        '/watch?v=LcCPzxAQplU', '/kys', '/long_live_skel', '/idk', 
        '/IHATEMYSELF', '/HELLO', '/LOLLLL', '/BECOOL', 
        '/BEHAPPY', '/HELP', '/#SKID', '/LOLOLOL', 
        '/LEMA', '/Fkilovedher@proton.me', '/LOLLLL'
    ];
    
    let index = 0, intervalId = null, bannerEl = null;

    function ensureBanner() {
        if (!bannerEl) {
            bannerEl = document.createElement('div');
            Object.assign(bannerEl.style, {
                position: 'fixed', bottom: '8px', left: '8px',
                padding: '6px 10px', background: 'rgba(0,0,0,0.7)',
                color: '#fff', fontFamily: 'system-ui, sans-serif',
                fontSize: '12px', borderRadius: '6px',
                zIndex: 2147483647, maxWidth: 'calc(100% - 32px)',
                overflow: 'hidden', textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            });
            document.body.appendChild(bannerEl);
        }
    }

    function setDisplayedUrl(path) {
        const newUrl = BASE_URL + path;
        history.replaceState(null, '', newUrl);
        ensureBanner();
        bannerEl.textContent = newUrl;
        console.log('Displayed URL changed to', newUrl);
    }

    function startLoop() {
        if (!RANDOM_PATHS.length) return;
        setDisplayedUrl(RANDOM_PATHS[index]);
        intervalId = setInterval(() => {
            index = (index + 1) % RANDOM_PATHS.length;
            setDisplayedUrl(RANDOM_PATHS[index]);
        }, 1500);
    }

    window.addEventListener('load', startLoop);
})();
