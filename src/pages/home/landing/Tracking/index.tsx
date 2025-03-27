import gif from "@/assets/gif/gosend-gif.gif";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Tracking = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="lg:flex md:px-20 px-6 justify-center gap-10 items-end pb-10 mb-8">
      <div className="lg:w-[40%] md:h-[500px] h-[275px] overflow-hidden">
        <div className=" ">
          <img src={gif} alt="gif" className="md:h-[550px] h-[300px]" />
        </div>
      </div>
      <div className="lg:w-[40%] lg:mt-0 mt-10">
        <div
          onClick={() => setActiveTab("dashboard")}
          className={cn(
            activeTab === "dashboard"
              ? "border-l-4 border-l-purple400 opacity-1"
              : "opacity-10",
            "p-4 mb-8 cursor-pointer"
          )}
        >
          <h2 className="font-clash md:text-2xl text-xl font-semibold mb-2">Dashboard</h2>
          <p className="font-medium">
            Enjoy the insight of actionable data all in one place for easy
            monitoring of carrier performance
          </p>
        </div>
        <div
          onClick={() => setActiveTab("tracking")}
          className={cn(
            activeTab === "tracking"
              ? "border-l-4 border-l-purple400 opacity-1"
              : "opacity-10",
            "p-4 mb-8 cursor-pointer"
          )}
        >
          <h2 className="font-clash md:text-2xl text-xl font-semibold mb-2">
            Real Time Tracking
          </h2>
          <p className="font-medium">
            Monitor and know every movement of your package in real time
            anywhere and anytime like a boss
          </p>
        </div>
        <div
          onClick={() => setActiveTab("pickup")}
          className={cn(
            activeTab === "pickup"
              ? "border-l-4 border-l-purple400 opacity-1"
              : "opacity-10",
            "p-4 cursor-pointer"
          )}
        >
          <h2 className="font-clash md:text-2xl text-xl font-semibold mb-2">
            On Time Pickup
          </h2>
          <p className="font-medium">
            Our experts use cutting-edge technology and industry best practices
            to enhance your logistics operations, saving you time and money
            through streamlined processes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
