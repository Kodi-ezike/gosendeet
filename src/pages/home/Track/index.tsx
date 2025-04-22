import { Button } from "@/components/ui/button";
import Layout from "@/layouts/HomePageLayout";
import { LuInfo } from "react-icons/lu";
import { PiGpsFixFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Track = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const schema = z.object({
    tracking_number: z
      .string({ required_error: "Tracking number is required" })
      .min(1, { message: "Tracking number be empty" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    // console.log(data);
    navigate(`/track/${data?.tracking_number}`);
  };

  return (
    <Layout>
      <div className="md:px-20 px-6 md:py-16 py-8">
        <div className="xl:w-1/2 md:w-[80%] mx-auto bg-purple300 py-20 md:px-10 px-4">
          <h1 className="lg:text-[40px] text-[36px] font-semibold font-clash md:text-left text-center mb-1">
            Track your{" "}
            <span className="font-tiempos font-medium italic">shipment</span>{" "}
          </h1>
          <div className="relative">
            <p className="flex gap-2 items-start font-medium text-neutral800">
              <span>
                <LuInfo
                  className="mt-1 cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </span>
              See the current status of your shipment.
            </p>
            {open && (
              <div className="modal absolute left-[-15px]">
                <div
                  className="relative w-0 h-0 
                    border-l-[25px] border-l-transparent 
                    border-r-[25px] border-r-transparent 
                    border-b-[25px] border-b-white "
                ></div>

                <div className="lg:w-[600px] bg-white shadow-faqShadow py-6 px-10">
                  <p className="font-clash font-semibold mb-4">
                    Tracking your GoSendeet shipment is simple.{" "}
                  </p>
                  <ol className="list-decimal font-medium pl-6">
                    <li>
                      Use the complete shipment reference number found in your
                      GoSendeet account, which starts with GOS*****, and input
                      it into the tracking tool.{" "}
                    </li>
                    <li>
                      You can locate the shipment reference number in your email
                      confirmation or on the shipping label.{" "}
                    </li>
                    <li>
                      Whether your package was collected or you dropped it off,
                      this tool allows you to check the status of your shipment
                      at any time.{" "}
                    </li>
                    <li>
                      Feel free to share the GoSendeet shipment number with the
                      recipient so they can also keep an eye on the package's
                      progress.
                    </li>
                  </ol>
                  <p className="font-medium mt-6">
                    If you need assistance with tracking your parcel, don’t
                    hesitate to reach out—we’re here to help!
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="py-4 text-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-3 items-center py-3 md:px-4 border-b">
                <PiGpsFixFill className="text-purple400 text-xl" />
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="track" className="font-clash font-semibold">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    {...register("tracking_number")}
                    placeholder="What is your tracking number?"
                    className="w-full outline-0"
                  />
                  {errors.tracking_number && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.tracking_number.message}
                    </p>
                  )}
                </div>
              </div>

              <Button variant={"secondary"} className=" w-full mt-4">
                Track Delivery
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Track;
