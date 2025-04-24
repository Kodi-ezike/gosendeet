import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

const ForgotPassword = () => {
  // const navigate = useNavigate();

  const schema = z.object({
    details: z
      .string({ required_error: "Email Address or Phone Number is required" })
      .min(1, { message: "Email Address or Phone Number cannot be empty" }),
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
  };

  return (
    <AuthLayout>
      <div className="md:px-20 px-6 md:py-20 py-8">
        <div className="xl:w-1/2 md:w-[80%] mx-auto bg-purple300 py-12 md:px-10 px-4">
          <h1 className="lg:text-[40px] text-[30px] font-semibold font-clash mb-1">
            Reset your password
          </h1>
          <p className="font-medium text-neutral800 lg:w-[90%]">
            Please enter your email and we'll send you a password reset link if
            your account is found active
          </p>

          <div className="py-4 text-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-3 items-center py-3 md:px-4 border-b mb-5">
                <MdOutlineMailOutline className="text-purple400 text-xl" />
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="details" className="font-clash font-semibold">
                    Email Address or Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("details")}
                    placeholder="Enter your email address or phone number"
                    className="w-full outline-0"
                  />
                  {errors.details && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.details.message}
                    </p>
                  )}
                </div>
              </div>

              <Button variant={"secondary"} className=" w-full my-5">
                Get reset link
              </Button>
            </form>
          </div>
          <p className="font-medium text-neutral800 text-center lg:text-base text-sm">
            By continuing, you accept our{" "}
            <span className="border-b border-b-neutral800">Terms of Use</span>{" "}
            and{" "}
            <span className="border-b border-b-neutral800">Privacy Policy</span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
