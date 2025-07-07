import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

const PackageType = () => {
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
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-sm font-inter font-semibold bg-purple300 w-full">
            <span className="w-[15%]">Package type</span>
            <span className="flex-1">Length</span>
            <span className="flex-1">Width</span>
            <span className="flex-1">Height</span>
            <span className="flex-1">Max Weight</span>
            <span className="flex-1">Dimension unit</span>
            <span className="flex-1">Weight unit</span>
            <span className="flex-1">Code</span>
            <span className="flex-1">Status</span>
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
                <div className="w-[15%]">
                  <p>Envelope</p>
                </div>
                <div className="flex-1">
                  <p>10</p>
                </div>
                <div className="flex-1">
                  <p>10</p>
                </div>
                <div className="flex-1">
                  <p>10</p>
                </div>
                <div className="flex-1">
                  <p>10</p>
                </div>
                <div className="flex-1">
                  <p>m</p>
                </div>
                <div className="flex-1">
                  <p>kg</p>
                </div>
                <div className="flex-1">ENV1</div>
                <div className="flex-1">
                  <Switch
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  />
                </div>
                <div className="w-[2%]">
                  <BiSolidTrashAlt size={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PackageType;
