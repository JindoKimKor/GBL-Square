import { getLandingPage } from "@/lib/contentful";
import HeroSection from "./components/market/HeroSection";
import FeaturesGridSection from "./components/market/FeaturesGridSection";

export default async function Home() {
  const data = await getLandingPage();

  return (
    <>
      <HeroSection
        headline={data.fields.heroHeadline}
        subheadline={data.fields.heroSubheadline}
        ctaButtonText={data.fields.heroCtaButtonText}
      />
      <FeaturesGridSection />
    </>
  );
}