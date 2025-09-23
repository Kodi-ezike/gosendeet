import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import { UpdateProgressModal } from "../modals/UpdateProgressModal";
import { cn, formatDate, formatDateTime, formatStatus } from "@/lib/utils";
import { statusClasses } from "@/constants";
import { useGetBookingsById } from "@/queries/user/useGetUserBookings";
import { Spinner } from "@/components/Spinner";
import OrderHistory from "@/pages/home/Track/Tracking/components/OrderHistory";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { bookingData } = location?.state ?? {};
  const { data, isLoading, isSuccess, isError } = useGetBookingsById(
    bookingData.id
  );
  return (
    <div className="md:px-20 px-6 py-8 bg-neutral100">
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

      {!isLoading && isSuccess && data && data?.data?.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <Button
              variant={"ghost"}
              size={"ghost"}
              className=""
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
              Back
            </Button>

            <Button
              variant={"secondary"}
              className="md:text-base text-sm"
              onClick={() => setOpen(true)}
            >
              <BiEditAlt />
              Update Progress
            </Button>
          </div>

          <div className="grid xl:grid-cols-4 grid-cols-2 md:gap-6 gap-6 mb-4">
            <div>
              <p className="text-neutral600 text-sm mb-2">CONTACT</p>
              <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold mb-2">
                {data?.data?.sender?.username}
              </p>
            </div>
            <div>
              <p className="text-neutral600 text-sm mb-2">EMAIL</p>
              <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold break-all">
                {data?.data?.sender?.email}
              </p>
            </div>
            <div>
              <p className="text-neutral600 text-sm mb-2">TRACKING NUMBER</p>
              <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold ">
                {data?.data?.trackingNumber}
              </p>
            </div>
            <div>
              <p className="text-neutral600 text-sm mb-3">STATUS</p>
              <p
                className={cn(
                  statusClasses[data?.data?.status] ??
                    "bg-gray-100 text-gray-800", // fallback if status not found
                  "px-2 py-1 w-fit font-medium rounded-2xl text-base"
                )}
              >
                {formatStatus(data?.data?.status)}
              </p>
            </div>
          </div>

          <div className="flex xl:flex-row flex-col gap-8 mb-4">
            <div className="w-full">
              <div className="overflow-x-auto">
                <div className="min-w-[600px] w-full relative">
                  <div className="flex justify-between text-left px-3 xl:px-4 py-4 gap-4 text-md font-inter font-semibold bg-purple200 w-full">
                    <span className="flex-1">Order Details</span>
                    <span className="flex-1">Company Details</span>
                    <span className="flex-1">Order Summary</span>
                  </div>
                  <div className="flex justify-between text-left px-3 gap-4 xl:px-4 py-4 w-full bg-white">
                    <div className="flex-1 text-sm">
                      <div className="mb-8">
                        <p className="font-medium mb-2">Pickup Created</p>
                        <p>{formatDateTime(data?.data?.bookingDate)}</p>
                      </div>
                      <div className="mb-8">
                        <p className="font-medium mb-2">Pickup Date</p>
                        <p>{formatDate(data?.data?.pickupDate)}</p>
                      </div>

                      <div>
                        <p className="font-medium mb-2">
                          Estimated Delivery Date
                        </p>
                        <p>{formatDate(data?.data?.estimatedDeliveryDate)}</p>
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="mb-16">
                        <p className="font-medium mb-2">Company</p>
                        <p>{data?.data?.company?.name}</p>
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="flex justify-between items-center mb-2 pr-6">
                        <p className="text-neutral600">Subtotal</p>
                        <p className="text-neutral800">
                          ₦ {data?.data?.cost?.subTotal}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2 pr-6">
                        <p className="text-neutral600">Shipping Fee</p>
                        <p className="text-neutral800">
                          ₦ {data?.data?.cost?.shippingFee}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2 pr-6">
                        <p className="text-neutral600">Tax</p>
                        <p className="text-neutral800">
                          ₦ {data?.data?.cost?.tax ?? 0}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2 pr-6 font-medium">
                        <p className="text-neutral600">Total</p>
                        <p className="text-neutral800">
                          ₦ {data?.data?.cost?.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px] w-full relative mb-4">
              <div className="flex justify-between text-left px-3 xl:px-4 py-4 gap-4 text-md font-inter font-semibold bg-purple200 w-full">
                <span className="flex-1">Parcel Specs</span>
                <span className="flex-1">Pick From</span>
                <span className="flex-1">Ship To</span>
              </div>
              <div className="flex justify-between text-left px-3 gap-4 xl:px-4 py-4 w-full bg-white">
                <div className="flex-1 text-sm">
                  <div className="mb-8">
                    <p className="font-medium mb-2">Parcel Weight</p>
                    <p>{`${bookingData?.weight} ${bookingData?.weightUnit} | ${bookingData?.length}x${bookingData?.width}x${bookingData?.height} ${bookingData?.dimensionsUnit}`}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Category</p>
                    <p>{bookingData?.packageType}</p>
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <div className="mb-8">
                    <p className="font-medium mb-2">
                      {data?.data?.sender?.username}
                    </p>
                    <p className="text-neutral600 mb-2">
                      {data?.data?.pickupLocation}
                    </p>
                    <p className="text-neutral600">
                      {data?.data?.sender?.phone}
                    </p>
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <div className="mb-8">
                    <p className="font-medium mb-2">
                      {data?.data?.receiver?.name}
                    </p>
                    <p className="text-neutral600 mb-2">
                      {data?.data?.destination}
                    </p>
                    <p className="text-neutral600">
                      {data?.data?.receiver?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple200 w-full">
              <p>Delivery Progress</p>
            </div>
            <div className="grid xl:grid-cols-3 gap-4 text-sm px-3 xl:px-4 py-4 bg-white mb-6">
              <OrderHistory data={data} />
            </div>
          </div>

          <UpdateProgressModal
            open={open}
            setOpen={setOpen}
            bookingId={bookingData.id}
            progress={bookingData?.currentProgress}
            status={data?.data?.status}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
