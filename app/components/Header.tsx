import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import AuthButtons from "./AuthButtons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[2.5px] border-[#dbe0e5] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav
        className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-white font-bold text-sm">GB</span>
          </div>
          <span className="text-xl text-gray-900">GBL-Square</span>
        </div>

        {/* Navigation menu */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <span className="flex items-center gap-1">
              Product
              <FaChevronDown className="w-3 h-3" aria-hidden="true" />
            </span>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li>
            <Link href="/documentation">Documentation</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>

        {/* Action buttons - Client Component */}
        <div
          className="hidden md:flex items-center gap-6"
          role="group"
          aria-label="User actions"
        >
          <AuthButtons />
        </div>
      </nav>
    </header>
  );
}
