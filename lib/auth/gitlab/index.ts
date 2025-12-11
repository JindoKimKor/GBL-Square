import { gitlabOAuthConfig } from "./config";

/**
 * Generate the URL to redirect users to GitLab OAuth authorization page
 *
 * OAuth Flow Step 1: Request a user's GitLab identity
 * Reference: https://docs.gitlab.com/ee/api/oauth2.html#authorization-code-flow
 */
export function getGitLabAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: gitlabOAuthConfig.clientId,
    redirect_uri: gitlabOAuthConfig.redirectUri,
    response_type: "code",
    scope: gitlabOAuthConfig.scope,
  });

  return `${gitlabOAuthConfig.authorizationUrl}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 *
 * Task #59: Exchange authorization code for GitLab access token
 *
 * Takes the temporary authorization code from GitLab and exchanges it
 * for an access token that can be used to access GitLab API.
 *
 * Reference: https://docs.gitlab.com/ee/api/oauth2.html#authorization-code-flow
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch(gitlabOAuthConfig.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: gitlabOAuthConfig.clientId,
      client_secret: gitlabOAuthConfig.clientSecret,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: gitlabOAuthConfig.redirectUri,
    }),
  });

  // Handle HTTP errors (network issues, server errors, etc.)
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  const data = await response.json();

  // Handle OAuth-specific errors from GitLab
  if (data.error) {
    throw new Error(
      `GitLab OAuth error: ${data.error_description || data.error}`
    );
  }

  // Return the access token for API requests
  return data.access_token;
}

// TODO: Task #60 - Add fetchGitLabUser()
// TODO: Task #61 - Add findOrCreateGitLabUser()
