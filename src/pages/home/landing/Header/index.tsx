import { useState } from "react";
import CreateBooking from "@/components/CreateBooking";
import TrackBooking from "@/components/TrackBooking";
import LogoCarousel from "@/components/LogoCarousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gif from "@/assets/gif/gosend-gif.gif";

const Header = () => {
  const [activeTab, setActiveTab] = useState("delivery");

  const tabs = [
    { key: "delivery", label: "Delivery/Pickup" },
    { key: "track", label: "Track" },
  ];

  return (
    <div className="homepage-header min-h-screen flex flex-col justify-start md:px-20 px-6 pt-20 pb-12 relative z-10 bg-white overflow-hidden">
      {/* GIF Background - Much More Visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={gif}
          alt="Background demo"
          className="w-[60%] max-w-[800px] h-auto opacity-[0.55] object-contain"
        />
      </div>

      {/* Logo Carousel - Compact */}
      <motion.div
        className="mb-6 text-center relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoCarousel />
      </motion.div>

      {/* Main Hero Section - Content Left, Narrow Form Right */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start max-w-7xl mx-auto w-full relative z-10">

        {/* LEFT: Value Proposition & Trust Signals */}
        <motion.div
          className="lg:pr-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Headline - Conversion Focused */}
          <h1 className="font-clash xl:text-[64px] lg:text-[52px] text-[40px] font-bold xl:leading-[110%] leading-[105%] mb-6 text-[#1a1a1a]">
            Compare 50+ Carriers.<br />
            Book in <span className="text-purple500">60 Seconds.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[#4b5563] xl:text-xl lg:text-lg text-base mb-8 leading-relaxed">
            Get real-time shipping quotes from top logistics partners. No phone calls, no waiting—just instant rates and one-click booking.
          </p>

          {/* Trust Indicators - V1 Style Checkboxes */}
          <div className="space-y-5 mb-8">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
              transition={{ duration: 0.5, delay: 0.5 }}
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
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[#1f2937] font-semibold text-lg">10,000+ shipments booked monthly</span>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Booking Form - Narrow V1-Style Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:sticky lg:top-6"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-purple200 rounded-3xl shadow-2xl p-8 ring-1 ring-purple400/10">
            {/* Form Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple700 to-purple400 bg-clip-text text-transparent mb-2">Get Your Free Quote</h2>
              <p className="text-[#6b7280] text-sm">Compare rates from 50+ carriers instantly</p>
            </div>

            {/* Tab Buttons */}
            <div className="w-full rounded-full bg-[#f5f5f5] h-[48px] flex p-1 relative overflow-hidden mb-6">
              <div
                className={`absolute top-1 left-1 h-[calc(100%-8px)] rounded-full bg-white shadow-sm transition-all duration-300`}
                style={{
                  width: `${98.5 / tabs.length}%`,
                  transform: `translateX(${
                    tabs.findIndex((tab) => tab.key === activeTab) * 100
                  }%)`,
                }}
              ></div>

              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`flex-1 relative z-10 py-2 rounded-full font-medium text-sm transition-colors duration-200 cursor-pointer ${
                    activeTab === tab.key
                      ? "text-[#1a1a1a]"
                      : "text-[#6b7280]"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl">
              {activeTab === "delivery" ? (
                <CreateBooking />
              ) : (
                <TrackBooking />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
