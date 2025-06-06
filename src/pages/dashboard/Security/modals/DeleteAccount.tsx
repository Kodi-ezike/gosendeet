import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAccount } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeleteAccount() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Successful");
      localStorage.clear();
      navigate("/signin");
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete my account</Button>
      </DialogTrigger>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-clash mb-2">
          Delete Account?
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          Removes your account permanently with no opportunity to retrieve
        </DialogDescription>
        <>
          <div className="py-4 text-sm">
            <p className="text-neutral600 mt-2 mb-8">
              By clicking “Delete”, you agree with GoSendeet{" "}
              <span className="text-purple500">terms</span> for account deletion
            </p>

            <Button
              variant={"destructive"}
              className=" w-fit"
              loading={isPending}
              onClick={() => mutate()}
            >
              Delete
            </Button>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
