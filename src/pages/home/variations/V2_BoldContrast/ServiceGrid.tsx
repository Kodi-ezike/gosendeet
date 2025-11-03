import { motion } from "framer-motion";
import { Bike, Truck, Plane } from "lucide-react";

const ServiceGrid = () => {
  const services = [
    {
      icon: Bike,
      title: "LOCAL DELIVERY",
      description:
        "It's easy to send from our 6,000+ local ParcelShops & Lockers!",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      bgColor: "from-purple-100 to-purple-200",
    },
    {
      icon: Truck,
      title: "COUNTRY DELIVERY",
      description:
        "We provide delivery services for most of the UK's top retail brands",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      bgColor: "from-blue-100 to-blue-200",
    },
    {
      icon: Plane,
      title: "INTERNATIONAL",
      description:
        "We deliver product all around the world. Shipping is very fast.",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      bgColor: "from-green-100 to-green-200",
    },
  ];

  return (
    <div className="v2-service-section py-20 md:px-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash text-5xl lg:text-6xl font-black text-white mb-6 v2-text-outline-white">
            OUR SERVICE
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-semibold">
            We Offer Convenient And Cheap Postage For Your Parcels. Our UK Parcel
            Prices Vary Depending On Your Parcel Weight.
          </p>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-semibold mt-4">
            Delivery Method And The Level Of Cover You Choose. Below Are Our Main
            Options
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-[#1a1f3a] overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-24 h-24 ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-clash text-2xl font-black text-[#1a1f3a] mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-[#1a1f3a] font-bold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn More</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-6 bg-[#1a1f3a] rounded-2xl shadow-2xl px-10 py-6">
            <div>
              <div className="text-6xl font-black text-white">4.9</div>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="text-left text-white">
              <div className="text-2xl font-black">20K RATING</div>
              <div className="text-sm text-white/70 font-semibold mt-1">
                From Trusted Customers
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceGrid;
