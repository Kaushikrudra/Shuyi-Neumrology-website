import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-6 text-center space-y-4">
      {/* Animated Astrolabe Ring Spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-25" />
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="absolute text-sm">✨</span>
      </div>
      <div className="space-y-1">
        <p className="font-serif text-lg font-semibold text-foreground tracking-wide">
          Harmonizing Vibrations...
        </p>
        <p className="text-xs text-muted-foreground font-sans">
          Aligning sacred geometric frequencies
        </p>
      </div>
    </div>
  );
}
