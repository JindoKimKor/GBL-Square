import HeroAuthForm from "./HeroAuthForm";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaButtonText: string;
}

/**
 * HeroSection Component (Server)
 *
 * Renders hero content from Contentful CMS.
 * SEO-optimized: headline and subheadline are server-rendered.
 */
export default function HeroSection({
  headline,
  subheadline,
  ctaButtonText,
}: HeroSectionProps) {
  return (
    <section className="w-full bg-gray-50 py-20 flex justify-center">
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {headline}
        </h1>

        <p className="text-gray-600 mt-4 text-lg">{subheadline}</p>

        <HeroAuthForm ctaButtonText={ctaButtonText} />
      </div>
    </section>
  );
}
