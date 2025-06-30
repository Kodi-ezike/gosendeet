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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import purple from "@/assets/icons/purple-checkmark.png";
import blue from "@/assets/icons/blue-checkmark.png";
// import orange from "@/assets/icons/orange-checkmark.png";
import ArchiveCompanyModal from "./modals/ArchiveCompanyModal";

// import { UpdateProgressModal } from "./modals/UpdateProgressModal";

const Companies = () => {
  const [activeStatusTab, setActiveStatusTab] = useState("Active");
  // const [open, setOpen] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const statusTabs = [
    { label: "Active", count: 1000 },
    { label: "Draft", count: 2 },
    { label: "Archived", count: 990 },
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
        <h2 className="font-clash font-semibold text-[20px] mb-2">Companies</h2>
        <p className="text-sm text-neutral600">
          This contains all partnered companies
        </p>
      </div>
      <div className="w-full bg-neutral200 p-4 md:flex items-center rounded-2xl mb-8">
        <div className="w-full">
          <div className="flex justify-between items-center mt-2">
            <p className="text-neutral500 text-sm">Active Companies</p>
          </div>
          <p className="text-[20px] font-clash font-semibold my-2">12</p>
          <hr className="border-neutral700" />
          <div className="flex justify-between items-center py-2">
            <Select>
              <SelectTrigger className="outline-0 border-0 text-xs mr-1 text-grey500 w-[120px] p-0">
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
            <p className="text-neutral500 text-sm ">Draft Companies</p>
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
            <p className="text-neutral500 text-sm ">Archived Companies</p>
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
              placeholder="Search company"
            />
          </div>
          <div>
            {/* Select options */}
            <Select>
              <SelectTrigger className="h-[40px] rounded-lg border-2">
                <SelectValue placeholder="Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="51">All</SelectItem>
                <SelectItem value="1">Pickup</SelectItem>
                <SelectItem value="2">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Link to={"companies/add-company"}>
              <Button variant={"secondary"} className="h-[42px]">
                <Plus /> Add new company
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[1200px] w-full relative">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple300 w-full">
            <span className="w-[1%] mr-4">
              <input type="checkbox" name="" id="" className="mt-[2px]" />
            </span>
            <span className="flex-1">Company Name</span>
            <span className="flex-1">Email</span>
            <span className="flex-1">Contact</span>
            <span className="flex-1">Services</span>
            <span className="flex-1">Pickup</span>
            <span className="flex-1">Delivery</span>
            <span className="w-[2%]"></span>
          </div>

          {results?.map((index) => {
            return (
              <div
                key={index}
                className={`relative min-h-[60px] bg-white py-2 px-3 xl:px-4 text-sm flex items-center ${
                  index === 0 ? "border-b-0" : "border-b border-b-neutral300"
                } hover:bg-purple300`}
              >
                <span className="w-[1%] mr-4">
                  <input type="checkbox" name="" id="" className="mt-1" />
                </span>
                <div className="flex-1">
                  <p>DHL Logistics</p>
                </div>
                <div className="flex-1">
                  <p>company@delivery.com</p>
                </div>
                <div className="flex-1">
                  <p>+234 9123456789</p>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-2 items-center bg-purple300 w-fit py-[6px] px-[8px] rounded-full md:justify-self-end">
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
                  {/* <div className="flex gap-2 items-center bg-[#FFF3E8] w-fit py-[6px] px-[8px] rounded-full md:justify-self-end">
                    <img
                      src={orange}
                      alt="check"
                      className="w-[20px] h-[20px] rounded-full"
                    />
                    <p className="text-xs mr-1 text-[#FF8C1A]">Branch Drop off</p>
                  </div> */}
               
                </div>
                <div className="flex-1">
                  <p>Same day</p>
                </div>
                <div className="flex-1">1-2 business days</div>
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
                    <Link to={`/admin-dashboard/company/${index}`}>
                      <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                        View full details
                      </p>
                    </Link>
                    <p
                      className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                      // onClick={() => setOpen(true)}
                    >
                      Update info
                    </p>
                    <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer" onClick={()=>setOpenArchive(true)}>
                      Archive
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
      {/* <UpdateProgressModal open={open} setOpen={setOpen} /> */}
          <ArchiveCompanyModal openArchive={openArchive} setOpenArchive={setOpenArchive}/>
    </div>
  );
};

export default Companies;
