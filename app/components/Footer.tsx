import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Top section with logo and tagline */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-white font-bold text-sm">GB</span>
              </div>
              <span className="text-xl text-gray-900">GBL-Square</span>
            </div>
            <p className="text-gray-600">CI/CD for Game-Based Learning</p>
          </div>

          {/* Four-column grid structure */}
          <div className="grid grid-cols-4 gap-8 md:col-span-4">
            {/* Product column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Product</h3>
              <Link
                href="/features"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/changelog"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Changelog
              </Link>
              <Link
                href="/roadmap"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Roadmap
              </Link>
            </div>

            {/* Resources column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Resources</h3>
              <Link
                href="/documentation"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/api-reference"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                API Reference
              </Link>
              <Link
                href="/tutorials"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Tutorials
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Blog
              </Link>
            </div>

            {/* Community column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Community</h3>
              <Link
                href="/discord"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Discord
              </Link>
              <Link
                href="/github"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="/twitter"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="/support"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Support
              </Link>
            </div>

            {/* Company column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Company</h3>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                About
              </Link>
              <Link
                href="/careers"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row container */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4 md:gap-0 mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            © 2025 GBL-Square. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-settings"
              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
