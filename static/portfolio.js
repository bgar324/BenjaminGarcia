(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let videos = [];
  let visible = new Set();
  let loadObserver;
  let visibilityObserver;


  const syncPlayback = () => {
    const canPlay = !reduceMotion.matches && !document.hidden;
    for (const video of videos) {
      if (canPlay && visible.has(video) && video.hasAttribute("src")) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  };

  const loadVideo = (video) => {
    if (video.hasAttribute("src")) return;
    video.muted = true;
    video.defaultMuted = true;
    video.src = video.dataset.previewSrc;
    video.load();
  };

  const initialize = () => {
    for (const video of videos) video.pause();
    loadObserver?.disconnect();
    visibilityObserver?.disconnect();
    visible = new Set();
    videos = Array.from(document.querySelectorAll("video[data-preview-src]"));
    if (!("IntersectionObserver" in window)) {
      for (const video of videos) {
        loadVideo(video);
        visible.add(video);
      }
      syncPlayback();
      return;
    }
    loadObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadVideo(entry.target);
        loadObserver.unobserve(entry.target);
      }
      syncPlayback();
    }, { rootMargin: "200px" });
    visibilityObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      syncPlayback();
    }, { threshold: 0.05 });
    for (const video of videos) {
      loadObserver.observe(video);
      visibilityObserver.observe(video);
    }
  };

  reduceMotion.addEventListener("change", () => {
    syncPlayback();
  });
  document.addEventListener("visibilitychange", syncPlayback);
  document.addEventListener("portfolio:pageview", initialize);
  const finePointer = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");
  // const cursor = document.createElement("div");
  // cursor.className = "portfolio-cursor";
  // cursor.setAttribute("aria-hidden", "true");
  // const cursorLabel = document.createElement("span");
  // cursor.append(cursorLabel);
  // document.body.append(cursor);
  // const controls = "a[href], button, [role='button'], summary, label[for], select, input[type='checkbox'], input[type='radio'], [data-cursor-text]";
  // let label = "";
  // let letteringFrame = 0;
  // let movementFrame = 0;
  // let textExitTimer;
  // let pointer = { x: 0, y: 0, target: null };
  // const setLabel = (next) => {
  //   if (next === label) return;
  //   label = next;
  //   cancelAnimationFrame(letteringFrame);
  //   const previous = cursorLabel.textContent;
  //   const text = next || previous;
  //   const duration = Math.min(40 + 12 * text.length, 160);
  //   const start = performance.now();
  //   const animate = (now) => {
  //     const progress = Math.min(1, (now - start) / duration);
  //     const eased = 1 - (1 - progress) ** 3;
  //     cursorLabel.textContent = text.slice(0, Math.round(text.length * (next ? eased : 1 - eased)));
  //     cursor.classList.toggle("is-label", Boolean(cursorLabel.textContent));
  //     if (progress < 1) letteringFrame = requestAnimationFrame(animate);
  //   };
  //   letteringFrame = requestAnimationFrame(animate);
  // };
  // const hideCursor = () => {
  //   cursor.classList.remove("is-visible", "is-pressed");
  //   document.documentElement.classList.remove("has-portfolio-cursor");
  // };
  // const overText = (target, x, y) => {
  //   if (target.closest("textarea, input, [contenteditable='true']")) return true;
  //   if (getComputedStyle(target).userSelect === "none") return false;
  //   const caret = document.caretRangeFromPoint?.(x, y);
  //   const position = !caret && document.caretPositionFromPoint?.(x, y);
  //   const node = caret?.startContainer || position?.offsetNode;
  //   if (node?.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return false;
  //   const range = document.createRange();
  //   range.selectNodeContents(node);
  //   return [...range.getClientRects()].some(r => x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6);
  // };
  // const updateCursor = () => {
  //   movementFrame = 0;
  //   const { x, y, target } = pointer;
  //   if (!target?.isConnected) return;
  //   const control = target.closest(controls);
  //   const unavailable = target.closest('[data-cursor="coming-soon"]');
  //   cursor.classList.toggle("is-interactive", Boolean(control) && !unavailable);
  //   cursor.classList.toggle("is-unavailable", Boolean(unavailable));
  //   if (!control && !unavailable && overText(target, x, y)) {
  //     clearTimeout(textExitTimer);
  //     textExitTimer = undefined;
  //     cursor.classList.add("is-text");
  //   } else if (control || unavailable) {
  //     clearTimeout(textExitTimer);
  //     textExitTimer = undefined;
  //     cursor.classList.remove("is-text");
  //   } else if (!textExitTimer) {
  //     textExitTimer = setTimeout(() => {
  //       cursor.classList.remove("is-text");
  //       textExitTimer = undefined;
  //     }, 90);
  //   }
  //   let next = control?.getAttribute("data-cursor-text") || "";
  //   if (unavailable) next = "Coming soon";
  //   else if (control?.matches("[data-demo]")) next = "Watch demo";
  //   else if (control?.matches(".portfolio-card")) next = new URL(control.href).origin === location.origin ? "Read story" : "View website";
  //   setLabel(next);
  //   cursor.style.left = `${x}px`;
  //   cursor.style.top = `${y}px`;
  //   cursor.classList.toggle("is-flipped", x > innerWidth - 270);
  //   cursor.classList.add("is-visible");
  //   document.documentElement.classList.add("has-portfolio-cursor");
  // };
  // document.addEventListener("pointermove", (event) => {
  //   if (!finePointer.matches || reduceMotion.matches || event.pointerType === "touch") return hideCursor();
  //   pointer = { x: event.clientX, y: event.clientY, target: event.target };
  //   if (!movementFrame) movementFrame = requestAnimationFrame(updateCursor);
  // }, { passive: true });
  // document.addEventListener("pointerdown", () => cursor.classList.add("is-pressed"));
  // const releaseCursor = () => cursor.classList.remove("is-pressed");
  // window.addEventListener("pointerup", releaseCursor);
  // window.addEventListener("pointercancel", releaseCursor);
  // document.addEventListener("pointerleave", hideCursor);
  // window.addEventListener("blur", hideCursor);
  // finePointer.addEventListener("change", hideCursor);
  // reduceMotion.addEventListener("change", hideCursor);
  // document.addEventListener("portfolio:pageview", hideCursor);
  initialize();
})();
