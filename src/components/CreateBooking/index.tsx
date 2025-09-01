import size from "@/assets/icons/size.png";
import location from "@/assets/icons/location.png";
import { SpecsModal } from "@/components/specs";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { allowOnlyNumbers, cn } from "@/lib/utils";
import { getQuotes } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiPlus, FiSearch } from "react-icons/fi";

const CreateBooking = ({
  bookingRequest,
  setData,
}: {
  bookingRequest?: any;
  setData?: any;
}) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate();

  const { mutate: getQuotesDirectly, isPending: isQuoteLoading } = useMutation({
    mutationFn: getQuotes,
    onSuccess: (data: any) => {
      if (data?.data?.length > 0) {
        toast.success("Successful");
        navigate("/cost-calculator", {
          state: {
            inputData: inputData,
            results: data,
          },
        });
        if (
          window.location.pathname === "/cost-calculator" &&
          typeof setData === "function"
        ) {
          setData(data);
        }
      }
    },
    onError: (data: any) => {
      toast.error(data?.message);
    },
  });

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
    weight: z
      .string({ required_error: "Weight is required" })
      .min(1, { message: "Please enter weight" }),
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
    defaultValues: {
      packageTypeId: bookingRequest ? bookingRequest.packageTypeId : "",
    },
  });

  useEffect(() => {
    if (bookingRequest) {
      reset({
        pickupLocation: bookingRequest.pickupLocation ?? "",
        dropOffLocation: bookingRequest.dropOffLocation ?? "",
        packageTypeId: bookingRequest.packageTypeId ?? "",
        weight: bookingRequest.weight ?? "",
      });
    }
  }, [bookingRequest, reset]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    setInputData(data);
  };
  const packageTypeId = watch("packageTypeId");

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          window.location.pathname.includes("cost-calculator") &&
            "flex lg:flex-row lg:items-center flex-col gap-4 w-full"
        )}
      >
        <div
          className={cn(
            window.location.pathname.includes("cost-calculator") &&
              "grid lg:grid-cols-4 gap-4 w-full"
          )}
        >
          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
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
          </div>
          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
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
          </div>
          <div className="w-full">
            <div className="flex gap-3 items-center py-2 md:px-4 border-b w-full">
              <img src={size} alt="size" className="w-[18px]" />
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="location" className="font-clash font-semibold">
                  Package Type
                </label>

                <Select
                  onValueChange={(val) => {
                    setValue("packageTypeId", val, {
                      shouldValidate: true,
                    });
                  }}
                  value={packageTypeId} // ✅ force sync with RHF
                >
                  <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full h-6 py-2 px-0 mt-0">
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
                  Weight
                </label>

                <input
                  type="text"
                  {...register("weight")}
                  placeholder="Enter weight"
                  className="w-full outline-0"
                  onKeyDown={allowOnlyNumbers}
                />
              </div>
            </div>
            {errors.weight && (
              <p className="error text-xs text-[#FF0000] pl-[45px] my-1">
                {errors.weight.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            className="bg-black hover:bg-black rounded-full px-8 py-3 outline-black flex items-center gap-2"
            loading={isQuoteLoading}
            onClick={handleSubmit((data) => {
              // form is valid ✅ - get quote directly
              setInputData(data);
              getQuotesDirectly([
                {
                  ...data,
                  quantity: 1, // default quantity for quick quote
                  packageDescription: {
                    isFragile: false,
                    isPerishable: false,
                    isExclusive: false,
                    isHazardous: false,
                  },
                },
              ]);
            })}
          >
            <FiSearch className="text-white" />
            <span className="text-white">Quick Quote</span>
          </Button>
          
          <Button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 rounded-full px-8 py-3 outline-gray-200 flex items-center gap-2"
            onClick={handleSubmit((data) => {
              // form is valid ✅ - open modal for additional options
              setInputData(data);
              setOpen(true);
            })}
          >
            <FiPlus className="text-gray-700" />
            <span className="text-gray-700">Additional Options</span>
          </Button>
        </div>
      </form>

      <SpecsModal
        open={open}
        setOpen={setOpen}
        inputData={inputData}
        setData={setData}
      />
    </div>
  );
};

export default CreateBooking;
