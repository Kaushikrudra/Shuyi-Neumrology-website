'use client';

import React, { useRef, useState, useEffect } from 'react';

export function HeroBackgroundVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if video is already ready (e.g. from browser cache)
    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
    }

    const handleReady = () => setIsVideoLoaded(true);

    video.addEventListener('playing', handleReady);
    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);

    // Explicitly trigger play to handle fast reload smoothly
    video.play().catch(() => {
      // Graceful fallback for strict autoplay restrictions
    });

    // Pause video when out of viewport to conserve GPU/CPU & eliminate scroll lag
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    // Pause when tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (videoRef.current) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('playing', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* 1. Static Ambient Fallback (Smooth base glow) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-950/40 via-[#09090b] to-indigo-950/40" />

      {/* 2. Instant Lightweight Cosmic Poster Layer (0ms initial paint, zero buffering delay) */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-out ${
          isVideoLoaded ? 'opacity-30' : 'opacity-85'
        }`}
        style={{ backgroundImage: 'url(/hero-poster.webp)' }}
      />

      {/* 3. Hardware-Accelerated Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.webp"
        disablePictureInPicture
        className={`absolute inset-0 z-0 w-full h-full object-cover object-center transform-gpu pointer-events-none transition-opacity duration-1000 ease-out will-change-transform ${
          isVideoLoaded ? 'opacity-75' : 'opacity-0'
        }`}
      >
        <source src="/hero-bg-compressed.mp4" type="video/mp4" />
      </video>

      {/* 4. Atmospheric Readability Overlays for Text Contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#09090b]/85 via-[#09090b]/55 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/90 pointer-events-none" />
    </div>
  );
}
