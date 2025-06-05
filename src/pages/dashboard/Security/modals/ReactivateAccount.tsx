import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { activateAccount } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function ReactivateAccount() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: activateAccount,
    onSuccess: () => {
      toast.success("Successful");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Reactivate my account</Button>
      </DialogTrigger>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-clash mb-2">
          Reactivate Account?
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          Reactivate your account to get access to all the features of the
          platform.
        </DialogDescription>
        <>
          <div className="py-4 text-sm">
            <p className="text-neutral600 mt-2 mb-8">
              By clicking “Reactivate”, you agree with GoSendeet{" "}
              <span className="text-purple500">terms</span> for account
              reactivation
            </p>

            <Button
              variant={"secondary"}
              className=" w-fit"
              loading={isPending}
              onClick={() => mutate("active")}
            >
              Reactivate
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
