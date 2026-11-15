"use client";

import { useEffect, useRef } from "react";

/**
 * One video element, one src, paused while off-screen.
 * The element is not recreated on scroll or on parent renders.
 */
export default function StableVideo({
  src,
  poster,
  className,
  eager = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const play = () => {
      const pending = el.play();
      if (pending) pending.catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else el.pause();
      },
      { rootMargin: eager ? "0px" : "200px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
    />
  );
}
