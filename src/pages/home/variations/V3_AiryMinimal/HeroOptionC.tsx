import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHorizontalBar from "../../components/FormHorizontalBar";
import gif from "@/assets/gif/gosend-gif.gif";
import logos from "@/assets/images/logos.png";
import logosMastercard from "@/assets/images/logos_mastercard.png";
import { FiSend, FiBarChart2, FiPackage } from "react-icons/fi";
import { cn } from "@/lib/utils";

type FormMode = "gosendeet" | "compare" | "tracking";

const HeroOptionC = () => {
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState<FormMode>("gosendeet");

  const modeTabs = [
    { key: "gosendeet" as FormMode, label: "Direct", icon: FiSend },
    { key: "compare" as FormMode, label: "Compare", icon: FiBarChart2 },
    { key: "tracking" as FormMode, label: "Tracking", icon: FiPackage },
  ];

  const trustSignals = [
    { icon: "✓", text: "Free to use", color: "from-emerald-400 to-emerald-500", clickable: false },
    { icon: "✓", text: "50+ Carriers", color: "from-blue-400 to-blue-500", clickable: false },
    { icon: "✓", text: "4.9★ Rating", color: "from-amber-400 to-amber-500", clickable: false },
    { icon: "✓", text: "Real-time tracking", color: "from-purple-400 to-purple-500", clickable: false },
  ];

  // Logo array for carousel
  const logoArray = [
    logos,
    logosMastercard,
    logos,
    logosMastercard,
    logos,
    logosMastercard,
  ];

  return (
    <div className="v3-hero min-h-screen flex flex-col justify-center md:px-20 px-6 pt-6 pb-12 relative overflow-hidden">
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
          className="text-center mb-8"
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

          <p className="text-[#4b5563] xl:text-2xl lg:text-xl text-lg mb-6 leading-relaxed max-w-3xl mx-auto font-medium">
            Get real-time shipping quotes from top logistics partners. No phone calls, no waiting—just instant rates and one-click booking.
          </p>
        </motion.div>

        {/* Mode Tabs - Combined Card Above Form */}
        <motion.div
          className="max-w-6xl mx-auto relative z-10 mb-[-20px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-center">
            {/* Single card container for all tabs */}
            <div className="inline-flex bg-white rounded-t-2xl shadow-lg border border-gray-200 overflow-hidden">
              {modeTabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = formMode === tab.key;
                const isLast = index === modeTabs.length - 1;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFormMode(tab.key)}
                    className={cn(
                      "flex flex-col items-center gap-1 px-8 py-4 transition-all duration-300 group relative",
                      !isLast && "border-r border-gray-200",
                      isActive
                        ? "border-b-4 border-b-amber-500 bg-amber-50 -mb-[2px]"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-colors",
                        isActive ? "text-amber-500" : "text-gray-500 group-hover:text-gray-700"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-bold transition-colors",
                        isActive ? "text-amber-600" : "text-gray-600 group-hover:text-gray-800"
                      )}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Horizontal Form Bar */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <FormHorizontalBar variant="minimal" activeMode={formMode} />
        </motion.div>

        {/* Combined Trust Bar - All trust signals + key stats in one row */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8 max-w-5xl mx-auto mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${signal.color} flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-sm">{signal.icon}</span>
              </div>
              <span className="text-[#1f2937] font-semibold text-base whitespace-nowrap">
                {signal.text}
              </span>
              {index < trustSignals.length - 1 && (
                <span className="hidden md:inline text-gray-300 text-2xl mx-2">•</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Logo Carousel - Enhanced with Animations */}
        <motion.div
          className="v3-carousel-container v3-carousel-glow overflow-hidden w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="v3-carousel-track flex gap-20 items-center relative z-10">
            {logoArray.concat(logoArray).map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt="partner logo"
                className="v3-logo-item h-[32px] md:h-[40px] object-contain flex-shrink-0 filter grayscale"
                style={{ minWidth: '80px' }}
                whileHover={{
                  scale: 1.15,
                  filter: 'grayscale(0)',
                  transition: { duration: 0.3 }
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroOptionC;
