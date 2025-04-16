import { Button } from "@/components/ui/button";

import Layout from "@/layouts/HomePageLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/InputField";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const schema = z.object({
    card_number: z
      .string({ required_error: "Card number is required" })
      .min(1, { message: "Card number be empty" }),
    expiry_date: z
      .string({ required_error: "Expiry date is required" })
      .min(1, { message: "Expiry date cannot be empty" }),
    cvv: z
      .string({ required_error: "CVV is required" })
      .min(1, { message: "CVV cannot be empty" }),
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
    navigate("/confirmation");
  };

  return (
    <Layout>
      <div className="py-10 xl:w-[70%] md:w-[80%] w-full mx-auto px-6 ">
        <p className="text-neutral600 font-medium leading-140 mb-2">Step 2/3</p>
        <h1 className="font-clash font-semibold text-2xl leading-130 mb-2">
          Checkout
        </h1>
        <p className="mb-4 text-neutral600">
          Your booking is on pending until payment is made here
        </p>

        <div className="flex md:flex-row flex-col gap-6 justify-between ">
          <div className="lg:w-[65%] flex flex-col gap-6">
            <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
              <h2 className="font-clash font-semibold text-md mt-1">
                Booking info
              </h2>
              <hr className="border-b border-b-neutral200 my-4" />

              <div className="flex md:flex-row flex-col gap-6">
                <div className="md:w-1/2">
                  <p className="font-clash font-semibold mb-2">From</p>
                  <p className="font-medium text-sm">Victor Agbeniga</p>
                </div>
                <div className="md:w-1/2">
                  <p className="font-clash font-semibold mb-2">Phone Number</p>
                  <p className="font-medium text-sm">2345678909876</p>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
                <h2 className="font-clash font-semibold text-md mt-1">
                  Payment Details
                </h2>
                <hr className="border-b border-b-neutral200 mt-4 mb-6" />

                {/* Card Number */}
                <div className="form-group mb-6">
                  <Input
                    label="Card Number"
                    name="card_number"
                    type="text"
                    placeholder="Enter your credit/debit card number"
                    register={register}
                  />
                  {errors.card_number && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.card_number.message}
                    </p>
                  )}
                </div>
                <div className="flex md:flex-row flex-col gap-8 justify-between">
                  {/* Expiry Date */}
                  <div className="form-group w-full">
                    <Input
                      label="Expiry Date"
                      name="expiry_date"
                      type="text"
                      placeholder="00/0000"
                      register={register}
                    />
                    {errors.expiry_date && (
                      <p className="error text-xs text-[#FF0000]">
                        {errors.expiry_date.message}
                      </p>
                    )}
                  </div>
                  {/* CVV */}
                  <div className="form-group w-full">
                    <Input
                      label="CVV"
                      name="cvv"
                      type="text"
                      placeholder="Enter your card cvv"
                      register={register}
                    />

                    {errors.cvv && (
                      <p className="error text-xs text-[#FF0000]">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
                <h2 className="font-clash font-semibold text-md mt-1">
                  Payment Details
                </h2>
                <hr className="border-b border-b-neutral200 my-4" />
                <div className="flex gap-2 items-start mb-4">
                  <input type="checkbox" name="" id="" className="mt-1" />
                  <p className="text-sm">
                    By clicking this, I acknowledge that i have read and agree
                    with GoSendeet terms.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-purple400 hover:bg-purple500 rounded-full py-3 px-8 text-white"
                >
                  {/* {isPending && <Loader2 className="h-6 w-6 animate-spin" />}  */}
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </div>
          <div className="lg:w-[35%]">
            <div className="p-4 relative bg-neutral100 border border-neutral200 rounded-xl">
              <h2 className="font-clash font-semibold text-md mt-1">Summary</h2>
              <hr className="border-b border-b-neutral200 my-4" />

              <div className="flex flex-col gap-6">
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">To</span>
                  <span>Johanne Effiong</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Phone Number</span>
                  <span>2345678909876</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Address</span>
                  <span>17, Marina, VI, Lagos</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Pickup Date</span>
                  <span> 27 May 2025 </span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Logistics</span>
                  <span>DHL Ibadan</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Delivery Date</span>
                  <span> 30 May 2025 </span>
                </p>
              </div>

              <hr className="border-b border-b-neutral200 my-10" />

              <h2 className="font-clash font-semibold text-md mt-1">Price Details</h2>
              <hr className="border-b border-b-neutral200 my-4" />

              <div className="flex flex-col gap-6">
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Subtotal</span>
                  <span>$40.00</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Shipping Fee</span>
                  <span>FREE</span>
                </p>
                <p className="flex justify-between items-center font-medium text-sm">
                  <span className="text-neutral600">Tax</span>
                  <span>$4.00</span>
                </p>
                
              </div>

              <hr className="border-b border-b-neutral200 my-6" />

              <p className="flex justify-between items-center font-semibold">
                  <span className="text-neutral600">Total</span>
                  <span>$44.00</span>
                </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
