import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Supabase Authentication Middleware
 *
 * This middleware handles authentication and authorization for the application:
 *
 * 1. Refreshes Supabase auth tokens on every request
 * 2. Redirects authenticated users away from auth pages (signin, reset-password) to dashboard
 * 3. Redirects unauthenticated users away from protected pages to signin
 * 4. Special handling for update-password page (requires valid session from reset link)
 * 5. Allows public pages to be accessed without authentication checks
 *
 * Redirect Rules:
 * - Authenticated user visits /signin or /reset-password → redirected to /dashboard
 * - Unauthenticated user visits /dashboard → redirected to /signin
 * - Unauthenticated user visits /update-password → redirected to /signin
 * - Public pages (/, /blog, /privacy-policy, /tos, /api/*) → no redirects
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define auth pages that authenticated users shouldn't access
  const authPages = ['/signin', '/reset-password', '/magic-link'];

  // Define protected pages that require authentication
  const protectedPages = ['/dashboard'];

  // Define public pages that don't require authentication checks
  const publicPages = ['/', '/blog', '/privacy-policy', '/tos', '/api'];

  // Skip middleware for public pages and API routes
  if (
    publicPages.some((page) => pathname === page || pathname.startsWith(page))
  ) {
    return supabaseResponse;
  }

  // Special handling for update-password page
  // Allow access only if user has a valid session (coming from reset link)
  if (pathname === '/update-password') {
    if (!user) {
      // No user session, redirect to signin
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    // User has session, allow access (they came from reset link)
    return supabaseResponse;
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (user && authPages.includes(pathname)) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // If user is not authenticated and trying to access protected pages, redirect to signin
  if (!user && protectedPages.some((page) => pathname.startsWith(page))) {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
