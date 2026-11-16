"use client";

import { useEffect } from "react";

export default function Rail() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll(".rb-node")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-on", entry.isIntersecting);
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.01 },
    );
    nodes.forEach((node) => observer.observe(node));

    const rider = document.querySelector<HTMLElement>(".rb-rider");
    const journey = document.querySelector<HTMLElement>(".rb-journey");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supports = typeof CSS !== "undefined" && CSS.supports?.("animation-timeline", "scroll()");
    let onScroll: (() => void) | null = null;
    if (rider && journey && (reduce || !supports)) {
      onScroll = () => {
        const rect = journey.getBoundingClientRect();
        const total = journey.offsetHeight - 40;
        const seen = Math.min(Math.max(-rect.top, 0), total);
        rider.style.transform = reduce ? "none" : `translateY(${seen}px)`;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="rb-rail" aria-hidden="true">
      <span className="rb-rider" />
    </div>
  );
}
