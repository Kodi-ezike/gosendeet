import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfileStatus } from "@/services/adminProfiles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdateUserStatusModal = ({
  openUpdateStatus,
  setOpenUpdateStatus,
  username,
  userId,
  userStatus,
}: {
  openUpdateStatus: boolean;
  setOpenUpdateStatus: any;
  username: string;
  userId: string;
  userStatus: string;
}) => {
  const schema = z.object({
    status: z
      .string({ required_error: "Status is required" })
      .min(1, { message: "Please enter status" }),
  });

  const { handleSubmit, reset, setValue } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "",
    },
  });

  useEffect(() => {
    if (userId && openUpdateStatus) {
      reset({
        status: userStatus ?? "",
      });
    }
  }, [ userStatus, open, reset]);

  const queryClient = useQueryClient();

  const { mutate: updateCompany, isPending: pendingUpdate } = useMutation({
    mutationFn: ({userId, status }: { userId: any; status: string }) =>
      updateProfileStatus(userId, status), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      setOpenUpdateStatus(false);
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single_profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile_stats"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: any) => {
    updateCompany({
      userId: userId,
      status: data.status,
      
    });
  };

  return (
    <Dialog open={openUpdateStatus} onOpenChange={setOpenUpdateStatus}>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-4">
          Update user status
        </DialogTitle>
        <DialogDescription className="font-medium text-base text-neutral600 mb-4">
          Are you sure you want to update the live status of{" "}
          <b>{username}</b> ?
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 border-b">
              <Select
                onValueChange={(val) => setValue("status", val)}
                defaultValue={userStatus}
              >
                <SelectTrigger className="outline-0 focus-visible:border-transparent focus-visible:ring-transparent border-0 w-full py-2 px-0 mt-0">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="py-4 text-sm mt-4 flex items-center gap-4">
            <Button
              variant={"secondary"}
              // onClick={onSubmit}
              loading={pendingUpdate}
            >
              Yes, Update
            </Button>
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setOpenUpdateStatus(false)}
            >
              No, Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserStatusModal;
