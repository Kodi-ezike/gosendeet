import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiDetail } from "react-icons/bi";
import { FiDownloadCloud } from "react-icons/fi";
import card from "@/assets/images/mastercard.png";
import { RxExternalLink } from "react-icons/rx";

export function BookingDetails({ setActiveModalId, setIsDialogOpen }: any) {
  return (
    <Dialog
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setActiveModalId(null); // Close parent modal when Dialog closes
        }
      }}
    >
      <DialogTrigger asChild>
        <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
          <BiDetail size={18} /> View Details
        </p>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            <p className="font-clash text-[20px] text-left font-semibold mt-2">
              #3948774
            </p>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center gap-2">
            <p className="flex items-center gap-2 w-fit border-offset-1 font-medium text-purple500 border-b-[1.5px] border-b-purple500 cursor-pointer">
              <FiDownloadCloud />
              Download
            </p>
            <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-green100 text-green500">
              Paid
            </p>
            {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-[#FEF2F2] text-[#EC2D30]">
              Canceled
            </p> */}
            {/* <p className="px-4 py-1 w-fit font-medium rounded-2xl bg-neutral200 text-neutral600">Refunded</p> */}
          </div>
          <div className="grid md:grid-cols-3 gap-5 my-10">
            <div className="flex flex-col gap-2">
              <p className="font-clash font-semibold ">From</p>
              <p className="text-sm font-medium">Victor Agbeniga</p>
              <p className="text-neutral600">
                14, Aare quarters, New-Bodija, Ibadan, Oyo, Nigeria. 394877
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-clash font-semibold ">To</p>
              <p className="text-sm font-medium">Johanne Effiong</p>
              <p className="text-neutral600">17, Marina, VI, Lagos</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-clash font-semibold ">Payment</p>
              <div>
                <img src={card} alt="card" className="h-[24px]" />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <p className="font-clash font-semibold ">Pickup Created</p>
              <p className="text-sm">11:37 PM, 27 May 2023 </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-clash font-semibold ">Logistics</p>
              <p className="text-sm">DHL</p>
              <p className="text-neutral600">Ibadan</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-clash font-semibold ">Parcel Weight</p>
              <p className="text-sm">15kg | 3x5x8 cm</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <p className="font-clash font-semibold ">Category</p>
            <p className="text-sm">Envelope</p>
          </div>
          <div className="flex flex-col gap-2 my-10 text-sm">
            <p className="flex justify-between items-center md:px-8 px-4">
              Subtotal
              <span className="font-clash font-semibold">$40.00</span>
            </p>
            <p className="flex justify-between items-center md:px-8 px-4">
              Shipping Fee
              <span className="font-clash font-semibold">FREE</span>
            </p>
            <p className="flex justify-between items-center md:px-8 px-4">
              Tax
              <span className="font-clash font-semibold">$4.00</span>
            </p>
            <p className="flex justify-between items-center md:px-8 px-4 py-4 font-clash font-semibold bg-neutral200 rounded-full">
              TOTAL COSTS + VAT
              <span>$44.00</span>
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-center gap-2 items-center mb-10">
            <p className="font-medium">Need help?</p>
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Contact GoSendeet help</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
