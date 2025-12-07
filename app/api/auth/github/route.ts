import { NextResponse } from "next/server";
import { getGitHubAuthUrl } from "@/lib/auth/github";

/**
 * Redirect user to GitHub OAuth authorization page
 */
export async function GET() {
  const authUrl = getGitHubAuthUrl();
  return NextResponse.redirect(authUrl);
}
