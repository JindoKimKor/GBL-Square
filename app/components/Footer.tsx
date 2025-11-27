export default function Footer() {
  return (
    <footer>
      <div className="container">
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
      </div>
    </footer>
  );
}
