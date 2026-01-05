import TermsConditions from "./Terms&Condition";
import Layout from "@/layouts/HomePageLayout";

const Terms = () => {
  return (
    <Layout>
      <div className="md:px-20 px-6 py-20 min-h-[300px] bg-orange-50 flex flex-col justify-center items-center ">
        <h1 className="lg:text-[46px] md:text-[36px] text-[30px] text-center font-clash font-semibold leading-[130%] mb-2">
          Terms of Service
        </h1>
      </div>
      <TermsConditions />
    </Layout>
  );
};

export default Terms;
