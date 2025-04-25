import gif from "@/assets/gif/gosend-gif.gif";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
    <div className="lg:flex md:px-20 px-6 justify-center gap-10 items-end py-10 mb-8">
      <div className="lg:w-[40%] md:h-[500px] h-[275px] overflow-hidden">
        <div className=" ">
          <img src={gif} alt="gif" className="md:h-[550px] h-[300px]" />
        </div>
      </div>
      <div className="lg:w-[40%] lg:mt-0 mt-10">
        {tabs.map((tab) => (
          <div
            key={tab}
            onMouseEnter={() => {
              setActiveTab(tab);
              setIsPaused(true);
            }}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => setActiveTab(tab)}
            className={cn(
              activeTab === tab
                ? "border-l-4 border-l-purple400 opacity-100 bg-purple50"
                : "opacity-10",
              "p-4 mb-8 cursor-pointer transition-all duration-500 ease-in-out rounded"
            )}
          >
            <h2 className="font-clash md:text-2xl text-xl font-semibold mb-2 capitalize">
              {tab === "dashboard" && "Dashboard"}
              {tab === "tracking" && "Real Time Tracking"}
              {tab === "pickup" && "On Time Pickup"}
            </h2>
            <p className="font-medium">
              {tab === "dashboard" &&
                "Enjoy the insight of actionable data all in one place for easy monitoring of carrier performance"}
              {tab === "tracking" &&
                "Monitor and know every movement of your package in real time anywhere and anytime like a boss"}
              {tab === "pickup" &&
                "Our experts use cutting-edge technology and industry best practices to enhance your logistics operations, saving you time and money through streamlined processes."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
