/**
 * GitLab OAuth Configuration
 *
 * Reference Documentation:
 * - OAuth Flow: https://docs.gitlab.com/ee/api/oauth2.html
 * - Scopes: https://docs.gitlab.com/ee/integration/oauth_provider.html#authorized-applications
 * - User API: https://docs.gitlab.com/ee/api/users.html#for-user
 *
 * Note: Unlike GitHub, GitLab's /user endpoint always includes email in the response,
 * so a separate emails API endpoint is not needed.
 */
export const gitlabOAuthConfig = {
  clientId: process.env.GITLAB_CLIENT_ID!,
  clientSecret: process.env.GITLAB_CLIENT_SECRET!,

  // GitLab OAuth URLs
  authorizationUrl: "https://gitlab.com/oauth/authorize",
  tokenUrl: "https://gitlab.com/oauth/token",
  userApiUrl: "https://gitlab.com/api/v4/user",

  // OAuth settings
  scope: "read_user",

  // Callback URL
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/gitlab/callback`,
};

