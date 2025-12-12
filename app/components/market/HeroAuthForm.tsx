"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface HeroAuthFormProps {
  ctaButtonText: string;
}

/**
 * HeroAuthForm Component (Client)
 *
 * Handles authentication state and displays:
 * - Sign-up form for unauthenticated users
 * - Welcome message for authenticated users
 */
export default function HeroAuthForm({ ctaButtonText }: HeroAuthFormProps) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Valid email:", email);
  };

  const handleOAuthLogin = (provider: string) => {
    switch (provider) {
      case "GH":
        window.location.href = "/api/auth/github";
        break;
      case "GL":
        window.location.href = "/api/auth/gitlab";
        break;
      case "BB":
        window.location.href = "/api/auth/bitbucket";
      default:
        console.log(`${provider} OAuth not implemented yet`);
    }
  };

  if (loading) {
    return <div className="mt-10 h-24" />;
  }

  if (user) {
    return (
      <div className="mt-10">
        <p className="text-2xl font-semibold text-gray-800">Welcome back, {user.name || user.email}!</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-3 w-72 sm:w-80 focus:outline-none text-black focus:ring-2"
          />
          <button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-orange-400 to-pink-500 hover:opacity-90 active:scale-95 active:shadow-none text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-sm transition-all duration-150"
          >
            <span>{ctaButtonText}</span>
            <span>→</span>
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center mt-4">
        <p className="text-gray-500 text-sm mb-2">Or sign up with</p>
        <div className="flex items-center space-x-3">
          {["GH", "GL", "BB"].map((provider) => (
            <button
              key={provider}
              onClick={() => handleOAuthLogin(provider)}
              className="border px-3 py-1 cursor-pointer rounded-md text-gray-600 hover:bg-gray-100 active:scale-95 transition-all duration-150"
            >
              {provider}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
