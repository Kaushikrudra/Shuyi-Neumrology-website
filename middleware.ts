import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = await getToken({
      req,
      secret:
        process.env.NEXTAUTH_SECRET ||
        'shuyi-super-secret-key-change-in-production-2026',
    });

    // If not logged in, redirect to login with Unauthorized message
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('error', 'Unauthorized');
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = token.role as string | undefined;

    // If role is "user" or undefined (neither admin nor editor), redirect to home with Unauthorized
    if (role !== 'admin' && role !== 'editor') {
      const homeUrl = new URL('/', req.url);
      homeUrl.searchParams.set('error', 'Unauthorized');
      return NextResponse.redirect(homeUrl);
    }

    // If trying to access admin-only route like /admin/users, block non-admins
    if (pathname.startsWith('/admin/users') && role !== 'admin') {
      const adminUrl = new URL('/admin', req.url);
      adminUrl.searchParams.set('error', 'Forbidden');
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
