import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLocationCode,
  updateLocationCode,
} from "@/services/adminSettings";
import { useEffect } from "react";

export function LocationCodeModal({
  open,
  setOpen,
  type,
  info,
}: {
  open: boolean;
  setOpen: any;
  type: string;
  info: any;
}) {
  const schema = z.object({
    locationCode: z
      .string({ required_error: "Location code is required" })
      .min(1, { message: "Please enter a code" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  // ✅ Reset form with incoming info when modal opens
  useEffect(() => {
    if (open && type === "edit" && info) {
      reset({
        locationCode: info.name,
      });
    } else if (open && type === "create") {
      reset({
        locationCode: "",
      });
    }
  }, [open, info, type, reset]);

  const queryClient = useQueryClient();

  const { mutate: createCode, isPending: pendingCreate } = useMutation({
    mutationFn: createLocationCode,
    onSuccess: () => {
      toast.success("Successful");
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["location_codes"],
      });
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: updateCode, isPending: pendingUpdate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateLocationCode(id, data), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      setOpen(false);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["location_codes"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    type === "create" &&
      createCode({
        name: data.locationCode,
      });

    type === "edit" &&
      updateCode({
        id: info?.id,
        data: { name: data.locationCode },
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={false} className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Location Code
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600">
          {type === "create" ? "Add a location code." : "Edit a location code."}
        </DialogDescription>
        <>
          <div className="py-4 text-sm mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2 w-full">
                {/* <label
                  htmlFor="locationCode"
                  className="font-inter font-semibold px-4"
                >
                  Location code
                </label> */}
                <div className="flex justify-between items-center gap-2 border-b">
                  <input
                    type="text"
                    {...register("locationCode")}
                    defaultValue={info?.name}
                    placeholder="Enter location code"
                    className="w-full outline-0 border-b-0 py-2 px-4 "
                  />
                </div>
                {errors.locationCode && (
                  <p className="error text-xs text-[#FF0000] px-4">
                    {errors.locationCode.message}
                  </p>
                )}
              </div>

              <Button
                variant={"secondary"}
                loading={type === "edit" ? pendingUpdate : pendingCreate}
              >
                {type === "edit" ? "Update" : "Add"}
              </Button>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
