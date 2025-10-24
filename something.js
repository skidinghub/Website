(function () {
    'use strict';

    const RANDOM_PATHS = [
        'http://www.Meetbeater.com/watch?v=LcCPzxAQplU', 'http://www.Meetbeater.com/kys', 'http://www.Meetbeater.com/long_live_skel', 'http://www.Meetbeater.com/idk',
        'http://www.Meetbeater.com/IHATEMYSELF', 'http://www.Meetbeater.com/HELLO', 'http://www.Meetbeater.com/LOLLLL', 'http://www.Meetbeater.com/BECOOL',
        'http://www.Meetbeater.com/BEHAPPY', 'http://www.Meetbeater.com/HELP', 'http://www.Meetbeater.com/#SKID', 'http://www.Meetbeater.com/LOLOLOL',
        'http://www.Meetbeater.com/LEMA', 'http://www.Meetbeater.com/Fkilovedher@proton.me', 'http://www.Meetbeater.com/LOLLLL'
    ];

    let index = 0, intervalId, bannerEl;

    const ensureBanner = () => {
        if (bannerEl) return;
        bannerEl = document.createElement('div');
        Object.assign(bannerEl.style, {
            position: 'fixed', bottom: '8px', left: '8px', padding: '6px 10px',
            background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '12px',
            borderRadius: '6px', zIndex: 2147483647, maxWidth: 'calc(100% - 32px)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        });
        document.body.appendChild(bannerEl);
    };

    const setDisplayedUrl = (path) => {
        const newUrl = path; // This is just for display
        ensureBanner();
        bannerEl.textContent = newUrl; // Update the banner
        console.log('Displayed path changed to', newUrl);
    };

    const startLoop = () => {
        setDisplayedUrl(RANDOM_PATHS[index]);
        intervalId = setInterval(() => {
            index = (index + 1) % RANDOM_PATHS.length;
            setDisplayedUrl(RANDOM_PATHS[index]);
        }, 1500);
    };

    window.addEventListener('load', startLoop);
})();
