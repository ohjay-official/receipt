"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => setVideoFailed(true));
  }, [videoFailed]);

  return (
    <div className="m-hero-media" aria-hidden="true">
      <svg className="m-hero-fallback" viewBox="0 0 320 180" fill="none">
        <rect x="168" y="36" width="112" height="78" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M188 36v-10h72v10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M196 78h56" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M196 114c18 16 36 16 52 0 10 22 8 40-6 48-22 4-48-8-70-6-8-18 4-30 24-42z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M214 150h36" stroke="currentColor" strokeWidth="1.5" />
        <rect x="248" y="158" width="18" height="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {posterFailed ? null : (
        <img
          className="m-hero-still"
          src="/hero/hero-poster.jpg"
          alt=""
          fetchPriority="high"
          onError={() => setPosterFailed(true)}
        />
      )}
      {videoFailed ? null : (
        <video
          ref={videoRef}
          className="m-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/hero-poster.jpg"
          onError={() => setVideoFailed(true)}
        >
          <source src="/hero/hero-loop.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
