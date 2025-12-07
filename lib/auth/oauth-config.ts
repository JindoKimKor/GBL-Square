/**
 * GitHub OAuth Configuration
 *
 * Reference Documentation:
 * - OAuth Flow: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
 * - Scopes: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
 * - User API: https://docs.github.com/en/rest/users/users#get-the-authenticated-user
 * - Emails API: https://docs.github.com/en/rest/users/emails#list-email-addresses-for-the-authenticated-user
 */
export const githubOAuthConfig = {
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,

  // GitHub OAuth URLs
  authorizationUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  userApiUrl: "https://api.github.com/user",
  userEmailsUrl: "https://api.github.com/user/emails",

  // OAuth settings
  scope: "user:email",

  // Callback URL
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
};
