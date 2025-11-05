import size from "@/assets/icons/size.png";
import location from "@/assets/icons/location.png";
import { SpecsModal } from "@/components/specs";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getQuotes } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiSearch, FiChevronRight } from "react-icons/fi";
import { PickupLocationModal } from "./modals/PickupLocationModal";
import { DestinationModal } from "./modals/DestinationModal";
import { PackageTypeModal } from "./modals/PackageTypeModal";
import { PickupDateModal } from "./modals/PickupDateModal";

interface FormHorizontalBarProps {
  variant?: "bold" | "minimal" | "floating";
  bookingRequest?: any;
  setData?: any;
  activeMode?: "gosendeet" | "compare" | "tracking"; // Current active mode
}

const FormHorizontalBar = ({
  variant = "bold",
  bookingRequest,
  setData,
  activeMode = "gosendeet",
}: FormHorizontalBarProps) => {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState<any>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const navigate = useNavigate();

  // Modal states for Direct mode
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [destinationModalOpen, setDestinationModalOpen] = useState(false);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);

  // Store package name and data for display
  const [packageName, setPackageName] = useState("");
  const [selectedPackageData, setSelectedPackageData] = useState<any>(null);

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
    dimensions: z
      .string()
      .optional(),
    itemPrice: z
      .string({ required_error: "Item price is required" })
      .min(1, { message: "Please enter item price" }),
    pickupDate: z
      .string()
      .optional(),
  });

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      pickupLocation: "",
      dropOffLocation: "",
      packageTypeId: "",
      weight: "",
      dimensions: "",
      itemPrice: "",
      pickupDate: "",
    },
  });

  const pickupLocation = watch("pickupLocation");
  const dropOffLocation = watch("dropOffLocation");
  const packageTypeId = watch("packageTypeId");
  const weight = watch("weight");
  const dimensions = watch("dimensions");
  const itemPrice = watch("itemPrice");
  const pickupDate = watch("pickupDate");

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
      setValue("packageTypeId", String(inputData.packageTypeId), {
        shouldValidate: false,
      });
    }
  }, [inputData?.packageTypeId, packages, setValue]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    saveInputData(data);
  };

  // Handle tracking form submission
  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingNumber = (e.target as any).trackingNumber.value;
    if (!trackingNumber) {
      toast.error("Please enter a tracking number");
      return;
    }
    navigate("/track-booking", { state: { trackingNumber } });
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
      {/* Tracking Mode Form */}
      {activeMode === "tracking" ? (
        <form onSubmit={handleTrackingSubmit}>
          {/* Desktop: Match booking form grid layout */}
          <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-6 items-end">
            {/* Tracking Number Input - Spans 4 columns */}
            <div className="lg:col-span-4">
              <label htmlFor="trackingNumber" className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={location} alt="tracking" className="w-5 h-5 opacity-90" />
                Tracking Number
              </label>
              <input
                type="text"
                name="trackingNumber"
                placeholder="Enter your tracking number (GOS*****)"
                className={inputStyles}
              />
            </div>

            {/* Track Button - Last column */}
            <div className="flex gap-3 items-end min-w-[280px]">
              <Button
                type="submit"
                variant="secondary"
                size="custom"
                className="flex-1 px-6 py-4 h-14 justify-center font-bold text-base whitespace-nowrap"
              >
                <FiSearch className="text-white mr-2" />
                <span className="text-white">Track</span>
              </Button>
            </div>
          </div>

          {/* Mobile: Simple vertical layout */}
          <div className="lg:hidden space-y-4">
            <div>
              <label htmlFor="trackingNumber" className={cn(labelStyles, "flex items-center gap-2")}>
                📦 Tracking Number
              </label>
              <input
                type="text"
                name="trackingNumber"
                placeholder="Enter tracking number (GOS*****)"
                className={inputStyles}
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="custom"
              className="w-full px-8 py-4 justify-center font-bold"
            >
              <FiSearch className="text-white mr-2" />
              <span className="text-white">Track Shipment</span>
            </Button>
          </div>
        </form>
      ) : activeMode === "gosendeet" ? (
        // Direct Mode with Modal Triggers
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Desktop: Horizontal Grid with Modal Triggers */}
          <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-6 items-end">
            {/* Pickup Location - Modal Trigger */}
            <div>
              <label className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={location} alt="location" className="w-5 h-5 opacity-90" />
                Pickup Location
              </label>
              <button
                type="button"
                onClick={() => setPickupModalOpen(true)}
                className={cn(
                  "w-full text-left py-3 px-3 border-b-2 transition-colors flex items-center justify-between group",
                  errors.pickupLocation ? "border-red-500" : pickupLocation ? "border-amber-400" : "border-[#e5e5e5] hover:border-amber-400"
                )}
              >
                <span className={cn("text-lg", pickupLocation ? "text-[#1a1a1a]" : "text-[#9ca3af]")}>
                  {pickupLocation || "Where from?"}
                </span>
                <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </button>
              {errors.pickupLocation && (
                <p className="text-xs text-red-500 mt-1">{errors.pickupLocation.message}</p>
              )}
            </div>

            {/* Destination - Modal Trigger */}
            <div>
              <label className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={location} alt="location" className="w-5 h-5 opacity-90" />
                Destination
              </label>
              <button
                type="button"
                onClick={() => setDestinationModalOpen(true)}
                className={cn(
                  "w-full text-left py-3 px-3 border-b-2 transition-colors flex items-center justify-between group",
                  errors.dropOffLocation ? "border-red-500" : dropOffLocation ? "border-amber-400" : "border-[#e5e5e5] hover:border-amber-400"
                )}
              >
                <span className={cn("text-lg", dropOffLocation ? "text-[#1a1a1a]" : "text-[#9ca3af]")}>
                  {dropOffLocation || "Where to?"}
                </span>
                <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </button>
              {errors.dropOffLocation && (
                <p className="text-xs text-red-500 mt-1">{errors.dropOffLocation.message}</p>
              )}
            </div>

            {/* Package Details - Single Modal Trigger */}
            <div>
              <label className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={size} alt="package" className="w-5 h-5 opacity-90" />
                Package Details
              </label>
              <button
                type="button"
                onClick={() => setPackageModalOpen(true)}
                className={cn(
                  "w-full text-left py-3 px-3 border-b-2 transition-colors flex items-center justify-between group",
                  errors.packageTypeId || errors.weight ? "border-red-500" : (packageTypeId && weight && dimensions) ? "border-amber-400" : "border-[#e5e5e5] hover:border-amber-400"
                )}
              >
                <div className="flex-1 min-w-0">
                  {packageName && weight && dimensions ? (
                    <div className="space-y-1">
                      <p className="text-lg text-[#1a1a1a] font-semibold truncate">{packageName}</p>
                      <p className="text-sm text-gray-600 truncate">
                        {dimensions} • {weight}{selectedPackageData?.weightUnit || 'kg'}
                      </p>
                    </div>
                  ) : (
                    <span className="text-lg text-[#9ca3af]">Select package, dimensions & weight</span>
                  )}
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
              </button>
              {(errors.packageTypeId || errors.weight) && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.packageTypeId?.message || errors.weight?.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 items-end min-w-[280px]">
              <Button
                type="button"
                variant={"secondary"}
                size={"custom"}
                className="flex-1 px-6 py-4 h-14 justify-center font-bold text-base whitespace-nowrap"
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
                <span className="text-white">Get Quote</span>
              </Button>
            </div>
          </div>

          {/* Mobile: Vertical Stack with Modal Triggers */}
          <div className="lg:hidden space-y-4">
            {/* Pickup Location - Modal Trigger */}
            <div>
              <label className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={location} alt="location" className="w-5 h-5 opacity-90" />
                Pickup Location
              </label>
              <button
                type="button"
                onClick={() => setPickupModalOpen(true)}
                className={cn(
                  "w-full text-left py-3 px-3 border-b-2 transition-colors flex items-center justify-between",
                  errors.pickupLocation ? "border-red-500" : pickupLocation ? "border-amber-400" : "border-[#e5e5e5]"
                )}
              >
                <span className={cn("text-lg", pickupLocation ? "text-[#1a1a1a]" : "text-[#9ca3af]")}>
                  {pickupLocation || "Where from?"}
                </span>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              {errors.pickupLocation && (
                <p className="text-xs text-red-500 mt-1">{errors.pickupLocation.message}</p>
              )}
            </div>

            {/* Destination - Modal Trigger */}
            <div>
              <label className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={location} alt="location" className="w-5 h-5 opacity-90" />
                Destination
              </label>
              <button
                type="button"
                onClick={() => setDestinationModalOpen(true)}
                className={cn(
                  "w-full text-left py-3 px-3 border-b-2 transition-colors flex items-center justify-between",
                  errors.dropOffLocation ? "border-red-500" : dropOffLocation ? "border-amber-400" : "border-[#e5e5e5]"
                )}
              >
                <span className={cn("text-lg", dropOffLocation ? "text-[#1a1a1a]" : "text-[#9ca3af]")}>
                  {dropOffLocation || "Where to?"}
                </span>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              {errors.dropOffLocation && (
                <p className="text-xs text-red-500 mt-1">{errors.dropOffLocation.message}</p>
              )}
            </div>

            {/* Package Details - Single Modal Trigger */}
            <div>
              <label className={cn(labelStyles, "flex items-center gap-2")}>
                <img src={size} alt="package" className="w-5 h-5 opacity-90" />
                Package Details
              </label>
              <button
                type="button"
                onClick={() => setPackageModalOpen(true)}
                className={cn(
                  "w-full text-left py-3 px-3 border-b-2 transition-colors flex items-center justify-between group",
                  errors.packageTypeId || errors.weight ? "border-red-500" : (packageTypeId && weight && dimensions) ? "border-amber-400" : "border-[#e5e5e5] hover:border-amber-400"
                )}
              >
                <div className="flex-1">
                  {packageName && weight && dimensions ? (
                    <div className="space-y-1">
                      <p className="text-lg text-[#1a1a1a] font-semibold">{packageName}</p>
                      <p className="text-sm text-gray-600">
                        {dimensions} • {weight}{selectedPackageData?.weightUnit || 'kg'}
                      </p>
                    </div>
                  ) : (
                    <span className="text-lg text-[#9ca3af]">Select package, dimensions & weight</span>
                  )}
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              {(errors.packageTypeId || errors.weight) && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.packageTypeId?.message || errors.weight?.message}
                </p>
              )}
            </div>

            {/* Get Quote Button */}
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
              <span className="text-white">Get Quote</span>
            </Button>
          </div>
        </form>
      ) : (
        // Compare Mode - Keep existing inline form
        <div className="text-center py-8 text-gray-500">
          Compare mode - Coming soon
        </div>
      )}

      {/* Specs Modal - only show for Compare mode */}
      {activeMode === "compare" && (
        <SpecsModal
          open={open}
          setOpen={setOpen}
          inputData={inputData}
          setData={setData}
        />
      )}

      {/* Direct Mode Modals */}
      {activeMode === "gosendeet" && (
        <>
          <PickupLocationModal
            open={pickupModalOpen}
            onOpenChange={setPickupModalOpen}
            value={pickupLocation || ""}
            onSelect={(location) => {
              setValue("pickupLocation", location, { shouldValidate: true });
            }}
          />

          <DestinationModal
            open={destinationModalOpen}
            onOpenChange={setDestinationModalOpen}
            value={dropOffLocation || ""}
            onSelect={(location) => {
              setValue("dropOffLocation", location, { shouldValidate: true });
            }}
          />

          <PackageTypeModal
            open={packageModalOpen}
            onOpenChange={setPackageModalOpen}
            selectedPackageId={packageTypeId || ""}
            currentWeight={weight || ""}
            currentDimensions={dimensions || ""}
            currentItemPrice={itemPrice || ""}
            onConfirm={(id, name, weightValue, dimensionsValue, itemPriceValue, packageData) => {
              setValue("packageTypeId", id, { shouldValidate: true });
              setValue("weight", weightValue, { shouldValidate: true });
              setValue("dimensions", dimensionsValue);
              setValue("itemPrice", itemPriceValue, { shouldValidate: true });
              setPackageName(name);
              setSelectedPackageData(packageData);
            }}
          />

          <PickupDateModal
            open={dateModalOpen}
            onOpenChange={setDateModalOpen}
            value={pickupDate || ""}
            onSelect={(date) => {
              setValue("pickupDate", date);
            }}
          />
        </>
      )}
    </div>
  );
};

export default FormHorizontalBar;
