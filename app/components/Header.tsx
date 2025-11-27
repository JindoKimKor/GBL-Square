export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[2.5px] border-[#dbe0e5] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">GB</span>
          </div>
          <span className="text-xl text-gray-900">GBL-Square</span>
        </div>

        {/* Navigation menu */}
        <div className="hidden md:flex items-center gap-8">
          <span>Product</span>
          <span>Pricing</span>
          <span>Documentation</span>
          <span>Blog</span>
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex items-center gap-6">
          <span>Login</span>
          <span>Sign up</span>
        </div>
      </nav>
    </header>
  );
}
