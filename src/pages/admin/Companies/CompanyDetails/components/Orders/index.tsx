import { PaginationComponent } from "@/components/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaginationSync } from "@/hooks/usePaginationSync";
import { UpdateProgressModal } from "@/pages/admin/Orders/modals/UpdateProgressModal";
import { useGetAllBookings } from "@/queries/user/useGetUserBookings";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDateTime, formatStatus } from "@/lib/utils";
import { statusClasses } from "@/constants";
import { Spinner } from "@/components/Spinner";

const Orders = () => {
  const [lastPage, setLastPage] = useState(1);
  const { currentPage, updatePage } = usePaginationSync(lastPage);
  const { data, isLoading, isSuccess, isError } =
    useGetAllBookings(currentPage);

  useEffect(() => {
    const totalPages = data?.data?.page?.totalPages;
    if (totalPages && totalPages !== lastPage) {
      setLastPage(totalPages);
    }
  }, [data?.data?.page?.totalPages]);
  const [bookingData, setBookingData] = useState({});

  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const [open, setOpen] = useState(false);
  const statusTabs = [
    { label: "All", count: 1000 },
    { label: "Ongoing", count: 2 },
    { label: "Completed", count: 990 },
    { label: "Canceled", count: 6 },
    { label: "Refunded", count: 2 },
  ];

  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  return (
    <div>
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
              <span className="flex-1">Category</span>
              <span className="flex-1">Parcel Weight</span>
              <span className="flex-1">Pickup Created</span>
              <span className="flex-1">Destination</span>
              <span className="flex-1">Status</span>
              <span className="flex-1">Progress</span>
              <span className="w-[2%]"></span>
            </div>

            {data?.data?.content?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative min-h-[60px] bg-white px-3 xl:px-4 border-b border-b-neutral300 text-sm flex items-center hover:bg-purple300`}
                >
                  <span className="w-[1%] mr-4">
                    <input type="checkbox" name="" id="" className="mt-1" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{item?.senderName}</p>
                    <p>{item?.trackingNumber}</p>
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
                    <p className="font-medium">{item?.receiverName}</p>
                    <p>{item?.destination}</p>
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
                  <div className="flex-1">On the way</div>

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
                          onClick={() => setOpen(true)}
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

      <UpdateProgressModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Orders;
