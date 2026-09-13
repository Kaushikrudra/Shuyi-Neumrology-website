'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export interface BannerRecord {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface BannerManagementProps {
  initialBanners: BannerRecord[];
}

export function BannerManagement({ initialBanners }: BannerManagementProps) {
  const [banners, setBanners] = useState<BannerRecord[]>(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerRecord | null>(null);
  const [deletingBanner, setDeletingBanner] = useState<BannerRecord | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [notification, setNotification] = useState<{ text: string; isError: boolean } | null>(null);

  const openAddModal = () => {
    setEditingBanner(null);
    setTitle('');
    setMessage('');
    setIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (banner: BannerRecord) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setMessage(banner.message);
    setIsActive(banner.isActive);
    setFormError('');
    setIsModalOpen(true);
  };

  const openDeleteModal = (banner: BannerRecord) => {
    setDeletingBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const handleToggleActive = async (banner: BannerRecord) => {
    setTogglingId(banner.id);
    const newStatus = !banner.isActive;

    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      setBanners((prev) =>
        prev.map((b) => (b.id === banner.id ? { ...b, isActive: newStatus } : b))
      );
      setNotification({
        text: `Banner "${banner.title}" is now ${newStatus ? 'ACTIVE' : 'INACTIVE'}.`,
        isError: false,
      });
    } catch (err: any) {
      setNotification({
        text: err.message || 'Failed to toggle banner status',
        isError: true,
      });
    } finally {
      setTogglingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a banner title.');
      return;
    }

    if (!message.trim()) {
      setFormError('Please enter a banner message.');
      return;
    }

    setLoading(true);

    try {
      if (editingBanner) {
        // Update existing banner
        const res = await fetch(`/api/admin/banners/${editingBanner.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title.trim(),
            message: message.trim(),
            isActive,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update banner');

        setBanners((prev) =>
          prev.map((b) => (b.id === editingBanner.id ? data.banner : b))
        );
        setNotification({ text: 'Banner updated successfully.', isError: false });
      } else {
        // Create new banner
        const res = await fetch('/api/admin/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title.trim(),
            message: message.trim(),
            isActive,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create banner');

        setBanners((prev) => [data.banner, ...prev]);
        setNotification({ text: 'Banner created successfully.', isError: false });
      }

      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBanner) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/banners/${deletingBanner.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete banner');

      setBanners((prev) => prev.filter((b) => b.id !== deletingBanner.id));
      setNotification({ text: 'Banner deleted successfully.', isError: false });
      setIsDeleteModalOpen(false);
      setDeletingBanner(null);
    } catch (err: any) {
      setNotification({ text: err.message || 'Failed to delete banner', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{banners.length}</strong> banners (
          <strong>{banners.filter((b) => b.isActive).length}</strong> currently active on homepage)
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openAddModal}
          className="text-xs shadow-xs"
        >
          + Create New Banner
        </Button>
      </div>

      {/* Notification Feedback */}
      {notification && (
        <div
          className={`p-3 rounded-lg text-xs font-medium border ${
            notification.isError
              ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          }`}
        >
          {notification.text}
        </div>
      )}

      {/* Banners List / Empty State */}
      {banners.length === 0 ? (
        <Card className="p-8 sm:p-12 text-center space-y-4 border-dashed">
          <span className="text-4xl block">📢</span>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif text-xl font-bold text-foreground">
              No Announcement Banners Found
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Create an announcement banner to display special offers, system notices, or new feature updates at the top of the homepage.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={openAddModal}
              className="text-xs"
            >
              Create First Banner
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {banners.map((banner) => {
            const isToggling = togglingId === banner.id;

            return (
              <Card
                key={banner.id}
                className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-border transition-colors"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="font-serif font-bold text-base text-foreground leading-snug">
                      {banner.title}
                    </h4>
                    <button
                      type="button"
                      disabled={isToggling}
                      onClick={() => handleToggleActive(banner)}
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                        banner.isActive
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                          : 'bg-secondary text-muted-foreground border-border hover:bg-secondary/80'
                      }`}
                      title="Click to toggle active state"
                    >
                      {isToggling ? 'Updating...' : banner.isActive ? '● Active' : '○ Inactive'}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {banner.message}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Created on {new Date(banner.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-start shrink-0 pt-1 sm:pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(banner)}
                    className="text-xs px-2.5 py-1 h-8"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteModal(banner)}
                    className="text-xs px-2.5 py-1 h-8 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Banner Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? 'Edit Banner' : 'Create New Banner'}
        description={
          editingBanner
            ? 'Modify announcement text, title, and active status.'
            : 'Add a new announcement strip to appear across the homepage.'
        }
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {formError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
              {formError}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-foreground">
              Banner Title / Tag
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Special Offer or New Feature"
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-foreground">
              Banner Message Text
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Unlock Lifetime VIP Numerology at 40% discount this week only!"
              className="w-full p-3 text-sm rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="bannerIsActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
            />
            <label htmlFor="bannerIsActive" className="text-xs font-medium text-foreground cursor-pointer select-none">
              Publish immediately (Active on homepage)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={loading}
              className="shadow-xs"
            >
              {editingBanner ? 'Save Changes' : 'Create Banner'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Banner?"
        description="Are you sure you want to remove this announcement banner? It will no longer be visible to visitors."
        maxWidth="sm"
      >
        <div className="space-y-4 pt-2">
          {deletingBanner && (
            <div className="p-3 rounded-lg bg-secondary/70 border border-border text-xs text-foreground font-medium">
              &ldquo;{deletingBanner.title}: {deletingBanner.message}&rdquo;
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleDelete}
              isLoading={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Banner
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
