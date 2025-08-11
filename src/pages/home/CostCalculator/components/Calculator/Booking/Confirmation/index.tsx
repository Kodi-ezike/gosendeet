import Layout from "@/layouts/HomePageLayout";
import purple from "@/assets/icons/big-purple-checkmark.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const Confirmation = () => {
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
          <div className="lg:w-[35%]">
            <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
              <h2 className="font-clash font-semibold text-md mt-1">Summary</h2>
              <hr className="border-b border-b-neutral200 my-2" />

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

              <hr className="border-b border-b-neutral200 my-3" />

              <h2 className="font-clash font-semibold text-md mt-1">
                Price Details
              </h2>
              <hr className="border-b border-b-neutral200 my-2" />

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

              <hr className="border-b border-b-neutral200 my-4" />

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

export default Confirmation;
