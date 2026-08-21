'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function NumerologyHeroAnimation({ className }: { className?: string }) {
  // 12 Astrological/Numerological positions on the wheel
  const wheelNodes = [
    { num: '1', name: 'Genesis', angle: 0 },
    { num: '2', name: 'Harmony', angle: 30 },
    { num: '3', name: 'Creation', angle: 60 },
    { num: '4', name: 'Order', angle: 90 },
    { num: '5', name: 'Freedom', angle: 120 },
    { num: '6', name: 'Nurture', angle: 150 },
    { num: '7', name: 'Seeker', angle: 180 },
    { num: '8', name: 'Infinity', angle: 210 },
    { num: '9', name: 'Wisdom', angle: 240 },
    { num: '11', name: 'Intuition', angle: 270 },
    { num: '22', name: 'Architect', angle: 300 },
    { num: '33', name: 'Teacher', angle: 330 },
  ];

  const radius = 175; // SVG coordinate radius
  const center = 220;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative w-full max-w-[480px] lg:max-w-[560px] xl:max-w-[620px] aspect-square mx-auto flex items-center justify-center select-none',
        className
      )}
    >
      {/* Background Soft Radial Glow (GPU optimized CSS gradient without heavy multi-layer Gaussian blurs) */}
      <div
        className="absolute inset-0 rounded-full scale-95 animate-pulse-subtle pointer-events-none -z-10 transform-gpu"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(236,72,153,0.12) 40%, rgba(99,102,241,0.06) 65%, transparent 75%)',
        }}
      />

      {/* SVG Celestial Astrolabe & Numerology Wheel */}
      <svg
        viewBox="0 0 440 440"
        className="w-full h-full text-foreground/80 overflow-visible transform-gpu"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1. Outermost Ring with Subtle Dash */}
        <circle
          cx={center}
          cy={center}
          r="210"
          stroke="currentColor"
          strokeWidth="0.75"
          className="opacity-20"
        />

        {/* 2. Rotating Outer Astrolabe Degree Ring */}
        <circle
          cx={center}
          cy={center}
          r="195"
          stroke="url(#ringGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="animate-spin-very-slow origin-center opacity-75"
        />

        {/* 3. Number Track Orbit Ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          className="opacity-30"
        />

        {/* 4. Counter-rotating Intermediate Sacred Geometry Ring */}
        <circle
          cx={center}
          cy={center}
          r="120"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="8 16"
          className="animate-spin-reverse-slow origin-center opacity-40 text-muted-foreground"
        />

        {/* 5. Inner Concentric Geometric Square / Diamond */}
        <g className="animate-spin-very-slow origin-center opacity-30">
          <rect
            x="160"
            y="160"
            width="120"
            height="120"
            stroke="currentColor"
            strokeWidth="0.75"
            transform={`rotate(45 ${center} ${center})`}
          />
          <circle
            cx={center}
            cy={center}
            r="85"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 6"
          />
        </g>

        {/* 6. Cardinal Axis Rays */}
        <line
          x1={center}
          y1="25"
          x2={center}
          y2="415"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          className="opacity-25"
        />
        <line
          x1="25"
          y1={center}
          x2="415"
          y2={center}
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          className="opacity-25"
        />

        {/* 7. Center Glowing Orb & Core Mystic Beacon */}
        <circle
          cx={center}
          cy={center}
          r="54"
          fill="url(#orbGlow)"
          className="animate-pulse-subtle origin-center"
        />
        <circle
          cx={center}
          cy={center}
          r="38"
          className="fill-card stroke-border/80"
          strokeWidth="1.5"
        />

        {/* Center Symbol (Star / Sparkle) */}
        <g className="animate-pulse-subtle origin-center">
          <path
            d={`M ${center} ${center - 16} Q ${center} ${center} ${center + 16} ${center} Q ${center} ${center} ${center} ${center + 16} Q ${center} ${center} ${center - 16} ${center} Q ${center} ${center} ${center} ${center - 16} Z`}
            className="fill-primary"
          />
          <circle cx={center} cy={center} r="3" className="fill-background" />
        </g>

        {/* 8. Positioned Numerology Wheel Nodes */}
        {wheelNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Number((center + radius * Math.sin(rad)).toFixed(3));
          const y = Number((center - radius * Math.cos(rad)).toFixed(3));
          const x1 = Number((center + (radius - 22) * Math.sin(rad)).toFixed(3));
          const y1 = Number((center - (radius - 22) * Math.cos(rad)).toFixed(3));
          const x2 = Number((center + (radius - 6) * Math.sin(rad)).toFixed(3));
          const y2 = Number((center - (radius - 6) * Math.cos(rad)).toFixed(3));

          return (
            <g key={node.num} className="transition-transform duration-300">
              {/* Soft connecting radial tick line from center */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-40"
              />

              {/* Node Circular Background Badge */}
              <circle
                cx={x}
                cy={y}
                r="17"
                className="fill-card stroke-border shadow-sm"
                strokeWidth="1.2"
              />

              {/* Glowing outline on key master/life path numbers */}
              {(node.num === '7' || node.num === '11' || node.num === '22' || node.num === '1') && (
                <circle
                  cx={x}
                  cy={y}
                  r="17"
                  stroke="url(#ringGrad)"
                  strokeWidth="1.5"
                  className="animate-pulse-subtle"
                />
              )}

              {/* Numerology Number Glyph */}
              <text
                x={x}
                y={y + 4.5}
                textAnchor="middle"
                className="fill-foreground font-mono text-[11px] font-bold tracking-tight select-none"
              >
                {node.num}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Accent Badges (Glassmorphism highlight cards) */}
      <div className="absolute -top-3 right-4 sm:right-8 bg-card/85 border border-border/80 text-card-foreground px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md text-xs font-medium flex items-center gap-1.5 animate-float-slow">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <span className="font-semibold">Life Path 7</span>
        <span className="text-muted-foreground text-[10px]">• Seeker</span>
      </div>

      <div className="absolute -bottom-2 left-4 sm:left-8 bg-card/85 border border-border/80 text-card-foreground px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md text-xs font-medium flex items-center gap-1.5 animate-float-reverse">
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
        <span className="font-semibold">Master 11</span>
        <span className="text-muted-foreground text-[10px]">• Intuition</span>
      </div>
    </div>
  );
}
