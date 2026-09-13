import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { UserManagementTable } from '@/components/admin/UserManagementTable';

export const metadata: Metadata = {
  title: 'User Management | Shuyi Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  // Strict check: Only Admin role can access the User Management page
  if (!session?.user || !isAdmin(session)) {
    redirect('/admin?error=Forbidden: Admin access required');
  }

  // Fetch all registered users
  const rawUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const users = rawUsers.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));

  const currentUserId = (session.user as any).id;

  return (
    <div className="space-y-6">
      <div className="border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
          <span>Admin Only</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review registered seekers, inspect subscription tiers, and assign platform roles (user, editor, admin).
        </p>
      </div>

      <UserManagementTable initialUsers={users} currentUserId={currentUserId} />
    </div>
  );
}
