/**
 * GitLab OAuth user data structure
 *
 * Task #60: Fetch user data from GitLab API
 * Reference: https://docs.gitlab.com/ee/api/users.html#for-user
 */
export interface GitLabUser {
  id: number;
  username: string;  // GitLab uses 'username' (different from GitHub's 'login')
  email: string | null;
  avatar_url: string;
  name: string | null;
}

