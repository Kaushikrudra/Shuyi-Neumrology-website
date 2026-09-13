'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export interface FaqRecord {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface FaqManagementProps {
  initialFaqs: FaqRecord[];
}

export function FaqManagement({ initialFaqs }: FaqManagementProps) {
  const [faqs, setFaqs] = useState<FaqRecord[]>(initialFaqs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqRecord | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<FaqRecord | null>(null);

  // Form states
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [order, setOrder] = useState('0');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [notification, setNotification] = useState<{ text: string; isError: boolean } | null>(null);

  const openAddModal = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setOrder(String(faqs.length + 1));
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FaqRecord) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(String(faq.order));
    setFormError('');
    setIsModalOpen(true);
  };

  const openDeleteModal = (faq: FaqRecord) => {
    setDeletingFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!question.trim()) {
      setFormError('Please enter a question.');
      return;
    }

    if (!answer.trim()) {
      setFormError('Please enter an answer.');
      return;
    }

    setLoading(true);

    try {
      if (editingFaq) {
        // Update existing FAQ
        const res = await fetch(`/api/admin/faq/${editingFaq.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question.trim(),
            answer: answer.trim(),
            order: parseInt(order, 10) || 0,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update FAQ');

        setFaqs((prev) =>
          prev
            .map((item) => (item.id === editingFaq.id ? data.faq : item))
            .sort((a, b) => a.order - b.order)
        );
        setNotification({ text: 'FAQ item updated successfully.', isError: false });
      } else {
        // Create new FAQ
        const res = await fetch('/api/admin/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question.trim(),
            answer: answer.trim(),
            order: parseInt(order, 10) || 0,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create FAQ');

        setFaqs((prev) => [...prev, data.faq].sort((a, b) => a.order - b.order));
        setNotification({ text: 'FAQ item created successfully.', isError: false });
      }

      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingFaq) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/faq/${deletingFaq.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete FAQ');

      setFaqs((prev) => prev.filter((item) => item.id !== deletingFaq.id));
      setNotification({ text: 'FAQ item deleted successfully.', isError: false });
      setIsDeleteModalOpen(false);
      setDeletingFaq(null);
    } catch (err: any) {
      setNotification({ text: err.message || 'Failed to delete FAQ', isError: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDefaults = async () => {
    setLoading(true);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to seed FAQs');

      setFaqs(data.faqs);
      setNotification({ text: data.message || 'Default FAQs seeded successfully!', isError: false });
    } catch (err: any) {
      setNotification({ text: err.message || 'Failed to seed FAQs', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{faqs.length}</strong> FAQ items (ordered sequentially)
        </div>

        <div className="flex items-center gap-3">
          {faqs.length === 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeedDefaults}
              isLoading={loading}
              className="text-xs"
            >
              ⚡ Seed Default FAQs (6 Items)
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            className="text-xs shadow-xs"
          >
            + Add New FAQ
          </Button>
        </div>
      </div>

      {/* Notification */}
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

      {/* Empty State Card */}
      {faqs.length === 0 ? (
        <Card className="p-8 sm:p-12 text-center space-y-4 border-dashed">
          <span className="text-4xl block">❓</span>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif text-xl font-bold text-foreground">
              No FAQ Items in Database
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your public FAQ page is currently displaying fallback content. You can seed the default 6 FAQs directly into SQLite or compose custom ones.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSeedDefaults}
              isLoading={loading}
              className="text-xs"
            >
              Seed 6 Default FAQs
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openAddModal}
              className="text-xs"
            >
              Create First Custom FAQ
            </Button>
          </div>
        </Card>
      ) : (
        /* FAQ Items List */
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-border transition-colors"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-foreground text-xs font-bold font-mono">
                    {faq.order}
                  </span>
                  <h4 className="font-serif font-bold text-base text-foreground leading-snug">
                    {faq.question}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-start shrink-0 pt-1 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(faq)}
                  className="text-xs px-2.5 py-1 h-8"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDeleteModal(faq)}
                  className="text-xs px-2.5 py-1 h-8 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
        description={
          editingFaq
            ? 'Update the question title, detailed answer, and sorting order.'
            : 'Fill in the question, answer, and display order sequence.'
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
              Question Title
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How does Pythagorean numerology work?"
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-foreground">
              Detailed Answer
            </label>
            <textarea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a comprehensive and clear explanation..."
              className="w-full p-3 text-sm rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>

          <div className="w-36 space-y-1">
            <label className="block text-xs font-semibold text-foreground">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
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
              {editingFaq ? 'Save Changes' : 'Create FAQ'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete FAQ Item?"
        description="Are you sure you want to remove this FAQ item? This action will permanently remove it from the database and public FAQ page."
        maxWidth="sm"
      >
        <div className="space-y-4 pt-2">
          {deletingFaq && (
            <div className="p-3 rounded-lg bg-secondary/70 border border-border text-xs text-foreground font-medium">
              &ldquo;{deletingFaq.question}&rdquo;
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
              Delete Item
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
