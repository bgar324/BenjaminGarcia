(() => {
  if (window.articleMediaInitialized) return;
  window.articleMediaInitialized = true;
  const desktop = matchMedia('(min-width: 1100px) and (min-height: 650px)');
  let currentMain;
  let dispose = () => {};

  function mount() {
    const main = document.querySelector('main');
    if (main === currentMain) return;
    dispose();
    currentMain = main;
    if (!main?.matches('.article-page')) return;
    const header = main.querySelector('.article-header');
    const media = [...main.querySelectorAll('figure, fieldset.article-chart-switcher')]
      .filter(node => !node.matches('.article-chart-panel') && !node.parentElement.closest('fieldset'));
    if (!media.length) return;
    const sections = [...main.querySelectorAll('.article-body > section')];
    let last = 0;
    const timeline = sections.map(section => {
      const index = media.findIndex(node => section.contains(node));
      if (index >= 0) last = index;
      return { section, index: last };
    });
    const stage = document.createElement('div');
    stage.className = 'article-media-stage';
    stage.setAttribute('role', 'region');
    stage.setAttribute('aria-label', 'Illustration for the current article section');
    const entries = media.map(node => ({ node, marker: document.createComment('inline article media') }));
    let enabled = false;
    let active = -1;
    let frame = 0;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let swapTimer = null;
    let pending = -1;
    function cancelSwap() {
      clearTimeout(swapTimer);
      swapTimer = null;
      pending = -1;
      stage.classList.remove('is-exit', 'is-enter-start');
    }
    function show(index) {
      entries.forEach(({ node }, i) => { node.hidden = i !== index; });
      active = index;
      stage.scrollTop = 0;
    }
    function swap(next) {
      for (const image of entries[next].node.querySelectorAll('img')) image.loading = 'eager';
      if (active < 0 || reducedMotion.matches) {
        cancelSwap();
        show(next);
        return;
      }
      if (next === active) { cancelSwap(); return; }
      pending = next;
      if (swapTimer !== null) return;
      stage.classList.add('is-exit');
      const duration = parseFloat(getComputedStyle(stage).getPropertyValue('--media-swap-dur'));
      swapTimer = setTimeout(() => {
        swapTimer = null;
        if (!enabled) return;
        if (stage.contains(document.activeElement) && document.activeElement.matches(':focus-visible')) {
          cancelSwap();
          return;
        }
        show(pending);
        pending = -1;
        stage.classList.remove('is-exit');
        stage.classList.add('is-enter-start');
        void stage.offsetWidth;
        stage.classList.remove('is-enter-start');
      }, duration);
    }

    function update() {
      frame = 0;
      if (!enabled) return;
      let next = 0;
      for (const item of timeline) {
        if (item.section.getBoundingClientRect().top <= innerHeight * .32) next = item.index;
        else break;
      }
      // Never hide a chart control or link while it has keyboard focus.
      if (stage.contains(document.activeElement) && document.activeElement.matches(':focus-visible')) return;
      swap(next);
    }
    function schedule() {
      if (!frame && enabled) frame = requestAnimationFrame(update);
    }
    function disable() {
      enabled = false;
      cancelSwap();
      cancelAnimationFrame(frame);
      frame = 0;
      for (const { node, marker } of entries) {
        if (marker.parentNode) marker.replaceWith(node);
        node.hidden = false;
      }
      stage.remove();
      main.classList.remove('has-side-media');
      active = -1;
    }
    function sync() {
      if (!desktop.matches) { disable(); return; }
      if (!enabled) {
        for (const { node, marker } of entries) {
          node.before(marker);
          stage.append(node);
          node.hidden = true;
        }
        header.append(stage);
        main.classList.add('has-side-media');
        enabled = true;
      }
      schedule();
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    stage.addEventListener('focusout', schedule);
    desktop.addEventListener('change', sync);
    reducedMotion.addEventListener('change', schedule);
    sync();
    document.fonts.ready.then(schedule);
    dispose = () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      desktop.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', schedule);
      disable();
    };
  }
  // Swup replaces main without reloading the document. Own one mounted instance.
  new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  mount();
})();
