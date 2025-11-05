import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQMinimal = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the pricing work?",
      answer: "Our platform is completely free to use. You only pay for the actual shipping cost from the carrier you choose. We display all fees upfront with no hidden charges. Compare rates from 50+ carriers and select the best option for your needs.",
    },
    {
      question: "What areas do you cover?",
      answer: "We provide nationwide coverage across England, with extensive partnerships with local, regional, and national carriers. Whether you're shipping within your city or across the country, we have you covered with multiple delivery options.",
    },
    {
      question: "How quickly can I get my package delivered?",
      answer: "Delivery times vary by service level. We offer same-day, next-day, and standard delivery options. Same-day delivery is available in major cities for bookings made before noon. Use our quote tool to see exact delivery times for your specific route.",
    },
    {
      question: "Can I track my shipment in real-time?",
      answer: "Yes! All shipments include real-time GPS tracking. You'll receive a tracking link immediately after booking, and you can monitor your package's journey from pickup to delivery. We also send automatic notifications at key milestones.",
    },
    {
      question: "What if my package is damaged or lost?",
      answer: "All shipments include basic carrier insurance. You can purchase additional coverage during booking for high-value items. In the rare event of damage or loss, our support team will guide you through the claims process and work with the carrier to resolve the issue quickly.",
    },
    {
      question: "Do you offer business accounts?",
      answer: "Absolutely! We offer dedicated business solutions with volume discounts, API integration, bulk shipping tools, and priority support. Contact our business team to discuss custom pricing and features tailored to your shipping needs.",
    },
  ];

  return (
    <div className="py-20 md:px-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash xl:text-[52px] lg:text-[44px] text-[36px] font-bold mb-4 text-[#1a1a1a]">
            Common <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-lg lg:text-base text-sm">
            Everything you need to know about our delivery services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 group"
              >
                <h3 className="font-clash font-bold text-lg text-[#1a1a1a] group-hover:text-amber-500 transition-colors">
                  {faq.question}
                </h3>
                <FiChevronDown
                  className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-amber-500" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-[#6b7280] leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-3xl p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="font-clash font-bold text-2xl mb-3 text-[#1a1a1a]">
            Still have questions?
          </h3>
          <p className="text-[#6b7280] mb-6 max-w-xl mx-auto">
            Our friendly support team is here to help 24/7. Get in touch and we'll respond within minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1">
              Contact Support
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-full border-2 border-gray-200 transition-all duration-300 hover:-translate-y-1">
              View All FAQs
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQMinimal;
