import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForToken,
  fetchBitbucketUser,
  findOrCreateBitbucketUser,
} from "@/lib/auth/bitbucket";
import { generateToken } from "@/lib/auth/jwt";
import { extractOAuthParams, createErrorRedirect } from "@/lib/auth/utils";

export async function GET(request: NextRequest) {
  const { code, error, state } = extractOAuthParams(request);
  const storedState = request.cookies.get("oauth_state")?.value;

  if (error || !code || !state || state !== storedState) {
    const errorType = error || (!code ? "missing_code" : "invalid_state");
    return createErrorRedirect(request, errorType);
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    const bitbucketUser = await fetchBitbucketUser(tokens.access_token);
    const user = await findOrCreateBitbucketUser(bitbucketUser);

    const sessionToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.set("token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60, // 1 minute for test
      path: "/",
    });

    response.cookies.delete("oauth_state");

    return response;
  } catch (err) {
    console.error("OAuth callback error:", err);
    return createErrorRedirect(request, "authentication_failed");
  }
}
