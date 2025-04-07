import question from "@/assets/icons/question.png";

const Questions = () => {
  return (
    <div className="md:px-20 px-6 py-20 bg-neutral400">
      <h2 className="lg:text-[40px] text-[30px] font-clash font-semibold leading-[130%] mb-12">
        Most Asked{" "}
        <span className="font-tiempos font-normal italic">Questions</span>{" "}
      </h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 md:gap-y-12 gap-y-6">
        <div className="bg-purple300 flex flex-col gap-2 md:p-8 p-4">
            <img src={question} alt="question" className="w-[25px]"/>
            <h3 className="font-clash font-semibold leading-[140%]">What is GoSendeet?</h3>
            <p className="text-neutral600 leading-[140%]">We can provide your Development Site Plan as a .pdf .jpg or .png file. Please tell us know your preference when submitting your project.</p>
        </div>
        <div className="bg-purple300 flex flex-col gap-2 md:p-8 p-4">
            <img src={question} alt="question" className="w-[25px]"/>
            <h3 className="font-clash font-semibold leading-[140%]">What is GoSendeet?</h3>
            <p className="text-neutral600 leading-[140%]">We can provide your Development Site Plan as a .pdf .jpg or .png file. Please tell us know your preference when submitting your project.</p>
        </div>
        <div className="bg-purple300 flex flex-col gap-2 md:p-8 p-4">
            <img src={question} alt="question" className="w-[25px]"/>
            <h3 className="font-clash font-semibold leading-[140%]">What is GoSendeet?</h3>
            <p className="text-neutral600 leading-[140%]">We can provide your Development Site Plan as a .pdf .jpg or .png file. Please tell us know your preference when submitting your project.</p>
        </div>
        <div className="bg-purple300 flex flex-col gap-2 md:p-8 p-4">
            <img src={question} alt="question" className="w-[25px]"/>
            <h3 className="font-clash font-semibold leading-[140%]">What is GoSendeet?</h3>
            <p className="text-neutral600 leading-[140%]">We can provide your Development Site Plan as a .pdf .jpg or .png file. Please tell us know your preference when submitting your project.</p>
        </div>
        <div className="bg-purple300 flex flex-col gap-2 md:p-8 p-4">
            <img src={question} alt="question" className="w-[25px]"/>
            <h3 className="font-clash font-semibold leading-[140%]">What is GoSendeet?</h3>
            <p className="text-neutral600 leading-[140%]">We can provide your Development Site Plan as a .pdf .jpg or .png file. Please tell us know your preference when submitting your project.</p>
        </div>
        <div className="bg-purple300 flex flex-col gap-2 md:p-8 p-4">
            <img src={question} alt="question" className="w-[25px]"/>
            <h3 className="font-clash font-semibold leading-[140%]">What is GoSendeet?</h3>
            <p className="text-neutral600 leading-[140%]">We can provide your Development Site Plan as a .pdf .jpg or .png file. Please tell us know your preference when submitting your project.</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
