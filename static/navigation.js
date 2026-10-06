(() => {
  if (!("scrollRestoration" in history)) return;
  history.scrollRestoration = "auto";
  const currentUrl = () => `${location.pathname}${location.search}`;
  const useNativeHistory = () => {
    const renderedUrl = currentUrl();
    // A reload can inherit same-document entries created by the enhanced page.
    addEventListener("popstate", () => {
      history.scrollRestoration = "auto";
      if (currentUrl() !== renderedUrl) location.reload();
    });
  };
  // Fragment visits remain ordinary browser navigation, including initial focus/scroll.
  if (location.hash || !window.Swup || !window.SwupHeadPlugin || !window.SwupA11yPlugin) {
    useNativeHistory();
    return;
  }

  const pages = new Set(["/", "/projects", "/blog/annie", "/blog/logit", "/blog/policyc", "/404"]);
  const isPage = (url) => url.origin === location.origin && !url.hash &&
    pages.has(url.pathname.replace(/\/index\.html$|\/$/, "").replace(/\.html$/, "") || "/");
  const stateKey = "__scrollRestorationId";
  const positions = new Map();

  const entry = () => {
    const state = history.state && typeof history.state === "object" ? history.state : {};
    let id = state[stateKey];
    if (typeof id !== "string") {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      history.replaceState({ ...state, [stateKey]: id }, "");
    }
    return { id, url: currentUrl() };
  };

  const readPosition = (key) => {
    if (positions.has(key)) return positions.get(key);
    try {
      const saved = sessionStorage.getItem(key);
      if (saved === null) return null;
      const position = saved.split(",").map(Number);
      return position.length === 2 && position.every(Number.isFinite) ? position : null;
    } catch {
      return null;
    }
  };

  // This identifies the painted page, not the URL of an in-flight request.
  let visible = entry();
  const savePosition = () => {
    const position = [scrollX, scrollY];
    for (const key of [`scroll-position:entry:${visible.id}`, `scroll-position:url:${visible.url}`]) {
      positions.set(key, position);
      try {
        sessionStorage.setItem(key, position.join(","));
      } catch {
        // Same-document history still works when storage is blocked or full.
      }
    }
  };

  const restorePosition = (useEntry) => {
    const destination = entry();
    const position = (useEntry && readPosition(`scroll-position:entry:${destination.id}`)) ||
      readPosition(`scroll-position:url:${destination.url}`) || [0, 0];
    scrollTo({ left: position[0], top: position[1], behavior: "instant" });
    visible = destination;
    document.dispatchEvent(new Event("portfolio:scroll-restored"));
  };

  const a11y = new SwupA11yPlugin();
  a11y.announcementDelay = 0;
  let swup;
  let nativeHandoff = false;
  const handToBrowser = () => {
    if (nativeHandoff) return;
    nativeHandoff = true;
    // destroy() alone does not cancel a response that is still loading.
    if (swup.visit && !swup.visit.done) swup.visit.abort();
    history.scrollRestoration = "auto";
    location.reload();
  };

  swup = new Swup({
    containers: ["main"],
    animationSelector: false,
    native: false,
    plugins: [new SwupHeadPlugin({ awaitAssets: true }), a11y],
    ignoreVisit: (url, { el } = {}) => {
      const target = el?.getAttribute("target");
      return !isPage(new URL(el?.href || url, location.href)) ||
        !!el?.closest("[data-no-swup]") || !!el?.hasAttribute("download") ||
        !!(target && target.toLowerCase() !== "_self");
    },
    skipPopStateHandling: (event) => {
      // Native fragment changes can emit popstate before hashchange.
      if (location.hash && currentUrl() === visible.url) return true;
      if (nativeHandoff) {
        history.scrollRestoration = "auto";
        location.reload();
        return true;
      }
      if (!isPage(new URL(location.href)) || event.state?.source !== "swup") {
        handToBrowser();
        return true;
      }
      return false;
    },
    hooks: {
      enable: () => { history.scrollRestoration = "manual"; },
    },
  });

  swup.hooks.before("visit:start", (visit) => {
    savePosition();
    visit.animation.animate = false;
  });
  swup.hooks.before("content:replace", () => {
    savePosition();
    document.dispatchEvent(new Event("portfolio:before-replace"));
  });
  swup.hooks.on("content:replace", () => {
    document.dispatchEvent(new Event("portfolio:after-replace"));
  });
  swup.hooks.replace("content:scroll", (visit) => {
    restorePosition(visit.history.popstate);
    return true;
  });
  swup.hooks.replace("fetch:request", async (visit, args, fetchPage) => {
    const response = await fetchPage(visit, args);
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html") ||
        !isPage(new URL(response.url))) {
      throw new Error("Navigation response is not a site HTML page");
    }
    return response;
  });
  swup.hooks.replace("visit:fail", (visit) => {
    if (nativeHandoff || visit !== swup.visit || visit.done) return;
    nativeHandoff = true;
    history.scrollRestoration = "auto";
    const destination = visit.to.url + visit.to.hash;
    visit.abort();
    // History traversal already selected its destination; never go Back again.
    if (visit.history.popstate || currentUrl() === visit.to.url) {
      location.replace(destination);
    } else {
      location.assign(destination);
    }
  });

  restorePosition(true);
  addEventListener("pagehide", savePosition);
  addEventListener("hashchange", () => {
    if (nativeHandoff) return;
    nativeHandoff = true;
    if (swup.visit && !swup.visit.done) swup.visit.abort();
    history.scrollRestoration = "auto";
    removeEventListener("pagehide", savePosition);
    swup.destroy();
    useNativeHistory();
  });
  addEventListener("pageshow", (event) => {
    if (event.persisted && !nativeHandoff) visible = entry();
  });
})();
