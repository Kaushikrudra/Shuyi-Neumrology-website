'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

interface PricingTier {
  id: 'free' | 'premium' | 'lifetime';
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export default function PricingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Current user plan state (defaults to 'free')
  const [currentPlan, setCurrentPlan] = useState<'free' | 'premium' | 'lifetime'>('free');
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync current plan from database & session
  useEffect(() => {
    if (session?.user) {
      const userPlan = ((session.user as any).plan as 'free' | 'premium' | 'lifetime') || 'free';
      setCurrentPlan(userPlan);

      // Fetch fresh plan from API to ensure sync
      fetch('/api/user/upgrade')
        .then((res) => res.json())
        .then((data) => {
          if (data?.user?.plan) {
            setCurrentPlan(data.user.plan);
          }
        })
        .catch(() => {});
    }
  }, [session]);

  const tiers: PricingTier[] = [
    {
      id: 'free',
      name: 'Free Seeker',
      price: '₹0',
      period: 'forever',
      description: 'Essential Pythagorean calculations and introductory archetype interpretations.',
      features: [
        'Full Pythagorean Life Path calculation',
        'Baseline archetype vibration readings',
        'Local-first privacy (0 server data retained)',
        'Standard mobile & desktop web interface',
      ],
      ctaText: currentPlan === 'free' ? 'Current Plan' : 'Select Free',
      isPopular: false,
    },
    {
      id: 'premium',
      name: 'Mystic Seeker',
      badge: '✨ Most Popular',
      price: '₹199',
      period: 'per month',
      description: 'Comprehensive vibrational blueprints, complete tarot archetypes, and saved history.',
      features: [
        'Everything in Free Seeker',
        'Complete 78-Card Tarot spread interpretations',
        'Expression (Destiny) & Soul Urge deep analysis',
        'Save & view reading history on dashboard',
        'Priority vibrational harmony insights',
        'Serene, distraction-free reading experience',
      ],
      ctaText: currentPlan === 'premium' ? 'Current Plan' : 'Upgrade to Premium',
      isPopular: true,
    },
    {
      id: 'lifetime',
      name: 'Celestial Master',
      badge: '👑 VIP Lifetime',
      price: '₹999',
      period: 'one-time payment',
      description: 'Complete lifetime access to all present and future calculation engines and exports.',
      features: [
        'Everything in Mystic Seeker',
        'Lifetime unlimited access (Zero recurring fees)',
        'Master Numbers (11, 22, 33) advanced synthesis',
        'Export personalized PDF blueprint reports',
        'Early access to future phases & features',
        'Dedicated Celestial Master profile badge',
      ],
      ctaText: currentPlan === 'lifetime' ? 'Current Plan' : 'Get Lifetime Access',
      isPopular: false,
    },
  ];

  const handleTierClick = (tier: PricingTier) => {
    // If not authenticated, redirect to login
    if (status === 'unauthenticated' || !session?.user) {
      router.push('/login?callbackUrl=/pricing');
      return;
    }

    // If clicking current plan, do nothing
    if (currentPlan === tier.id) {
      return;
    }

    setSelectedTier(tier);
    setUpgradeSuccess(null);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedTier) return;

    setIsUpgrading(true);
    setErrorMsg(null);

    try {
      // Thoughtful simulated processing delay (1.2s)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await fetch('/api/user/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedTier.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upgrade plan.');
      }

      // Update local state and session
      setCurrentPlan(selectedTier.id);
      await update({ plan: selectedTier.id });
      setUpgradeSuccess(`🎉 Congratulations! You have successfully upgraded to ${selectedTier.name}.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during upgrade. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span>Membership & Vibrational Tiers • Phase 5</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Choose Your Path to Deeper Archetypal Wisdom
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Unlock advanced vibrational calculations, tarot archetypes, and permanent blueprint records
          with flexible and transparent tiers.
        </p>

        {/* Logged in User Status Badge */}
        {session?.user && (
          <div className="pt-2 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Current Status:</span>
            <span className="capitalize px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
              {currentPlan} Member
            </span>
          </div>
        )}
      </section>

      {/* 3-Tier Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          const isCurrent = currentPlan === tier.id;

          return (
            <div key={tier.id} className="flex flex-col relative">
              {/* Most Popular Highlight Glow Banner */}
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <Card
                className={`flex-1 flex flex-col justify-between p-6 sm:p-8 transition-all duration-200 ${
                  tier.isPopular
                    ? 'border-2 border-purple-500/80 shadow-lg bg-card/95 relative'
                    : 'border border-border/80 bg-card/80 hover:shadow-md'
                }`}
              >
                <div>
                  <CardHeader className="p-0 pb-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-serif">{tier.name}</CardTitle>
                      {tier.badge && !tier.isPopular && (
                        <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-xs leading-relaxed min-h-[36px]">
                      {tier.description}
                    </CardDescription>

                    {/* Price Block */}
                    <div className="pt-4 pb-2 border-b border-border/60">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
                          {tier.price}
                        </span>
                        <span className="text-xs text-muted-foreground font-sans">
                          / {tier.period}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Features List */}
                  <CardContent className="p-0 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Included Vibrations & Perks:
                    </p>
                    <ul className="space-y-2.5 text-sm text-foreground/90">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-primary font-bold text-sm select-none">✓</span>
                          <span className="leading-snug text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-border/50">
                  <Button
                    onClick={() => handleTierClick(tier)}
                    variant={tier.isPopular ? 'primary' : 'outline'}
                    size="lg"
                    disabled={isCurrent}
                    className={`w-full font-medium ${
                      isCurrent
                        ? 'opacity-60 cursor-default bg-secondary text-secondary-foreground border-border'
                        : tier.isPopular
                        ? 'shadow-md shadow-purple-500/10'
                        : ''
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : tier.ctaText}
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* FAQ & Transparency Note */}
      <section className="max-w-3xl mx-auto rounded-2xl border border-border bg-card/60 p-6 sm:p-8 text-center space-y-4">
        <h3 className="font-serif text-lg font-bold text-foreground">
          Simulated Experience & Zero Risk Guarantee
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Shuyi is an independent portfolio project. All membership upgrades in this phase are fully
          simulated and do not require real payment details or recurring billing. Enjoy exploring all
          archetypal features freely!
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link href="/preview">
            <Button variant="outline" size="sm" className="px-5">
              Explore Calculator
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="secondary" size="sm" className="px-5">
              Read Methodology
            </Button>
          </Link>
        </div>
      </section>

      {/* Upgrade Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isUpgrading) {
            setIsModalOpen(false);
            setUpgradeSuccess(null);
            setErrorMsg(null);
          }
        }}
        title={upgradeSuccess ? 'Upgrade Complete' : `Upgrade to ${selectedTier?.name}`}
        description={
          upgradeSuccess
            ? 'Your vibrational membership has been updated successfully.'
            : `Confirm your subscription to the ${selectedTier?.name} tier.`
        }
      >
        {upgradeSuccess ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl mx-auto">
              ✨
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">{upgradeSuccess}</p>
              <p className="text-xs text-muted-foreground">
                Your dashboard and calculation permissions have been unlocked immediately.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto px-6">
                  Go to Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-6"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Plan Summary Box */}
            <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Selected Tier:
                </span>
                <span className="font-serif font-bold text-foreground text-base">
                  {selectedTier?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Pricing:</span>
                <span className="text-sm font-semibold text-primary">
                  {selectedTier?.price} / {selectedTier?.period}
                </span>
              </div>
            </div>

            {/* Test Mode Note */}
            <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3 text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-purple-500 text-sm">🔒</span>
              <span>
                <strong>Simulated Checkout:</strong> No real payment card is charged. This action
                will immediately update your membership status in your profile database.
              </span>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                disabled={isUpgrading}
                onClick={() => setIsModalOpen(false)}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                isLoading={isUpgrading}
                disabled={isUpgrading}
                onClick={handleConfirmUpgrade}
                className="px-6 shadow-sm"
              >
                {isUpgrading ? 'Processing Upgrade...' : `Confirm & Activate (${selectedTier?.price})`}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
