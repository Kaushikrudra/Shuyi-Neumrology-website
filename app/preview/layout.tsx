import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Numerology Calculator & Blueprint',
  description:
    'Calculate your personal Life Path, Destiny Expression, and Soul Urge frequencies using verified Pythagorean mathematical algorithms and archetypal synthesis.',
  openGraph: {
    title: 'Interactive Numerology Calculator & Blueprint | Shuyi',
    description:
      'Calculate your personal Life Path, Destiny Expression, and Soul Urge frequencies.',
    images: ['/hero-poster.webp'],
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
