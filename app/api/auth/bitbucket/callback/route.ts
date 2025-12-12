import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, fetchBitbucketUser, findOrCreateBitbucketUser } from "@/lib/auth/bitbucket";
import { generateToken } from "@/lib/auth/jwt";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");
  const storedState = request.cookies.get("oauth_state")?.value;

  if (error || !code || !state || state !== storedState) {
    const errorType = error || (!code ? "missing_code" : "invalid_state");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=${errorType}`);
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    const bitbucketUser = await fetchBitbucketUser(tokens.access_token);
    const user = await findOrCreateBitbucketUser(bitbucketUser);

    const sessionToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);

    response.cookies.set("bitbucket_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.delete("oauth_state");

    return response;
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=authentication_failed`);
  }
}
