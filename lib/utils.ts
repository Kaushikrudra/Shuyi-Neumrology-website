/**
 * Utility function to conditionally join CSS class names.
 * Pure TypeScript implementation without external dependencies.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
