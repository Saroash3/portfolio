"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Adds `data-shown` to every `[data-reveal]` element when it scrolls into view.
 * The hidden state only applies once `html.js` is set (see layout.tsx), so
 * content stays readable when JavaScript is slow or disabled.
 */
export function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;

    if (!("IntersectionObserver" in window)) {
      root.classList.add("reveal-all");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "");
            io.unobserve(entry.target);
          }
        }
      },
      // Trigger slightly before an element enters the viewport, so text is
      // already settled by the time it is read. Plays once.
      { rootMargin: "0px 0px 15% 0px", threshold: 0 },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-shown])")
        .forEach((el) => io.observe(el));
    };
    observeAll();

    // Elements added later (e.g. filtered project cards)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
