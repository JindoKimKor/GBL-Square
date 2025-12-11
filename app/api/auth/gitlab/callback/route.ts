import { NextRequest, NextResponse } from "next/server";
import { extractOAuthParams, createErrorRedirect } from "@/lib/auth/utils";
import {
  exchangeCodeForToken,
  fetchGitLabUser,
  findOrCreateGitLabUser,
} from "@/lib/auth/gitlab";
import { generateToken } from "@/lib/auth/jwt";

/**
 * GitLab OAuth Callback Handler
 *
 * Task #58-62: Complete GitLab OAuth flow with JWT generation
 *
 * This endpoint receives the OAuth redirect from GitLab after user authorization.
 * GitLab redirects to: /api/auth/gitlab/callback?code=AUTHORIZATION_CODE
 *
 * Reference: https://docs.gitlab.com/ee/api/oauth2.html#authorization-code-flow
 */
export async function GET(request: NextRequest) {
  // Extract OAuth parameters from query string
  // Returns: { code: string | null, error: string | null }
  const { code, error } = extractOAuthParams(request);

  // Handle OAuth denial: user clicked "Cancel" on GitLab auth page
  if (error) {
    return createErrorRedirect(request, error);
  }

  // Handle missing code: malformed callback or direct access
  if (!code) {
    return createErrorRedirect(request, "missing_code");
  }

  try {
    // Task #59: Exchange authorization code for access token
    const accessToken = await exchangeCodeForToken(code);

    // Task #60: Fetch user data from GitLab API
    const gitlabUser = await fetchGitLabUser(accessToken);

    // Task #61: Create or update user in database
    const user = await findOrCreateGitLabUser(gitlabUser);

    // Task #62: Generate JWT and set cookie
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Create response with redirect to home page
    const response = NextResponse.redirect(new URL("/", request.url));

    // Set HttpOnly cookie with JWT token
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60, // 1 minute for testing
      path: "/",
    });

    console.log("GitLab authentication successful - JWT token set in cookie");

    return response;
  } catch (err) {
    // Handle OAuth flow errors (network, invalid code, API failures, etc.)
    console.error("GitLab OAuth error:", err);
    return createErrorRedirect(request, "token_exchange_failed");
  }
}

