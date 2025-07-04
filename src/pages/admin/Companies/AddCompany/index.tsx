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

type FormValues = {
  companyNumber: string;
  // companySecondaryNumber: string;
};

const AddCompany = () => {
  const navigate = useNavigate();
  // const [addNumber, setAddNumber] = useState(false);
  // const [address, setAddress] = useState(false);

  const schema = z.object({
    companyName: z
      .string({ required_error: "Company name is required" })
      .min(1, { message: "Please enter company name" }),
    companyWebsite: z
      .string({ required_error: "Company website is required" })
      .url({ message: "Please enter valid url with https://" })
      .min(1, { message: "Please enter company website" }),
    companyEmail: z
      .string({ required_error: "Company email is required" })
      .email({ message: "Please enter valid email" })
      .min(1, { message: "Please enter company website" }),
    companyNumber: z
      .string({ required_error: "Company number is required" })
      .min(11, { message: "Please enter valid phone number" }),
      // companySecondaryNumber: z.string().optional(),
      companyAddress: z
      .string({ required_error: "Company address is required" })
      .min(1, { message: "Please enter company address" }),
      // companySecondaryAddress: z.string().optional(),
      city: z
      .string({ required_error: "City is required" })
      .min(1, { message: "Please enter city" }),
      state: z
      .string({ required_error: "State is required" })
      .min(1, { message: "Please enter state" }),
      country: z
      .string({ required_error: "Country is required" })
      .min(1, { message: "Please enter country" }),
    // companySecondaryNumber: z
    //   .string({ required_error: "Company number is required" })
    //   .min(11, { message: "Please enter valid phone number" }),
    
  })
  // .refine((addNumber)=>{
  //     message:
  //       "Please enter valid phone number ",
  //     path: ["companySecondaryNumber"], // This points to the field that should show the error
  //   })

  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  // const { mutate, isPending } = useMutation({
  //   mutationFn: changePassword,
  //   onSuccess: () => {
  //     toast.success("Successful");
  //     setOpen(false);
  //     reset();
  //   },
  //   onError: (data) => {
  //     toast.error(data?.message);
  //   },
  // });
  const numberOnly =
    (fieldName: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/\D/g, "");
      setValue(fieldName, cleaned);
    };

  const companyNumber = watch("companyNumber");
  // const companySecondaryNumber = watch("companySecondaryNumber");

  

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    // mutate({
    //   oldPassword: data.currentPassword,
    //   newPassword: data.password,
    //   confirmPassword: data.confirmPassword,
    // });
  };

  return (
    <div className="md:px-20 px-6 py-8 bg-neutral100">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant={"ghost"}
          size={"ghost"}
          className=""
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </Button>

        <h2 className="font-semibold text-[20px] font-inter">
          Add New Company
        </h2>

        <div className="flex gap-4 items-center">
          <Button
            variant={"outline"}
            className="md:text-base text-sm bg-neutral200 border-neutral700"
            // onClick={() => setOpen(true)}
          >
            Save as draft
          </Button>
          <Button
            variant={"secondary"}
            className="md:text-base text-sm"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Save and Publish
          </Button>
          {/* <Button
          variant={"outline"}
          className="md:text-base text-sm bg-white"
          // onClick={() => setOpen(true)}
        >
          Cancel
        </Button> */}
        </div>
      </div>

      <div className="flex lg:flex-row items-stretch flex-col gap-8 justify-between">
        <div className="lg:w-1/2 border border-neutral700 rounded-2xl px-6 py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 text-sm"
          >
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="companyName"
                className="font-inter font-semibold px-4"
              >
                Company Name
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("companyName")}
                  placeholder="Enter company name"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.companyName && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="companyWebsite"
                className="font-inter font-semibold px-4"
              >
                Company Website
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("companyWebsite")}
                  placeholder="Enter company website"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.companyWebsite && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.companyWebsite.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="companyEmail"
                className="font-inter font-semibold px-4"
              >
                Company Email
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("companyEmail")}
                  placeholder="Enter company email"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />
              </div>
              {errors.companyEmail && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.companyEmail.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="companyNumber"
                className="font-inter font-semibold px-4"
              >
                Company Contact Number
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("companyNumber")}
                  value={companyNumber || ""}
                  onChange={numberOnly("companyNumber")}
                  placeholder="Enter company number"
                  inputMode="numeric"
                  className="w-full outline-0 border-b-0 py-2 px-4"
                />
              </div>
              {errors.companyNumber && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.companyNumber.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="city"
                className="font-inter font-semibold px-4"
              >
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
              <label
                htmlFor="state"
                className="font-inter font-semibold px-4"
              >
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
                <input
                  type="text"
                  {...register("country")}
                  placeholder="Enter country"
                  className="w-full outline-0 border-b-0 py-2 px-4 "
                />

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
                    htmlFor="companyNumber"
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
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="companyAddress"
                className="font-inter font-semibold px-4"
              >
                Company Address
              </label>
              <div className="flex justify-between items-center gap-2 border-b">
                <input
                  type="text"
                  {...register("companyAddress")}
                  placeholder="Enter company address"
                  className="w-full outline-0 border-b-0 py-2 px-4"
                />
              </div>
              {errors.companyAddress && (
                <p className="error text-xs text-[#FF0000] px-4">
                  {errors.companyAddress.message}
                </p>
              )}
            </div>

            <div>
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
        <div className="lg:w-1/2 border border-neutral700 rounded-2xl px-6 py-10"></div>
      </div>
    </div>
  );
};

export default AddCompany;
