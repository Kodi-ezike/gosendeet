import Layout from "@/layouts/HomePageLayout";
import purple from "@/assets/icons/big-purple-checkmark.png";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetBookingsById } from "@/queries/user/useGetUserBookings";
import { Spinner } from "@/components/Spinner";
import { formatDate } from "@/lib/utils";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";

  const { data, isLoading, isSuccess, isError } = useGetBookingsById(bookingId);

  const userId = sessionStorage.getItem("userId") || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      toast.error("Please sign in to continue");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  }, [userId]);

  return (
    <Layout>
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

      {!isLoading && isSuccess && data && data?.data && (
        <div className="py-10 xl:w-[70%] md:w-[80%] w-full mx-auto px-6 ">
          <div className="flex lg:flex-row flex-col gap-6 justify-between ">
            <div className="lg:w-[65%] flex flex-col gap-6">
              <div className="px-4 py-20 bg-purple300 rounded-xl">
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                  <img
                    src={purple}
                    alt="check"
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <h2 className="font-clash font-semibold text-2xl mt-1">
                    Order Placed Successfully
                  </h2>

                  <div className="text-neutral600 md:w-[90%] mb-6">
                    <p>Sit back and relax. </p>
                    <p>
                      Your order is being processed and you will get a response
                      from us in approximately 15 minutes.
                    </p>
                  </div>
                  <Button>Track Order Progress</Button>
                </div>

                <div className="flex md:flex-row flex-col gap-4 items-center justify-center mt-20">
                  <p className="font-medium">Need help with delivery</p>
                  <Button variant="secondary">Contact Support</Button>
                </div>
              </div>
            </div>
            <div className="lg:w-[35%] flex">
              <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl flex-1">
                <h2 className="font-clash font-semibold text-md mt-1">
                  Summary
                </h2>
                <hr className="border-b border-b-neutral200 my-2" />

                <div className="flex flex-col gap-6 mb-6">
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">To</span>
                    <span className="text-right">
                      {data?.data?.receiver?.name}
                    </span>
                  </p>
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Phone Number</span>
                    <span className="text-right">
                      {data?.data?.receiver?.phoneNumber}
                    </span>
                  </p>
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Destination</span>
                    <span className="text-right">
                      {data?.data?.receiver?.address}
                    </span>
                  </p>
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Pickup Date</span>
                    <span className="text-right">
                      {formatDate(data?.data?.pickupDate)}
                    </span>
                  </p>
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Logistics</span>
                    <span className="text-right">
                      {data?.data?.company?.name}
                    </span>
                  </p>
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Delivery Date</span>
                    <span className="text-right">
                      {formatDate(data?.data?.estimatedDeliveryDate)}
                    </span>
                  </p>
                </div>

                <hr className="border-b border-b-neutral200 my-6" />

                <h2 className="font-clash font-semibold text-md mt-1">
                  Price Details
                </h2>
                <hr className="border-b border-b-neutral200 my-2" />

                <div className="flex flex-col gap-6">
                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Subtotal</span>
                    <span className="text-right">
                      ₦ {data?.data?.courierCost}
                    </span>
                  </p>

                  <p className="flex justify-between items-center font-medium text-sm">
                    <span className="text-neutral600">Tax</span>
                    <span className="text-right">
                      {data?.data?.tax ? `₦${data?.data?.tax}` : "--"}
                    </span>
                  </p>
                </div>

                <hr className="border-b border-b-neutral200 my-4" />

                <p className="flex justify-between items-center font-semibold">
                  <span className="text-neutral600">Total</span>
                  <span className="text-right">₦ {data?.data?.totalCost}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {data && !data?.data && !isLoading && isSuccess && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There are no results
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Confirmation;
