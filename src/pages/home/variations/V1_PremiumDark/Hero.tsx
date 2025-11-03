import { motion } from "framer-motion";
import FormVerticalSidebar from "../../components/FormVerticalSidebar";
import LogoCarousel from "@/components/LogoCarousel";
import gif from "@/assets/gif/gosend-gif.gif";

const Hero = () => {
  return (
    <div className="v1-hero min-h-screen flex flex-col justify-center md:px-20 px-6 py-12 relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-yellow-50"></div>

      {/* GIF Background - Subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={gif}
          alt="Background demo"
          className="w-[60%] max-w-[800px] h-auto opacity-[0.04] object-contain"
        />
      </div>

      {/* Decorative Elements - Yellow/Gold themed */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>

      {/* Logo Carousel */}
      <motion.div
        className="mb-8 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoCarousel />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-start max-w-7xl mx-auto w-full relative z-10">

        {/* LEFT: Form Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:sticky lg:top-6"
        >
          <FormVerticalSidebar variant="solid-light" />
        </motion.div>

        {/* RIGHT: Hero Content */}
        <motion.div
          className="lg:pt-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Headline */}
          <h1 className="font-clash xl:text-[72px] lg:text-[60px] text-[44px] font-bold xl:leading-[110%] leading-[105%] mb-6 text-[#1a1a1a]">
            Compare 50+ Carriers.
            <br />
            <span className="v1-gradient-text">Book in 60 Seconds.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[#4b5563] xl:text-2xl lg:text-xl text-lg mb-10 leading-relaxed max-w-2xl">
            Get real-time shipping quotes from top logistics partners. No phone calls,
            no waiting—just instant rates and one-click booking.
          </p>

          {/* Trust Indicators & GIF - Side by Side */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start mb-10">
            {/* LEFT: Trust Indicators */}
            <div className="space-y-5">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[#1f2937] font-semibold text-lg">Free to use • No hidden fees</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[#1f2937] font-semibold text-lg">Instant rate comparison • Real-time tracking</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[#1f2937] font-semibold text-lg">10,000+ shipments booked monthly</span>
              </motion.div>
            </div>

            {/* RIGHT: Demo GIF - Clean, No Border */}
            <motion.div
              className="max-w-xs hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <img
                src={gif}
                alt="GoSendeet Dashboard Demo"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            <motion.div
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl font-bold v1-gradient-text mb-2">50+</div>
              <div className="text-gray-600 text-sm font-medium">Carriers</div>
            </motion.div>

            <motion.div
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl font-bold v1-gradient-text mb-2">4.9</div>
              <div className="text-gray-600 text-sm font-medium">★ Rating</div>
            </motion.div>

            <motion.div
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-amber-200 transition-all duration-300 md:col-span-1 col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl font-bold v1-gradient-text mb-2">24/7</div>
              <div className="text-gray-600 text-sm font-medium">Support</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
