import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Dashboard',
  description:
    'Access your personal Shuyi sanctuary. View active membership tier, saved calculations, and account preferences.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
