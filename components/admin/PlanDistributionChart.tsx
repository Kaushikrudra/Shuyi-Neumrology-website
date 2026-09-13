'use client';

import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

interface PlanData {
  name: string;
  count: number;
  color: string;
}

interface PlanDistributionChartProps {
  freeCount: number;
  premiumCount: number;
  lifetimeCount: number;
}

export function PlanDistributionChart({
  freeCount,
  premiumCount,
  lifetimeCount,
}: PlanDistributionChartProps) {
  const [mounted, setMounted] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  useEffect(() => {
    setMounted(true);
  }, []);

  const data: PlanData[] = [
    { name: 'Free', count: freeCount, color: '#94a3b8' },
    { name: 'Premium', count: premiumCount, color: '#8b5cf6' },
    { name: 'Lifetime', count: lifetimeCount, color: '#f59e0b' },
  ];

  const total = freeCount + premiumCount + lifetimeCount;

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
        Loading chart visualizer...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chart Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">
          Total Subscribers: <strong className="text-foreground">{total}</strong>
        </span>
        <div className="flex items-center gap-1 bg-secondary p-1 rounded-lg border border-border text-xs">
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-2.5 py-1 rounded transition-colors ${
              chartType === 'bar'
                ? 'bg-card text-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Bar Chart
          </button>
          <button
            type="button"
            onClick={() => setChartType('pie')}
            className={`px-2.5 py-1 rounded transition-colors ${
              chartType === 'pie'
                ? 'bg-card text-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Donut Chart
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-72 w-full pt-2">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
            >
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-xs text-muted-foreground"
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                stroke="currentColor"
                className="text-xs text-muted-foreground"
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`${value ?? 0} Users`, 'Subscribers']}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                }}
                formatter={(value: any, name: any) => [
                  `${value ?? 0} Users (${total > 0 ? (((Number(value) || 0) / total) * 100).toFixed(1) : 0}%)`,
                  name,
                ]}
              />
              <Legend
                formatter={(value: string) => (
                  <span className="text-xs text-foreground font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
