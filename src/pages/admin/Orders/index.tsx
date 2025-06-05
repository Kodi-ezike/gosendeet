import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import bellActive from "@/assets/icons/bell-active.png";
import bellComplete from "@/assets/icons/bell-complete.png";
import bellOff from "@/assets/icons/bell-off.png";
// import { AccountStatusModal } from "./modals/AccountStatusModal";
import { Link } from "react-router-dom";
import { UpdateProgressModal } from "./modals/UpdateProgressModal";

const Orders = () => {
  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const [open, setOpen] = useState(false);
  const statusTabs = [
    { label: "All", count: 1000 },
    { label: "Ongoing", count: 2 },
    { label: "Completed", count: 990 },
    { label: "Canceled", count: 6 },
    { label: "Refunded", count: 2 },
  ];
  const results = [1, 2, 3, 4, 5];

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showModal = (id: number) => {
    setActiveModalId((prevId) => (prevId === id ? null : id)); // Toggle modal on/off
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // if (isDialogOpen) return; // Skip if dialog is open

      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setActiveModalId(null); // Close parent modal
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-clash font-semibold text-[20px] mb-2">Orders</h2>
        <p className="text-sm text-neutral600">
          This contains all placed orders
        </p>
      </div>
      <div className="w-full bg-neutral200 p-4 md:flex items-center rounded-2xl mb-8">
        <div className="w-full">
          <div className="flex justify-between items-center mt-2">
            <p className="text-neutral500 text-sm">Active Orders</p>
            <img src={bellActive} alt="bellActive" />
          </div>
          <p className="text-[20px] font-clash font-semibold my-2">50</p>
          <hr className="border-neutral700" />
          <div className="flex justify-between items-center py-2">
            <Select>
              <SelectTrigger className="outline-0 border-0 text-xs text-grey500 w-[120px] p-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-clash font-semibold text-green400">9.12%</p>
          </div>
        </div>

        <p className="h-[0.7px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full">
          <div className="flex justify-between items-center mt-2">
            <p className="text-neutral500 text-sm ">Completed Orders</p>
            <img src={bellComplete} alt="bellComplete" />
          </div>
          <p className="text-[20px] font-clash font-semibold my-2">2</p>
          <hr className="border-neutral700" />
          <div className="flex justify-between items-center py-2">
            <Select>
              <SelectTrigger className="outline-0 border-0 text-xs text-grey500 w-[120px] p-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-clash font-semibold text-neutral500">0%</p>
          </div>
        </div>

        <p className="h-[1px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full">
          <div className="flex justify-between items-center mt-2">
            <p className="text-neutral500 text-sm ">Cancelled Orders</p>
            <img src={bellOff} alt="bellOff" />
          </div>
          <p className="text-[20px] font-clash font-semibold my-2">2</p>
          <hr className="border-neutral700" />
          <div className="flex justify-between items-center py-2">
            <Select>
              <SelectTrigger className="outline-0 border-0 text-xs text-grey500 w-[120px] p-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-clash font-semibold text-neutral500">0%</p>
          </div>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col justify-between xl:items-center gap-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveStatusTab(tab.label)}
              className={`rounded-full px-4 py-2 text-sm transition-colors font-medium ${
                activeStatusTab === tab.label
                  ? "bg-neutral300 text-neutral800 "
                  : "bg-neutral200 text-neutral500"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
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
              <SelectTrigger className="h-[40px] rounded-lg border-2">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="51">All</SelectItem>
                <SelectItem value="1">Envelope</SelectItem>
                <SelectItem value="2">Parcel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {/* Select options */}
            <Select>
              <SelectTrigger className="h-[40px] rounded-lg border-2">
                <SelectValue placeholder="Date Created" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[1100px] w-full relative">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple300 w-full">
            <span className="w-[1%] mr-4">
              <input type="checkbox" name="" id="" className="mt-[2px]" />
            </span>
            <span className="flex-1">Customer</span>
            <span className="flex-1">Courier</span>
            <span className="flex-1">Category</span>
            <span className="flex-1">Parcel Weight</span>
            <span className="flex-1">Pickup Created</span>
            <span className="flex-1">Status</span>
            <span className="flex-1">Progress</span>
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
                <div className="flex-1">
                  <p className="font-medium">Robert Fox</p>
                  <p>#95214362</p>
                </div>
                <div className="flex-1">
                  <p>DHL Logistics</p>
                </div>
                <div className="flex-1">
                  <p>Envelope</p>
                </div>
                <div className="flex-1">
                  <p>15kg | 3x5x8 cm</p>
                </div>
                <div className="flex-1">
                  <p>11:37 PM, 27 May 2023 </p>
                </div>
                <div className="flex-1">
                  <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-green100 text-green500">
                    Completed
                  </p>
                  {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-[#FEF2F2] text-[#EC2D30]">
                          Canceled
                        </p> */}
                  {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-neutral200 text-neutral600">
                          Refunded
                        </p> */}
                  {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-[#FB8C001A] text-[#FB8C00]">
                    Ongoing
                  </p> */}
                </div>
                <div className="flex-1">On the way</div>

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
                    <Link to={`/admin-dashboard/order/${index}`}>
                      <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                        View full details
                      </p>
                    </Link>
                    <p
                      className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      Update progress
                    </p>
                    <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                      Refund
                    </p>
                    {/* <AccountStatusModal
                      setActiveModalId={setActiveModalId}
                      setIsDialogOpen={setIsDialogOpen}
                    /> */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <UpdateProgressModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Orders;
