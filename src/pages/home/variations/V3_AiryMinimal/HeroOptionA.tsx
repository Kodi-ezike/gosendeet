import { motion } from "framer-motion";
import FormHorizontalBar from "../../components/FormHorizontalBar";
import LogoCarousel from "@/components/LogoCarousel";
import gif from "@/assets/gif/gosend-gif.gif";

const HeroOptionA = () => {
  return (
    <div className="v3-hero min-h-screen flex flex-col justify-center md:px-20 px-6 py-12 relative overflow-hidden">
      {/* Bold Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-yellow-50"></div>

      {/* GIF Background - Subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={gif}
          alt="Background demo"
          className="w-[60%] max-w-[800px] h-auto opacity-[0.04] object-contain"
        />
      </div>

      {/* Decorative Elements - Bold */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Headline Section - Center Aligned */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="font-clash xl:text-[72px] lg:text-[60px] text-[48px] font-bold xl:leading-[105%] leading-[100%] mb-6">
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Compare 50+ Carriers.
            </span>
            <br />
            <span className="text-[#1a1a1a]">Book in 60 Seconds.</span>
          </h1>

          <p className="text-[#4b5563] xl:text-2xl lg:text-xl text-lg mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
            Get real-time shipping quotes from top logistics partners. No phone calls, no waiting—just instant rates and one-click booking.
          </p>
        </motion.div>

        {/* Trust Indicators - MOVED UP - Bold Checkboxes in Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[#1f2937] font-bold text-lg">Free to use</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[#1f2937] font-bold text-lg">Instant rate comparison</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[#1f2937] font-bold text-lg">Real-time tracking</span>
          </div>
        </motion.div>

        {/* Horizontal Form Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FormHorizontalBar variant="minimal" />
        </motion.div>

        {/* Logo Carousel - MOVED DOWN */}
        <motion.div
          className="mb-16 text-center relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <LogoCarousel />
        </motion.div>

        {/* Stats Grid - Bold & Colorful */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { number: "50+", label: "Carriers", gradient: "from-amber-500 to-yellow-500" },
            { number: "10K+", label: "Shipments", gradient: "from-yellow-500 to-orange-500" },
            { number: "4.9★", label: "Rating", gradient: "from-orange-500 to-amber-600" },
            { number: "24/7", label: "Support", gradient: "from-amber-600 to-yellow-600" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-3xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 font-clash`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroOptionA;
