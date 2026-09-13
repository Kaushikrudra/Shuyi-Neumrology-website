import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isEditorOrAdmin } from '@/lib/auth-utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Panel | Shuyi Numerology',
  description: 'Administrative management panel for Shuyi platform.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Authentication check: Must be logged in
  if (!session?.user) {
    redirect('/login?error=Unauthorized&callbackUrl=/admin');
  }

  // Authorization check: Must be either editor or admin
  if (!isEditorOrAdmin(session)) {
    redirect('/?error=Unauthorized');
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    role: (session.user as any).role || 'editor',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <AdminSidebar user={user} />

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
