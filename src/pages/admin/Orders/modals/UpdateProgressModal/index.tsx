import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const options = [
  { value: "price", title: "On the way" },
  { value: "time", title: "Delivered" },
];

export function UpdateProgressModal({open, setOpen}:{open:boolean; setOpen:any}) {

  const schema = z.object({
    progress: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    date: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    time: z
      .string({ required_error: "Please confirm your password" })
      .min(8, { message: "Password must be at least 8 characters" }),
    message: z.string().optional(),
    mail: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  // const { mutate, isPending } = useMutation({
  //   mutationFn: changePassword,
  //   onSuccess: () => {
  //     toast.success("Successful");
  //     setOpen(false);
  //     reset();
  //   },
  //   onError: (data) => {
  //     toast.error(data?.message);
  //   },
  // });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    // mutate({
    //   oldPassword: data.currentPassword,
    //   newPassword: data.password,
    //   confirmPassword: data.confirmPassword,
    // });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Update Order Progress
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          You are adding an order progress to this order, it will reflect on
          their tracking page and also be sent to mail
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2 w-full ">
                <label htmlFor="password" className="font-inter font-semibold">
                  Shipment Progress
                </label>
                <Select>
                  <SelectTrigger className="w-full bg-white h-[40px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((item, index) => (
                      <SelectItem
                        value={item.title}
                        key={index}
                        className="focus:bg-purple200"
                      >
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.progress && (
                  <p className="error text-xs text-[#FF0000]">
                    {errors.progress.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-inter font-semibold">
                  Estimated Date of Occurrence
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type="date"
                    {...register("date")}
                    className="w-full outline-0 border-b-0 py-2"
                  />
                </div>
                {errors.date && (
                  <p className="error text-xs text-[#FF0000]">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-inter font-semibold">
                  Estimated Time of Occurrence
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type="time"
                    {...register("time")}
                    className="w-full outline-0 border-b-0 py-2"
                  />
                </div>
                {errors.time && (
                  <p className="error text-xs text-[#FF0000]">
                    {errors.time.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-inter font-semibold">
                  Additional Message
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type="text"
                    {...register("message")}
                    placeholder="Type in a short message"
                    className="w-full outline-0 border-b-0 py-2"
                  />
                </div>
                {errors.message && (
                  <p className="error text-xs text-[#FF0000]">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox className="mt-[1px]"/>
                <label htmlFor="mail" className="">
                  Check this box if you want to send a notification email to your customer

                </label>
              </div>

              
              

              <Button
                variant={"secondary"}
                className=" w-fit"
                // loading={isPending}
              >
                Update
              </Button>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
