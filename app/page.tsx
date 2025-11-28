import { getLandingPage } from "@/lib/contentful";
import HeroSection from "./components/market/HeroSection";
import FeaturesGridSection from "./components/market/FeaturesGridSection";

export default async function Home() {
  const data = await getLandingPage();

  return (
    <>
      <HeroSection />
      <FeaturesGridSection />
      {/* <h1 className="text-4xl font-bold">{data.fields.heroHeadline}</h1>
      <p className="text-xl mt-4">{data.fields.heroSubheadline}</p>
      <pre className="mt-8 bg-black text-white p-4 rounded">{JSON.stringify(data.fields, null, 2)}</pre> */}
    </>
  );
}
