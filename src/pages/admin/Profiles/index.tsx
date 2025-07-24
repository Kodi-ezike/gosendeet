// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { cn, formatTimestampToReadable, timeAgo } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import UpdateUserStatusModal from "./modals/UpdateUserStatusModal";
import { Link } from "react-router-dom";
import { useGetProfiles } from "@/queries/admin/useGetAdminProfiles";
import { Spinner } from "@/components/Spinner";

const Profiles = () => {
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [singleUserStatus, setSingleUserStatus] = useState("");

  const [userStatus, setUserStatus] = useState("");
  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedProfileSearchTerm, setDebouncedProfileSearchTerm] =
    useState("");

  const page = 0;
  const size = 10;
  const role = "";
  const status = "";

  const { data, isLoading, isSuccess, isError } = useGetProfiles(
    page,
    size,
    status,
    role,
    debouncedProfileSearchTerm
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedProfileSearchTerm(searchTerm);
    }, 1000); // 1 second after user stops typing

    return () => {
      clearTimeout(handler); // cancel timeout if user types again
    };
  }, [searchTerm]);

  const profiles = data?.data.content;
  console.log(profiles);

  const filteredData = profiles?.filter((item: any) =>
    userStatus ? item.status === userStatus : true
  );

  const activeProfiles = profiles?.filter(
    (item: any) => item.status === "active"
  );
  const inactiveProfiles = profiles?.filter(
    (item: any) => item.status === "inactive"
  );

  const statusTabs = [
    {
      label: "All",
      status: "",
      count: profiles?.length ?? 0,
    },
    {
      label: "Active",
      status: "active",
      count: activeProfiles?.length ?? 0,
    },
    {
      label: "Inactive",
      status: "inactive",
      count: inactiveProfiles?.length ?? 0,
    },
  ];

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
        <h2 className="font-inter font-semibold text-[20px] mb-2">Profiles</h2>
        <p className="text-sm text-neutral600">
          This contains all registered profiles
        </p>
      </div>
      <div className="w-full bg-neutral200 p-4 md:flex items-center rounded-2xl mb-8">
        <div className="w-full flex flex-col gap-4 justify-between py-2">
          <p className="text-neutral500 text-sm">Active Profiles</p>
          <p className="text-[20px] font-inter font-semibold md:mb-6">
            {activeProfiles?.length ?? 0}
          </p>
          {/* <hr className="border-neutral700" />
          <div className="flex justify-between items-center py-2">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] p-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div> */}
        </div>

        <p className="h-[1px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full flex flex-col gap-4 justify-between py-2">
          <p className="text-neutral500 text-sm">Inactive Profiles</p>
          <p className="text-[20px] font-inter font-semibold md:mb-6">
            {inactiveProfiles?.length ?? 0}
          </p>
          {/* <hr className="border-neutral700" />
          <div className="flex justify-between items-center py-2">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] p-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-neutral500">0%</p>
          </div> */}
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-between lg:items-center gap-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveStatusTab(tab.label);
                setUserStatus(tab.status);
              }}
              className={`rounded-full px-4 py-2 text-sm transition-colors font-medium cursor-pointer ${
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
              className="border-0 outline-0 w-[220px] text-sm text-neutral600"
              placeholder="Search profile by name"
              onChange={(e: any) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          {/* <div>
            <Select>
              <SelectTrigger className="h-[40px] rounded-lg border-2">
                <SelectValue placeholder="Date Created" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </div>

      {isLoading && !isSuccess && (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {isError && !isLoading && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There was an error getting the data
          </p>
        </div>
      )}

      {!isLoading && isSuccess && data && profiles?.length > 0 && (
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

            {filteredData?.map((item: any, index: number) => {
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
                    <p className="font-medium">{item.username}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.email}</p>
                  </div>
                  <div className="flex-1">
                    <p>{formatTimestampToReadable(item.createdAt)}</p>
                  </div>
                  <div className="flex-1">
                    {item.lastLogin ? timeAgo(item.lastLogin) : "N/A"}
                  </div>

                  <div className="flex-1">
                    <p
                      className={cn(
                        item.status === "active"
                          ? "bg-green100 text-green500"
                          : "bg-[#FEF2F2] text-[#EC2D30]",
                        "px-4 py-1 w-fit font-medium rounded-2xl capitalize"
                      )}
                    >
                      {item.status}
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
                      <Link
                        to={`/admin-dashboard/user/${index + 1}`}
                        state={{ id: item.id }}
                      >
                        <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                          View Profile
                        </p>
                      </Link>
                      <p
                        className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                        onClick={() => {
                          setUsername(item.username);
                          setUserId(item.id);
                          setOpenUpdateStatus(true);
                          setSingleUserStatus(item.status);
                        }}
                      >
                        Update status
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data && profiles?.length === 0 && !isLoading && isSuccess && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There are no results
          </p>
        </div>
      )}

      <UpdateUserStatusModal
        openUpdateStatus={openUpdateStatus}
        setOpenUpdateStatus={setOpenUpdateStatus}
        username={username}
        userId={userId}
        userStatus={singleUserStatus}
      />
    </div>
  );
};

export default Profiles;
