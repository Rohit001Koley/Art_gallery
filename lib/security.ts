/**
 * Escapes HTML control characters to prevent Cross-Site Scripting (XSS).
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates global phone number format.
 */
export function isValidPhone(phone: string): boolean {
  // Allows optional +, spaces, dashes, parentheses, and 7 to 20 digits
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Checks for CSRF protection headers.
 * Next.js handles CORS automatically, but this verifies origin matching.
 */
export function verifyCsrf(origin: string | null, host: string | null): boolean {
  if (!origin || !host) return true; // Standard browser client checks
  const cleanOrigin = origin.replace(/^https?:\/\//, "");
  return cleanOrigin === host;
}
