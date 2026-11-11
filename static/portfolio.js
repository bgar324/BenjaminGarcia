(() => {
  if (window.__portfolioGallery) return;
  window.__portfolioGallery = true;
  let cleanup = () => {};
  function init() {
    cleanup();
    const root = document.querySelector('.portfolio-page');
    if (!root) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const videos = [...root.querySelectorAll('video[data-preview]')];
    const records = videos.map(video => ({ video, button: video.parentElement.querySelector('button'), visible: false, manual: null }));
    const controller = new AbortController();
    const options = { signal: controller.signal };
    const update = record => {
      const { video, button } = record;
      const playing = !video.paused;
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${video.getAttribute('aria-label').split(' — ')[0]} preview`);
      button.querySelector('.motion-icon').textContent = playing ? 'Ⅱ' : '▶';
      button.querySelector('.motion-label').textContent = playing ? 'Pause preview' : 'Play preview';
    };
    const sync = record => {
      const allowed = record.manual ?? (!reduced.matches && !connection?.saveData);
      if (record.visible && allowed && !document.hidden) {
        if (!record.video.getAttribute('src')) record.video.src = record.video.dataset.preview;
        record.video.play().catch(() => update(record));
      } else record.video.pause();
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const record = records.find(record => record.video === entry.target);
        record.visible = entry.isIntersecting;
        sync(record);
      });
    }, { threshold: .15 });
    records.forEach(record => {
      record.button.hidden = false;
      record.video.addEventListener('loadeddata', () => record.video.classList.add('has-frame'), options);
      record.button.addEventListener('click', () => {
        record.manual = record.video.paused;
        sync(record);
      }, options);
      ['play', 'pause'].forEach(event => record.video.addEventListener(event, () => update(record), options));
      record.video.addEventListener('error', () => { record.button.hidden = true; }, options);
      observer.observe(record.video);
    });
    document.addEventListener('visibilitychange', () => records.forEach(sync), options);
    reduced.addEventListener('change', () => records.forEach(record => { record.manual = null; sync(record); }), options);
    const links = [...root.querySelectorAll('.rail-nav a')];
    const sections = links.map(link => root.querySelector(link.getAttribute('href')));
    let scheduled = false;
    const setActive = () => {
      scheduled = false;
      let active = 0;
      sections.forEach((section, index) => { if (section.getBoundingClientRect().top < innerHeight * .4) active = index; });
      links.forEach((link, index) => index === active ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
    };
    addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(setActive); } }, { ...options, passive:true });
    setActive();
    cleanup = () => { controller.abort(); observer.disconnect(); videos.forEach(video => video.pause()); };
  }
  document.addEventListener('portfolio:page-ready', init);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
