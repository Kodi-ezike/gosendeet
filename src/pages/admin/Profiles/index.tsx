import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { AccountStatusModal } from "./modals/AccountStatusModal";
import { Link } from "react-router-dom";

const Profiles = () => {
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const results = [1, 2, 3, 4, 5];

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showModal = (id: number) => {
    setActiveModalId((prevId) => (prevId === id ? null : id)); // Toggle modal on/off
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isDialogOpen) return; // Skip if dialog is open

      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setActiveModalId(null); // Close parent modal
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDialogOpen]);

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-inter font-semibold text-[20px] mb-2">Profiles</h2>
        <p className="text-sm text-neutral600">
          This contains all registered profiles
        </p>
      </div>
      <div className="w-full bg-neutral200 p-4 md:flex items-center rounded-2xl mb-8">
        <div className="w-full">
          <p className="text-neutral500 text-sm mt-2">Active Profiles</p>
          <p className="text-[20px] font-inter font-semibold my-2">50</p>
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
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>

        <p className="h-[1px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full">
          <p className="text-neutral500 text-sm mt-2">Inactive Profiles</p>
          <p className="text-[20px] font-inter font-semibold my-2">2</p>
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
            <p className="font-inter font-semibold text-neutral500">0%</p>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-between lg:items-center gap-4 mb-6">
        <div className="text-sm font-medium flex gap-4">
          <p
            className={cn(
              status === "active"
                ? "bg-neutral300 text-neutral800"
                : "bg-neutral200 text-neutral500",
              "w-fit px-4 py-2 rounded-full cursor-pointer transition"
            )}
            onClick={() => setStatus("active")}
          >
            Active
          </p>
          <p
            className={cn(
              status === "inactive"
                ? "bg-neutral300 text-neutral800"
                : "bg-neutral200 text-neutral500",
              "w-fit px-4 py-2 rounded-full cursor-pointer transition"
            )}
            onClick={() => setStatus("inactive")}
          >
            Inactive
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border-2 rounded-lg h-[40px] px-2 py-2">
            <IoSearchOutline className="text-neutral500" />
            <input
              type="text"
              role="search"
              className="border-0 outline-0 w-[220px] text-sm text-neutral600"
              placeholder="Search profile by name or user ID"
            />
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
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple300 w-full">
            <span className="w-[1%] mr-4">
              <input type="checkbox" name="" id="" className="mt-[2px]" />
            </span>
            <span className="flex-1">Customer</span>
            <span className="flex-1">Email</span>
            <span className="flex-1">Date Created</span>
            <span className="flex-1">Last Login time</span>
            <span className="flex-1">Status</span>
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
                  <p>wenzlaff@mac.com</p>
                </div>
                <div className="flex-1">
                  <p>11:37 PM, 27 May 2023 </p>
                </div>
                <div className="flex-1">10d ago</div>

                <div className="flex-1">
                  {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-[#FEF2F2] text-[#EC2D30]">
                          Inactive
                        </p> */}
                  <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-green100 text-green500">
                    Active
                  </p>
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
                    <Link to={`/admin-dashboard/user/${index}`}>
                      <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                        View Profile
                      </p>
                    </Link>
                    <AccountStatusModal
                      setActiveModalId={setActiveModalId}
                      setIsDialogOpen={setIsDialogOpen}
                    />
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

export default Profiles;
