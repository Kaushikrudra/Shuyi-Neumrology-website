'use client';

import React, { useEffect, useState } from 'react';
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
  const [userPlan, setUserPlan] = useState<'free' | 'premium' | 'lifetime'>('free');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch latest plan from server
  useEffect(() => {
    if (session?.user) {
      const sessionPlan = ((session.user as any).plan as 'free' | 'premium' | 'lifetime') || 'free';
      setUserPlan(sessionPlan);

      fetch('/api/user/upgrade')
        .then((res) => res.json())
        .then((data) => {
          if (data?.user?.plan) {
            setUserPlan(data.user.plan);
          }
        })
        .catch(() => {});
    }
  }, [session]);

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

  // Plan badge renderer
  const renderPlanBadge = () => {
    switch (userPlan) {
      case 'lifetime':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/30">
            <span>👑</span>
            <span>Lifetime VIP Member</span>
          </span>
        );
      case 'premium':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-500 border border-purple-500/30">
            <span>✨</span>
            <span>Mystic Premium Member</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border">
            <span>🌱</span>
            <span>Free Seeker Plan</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* Welcome Banner */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/70 pb-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Session</span>
            </div>
            {renderPlanBadge()}
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
          <CardContent className="p-0 pt-2 border-t border-border/50 space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between items-center py-1">
              <span>Membership Tier:</span>
              <span className="font-semibold capitalize text-foreground">{userPlan}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Auth Method:</span>
              <span className="font-semibold text-foreground">Credentials (Local)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Account Status:</span>
              <span className="text-emerald-500 font-semibold">Active</span>
            </div>

            {/* Upgrade CTA if on Free Plan */}
            {userPlan === 'free' ? (
              <div className="pt-3 border-t border-border/40">
                <Link href="/pricing" className="w-full">
                  <Button variant="primary" size="sm" className="w-full shadow-xs">
                    ⚡ Upgrade Membership
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-border/40">
                <Link href="/pricing" className="w-full">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View All Plans
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Shortcuts & Membership Highlights */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 border-border/80 bg-card/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase text-primary">
                  Membership Perks
                </span>
                {renderPlanBadge()}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                {userPlan === 'lifetime'
                  ? 'All Celestial Master Features Unlocked'
                  : userPlan === 'premium'
                  ? 'Mystic Seeker Features Active'
                  : 'Free Seeker Baseline Mode'}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {userPlan === 'lifetime'
                  ? 'You have permanent lifetime access to Pythagorean reductions, full 78-card tarot archetypes, and unlimited reports.'
                  : userPlan === 'premium'
                  ? 'Your monthly membership includes comprehensive 78-card tarot archetypes, destiny vibrations, and saved readings.'
                  : 'Compute Pythagorean Life Path vibrations with local privacy. Upgrade anytime to unlock comprehensive 78-card tarot spreads and saved history.'}
              </p>
            </div>

            <div className="pt-5 flex flex-wrap items-center gap-3">
              <Link href="/preview">
                <Button variant="primary" size="sm" className="px-5">
                  Launch Calculator &rarr;
                </Button>
              </Link>
              {userPlan === 'free' && (
                <Link href="/pricing">
                  <Button variant="secondary" size="sm" className="px-4">
                    Explore Pricing & Tiers
                  </Button>
                </Link>
              )}
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
          <span className="text-xs font-mono text-muted-foreground">
            {userPlan === 'free' ? 'Unlock with Premium' : 'Active Feature'}
          </span>
        </div>

        <Card className="p-8 sm:p-12 text-center border-dashed border-border/80 bg-card/40 space-y-3">
          <div className="text-3xl">📜</div>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            No Saved Previews Yet
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            {userPlan === 'free'
              ? 'Save your calculated vibrational blueprints and daily card draws across sessions by upgrading to a Premium plan.'
              : 'You have not saved any readings yet. Launch the calculator to record your first archetypal blueprint!'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/preview">
              <Button variant="primary" size="md" className="px-6">
                Calculate Your First Blueprint
              </Button>
            </Link>
            {userPlan === 'free' && (
              <Link href="/pricing">
                <Button variant="outline" size="md" className="px-6">
                  Upgrade Plan
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
