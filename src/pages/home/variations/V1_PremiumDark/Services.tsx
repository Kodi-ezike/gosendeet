import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BarChart3, MapPin, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const Services = () => {
  const tabs = ["dashboard", "tracking", "pickup"];
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentIndex = tabs.indexOf(activeTab);
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeTab, isPaused]);

  return (
    <div className="v1-services-section py-20 md:px-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-clash xl:text-[56px] lg:text-[48px] text-[40px] font-bold mb-4 text-white">
            Platform <span className="v1-gradient-text">Features</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto xl:text-xl lg:text-lg text-base">
            Everything you need to manage your logistics efficiently
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
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
              className="v1-service-card group cursor-pointer relative"
            >
              {/* Gradient Border Effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-3xl transition-opacity duration-500",
                  activeTab === tab
                    ? "opacity-100 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 p-[2px]"
                    : "opacity-0 group-hover:opacity-50 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 p-[1px]"
                )}
              >
                <div className="w-full h-full bg-[#1a1f3a] rounded-3xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Icon */}
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-lg",
                    activeTab === tab
                      ? "bg-gradient-to-br from-purple-400 to-blue-400 scale-110"
                      : "bg-white/5 group-hover:bg-white/10"
                  )}
                >
                  {tab === "dashboard" && (
                    <BarChart3
                      className={cn(
                        "transition-all duration-500",
                        activeTab === tab
                          ? "text-white w-10 h-10"
                          : "text-purple-400 w-9 h-9"
                      )}
                    />
                  )}
                  {tab === "tracking" && (
                    <MapPin
                      className={cn(
                        "transition-all duration-500",
                        activeTab === tab
                          ? "text-white w-10 h-10"
                          : "text-blue-400 w-9 h-9"
                      )}
                    />
                  )}
                  {tab === "pickup" && (
                    <Truck
                      className={cn(
                        "transition-all duration-500",
                        activeTab === tab
                          ? "text-white w-10 h-10"
                          : "text-green-400 w-9 h-9"
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-clash text-2xl font-bold mb-3 capitalize text-white">
                  {tab === "dashboard" && "Dashboard"}
                  {tab === "tracking" && "Real Time Tracking"}
                  {tab === "pickup" && "On Time Pickup"}
                </h3>
                <p className="text-white/60 leading-relaxed text-[15px]">
                  {tab === "dashboard" &&
                    "Enjoy the insight of actionable data all in one place for easy monitoring of carrier performance"}
                  {tab === "tracking" &&
                    "Monitor and know every movement of your package in real time anywhere and anytime like a boss"}
                  {tab === "pickup" &&
                    "Our experts use cutting-edge technology and industry best practices to enhance your logistics operations"}
                </p>

                {/* Active Indicator */}
                {activeTab === tab && (
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-sm font-semibold"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"></div>
                    <span className="v1-gradient-text">Active Feature</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
