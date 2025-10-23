import { useEffect, useState } from "react";
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
import { useGetAllBookings } from "@/queries/user/useGetUserBookings";
import { Spinner } from "@/components/Spinner";
import { cn, formatDateTime, formatStatus } from "@/lib/utils";
import { usePaginationSync } from "@/hooks/usePaginationSync";
import { PaginationComponent } from "@/components/Pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { statusClasses, statusOptions } from "@/constants";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";

const Bookings = () => {
  const [lastPage, setLastPage] = useState(1);
  const { currentPage, updatePage } = usePaginationSync(lastPage);
  const [bookingStatus, setBookingStatus] = useState("");
  const [packageTypeId, setPackageTypeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { data: packageTypes } = useGetPackageType({ minimize: true });
  const packages = packageTypes?.data;
  const userId = sessionStorage.getItem("userId") || "";

  // Reset pagination when status changes
  useEffect(() => {
    updatePage(1); // Reset to page 1
  }, [bookingStatus, packageTypeId, debouncedSearchTerm]); // Reset when filters change
  
  const { data, isLoading, isSuccess, isError } = useGetAllBookings({
    page: currentPage,
    bookingStatus,
    search: debouncedSearchTerm,
    packageTypeId,
    senderId: userId,
  });

  useEffect(() => {
    const totalPages = data?.data?.page?.totalPages;
    if (totalPages && totalPages !== lastPage) {
      setLastPage(totalPages);
    }
  }, [data?.data?.page?.totalPages]);
  const [bookingData, setBookingData] = useState({});
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
    <div className="md:px-4">
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
              onChange={(e: any) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div>
            {/* Select options */}
            <Select
              onValueChange={(value) =>
                value === "all" ? setBookingStatus("") : setBookingStatus(value)
              }
            >
              <SelectTrigger className="bg-white h-[40px] rounded-lg border-2 min-w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {statusOptions?.map((item, index) => (
                  <SelectItem
                    value={item.value}
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
          <div className="min-w-[1200px] w-full">
            <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple300 w-full">
              <span className="w-[1%] mr-4">
                <input type="checkbox" name="" id="" className="mt-[2px]" />
              </span>
              <span className="flex-1">Tracking Number</span>
              <span className="flex-1">Courier</span>
              <span className="flex-1">Category</span>
              <span className="flex-1">Parcel Weight</span>
              <span className="flex-1">Pickup Created</span>
              <span className="w-[9%]">Status</span>
              <span className="w-[2%]"></span>
            </div>

            {data?.data?.content?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative h-[60px] bg-white px-3 xl:px-4 text-sm flex items-center border-b border-b-neutral300 hover:bg-purple300`}
                >
                  <span className="w-[1%] mr-4">
                    <input type="checkbox" name="" id="" className="mt-1" />
                  </span>
                  <div className="flex-1 text-left">
                    <p>{item?.trackingNumber}</p>
                  </div>
                  <div className="flex-1">
                    <p className="truncate">{item?.companyName}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral600">{item?.packageType}</p>
                  </div>
                  <div className="flex-1">{`${item.weight} ${item.weightUnit} | ${item.length}x${item.width}x${item.height} ${item.dimensionsUnit}`}</div>
                  <div className="flex-1">
                    {formatDateTime(item?.bookingDate)}
                  </div>
                  <div className="w-[9%]">
                    <p
                      className={cn(
                        statusClasses[item.status] ??
                          "bg-gray-100 text-gray-800", // fallback if status not found
                        "px-2 py-1 w-fit font-medium rounded-2xl text-xs"
                      )}
                    >
                      {formatStatus(item?.status)}
                    </p>
                    {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-neutral200 text-neutral600">Refunded</p> */}
                    {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-green100 text-green500">Paid</p> */}
                  </div>
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
                        <BookingDetails
                          // setActiveModalId={setActiveModalId}
                          // setIsDialogOpen={setIsDialogOpen}
                          bookingData={bookingData}
                        />
                        <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                          <LuDownload size={18} /> Download
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
    </div>
  );
};

export default Bookings;
