import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { changePassword } from "@/services/auth";
// import { toast } from "sonner";
// import { useMutation } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";

export function AddPricingModal() {
  const [open, setOpen] = useState(false);

  const schema = z
    .object({
      name: z
        .string({ required_error: "Name is required" })
        .min(1, { message: "Please select a level" }),
      
    })
   

  const {
    // register,
    handleSubmit,
    // reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

//   const { mutate, isPending } = useMutation({
//     mutationFn: changePassword,
//     onSuccess: () => {
//       toast.success("Successful");
//       setOpen(false);
//       reset();
//     },
//     onError: (data) => {
//       toast.error(data?.message);
//     },
//   });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
    // mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}><FiEdit/> Add New Custom Pricing</Button>
      </DialogTrigger>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Set Up Delivery Pricing
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          Start by picking a package type, then enter the cost details per kg/km to tailor your delivery pricing.
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name" className="font-inter font-semibold">
                  Select service level
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <Select
                    onValueChange={(val) => setValue("name", val)}
                    // value={field?.value}
                  >
                    <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full py-4 mt-0">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Express">Express</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
                {errors.name && (
                  <p className="error text-xs text-[#FF0000] px-4">
                    {errors.name.message}
                  </p>
                )}
              </div>
             

              <Button
                variant={"secondary"}
                className=" w-fit"
                // loading={isPending}
              >
                Add Pricing
              </Button>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
