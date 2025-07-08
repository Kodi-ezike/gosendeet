import { MdArrowForwardIos } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Reports = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="font-inter font-semibold text-[20px] mb-2">Reports</h2>
        <p className="text-sm text-neutral600">This contains all reports</p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 mt-2">
        <div className="p-4 bg-white border border-grey100 rounded-xl">
          <p className="text-grey500 text-sm font-medium">Total Orders</p>
          <p className="text-[20px] font-inter font-semibold mt-2">50</p>
          <p className="my-8 flex justify-end">
            <MdArrowForwardIos color="#F56630" size={20} />
          </p>
          <hr />
          <div className="flex justify-between items-center pt-3">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] px-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-grey100 rounded-xl">
          <p className="text-grey500 text-sm font-medium">Total Users</p>
          <p className="text-[20px] font-inter font-semibold mt-2">50</p>
          <p className="my-8 flex justify-end">
            <MdArrowForwardIos color="#F56630" size={20} />
          </p>
          <hr />
          <div className="flex justify-between items-center pt-3">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] px-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-grey100 rounded-xl">
          <p className="text-grey500 text-sm font-medium">Total Companies</p>
          <p className="text-[20px] font-inter font-semibold mt-2">50</p>
          <p className="my-8 flex justify-end">
            <MdArrowForwardIos color="#F56630" size={20} />
          </p>
          <hr />
          <div className="flex justify-between items-center pt-3">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] px-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-grey100 rounded-xl">
          <p className="text-grey500 text-sm font-medium">Active Users</p>
          <p className="text-[20px] font-inter font-semibold mt-2">50</p>
          <p className="my-8 flex justify-end">
            <MdArrowForwardIos color="#F56630" size={20} />
          </p>
          <hr />
          <div className="flex justify-between items-center pt-3">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] px-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-grey100 rounded-xl">
          <p className="text-grey500 text-sm font-medium">Active Companies</p>
          <p className="text-[20px] font-inter font-semibold mt-2">50</p>
          <p className="my-8 flex justify-end">
            <MdArrowForwardIos color="#F56630" size={20} />
          </p>
          <hr />
          <div className="flex justify-between items-center pt-3">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] px-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>
        <div className="p-4 bg-white border border-grey100 rounded-xl">
          <p className="text-grey500 text-sm font-medium">Draft Companies</p>
          <p className="text-[20px] font-inter font-semibold mt-2">50</p>
          <p className="my-8 flex justify-end">
            <MdArrowForwardIos color="#F56630" size={20} />
          </p>
          <hr />
          <div className="flex justify-between items-center pt-3">
            <Select>
              <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent text-xs text-grey500 w-[120px] px-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">This month</SelectItem>
                <SelectItem value="2">This week</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-inter font-semibold text-green400">9.12%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
