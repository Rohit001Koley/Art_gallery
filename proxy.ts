import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Clickjacking protection
  response.headers.set("X-Frame-Options", "DENY");

  // 2. MIME sniffing prevention
  response.headers.set("X-Content-Type-Options", "nosniff");

  // 3. Referrer Policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 4. Force HTTPS (HSTS) - only in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // 5. Cross-Site Scripting protection (legacy header fallback)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // 6. Content Security Policy (CSP)
  // Allows fonts, unsplash images for gallery artworks, and standard scripts
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: blob: https://images.unsplash.com; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://maps.googleapis.com; " +
      "frame-src 'self';"
  );

  return response;
}

// Applies middleware to all pages and api routes, except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (meta files)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|documents/|press/).*)",
  ],
};
