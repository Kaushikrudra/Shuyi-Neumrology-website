'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { slugify, RESERVED_SLUGS } from '@/lib/cms-types';

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'published' | string;
  blocks: string;
  createdAt: string;
  updatedAt: string;
}

interface PagesManagementProps {
  initialPages: PageItem[];
}

export function PagesManagement({ initialPages }: PagesManagementProps) {
  const router = useRouter();
  const [pages, setPages] = useState<PageItem[]>(initialPages);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<PageItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Auto-generate slug when title changes unless manually edited
  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    if (!slugManuallyEdited) {
      setNewSlug(slugify(val));
    }
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const title = newTitle.trim();
    const slug = slugify(newSlug.trim() || title);

    if (!title) {
      setCreateError('Page title is required.');
      return;
    }

    if (!slug) {
      setCreateError('Valid slug is required.');
      return;
    }

    if (RESERVED_SLUGS.includes(slug)) {
      setCreateError(`The slug "${slug}" is reserved for system routes.`);
      return;
    }

    try {
      setCreateLoading(true);
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          status: 'draft',
          blocks: '[]',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create page');
      }

      setIsCreateModalOpen(false);
      setNewTitle('');
      setNewSlug('');
      setSlugManuallyEdited(false);

      // Redirect directly to the editor
      router.push(`/admin/pages/${data.page.id}/edit`);
    } catch (err: any) {
      setCreateError(err.message || 'An unexpected error occurred.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeletePage = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);
      setDeleteError(null);

      const res = await fetch(`/api/admin/cms/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete page');
      }

      setPages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete page.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto max-w-md">
          <Input
            placeholder="Search pages by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center rounded-lg border border-input bg-card p-1 text-xs">
            {(['all', 'published', 'draft'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  statusFilter === filter
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setCreateError(null);
            setNewTitle('');
            setNewSlug('');
            setSlugManuallyEdited(false);
            setIsCreateModalOpen(true);
          }}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Page</span>
        </Button>
      </div>

      {/* Pages Table Card */}
      <Card className="p-0 overflow-hidden border border-border">
        {filteredPages.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/80 text-muted-foreground flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-foreground">No pages found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'all'
                ? 'No pages match your current search or filter criteria.'
                : 'You have not created any custom CMS pages yet. Click "Create New Page" to build one.'}
            </p>
            {pages.length === 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4"
              >
                Create Your First Page
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/40 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Page Title & Slug</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Blocks</th>
                  <th className="px-6 py-3.5">Last Updated</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPages.map((page) => {
                  let blockCount = 0;
                  try {
                    const parsed = JSON.parse(page.blocks || '[]');
                    blockCount = Array.isArray(parsed) ? parsed.length : 0;
                  } catch (e) {
                    blockCount = 0;
                  }

                  const isPublished = page.status === 'published';

                  return (
                    <tr
                      key={page.id}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-base">
                            {page.title}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground mt-0.5">
                            /{page.slug}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isPublished ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                        {blockCount} {blockCount === 1 ? 'block' : 'blocks'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(page.updatedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        {isPublished && (
                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md border border-border bg-card hover:bg-secondary text-foreground transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Live</span>
                          </a>
                        )}

                        <Link
                          href={`/admin/pages/${page.id}/edit`}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteError(null);
                            setDeleteTarget(page);
                          }}
                          className="inline-flex items-center text-xs font-medium p-1.5 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete page"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal: Create New Page */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => !createLoading && setIsCreateModalOpen(false)}
        title="Create New Page"
        description="Configure the title and unique URL slug. You can add blocks and content in the editor."
      >
        <form onSubmit={handleCreatePage} className="space-y-4 pt-2">
          {createError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400">
              {createError}
            </div>
          )}

          <Input
            label="Page Title"
            placeholder="e.g. Numerology Master Guide"
            value={newTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={createLoading}
            required
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              URL Slug
            </label>
            <div className="flex items-center rounded-md border border-input bg-card px-3 py-2 text-sm">
              <span className="text-muted-foreground mr-1">/</span>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  setNewSlug(slugify(e.target.value));
                }}
                disabled={createLoading}
                placeholder="numerology-master-guide"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-mono text-xs"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Public URL: {typeof window !== 'undefined' ? window.location.origin : ''}/{newSlug || 'your-slug'}
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={createLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={createLoading}
            >
              Create & Open Editor
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Delete Confirmation */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => !deleteLoading && setDeleteTarget(null)}
        title="Delete CMS Page?"
        description={`Are you sure you want to delete "${deleteTarget?.title}" (/${deleteTarget?.slug})? This action cannot be undone.`}
      >
        <div className="space-y-4 pt-2">
          {deleteError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400">
              {deleteError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDeletePage}
              isLoading={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Page
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
