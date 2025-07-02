import { FiSearch } from "react-icons/fi";
import size from "@/assets/icons/size.png";
import location from "@/assets/icons/location.png";
import { RxExternalLink } from "react-icons/rx";
import { SpecsModal } from "./specs";
import Bookings from "../Bookings";
import { useGetUserDetails } from "@/queries/user/useGetUserDetails";

const Overview = () => {
  const userId = localStorage.getItem("userId") || "";

  const { data: userData } = useGetUserDetails(userId);
  const username = userData?.data?.username ?? "";
  return (
    <div>
      <div className="flex justify-between md:items-center mb-4 md:px-4">
        <h2 className="font-clash font-semibold text-[20px]">
          Hello {username},
        </h2>

        <div>
          <p className="md:text-md text-sm font-clash font-semibold ">
            Your User ID
          </p>
          <p className="md:text-sm text-xs">3948774</p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-8 mb-10">
        <div className="lg:w-[60%] bg-white xl:p-10 py-6 px-2 rounded-3xl text-sm">
          <h3 className="text-md font-clash font-semibold mb-4">
            Add New Shipment
          </h3>
          <form action="">
            <div className="flex gap-3 items-center py-3 px-4 border-b">
              <img src={location} alt="location" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pickup" className="font-clash font-semibold">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickup"
                  placeholder="Where from?"
                  className="w-full outline-0"
                />
              </div>
            </div>
            <div className="flex gap-3 items-center py-3 px-4 border-b">
              <img src={location} alt="location" />
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="destination"
                  className="font-clash font-semibold"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Where to?"
                  className="w-full outline-0"
                />
              </div>
            </div>
            <div className="flex gap-3 items-center py-3 px-4 border-b">
              <img src={size} alt="size" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="location" className="font-clash font-semibold">
                  Packaging
                </label>

                <SpecsModal />
              </div>
            </div>

            <button className="flex items-center gap-3 bg-black rounded-full px-8 py-3 outline-black mt-4">
              <FiSearch className="text-white text-xl" />
              <span className="text-white">Get a quick quote</span>
            </button>
          </form>
        </div>
        <div className="lg:w-[40%] bg-white xl:p-10 py-6 px-2 rounded-3xl">
          <h3 className="text-md font-clash font-semibold">Customer Support</h3>
          <p className="my-6 text-sm text-neutral600">
            Need help with your shipment, costing or anything at all?
          </p>

          <div className="mb-4">
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Browse our FAQs</span>
            </button>
          </div>
          <div>
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Contact our support</span>
            </button>
          </div>
        </div>
      </div>

      <Bookings />
    </div>
  );
};

export default Overview;
