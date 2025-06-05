import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import { UpdateProgressModal } from "../modals/UpdateProgressModal";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:px-20 px-6 py-8 bg-neutral100">
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
          <p className="text-neutral800 md:text-[20px] text-sm font-clash font-semibold mb-2">
            Robert Fox
          </p>
          {/* <p className="font-medium text-sm mb-1">wenzlaff@mac.com</p>
          <p className="font-medium text-sm">
            2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
          </p> */}
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">EMAIL</p>
          <p className="text-neutral800 md:text-[20px] text-sm font-clash font-semibold break-all">
            wenzlaff@mac.com
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-2">ORDER NUMBER</p>
          <p className="text-neutral800 md:text-[20px] text-sm font-clash font-semibold ">
            #673971743
          </p>
        </div>
        <div>
          <p className="text-neutral600 text-sm mb-3">STATUS</p>
          {/* <p className="px-4 py-1 w-fit text-sm font-medium rounded-2xl bg-[#FEF2F2] text-[#EC2D30]">
                          Cancelled
                        </p> */}
          <p className="px-4 py-[2px] text-sm w-fit font-medium rounded-2xl bg-[#e8f7ef] text-green500">
            Completed
          </p>
        </div>
      </div>

      <div className="flex xl:flex-row flex-col gap-8 mb-4">
        <div className="xl:w-3/4">
          <div className="overflow-x-auto">
            <div className="min-w-[600px] w-full relative">
              <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple200 w-full">
                <span className="flex-1">Order Details</span>
                <span className="flex-1">Company Details</span>
                <span className="flex-1">Additional Info</span>
              </div>
              <div className="flex justify-between text-left px-3 xl:px-4 py-4 w-full bg-white">
                <div className="flex-1 text-sm">
                  <div className="mb-8">
                    <p className="font-medium mb-2">Pickup Created</p>
                    <p>11:37 PM, 27 May 2023 </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Order Completed</p>
                    <p>11:37 PM, 27 May 2023 </p>
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <div className="mb-8">
                    <p className="font-medium mb-2">Company</p>
                    <p>DHL Logistics</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Branch</p>
                    <p>Ibadan</p>
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <div className="flex justify-between items-center mb-2 pr-6">
                    <p className="text-neutral600">Subtotal</p>
                    <p className="text-neutral800">$40.00</p>
                  </div>
                  <div className="flex justify-between items-center mb-2 pr-6">
                    <p className="text-neutral600">Shipping Fee</p>
                    <p className="text-neutral800">FREE</p>
                  </div>
                  <div className="flex justify-between items-center mb-2 pr-6">
                    <p className="text-neutral600">Tax</p>
                    <p className="text-neutral800">$4.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-1/4">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple200 w-full">
            <span className="flex-1">Order Summary</span>
          </div>
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 w-full bg-white">
            <div className="flex-1 text-sm">
              <div className="mb-8">
                <p className="font-medium mb-2">Order Total</p>
                <p>$44.00</p>
              </div>
              <div>
                <p className="font-medium mb-2">Payment Method</p>
                <p>Transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px] w-full relative mb-4">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple200 w-full">
            <span className="flex-1">Parcel Specs</span>
            <span className="flex-1">Pick From</span>
            <span className="flex-1">Ship To</span>
          </div>
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 w-full bg-white">
            <div className="flex-1 text-sm">
              <div className="mb-8">
                <p className="font-medium mb-2">Parcel Weight</p>
                <p>15kg | 3x5x8 cm</p>
              </div>
              <div>
                <p className="font-medium mb-2">Category</p>
                <p>Envelope</p>
              </div>
            </div>
            <div className="flex-1 text-sm">
              <div className="mb-8">
                <p className="font-medium mb-2">Robert Fox</p>
                <p className="text-neutral600 pr-6">
                  14, Aare quarters, New-Bodija, Ibadan, Oyo, Nigeria. 394877
                </p>
              </div>
            </div>
            <div className="flex-1 text-sm">
              <div className="mb-8">
                <p className="font-medium mb-2">Johanne Effiong</p>
                <p className="text-neutral600 pr-6 mb-2">
                  17, Marina, VI, Lagos
                </p>
                <p className="text-neutral600">090123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="px-3 xl:px-4 py-4 text-md font-clash font-semibold bg-purple200 w-full">
          <p>Delivery Progress</p>
        </div>
        <div className="grid xl:grid-cols-3 text-sm px-3 xl:px-4 py-4 bg-white mb-6">
          <div className="flex gap-4 py-4">
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="w-[10px] h-[10px] rounded-full bg-green500"></p>
              <p className="flex-1 w-[1.5px] bg-green500/50"></p>
            </div>
            <div>
              <h4 className="font-semibold font-clash mb-1">On the way</h4>
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
              <h4 className="font-semibold font-clash mb-1">
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
              <h4 className="font-semibold font-clash mb-1">
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

      <UpdateProgressModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default OrderDetails;
