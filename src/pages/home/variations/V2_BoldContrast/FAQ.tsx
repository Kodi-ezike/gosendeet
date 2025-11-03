import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <div className="v2-faq-section py-20 md:px-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash text-5xl lg:text-6xl font-black text-[#1a1f3a] mb-6">
            FREQUENTLY <span className="v2-gradient-accent">ASKED QUESTIONS</span>
          </h2>
          <p className="text-[#1a1f3a]/70 text-lg font-semibold max-w-2xl mx-auto">
            Everything you need to know about shipping with GoSendeet
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border-4 border-[#1a1f3a] rounded-2xl px-8 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger
                showPlusIcon={true}
                className="text-[#1a1f3a] font-black text-left hover:no-underline text-lg"
              >
                HOW DOES GOSENDEET COMPARE SHIPPING RATES?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed font-medium pt-4">
                We partner with 50+ leading carriers to provide you with
                real-time rates. Simply enter your shipment details, and our
                platform instantly compares all available options, showing you
                the best prices and delivery times side-by-side.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-4 border-[#1a1f3a] rounded-2xl px-8 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger
                showPlusIcon={true}
                className="text-[#1a1f3a] font-black text-left hover:no-underline text-lg"
              >
                ARE THERE ANY HIDDEN FEES?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed font-medium pt-4">
                No. GoSendeet is completely free to use. The prices you see are
                the final carrier rates with no markup or hidden fees. We earn
                through partnerships with carriers, not by charging you extra.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-4 border-[#1a1f3a] rounded-2xl px-8 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger
                showPlusIcon={true}
                className="text-[#1a1f3a] font-black text-left hover:no-underline text-lg"
              >
                HOW LONG DOES SHIPPING TAKE?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed font-medium pt-4">
                Delivery times vary by service tier: Economy (3-5 business days),
                Standard (2-3 business days), and Express (same-day or next-day).
                Exact timing depends on your pickup and delivery locations, which
                you'll see before booking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-4 border-[#1a1f3a] rounded-2xl px-8 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger
                showPlusIcon={true}
                className="text-[#1a1f3a] font-black text-left hover:no-underline text-lg"
              >
                CAN I TRACK MY SHIPMENT?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed font-medium pt-4">
                Absolutely! All shipments include real-time tracking. You'll
                receive a tracking number immediately after booking and can
                monitor your package's location and status 24/7 through our
                dashboard or mobile app.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border-4 border-[#1a1f3a] rounded-2xl px-8 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger
                showPlusIcon={true}
                className="text-[#1a1f3a] font-black text-left hover:no-underline text-lg"
              >
                DO YOU OFFER BULK DISCOUNTS?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed font-medium pt-4">
                Yes! Businesses shipping regularly can access special volume
                discounts and dedicated account management. Contact our sales team
                to discuss custom pricing and enterprise features tailored to your
                shipping needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow-2xl px-10 py-8 border-4 border-[#1a1f3a]">
            <p className="font-black text-[#1a1f3a] text-2xl">STILL HAVE QUESTIONS?</p>
            <button className="px-8 py-4 rounded-full bg-[#1a1f3a] hover:bg-black text-white font-black text-lg shadow-xl transition-all duration-300 hover:-translate-y-1">
              CONTACT SUPPORT →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
