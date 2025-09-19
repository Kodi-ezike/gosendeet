import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import { UpdateProgressModal } from "../modals/UpdateProgressModal";
import { cn, formatDateTime, formatStatus } from "@/lib/utils";
import { statusClasses } from "@/constants";
import { useGetBookingsById } from "@/queries/user/useGetUserBookings";
import { Spinner } from "@/components/Spinner";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { bookingData } = location?.state ?? {};
  //  isLoading, isSuccess, isError
  const { data, isLoading, isSuccess, isError } = useGetBookingsById(
    bookingData.id
  );
  console.log(data);
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
                {bookingData?.senderName}
              </p>
              {/* <p className="font-medium text-sm mb-1">wenzlaff@mac.com</p>
          <p className="font-medium text-sm">
            2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
          </p> */}
            </div>
            <div>
              <p className="text-neutral600 text-sm mb-2">EMAIL</p>
              <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold break-all">
                {bookingData?.senderEmail}
              </p>
            </div>
            <div>
              <p className="text-neutral600 text-sm mb-2">TRACKING NUMBER</p>
              <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold ">
                {bookingData?.trackingNumber}
              </p>
            </div>
            <div>
              <p className="text-neutral600 text-sm mb-3">STATUS</p>
              <p
                className={cn(
                  statusClasses[bookingData?.status] ??
                    "bg-gray-100 text-gray-800", // fallback if status not found
                  "px-2 py-1 w-fit font-medium rounded-2xl text-base"
                )}
              >
                {formatStatus(bookingData?.status)}
              </p>
            </div>
          </div>

          <div className="flex xl:flex-row flex-col gap-8 mb-4">
            <div className="w-full">
              <div className="overflow-x-auto">
                <div className="min-w-[600px] w-full relative">
                  <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple200 w-full">
                    <span className="flex-1">Order Details</span>
                    <span className="flex-1">Company Details</span>
                    <span className="flex-1">Order Summary</span>
                  </div>
                  <div className="flex justify-between text-left px-3 xl:px-4 py-4 w-full bg-white">
                    <div className="flex-1 text-sm">
                      <div className="mb-16">
                        <p className="font-medium mb-2">Pickup Created</p>
                        <p>{formatDateTime(bookingData?.bookingDate)}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Order Completed</p>
                        <p>
                          {bookingData?.deliveryDate
                            ? formatDateTime(bookingData?.deliveryDate)
                            : "--"}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="mb-8">
                        <p className="font-medium mb-2">Company</p>
                        <p>{bookingData?.companyName}</p>
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="flex justify-between items-center mb-2 pr-6">
                        <p className="text-neutral600">Subtotal</p>
                        <p className="text-neutral800">
                          ₦ {bookingData?.cost?.subTotal}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2 pr-6">
                        <p className="text-neutral600">Shipping Fee</p>
                        <p className="text-neutral800">
                          ₦ {bookingData?.cost?.shippingFee}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2 pr-6">
                        <p className="text-neutral600">Tax</p>
                        <p className="text-neutral800">
                          ₦ {bookingData?.cost?.tax ?? 0}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-2 pr-6 font-medium">
                        <p className="text-neutral600">Total</p>
                        <p className="text-neutral800">
                          ₦ {bookingData?.cost?.total}
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
              <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple200 w-full">
                <span className="flex-1">Parcel Specs</span>
                <span className="flex-1">Pick From</span>
                <span className="flex-1">Ship To</span>
              </div>
              <div className="flex justify-between text-left px-3 xl:px-4 py-4 w-full bg-white">
                <div className="flex-1 text-sm">
                  <div className="mb-16">
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
                      {bookingData?.senderName}
                    </p>
                    <p className="text-neutral600 pr-6">
                      {bookingData?.pickupLocation}
                    </p>
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <div className="mb-8">
                    <p className="font-medium mb-2">
                      {bookingData?.receiverName}
                    </p>
                    <p className="text-neutral600 pr-6 mb-2">
                      {bookingData?.destination}
                    </p>
                    <p className="text-neutral600">
                      {bookingData?.receiverPhone}
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
            <div className="grid xl:grid-cols-3 text-sm px-3 xl:px-4 py-4 bg-white mb-6">
              <div className="flex gap-4 py-4">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p className="w-[10px] h-[10px] rounded-full bg-green500"></p>
                  <p className="flex-1 w-[1.5px] bg-green500/50"></p>
                </div>
                <div>
                  <h4 className="font-semibold font-inter mb-1">On the way</h4>
                  <p className="text-neutral500 mb-1">11:37 PM, 27 May 2023 </p>
                  <p className="text-neutral600 mb-2">
                    Parcel is on the way to its destination
                  </p>
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p className="w-[10px] h-[10px] rounded-full bg-green500"></p>
                  <p className="flex-1 w-[1.5px] bg-green500/50"></p>
                </div>
                <div>
                  <h4 className="font-semibold font-inter mb-1">
                    Received by Logistic Company
                  </h4>
                  <p className="text-neutral500 mb-1">11:37 PM, 27 May 2023 </p>
                  <p className="text-neutral600 mb-2">
                    Package picked and journey has started to delivery to your
                    customer
                  </p>
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p className="w-[10px] h-[10px] rounded-full bg-neutral300"></p>
                  <p className="flex-1 w-[1.5px] bg-neutral300/50"></p>
                </div>
                <div>
                  <h4 className="font-semibold font-inter mb-1">
                    Pickup request accepted
                  </h4>
                  <p className="text-neutral500 mb-1">11:37 PM, 27 May 2023 </p>
                  <p className="text-neutral600 mb-2">
                    Our delivery guy is on the way to pickup your package
                  </p>
                </div>
              </div>
            </div>
          </div>

          <UpdateProgressModal
            open={open}
            setOpen={setOpen}
            bookingId={bookingData.id}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
