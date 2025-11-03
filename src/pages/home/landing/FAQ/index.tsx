import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <div className="md:px-20 px-6 py-20 flex lg:flex-row flex-col gap-12 bg-gradient-to-b from-white to-neutral100/50">
      <motion.div
        className="lg:w-[40%]"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-clash font-bold lg:text-[48px] md:text-[40px] text-3xl xl:w-full leading-[120%] mb-4 text-[#1a1a1a]">
          Your Questions <span className="gradient-text">Answered</span>
        </h2>
        <p className="font-semibold text-[#6b7280] text-lg mb-6">Quick answers to the questions you may have about our shipping platform.</p>

        {/* Trust badge */}
        <div className="inline-flex items-center gap-3 bg-green100 px-5 py-3 rounded-full border border-green200">
          <svg className="w-5 h-5 text-green500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-green500">24/7 Customer Support Available</span>
        </div>
      </motion.div>
      <motion.div
        className="lg:w-[60%]"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem value="item-1" className="border border-[#e5e5e5] rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger showPlusIcon={true} className="text-[#1a1a1a] font-semibold text-left hover:no-underline">
              How does GoSendeet compare shipping rates?
            </AccordionTrigger>
            <AccordionContent className="text-[#6b7280] leading-relaxed">
              We partner with 50+ leading carriers to provide you with real-time rates. Simply enter your shipment details, and our platform instantly compares all available options, showing you the best prices and delivery times side-by-side.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-[#e5e5e5] rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger showPlusIcon={true} className="text-[#1a1a1a] font-semibold text-left hover:no-underline">
              Are there any hidden fees or charges?
            </AccordionTrigger>
            <AccordionContent className="text-[#6b7280] leading-relaxed">
              No. GoSendeet is completely free to use. The prices you see are the final carrier rates with no markup or hidden fees. We earn through partnerships with carriers, not by charging you extra.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border border-[#e5e5e5] rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger showPlusIcon={true} className="text-[#1a1a1a] font-semibold text-left hover:no-underline">
              How long does shipping typically take?
            </AccordionTrigger>
            <AccordionContent className="text-[#6b7280] leading-relaxed">
              Delivery times vary by service tier: Economy (3-5 business days), Standard (2-3 business days), and Express (same-day or next-day). Exact timing depends on your pickup and delivery locations, which you'll see before booking.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border border-[#e5e5e5] rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger showPlusIcon={true} className="text-[#1a1a1a] font-semibold text-left hover:no-underline">
              Can I track my shipment in real-time?
            </AccordionTrigger>
            <AccordionContent className="text-[#6b7280] leading-relaxed">
              Absolutely! All shipments include real-time tracking. You'll receive a tracking number immediately after booking and can monitor your package's location and status 24/7 through our dashboard or mobile app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border border-[#e5e5e5] rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger showPlusIcon={true} className="text-[#1a1a1a] font-semibold text-left hover:no-underline">
              What if my package is damaged or lost?
            </AccordionTrigger>
            <AccordionContent className="text-[#6b7280] leading-relaxed">
              All shipments come with basic insurance coverage (amount varies by tier). You can also purchase additional insurance during booking. If something goes wrong, our support team will help you file a claim and work directly with the carrier on your behalf.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="border border-[#e5e5e5] rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger showPlusIcon={true} className="text-[#1a1a1a] font-semibold text-left hover:no-underline">
              Do you offer business or bulk shipping discounts?
            </AccordionTrigger>
            <AccordionContent className="text-[#6b7280] leading-relaxed">
              Yes! Businesses shipping regularly can access special volume discounts and dedicated account management. Contact our sales team to discuss custom pricing and enterprise features tailored to your shipping needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex md:flex-row flex-col md:items-center items-start gap-4 mt-8 p-6 bg-gradient-to-r from-purple50 to-blue50 rounded-2xl border border-purple200">
            <p className="font-semibold text-[#1a1a1a] text-lg">Still have questions?</p>
            <button className="flex items-center gap-3 bg-gradient-to-r from-purple400 to-blue400 hover:from-purple500 hover:to-blue500 font-semibold rounded-full md:px-8 px-6 py-4 outline-0 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              Contact Us <BsChevronRight className="btn-icon-slide" />
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
