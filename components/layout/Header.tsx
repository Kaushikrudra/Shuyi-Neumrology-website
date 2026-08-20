'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Preview', href: '/preview' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="w-full border-b border-border/60 bg-background/90 backdrop-blur-sm sticky top-0 z-50 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo / Title */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-2xl font-serif font-bold tracking-tight text-foreground hover:opacity-85 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-xl">✨</span>
            <span>Shuyi</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered / Spaced */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-150 relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-primary after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right actions: ThemeToggle & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
