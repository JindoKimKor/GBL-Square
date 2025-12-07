/**
 * GitHub OAuth user data structure
 *
 * Reference: https://docs.github.com/en/rest/users/users#get-the-authenticated-user
 */
export interface GitHubUser {
  id: number;
  login: string;
  email: string | null;
  avatar_url: string;
  name: string | null;
}
