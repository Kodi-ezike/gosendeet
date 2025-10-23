import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import bellActive from "@/assets/icons/bell-active.png";
import bellComplete from "@/assets/icons/bell-complete.png";
import bellOff from "@/assets/icons/bell-off.png";
import { Link } from "react-router-dom";
import { UpdateProgressModal } from "./modals/UpdateProgressModal";
import {
  useGetAllBookings,
  useGetBookingsStats,
} from "@/queries/user/useGetUserBookings";
import { usePaginationSync } from "@/hooks/usePaginationSync";
import { Spinner } from "@/components/Spinner";
import { PaginationComponent } from "@/components/Pagination";
import { cn, formatDateTime, formatStatus } from "@/lib/utils";
import { statusClasses } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TbBellRinging } from "react-icons/tb";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";

const Orders = () => {
  const [lastPage, setLastPage] = useState(1);
  const { currentPage, updatePage } = usePaginationSync(lastPage);
  const savedStatus = sessionStorage.getItem("savedStatus") || "";
  const [bookingStatus, setBookingStatus] = useState(savedStatus);
  const [packageTypeId, setPackageTypeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { data: bookingStats } = useGetBookingsStats();
  const { data: packageTypes } = useGetPackageType({ minimize: true });
  const packages = packageTypes?.data;
  // Reset pagination when status changes
  useEffect(() => {
    updatePage(1); // Reset to page 1
  }, [bookingStatus, packageTypeId, debouncedSearchTerm]); // Reset when filters change
  
  const { data, isLoading, isSuccess, isError } = useGetAllBookings({
    page: currentPage,
    bookingStatus,
    search: debouncedSearchTerm,
    packageTypeId,
  });

  useEffect(() => {
    const totalPages = data?.data?.page?.totalPages;
    if (totalPages && totalPages !== lastPage) {
      setLastPage(totalPages);
    }
  }, [data?.data?.page?.totalPages]);
  const [bookingData, setBookingData] = useState({});
  const [bookingId, setBookingId] = useState("");
  const [orderProgress, setOrderProgress] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const savedLabel = sessionStorage.getItem("savedLabel") || "All";
  const [activeStatusTab, setActiveStatusTab] = useState(savedLabel);

  const [open, setOpen] = useState(false);
  const statusTabs = [
    { label: "All", status: "", count: bookingStats?.data?.totalBookings ?? 0 },
    {
      label: "Active",
      status: "PENDING",
      count: bookingStats?.data?.activeBookings ?? 0,
    },
    {
      label: "Completed",
      status: "DELIVERED",
      count: bookingStats?.data?.deliveredBookings ?? 0,
    },
    {
      label: "Cancelled",
      status: "CANCELLED",
      count: bookingStats?.data?.cancelledBookings ?? 0,
    },
  ];

  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1 second after user stops typing

    return () => {
      clearTimeout(handler); // cancel timeout if user types again
    };
  }, [searchTerm]);

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-inter font-semibold text-[20px] mb-2">Orders</h2>
        <p className="text-sm text-neutral600">
          This contains all placed orders
        </p>
      </div>
      <div className="w-full bg-neutral200 p-4 md:flex items-center rounded-2xl mb-8">
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-neutral500 text-sm">All Orders</p>
            <img src={bellActive} alt="bellActive" />
          </div>
          <p className="text-[20px] font-inter font-semibold my-2">
            {bookingStats?.data?.totalBookings ?? 0}
          </p>
        </div>

        <p className="h-[0.7px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-neutral500 text-sm">Active Orders</p>
            <TbBellRinging size={24} className="text-yellow-500" />
          </div>
          <p className="text-[20px] font-inter font-semibold my-2">
            {bookingStats?.data?.activeBookings ?? 0}
          </p>
        </div>

        <p className="h-[0.7px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-neutral500 text-sm ">Completed Orders</p>
            <img src={bellComplete} alt="bellComplete" />
          </div>
          <p className="text-[20px] font-inter font-semibold my-2">
            {bookingStats?.data?.deliveredBookings ?? 0}
          </p>
        </div>

        <p className="h-[1px] w-full my-4 mx-0 bg-neutral700 sm:h-[120px] sm:w-[1px] sm:mx-4 sm:my-0"></p>

        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-neutral500 text-sm ">Cancelled Orders</p>
            <img src={bellOff} alt="bellOff" />
          </div>
          <p className="text-[20px] font-inter font-semibold my-2">
            {bookingStats?.data?.cancelledBookings ?? 0}
          </p>
        </div>
      </div>

      <div className="flex xl:flex-row flex-col justify-between xl:items-center gap-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveStatusTab(tab.label);
                setBookingStatus(tab.status);
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
              className="border-0 outline-0 w-[150px] text-sm text-neutral600"
              placeholder="Search order"
              onChange={(e: any) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div>
            {/* Select options */}
            <Select
              onValueChange={(value) =>
                value === "all" ? setPackageTypeId("") : setPackageTypeId(value)
              }
            >
              <SelectTrigger className="h-[40px] rounded-lg border-2 min-w-[150px] max-w-[300px]">
                <SelectValue placeholder="Package Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {packages?.map((item: any) => (
                  <SelectItem value={item.id} key={item.id}>
                    {item?.name} ({item?.maxWeight} {item?.weightUnit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

      {!isLoading && isSuccess && data && data?.data?.content?.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[1100px] w-full relative">
            <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple300 w-full">
              <span className="w-[1%] mr-4">
                <input type="checkbox" name="" id="" className="mt-[2px]" />
              </span>
              <span className="flex-1">Customer</span>
              <span className="flex-1">Courier</span>
              <span className="flex-1">Package Type</span>
              <span className="flex-1">Parcel Weight</span>
              <span className="flex-1">Pickup Created</span>
              <span className="flex-1">Status</span>
              <span className="flex-1">Progress</span>
              <span className="w-[2%]"></span>
            </div>

            {data?.data?.content?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative h-[60px] bg-white px-3 xl:px-4 border-b border-b-neutral300 text-sm flex items-center hover:bg-purple300`}
                >
                  <span className="w-[1%] mr-4">
                    <input type="checkbox" name="" id="" className="mt-1" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{item?.senderName}</p>
                    <p>{item?.trackingNumber}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item?.companyName}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item?.packageType}</p>
                  </div>
                  <div className="flex-1">
                    <p>{`${item?.weight} ${item?.weightUnit} | ${item?.length}x${item?.width}x${item?.height} ${item?.dimensionsUnit}`}</p>
                  </div>
                  <div className="flex-1">
                    <p> {formatDateTime(item?.bookingDate)}</p>
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        statusClasses[item?.status] ??
                          "bg-gray-100 text-gray-800", // fallback if status not found
                        "px-2 py-1 w-fit font-medium rounded-2xl text-xs"
                      )}
                    >
                      {formatStatus(item?.status)}
                    </p>
                  </div>
                  <div className="flex-1">{item?.currentProgress}</div>

                  <div className="w-[2%]">
                    <Popover
                      open={activeModalId === index}
                      onOpenChange={(open) =>
                        setActiveModalId(open ? index : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <button className="border p-1 rounded-md border-neutral200">
                          <BsThreeDotsVertical
                            size={20}
                            className="p-1 cursor-pointer"
                            onClick={() => {
                              setActiveModalId(index);
                              setBookingData(item);
                            }}
                          />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit p-1">
                        <Link
                          to={`/admin-dashboard/order/${index}`}
                          state={{ bookingData: bookingData }}
                        >
                          <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                            View full details
                          </p>
                        </Link>
                        <p
                          className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                          onClick={() => {
                            setOpen(true);
                            setBookingId(item?.id);
                            setOrderProgress(item?.currentProgress);
                            setOrderStatus(item.status);
                          }}
                        >
                          Update progress
                        </p>
                        <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                          Refund
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            })}
          </div>

          <PaginationComponent
            lastPage={data?.data?.page?.totalPages}
            currentPage={currentPage}
            handlePageChange={updatePage}
          />
        </div>
      )}

      {data && data?.data?.content?.length === 0 && !isLoading && isSuccess && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There are no results
          </p>
        </div>
      )}

      <UpdateProgressModal
        open={open}
        setOpen={setOpen}
        bookingId={bookingId}
        progress={orderProgress}
        status={orderStatus}
      />
    </div>
  );
};

export default Orders;
