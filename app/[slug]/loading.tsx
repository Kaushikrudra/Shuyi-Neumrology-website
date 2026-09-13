import React from 'react';

export default function CmsPageLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-background animate-pulse">
      {/* Hero Header Skeleton */}
      <section className="py-16 sm:py-24 border-b border-border/60 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-28 h-6 rounded-full bg-secondary mx-auto" />
          <div className="w-96 max-w-full h-12 rounded-xl bg-secondary mx-auto" />
          <div className="w-48 h-4 rounded bg-secondary/60 mx-auto" />
        </div>
      </section>

      {/* Content Blocks Skeleton */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="space-y-4">
          <div className="w-3/4 h-8 rounded-lg bg-secondary" />
          <div className="w-full h-24 rounded-lg bg-secondary/50" />
        </div>
        <div className="w-full h-64 rounded-2xl bg-secondary/40" />
        <div className="space-y-4">
          <div className="w-2/3 h-8 rounded-lg bg-secondary" />
          <div className="w-full h-20 rounded-lg bg-secondary/50" />
        </div>
      </main>
    </div>
  );
}
