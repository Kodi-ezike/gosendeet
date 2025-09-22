import { useState } from "react";
import logos from "@/assets/images/logos.png";
import CreateBooking from "@/components/CreateBooking";
import TrackBooking from "@/components/TrackBooking";

const Header = () => {
  const [activeTab, setActiveTab] = useState("delivery");

  const tabs = [
    { key: "delivery", label: "Delivery/Pickup" },
    { key: "track", label: "Track" },
  ];

  return (
    <div className="homepage-header lg:h-[90vh] lg:flex items-center md:px-20 px-6 lg:py-0 py-20">
      <div className="lg:w-1/2">
        <div className="flex gap-2 items-center w-fit pl-4 pr-8  bg-white rounded-full">
          <img
            src={logos}
            alt="logos"
            className="xl:h-full md:h-[50px] h-[30px]"
          />
          <p className="font-medium text-neutral600 xl:text-md md:text-sm text-xs">
            50+ logistics companies for your deliveries
          </p>
        </div>
        <h1 className="font-clash xl:text-[60px] lg:text-[50px] text-[40px] font-semibold xl:leading-[130%] leading-[110%] my-6 lg:w-[90%]">
          Pairing you with logistics that works{" "}
          <span className="font-tiempos font-normal italic"> best for you</span>
        </h1>
        <p className="text-neutral600 lg:w-[85%]">
          Trust us to optimize your supply chain, providing you the peace of
          mind to grow and focus on your core business
        </p>
      </div>
      <div className="lg:w-1/2 lg:mt-0 mt-10">
        <div className="md:w-[90%] mx-auto border md:min-h-[480px] bg-purple300 border-purple100 rounded-3xl shadow-deliveryShadow py-8 px-4">
          {/* Tab Buttons */}
          <div className="w-full rounded-full bg-purple200 h-[60px] flex py-1 relative overflow-hidden">
            <div
              className={`absolute top-1 left-1  h-[calc(100%-8px)] rounded-full bg-white shadow-scheduleShadow transition-all duration-500`}
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
                className={`flex-1 relative z-10 py-2 rounded-full font-outfit font-medium transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.key ? "text-black" : "text-black opacity-70"
                }`}
                onMouseEnter={() => setActiveTab(tab.key)}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl">
            {activeTab === "delivery" ? (
              <div className="p-4 text-sm">
                <CreateBooking />
              </div>
            ) : (
              <div className="p-4 text-sm">
                <TrackBooking/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
