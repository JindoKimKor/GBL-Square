import { NextRequest, NextResponse } from "next/server";
import { extractOAuthParams, createErrorRedirect } from "@/lib/auth/utils";
import {
  exchangeCodeForToken,
  fetchGitLabUser,
  findOrCreateGitLabUser,
} from "@/lib/auth/gitlab";

/**
 * GitLab OAuth Callback Handler
 *
 * Task #58-61: Create callback, token exchange, user data fetch, and DB persistence
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

    // Remaining task:
    // - Task #62: Generate JWT and redirect to home

    return NextResponse.json({
      message: "User saved to database successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        oauthProvider: user.oauthProvider
      }
    });
  } catch (err) {
    // Handle token exchange errors (network, invalid code, etc.)
    console.error("GitLab OAuth error:", err);
    return createErrorRedirect(request, "token_exchange_failed");
  }
}

