type RateLimitInfo = {
  count: number;
  resetTime: number;
};

const cache = new Map<string, RateLimitInfo>();

/**
 * Basic in-memory rate limiter for serverless environment validation.
 * @param key Unique key to identify the request source (e.g. IP or session ID)
 * @param limit Maximum number of requests allowed
 * @param durationMs Time window in milliseconds
 */
export function rateLimit(
  key: string,
  limit = 10,
  durationMs = 60000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const info = cache.get(key);

  if (!info) {
    cache.set(key, { count: 1, resetTime: now + durationMs });
    return { success: true, remaining: limit - 1, reset: now + durationMs };
  }

  // If time window has expired, reset
  if (now > info.resetTime) {
    info.count = 1;
    info.resetTime = now + durationMs;
    return { success: true, remaining: limit - 1, reset: now + durationMs };
  }

  info.count += 1;
  const remaining = Math.max(0, limit - info.count);

  return {
    success: info.count <= limit,
    remaining,
    reset: info.resetTime,
  };
}
