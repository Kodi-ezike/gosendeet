import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import google from "@/assets/icons/google.png";
import { googleLogin, signup } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SignupModal } from "./SignupModal";

const Signup = () => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const schema = z
    .object({
      username: z
        .string({ required_error: "Full name is required" })
        .min(1, { message: "Full name cannot be empty" }),
      email: z
        .string({ required_error: "Email address is required" })
        .min(1, { message: "Email address cannot be empty" })
        .email({ message: "Invalid email address" }),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z
        .string({ required_error: "Please confirm your password" })
        .min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"], // Error will show on confirmPassword field
      message: "Passwords do not match",
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setOpen(true);
      reset();
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setEmail(data.email);
    mutate(data);
  };

  const { mutate: googleMutation } = useMutation({
    mutationFn: googleLogin,
    onSuccess: () => {
      toast.success("Success");
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <AuthLayout>
      <div className="md:px-20 px-6 md:py-20 py-8">
        <div className="xl:w-1/2 md:w-[80%] mx-auto bg-purple300 py-12 md:px-10 px-4">
          <h1 className="lg:text-[40px] text-[30px] font-semibold font-clash mb-1">
            Sign up
          </h1>

          <div className="py-4 text-sm mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-3 items-center py-3 md:px-4 border-b mb-5">
                <MdOutlinePersonOutline className="text-purple400 text-[25px]" />
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="details" className="font-clash font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    placeholder="Enter your username"
                    className="w-full outline-0 text-gray-600"
                  />
                  {errors.username && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 items-center py-3 md:px-4 border-b mb-5">
                <MdOutlineMailOutline className="text-purple400 text-2xl" />
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="details" className="font-clash font-semibold">
                    Email Address
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className="w-full outline-0 text-gray-600"
                  />
                  {errors.email && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

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
                      {...register("confirmPassword")}
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
                  {errors.confirmPassword && (
                    <p className="error text-xs text-[#FF0000]">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                variant={"secondary"}
                loading={isPending}
                className=" w-full my-1"
              >
                Register for free
              </Button>
            </form>
            <Button
              variant={"outline"}
              className="border-neutral500 bg-transparent w-full mt-5 mb-4 hover:bg-purple200"
              onClick={() => googleMutation()}
            >
              <img src={google} alt="google" className="w-[20px]" />
              <span>Continue with Google</span>
            </Button>
          </div>
          <p className="font-medium text-neutral800 text-center lg:text-base text-sm">
            By continuing, you accept our{" "}
            <span className="border-b border-b-neutral800">Terms of Use</span>{" "}
            and{" "}
            <span className="border-b border-b-neutral800">Privacy Policy</span>
          </p>
        </div>
      </div>

      <SignupModal open={open} setOpen={setOpen} email={email} />
    </AuthLayout>
  );
};

export default Signup;
