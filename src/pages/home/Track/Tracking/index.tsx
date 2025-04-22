import { Button } from "@/components/ui/button";
import Layout from "@/layouts/HomePageLayout";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OrderHistory from "./components/OrderHistory";
import ItemDetails from "./components/ItemDetails";
import ReceiverDetails from "./components/ReceiverDetails";

const Tracking = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("history");

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
              <p className="">2464 Royal Ln. Mesa, New Jersey 45463</p>
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
              <p>11:37 PM, 27 May 2023 </p>
            </div>
          </div>

          <div className="w-full border-b border-b-neutral300 md:h-[40px] h-[60px] flex md:gap-4 mt-6">
            <button
              className={`px-4 font-medium md:text-base text-sm outline-white cursor-pointer ${
                activeTab === "history"
                  ? " text-purple500 border-b border-b-purple500"
                  : "border-transparent text-black"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Order History
            </button>
            <button
              className={`px-4 font-medium md:text-base text-sm outline-white cursor-pointer ${
                activeTab === "item_details"
                  ? " text-purple500 border-b border-b-purple500"
                  : "border-transparent text-black"
              }`}
              onClick={() => setActiveTab("item_details")}
            >
              Item Details
            </button>
            <button
              className={`px-4 font-medium md:text-base text-sm outline-white cursor-pointer ${
                activeTab === "receiver_details"
                  ? " text-purple500 border-b border-b-purple500"
                  : "border-transparent text-black"
              }`}
              onClick={() => setActiveTab("receiver_details")}
            >
              Receiver Details
            </button>
          </div>
          <div className="">
            {activeTab === "history" ? (
              <div>
                <OrderHistory />
              </div>
            ) : activeTab === "item_details" ? (
              <div>
                <ItemDetails />
              </div>
            ) : (
              <div>
                <ReceiverDetails />
              </div>
            )}
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
