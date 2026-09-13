'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  CmsBlock,
  BlockType,
  CmsPageStatus,
  createDefaultBlock,
  slugify,
  RESERVED_SLUGS,
} from '@/lib/cms-types';
import { PublicBlockRenderer } from '@/components/cms/PublicBlockRenderer';

interface CmsBlockEditorProps {
  initialPage: {
    id: string;
    slug: string;
    title: string;
    status: CmsPageStatus | string;
    blocks: string;
    updatedAt: string;
  };
}

export function CmsBlockEditor({ initialPage }: CmsBlockEditorProps) {
  const router = useRouter();

  // Page Header Details
  const [title, setTitle] = useState(initialPage.title);
  const [slug, setSlug] = useState(initialPage.slug);
  const [status, setStatus] = useState<CmsPageStatus>(
    initialPage.status === 'published' ? 'published' : 'draft'
  );

  // Parse Initial Blocks
  const [blocks, setBlocks] = useState<CmsBlock[]>(() => {
    try {
      const parsed = JSON.parse(initialPage.blocks || '[]');
      if (Array.isArray(parsed)) {
        return parsed.map((b, idx) => ({ ...b, order: idx }));
      }
      return [];
    } catch {
      return [];
    }
  });

  // Editor View Mode: 'edit' or 'preview'
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Drag and Drop States (Native HTML5)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Saving states
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Block Mutation Helpers
  const handleUpdateBlockContent = (
    index: number,
    field: string,
    value: any
  ) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        content: {
          ...copy[index].content,
          [field]: value,
        },
      };
      return copy;
    });
  };

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createDefaultBlock(type, blocks.length);
    setBlocks((prev) => [...prev, newBlock]);
  };

  const handleDeleteBlock = (index: number) => {
    setBlocks((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((b, i) => ({ ...b, order: i }))
    );
  };

  const handleMoveBlock = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= blocks.length || fromIndex === toIndex) return;
    setBlocks((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy.map((b, idx) => ({ ...b, order: idx }));
    });
  };

  // Native HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Fallback data for browser compatibility
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    handleMoveBlock(draggedIndex, targetIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Save / Publish Actions
  const handleSave = async (targetStatus?: 'draft' | 'published') => {
    setFeedbackMessage(null);

    const cleanTitle = title.trim();
    const cleanSlug = slugify(slug.trim() || cleanTitle);

    if (!cleanTitle) {
      setFeedbackMessage({
        type: 'error',
        text: 'Page title cannot be empty.',
      });
      return;
    }

    if (!cleanSlug) {
      setFeedbackMessage({
        type: 'error',
        text: 'A valid slug is required.',
      });
      return;
    }

    if (RESERVED_SLUGS.includes(cleanSlug)) {
      setFeedbackMessage({
        type: 'error',
        text: `The slug "${cleanSlug}" is reserved for system routes.`,
      });
      return;
    }

    const newStatus = targetStatus || status;

    try {
      setIsSaving(true);
      const res = await fetch(`/api/admin/cms/${initialPage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: cleanTitle,
          slug: cleanSlug,
          blocks,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes.');
      }

      setStatus(newStatus);
      setSlug(cleanSlug);
      setFeedbackMessage({
        type: 'success',
        text:
          newStatus === 'published'
            ? 'Page successfully published and is now live!'
            : 'Draft saved successfully.',
      });

      router.refresh();
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'An error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Back to Pages list"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {title || 'Untitled Page'}
              </h1>
              {status === 'published' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Draft
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
              Slug: /{slug}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Tabs */}
          <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'edit'
                  ? 'bg-card text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Blocks</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-card text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Preview Mode</span>
            </button>
          </div>

          {/* Save Draft */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSave('draft')}
            isLoading={isSaving}
          >
            Save Draft
          </Button>

          {/* Publish / Unpublish */}
          {status === 'published' ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSave('draft')}
                isLoading={isSaving}
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
              >
                Unpublish
              </Button>
              <a
                href={`/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-card hover:bg-secondary text-foreground transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View Live</span>
              </a>
            </>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => handleSave('published')}
              isLoading={isSaving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              🚀 Publish
            </Button>
          )}
        </div>
      </div>

      {/* Feedback Toast Banner */}
      {feedbackMessage && (
        <div
          className={`p-3.5 rounded-xl border text-sm flex items-center justify-between ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{feedbackMessage.type === 'success' ? '✓' : '⚠️'}</span>
            <span>{feedbackMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Page Title & Slug Meta Card */}
      <Card className="p-5 border-border bg-card/80 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Page Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Page Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Numerology Meaning & Calculation"
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              URL Slug
            </label>
            <div className="flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
              <span className="text-muted-foreground mr-1">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="numerology-meaning"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-mono text-xs"
                required
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Live link: /{slug || 'slug'}
            </p>
          </div>
        </div>
      </Card>

      {/* VIEW: LIVE PREVIEW MODE */}
      {activeTab === 'preview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <span className="text-base">👁️</span>
              <span>
                <strong>Live Visual Preview:</strong> This shows how this page will look to public visitors when published.
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveTab('edit')}
              className="text-xs"
            >
              Back to Editor
            </Button>
          </div>

          <div className="rounded-3xl border border-border bg-background p-6 sm:p-10 shadow-lg min-h-[500px]">
            <header className="max-w-3xl mx-auto mb-10 pb-6 border-b border-border text-center space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                {title || 'Untitled Page'}
              </h1>
            </header>

            <PublicBlockRenderer blocks={blocks} previewMode={true} />
          </div>
        </div>
      )}

      {/* VIEW: EDIT BLOCKS (DRAG AND DROP) */}
      {activeTab === 'edit' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Page Blocks ({blocks.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Drag blocks using the handle to reorder, or use the arrow buttons.
              </p>
            </div>

            {/* Quick Add Block Bar */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddBlock('text')}
                className="text-xs flex items-center gap-1.5"
              >
                <span>+ Text Block</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddBlock('image')}
                className="text-xs flex items-center gap-1.5"
              >
                <span>+ Image Block</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddBlock('cta')}
                className="text-xs flex items-center gap-1.5"
              >
                <span>+ CTA Block</span>
              </Button>
            </div>
          </div>

          {blocks.length === 0 ? (
            <Card className="p-12 text-center border-dashed border-2 border-border/80 bg-secondary/10">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-foreground">No blocks yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-4">
                Click one of the buttons below to add your first content block to this page.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddBlock('text')}
                >
                  Add Text Block
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddBlock('image')}
                >
                  Add Image Block
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddBlock('cta')}
                >
                  Add CTA Block
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {blocks.map((block, index) => {
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index && draggedIndex !== index;

                return (
                  <div
                    key={block.id || index}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`transition-all duration-150 ${
                      isOver ? 'pt-6 border-t-2 border-primary ring-2 ring-primary/30 rounded-xl' : ''
                    }`}
                  >
                    <Card
                      className={`p-5 border transition-all ${
                        isDragging
                          ? 'opacity-40 border-dashed border-primary bg-secondary/50 scale-[0.99]'
                          : 'bg-card border-border hover:border-border/90 shadow-xs'
                      }`}
                    >
                      {/* Block Header Toolbar */}
                      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
                        <div className="flex items-center gap-3">
                          {/* Native HTML5 Drag Handle */}
                          <div
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                            className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            title="Drag to reorder"
                            aria-label={`Drag to reorder block ${index + 1}`}
                            role="button"
                            tabIndex={0}
                          >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-12a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                            </svg>
                          </div>

                          {/* Block Type Badge */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider bg-secondary text-foreground border border-border">
                              {block.type === 'text' && '📝 Text Block'}
                              {block.type === 'image' && '🖼️ Image Block'}
                              {block.type === 'cta' && '⚡ Call To Action'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              #{index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Reorder Up / Down / Delete Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveBlock(index, index - 1)}
                            disabled={index === 0}
                            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Up"
                            aria-label={`Move block ${index + 1} up`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveBlock(index, index + 1)}
                            disabled={index === blocks.length - 1}
                            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Move Down"
                            aria-label={`Move block ${index + 1} down`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlock(index)}
                            className="p-1.5 rounded text-red-500 hover:bg-red-500/10 transition-colors ml-1"
                            title="Delete block"
                            aria-label={`Delete block ${index + 1}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Inline Form Fields by Type */}
                      {block.type === 'text' && (
                        <div className="space-y-4">
                          <Input
                            label="Section Heading (Optional)"
                            placeholder="e.g. Understanding Master Number 11"
                            value={block.content.heading || ''}
                            onChange={(e) =>
                              handleUpdateBlockContent(index, 'heading', e.target.value)
                            }
                          />
                          <div>
                            <label
                              htmlFor={`block-body-${block.id || index}`}
                              className="block text-sm font-medium text-foreground mb-1"
                            >
                              Body Content
                            </label>
                            <textarea
                              id={`block-body-${block.id || index}`}
                              rows={4}
                              placeholder="Write your article or explanation here... Supports paragraphs."
                              value={block.content.body || ''}
                              onChange={(e) =>
                                handleUpdateBlockContent(index, 'body', e.target.value)
                              }
                              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div className="space-y-4">
                          <Input
                            label="Image URL"
                            placeholder="https://images.unsplash.com/... or /hero-poster.webp"
                            value={block.content.imageUrl || ''}
                            onChange={(e) =>
                              handleUpdateBlockContent(index, 'imageUrl', e.target.value)
                            }
                            helperText="Paste any valid image URL or public asset path."
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Alt Text (For accessibility & SEO)"
                              placeholder="e.g. Ancient Tarot reading card deck"
                              value={block.content.altText || ''}
                              onChange={(e) =>
                                handleUpdateBlockContent(index, 'altText', e.target.value)
                              }
                            />
                            <Input
                              label="Caption (Optional)"
                              placeholder="e.g. The celestial alignment of Life Path 7"
                              value={block.content.caption || ''}
                              onChange={(e) =>
                                handleUpdateBlockContent(index, 'caption', e.target.value)
                              }
                            />
                          </div>
                          {block.content.imageUrl && (
                            <div className="mt-2 p-2 rounded-lg border border-border bg-secondary/30 flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={block.content.imageUrl}
                                alt={block.content.altText || 'Preview'}
                                className="w-16 h-12 object-cover rounded border border-border"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <span className="text-xs text-muted-foreground truncate">
                                Preview: {block.content.imageUrl}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {block.type === 'cta' && (
                        <div className="space-y-4">
                          <Input
                            label="CTA Headline"
                            placeholder="e.g. Ready to Calculate Your Personal Destiny Matrix?"
                            value={block.content.headline || ''}
                            onChange={(e) =>
                              handleUpdateBlockContent(index, 'headline', e.target.value)
                            }
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Button Text"
                              placeholder="e.g. Start Free Preview"
                              value={block.content.buttonText || ''}
                              onChange={(e) =>
                                handleUpdateBlockContent(index, 'buttonText', e.target.value)
                              }
                            />
                            <Input
                              label="Button Link URL"
                              placeholder="e.g. /preview or /pricing or https://..."
                              value={block.content.buttonLink || ''}
                              onChange={(e) =>
                                handleUpdateBlockContent(index, 'buttonLink', e.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Add Block Bar */}
          {blocks.length > 0 && (
            <div className="p-4 rounded-xl border border-dashed border-border bg-secondary/20 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs text-muted-foreground font-medium mr-2">
                Append new block:
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddBlock('text')}
                className="text-xs"
              >
                + Add Text Block
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddBlock('image')}
                className="text-xs"
              >
                + Add Image Block
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddBlock('cta')}
                className="text-xs"
              >
                + Add CTA Block
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
