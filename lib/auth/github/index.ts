import { githubOAuthConfig } from "./config";

/**
 * Generate the URL to redirect users to GitHub OAuth authorization page
 *
 * OAuth Flow Step 1: Request a user's GitHub identity
 * Reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
 */
export function getGitHubAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: githubOAuthConfig.clientId,
    redirect_uri: githubOAuthConfig.redirectUri,
    scope: githubOAuthConfig.scope,
  });

  return `${githubOAuthConfig.authorizationUrl}?${params.toString()}`;
}
