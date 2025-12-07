import { NextRequest } from "next/server";
import {
  extractOAuthParams,
  createErrorRedirect,
  createSuccessRedirect,
} from "@/lib/auth/utils";

/**
 * GitHub OAuth Callback Handler
 *
 * Receives authorization code from GitHub after user authorizes the app.
 * Reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
 */
export async function GET(request: NextRequest) {
  // Extract OAuth parameters (common logic)
  const { code, error } = extractOAuthParams(request);

  // Handle OAuth errors (e.g., user denied access)
  if (error) {
    return createErrorRedirect(request, error);
  }

  // Validate code exists
  if (!code) {
    return createErrorRedirect(request, "missing_code");
  }

  // TODO: Exchange code for access token (Task #51)
  // TODO: Fetch user data (Task #52)
  // TODO: Create/update user in DB (Task #53)
  // TODO: Generate JWT and set cookie (Task #54)

  // Temporary: redirect to home with success indicator
  return createSuccessRedirect(request, "/?auth=success");
}
