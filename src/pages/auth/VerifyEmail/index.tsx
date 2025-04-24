import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import purple from "@/assets/icons/big-purple-checkmark.png";

const VerifyEmail = () => {
  const location = useLocation();
  const { email } = location.state || {};

  const [isVerified, setIsVerified] = useState(false);

  const schema = z.object({
    code: z
      .string({ required_error: "Code is required" })
      .min(1, { message: "Code cannot be empty" }),
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
    // simulate successful verification
    setIsVerified(true);
  };

  return (
    <AuthLayout>
      <div className="md:px-20 px-6 md:py-20 py-8">
        <div className="xl:w-1/2 md:w-[80%] mx-auto bg-purple300 py-12 md:px-10 px-4">
          {isVerified ? (
            // ✅ Success Screen
            <div className="flex flex-col justify-center items-center text-center min-h-[350px] my-auto">
              <img src={purple} alt="purple" />
              <h1 className="text-2xl text-neutral600 font-semibold font-clash my-3">
                Welcome to Gosendeet!
              </h1>
              <p className="text-neutral600 lg:w-3/4">
                Your journey starts now. We're here to simplify deliveries,
                enhance customer experiences, and support your next big move.
              </p>
              <Button className="mt-6">Continue to Dashboard</Button>
            </div>
          ) : (
            // 🔒 Verification Form
            <>
              <h1 className="lg:text-[40px] text-[30px] font-semibold font-clash mb-1">
                Verify Your Email
              </h1>
              <p className="font-medium text-neutral800">
                Enter the verification code we just sent to {email}
              </p>

              <div className="py-4 text-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-3 items-center py-3 md:px-4 border-b mb-5">
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="code"
                        className="font-clash font-semibold"
                      >
                        Code
                      </label>
                      <input
                        type="text"
                        {...register("code")}
                        placeholder="Enter the code received"
                        className="w-full outline-0"
                      />
                      {errors.code && (
                        <p className="error text-xs text-[#FF0000]">
                          {errors.code.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button variant="secondary" className="w-full mt-1">
                    Verify Now
                  </Button>
                </form>
                <Button
                  variant="outline"
                  className="border-neutral500 bg-transparent w-full my-5 hover:bg-purple200"
                >
                  Resend Email
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
