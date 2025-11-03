import { motion } from "framer-motion";
import logos from "@/assets/images/logos.png";
import logosMastercard from "@/assets/images/logos_mastercard.png";

const LogoShowcase = () => {
  // Partner logos array
  const logoArray = [
    logos,
    logosMastercard,
    logos,
    logosMastercard,
    logos,
    logosMastercard,
  ];

  // Mock company names (you can replace with real brands)
  const companies = [
    "Google",
    "Amazon",
    "Intel",
    "Atlassian",
    "Mastercard",
    "Stripe",
  ];

  return (
    <div className="v2-logo-section py-20 md:px-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash text-4xl lg:text-5xl font-black text-[#1a1f3a] mb-4">
            TRUSTED BY <span className="v2-gradient-accent">50+ LEADING COMPANIES</span>
          </h2>
          <p className="text-[#1a1f3a]/70 text-lg font-semibold">
            Join thousands of businesses shipping smarter
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logoArray.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={logo}
                alt={`${companies[index % companies.length]} logo`}
                className="h-[40px] md:h-[50px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>

        {/* Rating Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl shadow-xl px-8 py-6 border-2 border-[#1a1f3a]">
            <div className="text-6xl font-black text-[#1a1f3a]">4.9</div>
            <div className="text-left">
              <div className="flex gap-1 mb-1">
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
              <div className="text-sm font-bold text-[#1a1f3a]">
                20K+ Rating
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoShowcase;
