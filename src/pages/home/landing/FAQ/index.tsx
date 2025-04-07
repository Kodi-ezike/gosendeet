import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BsChevronRight } from "react-icons/bs";

const FAQ = () => {
  return (
    <div className="md:px-20 px-6 py-20 flex lg:flex-row flex-col gap-8">
      <div className="lg:w-[40%]">
        <h2 className="font-clash font-semibold lg:text-[40px] md:text-[32px] text-2xl xl:w-2/3 leading-[130%] mb-2">Your Questions Answered</h2>
        <p className="font-medium text-neutral500">Quick answers to the questions you may have. </p>
      </div>
      <div className="lg:w-[60%]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger showPlusIcon={true}>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger showPlusIcon={true}>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger showPlusIcon={true}>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger showPlusIcon={true}>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger showPlusIcon={true}>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger showPlusIcon={true}>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex items-center gap-4 mt-5">
            <p className="font-medium">Still Have Questions?</p>
            <button className="flex items-center gap-3 bg-purple400 font-medium rounded-full md:px-6 px-4 py-3 outline-0 text-white">Contact Us <BsChevronRight />
            </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
