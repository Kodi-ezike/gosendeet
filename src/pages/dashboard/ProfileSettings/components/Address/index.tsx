import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Address = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-8 mb-8">
      <div className="lg:w-[40%] md:px-4">
        <h2 className="font-clash font-semibold text-[20px] mb-2">Address</h2>
        <p className="text-neutral600 text-sm">
          Edit your preferred address here
        </p>
      </div>
      <div className="lg:w-[60%] md:px-4">
        <div className="mt-2">
          <div className="mb-6 w-full">
            <h2 className="font-clash font-semibold text-sm mb-2">Address</h2>
            <div className="flex md:flex-row flex-col md:justify-between items-start gap-2 mb-2">
              <div>
                <p className="text-neutral600 text-sm mb-2">
                  14, Aare quarters, New-Bodija, Ibadan, Oyo, Nigeria. 394877
                </p>
                <p className="text-neutral800 text-sm">+234567890123</p>
              </div>
              <Button
                variant={"ghost"}
                className="text-purple500 hover:text-purple700"
              >
                <FiEdit />
                Edit
              </Button>
            </div>
          </div>
          <Button variant={"secondary"}>
            <FaPlus />
            Add another address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Address;
