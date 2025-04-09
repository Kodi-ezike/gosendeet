import { SpecsModal } from "@/pages/home/landing/Header/modals/specs";
import { FiSearch } from "react-icons/fi";
import location from "@/assets/icons/location.png";
import size from "@/assets/icons/size.png";
import purple from "@/assets/icons/purple-checkmark.png";
import green from "@/assets/icons/green-checkmark.png";
import avatar1 from "@/assets/images/avatar1.png";
import avatar2 from "@/assets/images/avatar2.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DetailsModal } from "./modals/details";
import { Button } from "@/components/ui/button";
const Calculator = () => {
  const options = [
    { value: "price", title: "Price (cheapest first)" },
    { value: "time", title: "Delivery time (fastest)" },
  ];
  return (
    <div className="md:px-20 px-6 py-16">
      <form action="" className="flex lg:flex-row flex-col gap-4 w-full">
        <div className="flex gap-3 items-center py-3 px-4 border-b w-full">
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
        <div className="flex gap-3 items-center py-3 px-4 border-b w-full">
          <img src={location} alt="location" />
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="destination" className="font-clash font-semibold">
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
        <div className="flex gap-3 items-center py-3 px-4 border-b w-full">
          <img src={size} alt="size" />
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="location" className="font-clash font-semibold">
              Packaging
            </label>

            <SpecsModal />
          </div>
        </div>

        <div className="flex items-end p-2">
          <button className=" bg-black rounded-full px-4 py-2 outline-black">
            <FiSearch className="text-white text-xl" />
          </button>
        </div>
      </form>

      {/* Select options */}
      <Select>
        <SelectTrigger className="mt-16 mb-6 bg-white h-[40px] rounded-full">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item, index) => (
            <SelectItem
              value={item.title}
              key={index}
              className="focus:bg-purple200"
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-6">
        <div className="border border-purple500 bg-purple300 rounded-md p-4">
          <div className="flex lg:flex-row lg:justify-between gap-4 flex-col py-4 border-b border-b-neutral700">
            <div className="flex gap-2 md:items-center">
              <img
                src={avatar1}
                alt="avatar1"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <div className="flex md:flex-row flex-col md:gap-2 md:text-[18px]">
                  <p className="font-medium">Hales Delivery Service </p>
                  <DetailsModal />
                </div>
                <p className="text-sm">
                  Same day pickup, 1-2 business days delivery
                </p>
              </div>
            </div>
            <div className="px-[10px]">
              <div className="flex gap-2 items-center mb-4">
                <img
                  src={purple}
                  alt="check"
                  className="w-[20px] h-[20px] rounded-full"
                />
                <p className="text-xs text-purple500">Pickup</p>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={purple}
                  alt="check"
                  className="w-[20px] h-[20px] rounded-full"
                />
                <p className="text-xs text-purple500">Home/Work Delivery</p>
              </div>
            </div>
          </div>
          <div className="lg:flex grid md:grid-cols-2 md:gap-4 gap-2 justify-between items-center py-4">
            <div>
              <p className="text-purple800 font-clash md:text-[18px] font-semibold">
                Estimated Delivery:
              </p>
              <p className="text-sm">Tue, 11 Feb - Wed, 12 Feb</p>
            </div>
            <div className="flex gap-2 items-center bg-green100 w-fit py-2 px-4 rounded-full md:justify-self-end">
              <img
                src={green}
                alt="check"
                className="w-[20px] h-[20px] rounded-full"
              />
              <p className="text-xs text-green500">Next Day Delivery</p>
            </div>
            <div>
              <p className="font-clash md:text-[18px] font-semibold">
                Starting from NGN 2,000
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button className="px-12 py-3 rounded-full bg-purple400 hover:bg-purple500 text-white text-sm font-medium outline-purple400">
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div className="border border-purple500 bg-purple300 rounded-md p-4">
          <div className="flex lg:flex-row lg:justify-between gap-4 flex-col py-4 border-b border-b-neutral700">
            <div className="flex gap-2 md:items-center">
              <img
                src={avatar2}
                alt="avatar2"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <div className="flex md:flex-row flex-col md:gap-2 md:text-[18px]">
                  <p className="font-medium">Speed Delivery</p>
                  <DetailsModal />
                </div>
                <p className="text-sm">
                  Same day pickup, 1-2 business days delivery
                </p>
              </div>
            </div>
            <div className="px-[10px]">
              <div className="flex gap-2 items-center mb-4">
                <img
                  src={purple}
                  alt="check"
                  className="w-[20px] h-[20px] rounded-full"
                />
                <p className="text-xs text-purple500">Pickup</p>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={purple}
                  alt="check"
                  className="w-[20px] h-[20px] rounded-full"
                />
                <p className="text-xs text-purple500">Home/Work Delivery</p>
              </div>
            </div>
          </div>
          <div className="lg:flex grid md:grid-cols-2 md:gap-4 gap-2 justify-between items-center py-4">
            <div>
              <p className="text-purple800 font-clash md:text-[18px] font-semibold">
                Estimated Delivery:
              </p>
              <p className="text-sm">Tue, 11 Feb - Wed, 12 Feb</p>
            </div>
            <div className="flex gap-2 items-center bg-green100 w-fit py-2 px-4 rounded-full md:justify-self-end">
              <img
                src={green}
                alt="check"
                className="w-[20px] h-[20px] rounded-full"
              />
              <p className="text-xs text-green500">Next Day Delivery</p>
            </div>
            <div>
              <p className="font-clash md:text-[18px] font-semibold">
                Starting from NGN 2,000
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button className="px-12 py-3 rounded-full bg-purple400 hover:bg-purple500 text-white text-sm font-medium outline-purple400">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
