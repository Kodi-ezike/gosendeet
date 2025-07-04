import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import LoginHistory from "./LoginHistory";
// import Settings from "./Settings";
const UserProfiles = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    { key: "orders", label: "Orders" },
    { key: "login", label: "Login History" },
    // { key: "settings", label: "Settings" },
  ];

  const updateUnderline = (index: number) => {
    const tab = tabRefs.current[index];
    if (tab) {
      setUnderlineLeft(tab.offsetLeft);
      setUnderlineWidth(tab.offsetWidth);
    }
  };

  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    updateUnderline(currentIndex);
  }, [activeTab]);
  return (
    <div className="md:px-20 px-6 py-8 bg-neutral100">
      <Button
        variant={"ghost"}
        size={"ghost"}
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Back
      </Button>

      <div className="grid xl:grid-cols-5 md:grid-cols-3 md:gap-6 gap-6 mb-8">
        <div>
          <p className="text-neutral600 text-sm mb-2">CONTACT</p>
          <p className="text-neutral800 md:text-[20px] text-md font-inter font-semibold mb-2">
            Robert Fox
          </p>
          <p className="font-medium text-sm mb-1">wenzlaff@mac.com</p>
          <p className="font-medium text-sm">
            2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">USER ID</p>
          <p className="text-neutral800 md:text-[20px] text-md font-inter font-semibold ">
            #673971743
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">RECOVERY PHONE</p>
          <p className="text-neutral800 md:text-[20px] text-md font-inter font-semibold">
            (270) 555-0117
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">ACCOUNT CREATED</p>
          <p className="text-neutral800 md:text-[20px] text-md font-inter font-semibold">
            11:37 PM, 27 May 2023
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">ACCOUNT STATUS</p>
          {/* <p className="px-4 py-1 w-fit text-sm font-medium rounded-2xl bg-[#FEF2F2] text-[#EC2D30]">
                          Inactive
                        </p> */}
          <p className="px-4 py-[2px] text-sm w-fit font-medium rounded-2xl bg-[#e8f7ef] text-green500">
            Active
          </p>
          <p className=" text-sm mt-2">Logged in 30 mins ago </p>
        </div>
      </div>

      {/* Tab buttons */}
      <div className="overflow-x-auto">
        <div className="min-w-[635px] w-full">
          <div className="w-full border-b border-b-neutral300 h-[60px] flex md:gap-4 relative overflow-hidden">
            {tabs.map((tab, index) => (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                className={`relative px-4 font-medium md:text-base text-sm outline-white transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.key ? "text-purple500" : "text-neutral500"
                }`}
                onMouseEnter={() => {
                  updateUnderline(index);
                  setActiveTab(tab.key);
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {/* <ViewIcon/> */}
                {tab.label}
              </button>
            ))}

            {/* Active underline */}
            <div
              className="absolute bottom-0 h-[2.5px] bg-purple500 transition-all duration-300 rounded-full"
              style={{
                left: underlineLeft,
                width: underlineWidth,
              }}
            />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "orders" && <Orders />}
        {activeTab === "login" && <LoginHistory />}
        {/* {activeTab === "settings" && <Settings />} */}
      </div>
    </div>
  );
};

export default UserProfiles;
