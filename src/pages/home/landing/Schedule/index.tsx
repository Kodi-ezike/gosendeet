import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import dashboard from "@/assets/images/dashboard.png";
import realtime from "@/assets/images/realtime.png";
import pickup from "@/assets/images/pickup.png";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("delivery");
  const [paused, setPaused] = useState(false);

  const tabs = [
    { key: "delivery", label: "Schedule a pickup/delivery" },
    { key: "payment", label: "Make payment and get started" },
    { key: "receive", label: "Receive your package" },
  ];
  useEffect(() => {
    if (paused) return;
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    const timer = setTimeout(() => {
      setActiveTab(tabs[nextIndex].key);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeTab, paused]);

  return (
    <div className="md:px-20 px-6 bg-gradient-to-b from-white via-neutral100 to-white py-16">
      <div className="mt-8 mb-12">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="font-clash xl:text-[56px] lg:text-[48px] text-[40px] font-bold mb-4 text-[#1a1a1a]">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-xl lg:text-lg text-base">
            Three simple steps to get your shipment moving
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="w-full rounded-full bg-white/80 backdrop-blur-sm border border-neutral300 h-[60px] flex p-1 relative overflow-hidden shadow-lg">
          <div
            className={`absolute top-1 left-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r from-purple400 to-blue400 shadow-xl transition-all duration-500`}
            style={{
              width: `${99.2 / tabs.length}%`,
              transform: `translateX(${
                tabs.findIndex((tab) => tab.key === activeTab) * 100
              }%)`,
            }}
          ></div>

          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 relative z-10 py-2 rounded-full font-clash font-semibold xl:text-xl lg:text-base text-xs transition-all duration-300 cursor-pointer ${
                activeTab === tab.key ? "text-white" : "text-[#1a1a1a] opacity-70 hover:opacity-100"
              }`}
              onMouseEnter={() => {
                setPaused(true);
                setActiveTab(tab.key);
              }}
              onMouseLeave={() => setPaused(false)}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Section Container */}
      <div className="bg-white rounded-3xl overflow-hidden relative shadow-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${
              tabs.findIndex((tab) => tab.key === activeTab) * 100
            }%)`,
          }}
        >
          <div className="w-full flex-shrink-0 ">
            <div className="p-4 bg-gradient-to-br from-purple600 to-purple500 rounded-3xl">
              <div className="py-8 lg:px-24 px-4 flex md:flex-row flex-col gap-8 justify-between items-center bg-line bg-contain bg-no-repeat bg-right">
                <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4">
                  <p className="w-[60px] h-[60px] rounded-full bg-purple100 flex justify-center items-center shadow-lg">
                    <MdSpaceDashboard className="text-purple400 text-3xl" />
                  </p>
                  <h2 className="text-purple500 font-bold lg:text-4xl text-3xl font-clash">
                    Dashboard
                  </h2>
                  <p className="text-purple500 font-semibold text-lg">
                    Enjoy the insight of actionable data all in one place for
                    easy monitoring of carrier performance
                  </p>
                  <button className="px-8 py-3 rounded-full text-white font-semibold bg-purple500 hover:bg-purple400 w-fit shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Make a delivery
                  </button>
                </div>
                <div className="lg:w-[44%] md:w-[50%]">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <img src={dashboard} alt="dashboard" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-shrink-0 ">
            <div className="p-4 bg-gradient-to-br from-blue100 to-blue200 rounded-3xl">
              <div className="py-8 lg:px-24 px-4 flex md:flex-row flex-col gap-8 justify-between items-center bg-line bg-contain bg-no-repeat bg-right">
                <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4">
                  <p className="w-[60px] h-[60px] rounded-full bg-blue200 flex justify-center items-center shadow-lg">
                    <MdSpaceDashboard className="text-blue300 text-3xl" />
                  </p>
                  <h2 className="text-blue400 font-bold lg:text-4xl text-3xl font-clash">
                    Real Time Tracking
                  </h2>
                  <p className="text-blue400 font-semibold text-lg">
                    Monitor and know every movement of your package in real time
                    anywhere and anytime like a boss
                  </p>
                  <button className="px-8 py-3 rounded-full text-white font-semibold bg-blue400 hover:bg-blue300 w-fit shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Track a Delivery
                  </button>
                </div>
                <div className="lg:w-[40%] md:w-[50%]">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <img
                      src={realtime}
                      alt="dashboard"
                      className="w-full mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-shrink-0 ">
            <div className="p-4 bg-gradient-to-br from-orange100 to-orange200 rounded-3xl">
              <div className="py-8 lg:px-24 px-4 flex md:flex-row flex-col gap-8 justify-between items-center bg-line bg-contain bg-no-repeat bg-right">
                <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4">
                  <p className="w-[60px] h-[60px] rounded-full bg-orange200 flex justify-center items-center shadow-lg">
                    <MdSpaceDashboard className="text-orange300 text-3xl" />
                  </p>
                  <h2 className="text-brown100 font-bold lg:text-4xl text-3xl font-clash">
                    On Time Pickup
                  </h2>
                  <p className="text-brown100 font-semibold text-lg">
                    Our experts use cutting-edge technology and industry best
                    practices to enhance your logistics operations, saving you
                    time and money through streamlined processes.
                  </p>
                  <button className="px-8 py-3 rounded-full text-white font-semibold bg-orange400 hover:bg-orange300 w-fit shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Schedule a Pickup
                  </button>
                </div>
                <div className="lg:w-[40%] md:w-[50%]">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <img src={pickup} alt="dashboard" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
