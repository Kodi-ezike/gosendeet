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
import { uploadImage } from "@/services/documents";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import {
  useGetAdminDimensionUnits,
  useGetAdminWeightUnits,
} from "@/queries/admin/useGetAdminSettings";
import { allowOnlyNumbers } from "@/lib/utils";

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

  const schema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Please enter a name" }),
    length: z
      .number({ required_error: "Length is required" })
      .min(1, { message: "Please enter a valid length" }),
    width: z
      .number({ required_error: "Width is required" })
      .min(1, { message: "Please enter a valid width" }),
    height: z
      .number({ required_error: "Height is required" })
      .min(1, { message: "Please enter a valid height" }),
    maxWeight: z
      .number({ required_error: "Max weight is required" })
      .min(1, { message: "Please enter a valid max weight" }),
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
      .min(5, { message: "Please enter a description" }),
    imageUrl: z
      .string({ required_error: "Image URL is required" })
      .min(1, { message: "Please upload an image" })
      .url({ message: "Please provide a valid image URL" }),
    active: z.boolean().optional(),
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
  const imageUrl = watch("imageUrl");

  // Image upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Reset form with incoming info when modal opens
  useEffect(() => {
    if (open && type === "edit" && info) {
      reset({
        ...info,
        length: info.length?.toString() ?? "",
        width: info.width?.toString() ?? "",
        height: info.height?.toString() ?? "",
        maxWeight: info.maxWeight?.toString() ?? "",
        imageUrl: info.imageUrl ?? "",
        active: info.active ?? false,
      });
    } else if (open && type === "create") {
      reset({
        name: "",
        length: undefined,
        width: undefined,
        height: undefined,
        maxWeight: undefined,
        weightUnit: "",
        dimensionUnit: "",
        code: "",
        description: "",
        imageUrl: "",
        active: false,
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

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1]; // Remove data:image/jpeg;base64, prefix
          const response = await uploadImage(base64, selectedFile.name);

          // Extract URL from nested response structure
          const imageUrl =
            response.data?.data?.url ||
            response.data?.data?.image?.url ||
            response.data?.data?.display_url;

          if (imageUrl) {
            setValue("imageUrl", imageUrl, { shouldValidate: true });
            toast.success("Image uploaded successfully");
            setSelectedFile(null);
            setPreviewUrl(imageUrl);
          } else {
            toast.error("Failed to get image URL from response");
            console.error("Unexpected response structure:", response);
          }
        } catch (error: any) {
          toast.error(error?.message || "Failed to upload image");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error: any) {
      toast.error(error?.message || "Failed to upload image");
      setIsUploading(false);
    }
  };

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
                      {...register("length", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      defaultValue={info?.length}
                      placeholder="Enter length"
                      className="w-full outline-0 border-b-0 py-2 "
                      onKeyDown={allowOnlyNumbers}
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
                      {...register("width", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      defaultValue={info?.width}
                      placeholder="Enter width"
                      className="w-full outline-0 border-b-0 py-2 "
                      onKeyDown={allowOnlyNumbers}
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
                      {...register("height", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      defaultValue={info?.height}
                      placeholder="Enter height"
                      className="w-full outline-0 border-b-0 py-2"
                      onKeyDown={allowOnlyNumbers}
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
                      {...register("maxWeight", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      defaultValue={info?.maxWeight}
                      placeholder="Enter max weight"
                      className="w-full outline-0 border-b-0 py-2"
                      onKeyDown={allowOnlyNumbers}
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
                      onValueChange={(val) =>
                        setValue("weightUnit", val, { shouldValidate: true })
                      }
                      value={weightUnit}
                    >
                      <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent w-full py-2 px-0">
                        <SelectValue placeholder="Select weight unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {weightUnits &&
                          weightUnits.map((item: string, index: number) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
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
                      onValueChange={(val) =>
                        setValue("dimensionUnit", val, { shouldValidate: true })
                      }
                      value={dimensionUnit}
                    >
                      <SelectTrigger className="outline-0 border-0 focus-visible:border-transparent focus-visible:ring-transparent w-full py-2 px-0">
                        <SelectValue placeholder="Select dimension unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {dimensionUnits &&
                          dimensionUnits.map((item: string, index: number) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
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
                  <label htmlFor="image" className="font-inter font-semibold">
                    Package Image <span className="text-red-500">*</span>
                  </label>

                  {/* Image Preview */}
                  {(previewUrl || imageUrl) && (
                    <div className="mt-2 mb-3">
                      <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={previewUrl || imageUrl}
                          alt="Package preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="flex gap-2 items-center mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs"
                    >
                      Choose Image
                    </Button>

                    {selectedFile && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={handleImageUpload}
                        loading={isUploading}
                        className="text-xs"
                      >
                        Upload
                      </Button>
                    )}
                  </div>

                  {selectedFile && !isUploading && (
                    <p className="text-xs text-gray-600 mt-1">
                      Selected: {selectedFile.name}
                    </p>
                  )}

                  {imageUrl && (
                    <p className="text-xs text-green-600 mt-1 break-all">
                      ✓ Image uploaded successfully
                    </p>
                  )}

                  {errors.imageUrl && (
                    <p className="error text-xs text-[#FF0000] mt-1">
                      {errors.imageUrl.message}
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
                      defaultChecked={info?.active}
                      onCheckedChange={(val) => setValue("active", val)}
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
