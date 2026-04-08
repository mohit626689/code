import { NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://also-secret.upstash.io",
  token: "SECRET_AH_AH_AH",
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
});

export default async function middleware(request) {
  const ip = request.ip ?? "127.0.0.1";

  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/blocked", request.url));
}

export const config = {
  matcher: "/api/auth/signin/email",
};
