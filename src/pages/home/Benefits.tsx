import { motion } from "framer-motion";
import delivery from "@/assets/images/delivery.png";
import { CTAButton } from "@/components/shared/CTAButton";

const Benefits = () => {
  const benefits = [
    {
      title: "Free to Use",
      description: "No hidden fees or subscription costs. Only pay for what you ship.",
      icon: "💰",
    },
    {
      title: "Instant Quotes",
      description: "Get real-time pricing from multiple carriers in seconds.",
      icon: "⚡",
    },
    {
      title: "Flexible Scheduling",
      description: "Book pickups at your convenience, 7 days a week.",
      icon: "📅",
    },
    {
      title: "Business Solutions",
      description: "Volume discounts and dedicated support for businesses.",
      icon: "🏢",
    },
  ];

  return (
    <div className="py-20 md:px-20 px-6 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] v3-blob v3-blob-amber opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] v3-blob v3-blob-yellow opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden border-4 border-amber-100 shadow-2xl">
                <img
                  src={delivery}
                  alt="Delivery benefits"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold font-clash">10K+</div>
                <div className="text-sm font-medium">Happy Customers</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-clash xl:text-[52px] lg:text-[44px] text-[36px] font-bold mb-6 text-[#1a1a1a]">
              Delivery Made <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Simple</span>
            </h2>
            <p className="text-[#6b7280] xl:text-lg lg:text-base text-sm mb-10 leading-relaxed">
              We've removed the complexity from logistics. Just enter your details,
              compare options, and book. It's that easy.
            </p>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-clash font-bold text-xl mb-1 text-[#1a1a1a]">
                      {benefit.title}
                    </h3>
                    <p className="text-[#6b7280] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CTAButton>Get Started Now</CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
