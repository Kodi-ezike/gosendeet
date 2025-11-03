import { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/layouts/HomePageLayout";
import Header from "./landing/Header";
import Tracking from "./landing/Tracking";
import Schedule from "./landing/Schedule";
import CarouselPage from "./landing/ScheduleCarousel";
import ServiceComparison from "./landing/ServiceComparison";
import FAQ from "./landing/FAQ";
import VariationSwitcher from "./components/VariationSwitcher";

// Lazy load variation components for better performance
const V1_PremiumDark = lazy(() => import("./variations/V1_PremiumDark"));
const V2_BoldContrast = lazy(() => import("./variations/V2_BoldContrast"));
const V3_AiryMinimal = lazy(() => import("./variations/V3_AiryMinimal"));
const V3_HeroA = lazy(() => import("./variations/V3_HeroA"));
const V3_HeroB = lazy(() => import("./variations/V3_HeroB"));
const V3_HeroC = lazy(() => import("./variations/V3_HeroC"));

// Current/existing design component
const CurrentDesign = () => {
  return (
    <Layout>
      <Header />
      <Tracking />
      <Schedule />
      <CarouselPage />
      <ServiceComparison />
      <FAQ />
    </Layout>
  );
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get variation from URL param, localStorage, or default to current design
  const getInitialVariation = () => {
    const urlVariation = searchParams.get("variation");
    if (urlVariation) return urlVariation;

    const stored = localStorage.getItem("homepage-variation");
    return stored || "current"; // "current" = existing design
  };

  const [variation, setVariation] = useState(getInitialVariation());

  // Update localStorage when variation changes
  useEffect(() => {
    localStorage.setItem("homepage-variation", variation);

    // Update URL param if not already set
    if (variation !== "current" && searchParams.get("variation") !== variation) {
      setSearchParams({ variation });
    } else if (variation === "current" && searchParams.get("variation")) {
      setSearchParams({});
    }
  }, [variation, searchParams, setSearchParams]);

  // Handle variation change from switcher
  const handleVariationChange = (newVariation: string) => {
    setVariation(newVariation);
  };

  // Render appropriate variation
  const renderVariation = () => {
    switch (variation) {
      case "v1":
        return <V1_PremiumDark />;
      case "v2":
        return <V2_BoldContrast />;
      case "v3":
        return <V3_AiryMinimal />;
      case "v3-hero-a":
        return <V3_HeroA />;
      case "v3-hero-b":
        return <V3_HeroB />;
      case "v3-hero-c":
        return <V3_HeroC />;
      case "current":
      default:
        return <CurrentDesign />;
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading homepage...</p>
            </div>
          </div>
        }
      >
        {renderVariation()}
      </Suspense>

      {/* Variation Switcher (Dev Mode Only) */}
      <VariationSwitcher
        currentVariation={variation}
        onVariationChange={handleVariationChange}
      />
    </>
  );
};

export default Home;
