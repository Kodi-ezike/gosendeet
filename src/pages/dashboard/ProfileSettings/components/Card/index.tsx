import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import mastercard from "@/assets/images/logos_mastercard.png";
const Card = () => {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex lg:flex-row flex-col gap-8 mb-8">
      <div className="lg:w-[40%] md:px-4">
        <h2 className="font-clash font-semibold text-[20px] mb-2">
          Card Details
        </h2>
        <p className="text-neutral600 text-sm">Select your default payment</p>
      </div>
      <div className="lg:w-[60%] md:px-4">
        <div className="border border-purple500 rounded-xl px-4 py-6 bg-purple300 flex items-center gap-6 max-w-xl mb-4">
          {/* Custom Checkbox */}
          <label className="relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => setIsSelected(!isSelected)}
              className="peer sr-only"
            />
            <div className="w-[20px] h-[20px] rounded-full border-2 border-neutral700 peer-checked:bg-purple500 peer-checked:border-purple500 flex items-center justify-center transition-colors">
              {isSelected && <FaCheck color="white" size={12} />}
            </div>
          </label>
          {/* Card Info */}
          <div className="flex md:flex-row flex-col gap-6 md:items-center">
            <div>
              <img src={mastercard} alt="Mastercard" className="w-10 mr-4" />
            </div>

            <div>
              <p className="font-clash font-semibold text-sm mb-4">
                Mastercard ending in 9876
              </p>

              <p className="text-sm text-neutral-700 md:mb-0 mb-4">
                Expiry 06/2007
              </p>

              <div className="flex items-center gap-4">
                <p
                  className={`${
                    isSelected
                      ? "text-purple600"
                      : "text-purple700 cursor-pointer"
                  }`}
                >
                  Set as default
                </p>
                <Button
                  variant={"ghost"}
                  className="text-purple500 hover:text-purple700 py-0"
                >
                  <FiEdit />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button variant={"secondary"}>
          <FaPlus />
          Add another card
        </Button>
      </div>
    </div>
  );
};

export default Card;
