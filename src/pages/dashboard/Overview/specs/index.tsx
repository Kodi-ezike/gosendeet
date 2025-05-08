import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export function SpecsModal() {
  const [count, setCount] = useState(1);
  const plus = () => setCount((prev) => prev + 1);
  const minus = () => {
    if (count === 0) {
      return;
    }
    setCount((prev) => prev - 1);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-purple200 text-black px-4 py-1 outline-0 rounded-full font-outfit w-fit cursor-pointer">
          Select specifications
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <form action="">
          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="quantity"
                className="font-clash font-semibold text-sm"
              >
                Item Quantity
              </label>
              <div className="border border-neutral200 rounded-xl h-[40px] px-3 flex items-center justify-between w-[100px]">
                <p
                  className="text-neutral500 text-2xl cursor-pointer"
                  onClick={minus}
                >
                  -
                </p>
                <input
                  className="text-neutral600 border-0 outline-0 w-[40px] px-1 text-center"
                  value={count}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^\d*$/; // only digits, empty string allowed
                    if (regex.test(inputValue)) {
                      setCount(Number(inputValue));
                    }
                  }}
                />
                <p
                  className="text-neutral500 text-2xl cursor-pointer"
                  onClick={plus}
                >
                  +
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="font-clash font-semibold text-sm"
              >
                Package Description
              </label>
              <select
                name=""
                id=""
                className="border border-neutral200 text-sm rounded-xl h-[40px] px-3"
              >
                <option value="">is fragile</option>
                <option value="">is fragile</option>
                <option value="">is fragile</option>
                <option value="">is fragile</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="weight"
                className="font-clash font-semibold text-sm"
              >
                Item Weight
              </label>
              <div className="border border-neutral200  rounded-xl h-[40px] flex items-center justify-between w-full">
                <input
                  type="text"
                  className="w-[90%] outline-0 text-sm px-4 py-2 border-r-2 border-r-neutral200"
                />
                <select name="" id="" className="outline-0 px-2 text-sm">
                  <option value="kg">KG</option>
                  <option value="g">G</option>
                  <option value="lb">LB</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="dimension"
                className="font-clash font-semibold text-sm"
              >
                Item Dimension
              </label>
              <select
                name=""
                id=""
                className="border border-neutral200 text-sm rounded-xl h-[40px] px-3"
              >
                <option value="">Envelope | 32x21 x1 cm</option>
                <option value="">Envelope | 32x21 x1 cm</option>
                <option value="">Envelope | 32x21 x1 cm</option>
              </select>
            </div>
          </div>

          <p className="flex items-center gap-2 my-4 text-purple500 font-clash font-semibold text-sm">
            Advanced <IoIosArrowDown size={18} />
          </p>

          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="font-clash font-semibold text-sm"
              >
                Item Category
              </label>
              <select
                name=""
                id=""
                className="border border-neutral200 text-sm rounded-xl h-[40px] px-3"
              >
                <option value="">is fragile</option>
                <option value="">is fragile</option>
                <option value="">is fragile</option>
                <option value="">is fragile</option>
              </select>
            </div>
          </div>

          <button className="bg-black text-white rounded-full px-8 py-3 outline-black my-6">
            Add selection
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
