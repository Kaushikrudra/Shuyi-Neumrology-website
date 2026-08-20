'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="inline-block animate-spin text-3xl">✨</div>
        <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const userName = session.user.name || 'Seeker';
  const userEmail = session.user.email || '';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* Welcome Banner */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/70 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Authenticated Session</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Welcome, {userName} ✨
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your personal hub for calculated numerology blueprints and archetype records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/preview">
            <Button variant="primary" size="md" className="px-5 shadow-sm">
              + New Reading Preview
            </Button>
          </Link>
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant="outline"
            size="md"
            className="px-4"
          >
            Log Out
          </Button>
        </div>
      </section>

      {/* Main Grid: User Profile Card & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 md:col-span-1 border-border/80 bg-card space-y-4 shadow-sm">
          <CardHeader className="p-0 pb-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-serif font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <CardTitle className="text-xl font-serif pt-2">{userName}</CardTitle>
            <CardDescription className="text-xs break-all">{userEmail}</CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-2 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between py-1">
              <span>Account Type:</span>
              <span className="font-semibold text-foreground">Free Seeker</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Auth Method:</span>
              <span className="font-semibold text-foreground">Credentials (Local)</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Status:</span>
              <span className="text-emerald-500 font-semibold">Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Shortcuts & Highlights */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 border-border/80 bg-card/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase text-primary">Quick Navigation</span>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Explore The Calculation Engine
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Compute your Pythagorean Life Path, Destiny Expression, and Soul Urge numbers with local-first calculation and zero server data retention.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-3">
              <Link href="/preview">
                <Button variant="primary" size="sm" className="px-5">
                  Launch Calculator &rarr;
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="sm" className="px-4">
                  View Methodology
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Preview History Placeholder Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
            Saved Preview History
          </h2>
          <span className="text-xs font-mono text-muted-foreground">Phase 4 Shell</span>
        </div>

        <Card className="p-8 sm:p-12 text-center border-dashed border-border/80 bg-card/40 space-y-3">
          <div className="text-3xl">📜</div>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            No Saved Previews Yet
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            You haven&apos;t saved any numerology readings yet. Use the interactive calculator to generate your first vibrational blueprint!
          </p>
          <div className="pt-2">
            <Link href="/preview">
              <Button variant="primary" size="md" className="px-6">
                Calculate Your First Blueprint
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
