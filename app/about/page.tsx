import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About | Shuyi Numerology & Tarot',
  description:
    'Learn about the mission, philosophy, and values behind the Shuyi numerology and tarot preview platform.',
};

export default function AboutPage() {
  const whatWeDo = [
    {
      badge: '01',
      title: 'Precision Numerology',
      description:
        'We apply traditional Pythagorean and Chaldean reduction algorithms to transform names and birth dates into structured vibration profiles (Life Path, Destiny, Soul Urge).',
    },
    {
      badge: '02',
      title: 'Tarot as Reflection',
      description:
        'We view Tarot as an archetypal mirror. Each drawn card provides symbolic vocabulary to contemplate daily decisions, emotional states, and personal transitions.',
    },
    {
      badge: '03',
      title: 'Serene User Experience',
      description:
        'We craft quiet, accessible digital interfaces without clutter, noisy advertisements, or sensationalism, letting you focus entirely on your inner exploration.',
    },
  ];

  const values = [
    {
      title: 'Mindful Simplicity',
      text: 'Every calculation, card spread, and UI element is designed to offer clarity rather than cognitive overload.',
    },
    {
      title: 'Respect for Archetypes',
      text: 'We honor the historical roots of symbolic wisdom while making interpretations relevant to contemporary lifestyles.',
    },
    {
      title: 'Privacy by Default',
      text: 'Your personal data, name entries, and readings belong to you. We emphasize local-first, lightweight architecture.',
    },
  ];

  return (
    <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
      {/* Header / Intro Section */}
      <section className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
          About The Project
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Harmonizing Ancient Archetypes with Modern Technology
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Shuyi was conceived as an elegant personal portfolio exploration—a digital space where
          numerological mathematics meets the symbolic beauty of tarot archetypes.
        </p>
      </section>

      {/* Mission & Story Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <Card hoverEffect className="p-6 sm:p-8">
          <CardHeader>
            <div className="text-2xl mb-2">📜</div>
            <CardTitle className="text-xl font-serif">The Mission</CardTitle>
            <CardDescription className="text-base">
              Providing clarity and introspection through structured symbolism.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              In a fast-paced digital world, moments of quiet reflection are rare. Our goal is
              to make introspection intuitive, beautiful, and accessible through thoughtful design.
            </p>
            <p>
              By combining timeless numerological formulas with tarot archetypes, Shuyi offers a
              structured framework for personal insight and conscious living.
            </p>
          </CardContent>
        </Card>

        <Card hoverEffect className="p-6 sm:p-8">
          <CardHeader>
            <div className="text-2xl mb-2">🔭</div>
            <CardTitle className="text-xl font-serif">The Philosophy</CardTitle>
            <CardDescription className="text-base">
              A tools-first approach to personal exploration.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              We believe numerology and tarot are not about deterministic fortune-telling, but
              about archetypal prompts that inspire critical thinking and emotional resonance.
            </p>
            <p>
              Our design language reflects this philosophy: understated typography, balanced
              spacing, and intentional interactions that keep you centered.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* "Kya Karte Hain" / What We Do Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            What We Do
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Core features and foundational systems powering the Shuyi platform.
          </p>
        </div>

        {/* Responsive Grid: 1 col (mobile) -> 2 cols (tablet) -> 3 cols (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whatWeDo.map((item, idx) => (
            <Card key={idx} hoverEffect>
              <CardHeader>
                <span className="text-xs font-mono font-semibold text-primary/70 mb-1 block">
                  MODULE {item.badge}
                </span>
                <CardTitle className="text-lg font-serif">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Guiding Values
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Principles that guide every detail of the interface and calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card/60 p-6 sm:p-8 space-y-2"
            >
              <h3 className="font-serif font-semibold text-foreground text-lg">{val.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center space-y-4 shadow-sm">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Have Questions About Our Methodology?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          Explore our frequently asked questions to learn more about how calculations and card draws are handled.
        </p>
        <div className="pt-2">
          <Link href="/faq">
            <Button variant="primary" size="lg" className="px-8">
              Visit FAQ Page
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
