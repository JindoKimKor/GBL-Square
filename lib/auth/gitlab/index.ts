import { gitlabOAuthConfig } from "./config";
import { GitLabUser } from "./types";

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

/**
 * Fetch authenticated user data from GitLab API
 *
 * Task #60: Fetch user data from GitLab API
 *
 * Uses the access token to retrieve the authenticated user's profile
 * information from GitLab. Unlike GitHub, GitLab includes email directly
 * in the user endpoint response.
 *
 * Reference: https://docs.gitlab.com/ee/api/users.html#for-user
 */
export async function fetchGitLabUser(
  accessToken: string
): Promise<GitLabUser> {
  const response = await fetch(gitlabOAuthConfig.userApiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  // Handle API request failures
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const user = await response.json();

  // Extract and normalize user data structure
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar_url: user.avatar_url,
    name: user.name,
  };
}

// TODO: Task #61 - Add findOrCreateGitLabUser()
