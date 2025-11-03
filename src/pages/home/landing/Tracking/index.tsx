import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, MapPin, Truck } from "lucide-react";

const Tracking = () => {
  const tabs = ["dashboard", "tracking", "pickup"];
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate logic
  useEffect(() => {
    if (isPaused) return; // stop when hovering

    const currentIndex = tabs.indexOf(activeTab);
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeTab, isPaused]);

  return (
    <div className="md:px-20 px-6 py-16 bg-white">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-clash xl:text-[56px] lg:text-[48px] text-[40px] font-bold mb-4 text-[#1a1a1a]">
          Platform <span className="gradient-text">Features</span>
        </h2>
        <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-xl lg:text-lg text-base">
          Everything you need to manage your logistics efficiently
        </p>
      </motion.div>

      {/* Feature Cards - Grid Layout */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
        {tabs.map((tab, index) => (
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onMouseEnter={() => {
              setActiveTab(tab);
              setIsPaused(true);
            }}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "p-8 rounded-3xl cursor-pointer transition-all duration-500 relative overflow-hidden group",
              activeTab === tab
                ? "bg-white shadow-2xl"
                : "bg-white shadow-md hover:shadow-xl"
            )}
          >
            {/* Gradient border effect */}
            <div className={cn(
              "absolute inset-0 rounded-3xl transition-opacity duration-500",
              activeTab === tab
                ? "opacity-100 bg-gradient-to-br from-purple400 via-blue400 to-green400 p-[2px]"
                : "opacity-0 group-hover:opacity-50 bg-gradient-to-br from-purple400 via-blue400 to-green400 p-[1px]"
            )}>
              <div className="w-full h-full bg-white rounded-3xl"></div>
            </div>

            {/* Content wrapper - needs to be positioned above gradient border */}
            <div className="relative z-10">
            {/* Icon */}
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-sm",
              activeTab === tab
                ? "bg-gradient-to-br from-purple400 to-blue400"
                : "bg-gradient-to-br from-[#f5f5f5] to-[#fafafa]"
            )}>
              {tab === "dashboard" && (
                <BarChart3 className={cn(
                  "transition-all duration-500",
                  activeTab === tab ? "text-white w-8 h-8" : "text-purple400 w-7 h-7"
                )} />
              )}
              {tab === "tracking" && (
                <MapPin className={cn(
                  "transition-all duration-500",
                  activeTab === tab ? "text-white w-8 h-8" : "text-blue400 w-7 h-7"
                )} />
              )}
              {tab === "pickup" && (
                <Truck className={cn(
                  "transition-all duration-500",
                  activeTab === tab ? "text-white w-8 h-8" : "text-green400 w-7 h-7"
                )} />
              )}
            </div>

            {/* Content */}
            <h3 className="font-clash text-2xl font-bold mb-3 capitalize text-[#1a1a1a]">
              {tab === "dashboard" && "Dashboard"}
              {tab === "tracking" && "Real Time Tracking"}
              {tab === "pickup" && "On Time Pickup"}
            </h3>
            <p className="text-[#6b7280] leading-relaxed text-[15px]">
              {tab === "dashboard" &&
                "Enjoy the insight of actionable data all in one place for easy monitoring of carrier performance"}
              {tab === "tracking" &&
                "Monitor and know every movement of your package in real time anywhere and anytime like a boss"}
              {tab === "pickup" &&
                "Our experts use cutting-edge technology and industry best practices to enhance your logistics operations"}
            </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
