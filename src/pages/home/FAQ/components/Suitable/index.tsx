import faq from "@/assets/images/faq.png";

const Suitable = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-6 pt-20">
      <div className="lg:w-[40%]">
        <img src={faq} alt="faq" className="mx-auto" />
      </div>
      <div className="lg:w-[60%] bg-purple300 flex flex-col justify-center p-8 min-h-[350px]">
        <p className="font-clash font-semibold md:text-[32px] text-2xl leading-[130%] mb-2">
          Couldn’t find a suitable answer?
        </p>
        <p className="mb-8 text-neutral600 lg:w-[80%]">
          No problem! Just create a support ticket, our team will take care of
          your request as soon as possible.
        </p>
        <a
          href="#"
          className="text-purple700 border-b border-b-purple700 w-fit"
        >
          Create a support ticket
        </a>
      </div>
    </div>
  );
};

export default Suitable;
