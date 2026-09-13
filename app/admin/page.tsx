import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlanDistributionChart } from '@/components/admin/PlanDistributionChart';

export const metadata: Metadata = {
  title: 'Dashboard | Shuyi Admin',
};

// Revalidate or dynamic
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch real statistics from SQLite database
  const [
    totalUsers,
    freeUsers,
    premiumUsers,
    lifetimeUsers,
    totalFaqs,
    activeBanners,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { plan: 'free' } }),
    prisma.user.count({ where: { plan: 'premium' } }),
    prisma.user.count({ where: { plan: 'lifetime' } }),
    prisma.faqItem.count(),
    prisma.banner.count({ where: { isActive: true } }),
  ]);

  // Preview calculations metric (client-side calculation estimated placeholder)
  const totalPreviewCalculations = 1420;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border mb-2">
            <span>Admin Overview</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            System Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor platform performance, user memberships, and live content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/users">
            <Button variant="outline" size="sm" className="text-xs">
              Manage Users
            </Button>
          </Link>
          <Link href="/admin/content">
            <Button variant="primary" size="sm" className="text-xs shadow-xs">
              Edit Content
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Users */}
        <Card hoverEffect className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                Total Users
              </CardDescription>
              <span className="text-xl p-2 rounded-lg bg-secondary">👥</span>
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-foreground">
              {totalUsers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-emerald-500 font-medium">●</span> Registered accounts in DB
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Preview Calculations */}
        <Card hoverEffect className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                Preview Calculations
              </CardDescription>
              <span className="text-xl p-2 rounded-lg bg-secondary">🔢</span>
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-foreground">
              {totalPreviewCalculations.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-purple-500 font-medium">⚡</span> Estimated interactive runs
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Total FAQs */}
        <Card hoverEffect className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                FAQ Articles
              </CardDescription>
              <span className="text-xl p-2 rounded-lg bg-secondary">❓</span>
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-foreground">
              {totalFaqs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Database-driven answers live
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Active Banners */}
        <Card hoverEffect className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                Active Banners
              </CardDescription>
              <span className="text-xl p-2 rounded-lg bg-secondary">📢</span>
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-foreground">
              {activeBanners}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Live announcement bars
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics & Plan Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recharts Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-serif">
              Membership Plan Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Live breakdown of Free, Premium, and Lifetime subscription tiers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlanDistributionChart
              freeCount={freeUsers}
              premiumCount={premiumUsers}
              lifetimeCount={lifetimeUsers}
            />
          </CardContent>
        </Card>

        {/* Right 1 Col: Quick Numbers Summary & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif">Tier Breakdown</CardTitle>
              <CardDescription className="text-xs">
                Subscribers per tier in SQLite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="font-medium text-foreground">Free Tier</span>
                </div>
                <span className="font-bold text-foreground">{freeUsers}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="font-medium text-foreground">Premium</span>
                </div>
                <span className="font-bold text-foreground">{premiumUsers}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="font-medium text-foreground">Lifetime Access</span>
                </div>
                <span className="font-bold text-foreground">{lifetimeUsers}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Management Shortcuts */}
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/users" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  👥 Review User Roles & Access
                </Button>
              </Link>
              <Link href="/admin/content" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  ❓ Manage FAQ Questions
                </Button>
              </Link>
              <Link href="/admin/banners" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  📢 Create Announcement Banner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
