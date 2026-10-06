(() => {
  if (window.portfolioResumeInitialized) return;
  window.portfolioResumeInitialized = true;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let dialog, paper, message, share, trigger;
  let closeTimer, resizeTimer, openFrame;
  let feedbackTimer, shareRequest = 0;
  let libraryPromise, documentPromise;
  let generation = 0;
  let renders = [];
  let lastWidth = 0;

  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'resume-dialog';
    dialog.setAttribute('aria-label', 'Benjamin Garcia résumé');
    dialog.innerHTML = `
      <div class="resume-shell">
        <div class="resume-paper" aria-busy="true"><p class="resume-loading">Loading résumé…</p></div>
        <img class="resume-reader" src="/static/snoopy/reading.webp" width="402" height="500" alt="Snoopy reading on a stack of books">
        <button class="resume-close" type="button" aria-label="Close résumé" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>
        <div class="resume-actions" aria-label="Résumé actions">
          <a class="resume-control" href="/resume.pdf" download="Benjamin-Garcia-Resume.pdf" aria-label="Download résumé"><span class="resume-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg></span><span class="resume-label">Download</span></a>
          <button class="resume-control resume-share" type="button" aria-label="Share résumé"><span class="resume-icon" aria-hidden="true"><svg class="share-symbol" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10.5 6-4M9 13.5l6 4"/></svg><svg class="share-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg><svg class="share-spinner" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-8-8"/></svg></span><span class="resume-label">Share</span></button>
        </div>
        <p class="resume-message" role="status"></p>
        <p class="resume-announcement" role="status"></p>
        <input class="resume-share-url" aria-label="Résumé link to copy" readonly hidden>
      </div>`;
    document.body.append(dialog);
    paper = dialog.querySelector('.resume-paper');
    message = dialog.querySelector('.resume-message');
    share = dialog.querySelector('.resume-share');
    share.addEventListener('pointerleave', () => share.classList.remove('is-settled'));
    share.addEventListener('blur', () => share.classList.remove('is-settled'));
    share.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') share.classList.remove('is-settled');
    });
    dialog.querySelector('.resume-close').addEventListener('click', () => close());
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
    dialog.addEventListener('close', finishClose);
    document.addEventListener('keydown', event => {
      if (!dialog.open || event.key !== 'Tab') return;
      const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled)')]
        .filter(element => element.getClientRects().length);
      const index = controls.indexOf(document.activeElement);
      const next = index < 0
        ? (event.shiftKey ? controls.length - 1 : 0)
        : (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
      event.preventDefault();
      controls[next].focus();
    }, true);
    share.addEventListener('click', shareResume);
  }

  async function loadPdf() {
    libraryPromise ||= import('/static/pdfjs/pdf.min.mjs?v=1');
    const pdfjs = await libraryPromise;
    pdfjs.GlobalWorkerOptions.workerSrc = '/static/pdfjs/pdf.worker.min.mjs?v=1';
    if (!documentPromise) {
      documentPromise = pdfjs.getDocument({ url: '/resume.pdf', isEvalSupported: false }).promise
        .catch(error => { documentPromise = null; throw error; });
    }
    return { pdfjs, pdf: await documentPromise };
  }

  function cancelRendering() {
    generation++;
    for (const task of renders) task.cancel();
    renders = [];
  }

  async function render() {
    cancelRendering();
    const ticket = generation;
    try {
      paper.setAttribute('aria-busy', 'true');
      const { pdfjs, pdf } = await loadPdf();
      if (ticket !== generation || !dialog.open) return;
      const width = paper.clientWidth;
      lastWidth = width;
      const fragment = document.createDocumentFragment();
      for (let number = 1; number <= pdf.numPages; number++) {
        const page = await pdf.getPage(number);
        if (ticket !== generation || !dialog.open) return;
        const natural = page.getViewport({ scale: 1 });
        const scale = width / natural.width;
        const viewport = page.getViewport({ scale });
        const outputScale = Math.min(devicePixelRatio || 1, 2);
        const sheet = document.createElement('div');
        sheet.className = 'resume-pdf-page';
        sheet.style.height = `${viewport.height}px`;
        sheet.style.setProperty('--total-scale-factor', scale);
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width * outputScale);
        canvas.height = Math.ceil(viewport.height * outputScale);
        canvas.setAttribute('aria-hidden', 'true');
        const text = document.createElement('div');
        text.className = 'resume-text-layer';
        text.setAttribute('aria-label', `Résumé page ${number}`);
        sheet.append(canvas, text);
        fragment.append(sheet);
        const task = page.render({ canvasContext: canvas.getContext('2d'), viewport,
          transform: [outputScale, 0, 0, outputScale, 0, 0] });
        renders.push(task);
        await task.promise;
        if (ticket !== generation || !dialog.open) return;
        const textLayer = new pdfjs.TextLayer({ textContentSource: await page.getTextContent(), container: text, viewport });
        renders.push(textLayer);
        await textLayer.render();
      }
      if (ticket !== generation || !dialog.open) return;
      paper.replaceChildren(fragment);
      paper.setAttribute('aria-busy', 'false');
      renders = [];
    } catch (error) {
      if (ticket !== generation || !dialog.open) return;
      paper.setAttribute('aria-busy', 'false');
      const failure = document.createElement('p');
      failure.className = 'resume-loading';
      failure.append('The preview could not load. ');
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Open the PDF instead';
      failure.append(link);
      paper.replaceChildren(failure);
    }
  }

  function measureControls() {
    if (!dialog?.open) return;
    for (const control of dialog.querySelectorAll('.resume-control')) {
      const style = getComputedStyle(control);
      const label = control.querySelector('.resume-label');
      const icon = control.querySelector('.resume-icon');
      const width = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
        + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
        + parseFloat(getComputedStyle(icon).width)
        + parseFloat(getComputedStyle(label).marginLeft) + label.scrollWidth;
      control.style.setProperty('--expanded-width', `${width}px`);
    }
  }

  function resetFeedback(shrink = false) {
    clearTimeout(feedbackTimer);
    share.classList.remove('is-success', 'is-settled');
    if (shrink && (share.matches(':hover, :focus-visible') || matchMedia('(hover: none)').matches)) share.classList.add('is-settled');
    share.querySelector('.resume-label').textContent = 'Share';
    dialog.querySelector('.resume-announcement').textContent = '';
    share.setAttribute('aria-label', 'Share résumé');
    measureControls();
  }
  function showSuccess(label) {
    resetFeedback();
    message.textContent = '';
    dialog.querySelector('.resume-share-url').hidden = true;
    share.querySelector('.resume-label').textContent = label;
    measureControls();
    dialog.querySelector('.resume-announcement').textContent = label === 'Copied' ? 'Résumé link copied' : 'Résumé shared';
    share.setAttribute('aria-label', label === 'Copied' ? 'Résumé link copied' : 'Résumé shared');
    share.classList.add('is-success');
    feedbackTimer = setTimeout(() => resetFeedback(true), 1500);
  }

  function setPending(pending) {
    share.classList.toggle('is-pending', pending);
    share.setAttribute('aria-busy', String(pending));
    share.setAttribute('aria-disabled', String(pending));
  }
  async function shareResume() {
    if (share.getAttribute('aria-busy') === 'true') return;
    const url = new URL('/resume.pdf', location.origin).href;
    const request = ++shareRequest;
    resetFeedback();
    setPending(true);
    share.setAttribute('aria-label', 'Sharing résumé');
    try {
      if (navigator.share && matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ title: 'Benjamin Garcia — Résumé', url });
        if (request === shareRequest && dialog.open) showSuccess('Shared');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        if (request === shareRequest && dialog.open) showSuccess('Copied');
      } else {
        showCopyLink(url);
      }
    } catch (error) {
      if (request === shareRequest && dialog.open) {
        resetFeedback();
        if (error.name !== 'AbortError') showCopyLink(url);
      }
    } finally {
      if (request === shareRequest) setPending(false);
    }
  }
  function showCopyLink(url) {
    resetFeedback();
    const input = dialog.querySelector('.resume-share-url');
    input.value = url;
    input.hidden = false;
    input.focus();
    input.select();
    message.textContent = 'Copy this résumé link';
  }

  function open(invoker) {
    if (!dialog) build();
    if (dialog.open && !dialog.classList.contains('is-closing')) return;
    clearTimeout(closeTimer);
    cancelAnimationFrame(openFrame);
    trigger = invoker;
    resetFeedback();
    dialog.classList.remove('is-closing');
    message.textContent = '';
    dialog.querySelector('.resume-share-url').hidden = true;
    if (!dialog.open) dialog.showModal();
    measureControls();
    document.fonts.ready.then(measureControls);
    document.documentElement.classList.add('resume-is-open');
    // Commit the closed style before opening so the supplied transition runs.
    void dialog.offsetWidth;
    openFrame = requestAnimationFrame(() => dialog.classList.add('is-open'));
    render();
  }
  function finishClose() {
    if (dialog.open) return;
    clearTimeout(closeTimer);
    shareRequest++;
    resetFeedback();
    setPending(false);
    clearTimeout(resizeTimer);
    cancelAnimationFrame(openFrame);
    cancelRendering();
    dialog.classList.remove('is-open', 'is-closing');
    document.documentElement.classList.remove('resume-is-open');
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    trigger = null;
  }
  function close(immediate = false) {
    if (!dialog?.open) return;
    clearTimeout(closeTimer);
    cancelAnimationFrame(openFrame);
    dialog.classList.remove('is-open');
    dialog.classList.add('is-closing');
    if (immediate || motion.matches) { dialog.close(); return; }
    closeTimer = setTimeout(() => dialog.close(), 150);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.closest('.resume-dialog')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== '/resume.pdf' || typeof HTMLDialogElement === 'undefined') return;
    event.preventDefault();
    open(link);
  });
  addEventListener('resize', () => {
    if (!dialog?.open) return;
    measureControls();
    if (paper.clientWidth === lastWidth) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 100);
  });
  document.addEventListener('portfolio:before-replace', () => close(true));
  motion.addEventListener('change', () => { if (motion.matches && dialog?.classList.contains('is-closing')) close(true); });
})();
