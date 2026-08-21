'use client';

import React, { useRef, useState, useEffect } from 'react';

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if video is already ready (e.g. from browser cache on reload)
    if (video.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    const handlePlaying = () => setIsVideoLoaded(true);
    const handleLoadedData = () => setIsVideoLoaded(true);
    const handleCanPlay = () => setIsVideoLoaded(true);

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);

    // Explicitly trigger play to handle fast reload smoothly
    video.play().catch(() => {
      // Graceful fallback for strict autoplay restrictions
    });

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Static Ambient Fallback (Smooth base glow) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-950/40 via-[#09090b] to-indigo-950/40" />

      {/* 2. Video with Smooth Crossfade & Subtle Cinematic Scale Animation */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 z-0 w-full h-full object-cover object-center transform-gpu pointer-events-none transition-all duration-1000 ease-out will-change-transform ${
          isVideoLoaded ? 'opacity-75 scale-100' : 'opacity-0 scale-[1.03]'
        }`}
      >
        <source src="/hero-bg-compressed.mp4" type="video/mp4" />
      </video>

      {/* 3. Dark & Atmospheric Readability Overlays for High Text Contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#09090b]/85 via-[#09090b]/55 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/90 pointer-events-none" />
    </div>
  );
}
