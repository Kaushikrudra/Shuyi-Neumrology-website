import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <Card className="p-8 sm:p-12 border-primary/20 bg-card/90 shadow-2xl relative overflow-hidden backdrop-blur-xs">
          {/* Subtle Background Radial Glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center mx-auto text-3xl shadow-inner">
              ✨
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                Error 404
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Realm Beyond the Numbers
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto font-sans pt-1">
                The coordinates or frequency you are seeking does not exist or
                has dissolved into the ether. Perhaps your path lies elsewhere
                in the sanctuary.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full">
                  Return to Sanctuary
                </Button>
              </Link>
              <Link href="/preview" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full">
                  Calculate Blueprint
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <p className="text-xs text-muted-foreground">
          Need assistance? Explore our{' '}
          <Link href="/faq" className="text-foreground hover:underline font-medium">
            FAQ & Methodology
          </Link>{' '}
          or return to the{' '}
          <Link href="/" className="text-foreground hover:underline font-medium">
            Homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
