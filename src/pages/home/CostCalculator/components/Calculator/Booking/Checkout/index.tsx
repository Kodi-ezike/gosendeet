import { Button } from "@/components/ui/button";
import Layout from "@/layouts/HomePageLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const Checkout = () => {
  const userId = sessionStorage.getItem("userId") || "";
  const location = useLocation();
  const { bookingId, bookingData } = location?.state || {};
  console.log(bookingId);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      toast.error("Please sign in to continue");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  }, [userId]);

  // navigate("/confirmation");

  return (
    <Layout>
      <div className="py-10 xl:w-[70%] md:w-[80%] w-full mx-auto px-6 ">
        <p className="text-neutral600 font-medium leading-140 mb-2">Step 2/3</p>
        <h1 className="font-clash font-semibold text-2xl leading-130 mb-2">
          Checkout
        </h1>
        <p className="mb-4 text-neutral600">
          Your booking is on pending until payment is made here
        </p>

        <div className="flex md:flex-row flex-col gap-6 justify-between ">
          <div className="lg:w-[65%] flex flex-col gap-6">
            <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
              <h2 className="font-clash font-semibold text-md mt-1">
                Booking info
              </h2>
              <hr className="border-b border-b-neutral200 my-4" />

              <div className="flex md:flex-row flex-col gap-6">
                <div className="md:w-1/2">
                  <p className="font-clash font-semibold mb-2">From</p>
                  <p className="font-medium text-sm">
                    {bookingData?.senderName}
                  </p>
                </div>
                <div className="md:w-1/2">
                  <p className="font-clash font-semibold mb-2">Phone Number</p>
                  <p className="font-medium text-sm">
                    {bookingData?.senderPhone}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
                <h2 className="font-clash font-semibold text-md mt-1">
                  Receiver Details
                </h2>
                <hr className="border-b border-b-neutral200 mt-4 mb-6" />

                <div className="flex md:flex-row flex-col gap-6">
                  <div className="md:w-1/2">
                    <p className="font-clash font-semibold mb-2">To</p>
                    <p className="font-medium text-sm">
                      {bookingData?.receiverName}
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <p className="font-clash font-semibold mb-2">
                      Phone Number
                    </p>
                    <p className="font-medium text-sm">
                      {bookingData?.receiverPhone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
                <h2 className="font-clash font-semibold text-md mt-1">
                  Payment Details
                </h2>
                <hr className="border-b border-b-neutral200 my-4" />
                <div className="flex gap-2 items-start mb-4">
                  <input
                    type="checkbox"
                    className="mt-1"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <p className="text-sm">
                    By clicking this, I acknowledge that I have read and agree
                    with GoSendeet terms.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-purple400 hover:bg-purple500 rounded-full py-3 px-8 text-white"
                  disabled={!isChecked}
                >
                  {/* {isPending && <Loader2 className="h-6 w-6 animate-spin" />}  */}
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:w-[35%]">
            <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
              <h2 className="font-clash font-semibold text-md mt-1">Summary</h2>
              <hr className="border-b border-b-neutral200 my-4" />

              <div className="flex flex-col gap-6">
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">To</span>
                  <span>Johanne Effiong</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Phone Number</span>
                  <span>2345678909876</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Address</span>
                  <span>17, Marina, VI, Lagos</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Pickup Date</span>
                  <span> 27 May 2025 </span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Logistics</span>
                  <span>DHL Ibadan</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Delivery Date</span>
                  <span> 30 May 2025 </span>
                </p>
              </div>

              <hr className="border-b border-b-neutral200 my-10" />

              <h2 className="font-clash font-semibold text-md mt-1">
                Price Details
              </h2>
              <hr className="border-b border-b-neutral200 my-4" />

              <div className="flex flex-col gap-6">
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Subtotal</span>
                  <span>$40.00</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Shipping Fee</span>
                  <span>FREE</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Tax</span>
                  <span>$4.00</span>
                </p>
              </div>

              <hr className="border-b border-b-neutral200 my-6" />

              <p className="flex justify-between items-center font-semibold">
                <span className="text-neutral600">Total</span>
                <span>$44.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
