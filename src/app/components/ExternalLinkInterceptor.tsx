"use client";

import { useEffect } from "react";

const BYPASS_ATTR = "data-bypass-external-interstitial";

function shouldBypass(anchor: HTMLAnchorElement) {
  return (
    anchor.hasAttribute("download") ||
    anchor.hasAttribute(BYPASS_ATTR) ||
    anchor.getAttribute("href")?.startsWith("#") === true
  );
}

function isExternalHttpUrl(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href, window.location.href);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.origin !== window.location.origin
    );
  } catch {
    return false;
  }
}

export default function ExternalLinkInterceptor() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (shouldBypass(anchor) || !isExternalHttpUrl(anchor)) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const interstitialUrl = new URL("/leaving", window.location.origin);
      interstitialUrl.searchParams.set("to", destination.toString());
      interstitialUrl.searchParams.set(
        "from",
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      );

      const openInNewTab =
        anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey;

      event.preventDefault();
      event.stopPropagation();

      if (openInNewTab) {
        const nextWindow = window.open(
          interstitialUrl.toString(),
          "_blank",
          "noopener,noreferrer"
        );

        if (nextWindow) {
          nextWindow.opener = null;
          return;
        }
      }

      window.location.assign(interstitialUrl.toString());
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
