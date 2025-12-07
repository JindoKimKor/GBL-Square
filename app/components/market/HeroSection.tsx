"use client";

import { useState } from "react";
import { getGitHubAuthUrl } from "@/lib/auth/github";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const HERO_TEXT = {
    titleLine1: "CI/CD for Game-Based Learning Contents",
    titleLine2: "& Simulations",

    subtitleLine1:
      "One tool to build, deploy, and create LMS-interactable content — seamlessly integrated with",
    subtitleLine2: "Moodle & D2L.",

    inputPlaceholder: "Enter your email...",

    cta: {
      label: "Get Started",
      icon: "→",
      ariaLabel: "Get started and begin using the platform",
    },

    social: {
      prompt: "Or sign up with",
      providers: ["GH", "GL", "BB"],
    },
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    console.log("Valid email:", email);
  };

  const handleOAuthLogin = (provider: string) => {
    switch (provider) {
      case "GH":
        window.location.href = getGitHubAuthUrl();
        break;
      // case "GL":
      // case "BB":
      default:
        console.log(`${provider} OAuth not implemented yet`);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-20 flex justify-center">
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {HERO_TEXT.titleLine1}
          <br />
          {HERO_TEXT.titleLine2}
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          {HERO_TEXT.subtitleLine1}
          <br />
          {HERO_TEXT.subtitleLine2}
        </p>
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={handleEmailChange}
                className={`border rounded-lg px-4 py-3 w-72 sm:w-80 focus:outline-none text-black focus:ring-2`}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r cursor-pointer from-orange-400 to-pink-500 hover:opacity-90 active:scale-95 active:shadow-none text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-sm transition-all duration-150"
            >
              <span>{HERO_TEXT.cta.label}</span>
              <span>{HERO_TEXT.cta.icon}</span>
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-500 text-sm mb-2">
            {HERO_TEXT.social.prompt}
          </p>
          <div className="flex items-center space-x-3">
            {HERO_TEXT.social.providers.map((provider) => (
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
      </div>
    </section>
  );
}
