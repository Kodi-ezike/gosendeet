import { motion } from "framer-motion";
import deliveryIcon from "@/assets/icons/mdi_home-schedule.png";
import paymentIcon from "@/assets/icons/mdi_stopwatch-start-outline.png";
import receiveIcon from "@/assets/icons/receive.png";
import { CTAButton } from "@/components/shared/CTAButton";

const ProcessFlow = () => {
  const steps = [
    {
      number: "01",
      title: "Schedule Pickup",
      description: "Enter your pickup and delivery details. Compare rates from 50+ carriers instantly.",
      icon: deliveryIcon,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      number: "02",
      title: "Secure Payment",
      description: "Choose your preferred carrier and pay securely. Get instant booking confirmation.",
      icon: paymentIcon,
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      number: "03",
      title: "Track & Receive",
      description: "Monitor your delivery in real-time. Your package arrives safely and on time.",
      icon: receiveIcon,
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
  ];

  return (
    <div className="py-20 md:px-20 px-6 bg-white relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] v3-blob v3-blob-amber opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-[250px] h-[250px] v3-blob v3-blob-yellow opacity-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash xl:text-[52px] lg:text-[44px] text-[36px] font-bold mb-4 text-[#1a1a1a]">
            How It <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-lg lg:text-base text-sm">
            Simple, transparent, and hassle-free delivery in three easy steps
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-[16.66%] right-[16.66%] h-[2px] border-t-2 border-dashed border-gray-200"></div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Step Card */}
                <div className={`${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-8 text-center relative z-10 hover:shadow-lg transition-shadow duration-300`}>
                  {/* Number Badge */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <span className="font-clash font-bold text-white text-lg">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-6 flex justify-center">
                    <div className={`w-20 h-20 rounded-2xl bg-white border-2 ${step.borderColor} flex items-center justify-center shadow-sm`}>
                      <img src={step.icon} alt={step.title} className="w-10 h-10" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-clash font-bold text-2xl mb-3 text-[#1a1a1a]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6b7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CTAButton>Start Your First Delivery</CTAButton>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessFlow;
