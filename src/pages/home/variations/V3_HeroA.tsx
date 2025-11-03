import Layout from "@/layouts/HomePageLayout";
import HeroOptionA from "./V3_AiryMinimal/HeroOptionA";
import ProcessFlow from "./V3_AiryMinimal/ProcessFlow";
import ServicesMinimal from "./V3_AiryMinimal/ServicesMinimal";
import Benefits from "./V3_AiryMinimal/Benefits";
import TestimonialsV3 from "./V3_AiryMinimal/TestimonialsV3";
import FAQMinimal from "./V3_AiryMinimal/FAQMinimal";
import "./V3_AiryMinimal/v3-styles.css";

const V3_HeroA = () => {
  return (
    <div className="v3-minimal-theme">
      <Layout>
        <HeroOptionA />
        <ProcessFlow />
        <ServicesMinimal />
        <Benefits />
        <TestimonialsV3 />
        <FAQMinimal />
      </Layout>
    </div>
  );
};

export default V3_HeroA;
