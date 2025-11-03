import Layout from "@/layouts/HomePageLayout";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import Services from "./Services";
import FAQ from "./FAQ";
import "./v1-styles.css";

const V1_PremiumDark = () => {
  return (
    <div className="v1-dark-theme">
      <Layout>
        <Hero />
        <StatsBar />
        <Services />
        <FAQ />
      </Layout>
    </div>
  );
};

export default V1_PremiumDark;
