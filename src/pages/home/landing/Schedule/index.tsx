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
    <div className="md:px-20 px-6 bg-neutral100 py-8">
      <div className="mt-8 mb-10">
        {/* Tab Buttons */}
        <div className="w-full rounded-full bg-neutral100 border border-neutral300 h-[60px] flex p-1 relative overflow-hidden">
          <div
            className={`absolute top-1 left-1 h-[calc(100%-8px)] rounded-full bg-white shadow-scheduleShadow transition-all duration-500`}
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
              className={`flex-1 relative z-10 py-2 rounded-full font-clash font-semibold xl:text-xl lg:text-base text-xs transition-colors duration-300 cursor-pointer ${
                activeTab === tab.key ? "text-black" : "text-black opacity-70"
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
      <div className="bg-white rounded-3xl overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${
              tabs.findIndex((tab) => tab.key === activeTab) * 100
            }%)`,
          }}
        >
          <div className="w-full flex-shrink-0 ">
            <div className="p-4 bg-purple600 rounded-3xl">
              <div className="py-8 lg:px-24 px-4 flex md:flex-row flex-col gap-8 justify-between items-center bg-line bg-contain bg-no-repeat bg-right">
                <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4">
                  <p className="w-[60px] h-[60px] rounded-full bg-purple100 flex justify-center items-center">
                    <MdSpaceDashboard className="text-purple400 text-3xl" />
                  </p>
                  <h2 className="text-purple500 font-semibold lg:text-3xl text-2xl font-clash">
                    Dashboard
                  </h2>
                  <p className="text-purple500 font-medium">
                    Enjoy the insight of actionable data all in one place for
                    easy monitoring of carrier performance
                  </p>
                  <button className="px-8 py-2 rounded-full text-white font-medium bg-purple500 w-fit">
                    Make a delivery
                  </button>
                </div>
                <div className="lg:w-[44%] md:w-[50%]">
                  <img src={dashboard} alt="dashboard" className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-shrink-0 ">
            <div className="p-4 bg-blue100 rounded-3xl">
              <div className="py-8 lg:px-24 px-4 flex md:flex-row flex-col gap-8 justify-between items-center bg-line bg-contain bg-no-repeat bg-right">
                <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4">
                  <p className="w-[60px] h-[60px] rounded-full bg-blue200 flex justify-center items-center">
                    <MdSpaceDashboard className="text-blue300 text-3xl" />
                  </p>
                  <h2 className="text-blue400 font-semibold lg:text-3xl text-2xl font-clash">
                    Real Time Tracking
                  </h2>
                  <p className="text-blue400 font-medium">
                    Monitor and know every movement of your package in real time
                    anywhere and anytime like a boss
                  </p>
                  <button className="px-8 py-2 rounded-full text-white font-medium bg-blue400 w-fit">
                    Track a Delivery
                  </button>
                </div>
                <div className="lg:w-[40%] md:w-[50%]">
                  <img
                    src={realtime}
                    alt="dashboard"
                    className="w-full mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-shrink-0 ">
            <div className="p-4 bg-orange100 rounded-3xl">
              <div className="py-8 lg:px-24 px-4 flex md:flex-row flex-col gap-8 justify-between items-center bg-line bg-contain bg-no-repeat bg-right">
                <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4">
                  <p className="w-[60px] h-[60px] rounded-full bg-orange200 flex justify-center items-center">
                    <MdSpaceDashboard className="text-orange300 text-3xl" />
                  </p>
                  <h2 className="text-brown100 font-semibold lg:text-3xl text-2xl font-clash">
                    On Time Pickup
                  </h2>
                  <p className="text-brown100 font-medium">
                    Our experts use cutting-edge technology and industry best
                    practices to enhance your logistics operations, saving you
                    time and money through streamlined processes.
                  </p>
                  <button className="px-8 py-2 rounded-full text-white font-medium bg-orange400 w-fit">
                    Schedule a Pickup
                  </button>
                </div>
                <div className="lg:w-[40%] md:w-[50%]">
                  <img src={pickup} alt="dashboard" className="w-full" />
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
