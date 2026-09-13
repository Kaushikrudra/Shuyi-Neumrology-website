'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime exception
    console.error('Unhandled application exception:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <Card className="p-8 sm:p-12 border-red-500/20 bg-card shadow-2xl relative overflow-hidden">
          {/* Ambient Error Glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-3xl text-red-500">
              ⚠️
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                Harmonic Interruption
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                An Unexpected Disturbance Occurred
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto font-sans pt-1">
                The application encountered an unexpected state. Our algorithms
                are resilient, and a quick reset will likely restore harmonic
                balance.
              </p>
            </div>

            {error?.digest && (
              <p className="text-[11px] font-mono text-muted-foreground bg-secondary/50 py-1.5 px-3 rounded-md inline-block">
                Digest: {error.digest}
              </p>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => reset()}
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
