import Layout from "@/layouts/HomePageLayout";
import Header from "./components/Header";
import Questions from "./components/Questions";
import Answers from "./components/Answers";

const FAQ = () => {
  return (
    <Layout>
      <Header />
      <Questions />
      <Answers />
    </Layout>
  );
};

export default FAQ;
