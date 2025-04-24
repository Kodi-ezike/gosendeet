import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import purple from "@/assets/icons/big-purple-checkmark.png";

const ResetPassword = () => {
  //   const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const [toggle, setToggle] = useState(false);

  const schema = z.object({
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
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
    setIsSuccess(true);
  };

  return (
    <AuthLayout>
      <div className="md:px-20 px-6 md:py-20 py-8">
        <div className="xl:w-1/2 md:w-[80%] mx-auto bg-purple300 py-12 md:px-10 px-4">
          {isSuccess ? (
            // ✅ Success Screen
            <div className="flex flex-col justify-center items-center text-center min-h-[350px] my-auto">
              <img src={purple} alt="purple" />
              <h1 className="text-2xl text-neutral600 font-semibold font-clash my-3">
                Password reset was successful!
              </h1>
              <p className="text-neutral600 lg:w-3/4">
                You have successfully reset password for your account
              </p>
              <Button className="mt-6">Continue to Dashboard</Button>
            </div>
          ) : (
            <>
              <h1 className="lg:text-[40px] text-[30px] font-semibold font-clash mb-1">
                Choose a Password
              </h1>
              <p className="font-medium text-neutral800">
                Your new password must be different from previous used
                passwords.{" "}
              </p>

              <div className="py-4 text-sm mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-3 items-center py-3 md:px-4 border-b mb-5">
                    <TbLockPassword className="text-purple400 text-2xl" />
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="password"
                        className="font-clash font-semibold"
                      >
                        Create Your Password
                      </label>
                      <div className="flex justify-between gap-2">
                        <input
                          type={toggle ? "text" : "password"}
                          {...register("password")}
                          placeholder="********"
                          className="w-full outline-0 border-b-0"
                        />

                        <span
                          className="cursor-pointer text-purple400 text-xl"
                          onClick={() => setToggle(!toggle)}
                        >
                          {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                      </div>
                      {errors.password && (
                        <p className="error text-xs text-[#FF0000]">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 items-center py-3 md:px-4 border-b mb-5">
                    <TbLockPassword className="text-purple400 text-2xl" />
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="confirm_password"
                        className="font-clash font-semibold"
                      >
                        Confirm Password
                      </label>
                      <div className="flex justify-between gap-2">
                        <input
                          type={toggle ? "text" : "password"}
                          {...register("confirm_password")}
                          placeholder="********"
                          className="w-full outline-0 border-b-0"
                        />

                        <span
                          className="cursor-pointer text-purple400 text-xl"
                          onClick={() => setToggle(!toggle)}
                        >
                          {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                      </div>
                      {errors.confirm_password && (
                        <p className="error text-xs text-[#FF0000]">
                          {errors.confirm_password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button variant={"secondary"} className=" w-full my-1">
                    Reset Password
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
