'use client';

import React from 'react';
import Link from 'next/link';
import { CmsBlock } from '@/lib/cms-types';
import { Button } from '@/components/ui/Button';

interface PublicBlockRendererProps {
  blocks: CmsBlock[];
  previewMode?: boolean;
}

export function PublicBlockRenderer({
  blocks,
  previewMode = false,
}: PublicBlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-border rounded-2xl p-8 bg-secondary/20">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3 text-muted-foreground">
          ✨
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          {previewMode
            ? 'No blocks have been added to this page yet. Switch to "Edit" tab to add Text, Image, or CTA blocks.'
            : 'This page currently has no published content.'}
        </p>
      </div>
    );
  }

  // Sort blocks by order just in case
  const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-12 sm:space-y-16">
      {sortedBlocks.map((block, index) => {
        switch (block.type) {
          case 'text': {
            const { heading, body } = block.content || {};
            if (!heading && !body) {
              if (previewMode) {
                return (
                  <div
                    key={block.id || index}
                    className="p-4 rounded-xl border border-dashed border-border/70 text-xs text-muted-foreground italic text-center"
                  >
                    Empty Text Block
                  </div>
                );
              }
              return null;
            }

            return (
              <section
                key={block.id || index}
                className="max-w-3xl mx-auto w-full space-y-4"
              >
                {heading && (
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    {heading}
                  </h2>
                )}
                {body && (
                  <div className="text-muted-foreground text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans space-y-4">
                    {body}
                  </div>
                )}
              </section>
            );
          }

          case 'image': {
            const { imageUrl, altText, caption } = block.content || {};
            if (!imageUrl) {
              if (previewMode) {
                return (
                  <div
                    key={block.id || index}
                    className="p-8 rounded-2xl border border-dashed border-border/70 text-xs text-muted-foreground text-center bg-secondary/10"
                  >
                    Empty Image Block (No URL provided)
                  </div>
                );
              }
              return null;
            }

            return (
              <figure
                key={block.id || index}
                className="max-w-4xl mx-auto w-full my-8 rounded-2xl overflow-hidden border border-border/80 bg-card shadow-md transition-all"
              >
                {/* Image Container with native img fallback for any external/internal URL */}
                <div className="relative w-full bg-secondary/30 flex items-center justify-center min-h-[220px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={altText || 'Page illustration'}
                    className="w-full h-auto max-h-[640px] object-cover"
                    loading="lazy"
                  />
                </div>
                {caption && (
                  <figcaption className="px-5 py-3 text-center text-xs sm:text-sm text-muted-foreground italic border-t border-border/40 bg-card/60">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'cta': {
            const { headline, buttonText, buttonLink } = block.content || {};
            const linkHref = buttonLink && buttonLink.trim() ? buttonLink.trim() : '#';
            const isExternal = linkHref.startsWith('http://') || linkHref.startsWith('https://');

            return (
              <section
                key={block.id || index}
                className="max-w-3xl mx-auto w-full my-12"
              >
                <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-b from-primary/10 via-card to-background p-8 sm:p-12 text-center shadow-xl">
                  {/* Decorative background glow */}
                  <div
                    className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 space-y-6">
                    <span className="text-2xl">✨</span>
                    {headline && (
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-xl mx-auto leading-tight">
                        {headline}
                      </h3>
                    )}
                    <div>
                      {previewMode ? (
                        <Button
                          size="lg"
                          variant="primary"
                          className="px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                        >
                          {buttonText || 'Take Action'}
                        </Button>
                      ) : isExternal ? (
                        <a
                          href={linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button
                            size="lg"
                            variant="primary"
                            className="px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                          >
                            {buttonText || 'Take Action'}
                          </Button>
                        </a>
                      ) : (
                        <Link href={linkHref} className="inline-block">
                          <Button
                            size="lg"
                            variant="primary"
                            className="px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                          >
                            {buttonText || 'Take Action'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
