import { Session } from 'next-auth';

export type UserRole = 'user' | 'editor' | 'admin';

/**
 * Checks if the current session belongs to an Admin.
 */
export function isAdmin(session: Session | null | undefined): boolean {
  if (!session?.user) return false;
  const role = (session.user as any)?.role;
  return role === 'admin';
}

/**
 * Checks if the current session belongs to either an Editor or an Admin.
 */
export function isEditorOrAdmin(session: Session | null | undefined): boolean {
  if (!session?.user) return false;
  const role = (session.user as any)?.role;
  return role === 'admin' || role === 'editor';
}

/**
 * Returns the sanitized role from the session.
 */
export function getUserRole(session: Session | null | undefined): UserRole {
  if (!session?.user) return 'user';
  const role = (session.user as any)?.role;
  if (role === 'admin' || role === 'editor') return role;
  return 'user';
}
