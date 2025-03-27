import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import dashboard from "@/assets/images/dashboard.png";
import realtime from "@/assets/images/realtime.png";
import pickup from "@/assets/images/pickup.png";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("delivery");

  return (
    <div className="md:px-20 px-6 bg-neutral100 py-8">
      <div className="mt-8 mb-10">
        <div className="w-full rounded-full bg-neutral100 border border-neutral300 h-[60px] flex p-1">
          <button
            className={`flex-1 py-2 rounded-full font-clash font-semibold xl:text-xl lg:text-base text-xs outline-white ${
              activeTab === "delivery"
                ? "bg-white text-black shadow-scheduleShadow"
                : "border-transparent text-black"
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            Schedule a pickup/delivery
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-clash font-semibold xl:text-xl lg:text-base text-xs outline-white ${
              activeTab === "payment"
                ? "bg-white text-black shadow-scheduleShadow"
                : "border-transparent text-black"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Make payment and get started
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-clash font-semibold xl:text-xl lg:text-base text-xs outline-white ${
              activeTab === "receive"
                ? "bg-white text-black shadow-scheduleShadow"
                : "border-transparent text-black"
            }`}
            onClick={() => setActiveTab("receive")}
          >
            Receive your package
          </button>
        </div>
      </div>
      <div className="bg-white rounded-3xl">
        {activeTab === "delivery" ? (
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
                  Enjoy the insight of actionable data all in one place for easy
                  monitoring of carrier performance
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
        ) : activeTab === "payment" ? (
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
                Monitor and know every movement of your package in real time anywhere and anytime like a boss
                </p>
                <button className="px-8 py-2 rounded-full text-white font-medium bg-blue400 w-fit">
                Track a Delivery
                </button>
              </div>
              <div className="lg:w-[40%] md:w-[50%]">
                <img src={realtime} alt="dashboard" className="w-full mx-auto" />
              </div>
            </div>
          </div>
        ) : (
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
                Our experts use cutting-edge technology and industry best practices to enhance your logistics operations, saving you time and money through streamlined processes.
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
        )}
      </div>
    </div>
  );
};

export default Schedule;
