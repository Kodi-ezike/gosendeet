import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
import { AddServiceModal } from "./modals/AddServiceModal";
import { AddPricingModal } from "./modals/AddPricingModal";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany, deleteCompanyServices } from "@/services/companies";
import { toast } from "sonner";
import {
  // useGetCompanyList,
  useGetCompanyServices,
} from "@/queries/admin/useGetAdminCompanies";
import DeleteModal from "@/components/modals/DeleteModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import Pricing from "./Pricing";

const AddCompany = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  // const [companyId, setCompanyId] = useState("");
  const [companyId, setCompanyId] = useState(
    "6a049497-aab0-4ce5-8c8d-d4254292097f"
  );
  const [openService, setOpenService] = useState(false);
  const [serviceInfo, setServiceInfo] = useState({});
  const [pricingInfo, setPricingInfo] = useState({});
  const [serviceId, setServiceId] = useState("");
  const [type, setType] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);
  const handleDeleteModal = () => setOpenDeleteModal(null);

  const [openPricing, setOpenPricing] = useState(false);

  const { data: company_services } = useGetCompanyServices(companyId);

  // const page = 0;
  // const size = 10;
  // const companyStatus = "";
  // const serviceLevelId = "";
  // const search = "";

  // const { data: company_list } = useGetCompanyList(
  //   page,
  //   size,
  //   companyStatus,
  //   serviceLevelId,
  //   search
  // );

  // console.log(company_list?.data?.content);

  const companyServices = company_services?.data || [];

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

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showModal = (id: number) => {
    setActiveModalId((prevId) => (prevId === id ? null : id)); // Toggle modal on/off
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // if (isDialogOpen) return; // Skip if dialog is open

      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setActiveModalId(null); // Close parent modal
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const queryClient = useQueryClient();

  const { mutate: create, isPending: pendingCreate } = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      toast.success("Successful");
      reset({
        country: "",
      });
      setCompanyId(data?.data?.id);
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: deleteService, isPending: pendingDelete } = useMutation({
    mutationFn: (id: string) => deleteCompanyServices(id), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      handleDeleteModal()
      queryClient.invalidateQueries({
        queryKey: ["company_services"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const handleDelete = (id: string) => deleteService(id);

  const onSubmit = (data: z.infer<typeof schema>, status: string) => {
    create({ ...data, status });
  };

  return (
    <div className="md:px-20 px-6 py-8 bg-neutral100">
      <div className=" flex lg:flex-row flex-col gap-4 justify-between items-center mb-8">
        <div className="flex justify-between items-center lg:w-1/2 w-full">
          <Button variant={"ghost"} size={"ghost"} onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back
          </Button>

          <h2 className="font-semibold md:text-[20px] text-md font-inter">
            Add New Company
          </h2>
        </div>

        <div className="flex gap-4 items-center lg:w-1/2 w-full justify-end">
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
        <div className="lg:w-1/2 border border-neutral700 rounded-2xl md:px-6 px-4 py-10">
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
            {companyServices && companyServices?.length > 0
              ? companyServices?.map((item: any, index: number) => {
                  const isDeleteModalOpen = openDeleteModal === index;

                  return (
                    <div key={index} className="mb-4">
                      <div className="relative flex md:flex-row flex-col md:items-center md:gap-4 gap-2 justify-between">
                        <p className="bg-purple100 py-2 px-4 font-medium w-fit">
                          {item.companyServiceLevel.name}
                        </p>

                        <button className="border p-1 rounded-md border-neutral200">
                          <BsThreeDotsVertical
                            size={20}
                            className="p-1 cursor-pointer"
                            onClick={() => showModal(index)}
                          />
                        </button>

                        {/* Modal */}
                        {activeModalId === index && ( // Show modal only for the active event
                          <>
                            <div
                              className="modal w-fit bg-white shadow-md p-1 rounded-md z-10 absolute top-10 right-0"
                              ref={modalRef} // Attach ref to the modal
                            >
                              <p
                                className="flex items-center gap-2 py-1 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                                onClick={() => {
                                  setType("create");
                                  setServiceId(item.id);
                                  setOpenPricing(true);
                                }}
                              >
                                Add pricing
                              </p>
                              <p
                                className="flex items-center gap-2 py-1 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                                onClick={() => {
                                  setServiceInfo(item);
                                  setOpenService(true);
                                  setType("edit");
                                }}
                              >
                                Edit service
                              </p>
                              <p
                                className="flex items-center gap-2 py-1 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                                onClick={() => {
                                  setOpenDeleteModal(index);
                                }}
                              >
                                Delete service
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <DeleteModal
                        open={isDeleteModalOpen}
                        onOpenChange={(open) => {
                                open
                                  ? setOpenDeleteModal(index)
                                  : setOpenDeleteModal(null);
                              }}
                        title={"Delete company service"}
                        data={item.companyServiceLevel.name ?? ""}
                        id={item.id ?? ""}
                        handleDelete={handleDelete}
                        loading={pendingDelete}
                      />

                      <Pricing
                        serviceId={item.id}
                        setServiceId={setServiceId}
                        setType={setType}
                        setOpenPricing={setOpenPricing}
                        setPricingInfo={setPricingInfo}
                        info={pricingInfo}
                      />
                    </div>
                  );
                })
              : null}
            <div className="">
              {companyServices && companyServices?.length > 0 ? (
                <Button
                  variant={"ghost"}
                  size={"ghost"}
                  className="text-purple500"
                  onClick={() => {
                    setType("create");
                    setOpenService(true);
                  }}
                  disabled={companyId === ""}
                >
                  <FiEdit /> Add another service
                </Button>
              ) : (
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setType("create");
                    setOpenService(true);
                  }}
                  disabled={companyId === ""}
                >
                  <FiEdit /> Add New Service
                </Button>
              )}
            </div>
          </div>
          {/* <div className="w-full h-full  border border-neutral700 rounded-2xl px-6 py-10">
            <p className="font-semibold font-inter">
              Set Your Delivery Pricing
            </p>
            <p className="text-sm mt-4 mb-6">
              Configure your delivery rates by setting up pricing rules for
              diverse service types.
            </p>
            <div className="mb-8">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setType("create");
                  setOpenPricing(true);
                }}
                disabled={companyId === ""}
              >
                <FiEdit /> Add New Custom Pricing
              </Button>
            </div>
            <div className="bg-purple900 w-fit p-4 flex flex-wrap items-center gap-2 rounded-xl">
              <FiInfo />
              <p className="text-sm">
                If no custom pricing is configured, API rates will be used by
                default.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <AddServiceModal
        companyId={companyId}
        openService={openService}
        setOpenService={setOpenService}
        info={serviceInfo}
        setInfo={setServiceInfo}
        type={type}
      />

      <AddPricingModal
        openPricing={openPricing}
        setOpenPricing={setOpenPricing}
        type={type}
        info={pricingInfo}
        setPricingInfo={setPricingInfo}
        companyServiceId={serviceId}
      />
    </div>
  );
};

export default AddCompany;
