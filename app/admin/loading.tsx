import React from 'react';

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Top Header Skeleton */}
      <div className="border-b border-border/70 pb-6 space-y-3">
        <div className="w-24 h-5 rounded-full bg-secondary/80" />
        <div className="w-64 h-8 rounded-lg bg-secondary" />
        <div className="w-96 max-w-full h-4 rounded bg-secondary/60" />
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-border bg-card/60 space-y-3"
          >
            <div className="w-20 h-4 rounded bg-secondary" />
            <div className="w-16 h-8 rounded bg-secondary/80" />
            <div className="w-32 h-3 rounded bg-secondary/50" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="rounded-xl border border-border bg-card/60 p-6 space-y-4">
        <div className="w-48 h-6 rounded bg-secondary" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-full h-12 rounded-lg bg-secondary/40"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
