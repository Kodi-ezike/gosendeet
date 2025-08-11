import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/HomePageLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/services/user";
import { parseDateInput } from "@/lib/utils";

const Delivery = () => {
  const location = useLocation();
  const { bookingRequest, bookingDetails } = location?.state || {};
  const userId = sessionStorage.getItem("userId") || "";
  const [bookingData, setBookingData] = useState({});

  const [_, currency, amount] =
    bookingDetails?.price?.match(/^([A-Za-z]+)([\d.]+)$/) || [];

  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      toast.error("Please sign in to continue");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  }, [userId]);

  const schema = z.object({
    sender_name: z
      .string({ required_error: "Sender’s name is required" })
      .min(1, { message: "Name cannot be empty" }),
    sender_phone: z
      .string({ required_error: "Sender’s number is required" })
      .min(1, { message: "Phone number cannot be empty" }),
    sender_email: z
      .string()
      .email({ message: "Invalid email address" })
      .or(z.literal("")) // allow empty string
      .optional(),
    receiver_name: z
      .string({ required_error: "Receiver’s name is required" })
      .min(1, { message: "Name cannot be empty" }),
    receiver_phone: z
      .string({ required_error: "Receiver’s number is required" })
      .min(1, { message: "Phone number cannot be empty" }),
    receiver_email: z
      .string()
      .email({ message: "Invalid email address" })
      .or(z.literal("")) // allow empty string
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: (data: any) => {
      toast.success("Successful");
      // setData(data);
      navigate("/checkout", {
        state: { bookingId: data?.data?.id, bookingData: bookingData },
      });
    },
    onError: (data: any) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      senderId: userId,
      packageTypeId: bookingRequest?.packageTypeId,
      receiverName: data.receiver_name,
      receiverPhone: data.receiver_phone,
      receiverEmail: data.receiver_email, // NUllable
      pickupLocation: bookingRequest?.pickupLocation,
      destination: bookingRequest?.dropOffLocation,
      courierCost: amount,
      tax: 0,
      currency: currency,
      pickupDate: parseDateInput(bookingDetails?.pickUpdateDate),
      companyId: bookingDetails?.courier?.id,
      estimatedDeliveryDate: parseDateInput(
        bookingDetails?.estimatedDeliveryDate
      ),
    };
    setBookingData({
      courierName: bookingDetails?.courier?.name,
      senderName: data.sender_name,
      senderPhone: data.sender_phone,
      senderEmail: data.sender_email,
      ...payload,
    });
    mutate(payload);
  };

  return (
    <Layout>
      <div className="py-10 xl:w-[70%] md:w-[80%] w-full mx-auto px-6 ">
        <p className="text-neutral600 font-medium leading-140 mb-2">Step 1/3</p>
        <h1 className="font-clash font-semibold text-2xl leading-130 mb-2">
          Delivery Details
        </h1>
        <p className="mb-4 text-neutral600">Complete the details below </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 md:p-8 p-4 relative bg-neutral100 border border-neutral200 rounded-xl"
        >
          <div className="flex md:flex-row flex-col gap-8 justify-between">
            {/* Sender’s Name */}
            <div className="form-group w-full">
              <Input
                label="Sender’s Name"
                name="sender_name"
                type="text"
                placeholder="Enter your name"
                register={register}
              />
              {errors.sender_name && (
                <p className="error text-xs text-[#FF0000]">
                  {errors.sender_name.message}
                </p>
              )}
            </div>
            {/* Sender’s Phone Number */}
            <div className="form-group w-full">
              <Input
                label="Sender’s Phone Number"
                name="sender_phone"
                type="tel"
                placeholder="Enter your phone number"
                register={register}
                pattern="[0-9]{11}"
                inputMode="numeric"
              />

              {errors.sender_phone && (
                <p className="error text-xs text-[#FF0000]">
                  {errors.sender_phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Sender’s Email */}
          <div className="form-group">
            <Input
              label="Sender’s Email"
              name="sender_email"
              type="text"
              placeholder="Enter your email"
              register={register}
            />
            {errors.sender_email && (
              <p className="error text-xs text-[#FF0000]">
                {errors.sender_email.message}
              </p>
            )}
          </div>

          <div className="flex md:flex-row flex-col gap-8 justify-between">
            {/* Receiver’s  Name */}
            <div className="form-group w-full">
              <Input
                label="Receiver’s  Name"
                name="receiver_name"
                type="text"
                placeholder="Enter receiver's name"
                register={register}
              />
              {errors.receiver_name && (
                <p className="error text-xs text-[#FF0000]">
                  {errors.receiver_name.message}
                </p>
              )}
            </div>
            {/* Receiver’s  Phone Number */}
            <div className="form-group w-full">
              <Input
                label="Receiver’s  Phone Number"
                name="receiver_phone"
                type="text"
                placeholder="Enter receiver's phone number"
                register={register}
              />
              {errors.receiver_phone && (
                <p className="error text-xs text-[#FF0000]">
                  {errors.receiver_phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Receiver’s Email */}
          <div className="form-group">
            <Input
              label="Receiver’s Email"
              name="receiver_email"
              type="text"
              placeholder="Enter receiver's email"
              register={register}
            />
            {errors.receiver_email && (
              <p className="error text-xs text-[#FF0000]">
                {errors.receiver_email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="">
            <Button
              type="submit"
              className="bg-purple400 rounded-full py-3 px-8 text-white"
              loading={isPending}
            >
              {/* {isPending && <Loader2 className="h-6 w-6 animate-spin" />}  */}
              Proceed to Checkout
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Delivery;
