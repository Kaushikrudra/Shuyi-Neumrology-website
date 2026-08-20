'use client';

import React, { useState, createContext, useContext, useId } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionItemData {
  id?: string;
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionContextType {
  openValues: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children?: React.ReactNode;
  items?: AccordionItemData[];
  className?: string;
}

export function Accordion({
  type = 'single',
  defaultValue,
  children,
  items,
  className,
}: AccordionProps) {
  const [openValues, setOpenValues] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenValues((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleItem }}>
      <div className={cn('space-y-3', className)}>
        {items
          ? items.map((item, idx) => {
              const val = item.value || item.id || `item-${idx}`;
              return (
                <AccordionItem key={val} value={val}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              );
            })
          : children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItemContext = createContext<{ value: string; isOpen: boolean }>({
  value: '',
  isOpen: false,
});

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isOpen = context.openValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        className={cn(
          'rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-colors duration-200 overflow-hidden',
          isOpen && 'border-ring/40 shadow',
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const { toggleItem } = accordionContext;
  const { value, isOpen } = itemContext;
  const triggerId = useId();

  return (
    <h3>
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        onClick={() => toggleItem(value)}
        className={cn(
          'flex w-full items-center justify-between p-5 text-left font-medium text-foreground transition-all hover:text-primary cursor-pointer select-none',
          className
        )}
        {...props}
      >
        <span className="text-base font-semibold">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300',
            isOpen && 'rotate-180 text-foreground'
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  );
}

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  const { isOpen } = itemContext;

  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-in-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className="overflow-hidden">
        <div className={cn('px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed', className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
