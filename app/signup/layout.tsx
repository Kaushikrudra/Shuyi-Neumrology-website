import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an Account',
  description:
    'Join Shuyi to explore sacred Pythagorean numerology algorithms, archetypal tarot symbolism, and personal introspection.',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
