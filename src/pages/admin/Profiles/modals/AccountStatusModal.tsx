import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function AccountStatusModal({ setActiveModalId, setIsDialogOpen }: any) {
  return (
    <Dialog
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setActiveModalId(null); // Close parent modal when Dialog closes
        }
      }}
    >
      <DialogTrigger asChild>
        <p className="py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
          Change Account Status
        </p>
      </DialogTrigger>
      <DialogContent className=" md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            <p className="font-inter text-[20px] text-left font-semibold mt-2">
              Change Account Status
            </p>
          </DialogTitle>
          <DialogDescription className="text-left text-neutral800">
            Update an account status based on the activity of customer
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="p-4 border-b border-neutral300 rounded-lg mb-4">
            <p className="font-inter font-semibold mb-4">Account Status</p>
            <Select>
              <SelectTrigger className="data-[placeholder]:text-black outline-0 border-0 text-sm text-black w-full p-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="2">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 border-b border-neutral300 rounded-lg mb-6">
            <p className="font-inter font-semibold mb-4">
              Reason for status change
            </p>
            <input
              type="text"
              role="search"
              className="border-0 outline-0 w-full text-sm placeholder:text-neutral500"
              placeholder="Provide reason you’re changing account status"
            />
          </div>

          <Button variant={"secondary"}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
