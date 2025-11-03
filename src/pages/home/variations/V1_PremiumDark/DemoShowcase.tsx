import { motion } from "framer-motion";
import gif from "@/assets/gif/gosend-gif.gif";
import { Play } from "lucide-react";

const DemoShowcase = () => {
  return (
    <div className="v1-demo-section py-20 md:px-20 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h3 className="font-clash text-4xl lg:text-5xl font-bold mb-4 text-white">
            See GoSendeet in <span className="v1-gradient-text">Action</span>
          </h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Watch how easy it is to compare rates, book shipments, and track your packages in real-time
          </p>
        </div>

        {/* Demo Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 shadow-2xl group">
          {/* Demo Image/GIF */}
          <img
            src={gif}
            alt="GoSendeet Dashboard Demo"
            className="w-full h-auto relative z-10"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none z-20"></div>

          {/* Floating Badge */}
          <div className="absolute top-6 left-6 z-30">
            <div className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm font-bold text-white">Live Demo</span>
            </div>
          </div>

          {/* Play Button Overlay (optional - for video) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </motion.div>

          {/* Feature Highlights (Floating) */}
          <motion.div
            className="absolute bottom-6 right-6 z-30 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm font-semibold text-white">
                    Compare 50+ Carriers
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-semibold text-white">
                    Real-time Tracking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm font-semibold text-white">
                    Instant Booking
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40">
            Try It Free
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DemoShowcase;
