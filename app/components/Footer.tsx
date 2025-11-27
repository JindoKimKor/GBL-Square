import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container">
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
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/changelog">Changelog</Link>
              <Link href="/roadmap">Roadmap</Link>
            </div>

            {/* Resources column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Resources</h3>
              <Link href="/documentation">Documentation</Link>
              <Link href="/api-reference">API Reference</Link>
              <Link href="/tutorials">Tutorials</Link>
              <Link href="/blog">Blog</Link>
            </div>

            {/* Community column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Community</h3>
              <Link href="/discord">Discord</Link>
              <Link href="/github">GitHub</Link>
              <Link href="/twitter">Twitter</Link>
              <Link href="/support">Support</Link>
            </div>

            {/* Company column */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900">Company</h3>
              <Link href="/about">About</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>

        {/* Bottom row container */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            © 2025 GBL-Square. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link
              href="/cookie-settings"
              className="text-gray-600 hover:text-gray-900"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
