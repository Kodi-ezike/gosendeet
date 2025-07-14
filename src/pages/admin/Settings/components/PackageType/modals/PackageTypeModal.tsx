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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPackageType, updatePackageType } from "@/services/adminSettings";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import {
  useGetAdminDimensionUnits,
  useGetAdminWeightUnits,
} from "@/queries/admin/useGetAdminSettings";

export function PackageTypeModal({
  open,
  setOpen,
  type,
  info,
}: {
  open: boolean;
  setOpen: any;
  type: string;
  info: any;
}) {
  const { data: weightUnits } = useGetAdminWeightUnits();
  const { data: dimensionUnits } = useGetAdminDimensionUnits();

  console.log(weightUnits);
  console.log(dimensionUnits);

  const schema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, { message: "Please enter a name" }),
    length: z
      .string({ required_error: "Length is required" })
      .min(1, { message: "Please enter a length" }),
    width: z
      .string({ required_error: "Width is required" })
      .min(1, { message: "Please enter a width" }),
    height: z
      .string({ required_error: "Height is required" })
      .min(1, { message: "Please enter a height" }),
    maxWeight: z
      .string({ required_error: "Max weight is required" })
      .min(1, { message: "Please enter a max weight" }),
    weightUnit: z
      .string({ required_error: "Weight unit is required" })
      .min(1, { message: "Please enter a weight unit" }),
    dimensionUnit: z
      .string({ required_error: "Dimension unit is required" })
      .min(1, { message: "Please enter a dimension unit" }),
    code: z
      .string({ required_error: "Code is required" })
      .min(1, { message: "Please enter a code" }),
    description: z
      // .string().optional(),
      .string({ required_error: "Description is required" })
      .min(1, { message: "Please enter a description" }),
    isActive: z.boolean().optional(),
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

  const weightUnit = watch("weightUnit");
  const dimensionUnit = watch("dimensionUnit");

  // ✅ Reset form with incoming info when modal opens
  useEffect(() => {
    if (open && type === "edit" && info) {
      reset({
        ...info,
        length: info.length?.toString() ?? "",
        width: info.width?.toString() ?? "",
        height: info.height?.toString() ?? "",
        maxWeight: info.maxWeight?.toString() ?? "",
      });
    } else if (open && type === "create") {
      reset({
        name: "",
        length: "",
        width: "",
        height: "",
        maxWeight: "",
        weightUnit: "",
        dimensionUnit: "",
        code: "",
        description: "",
        isActive: false,
      });
    }
  }, [open, info, type, reset]);

  const queryClient = useQueryClient();

  const { mutate: createType, isPending: pendingCreate } = useMutation({
    mutationFn: createPackageType,
    onSuccess: () => {
      toast.success("Successful");
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["package_types"],
      });
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: updateType, isPending: pendingUpdate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePackageType(id, data), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["package_types"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    type === "create" && createType(data);

    type === "edit" &&
      updateType({
        id: info?.id,
        data: data,
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={false} className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Package Type
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          {type === "create" ? "Add a package type." : "Edit a package type."}
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Name
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("name")}
                      defaultValue={info?.name}
                      placeholder="Enter name"
                      className="w-full outline-0 border-b-0 py-2"
                    />
                  </div>
                  {errors.name && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Length
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("length")}
                      defaultValue={info?.length}
                      placeholder="Enter length"
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
                  {errors.length && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.length.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Width
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("width")}
                      defaultValue={info?.width}
                      placeholder="Enter width"
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
                  {errors.width && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.width.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Height
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("height")}
                      defaultValue={info?.height}
                      placeholder="Enter height"
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
                  {errors.height && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.height.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Max Weight
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("maxWeight")}
                      defaultValue={info?.maxWeight}
                      placeholder="Enter max weight"
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
                  {errors.maxWeight && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.maxWeight.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Weight Unit
                  </label>
                  <div className="border-b mb-2">
                    <Select
                      onValueChange={(val) => setValue("weightUnit", val)}
                      defaultValue={weightUnit}
                    >
                      <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent w-full py-2 px-0">
                        <SelectValue placeholder="Select weight unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.weightUnit && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.weightUnit.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Dimension Unit
                  </label>
                  <div className="border-b mb-2">
                    <Select
                      onValueChange={(val) => setValue("dimensionUnit", val)}
                      defaultValue={dimensionUnit}
                    >
                      <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent w-full py-2 px-0">
                        <SelectValue placeholder="Select dimension unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.dimensionUnit && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.dimensionUnit.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Code
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("code")}
                      defaultValue={info?.code}
                      placeholder="Enter code"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.code && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Description
                  </label>
                  <div className="border-b mb-2">
                    <input
                      type="text"
                      {...register("description")}
                      defaultValue={info?.description}
                      placeholder="Enter description"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.description && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Status
                  </label>
                  <div className="py-2">
                    <Switch
                      // checked={field.value}
                      onCheckedChange={(val) => setValue("isActive", val)}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant={"secondary"}
                loading={type === "edit" ? pendingUpdate : pendingCreate}
              >
                {type === "edit" ? "Update" : "Add"}
              </Button>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
