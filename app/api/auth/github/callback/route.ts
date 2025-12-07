import { NextRequest, NextResponse } from "next/server";
import { extractOAuthParams, createErrorRedirect } from "@/lib/auth/utils";
import {
  exchangeCodeForToken,
  fetchGitHubUser,
  findOrCreateGitHubUser,
} from "@/lib/auth/github";
import { generateToken } from "@/lib/auth/jwt";

/**
 * GitHub OAuth Callback Handler
 *
 * Receives authorization code from GitHub after user authorizes the app.
 * Reference: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
 */
export async function GET(request: NextRequest) {
  const { code, error } = extractOAuthParams(request);

  if (error) {
    return createErrorRedirect(request, error);
  }

  if (!code) {
    return createErrorRedirect(request, "missing_code");
  }

  try {
    const accessToken = await exchangeCodeForToken(code);
    const githubUser = await fetchGitHubUser(accessToken);
    const user = await findOrCreateGitHubUser(githubUser);

    // Task #54: Generate JWT and set cookie
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Create response with redirect
    const response = NextResponse.redirect(
      new URL("/?auth=success", request.url)
    );

    // Set HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60, // 1 minute for testing
      path: "/",
    });

    console.log("JWT token set in cookie");

    return response;
  } catch (err) {
    console.error("OAuth error:", err);
    return createErrorRedirect(request, "token_exchange_failed");
  }
}
