import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 *
 * Logs out the current user by clearing the auth cookie.
 * Sets the cookie's maxAge to 0 to immediately expire it.
 *
 * @returns {object} { success: true } on success
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
