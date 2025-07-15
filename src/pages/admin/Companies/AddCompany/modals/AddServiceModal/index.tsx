import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import {
  useGetCoverageArea,
  useGetLocationCode,
  useGetPackageType,
  useGetPickupOptions,
  useGetServiceLevel,
} from "@/queries/admin/useGetAdminSettings";
import { MultiSelect } from "@/components/ui/multi";
import { createCompanyServices } from "@/services/companies";

export function AddServiceModal({ companyId, openService, setOpenService }: { companyId: string; openService: boolean; setOpenService:any }) {
  const [selectedPickupOptions, setSelectedPickupOptions] = useState<string[]>(
    []
  );
  const [selectedPackageTypes, setSelectedPackageTypes] = useState<string[]>(
    []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const { data: service_level } = useGetServiceLevel();
  const { data: pickup_options } = useGetPickupOptions();
  const { data: package_types } = useGetPackageType();
  const { data: location_codes } = useGetLocationCode();
  const { data: coverage_areas } = useGetCoverageArea();

  const pickupOptions = pickup_options?.data?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const packageOptions = package_types?.data?.content?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const locationOptions = location_codes?.data?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const schema = z.object({
    serviceLevelId: z
      .string({ required_error: "Service level is required" })
      .min(1, { message: "Please select an option" }),
    pickupOptionIds: z.array(z.string()),
    packageTypeIds: z.array(z.string()),
    coverageAreaId: z
      .string({ required_error: "Coverage area is required" })
      .min(1, { message: "Please select an option" }),
    locationCodeIds: z.array(z.string()),
    weightLimit: z
      .string({ required_error: "Weight limit is required" })
      .min(1, { message: "Please enter a limit" }),
    isNextDayDelivery: z.boolean(),
    numberOfDaysForPickup: z
      .string({ required_error: "Number of days is required" })
      .min(1, { message: "Please enter a limit" }),
    numberOfDaysForDelivery: z
      .string({ required_error: "Number of days is required" })
      .min(1, { message: "Please enter a limit" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      pickupOptionIds: [],
      packageTypeIds: [],
      locationCodeIds: [],
    },
  });
  const queryClient = useQueryClient();

  const { mutate: createServices, isPending: pendingCreate } = useMutation({
    mutationFn: createCompanyServices,
    onSuccess: () => {
      toast.success("Successful");
      reset( {
        serviceLevelId: "",
        coverageAreaId: "",
      pickupOptionIds: [],
      packageTypeIds: [],
      locationCodeIds: [],
      isNextDayDelivery: false
    });
    setSelectedPickupOptions([])
    setSelectedPackageTypes([])
    setSelectedLocations([])
      setOpenService(false)
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    createServices({ ...data, companyId: companyId });
    // mutate(data);
  };

  return (
    <Dialog open={openService} onOpenChange={setOpenService}>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Add a new service
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          Create a service option for this company by defining the service type
          and other custom details.
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label
                    htmlFor="serviceLevel"
                    className="font-inter font-semibold"
                  >
                    Select service level
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <Select
                      onValueChange={(val) => setValue("serviceLevelId", val)}
                      // value={field?.value}
                    >
                      <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent w-full py-2 px-0">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {service_level?.data?.map(
                          (item: any, index: number) => (
                            <SelectItem value={item.id} key={index}>
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.serviceLevelId && (
                    <p className="error text-xs text-[#FF0000] px-4">
                      {errors.serviceLevelId.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label
                    htmlFor="pickupOption"
                    className="font-inter font-semibold"
                  >
                    Select pickup option
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <MultiSelect
                      options={pickupOptions}
                      value={selectedPickupOptions}
                      placeholder="Select options"
                      // value={selected || []}
                      onChange={(val) => {
                        setSelectedPickupOptions(val);
                        setValue("pickupOptionIds", val);
                      }}
                    />
                  </div>
                  {errors.pickupOptionIds && (
                    <p className="error text-xs text-[#FF0000] px-4">
                      {errors.pickupOptionIds.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label
                    htmlFor="packageType"
                    className="font-inter font-semibold"
                  >
                    Select package type
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <MultiSelect
                      options={packageOptions}
                      value={selectedPackageTypes}
                      placeholder="Select options"
                      // value={selected || []}
                      onChange={(val) => {
                        setSelectedPackageTypes(val);
                        setValue("packageTypeIds", val);
                      }}
                    />
                  </div>
                  {errors.packageTypeIds && (
                    <p className="error text-xs text-[#FF0000] px-4">
                      {errors.packageTypeIds.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label
                    htmlFor="coverageArea"
                    className="font-inter font-semibold"
                  >
                    Select coverage area
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <Select
                      onValueChange={(val) => setValue("coverageAreaId", val)}
                      // value={field?.value}
                    >
                      <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent w-full py-2 px-0">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {coverage_areas?.data?.map(
                          (item: any, index: number) => (
                            <SelectItem value={item.id} key={index}>
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.coverageAreaId && (
                    <p className="error text-xs text-[#FF0000] px-4">
                      {errors.coverageAreaId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Select location code
                  </label>
                  <div className="border-b mb-2">
                    <MultiSelect
                      options={locationOptions}
                      value={selectedLocations}
                      placeholder="Select options"
                      // value={selected || []}
                      onChange={(val) => {
                        setSelectedLocations(val);
                        setValue("locationCodeIds", val);
                      }}
                    />
                  </div>
                  {errors.locationCodeIds && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.locationCodeIds.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Weight limit (kg)
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("weightLimit")}
                      // defaultValue={info?.weightLimit}
                      placeholder="Enter weight limit"
                      className="w-full outline-0 border-b-0 py-2 "
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
                  {errors.weightLimit && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.weightLimit.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col lg:w-1/2 w-full">
                  <label
                    htmlFor="numberOfDaysForPickup"
                    className="font-inter font-semibold"
                  >
                    Number of days for pickup
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("numberOfDaysForPickup")}
                      // defaultValue={info?.numberOfDaysForPickup}
                      placeholder="Enter number of days"
                      className="w-full outline-0 border-b-0 py-2"
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
                  {errors.numberOfDaysForPickup && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.numberOfDaysForPickup.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col lg:w-1/2 w-full">
                  <label
                    htmlFor="numberOfDaysForDelivery"
                    className="font-inter font-semibold"
                  >
                    Number of days for delivery
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("numberOfDaysForDelivery")}
                      // defaultValue={info?.numberOfDaysForDelivery}
                      placeholder="Enter number of days"
                      className="w-full outline-0 border-b-0 py-2"
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
                  {errors.numberOfDaysForDelivery && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.numberOfDaysForDelivery.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Switch
                  // checked={field.value}
                  onCheckedChange={(val) => setValue("isNextDayDelivery", val)}
                />
                <label htmlFor="name" className="font-inter font-semibold">
                  Allow next day delivery
                </label>
              </div>

              <Button
                variant={"secondary"}
                className=" w-fit"
                loading={pendingCreate}
              >
                Add service
              </Button>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
