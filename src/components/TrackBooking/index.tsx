import { useState } from "react";
import { PiGpsFixFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { trackBookings } from "@/services/bookings";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const TrackBooking = () => {
     const schema = z.object({
    trackingNumber: z
      .string({ required_error: "trackingNumber is required" })
      .min(1, { message: "Please add a trackingNumber" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const res = await trackBookings(data.trackingNumber);
      toast.success("Booking found");
      navigate(`/track-booking`, {
        state: {
          data: res,
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-3 items-center py-3 px-4 border-b">
                    <PiGpsFixFill className="text-purple400 text-xl" />
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="trackingNumber"
                        className="font-clash font-semibold"
                      >
                        Tracking Number
                      </label>
                      <input
                        type="text"
                        placeholder="What is your tracking number?"
                        className="w-full outline-0"
                        {...register("trackingNumber")}
                      />
                    </div>
                  </div>
                  {errors.trackingNumber && (
                    <p className="error text-xs text-[#FF0000] pl-[45px] my-1">
                      {errors.trackingNumber.message}
                    </p>
                  )}

                  <Button
                    className="mt-4"
                    size={"large"}
                    variant={"secondary"}
                    loading={loading}
                  >
                    Track Delivery
                  </Button>
                </form>
    </div>
  )
}

export default TrackBooking