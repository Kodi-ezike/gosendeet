import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { resetPassword } from "@/services/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export function ChangePassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("resetToken") || "";
//   const [isSuccess, setIsSuccess] = useState(false);

  const [toggle, setToggle] = useState(false);

  const schema = z
    .object({
      password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
      currentPassword: z
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
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Successful");
    //   setIsSuccess(true);
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate({
      resetToken,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Change password</Button>
      </DialogTrigger>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-clash mb-2">
          Change Your Password
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          Create a new password
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 w-full ">
                <label htmlFor="password" className="font-clash font-semibold">
                  Current Password
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type={toggle ? "text" : "password"}
                    {...register("currentPassword")}
                    placeholder="Enter your current password"
                    className="w-full outline-0 border-b-0 py-2"
                  />

                  <span
                    className="cursor-pointer text-purple400 text-xl"
                    onClick={() => setToggle(!toggle)}
                  >
                    {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
                {errors.currentPassword && (
                  <p className="error text-xs text-[#FF0000]">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-clash font-semibold">
                  New Password
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type={toggle ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your new password"
                    className="w-full outline-0 border-b-0 py-2"
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

              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="font-clash font-semibold"
                >
                  Confirm New Password
                </label>
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type={toggle ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm your new password"
                    className="w-full outline-0 border-b-0 py-2"
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

              <Button
                variant={"secondary"}
                className=" w-fit"
                loading={isPending}
              >
                Change Password
              </Button>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
