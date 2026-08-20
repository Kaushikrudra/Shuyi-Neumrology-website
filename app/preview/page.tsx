'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import {
  calculateFullProfile,
  NumerologyResult,
} from '@/lib/numerology';

export default function PreviewPage() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors] = useState<{ name?: string; dob?: string }>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStep, setCalculationStep] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);

  const validate = () => {
    const newErrors: { name?: string; dob?: string } = {};

    if (!fullName.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (!/[a-zA-Z]/.test(fullName)) {
      newErrors.name = 'Name must contain alphabetic characters.';
    }

    if (!dateOfBirth) {
      newErrors.dob = 'Please select your date of birth.';
    } else {
      const parsedDate = new Date(dateOfBirth);
      if (isNaN(parsedDate.getTime())) {
        newErrors.dob = 'Please enter a valid date.';
      } else if (parsedDate > new Date()) {
        newErrors.dob = 'Birth date cannot be in the future.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsCalculating(true);
    setCalculationStep('Calculating Pythagorean reductions...');

    // Thoughtful simulated animation delay
    setTimeout(() => {
      setCalculationStep('Synthesizing archetypal vibrations...');
    }, 450);

    setTimeout(() => {
      const profile = calculateFullProfile(fullName, dateOfBirth);
      setResult(profile);
      setIsCalculating(false);
      setCalculationStep('');
    }, 900);
  };

  const handleReset = () => {
    setResult(null);
    setFullName('');
    setDateOfBirth('');
    setErrors({});
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Header Section */}
      <section className="space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span>Interactive Numerology Preview • Phase 3</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Calculate Your Personal Archetypal Blueprint
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Enter your full name and date of birth to instantly compute your Pythagorean Life Path,
          Destiny Expression, and Soul Urge vibrational numbers with client-side privacy.
        </p>
      </section>

      {/* Main Interactive Form Card */}
      {!result && (
        <section>
          <Card className="p-6 sm:p-10 border border-border/80 bg-card shadow-sm backdrop-blur-xs">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-2xl font-serif">Enter Your Details</CardTitle>
              <CardDescription className="text-sm">
                All calculations run locally in your browser. No personal data is stored or transmitted.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Sophia Elena Vance"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={errors.name}
                    helperText="Include all given names for complete vibration analysis."
                    disabled={isCalculating}
                    autoComplete="name"
                  />

                  <Input
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      if (errors.dob) setErrors((prev) => ({ ...prev, dob: undefined }));
                    }}
                    error={errors.dob}
                    helperText="Used for Pythagorean Life Path journey calculation."
                    disabled={isCalculating}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isCalculating}
                    className="w-full sm:w-auto px-8 py-3.5 font-medium shadow-sm"
                  >
                    {isCalculating ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {calculationStep || 'Calculating...'}
                      </span>
                    ) : (
                      'Reveal Numerology Blueprint'
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    ✓ Pythagorean Reductions &bull; Master Numbers (11, 22, 33) &bull; Zero Server Tracking
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Results Section */}
      {result && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                Calculation Complete
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Blueprint for {fullName.trim()}
              </h2>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              size="md"
              className="px-5 py-2 text-sm font-medium"
            >
              ← Calculate Another
            </Button>
          </div>

          {/* 3 Archetype Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Life Path Number */}
            <Card hoverEffect className="p-6 sm:p-7 flex flex-col justify-between space-y-5 border-border/80">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{result.lifePath.meaning.icon}</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-secondary text-secondary-foreground border border-border">
                    Life Path
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
                      {result.lifePath.number}
                    </span>
                    <span className="font-serif text-xl font-semibold text-primary">
                      &bull; {result.lifePath.meaning.archetype}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground pt-1">
                    {result.lifePath.meaning.title}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs font-semibold text-foreground/80 mb-1">Key Vibrations:</p>
                  <p className="text-xs text-muted-foreground">{result.lifePath.meaning.traits}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {result.lifePath.meaning.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
                <span>Derived from Date of Birth ({dateOfBirth})</span>
              </div>
            </Card>

            {/* 2. Expression / Destiny Number */}
            <Card hoverEffect className="p-6 sm:p-7 flex flex-col justify-between space-y-5 border-border/80">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{result.expression.meaning.icon}</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-secondary text-secondary-foreground border border-border">
                    Destiny
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
                      {result.expression.number}
                    </span>
                    <span className="font-serif text-xl font-semibold text-primary">
                      &bull; {result.expression.meaning.archetype}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground pt-1">
                    {result.expression.meaning.title}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs font-semibold text-foreground/80 mb-1">Key Vibrations:</p>
                  <p className="text-xs text-muted-foreground">{result.expression.meaning.traits}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {result.expression.meaning.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
                <span>Derived from Full Name ({fullName})</span>
              </div>
            </Card>

            {/* 3. Soul Urge Number */}
            <Card hoverEffect className="p-6 sm:p-7 flex flex-col justify-between space-y-5 border-border/80">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{result.soulUrge.meaning.icon}</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-secondary text-secondary-foreground border border-border">
                    Soul Urge
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
                      {result.soulUrge.number}
                    </span>
                    <span className="font-serif text-xl font-semibold text-primary">
                      &bull; {result.soulUrge.meaning.archetype}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground pt-1">
                    {result.soulUrge.meaning.title}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs font-semibold text-foreground/80 mb-1">Key Vibrations:</p>
                  <p className="text-xs text-muted-foreground">{result.soulUrge.meaning.traits}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {result.soulUrge.meaning.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
                <span>Derived from Name Vowels (A, E, I, O, U)</span>
              </div>
            </Card>
          </div>

          {/* Bottom Action / Learn More Band */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Want to learn how these calculations work?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Read our methodology and reduction rules on the FAQ page.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/faq">
                <Button variant="secondary" size="md" className="px-6">
                  Read Methodology
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="md" className="px-6">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
