import { NextRequest } from "next/server";
import {
  extractOAuthParams,
  createErrorRedirect,
  createSuccessRedirect,
} from "@/lib/auth/utils";
import {
  exchangeCodeForToken,
  fetchGitHubUser,
  findOrCreateGitHubUser,
} from "@/lib/auth/github";

/**
 * GitHub OAuth Callback Handler
 *
 * Receives authorization code from GitHub after user authorizes the app.
 * Reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
 */
export async function GET(request: NextRequest) {
  const { code, error } = extractOAuthParams(request);

  if (error) {
    return createErrorRedirect(request, error);
  }

  if (!code) {
    return createErrorRedirect(request, "missing_code");
  }

  try {
    // Task #51: Exchange code for access token
    const accessToken = await exchangeCodeForToken(code);

    // Task #52: Fetch user data from GitHub
    const githubUser = await fetchGitHubUser(accessToken);

    // Task #53: Create or update user in database
    const user = await findOrCreateGitHubUser(githubUser);

    // TODO: Task #54 - Generate JWT

    // Temporary: log user data
    console.log("User saved:", user);

    return createSuccessRedirect(request, "/?auth=success");
  } catch (err) {
    console.error("OAuth error:", err);
    return createErrorRedirect(request, "token_exchange_failed");
  }
}
