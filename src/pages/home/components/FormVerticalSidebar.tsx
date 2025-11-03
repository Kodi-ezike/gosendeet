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
import { useEffect, useRef, useState } from "react";
import { allowOnlyNumbers, cn } from "@/lib/utils";
import { getQuotes } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiPlus, FiSearch } from "react-icons/fi";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useClickAway } from "@/hooks/useClickAway";

interface FormVerticalSidebarProps {
  variant?: "glass-dark" | "glass-light" | "solid-light" | "minimal";
  bookingRequest?: any;
  setData?: any;
}

const FormVerticalSidebar = ({
  variant = "solid-light",
  bookingRequest,
  setData,
}: FormVerticalSidebarProps) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState<any>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const navigate = useNavigate();

  const [openPickupSuggestions, setOpenPickupSuggestions] = useState(false);
  const [openDestSuggestions, setOpenDestSuggestions] = useState(false);

  const pickupRef = useRef<HTMLDivElement>(null!);
  const destRef = useRef<HTMLDivElement>(null!);

  useClickAway(pickupRef, () => setOpenPickupSuggestions(false));
  useClickAway(destRef, () => setOpenDestSuggestions(false));

  const {
    suggestions: { status: pickupStatus, data: pickupSuggestions },
    setValue: setPickupValue,
    clearSuggestions: clearPickupSuggestions,
  } = usePlacesAutocomplete();

  const {
    suggestions: { status: destStatus, data: destSuggestions },
    setValue: setDestValue,
    clearSuggestions: clearDestSuggestions,
  } = usePlacesAutocomplete();

  const {
    mutate: getQuotesDirectly,
    isPending: isQuoteLoading,
    reset: resetQuoteMutation,
  } = useMutation({
    mutationFn: getQuotes,
    onSuccess: (data: any) => {
      if (data?.data?.length === 0) {
        toast.error("No quotes found! Please try a different package type.");
      } else if (data?.data?.length > 0) {
        toast.success("Successful");
        navigate("/cost-calculator", {
          state: {
            inputData: inputData,
            results: data,
          },
        });
        if (typeof setData === "function") {
          setData(data);
        }
      }
      resetQuoteMutation();
    },
    onError: (data: any) => {
      toast.error(data?.message);
      resetQuoteMutation();
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
      packageTypeId: bookingRequest
        ? bookingRequest.packageTypeId
        : inputData
        ? inputData.packageTypeId
        : "",
    },
  });

  const packageTypeId = watch("packageTypeId");

  const normalizeData = (data: any) => ({
    ...data,
    packageTypeId: String(data?.packageTypeId ?? ""),
  });

  const saveInputData = (data: any) => {
    const normalized = normalizeData(data);
    setInputData(normalized);
    sessionStorage.setItem("bookingInputData", JSON.stringify(normalized));
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("bookingInputData");
    const storedData = stored ? normalizeData(JSON.parse(stored)) : null;

    if (storedData) {
      setInputData(storedData);
      reset({
        pickupLocation: storedData.pickupLocation ?? "",
        dropOffLocation: storedData.dropOffLocation ?? "",
        packageTypeId: storedData.packageTypeId ?? "",
        weight: storedData.weight ?? "",
      });
    } else if (bookingRequest) {
      const normalized = normalizeData(bookingRequest);
      setInputData(normalized);
      reset(normalized);
    }
    setIsHydrated(true);
  }, [bookingRequest, reset]);

  useEffect(() => {
    if (inputData?.packageTypeId && packages?.length > 0) {
      reset((prevValues) => ({
        ...prevValues,
        packageTypeId: String(inputData.packageTypeId),
      }));
    }
  }, [inputData?.packageTypeId, packages, reset]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    saveInputData(data);
  };

  // Variant-specific styling
  const containerStyles = cn(
    "rounded-3xl p-8 w-full max-w-[380px]",
    variant === "glass-dark" && "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
    variant === "glass-light" && "bg-white/95 backdrop-blur-xl border border-purple200 shadow-2xl ring-1 ring-purple400/10",
    variant === "solid-light" && "bg-white border-2 border-purple400 shadow-2xl",
    variant === "minimal" && "bg-white border border-[#e5e5e5] shadow-xl"
  );

  const titleStyles = cn(
    "text-2xl font-bold mb-2",
    variant === "glass-dark" && "text-white",
    variant === "glass-light" && "bg-gradient-to-r from-purple700 to-purple400 bg-clip-text text-transparent",
    variant === "solid-light" && "bg-gradient-to-r from-purple700 to-purple400 bg-clip-text text-transparent",
    variant === "minimal" && "text-[#1a1a1a]"
  );

  const subtitleStyles = cn(
    "text-sm mb-6",
    variant === "glass-dark" && "text-white/70",
    (variant === "glass-light" || variant === "solid-light" || variant === "minimal") && "text-[#6b7280]"
  );

  const inputContainerStyles = cn(
    "flex gap-3 items-center py-3 px-4 border-b transition-colors mb-4",
    variant === "glass-dark" && "border-white/20 hover:border-white/40",
    (variant === "glass-light" || variant === "solid-light") && "border-[#e5e5e5] hover:border-purple300",
    variant === "minimal" && "border-[#e5e5e5] hover:border-[#d1d5db]"
  );

  const labelStyles = cn(
    "font-clash font-semibold text-sm",
    variant === "glass-dark" && "text-white",
    (variant === "glass-light" || variant === "solid-light" || variant === "minimal") && "text-[#1a1a1a]"
  );

  const inputStyles = cn(
    "w-full outline-0 bg-transparent",
    variant === "glass-dark" && "text-white placeholder:text-white/50",
    (variant === "glass-light" || variant === "solid-light" || variant === "minimal") && "text-[#1a1a1a] placeholder:text-[#9ca3af]"
  );

  // Show loading skeleton while hydrating
  if (!isHydrated) {
    return (
      <div className={containerStyles}>
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-white/10 rounded"></div>
            <div className="h-12 bg-white/10 rounded"></div>
            <div className="h-12 bg-white/10 rounded"></div>
            <div className="h-12 bg-white/10 rounded"></div>
            <div className="h-12 bg-white/10 rounded mt-6"></div>
            <div className="h-12 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      {/* Form Header */}
      <div className="mb-6">
        <h2 className={titleStyles}>Get Your Free Quote</h2>
        <p className={subtitleStyles}>Compare rates from 50+ carriers instantly</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Pickup Location */}
        <div>
          <div className={inputContainerStyles}>
            <img src={location} alt="location" className="w-[18px] opacity-70" />
            <div ref={pickupRef} className="flex flex-col gap-1 w-full relative">
              <label htmlFor="pickup" className={labelStyles}>
                Pickup Location
              </label>
              <input
                type="text"
                {...register("pickupLocation")}
                onChange={(e) => {
                  setPickupValue(e.target.value);
                  setValue("pickupLocation", e.target.value, {
                    shouldValidate: true,
                  });
                  setOpenPickupSuggestions(true);
                }}
                placeholder="Where from?"
                className={inputStyles}
              />

              {pickupStatus === "OK" && openPickupSuggestions && (
                <ul className="bg-white border rounded-lg shadow-lg mt-1 max-h-40 w-full overflow-y-auto absolute top-14 z-50">
                  {pickupSuggestions.map(({ place_id, description }) => (
                    <li
                      key={place_id}
                      onClick={() => {
                        setPickupValue(description, false);
                        setValue("pickupLocation", description, {
                          shouldValidate: true,
                        });
                        clearPickupSuggestions();
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-purple50 text-[#1a1a1a] text-sm"
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {errors.pickupLocation && (
            <p className="text-xs text-red-500 pl-[45px] mt-1">
              {errors.pickupLocation.message}
            </p>
          )}
        </div>

        {/* Destination */}
        <div>
          <div className={inputContainerStyles}>
            <img src={location} alt="location" className="w-[18px] opacity-70" />
            <div ref={destRef} className="flex flex-col gap-1 w-full relative">
              <label htmlFor="destination" className={labelStyles}>
                Destination
              </label>
              <input
                type="text"
                {...register("dropOffLocation")}
                onChange={(e) => {
                  setDestValue(e.target.value);
                  setValue("dropOffLocation", e.target.value, {
                    shouldValidate: true,
                  });
                  setOpenDestSuggestions(true);
                }}
                placeholder="Where to?"
                className={inputStyles}
              />
              {destStatus === "OK" && openDestSuggestions && (
                <ul className="bg-white border rounded-lg shadow-lg mt-1 max-h-40 w-full overflow-y-auto absolute top-14 z-50">
                  {destSuggestions.map(({ place_id, description }) => (
                    <li
                      key={place_id}
                      onClick={() => {
                        setDestValue(description, false);
                        setValue("dropOffLocation", description, {
                          shouldValidate: true,
                        });
                        clearDestSuggestions();
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-purple50 text-[#1a1a1a] text-sm"
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {errors.dropOffLocation && (
            <p className="text-xs text-red-500 pl-[45px] mt-1">
              {errors.dropOffLocation.message}
            </p>
          )}
        </div>

        {/* Package Type */}
        <div>
          <div className={inputContainerStyles}>
            <img src={size} alt="size" className="w-[18px] opacity-70" />
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="package" className={labelStyles}>
                Package Type
              </label>
              <Select
                onValueChange={(val) => {
                  setValue("packageTypeId", val, {
                    shouldValidate: true,
                  });
                }}
                value={packageTypeId}
                disabled={!packages || packages.length === 0}
              >
                <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full h-6 py-0 px-0 mt-0">
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  {packages?.map((item: any) => (
                    <SelectItem value={String(item.id)} key={item.id}>
                      {item?.name} ({item?.maxWeight} {item?.weightUnit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {errors.packageTypeId && (
            <p className="text-xs text-red-500 pl-[45px] mt-1">
              {errors.packageTypeId.message}
            </p>
          )}
        </div>

        {/* Weight */}
        <div>
          <div className={inputContainerStyles}>
            <img src={size} alt="size" className="w-[18px] opacity-70" />
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="weight" className={labelStyles}>
                Weight (kg)
              </label>
              <input
                type="text"
                {...register("weight")}
                placeholder="Enter weight"
                className={inputStyles}
                onKeyDown={allowOnlyNumbers}
              />
            </div>
          </div>
          {errors.weight && (
            <p className="text-xs text-red-500 pl-[45px] mt-1">
              {errors.weight.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <Button
            type="button"
            variant={"secondary"}
            size={"custom"}
            className="w-full px-6 py-3 justify-center"
            loading={isQuoteLoading}
            onClick={handleSubmit((data) => {
              saveInputData(data);
              getQuotesDirectly([
                {
                  ...data,
                  quantity: 1,
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
            <FiSearch className="text-white transition-transform" />
            <span className="text-white font-semibold">Quick Quote</span>
          </Button>

          <Button
            type="button"
            size={"custom"}
            className="w-full bg-gray-200 hover:bg-gray-300 px-6 py-3 outline-gray-200 justify-center"
            onClick={handleSubmit((data) => {
              saveInputData(data);
              setOpen(true);
            })}
          >
            <FiPlus className="text-gray-700 transition-transform" />
            <span className="text-gray-700 font-semibold">More Options</span>
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

export default FormVerticalSidebar;
