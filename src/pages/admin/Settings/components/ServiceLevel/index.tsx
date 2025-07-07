import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

const ServiceLevel = () => {
  const results = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="flex items-center gap-4 justify-end">
        <div className="flex items-center gap-2 border-2 rounded-lg h-[40px] px-2 py-2">
          <IoSearchOutline className="text-neutral500" />
          <input
            type="text"
            role="search"
            className="border-0 outline-0 w-[150px] text-sm text-neutral600"
            placeholder="Search"
          />
        </div>

        <Button variant={"secondary"} className="h-[42px]">
          <Plus /> Add new
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px] w-full relative">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple300 w-full">
            <span className="flex-1">Service Level</span>
            <span className="w-[2%]"></span>
          </div>

          {results?.map((index) => {
            return (
              <div
                key={index}
                className={`relative min-h-[60px] bg-white py-2 px-3 xl:px-4 text-sm flex items-center ${
                  index === 0 ? "border-b-0" : "border-b border-b-neutral300"
                } hover:bg-purple300`}
              >
                <div className="flex-1">
                  <p>Express</p>
                </div>
                
                <div className="w-[2%]">
                  <BiSolidTrashAlt  size={20}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceLevel;
