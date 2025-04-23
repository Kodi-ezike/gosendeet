import { Button } from "@/components/ui/button";
import Layout from "@/layouts/HomePageLayout";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import OrderHistory from "./components/OrderHistory";
import ItemDetails from "./components/ItemDetails";
import ReceiverDetails from "./components/ReceiverDetails";

const Tracking = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("history");
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    { key: "history", label: "Order History" },
    { key: "item_details", label: "Item Details" },
    { key: "receiver_details", label: "Receiver Details" },
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
    <Layout>
      <div className="md:px-20 px-6 md:py-16 py-8">
        <div className="xl:w-[65%] md:w-[90%] mx-auto bg-purple300 md:py-16 py-4 xl:px-24 md:px-10 px-4">
          <h1 className="lg:text-[40px] md:text-[30px] text-2xl font-semibold font-clash mb-6">
            Tracking #{id}
          </h1>

          <div className="grid md:grid-cols-2 gap-4 md:text-base text-sm">
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold font-clash">Item #{id}</p>
              <p>2464 Royal Ln. Mesa, New Jersey 45463</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold font-clash">Weight</p>
              <p>15kg</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold font-clash">Courier</p>
              <p>DHL Logistics</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold font-clash">Start Time</p>
              <p>11:37 PM, 27 May 2023</p>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="w-full border-b border-b-neutral300 md:h-[40px] h-[60px] flex md:gap-4 mt-6 relative overflow-hidden">
            {tabs.map((tab, index) => (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                className={`relative z-10 px-4 font-medium md:text-base text-sm outline-white transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.key ? "text-purple500" : "text-black"
                }`}
                onMouseEnter={() => {
                  updateUnderline(index);
                  setActiveTab(tab.key);
                }}
                onClick={() => setActiveTab(tab.key)}
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

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "history" && <OrderHistory />}
            {activeTab === "item_details" && <ItemDetails />}
            {activeTab === "receiver_details" && <ReceiverDetails />}
          </div>

          <div className="flex md:flex-row flex-col gap-4 items-center justify-center mt-5">
            <p className="font-medium">Need help with delivery</p>
            <Button variant="secondary">Contact Support</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tracking;
