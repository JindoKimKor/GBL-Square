import { NextRequest, NextResponse } from "next/server";
import { extractOAuthParams, createErrorRedirect } from "@/lib/auth/utils";
import { exchangeCodeForToken, fetchGitLabUser } from "@/lib/auth/gitlab";

/**
 * GitLab OAuth Callback Handler
 *
 * Task #58-60: Create callback endpoint, token exchange, and user data fetch
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

    // Remaining tasks:
    // - Task #61: Save/update user in database
    // - Task #62: Generate JWT and redirect to home

    return NextResponse.json({
      message: "User data fetched successfully",
      user: {
        id: gitlabUser.id,
        username: gitlabUser.username,
        email: gitlabUser.email,
        name: gitlabUser.name
      }
    });
  } catch (err) {
    // Handle token exchange errors (network, invalid code, etc.)
    console.error("GitLab OAuth error:", err);
    return createErrorRedirect(request, "token_exchange_failed");
  }
}

