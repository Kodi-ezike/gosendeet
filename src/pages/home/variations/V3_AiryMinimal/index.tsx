import Layout from "@/layouts/HomePageLayout";
import Hero from "./Hero";
import ProcessFlow from "./ProcessFlow";
import ServicesMinimal from "./ServicesMinimal";
import Benefits from "./Benefits";
import TestimonialsV3 from "./TestimonialsV3";
import FAQMinimal from "./FAQMinimal";
import "./v3-styles.css";

const V3_AiryMinimal = () => {
  return (
    <div className="v3-minimal-theme">
      <Layout>
        <Hero />
        <ProcessFlow />
        <ServicesMinimal />
        <Benefits />
        <TestimonialsV3 />
        <FAQMinimal />
      </Layout>
    </div>
  );
};

export default V3_AiryMinimal;
