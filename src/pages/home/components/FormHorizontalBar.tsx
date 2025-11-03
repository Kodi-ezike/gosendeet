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
import { FiSearch, FiPlus } from "react-icons/fi";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useClickAway } from "@/hooks/useClickAway";

interface FormHorizontalBarProps {
  variant?: "bold" | "minimal" | "floating";
  bookingRequest?: any;
  setData?: any;
}

const FormHorizontalBar = ({
  variant = "bold",
  bookingRequest,
  setData,
}: FormHorizontalBarProps) => {
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
    "w-full max-w-6xl mx-auto p-6 rounded-3xl",
    variant === "bold" && "bg-white shadow-2xl border-2 border-[#1a1f3a]",
    variant === "minimal" && "bg-white shadow-2xl border-2 border-amber-200/40 ring-1 ring-amber-100/30",
    variant === "floating" && "bg-white shadow-2xl"
  );

  const labelStyles = cn(
    "font-clash font-bold text-sm mb-3 block",
    variant === "bold" && "text-[#1a1a1a]",
    (variant === "minimal" || variant === "floating") && "text-[#4b5563]"
  );

  const inputStyles = cn(
    "w-full outline-0 bg-transparent text-lg py-3 px-3 border-b-2 transition-colors",
    variant === "bold" && "border-[#e5e5e5] hover:border-amber-400 focus:border-amber-400 text-[#1a1a1a] placeholder:text-[#9ca3af]",
    (variant === "minimal" || variant === "floating") && "border-[#e5e5e5] hover:border-amber-300 focus:border-amber-300 text-[#1a1a1a] placeholder:text-[#9ca3af]"
  );

  // Show loading skeleton while hydrating
  if (!isHydrated) {
    return (
      <div className={containerStyles}>
        <div className="animate-pulse">
          {/* Desktop Grid Skeleton */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="flex gap-3 items-end min-w-[280px]">
              <div className="h-14 bg-gray-300 rounded flex-[2]"></div>
              <div className="h-14 bg-gray-200 rounded flex-[1]"></div>
            </div>
          </div>
          {/* Mobile Stack Skeleton */}
          <div className="lg:hidden space-y-4">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-14 bg-gray-300 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Desktop: Horizontal Grid */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-6 items-end">
          {/* Pickup Location */}
          <div ref={pickupRef} className="relative">
            <label htmlFor="pickup" className={cn(labelStyles, "flex items-center gap-2")}>
              <img src={location} alt="location" className="w-5 h-5 opacity-90" />
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
              <ul className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg max-h-48 w-full overflow-y-auto z-50">
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
                    className="px-4 py-2 cursor-pointer hover:bg-amber-50 text-[#1a1a1a] text-sm"
                  >
                    {description}
                  </li>
                ))}
              </ul>
            )}
            {errors.pickupLocation && (
              <p className="text-xs text-red-500 mt-1">{errors.pickupLocation.message}</p>
            )}
          </div>

          {/* Destination */}
          <div ref={destRef} className="relative">
            <label htmlFor="destination" className={cn(labelStyles, "flex items-center gap-2")}>
              <img src={location} alt="location" className="w-5 h-5 opacity-90" />
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
              <ul className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg max-h-48 w-full overflow-y-auto z-50">
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
                    className="px-4 py-2 cursor-pointer hover:bg-amber-50 text-[#1a1a1a] text-sm"
                  >
                    {description}
                  </li>
                ))}
              </ul>
            )}
            {errors.dropOffLocation && (
              <p className="text-xs text-red-500 mt-1">{errors.dropOffLocation.message}</p>
            )}
          </div>

          {/* Package Type */}
          <div>
            <label htmlFor="package" className={cn(labelStyles, "flex items-center gap-2")}>
              <img src={size} alt="package" className="w-5 h-5 opacity-90" />
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
              <SelectTrigger className="w-full !w-full min-w-0 h-12 border-b-2 border-[#e5e5e5] hover:border-amber-400 focus:border-amber-400 rounded-none bg-transparent [&>span]:truncate [&>span]:text-left">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {packages?.map((item: any) => (
                  <SelectItem value={String(item.id)} key={item.id}>
                    {item?.name} ({item?.maxWeight}{item?.weightUnit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.packageTypeId && (
              <p className="text-xs text-red-500 mt-1">{errors.packageTypeId.message}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className={cn(labelStyles, "flex items-center gap-2")}>
              <img src={size} alt="weight" className="w-5 h-5 opacity-90" />
              Weight (kg)
            </label>
            <input
              type="text"
              {...register("weight")}
              placeholder="Weight"
              className={inputStyles}
              onKeyDown={allowOnlyNumbers}
            />
            {errors.weight && (
              <p className="text-xs text-red-500 mt-1">{errors.weight.message}</p>
            )}
          </div>

          {/* Buttons - Quick Quote (Main) & More Options (Small) Side by Side */}
          <div className="flex gap-3 items-end min-w-[280px]">
            <Button
              type="button"
              variant={"secondary"}
              size={"custom"}
              className="flex-[2] px-6 py-4 h-14 justify-center font-bold text-base whitespace-nowrap"
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
              <FiSearch className="text-white mr-2" />
              <span className="text-white">Quick Quote</span>
            </Button>

            <Button
              type="button"
              size={"custom"}
              className="flex-[1] px-4 py-3 h-14 justify-center font-semibold text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 whitespace-nowrap"
              onClick={handleSubmit((data) => {
                saveInputData(data);
                setOpen(true);
              })}
            >
              <FiPlus className="text-gray-700 mr-1" />
              <span className="text-gray-700">More</span>
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Stack */}
        <div className="lg:hidden space-y-4">
          {/* Pickup Location */}
          <div ref={pickupRef} className="relative">
            <label htmlFor="pickup" className={cn(labelStyles, "flex items-center gap-2")}>
              <img src={location} alt="location" className="w-5 h-5 opacity-90" />
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
              <ul className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg max-h-48 w-full overflow-y-auto z-50">
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
                    className="px-4 py-2 cursor-pointer hover:bg-amber-50 text-[#1a1a1a] text-sm"
                  >
                    {description}
                  </li>
                ))}
              </ul>
            )}
            {errors.pickupLocation && (
              <p className="text-xs text-red-500 mt-1">{errors.pickupLocation.message}</p>
            )}
          </div>

          {/* Destination */}
          <div ref={destRef} className="relative">
            <label htmlFor="destination" className={cn(labelStyles, "flex items-center gap-2")}>
              <img src={location} alt="location" className="w-5 h-5 opacity-90" />
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
              <ul className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg max-h-48 w-full overflow-y-auto z-50">
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
                    className="px-4 py-2 cursor-pointer hover:bg-amber-50 text-[#1a1a1a] text-sm"
                  >
                    {description}
                  </li>
                ))}
              </ul>
            )}
            {errors.dropOffLocation && (
              <p className="text-xs text-red-500 mt-1">{errors.dropOffLocation.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Package Type */}
            <div>
              <label htmlFor="package" className={labelStyles}>
                📦 Package Type
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
                <SelectTrigger className="w-full !w-full min-w-0 h-12 border-b-2 border-[#e5e5e5] hover:border-amber-400 rounded-none bg-transparent [&>span]:truncate [&>span]:text-left">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {packages?.map((item: any) => (
                    <SelectItem value={String(item.id)} key={item.id}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.packageTypeId && (
                <p className="text-xs text-red-500 mt-1">{errors.packageTypeId.message}</p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className={labelStyles}>
                ⚖️ Weight (kg)
              </label>
              <input
                type="text"
                {...register("weight")}
                placeholder="Weight"
                className={inputStyles}
                onKeyDown={allowOnlyNumbers}
              />
              {errors.weight && (
                <p className="text-xs text-red-500 mt-1">{errors.weight.message}</p>
              )}
            </div>
          </div>

          {/* Buttons - Quick Quote & More Options */}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant={"secondary"}
              size={"custom"}
              className="w-full px-8 py-4 justify-center font-bold"
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
              <FiSearch className="text-white mr-2" />
              <span className="text-white">Quick Quote</span>
            </Button>

            <Button
              type="button"
              size={"custom"}
              className="w-full px-8 py-4 justify-center font-bold bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={handleSubmit((data) => {
                saveInputData(data);
                setOpen(true);
              })}
            >
              <FiPlus className="text-gray-700 mr-2" />
              <span className="text-gray-700">More Options</span>
            </Button>
          </div>
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

export default FormHorizontalBar;
