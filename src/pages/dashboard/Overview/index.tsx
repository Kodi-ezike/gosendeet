import { FiSearch } from "react-icons/fi";
import size from "@/assets/icons/size.png";
import location from "@/assets/icons/location.png";
import { RxExternalLink } from "react-icons/rx";
// import { SpecsModal } from "./specs";
import Bookings from "../Bookings";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuotes } from "@/services/user";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Overview = ({data}: {data: any}) => {
  
  const username = data?.data?.username;
  const userStatus = data?.data?.status;

  const { data: packageTypes } =useGetPackageType({ minimize: false });;

  const packages = packageTypes?.data?.content;
  console.log(packages)

  const schema = z.object({
    pickupLocation: z
      .string({ required_error: "Pickup location is required" })
      .min(1, { message: "Please enter pickup location" }),
    dropOffLocation: z
      .string({ required_error: "Drop off location is required" })
      .min(1, { message: "Please enter drop off location" }),
    packageTypeId: z
      .string({ required_error: "Package type is required" })
      .min(1, { message: "Please enter package type" }),
    quantity: z
      .string({ required_error: "Quantity is required" })
      .min(1, { message: "Please enter quantity" }),
  });

  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: getQuotes,
    onSuccess: (data: any) => {
      toast.success("Successful");
      console.log(data);

      // reset(data?.data);
      // const params = new URLSearchParams({ id: id });

      // navigate(`?${params.toString()}`);

      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: (data: any) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    // updateCompany({
    //   id: companyId,
    //   data,
    // });
    mutate([data]);
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-between md:items-center mb-4 md:px-4">
        <h2 className="font-clash font-semibold text-[20px]">
          Hello {username},
        </h2>

        <p
          className={cn(
            userStatus === "active"
              ? "bg-green100 text-green500"
              : "bg-[#FEF2F2] text-[#EC2D30]",
            "px-4 py-1 w-fit font-medium font-clash rounded-2xl capitalize"
          )}
        >
          {userStatus}
        </p>
      </div>

      <div className="flex lg:flex-row flex-col gap-8 mb-10">
        <div className="lg:w-[60%] bg-white xl:p-10 py-6 px-2 rounded-3xl text-sm">
          <h3 className="text-md font-clash font-semibold mb-4">
            Add New Shipment
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3 items-center py-2 px-4 border-b">
              <img src={location} alt="location" className="w-[18px]" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pickup" className="font-clash font-semibold">
                  Pickup Location
                </label>
                <input
                  type="text"
                  {...register("pickupLocation")}
                  placeholder="Where from?"
                  className="w-full outline-0"
                />
              </div>
            </div>
            {errors.pickupLocation && (
              <p className="error text-xs text-[#FF0000] pl-[45px] my-1">
                {errors.pickupLocation.message}
              </p>
            )}
            <div className="flex gap-3 items-center py-2 px-4 border-b">
              <img src={location} alt="location" className="w-[18px]" />
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="destination"
                  className="font-clash font-semibold"
                >
                  Destination
                </label>
                <input
                  type="text"
                  {...register("dropOffLocation")}
                  placeholder="Where to?"
                  className="w-full outline-0"
                />
              </div>
            </div>
            {errors.dropOffLocation && (
              <p className="error text-xs text-[#FF0000] pl-[45px] my-1">
                {errors.dropOffLocation.message}
              </p>
            )}
            <div className="flex gap-3 items-center py-2 px-4 border-b">
              <img src={size} alt="size" className="w-[18px]" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="location" className="font-clash font-semibold">
                  Packaging & Weight
                </label>

                <Select
                  onValueChange={(val) => setValue("packageTypeId", val)}
                  value={watch("packageTypeId")}
                >
                  <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full h-7 py-2 px-0 mt-0">
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages?.map((item: any) => (
                      <SelectItem value={item.id} key={item.id}>
                        {item?.name} ({item?.maxWeight} {item?.weightUnit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {errors.packageTypeId && (
              <p className="error text-xs text-[#FF0000] pl-[45px] my-1">
                {errors.packageTypeId.message}
              </p>
            )}
            <div className="flex gap-3 items-center py-2 px-4 border-b">
              <img src={size} alt="size" className="w-[18px]" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="location" className="font-clash font-semibold">
                  Quantity
                </label>

                <input
                  type="text"
                  {...register("quantity")}
                  placeholder="How many?"
                  className="w-full outline-0"
                  onKeyDown={(event) => {
                    if (
                      !/[0-9]/.test(event.key) &&
                      event.key !== "Backspace" &&
                      event.key !== "Tab"
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
            {errors.quantity && (
              <p className="error text-xs text-[#FF0000] pl-[45px] my-1">
                {errors.quantity.message}
              </p>
            )}

            <Button
              className="flex items-center gap-3 bg-black hover:bg-black rounded-full px-8 py-3 outline-black mt-4"
              loading={isPending}
            >
              <FiSearch className="text-white text-xl" />
              <span className="text-white">Get a quick quote</span>
            </Button>
          </form>
        </div>
        <div className="lg:w-[40%] bg-white xl:p-10 py-6 px-2 rounded-3xl">
          <h3 className="text-md font-clash font-semibold">Customer Support</h3>
          <p className="my-6 text-sm text-neutral600">
            Need help with your shipment, costing or anything at all?
          </p>

          <div className="mb-4">
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Browse our FAQs</span>
            </button>
          </div>
          <div>
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Contact our support</span>
            </button>
          </div>
        </div>
      </div>

      <Bookings />
    </div>
  );
};

export default Overview;
