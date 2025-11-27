export default function Footer() {
  return (
    <footer>
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
            <div>{/* Product column */}</div>
            <div>{/* Resources column */}</div>
            <div>{/* Community column */}</div>
            <div>{/* Company column */}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
