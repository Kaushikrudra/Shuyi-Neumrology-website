import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'FAQ | Shuyi Numerology & Tarot',
  description:
    'Frequently asked questions about numerology calculations, tarot symbolism, and how the Shuyi platform works.',
};

export default function FAQPage() {
  const faqItems = [
    {
      id: 'faq-1',
      question: 'How do the Numerology calculations work?',
      answer:
        'Shuyi utilizes standard Pythagorean numerological reduction. For birth dates, numbers are summed across day, month, and year until reduced to a single digit (1–9) or preserved as master numbers (11, 22, 33). For names, letters are mapped to their traditional numeric vibration values.',
    },
    {
      id: 'faq-2',
      question: 'What is the difference between Life Path, Destiny, and Soul Urge?',
      answer:
        'Your Life Path number reflects your core life journey and primary lessons derived from your birth date. The Destiny (Expression) number reveals your natural talents based on all letters of your full name. The Soul Urge (Heart’s Desire) number is calculated from vowels, uncovering subconscious motivations.',
    },
    {
      id: 'faq-3',
      question: 'How are Tarot cards drawn in the preview tool?',
      answer:
        'Tarot draws are based on the traditional 78-card archetypes (Major and Minor Arcana). The preview tool randomly draws archetypal symbols accompanied by upright and reversed contemplative interpretations.',
    },
    {
      id: 'faq-4',
      question: 'Is my personal birth date and name data stored on any server?',
      answer:
        'No. In this Phase 2 foundation, all calculations and preview features are strictly client-side. Your inputs stay entirely within your browser session and are not transmitted to any external server or database.',
    },
    {
      id: 'faq-5',
      question: 'How does the Light / Dark mode theme preference work?',
      answer:
        'The theme toggle in the header adapts to your preference using Tailwind CSS class-based switching. Your chosen mode is saved in localStorage and persists across page reloads. If no preference is selected, it defaults to your operating system’s theme.',
    },
    {
      id: 'faq-6',
      question: 'What features are planned for future phases?',
      answer:
        'Phase 3 will introduce interactive calculation tools for Life Path and Tarot card spreads. Phase 4 will introduce detailed PDF/printable reports, and Phase 5 will add advanced compatibility algorithms.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Page Header */}
      <section className="space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
          Help & Clarifications
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Find clear answers to common questions regarding numerological reductions, tarot
          archetypes, and how to use the preview tools.
        </p>
      </section>

      {/* Accordion FAQ Section */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground pb-2">
          General & Methodology
        </h2>

        <Accordion type="single" defaultValue="faq-1">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Support / Next Steps Box */}
      <section>
        <Card className="p-6 sm:p-10 text-center space-y-4 border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl sm:text-2xl font-serif">Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              Want to learn more about the philosophy behind Shuyi or start exploring the
              previews?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-8">
                  Back to Home
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  Read About Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
