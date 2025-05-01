import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { useEffect, useState } from "react";
import purple from "@/assets/icons/big-purple-checkmark.png";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { resendVerification } from "@/services/auth";
import { toast } from "sonner";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const email = queryParams.get("email") || "";
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "success") {
      setIsVerified(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: resendVerification,
    onSuccess: () => {
      toast.success("Successful");
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const submit = () => {
    mutate(email);
  };

  return (
    <AuthLayout>
      <div className="md:px-20 px-6 md:py-20 py-8">
        {isLoading && !isVerified && (
          <div className="h-[55vh] w-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <div className="xl:w-1/2 md:w-[80%] mx-auto bg-purple300 py-12 md:px-10 px-4">
          {!isLoading && isVerified && (
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
              <Link to={"/signin"}>
                <Button className="mt-6">Proceed to Login</Button>
              </Link>
            </div>
          )}
          {!isLoading && !isVerified && (
            <div className="flex flex-col min-h-[350px] my-auto">
              <h1 className="lg:text-[40px] md:text-[36px] text-[30px] font-semibold font-clash  mb-1">
                Looks like we’ve hit a slight snag
              </h1>
              <p className="font-medium text-neutral800">
                Please try again or check back in a bit
              </p>
              <Button
                className="mt-6 w-full"
                variant={"secondary"}
                onClick={submit}
                loading={isPending}
              >
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
