"use client";

import { useEffect, useRef } from "react";

/**
 * One video element, one src, paused while off-screen.
 * The element is not recreated on scroll or on parent renders.
 */
export default function StableVideo({
  src,
  sources,
  poster,
  className,
  preload = "metadata",
}: {
  src?: string;
  sources?: { src: string; type?: string; media?: string }[];
  poster?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const sourceKey = sources?.map((item) => item.src).join("|") || src || "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.setAttribute("fetchpriority", "low");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }
    const play = () => {
      const pending = el.play();
      if (pending) pending.catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else el.pause();
      },
      { rootMargin: "200px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sourceKey]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload={preload}
      {...{ fetchpriority: "low" }}
    >
      {sources?.map((item) => (
        <source key={`${item.media || ""}-${item.src}`} src={item.src} type={item.type || "video/mp4"} media={item.media} />
      ))}
      {src ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
