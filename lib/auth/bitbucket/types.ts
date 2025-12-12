/**
 * Bitbucket OAuth user data structure
 *
 * Reference: https://developer.atlassian.com/cloud/bitbucket/rest/api-group-users/#api-user-get
 */
export interface BitbucketUser {
  uuid: string;           // Unique identifier with curly braces like {123e4567-e89b-12d3-a456-426614174000}
  username: string;       // Display name/username
  display_name: string;   // Full display name
  account_id: string;     // Account ID
  links: {
    avatar: {
      href: string;      // Avatar URL
    };
  };
}

/**
 * Bitbucket OAuth token response structure
 */
export interface BitbucketTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scopes: string;
}

/**
 * Bitbucket email response structure
 */
export interface BitbucketEmail {
  email: string;
  is_primary: boolean;
  is_confirmed: boolean;
  type: string;
}
