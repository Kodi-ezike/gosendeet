import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuDownload } from "react-icons/lu";
import { BookingDetails } from "./details";

const statusOptions = [
  { value: "paid", title: "Paid" },
  { value: "canceled", title: "Canceled" },
  { value: "refunded", title: "Refunded" },
];

const categoryOptions = [
  { value: "all", title: "All" },
  { value: "envelope", title: "Envelope" },
  { value: "package", title: "Package" },
];

const Bookings = () => {
  const results = [1, 2, 3, 4, 5];

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const showModal = (id: number) => {
    setActiveModalId((prevId) => (prevId === id ? null : id)); // Toggle modal on/off
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveModalId(null); // Close modal
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <h2 className="font-clash font-semibold text-[20px] mb-4">Bookings</h2>
      <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4 mb-6">
        <p className="text-sm text-neutral600">
          This contains all your shipment orders
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border-2 rounded-lg h-[40px] px-2 py-2">
            <IoSearchOutline className="text-neutral500" />
            <input
              type="text"
              role="search"
              className="border-0 outline-0 w-[150px] text-sm text-neutral600"
              placeholder="Search order"
            />
          </div>
          <div>
            {/* Select options */}
            <Select>
              <SelectTrigger className="bg-white h-[40px] rounded-lg border-2">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions?.map((item, index) => (
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
          </div>
          <div>
            {/* Select options */}
            <Select>
              <SelectTrigger className="bg-white h-[40px] rounded-lg border-2">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions?.map((item, index) => (
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
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1100px] w-full">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple300 w-full">
            <span className="w-[1%] mr-4">
              <input type="checkbox" name="" id="" className="mt-[2px]" />
            </span>
            <span className="flex-1">Order Number</span>
            <span className="flex-1">Courier</span>
            <span className="flex-1">Category</span>
            <span className="flex-1">Parcel Weight</span>
            <span className="flex-1">Pickup Created</span>
            <span className="flex-1">Destination</span>
            <span className="w-[9%]">Status</span>
            <span className="w-[2%]"></span>
          </div>

          {results?.map((index) => {
            return (
              <div
                key={index}
                className={`relative h-[60px] bg-white px-3 xl:px-4 text-sm flex items-center ${
                  index === 0 ? "border-b-0" : "border-b border-b-neutral300"
                } hover:bg-purple300`}
              >
                <span className="w-[1%] mr-4">
                  <input type="checkbox" name="" id="" className="mt-1" />
                </span>
                <div className="flex-1 text-left">
                  <p>#3948774</p>
                </div>
                <div className="flex-1">
                  <p>DHL Logistics</p>
                </div>
                <div className="flex-1">
                  <p className="text-neutral600">Envelope</p>
                </div>
                <div className="flex-1">15kg | 3x5x8 cm</div>
                <div className="flex-1">11:37 PM, 27 May 2023 </div>
                <div className="flex-1">
                  <p>Emery Torff</p>
                  <p className="text-neutral600">Marina, VI, Lagos</p>
                </div>
                <div className="w-[9%]">
                  <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-[#FEF2F2] text-[#EC2D30]">
                    Canceled
                  </p>
                  {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-neutral200 text-neutral600">Refunded</p> */}
                  {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-green100 text-green500">Paid</p> */}
                </div>
                <div className="w-[2%]">
                  <button className="border p-1 rounded-md border-neutral200">
                    <BsThreeDotsVertical
                      size={20}
                      className="p-1 cursor-pointer"
                      onClick={() => showModal(index)}
                    />
                  </button>
                </div>

                {/* Modal */}
                {activeModalId === index && ( // Show modal only for the active event
                  <div
                    className="modal w-fit bg-white shadow-md p-1 rounded-md z-10 absolute top-12 right-6"
                    ref={modalRef} // Attach ref to the modal
                  >
                      <BookingDetails />
                    <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                      <LuDownload size={18} /> Download
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
