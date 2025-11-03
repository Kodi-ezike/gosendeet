import Layout from "@/layouts/HomePageLayout";
import Hero from "./Hero";
import StatsHero from "./StatsHero";
import LogoShowcase from "./LogoShowcase";
import ServiceGrid from "./ServiceGrid";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import "./v2-styles.css";

const V2_BoldContrast = () => {
  return (
    <div className="v2-bold-theme">
      <Layout>
        <Hero />
        <StatsHero />
        <LogoShowcase />
        <ServiceGrid />
        <Testimonials />
        <FAQ />
      </Layout>
    </div>
  );
};

export default V2_BoldContrast;
