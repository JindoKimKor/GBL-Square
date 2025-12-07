import { githubOAuthConfig } from "./config";
import { GitHubUser } from "./types";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

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

/**
 * Exchange authorization code for access token
 *
 * OAuth Flow Step 2: Exchange code for token
 * Reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch(githubOAuthConfig.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: githubOAuthConfig.clientId,
      client_secret: githubOAuthConfig.clientSecret,
      code: code,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      `GitHub OAuth error: ${data.error_description || data.error}`
    );
  }

  return data.access_token;
}

/**
 * Fetch authenticated user data from GitHub API
 *
 * Reference: https://docs.github.com/en/rest/users/users#get-the-authenticated-user
 */
export async function fetchGitHubUser(
  accessToken: string
): Promise<GitHubUser> {
  const response = await fetch(githubOAuthConfig.userApiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const user = await response.json();

  // If email is null, fetch from /user/emails endpoint
  let email = user.email;
  if (!email) {
    email = await fetchPrimaryEmail(accessToken);
  }

  return {
    id: user.id,
    login: user.login,
    email: email,
    avatar_url: user.avatar_url,
    name: user.name,
  };
}

/**
 * Fetch primary email from GitHub (for users with private emails)
 *
 * Reference: https://docs.github.com/en/rest/users/emails#list-email-addresses-for-the-authenticated-user
 */
async function fetchPrimaryEmail(accessToken: string): Promise<string | null> {
  const response = await fetch(githubOAuthConfig.userEmailsUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const emails = await response.json();
  const primary = emails.find(
    (e: { primary: boolean; email: string }) => e.primary
  );

  return primary?.email || emails[0]?.email || null;
}

/**
 * Create or update user in database from GitHub OAuth data
 * 
 * - Creates new user if not exists (by oauthProvider + oauthId)
 * - Updates existing user's profile data on login
 */
export async function findOrCreateGitHubUser(githubUser: GitHubUser): Promise<User> {
  const user = await prisma.user.upsert({
    where: {
      oauthProvider_oauthId: {
        oauthProvider: 'github',
        oauthId: String(githubUser.id),
      },
    },
    update: {
      email: githubUser.email || undefined,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
    },
    create: {
      email: githubUser.email || `${githubUser.id}@github.oauth`,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
      oauthProvider: 'github',
      oauthId: String(githubUser.id),
    },
  });

  return user;
}