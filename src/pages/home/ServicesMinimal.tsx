import { motion } from "framer-motion";
import { FiTruck, FiPackage, FiShield, FiClock, FiMapPin, FiDollarSign } from "react-icons/fi";

const ServicesMinimal = () => {
  const services = [
    {
      icon: FiTruck,
      title: "Same-Day Delivery",
      description: "Get your packages delivered within hours. Perfect for urgent shipments.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      icon: FiPackage,
      title: "Package Protection",
      description: "Full insurance coverage for all your shipments. Ship with confidence.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      icon: FiClock,
      title: "Real-Time Tracking",
      description: "Monitor every step of your delivery journey with live GPS tracking.",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      icon: FiMapPin,
      title: "Flexible Pickup",
      description: "Schedule pickups at your convenience or drop off at nearby locations.",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-100",
    },
    {
      icon: FiDollarSign,
      title: "Best Rates",
      description: "Compare prices from 50+ carriers to find the best deal every time.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
    },
    {
      icon: FiShield,
      title: "Secure Payments",
      description: "Bank-level encryption keeps your payment information safe.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
  ];

  return (
    <div className="py-20 md:px-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash xl:text-[52px] lg:text-[44px] text-[36px] font-bold mb-4 text-[#1a1a1a]">
            Why Choose <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-lg lg:text-base text-sm">
            Everything you need for seamless, reliable delivery services
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`${service.bgColor} ${service.borderColor} border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${service.bgColor} border-2 ${service.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-7 h-7 ${service.color}`} />
              </div>

              {/* Title */}
              <h3 className="font-clash font-bold text-xl mb-3 text-[#1a1a1a]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#6b7280] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { number: "99.8%", label: "On-Time Delivery" },
            { number: "24/7", label: "Customer Support" },
            { number: "50+", label: "Carrier Partners" },
            { number: "4.9★", label: "Customer Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent mb-1 font-clash">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesMinimal;
