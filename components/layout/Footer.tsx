import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-background py-8 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
        <p>© {new Date().getFullYear()} Shuyi. Personal / Portfolio Project.</p>
        <p>Phase 2: Foundation & Public Experience</p>
      </div>
    </footer>
  );
}
