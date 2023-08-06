import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function rateLimit(identifier: string) {
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // user can make 10 requests in 10s window
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });

  return await ratelimit.limit(identifier);
}
