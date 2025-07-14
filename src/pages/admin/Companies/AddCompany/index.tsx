import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SelectInput } from "@/components/ui/selectInput";
// import { countries } from "@/constants";
// import { FiEdit } from "react-icons/fi";
// import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants";
import { AddServiceModal } from "./modals/AddServiceModal";
import { AddPricingModal } from "./modals/AddPricingModal";
import { FiInfo } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "@/services/companies";
import { toast } from "sonner";

const AddCompany = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

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

  const queryClient = useQueryClient();

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      toast.success("Successful");
      reset({
        country: "",
      });
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>, status: string) => {
    create({ ...data, status });
  };

  return (
    <div className="md:px-20 px-6 py-8 bg-neutral100">
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-between items-center">

        <Button variant={"ghost"} size={"ghost"} onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </Button>

        <h2 className="font-semibold text-[20px] font-inter">
          Add New Company
        </h2>
        </div>

        <div className="flex gap-4 items-center w-fit">
          <Button
            variant={"outline"}
            className="md:text-base text-sm bg-neutral200 border-neutral700"
            onClick={() => {
              handleSubmit((data) => {
                setStatus("DRAFT");
                onSubmit(data, "DRAFT");
              })();
            }}
            loading={pendingCreate && status === "DRAFT"}
          >
            Save as draft
          </Button>
          <Button
            variant={"secondary"}
            className="md:text-base text-sm"
            onClick={() => {
              handleSubmit((data) => {
                setStatus("PUBLISHED");
                onSubmit(data, "PUBLISHED");
              })();
            }}
            loading={pendingCreate && status === "PUBLISHED"}
          >
            Save and Publish
          </Button>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-8 justify-between">
        <div className="lg:w-1/2 border border-neutral700 rounded-2xl px-6 py-10">
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 text-sm"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="font-inter font-semibold px-4">
                Company Name
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter company name"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.name && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="website"
                className="font-inter font-semibold px-4"
              >
                Company Website
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("website")}
                  placeholder="Enter company website"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.website && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.website.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="font-inter font-semibold px-4">
                Company Email
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("email")}
                  placeholder="Enter company email"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.email && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="phone" className="font-inter font-semibold px-4">
                Company Contact Number
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Enter company number"
                  className="w-full outline-0 border-b-0 py-2 px-4"
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
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="address"
                className="font-inter font-semibold px-4"
              >
                Company Address
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Enter company address"
                  className="w-full outline-0 border-b-0 py-2 px-4"
                />
              </div>
              {errors.address && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="city" className="font-inter font-semibold px-4">
                City
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("city")}
                  placeholder="Enter city"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.city && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="state" className="font-inter font-semibold px-4">
                State
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("state")}
                  placeholder="Enter state"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.state && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="country"
                className="font-inter font-semibold px-4"
              >
                Country
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <Select
                  onValueChange={(val) => setValue("country", val)}
                  value={watch("country")}
                >
                  <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full p-4 mt-0">
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

                {/* <SelectInput
                variant="bordered"
                labelPlacement="outside"
                size="lg"
                required={true}
                options={countries}
                // selectedKey={country?.name}
                {...register("country")}
                // isLoading={get_all_countries?.isLoading}
                onSelectionChange={(selectedKey: string) => {
                  // Update the form value directly
                  setValue("country", selectedKey);
                }}
              /> */}
              </div>
              {errors.country && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* <div>
              <p
                className="flex items-center gap-2 text-base cursor-pointer  text-purple500 font-medium "
                onClick={() => setAddNumber(true)}
              >
                <FiEdit />
                Add secondary number
              </p>

              {addNumber && (
                <div className="flex flex-col gap-2 w-full mt-8">
                  <label
                    htmlFor="phone"
                    className="font-inter font-semibold px-4"
                  >
                    Company Secondary Number
                  </label>
                  <div className="flex justify-between items-center gap-2 border-b">
                    <input
                      type="text"
                      {...register("companySecondaryNumber")}
                      value={companySecondaryNumber || ""}
                      onChange={numberOnly("companySecondaryNumber")}
                      placeholder="Enter company secondary number"
                      inputMode="numeric"
                      className="w-full outline-0 border-b-0 py-2 px-4"
                    />

                    <IoClose
                      className="text-red-500 text-2xl"
                      onClick={() => {
                        setAddNumber(false);
                        setValue("companySecondaryNumber", "");
                      }}
                    />
                  </div>
                  {errors.companySecondaryNumber && (
                    <p className="error text-xs text-[#FF0000] px-4">
                      {errors.companySecondaryNumber.message}
                    </p>
                  )}
                </div>
              )}
            </div> */}

            {/* <div>
              <p
                className="flex items-center gap-2 text-base cursor-pointer  text-purple500 font-medium "
                onClick={() => setAddress(true)}
              >
                <FiEdit />
                Add another branch
              </p>

              {address && (
               <div className="flex flex-col gap-2 w-full mt-8">
              <label
                htmlFor="companySecondaryAddress"
                className="font-inter font-semibold px-4"
              >
                Company Secondary Address
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("companySecondaryAddress")}
                  placeholder="Enter company secondary address"
                  className="w-full outline-0 border-b-0 py-2 px-4"
                />

                <IoClose
                      className="text-red-500 text-2xl"
                      onClick={() => {
                        setAddress(false);
                        setValue("companySecondaryAddress", "");
                      }}
                    />
              </div>
              {errors.companySecondaryAddress && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.companySecondaryAddress.message}
                </p>
              )}
            </div>
              )}
            </div> */}
          </form>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-8">
          <div className="w-full border border-neutral700 rounded-2xl px-6 py-10">
            <p className="font-semibold font-inter">Company Services</p>
            <p className="text-sm mt-4 mb-6">
              Configure your delivery rates by setting up pricing rules for
              diverse package options and service types.
            </p>
            <div>
              <AddServiceModal />
            </div>
          </div>
          <div className="w-full h-full  border border-neutral700 rounded-2xl px-6 py-10">
            <p className="font-semibold font-inter">
              Set Your Delivery Pricing
            </p>
            <p className="text-sm mt-4 mb-6">
              Configure your delivery rates by setting up pricing rules for
              diverse service types.
            </p>
            <div className="mb-8">
              <AddPricingModal />
            </div>
            <div className="bg-purple900 w-fit p-4 flex flex-wrap items-center gap-2 rounded-xl">
              <FiInfo />
              <p className="text-sm">
                If no custom pricing is configured, API rates will be used by
                default.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
