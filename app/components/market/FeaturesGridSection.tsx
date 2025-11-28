export default function FeaturesGridSection() {
  const FEATURES_GRID = [
    {
      icon: "⚡", // can replace with actual icon component or path
      title: "Automated Fast Builds and Tests",
      description: "No more 30-minute manual builds. Auto-build, test, and preview with one click.",
    },
    {
      icon: "🔗",
      title: "Deploy to LMS & Integration",
      description: "One-click setup for Moodle & D2L using LTI 1.3 standard.",
    },
    {
      icon: "📈",
      title: "LTI Dev Kit",
      description: "Make your content interactable with LMS: attendance tracking, grade pass-back, and more.",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {FEATURES_GRID.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 border-2 border-gray-400 rounded-xl flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-snug">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
