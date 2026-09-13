'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

interface AdminSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAdminUser = user.role === 'admin';

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      adminOnly: false,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      adminOnly: true,
    },
    {
      name: 'Content & FAQ',
      href: '/admin/content',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      adminOnly: false,
    },
    {
      name: 'Banners',
      href: '/admin/banners',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      adminOnly: false,
    },
  ];

  const roleBadgeColor =
    user.role === 'admin'
      ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
      : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';

  const roleLabel = user.role === 'admin' ? 'ADMIN' : 'EDITOR';

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2 font-serif font-bold text-lg text-foreground">
          <span className="text-xl">✨</span>
          <span>Shuyi Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isMobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 font-serif font-bold text-xl text-foreground hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="text-2xl">✨</span>
            <div>
              <span className="block leading-tight">Shuyi</span>
              <span className="text-xs font-sans font-medium text-muted-foreground tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          </Link>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>

        {/* Current User Info Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-secondary/60 border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Logged in as</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${roleBadgeColor}`}
            >
              {roleLabel}
            </span>
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-foreground truncate">
              {user.name || 'Staff Member'}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            // Hide or disable admin-only link if user is not admin
            if (item.adminOnly && !isAdminUser) {
              return null;
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {item.adminOnly && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase font-bold tracking-wide">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Public Website</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full text-xs justify-center"
          >
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
}
