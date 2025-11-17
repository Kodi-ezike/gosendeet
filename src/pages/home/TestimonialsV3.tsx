import { motion } from "framer-motion";
import avatar1 from "@/assets/images/avatar1.png";
import avatar2 from "@/assets/images/avatar2.png";

const TestimonialsV3 = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      avatar: avatar1,
      rating: 5,
      text: "GoSendeet has transformed how we ship products! The rate comparison feature saved us over £500 last month alone. Absolutely brilliant service!",
    },
    {
      name: "Marcus Chen",
      role: "E-commerce Manager",
      avatar: avatar2,
      rating: 5,
      text: "Real-time tracking and instant quotes make our logistics so much easier. Our customers love the transparency. Highly recommended!",
    },
    {
      name: "Emily Williams",
      role: "Operations Director",
      avatar: avatar1,
      rating: 5,
      text: "We've been using GoSendeet for 6 months now. The platform is intuitive, rates are competitive, and customer support is top-notch!",
    },
  ];

  return (
    <div className="v3-testimonials-section py-20 md:px-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-[#4b5563] text-lg font-medium max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust GoSendeet for their
            shipping needs
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="v3-testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 fill-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t-2 border-gray-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-3 border-amber-400 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <div className="font-clash font-bold text-[#1a1a1a] text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm font-semibold">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="px-12 py-5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/40">
            JOIN 80,000+ HAPPY CUSTOMERS
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsV3;
