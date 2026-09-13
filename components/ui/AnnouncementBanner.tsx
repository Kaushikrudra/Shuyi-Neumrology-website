'use client';

import React, { useState, useEffect } from 'react';

export interface AnnouncementBannerProps {
  banner?: {
    id: string;
    title: string;
    message: string;
  } | null;
}

export function AnnouncementBanner({ banner }: AnnouncementBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (banner?.id) {
      const dismissedId = sessionStorage.getItem('dismissed_banner_id');
      if (dismissedId === banner.id) {
        setIsDismissed(true);
      }
    }
  }, [banner?.id]);

  if (!banner || !mounted || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    if (banner?.id) {
      try {
        sessionStorage.setItem('dismissed_banner_id', banner.id);
      } catch (e) {}
    }
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative z-30 w-full bg-gradient-to-r from-purple-900/90 via-indigo-950/90 to-purple-950/90 text-purple-100 border-b border-purple-500/30 px-4 py-2.5 sm:py-3 transition-all duration-300 animate-in fade-in slide-in-from-top-1"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-3 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/25 text-purple-200 border border-purple-400/40 uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            {banner.title}
          </span>
          <span className="font-medium text-purple-100/95 leading-normal">
            {banner.message}
          </span>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1.5 rounded-md text-purple-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 focus:outline-none focus:ring-1 focus:ring-purple-400"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
