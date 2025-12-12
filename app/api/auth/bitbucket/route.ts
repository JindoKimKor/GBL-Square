import { NextResponse } from "next/server";
import { getBitbucketAuthUrl } from "@/lib/auth/bitbucket";
import crypto from "crypto";

/**
 * Redirect user to Bitbucket OAuth authorization page
 */
export async function GET() {
  // Generate random state for CSRF protection
  const state = crypto.randomBytes(32).toString("hex");

  const authUrl = getBitbucketAuthUrl(state);

  const response = NextResponse.redirect(authUrl);

  // Store state in httpOnly cookie for validation in callback
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return response;
}
