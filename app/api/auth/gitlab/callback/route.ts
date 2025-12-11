import { NextRequest, NextResponse } from "next/server";
import { extractOAuthParams, createErrorRedirect } from "@/lib/auth/utils";

/**
 * GitLab OAuth Callback Handler
 *
 * Task #58: Create GitLab callback route handler
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

  // Task #58 scope: Endpoint created, code extracted and validated
  // Remaining tasks will add the full OAuth flow here:
  // - Task #59: Exchange code for access token
  // - Task #60: Fetch user data from GitLab API
  // - Task #61: Save/update user in database
  // - Task #62: Generate JWT and redirect to home

  return NextResponse.json({
    message: "GitLab callback endpoint created",
    code: code.substring(0, 10) + "..."
  });
}

