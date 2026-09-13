'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export interface AdminUserRecord {
  id: string;
  name: string | null;
  email: string;
  plan: string;
  role: string;
  createdAt: string | Date;
}

interface UserManagementTableProps {
  initialUsers: AdminUserRecord[];
  currentUserId?: string;
}

export function UserManagementTable({
  initialUsers,
  currentUserId,
}: UserManagementTableProps) {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = u.name?.toLowerCase().includes(q);
    const emailMatch = u.email.toLowerCase().includes(q);
    const roleMatch = u.role.toLowerCase().includes(q);
    const planMatch = u.plan.toLowerCase().includes(q);
    return nameMatch || emailMatch || roleMatch || planMatch;
  });

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update role');
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      setMessage({
        text: `Role successfully updated to "${newRole}".`,
        isError: false,
      });
    } catch (err: any) {
      setMessage({
        text: err.message || 'Error updating user role',
        isError: true,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'lifetime':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'premium':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'editor':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Feedback Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-xs font-medium border ${
            message.isError
              ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Users Table Card */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Joined Date</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isCurrent = user.id === currentUserId;
                  const isUpdating = updatingId === user.id;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-5 py-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>{user.name || 'Anonymous Seeker'}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${getPlanBadge(
                            user.plan
                          )}`}
                        >
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border uppercase ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            disabled={isUpdating}
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                            className="text-xs h-8 rounded border border-input bg-card px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer disabled:opacity-50"
                          >
                            <option value="user">user</option>
                            <option value="editor">editor</option>
                            <option value="admin">admin</option>
                          </select>
                          {isUpdating && (
                            <span className="text-xs text-muted-foreground animate-spin">
                              ⏳
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
