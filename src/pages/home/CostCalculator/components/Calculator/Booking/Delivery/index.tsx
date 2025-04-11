import { Button } from "@/components/ui/button";

import Layout from "@/layouts/HomePageLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/InputField";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const navigate = useNavigate()
  const schema = z.object({
    sender_name: z
      .string({ required_error: "Sender’s name is required" })
      .min(1, { message: "Name cannot be empty" }),
    sender_phone: z
      .string({ required_error: "Sender’s number is required" })
      .min(1, { message: "Phone number cannot be empty" }),
    sender_address: z
      .string({ required_error: "Sender’s address is required" })
      .min(1, { message: "Address cannot be empty" }),
    receiver_name: z
      .string({ required_error: "Receiver’s name is required" })
      .min(1, { message: "Name cannot be empty" }),
    receiver_phone: z
      .string({ required_error: "Receiver’s number is required" })
      .min(1, { message: "Phone number cannot be empty" }),
    receiver_address: z
      .string({ required_error: "Receiver’s address is required" })
      .min(1, { message: "Address cannot be empty" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });



  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    navigate('/checkout')
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

          {/* Sender’s Address */}
          <div className="form-group">
            <Input
              label="Sender’s Address"
              name="sender_address"
              type="text"
              placeholder="Enter your address"
              register={register}
            />
            {errors.sender_address && (
              <p className="error text-xs text-[#FF0000]">
                {errors.sender_address.message}
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
              placeholder="Enter your name"
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
              placeholder="Enter your phone number"
              register={register}
            />
            {errors.receiver_phone && (
              <p className="error text-xs text-[#FF0000]">
                {errors.receiver_phone.message}
              </p>
            )}
          </div>
          </div>

          {/* Receiver’s Address */}
          <div className="form-group">
            <Input
              label="Receiver’s Address"
              name="receiver_address"
              type="text"
              placeholder="Enter your address"
              register={register}
            />
            {errors.receiver_address && (
              <p className="error text-xs text-[#FF0000]">
                {errors.receiver_address.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="">
            <Button
              type="submit"
              className="bg-purple400 rounded-full py-3 px-8 text-white"
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
