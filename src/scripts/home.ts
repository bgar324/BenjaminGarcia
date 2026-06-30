const root = document.documentElement;
const body = document.body;
const themeInput = document.querySelector<HTMLInputElement>("[data-theme-input]");
const overlayLocks = {
  image: false,
  menu: false,
  video: false,
};

const syncBodyScrollLock = () => {
  body.style.overflow = Object.values(overlayLocks).some(Boolean) ? "hidden" : "";
};

const getFocusableElements = (container: Element) =>
  Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");

const trapDialogFocus = (event: KeyboardEvent, container: Element) => {
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const syncThemeButton = () => {
  const isDark = Boolean(themeInput?.checked);
  document.querySelectorAll("[data-theme-label]").forEach((label) => {
    label.textContent = isDark ? "Light" : "Dark";
  });
  document.querySelectorAll("[data-theme-moon]").forEach((icon) => {
    icon.classList.toggle("opacity-0", isDark);
    icon.classList.toggle("rotate-90", isDark);
    icon.classList.toggle("scale-0", isDark);
  });
  document.querySelectorAll("[data-theme-sun]").forEach((icon) => {
    icon.classList.toggle("opacity-0", !isDark);
    icon.classList.toggle("-rotate-90", !isDark);
    icon.classList.toggle("scale-0", !isDark);
  });
};

syncThemeButton();
let themeTransitionTimer: number | null = null;
themeInput?.addEventListener("change", () => {
  const nextTheme = themeInput.checked ? "dark" : "light";
  if (themeTransitionTimer) window.clearTimeout(themeTransitionTimer);
  root.classList.add("theme-changing");
  localStorage.setItem("theme", nextTheme);
  syncThemeButton();
  themeTransitionTimer = window.setTimeout(() => {
    root.classList.remove("theme-changing");
  }, 360);
});

document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }
  });
});

const imageModal = document.querySelector<HTMLElement>("[data-image-modal]");
const imageModalContent = document.querySelector<HTMLElement>("[data-image-modal-content]");
const imageModalImg = document.querySelector<HTMLImageElement>("[data-image-modal-img]");
const imageModalAvif = document.querySelector<HTMLSourceElement>("[data-image-modal-avif]");
const imageModalWebp = document.querySelector<HTMLSourceElement>("[data-image-modal-webp]");
let lastImageTrigger: HTMLElement | null = null;
let imageModalCloseTimer: number | null = null;
let imageModalOpenFrame: number | null = null;
const imageModalDuration = 360;
const modalImagePreloads = new Map<string, HTMLImageElement>();

const preloadModalImage = (trigger: HTMLElement) => {
  const src = trigger.dataset.imageSrc || "";
  const srcset = trigger.dataset.imageAvifSrcset || trigger.dataset.imageWebpSrcset || "";
  if (!src && !srcset) return;
  const isProfileImage = trigger.dataset.imageModalKind === "profile";
  const sizes = isProfileImage ? "(max-width: 512px) 100vw, 512px" : "(max-width: 1024px) 100vw, 1024px";
  const cacheKey = `${srcset}|${src}|${sizes}`;
  if (modalImagePreloads.has(cacheKey)) return;

  const image = new Image();
  image.decoding = "async";
  image.loading = "eager";
  image.fetchPriority = "low";
  image.sizes = sizes;
  if (srcset) image.srcset = srcset;
  if (src) image.src = src;
  modalImagePreloads.set(cacheKey, image);
};

const preloadModalImages = () => {
  const triggers = Array.from(document.querySelectorAll("[data-image-modal-trigger]"));
  let index = 0;
  const preloadNext = () => {
    const trigger = triggers[index];
    index += 1;
    if (trigger instanceof HTMLElement) preloadModalImage(trigger);
    if (index < triggers.length) window.setTimeout(preloadNext, 80);
  };
  preloadNext();
};

const scheduleModalImagePreloads = () => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const idleWindow = window as Window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      };
      if (idleWindow.requestIdleCallback) {
        idleWindow.requestIdleCallback(preloadModalImages, { timeout: 1500 });
      } else {
        window.setTimeout(preloadModalImages, 500);
      }
    });
  });
};

const closeImageModal = () => {
  if (!imageModal || imageModal.dataset.phase === "closed") return;
  if (imageModalCloseTimer) window.clearTimeout(imageModalCloseTimer);
  if (imageModalOpenFrame) window.cancelAnimationFrame(imageModalOpenFrame);
  imageModal.dataset.open = "false";
  imageModal.dataset.phase = "closing";
  imageModal.setAttribute("aria-hidden", "true");
  imageModal.setAttribute("inert", "");
  imageModalCloseTimer = window.setTimeout(() => {
    if (imageModal.dataset.open === "true") return;
    imageModal.dataset.phase = "closed";
    overlayLocks.image = false;
    syncBodyScrollLock();
    if (imageModalAvif instanceof HTMLSourceElement) imageModalAvif.srcset = "";
    if (imageModalWebp instanceof HTMLSourceElement) imageModalWebp.srcset = "";
    if (imageModalImg instanceof HTMLImageElement) {
      imageModalImg.removeAttribute("srcset");
      imageModalImg.src = "";
    }
    lastImageTrigger?.focus?.();
  }, imageModalDuration);
};

document.querySelectorAll<HTMLElement>("[data-image-modal-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    lastImageTrigger = trigger;
    const isProfileImage = trigger.dataset.imageModalKind === "profile";
    if (imageModalContent instanceof HTMLElement) {
      imageModalContent.dataset.imageKind = isProfileImage ? "profile" : "project";
    }
    imageModalContent?.classList.toggle("max-w-lg", isProfileImage);
    imageModalContent?.classList.toggle("max-w-5xl", !isProfileImage);
    if (imageModalAvif instanceof HTMLSourceElement) {
      imageModalAvif.srcset = trigger.dataset.imageAvifSrcset || "";
      imageModalAvif.sizes = isProfileImage ? "(max-width: 639px) 18rem, 512px" : "(max-width: 639px) 21rem, 1024px";
    }
    if (imageModalWebp instanceof HTMLSourceElement) {
      imageModalWebp.srcset = trigger.dataset.imageWebpSrcset || "";
      imageModalWebp.sizes = isProfileImage ? "(max-width: 639px) 18rem, 512px" : "(max-width: 639px) 21rem, 1024px";
    }
    if (imageModalImg instanceof HTMLImageElement) {
      imageModalImg.src = trigger.dataset.imageSrc || "";
      imageModalImg.alt = trigger.dataset.imageAlt || "Expanded image preview";
      imageModalImg.width = Number(trigger.dataset.imageWidth || 2048);
      imageModalImg.height = Number(trigger.dataset.imageHeight || 1277);
      imageModalImg.sizes = isProfileImage ? "(max-width: 512px) 100vw, 512px" : "(max-width: 1024px) 100vw, 1024px";
    }
    if (imageModalCloseTimer) window.clearTimeout(imageModalCloseTimer);
    if (imageModalOpenFrame) window.cancelAnimationFrame(imageModalOpenFrame);
    if (imageModal) {
      imageModal.dataset.open = "false";
      imageModal.dataset.phase = "opening";
      imageModal.setAttribute("aria-hidden", "false");
      imageModal.removeAttribute("inert");
      imageModalOpenFrame = window.requestAnimationFrame(() => {
        imageModalOpenFrame = window.requestAnimationFrame(() => {
          if (!imageModal) return;
          imageModal.dataset.open = "true";
          imageModal.dataset.phase = "open";
        });
      });
    }
    overlayLocks.image = true;
    syncBodyScrollLock();
    imageModal?.querySelector<HTMLButtonElement>("button")?.focus();
  });
});

imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageModal();
});
imageModal?.addEventListener("keydown", (event) => trapDialogFocus(event, imageModal));
document.querySelector("[data-image-modal-close]")?.addEventListener("click", closeImageModal);
if (document.readyState === "complete") {
  scheduleModalImagePreloads();
} else {
  window.addEventListener("load", scheduleModalImagePreloads, { once: true });
}

const videoModal = document.querySelector<HTMLElement>("[data-video-modal]");
const videoFrame = document.querySelector<HTMLIFrameElement>("[data-video-frame]");
let lastVideoTrigger: HTMLElement | null = null;

const closeVideoModal = () => {
  videoModal?.classList.add("hidden");
  videoModal?.classList.remove("flex");
  videoModal?.setAttribute("aria-hidden", "true");
  videoModal?.setAttribute("inert", "");
  if (videoFrame instanceof HTMLIFrameElement) videoFrame.src = "";
  overlayLocks.video = false;
  syncBodyScrollLock();
  lastVideoTrigger?.focus?.();
};

document.querySelectorAll<HTMLElement>("[data-youtube-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    lastVideoTrigger = trigger;
    const id = trigger.dataset.videoId;
    if (videoFrame instanceof HTMLIFrameElement && id) {
      videoFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1`;
    }
    videoModal?.classList.remove("hidden");
    videoModal?.classList.add("flex");
    videoModal?.setAttribute("aria-hidden", "false");
    videoModal?.removeAttribute("inert");
    overlayLocks.video = true;
    syncBodyScrollLock();
    videoModal?.querySelector<HTMLButtonElement>("button")?.focus();
  });
});
videoModal?.addEventListener("click", (event) => {
  if (event.target === videoModal) closeVideoModal();
});
videoModal?.addEventListener("keydown", (event) => trapDialogFocus(event, videoModal));
document.querySelector("[data-video-modal-close]")?.addEventListener("click", closeVideoModal);

const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
const menuToggle = document.querySelector<HTMLElement>("[data-menu-toggle]");
const openIcon = document.querySelector("[data-menu-open-icon]");
const closeIcon = document.querySelector("[data-menu-close-icon]");
let menuCloseTimer: number | null = null;

const setMenu = (open: boolean) => {
  if (menu) {
    if (menuCloseTimer) window.clearTimeout(menuCloseTimer);
    menu.dataset.open = String(open);
    menu.dataset.phase = open ? "open" : "closing";
    menu.setAttribute("aria-hidden", String(!open));
    if (open) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "");
      menuCloseTimer = window.setTimeout(() => {
        if (menu.dataset.open !== "true") menu.dataset.phase = "closed";
      }, 340);
    }
  }
  overlayLocks.menu = open;
  syncBodyScrollLock();
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close full-screen menu" : "Open full-screen menu");
  openIcon?.classList.toggle("hidden", open);
  closeIcon?.classList.toggle("hidden", !open);
};

menuToggle?.addEventListener("click", () => setMenu(menu?.dataset.open !== "true"));
document.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));

let lastScrollY = window.scrollY;
let directionAnchorY = window.scrollY;
let scrollDirection: "down" | "up" | null = null;
let scrollFrame: number | null = null;
let headerVisible = true;
const mobileHeader = document.querySelector("[data-mobile-header]");

const setHeaderVisible = (visible: boolean) => {
  headerVisible = visible;
  mobileHeader?.classList.toggle("mobile-header-hidden", !visible);
  mobileHeader?.classList.toggle("pointer-events-none", !visible);
};

const resetScrollTracking = () => {
  lastScrollY = window.scrollY;
  directionAnchorY = window.scrollY;
  scrollDirection = null;
};

window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame !== null) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      if (window.matchMedia("(min-width: 1024px)").matches || menu?.dataset.open === "true" || imageModal?.dataset.phase === "open" || imageModal?.dataset.phase === "opening") {
        resetScrollTracking();
        return;
      }

      const minDelta = 3;
      const topRevealOffset = 32;
      const hideStartOffset = 88;
      const toggleAfter = 48;
      const current = window.scrollY;
      const delta = current - lastScrollY;
      lastScrollY = current;
      if (Math.abs(delta) < minDelta) return;

      if (current <= topRevealOffset) {
        directionAnchorY = current;
        scrollDirection = null;
        setHeaderVisible(true);
        return;
      }

      const direction = delta > 0 ? "down" : "up";
      if (scrollDirection !== direction) {
        scrollDirection = direction;
        directionAnchorY = current;
      }

      const travelSinceDirectionChange = Math.abs(current - directionAnchorY);

      if (direction === "down" && headerVisible && current >= hideStartOffset && travelSinceDirectionChange >= toggleAfter) {
        directionAnchorY = current;
        setHeaderVisible(false);
      }

      if (direction === "up" && !headerVisible && travelSinceDirectionChange >= toggleAfter) {
        directionAnchorY = current;
        setHeaderVisible(true);
      }
    });
  },
  { passive: true },
);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageModal();
    closeVideoModal();
    setMenu(false);
  }
});
