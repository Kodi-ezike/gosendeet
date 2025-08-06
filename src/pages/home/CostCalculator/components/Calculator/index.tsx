// import { SpecsModal } from "@/pages/home/landing/Header/modals/specs";
import { FiSearch } from "react-icons/fi";
import place from "@/assets/icons/location.png";
import size from "@/assets/icons/size.png";
import purple from "@/assets/icons/purple-checkmark.png";
import green from "@/assets/icons/green-checkmark.png";
import avatar1 from "@/assets/images/avatar1.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DetailsModal } from "./modals/details";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getQuotes } from "@/services/user";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Calculator = () => {
  // const options = [
  //   { value: "price", title: "Price (cheapest first)" },
  //   { value: "time", title: "Delivery time (fastest)" },
  // ];

  const location = useLocation();
  const { inputData, results } = location?.state || {};

  const [data, setData] = useState(results || {});

  const { data: packageTypes } = useGetPackageType({ minimize: true });

  const packages = packageTypes?.data;

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
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (inputData) {
      reset({
        pickupLocation: inputData.pickupLocation ?? "",
        dropOffLocation: inputData.dropOffLocation ?? "",
        packageTypeId: inputData.packageTypeId ?? "",
        quantity: inputData.quantity ?? "",
      });
    }
  }, [inputData, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: getQuotes,
    onSuccess: (data: any) => {
      toast.success("Successful");
      setData(data);
    },
    onError: (data: any) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate([data]);
  };

  return (
    <div className="md:px-20 px-6 py-16">
      <form
        className="flex lg:flex-row lg:items-center flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid lg:grid-cols-4 gap-4 w-full">
          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
              <img src={place} alt="location" className="w-[18px]" />
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
          </div>

          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
              <img src={place} alt="location" className="w-[18px]" />
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
          </div>

          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
              <img src={size} alt="size" className="w-[18px]" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="location" className="font-clash font-semibold">
                  Package Type
                </label>

                <Select
                  onValueChange={(val) => setValue("packageTypeId", val)}
                  value={watch("packageTypeId")}
                  defaultValue={inputData?.packageTypeId ?? ""}
                >
                  <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent text-base border-0 w-full h-6 py-2 px-0 mt-0">
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
          </div>

          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
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
          </div>
        </div>

        <Button
          className="w-fit bg-black hover:bg-black rounded-full outline-black"
          loading={isPending}
          size={"lg"}
        >
          <FiSearch className="text-white text-xl" />
          <span className="text-white lg:hidden">Get a quick quote</span>
        </Button>
      </form>

      {/* Select options */}
      {/* <Select>
        <SelectTrigger className="mt-16 mb-6 bg-white h-[40px] rounded-full">
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
      </Select> */}

      <div className="flex flex-col gap-6 mt-16 mb-6">
        {data?.data?.map((item: any, index: number) => (
          <div
            className="border border-purple500 bg-purple300 rounded-md p-4"
            key={index}
          >
            <div className="flex lg:flex-row lg:justify-between lg:items-center gap-4 flex-col py-4 border-b border-b-neutral700">
              <div className="flex gap-2 md:items-center">
                <img
                  src={avatar1}
                  alt="avatar1"
                  className="w-[30px] h-[30px] rounded-full"
                />
                <div>
                  <div className="flex md:flex-row flex-col md:gap-2 md:text-[18px]">
                    <p className="font-medium">{item?.courier?.name}</p>
                    <DetailsModal />
                  </div>
                  <p className="text-sm">
                    Pickup date:{" "}
                    <span className="font-medium"> {item?.pickUpdateDate}</span>
                  </p>
                </div>
              </div>
              <div className="px-[10px] flex flex-col gap-4">
                {item?.pickupOptions?.map((option: string, index: number) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <img
                      src={purple}
                      alt="check"
                      className="w-[20px] h-[20px] rounded-full"
                    />
                    <p className="text-xs text-purple500">{option}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:flex grid md:grid-cols-2 md:gap-4 gap-2 justify-between items-center py-4">
              <div>
                <p className="text-purple800 font-clash md:text-[18px] font-semibold">
                  Estimated Delivery:
                </p>
                <p className="text-sm font-medium">
                  {item?.estimatedDeliveryDate}
                </p>
              </div>
              {item?.nextDayDelivery && (
                <div className="flex gap-2 items-center bg-green100 w-fit py-2 px-4 rounded-full md:justify-self-end">
                  <img
                    src={green}
                    alt="check"
                    className="w-[20px] h-[20px] rounded-full"
                  />
                  <p className="text-xs text-green500">Next Day Delivery</p>
                </div>
              )}
              <div>
                <p className="font-clash md:text-[18px] font-semibold">
                  Starting from {item.price.replace(/^NGN/, "NGN ")}
                </p>
              </div>
              <div className="md:justify-self-end">
                <Link to="/delivery">
                  <Button className="px-12 py-3 rounded-full bg-purple400 hover:bg-purple500 text-white text-sm font-medium outline-purple400">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
