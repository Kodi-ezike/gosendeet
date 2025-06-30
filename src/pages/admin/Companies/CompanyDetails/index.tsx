import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BiEditAlt } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UpdateCompanyModal } from "../modals/UpdateCompanyModal";
import purple from "@/assets/icons/purple-checkmark.png";
import blue from "@/assets/icons/blue-checkmark.png";
import orange from "@/assets/icons/orange-checkmark.png";
import CoverSheet from "./components/CoverSheet";
import Orders from "./components/Orders";
import Ratings from "./components/Ratings";

const CompanyDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const initialTab = sessionStorage.getItem("companyTab");
  const [activeTab, setActiveTab] = useState(initialTab || "cover");
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    { key: "cover", label: "Cover Sheet" },
    { key: "orders", label: "Orders" },
    { key: "rating", label: "Ratings" },
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
      <div className="flex justify-between items-center mb-8">
        <Button
          variant={"ghost"}
          size={"ghost"}
          className=""
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </Button>

        <Button
          variant={"secondary"}
          className="md:text-base text-sm"
          // onClick={() => setOpen(true)}
        >
          <BiEditAlt />
          Update Info
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-6 mb-4">
        <div>
          <p className="text-neutral600 text-sm mb-2">COMPANY NAME</p>
          <p className="text-neutral800 md:text-[20px] text-sm font-clash font-semibold mb-2">
            DHL Logistics
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">ACCOUNT CREATED</p>
          <p className="text-neutral800 md:text-[20px] text-sm font-clash font-semibold break-all">
            11:37 PM, 27 May 2023
            {/* (Adedoyin Ester)  */}
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">SERVICES</p>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2 items-center bg-purple200 w-fit py-[6px] px-[8px] rounded-full md:justify-self-end">
              <img
                src={purple}
                alt="check"
                className="w-[20px] h-[20px] rounded-full"
              />
              <p className="text-xs mr-1 text-purple500">Pickup</p>
            </div>
            <div className="flex gap-2 items-center bg-[#F1F8FF] w-fit py-[6px] px-[8px] rounded-full md:justify-self-end">
              <img
                src={blue}
                alt="check"
                className="w-[20px] h-[20px] rounded-full"
              />
              <p className="text-xs mr-1 text-[#0BA5EC]">Home/Work Delivery</p>
            </div>
            <div className="flex gap-2 items-center bg-[#FFF3E8] w-fit py-[6px] px-[8px] rounded-full md:justify-self-end">
              <img
                src={orange}
                alt="check"
                className="w-[20px] h-[20px] rounded-full"
              />
              <p className="text-xs mr-1 text-[#FF8C1A]">Branch Drop off</p>
            </div>
          </div>
        </div>
      </div>

      <div>
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
              onClick={() => {
                setActiveTab(tab.key);
                sessionStorage.setItem("companyTab", tab.key);
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

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "cover" && <CoverSheet />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "rating" && <Ratings />}
        </div>
      </div>

      <UpdateCompanyModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default CompanyDetails;
