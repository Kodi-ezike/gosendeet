import { motion } from "framer-motion";
import { useState } from "react";
import FormHorizontalBar from "./components/FormHorizontalBar";
import { FiSend, FiBarChart2, FiPackage, FiBox } from "react-icons/fi";
import { SiFedex, SiDhl, SiUps } from "react-icons/si";
import { cn } from "@/lib/utils";

type FormMode = "gosendeet" | "compare" | "tracking";

const HeroOptionC = () => {
  const [formMode, setFormMode] = useState<FormMode>("gosendeet");

  const modeTabs = [
    { key: "gosendeet" as FormMode, label: "Direct", icon: FiSend },
    { key: "compare" as FormMode, label: "Compare", icon: FiBarChart2 },
    { key: "tracking" as FormMode, label: "Tracking", icon: FiPackage },
  ];

  const trustSignals = [
    { icon: "✓", text: "Best Pricing", color: "from-emerald-400 to-emerald-500", clickable: false },
    { icon: "✓", text: "Predictable Pickup", color: "from-blue-400 to-blue-500", clickable: false },
    { icon: "✓", text: "Real-Time Notifications", color: "from-amber-400 to-amber-500", clickable: false },
    { icon: "✓", text: "Verified Partners", color: "from-purple-400 to-purple-500", clickable: false },
  ];

  // Logo array for carousel
  const partnerLogos = [
    { name: "FedEx", icon: SiFedex },
    { name: "FEZ" },
    { name: "DHL", icon: SiDhl },
    { name: "UPS", icon: SiUps },
    { name: "GIG" },
  ];

  return (
    <div className="v3-hero min-h-screen flex flex-col justify-center md:px-20 px-6 pt-6 pb-12 relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Floating Package Icons */}
        <motion.div
          className="absolute top-20 left-10 md:left-20 text-amber-400/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiBox className="w-16 h-16 md:w-20 md:h-20" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-10 md:right-24 text-orange-400/25"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <FiPackage className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <motion.div
          className="absolute top-60 left-16 md:left-32 text-yellow-400/20"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FiBox className="w-10 h-10 md:w-12 md:h-12" />
        </motion.div>

        {/* Headline Section - Center Aligned */}
        <motion.div
          className="text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="font-clash font-bold mb-6">
            <span className="block text-[#f59e0b] xl:text-[84px] lg:text-[68px] text-[48px] xl:leading-[95%] leading-[100%]">
              Every delivery is a promise.
            </span>
            <span className="block text-[#6b7280] xl:text-[42px] lg:text-[36px] text-[28px] xl:leading-[95%] leading-[100%]">
              We help you keep it.
            </span>
          </h1>

          <p className="text-[#1a1a1a] xl:text-2xl lg:text-xl text-lg leading-relaxed max-w-4xl mx-auto font-bold">
            Ship easily from your doorstep with <span className="text-[#f59e0b]">GoSendeet</span>, or <span className="text-[#f59e0b]"> compare rates </span> from multiple carriers — <span className="text-[#f59e0b]"> all in one place. </span>
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
          <div className="v3-carousel-track flex gap-12 items-center relative z-10">
            {partnerLogos.concat(partnerLogos).map((partner, index) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={index}
                  className="v3-logo-item group flex items-center justify-center h-[40px] md:h-[48px] min-w-[120px] text-gray-700 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  {Icon ? (
                    <Icon className="w-20 h-8 md:h-10 group-hover:text-amber-600 transition-colors duration-300" />
                  ) : (
                    <span className="text-base md:text-lg font-semibold uppercase tracking-wider group-hover:text-amber-600 transition-colors duration-300">
                      {partner.name}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroOptionC;
