import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import avatar1 from "@/assets/images/avatar1.png";
import question from "@/assets/icons/dark-question.png";
import cart from "@/assets/icons/cart.png";
import weight from "@/assets/icons/weight.png";
import type from "@/assets/icons/type.png";
import house from "@/assets/icons/house.png";
import time from "@/assets/icons/time.png";
import quest from "@/assets/icons/quest.png";
export function DetailsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-purple700 underline underline-offset-3 decoration-1 decoration-purple700 cursor-pointer">
          More Details
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 md:items-center">
              <img
                src={avatar1}
                alt="avatar1"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="md:text-[18px] font-medium">
                  Hales Delivery Service
                </p>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div>
          <p className="font-clash text-sm font-semibold mb-4">
            Express Services
          </p>

          <p className="text-sm leading-140">
            Hales Express transports urgent documents and goods reliably and on
            time from door to door. The global network spans more than 220
            countries and territories, where approximately 90,000 employees
            provide services to more than 2.5 million customers.
          </p>

          <p className="text-purple500 underline underline-offset-3 decoration-1 decoration-purple500 cursor-pointer my-3 text-sm">
            Use Express Service
          </p>

          <div className="flex gap-2 items-center mb-4">
            <p className="font-clash text-sm font-semibold">Key Features</p>
            <img
              src={question}
              alt="check"
              className="w-[20px] h-[20px] rounded-full"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <img src={cart} alt="cart" />
              <p className="text-sm">1-3 working days shipping time</p>
            </div>
            <div className="flex gap-3 items-center">
              <img src={weight} alt="weight" />
              <p className="text-sm">Liability is weight dependent</p>
            </div>
            <div className="flex gap-3 items-center">
              <img src={type} alt="type" />
              <p className="text-sm">Incl. free shipment tracking</p>
            </div>
            <div>
              <div className="flex gap-3 items-center">
                <img src={house} alt="house" />
                <p className="text-sm">
                  Drop-off at a Hales Express Drop-off point.{" "}
                </p>
              </div>
              <p className="text-purple500 underline underline-offset-3 decoration-1 decoration-purple500 cursor-pointer mt-1 pl-[29px] text-sm">
                Find drop-off point
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <img src={time} alt="time" />
              <p className="text-sm">Delivery until 05:00 pm</p>
            </div>
            <div className="flex gap-3 items-center">
              <img src={quest} alt="quest" />
              <p className="text-sm">Flexible pickup period</p>
            </div>
          </div>

          <div className="flex gap-2 items-center my-4">
            <p className="font-clash text-sm font-semibold">Restrictions</p>
            <img
              src={question}
              alt="check"
              className="w-[20px] h-[20px] rounded-full"
            />
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <p>Packages may have a length of max. 300 cm</p>
            <p>Packages may have a width of max. 200 cm</p>
            <p>
              The weight of the package is calculated from the volume weight if
              this is higher than the real weight
            </p>
            <p>Packages may be max. 300 kg</p>
          </div>

          <button className="bg-black text-white w-full rounded-full px-8 py-3 outline-black mt-6">
            Show Results
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
