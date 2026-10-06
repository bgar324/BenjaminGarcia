(() => {
  if (window.portfolioHomeInitialized) return;
  window.portfolioHomeInitialized = true;
  const poses = [
    { src: '/static/snoopy/0.png', alt: 'Snoopy wearing glasses' },
    { src: '/static/snoopy/1.png?v=2', alt: 'Snoopy daydreaming with his chin resting on his hands' },
    { src: '/static/snoopy/2.png', alt: 'Snoopy wearing a bow tie and holding a teacup' },
    { src: '/static/snoopy/3.png', alt: 'Snoopy in profile' },
    { src: '/static/snoopy/headphones.webp', alt: 'Snoopy listening to music with green headphones' },
  ];
  const storageKey = 'snoopy-last-pose';
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
  const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
  let preloaded = false;
  let currentMain;
  let dispose = () => {};

  function unmount() {
    dispose();
    dispose = () => {};
    currentMain = null;
  }
  function mount() {
    const main = document.querySelector('main');
    if (main === currentMain) return;
    unmount();
    currentMain = main;
    const button = main?.querySelector('.snoopy');
    if (!button) return;
    const image = button.querySelector('img');
    let previous = -1;
    try {
      const saved = sessionStorage.getItem(storageKey);
      const index = saved === null ? -1 : Number(saved);
      if (Number.isInteger(index) && index >= 0 && index < poses.length) previous = index;
    } catch {
      // Cycling still works when browser storage is unavailable.
    }
    let current = previous < 0
      ? Math.floor(Math.random() * poses.length)
      : (previous + 1 + Math.floor(Math.random() * (poses.length - 1))) % poses.length;
    function showPose() {
      image.src = poses[current].src;
      image.alt = poses[current].alt;
      try {
        sessionStorage.setItem(storageKey, String(current));
      } catch {
        // Reload non-repetition requires session storage; clicking does not.
      }
    }
    function nextPose() {
      current = (current + 1) % poses.length;
      showPose();
    }
    showPose();
    if (!preloaded) {
      for (const pose of poses) {
        const preload = new Image();
        preload.src = pose.src;
      }
      preloaded = true;
    }
    button.hidden = false;
    button.addEventListener('click', nextPose);
    const clock = main.querySelector('.local-clock');
    function updateClock() {
      if (!clock) return;
      const now = new Date();
      clock.dateTime = now.toISOString();
      clock.textContent = `${dateFormat.format(now).replaceAll(',', '')} ${timeFormat.format(now)}`;
      clock.hidden = false;
    }
    updateClock();
    const timer = clock ? setInterval(updateClock, 60_000) : null;
    const textBlocks = main.querySelectorAll('p, h1, h2, h3, a, time');
    let fitFrame = 0;
    function fitReadingType() {
      fitFrame = 0;
      main.style.removeProperty('--reading-scale');
      if (innerWidth <= 760) return;
      const baseSize = parseFloat(getComputedStyle(main).fontSize);
      let low = 1;
      let high = Math.max(1, 18 / baseSize);
      function fits(scale) {
        main.style.setProperty('--reading-scale', scale);
        if (main.getBoundingClientRect().height > innerHeight ||
            main.scrollWidth > main.clientWidth) return false;
        for (const block of textBlocks) {
          if (block.clientWidth && block.scrollWidth > block.clientWidth + 1) return false;
        }
        return true;
      }
      // Grow reading text, not the display name or the gaps. Wrapping sets the limit.
      if (fits(high)) return;
      while (high - low > .005) {
        const size = (low + high) / 2;
        if (fits(size)) low = size;
        else high = size;
      }
      main.style.setProperty('--reading-scale', low);
    }
    function scheduleFit() {
      if (currentMain !== main) return;
      cancelAnimationFrame(fitFrame);
      fitFrame = requestAnimationFrame(fitReadingType);
    }
    fitReadingType();
    document.fonts.ready.then(scheduleFit);
    window.addEventListener('resize', scheduleFit);
    dispose = () => {
      button.removeEventListener('click', nextPose);
      clearInterval(timer);
      window.removeEventListener('resize', scheduleFit);
      cancelAnimationFrame(fitFrame);
    };
  }
  document.addEventListener('portfolio:before-replace', unmount);
  document.addEventListener('portfolio:after-replace', mount);
  mount();
})();
