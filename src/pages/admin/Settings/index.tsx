import { useEffect, useRef, useState } from "react";
import PackageType from "./components/PackageType";
import ServiceLevel from "./components/ServiceLevel";
import CoverageArea from "./components/CoverageArea";
import PickupOption from "./components/PickupOption";
import LocationCode from "./components/LocationCode";

const Settings = () => {
  const initialTab = sessionStorage.getItem("settingsTab");
  const [activeTab, setActiveTab] = useState(initialTab || "type");
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    { key: "type", label: "Package Type" },
    { key: "level", label: "Service Level" },
    { key: "area", label: "Coverage Area" },
    { key: "option", label: "Pick up Option" },
    { key: "code", label: "Location Code" },
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
    <div>
      <div className="mb-4">
        <h2 className="font-inter font-semibold text-[20px] mb-2">Settings</h2>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="sidebar xl:block hidden p-4 bg-white w-[15%] min-h-[50vh]">
          {tabs.map((tab) => (
            <p
              key={tab.key}
              className={`p-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${
                activeTab === tab.key ? "text-purple500" : "text-black"
              }`}
              onClick={() => {
                setActiveTab(tab.key);
                sessionStorage.setItem("settingsTab", tab.key);
              }}
            >
              {tab.label}
            </p>
          ))}
        </div>
        <div className="xl:w-[85%] w-full">
          <div className="tabs xl:hidden block overflow-auto">
            {/* Tab Buttons */}
            <div className="w-fit min-w-[800px] border-b border-b-neutral300 md:h-[40px] h-[60px] flex md:gap-4 mb-4 relative overflow-hidden">
              {tabs.map((tab, index) => (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  className={`relative z-10 px-4 font-medium md:text-base text-sm outline-white transition-colors duration-300 cursor-pointer ${
                    activeTab === tab.key ? "text-purple500" : "text-black"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    sessionStorage.setItem("settingsTab", tab.key);
                  }}
                >
                  {tab.label}
                </button>
              ))}

              {/* Active underline */}
              <div
                className="absolute bottom-0 h-[1px] bg-purple500 transition-all duration-300 rounded-full"
                style={{
                  left: underlineLeft,
                  width: underlineWidth,
                }}
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="">
            {activeTab === "type" && <PackageType />}
            {activeTab === "level" && <ServiceLevel />}
            {activeTab === "area" && <CoverageArea />}
            {activeTab === "option" && <PickupOption />}
            {activeTab === "code" && <LocationCode />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
