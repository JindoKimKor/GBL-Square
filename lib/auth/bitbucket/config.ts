export const bitbucketConfig = {
  clientId: process.env.BITBUCKET_CLIENT_ID!,
  clientSecret: process.env.BITBUCKET_CLIENT_SECRET!,

  // Bitbucket OAuth URLs
  authorizationUrl: "https://bitbucket.org/site/oauth2/authorize",
  tokenUrl: "https://bitbucket.org/site/oauth2/access_token",
  userApiUrl: "https://api.bitbucket.org/2.0/user",
  userEmailsUrl: "https://api.bitbucket.org/2.0/user/emails",

  // OAuth settings
  scope: "account email",

  // Callback URL
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/bitbucket/callback`,
};
