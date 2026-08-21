import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { NumerologyHeroAnimation } from '@/components/ui/NumerologyHeroAnimation';
import { HeroBackgroundVideo } from '@/components/ui/HeroBackgroundVideo';

export const metadata: Metadata = {
  title: 'Shuyi | Numerology & Tarot Exploration',
  description:
    'Discover ancient wisdom through modern numerology calculations, tarot archetypes, and personalized intuitive previews.',
};

export default function HomePage() {
  const features = [
    {
      icon: '🔢',
      title: 'Life Path Numerology',
      description:
        'Uncover foundational energy patterns and core life lessons derived from your birth date vibrations.',
    },
    {
      icon: '🃏',
      title: 'Tarot Archetypes',
      description:
        'Draw intuitive symbolic cards designed to offer clarity, daily reflection, and perspective on current themes.',
    },
    {
      icon: '✨',
      title: 'Destiny & Soul Urge',
      description:
        'Explore your name-based vibrational numbers to align with your inner passions and subconscious drives.',
    },
    {
      icon: '📊',
      title: 'Personalized Insights',
      description:
        'Receive cleanly organized profile summaries designed for intuitive understanding and self-reflection.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section: Full-Bleed Edge-to-Edge with Smooth Video Background */}
      <section className="dark relative w-full overflow-hidden bg-[#09090b] text-foreground">
        {/* Background Video Layer with Smooth Reload Transition */}
        <HeroBackgroundVideo />

        {/* Foreground Content: Contained for readability & layout symmetry */}
        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-10 sm:py-14 lg:py-18 xl:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* LEFT COLUMN: Editorial Typography & CTAs (58% width on desktop) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Subtle decorative tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/80 shadow-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ancient Wisdom • Modern Precision</span>
              </div>

              {/* Large Serif Headline (2 Lines with Gradient Accent) */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-foreground leading-[1.12] text-balance">
                  Unlock the Wisdom of{' '}
                  <span className="font-bold italic bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent block mt-1 sm:mt-2">
                    Numerology & Tarot
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance pt-2 font-sans font-normal">
                  Explore personal life paths, archetype symbolism, and interactive spiritual
                  insights with modern analytical precision and timeless design.
                </p>
              </div>

              {/* Left-Aligned CTAs with matching width divider */}
              <div className="w-fit max-w-full space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link href="/preview" prefetch={true} className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto shadow-md font-medium tracking-wide text-base px-8 py-3.5"
                    >
                      Start Free Reading Preview
                    </Button>
                  </Link>
                  <Link href="/faq" prefetch={true} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto font-medium text-base px-8 py-3.5"
                    >
                      How It Works
                    </Button>
                  </Link>
                </div>
                {/* Divider Line extending only to the right edge of buttons */}
                <div className="border-t border-border/50" />
              </div>

              {/* Subtle Feature Badges Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="text-primary font-bold">✓</span> Pythagorean Reductions
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-primary font-bold">✓</span> 78 Tarot Archetypes
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-primary font-bold">✓</span> Client-Side Privacy
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Celestial Astrolabe & Numerology Wheel Visual (42% width on desktop) */}
            <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
              <NumerologyHeroAnimation />
            </div>
          </div>

          {/* 3-Badge Archetype Preview Container */}
          <div className="pt-10 sm:pt-14 w-full">
            <div className="relative mx-auto w-full rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xs p-6 sm:p-8 shadow-lg">
              <div className="text-center pb-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Live Archetype Preview Engine
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <div className="rounded-xl border border-border/70 bg-background/60 p-5 sm:p-6 text-center space-y-2 transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="text-3xl">🌍</span>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Life Path
                  </p>
                  <p className="text-2xl font-serif font-bold text-foreground">7 • Seeker</p>
                  <p className="text-xs text-muted-foreground">Wisdom, Truth & Intuition</p>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/60 p-5 sm:p-6 text-center space-y-2 transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="text-3xl">🔮</span>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Daily Draw
                  </p>
                  <p className="text-2xl font-serif font-bold text-foreground">The Star</p>
                  <p className="text-xs text-muted-foreground">Hope, Inspiration & Serenity</p>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/60 p-5 sm:p-6 text-center space-y-2 transition-transform duration-200 hover:-translate-y-0.5">
                  <span className="text-3xl">⚡</span>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Soul Urge
                  </p>
                  <p className="text-2xl font-serif font-bold text-foreground">11 • Master</p>
                  <p className="text-xs text-muted-foreground">Illumination & Insight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections (Contained Layout) */}
      <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-14 sm:py-20 space-y-16 sm:space-y-24">
        {/* Features Section */}
        <section className="space-y-10 w-full">
          <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Designed for Intuitive Self-Discovery
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-sans">
              A harmonious blend of ancient numerology frameworks and reflective tarot symbolism.
            </p>
          </div>

          {/* Responsive Grid: 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} hoverEffect className="flex flex-col justify-between">
                <CardHeader>
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <CardTitle className="text-lg font-serif">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed font-sans">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <span className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1 cursor-pointer">
                    Learn more &rarr;
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom CTA Band */}
        <section className="w-full">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-14 text-center space-y-6 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Ready to Explore Your Archetypal Blueprint?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-sans">
                Experience the clarity of calculated numerology and symbolic tarot archetypes in
                our preview tool.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/preview" prefetch={true} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-3.5">
                  Explore Shuyi Preview
                </Button>
              </Link>
              <Link href="/faq" prefetch={true} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 py-3.5">
                  Read FAQs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
