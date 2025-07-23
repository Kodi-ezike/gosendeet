import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSingleCompany } from "@/services/companies";
import { toast } from "sonner";
import { useEffect } from "react";

export function UpdateCompanyModal({
  open,
  setOpen,
  data,

}: {
  open: boolean;
  setOpen: any;
  data: any;
}) {
  const companyId = data?.id ?? "";
  const schema = z.object({
    name: z
      .string({ required_error: "Company name is required" })
      .min(1, { message: "Please enter company name" }),
    website: z
      .string({ required_error: "Company website is required" })
      .url({ message: "Please enter valid url with https://" })
      .min(1, { message: "Please enter company website" }),
    email: z
      .string({ required_error: "Company email is required" })
      .email({ message: "Please enter valid email" })
      .min(1, { message: "Please enter company website" }),
    phone: z
      .string({ required_error: "Company number is required" })
      .min(11, { message: "Please enter valid phone number" }),
    address: z
      .string({ required_error: "Company address is required" })
      .min(1, { message: "Please enter company address" }),
    city: z
      .string({ required_error: "City is required" })
      .min(1, { message: "Please enter city" }),
    state: z
      .string({ required_error: "State is required" })
      .min(1, { message: "Please enter state" }),
    // status: z
    //   .string({ required_error: "Status is required" })
    //   .min(1, { message: "Please enter status" }),
    country: z
      .string({ required_error: "Country is required" })
      .min(1, { message: "Please enter country" }),
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
  if (data && open) {
    reset({
      name: data.name ?? "",
      website: data.website ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      address: data.address ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      country: data.country ?? "",
      // status: data.status ?? "",
    });
  }
}, [data, open, reset]);

  const queryClient = useQueryClient();

  const { mutate: updateCompany, isPending: pendingUpdate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSingleCompany(id, data), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["single_company"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    updateCompany({
      id: companyId,
       data,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Update Company Info
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          Edit basic details about the company
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="name" className="font-inter font-semibold">
                    Company Name
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("name")}
                      // defaultValue={data?.name}
                      placeholder="Enter company name"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.name && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="website" className="font-inter font-semibold">
                    Company Website
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("website")}
                      // defaultValue={data?.website}
                      placeholder="Enter company website"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.website && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="email" className="font-inter font-semibold">
                    Company Email
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("email")}
                      // defaultValue={data?.email}
                      placeholder="Enter company email"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.email && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="phone" className="font-inter font-semibold">
                    Company Contact Number
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("phone")}
                      // defaultValue={data?.phone}
                      placeholder="Enter company number"
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
                  {errors.phone && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="address" className="font-inter font-semibold">
                    Company Address
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("address")}
                      // defaultValue={data?.address}
                      placeholder="Enter company address"
                      className="w-full outline-0 border-b-0 py-2"
                    />
                  </div>
                  {errors.address && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="city" className="font-inter font-semibold">
                    City
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("city")}
                      // defaultValue={data?.city}
                      placeholder="Enter city"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.city && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="state" className="font-inter font-semibold">
                    State
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("state")}
                      // defaultValue={data?.state}
                      placeholder="Enter state"
                      className="w-full outline-0 border-b-0 py-2 "
                    />
                  </div>
                  {errors.state && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="country" className="font-inter font-semibold">
                    Country
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <Select
                      onValueChange={(val) => setValue("country", val)}
                      value={watch("country")}
                      // defaultValue={data?.country}
                    >
                      <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full py-2 px-0 mt-0">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem value={country.label} key={country.key}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.country && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* <div className="flex flex-col gap-2 w-full">
                <label htmlFor="status" className="font-inter font-semibold">
                  Status
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <Select
                    onValueChange={(val) => setValue("status", val)}
                    value={watch("status")}
                    // defaultValue={data?.status}
                  >
                    <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full py-2 px-0 mt-0">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.status && (
                  <p className="error text-xs text-[#FF0000]">
                    {errors.status.message}
                  </p>
                )}
              </div> */}

              <Button
                variant={"secondary"}
                className=" w-fit"
                loading={pendingUpdate}
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
