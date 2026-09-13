import React from 'react';

export default function PreviewLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3">
        <div className="w-32 h-6 rounded-full bg-secondary mx-auto" />
        <div className="w-72 h-10 rounded-lg bg-secondary mx-auto" />
        <div className="w-96 max-w-full h-4 rounded bg-secondary/60 mx-auto" />
      </div>

      {/* Calculator Input Form Skeleton */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/60 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-14 rounded-lg bg-secondary/60" />
          <div className="h-14 rounded-lg bg-secondary/60" />
        </div>
        <div className="w-48 h-10 rounded-lg bg-secondary mx-auto" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border bg-card/60 space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-secondary mx-auto" />
            <div className="w-32 h-5 rounded bg-secondary mx-auto" />
            <div className="w-full h-20 rounded bg-secondary/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
