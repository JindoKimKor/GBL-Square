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

