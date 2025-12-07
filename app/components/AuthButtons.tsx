"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

/**
 * AuthButtons Component
 *
 * Displays login/signup buttons when user is not authenticated,
 * or user avatar and logout button when authenticated.
 * Fetches user data from /api/auth/me on mount.
 */
export default function AuthButtons() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * Fetches current user from /api/auth/me
   */
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles logout by calling /api/auth/logout and refreshing the page
   */
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show nothing while loading to prevent UI flash
  if (loading) {
    return <div className="w-24 h-8" />;
  }

  // Authenticated: show avatar and logout
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || "User avatar"}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {user.name?.[0] || user.email[0].toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-gray-700 text-sm hidden sm:block">
            {user.name || user.email}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#0066FF] text-white rounded-md hover:bg-[#0052CC] transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    );
  }

  // Not authenticated: show login and signup
  return (
    <>
      <Link
        href="/login"
        className="text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-[#0066FF] text-white rounded-md hover:bg-[#0052CC] transition-colors duration-200 font-medium"
      >
        Sign up
      </Link>
    </>
  );
}
