import { NextResponse } from "next/server";
import { getGitLabAuthUrl } from "@/lib/auth/gitlab";

/**
 * Redirect user to GitLab OAuth authorization page
 */
export async function GET() {
  const authUrl = getGitLabAuthUrl();
  return NextResponse.redirect(authUrl);
}

