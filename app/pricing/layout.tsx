import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership & Pricing Tiers',
  description:
    'Choose your path with transparent Shuyi membership tiers. Unlock complete 78-card tarot spreads, deep destiny vibration analysis, and lifetime archetypal reports.',
  openGraph: {
    title: 'Membership & Pricing Tiers | Shuyi',
    description:
      'Choose your path with transparent Shuyi membership tiers. Free, Mystic Seeker, and Celestial Master tiers.',
    images: ['/hero-poster.webp'],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
